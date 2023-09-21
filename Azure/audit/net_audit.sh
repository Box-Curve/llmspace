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
outputFile="CMDB_Network.csv"

# Header for CSV
echo "SubscriptionID,SubscriptionName,ResourceGroup,ServiceType,ServiceName,AdditionalDetails" > $outputFile

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

        # Extract details for Virtual Networks (VNet)
        for vnet in $(az network vnet list -g $rg --query "[].name" -o tsv)
        do
            echo "$subscription,$subscriptionName,$rg,VNet,$vnet," >> $outputFile
        done

        # Extract details for Network Security Groups (NSG)
        for nsg in $(az network nsg list -g $rg --query "[].name" -o tsv)
        do
            echo "$subscription,$subscriptionName,$rg,NSG,$nsg," >> $outputFile
        done

        # Extract details for Virtual Network Peering
        for vnet in $(az network vnet list -g $rg --query "[].name" -o tsv)
        do
            for peer in $(az network vnet peering list --resource-group $rg --vnet-name $vnet --query "[].name" -o tsv)
            do
                echo "$subscription,$subscriptionName,$rg,VNet Peering,$peer," >> $outputFile
            done
        done

        # Extract details for Azure VPN Gateway (Note: VPN Gateways are within their own subnet inside a VNet)
        for vpn in $(az network vnet-gateway list -g $rg --query "[].name" -o tsv)
        do
            echo "$subscription,$subscriptionName,$rg,VPN Gateway,$vpn," >> $outputFile
        done

        # Extract details for Azure ExpressRoute (Note: this requires that ExpressRoute is set up and may result in no output if not)
        for er in $(az network express-route list -g $rg --query "[].name" -o tsv)
        do
            echo "$subscription,$subscriptionName,$rg,ExpressRoute,$er," >> $outputFile
        done

        # Extract details for Network Watcher (Note: One per region per subscription)
        for nw in $(az network watcher list --query "[?resourceGroup=='$rg'].name" -o tsv)
        do
            echo "$subscription,$subscriptionName,$rg,Network Watcher,$nw," >> $outputFile
        done
    done
done

echo "Network services export complete. Data written to $outputFile."
