### Executive Summary: Service Offering Description

#### Overview
ZZZ Bank has implemented Azure Sentinel to enhance security log collection from both internal and external sources, reinforcing our security infrastructure. While AWS remains our primary strategic service, the deployment of Azure is designated for specific use-cases, currently focused on enhancing the capabilities of Azure Sentinel for security analytics and threat intelligence.

#### Architecture and Components

1. **Azure Sentinel**  
Azure Sentinel, a cloud-native SIEM and SOAR solution, facilitates advanced security analytics and threat intelligence.
[Learn More](https://azure.microsoft.com/en-us/services/azure-sentinel/)

2. **Hub-and-Spoke Landing Zone**  
Implemented via Infrastructure as Code (IaC) from Azure DevOps and built with Terraform, this structure is designed for scalability, security, and resilience.
[Learn More](https://docs.microsoft.com/en-us/azure/cloud-adoption-framework/ready/landing-zone/)

3. **ExpressRoute Direct**  
This service connects ZZZ Bank's data centers to the Azure environment securely and efficiently.
[Learn More](https://azure.microsoft.com/en-us/services/expressroute/)

4. **Fortigate Virtual Appliances**  
Positioned within the hub to secure the network subscription, these appliances offer additional layers of security.
[Learn More](https://www.fortinet.com/products/next-generation-firewall)

5. **Syslog Collectors**  
They are essential for collecting and forwarding security logs to the Log Analytics workspace.
[Learn More](https://docs.microsoft.com/en-us/azure/sentinel/connect-syslog)

#### Environments

1. **Primary Environment**  
This is the principal operational domain, deployed and configured to ZZZ Bank’s security and operational standards.

2. **Test Environment**  
This smaller-scale replica of the production environment is in place for validation and optimization before full-scale deployment.

#### Operational Framework

ZZZ Bank’s Cloud Centre of Excellence (CCOE) has collaborated with HCL to maintain the operational robustness of this environment during Business as Usual (BAU) phases.
[Learn More about HCL](https://www.hcltech.com/)

#### Current Utilization

The Azure environment is currently utilized for the deployment of Sentinel and associated log collection infrastructure for security logs exclusively, from both internal and external sources. This specific focus aligns with the bank’s precise requirement for enhanced security log analytics.

#### Potential Expansion

While presently focused on security log collection and analysis, the established environment has the flexibility to accommodate different use-cases if the need arises in the future.

#### Conclusion

This document outlines the Azure Sentinel service offering within ZZZ Bank, highlighting the architectural components, environments, operational support, current utilization, and potential expansions, providing a factual depiction of the service for internal understanding. This implementation, although specific, is an integral part of the bank’s operational and security infrastructure, designed with adaptability to meet evolving requirements.