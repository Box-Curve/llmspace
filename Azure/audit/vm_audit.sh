#!/bin/bash

# Not required for cloudshell
# Ensure you're logged in
# if az login > /dev/null 2>&1; then
#     echo "Successfully logged into Azure."
# else
#     echo "Failed to log into Azure. Exiting."
#     exit 1
# fi

# Output file
outputFile="CMDB_VM_Detailed.csv"

# Header for CSV
echo "SubscriptionID,SubscriptionName,ResourceGroup,VMName,OSType,PrivateIP,PublicIP,Size,OSDisk,DataDisks,NetworkInterfaces,VMState,LicensingType,Hostname,FQDN,Tags" > $outputFile

# Fetching list of subscriptions
subscriptions=$(az account list --output tsv --query "[].id")
if [[ $? -ne 0 ]]; then
    echo "Failed to fetch subscriptions. Exiting."
    exit 1
fi

# Iterate through every subscription
for subscription in $subscriptions
do
    echo "Processing subscription: $subscription."

    if az account set --subscription $subscription > /dev/null 2>&1; then
        echo "Switched to subscription: $subscription."
    else
        echo "Failed to switch to subscription: $subscription. Skipping."
        continue
    fi

    # Extract the subscription name for clarity
    subscriptionName=$(az account show --query "name" -o tsv)

    # Fetching list of resource groups
    resourceGroups=$(az group list --output tsv --query "[].name")
    if [[ $? -ne 0 ]]; then
        echo "Failed to fetch resource groups for subscription: $subscription. Skipping."
        continue
    fi

    # Iterate through each resource group
    for rg in $resourceGroups
    do
        echo "Processing resource group: $rg."

        # Extract VM details
        for vm in $(az vm list -g $rg --query "[].name" -o tsv)
        do
            vmDetails=$(az vm show -g $rg -n $vm)

            osType=$(echo $vmDetails | jq -r .storageProfile.osDisk.osType)
            size=$(echo $vmDetails | jq -r .hardwareProfile.vmSize)
            osDisk=$(echo $vmDetails | jq -r .storageProfile.osDisk.name)
            dataDisks=$(echo $vmDetails | jq -r '.storageProfile.dataDisks[] | .name' | paste -sd "," -)
            nics=$(echo $vmDetails | jq -r '.networkProfile.networkInterfaces[] | .id' | awk -F'/' '{print $NF}' | paste -sd "," -)
            licensingType=$(echo $vmDetails | jq -r .licenseType)
            tags=$(echo $vmDetails | jq -r .tags)
            privateIp=$(az vm list-ip-addresses -g $rg -n $vm --query "[].virtualMachine.network.privateIpAddresses[0]" -o tsv)
            publicIp=$(az vm list-ip-addresses -g $rg -n $vm --query "[].virtualMachine.network.publicIpAddresses[0].ipAddress" -o tsv)
            vmState=$(az vm get-instance-view --name $vm -g $rg --query "instanceView.statuses[?starts_with(code, 'PowerState/')].displayStatus" -o tsv)

            # Hostname is essentially the VM's name
            hostname=$vm

            # Extracting FQDN
            nicId=$(echo $vmDetails | jq -r '.networkProfile.networkInterfaces[0].id')
            if [ "$nicId" != "null" ]; then
                ipConfigId=$(az network nic show --ids $nicId | jq -r .ipConfigurations[0].id)
                if [ "$ipConfigId" != "null" ]; then
                    publicIpId=$(az network nic ip-config show --resource-group $rg --nic-name $(echo $nicId | awk -F'/' '{print $NF}') --name $(echo $ipConfigId | awk -F'/' '{print $NF}') | jq -r .publicIpAddress.id)
                    if [ "$publicIpId" != "null" ]; then
                        fqdn=$(az network public-ip show --ids $publicIpId | jq -r .dnsSettings.fqdn)
                    else
                        fqdn=""
                    fi
                else
                    fqdn=""
                fi
            else
                fqdn=""
            fi

            # Append to CSV
            echo "$subscription,$subscriptionName,$rg,$vm,$osType,$privateIp,$publicIp,$size,$osDisk,$dataDisks,$nics,$vmState,$licensingType,$hostname,$fqdn,$tags" >> $outputFile
        done
    done
done

echo "Detailed VM export complete. Data written to $outputFile."
