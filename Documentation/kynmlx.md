### Introduction: Service Offering Description

ZZZ Bank has established the operation of Azure Sentinel, enhancing the security infrastructure by reinforcing the collection of security logs from a myriad of internal and external sources. This initiative is implemented in alignment with our broader technological strategy, predominantly facilitated through AWS; however, Azure has been selectively integrated to cater to specialised needs. Currently, the focal point is the deployment of Azure Sentinel for refined security analytics and threat intelligence.

#### Service Architecture and Components

1. **Azure Sentinel:** 
   This is a sophisticated SIEM and SOAR solution, aiding in the provision of intelligent security analytics and threat intelligence. 
   [Learn More](https://azure.microsoft.com/en-gb/services/azure-sentinel/)

2. **Hub-and-Spoke Landing Zone:** 
   Developed using Infrastructure as Code (IaC) and Terraform, it ensures a secure, scalable, and resilient service deployment. 
   [Learn More](https://docs.microsoft.com/en-gb/azure/cloud-adoption-framework/ready/landing-zone/)

3. **ExpressRoute Direct:** 
   It connects ZZZ Bank’s data centres to the Azure environment, ensuring secure and efficient data communication. 
   [Learn More](https://azure.microsoft.com/en-gb/services/expressroute/)

4. **Fortigate Virtual Appliances:** 
   Positioned within the hub to fortify the network subscription.
   [Learn More](https://www.fortinet.com/products/next-generation-firewall)

5. **Syslog Collectors:** 
   Essential for channelling security logs to the Log Analytics workspace from varied sources. 
   [Learn More](https://docs.microsoft.com/en-gb/azure/sentinel/connect-syslog)

#### Operational Environments

1. **Primary Environment:** 
   The principal operational area, configured in compliance with ZZZ Bank’s operational and security standards.

2. **Test Environment:** 
   A scaled replica for rigorous testing and optimisation before deployment to the production environment.

#### Support Framework

Our Cloud Centre of Excellence (CCOE) has collaborated with HCL to provide seamless, 24-hour support, ensuring optimal operational continuity in alignment with the current AWS VIP agreement. 
[Learn More about HCL](https://www.hcltech.com/)

#### Utilisation and Adaptability

The Azure environment is predominantly utilised for deploying Azure Sentinel and its associated log collection infrastructure, focusing specifically on security logs. While the initial implementation is specific, the architecture is versatile, allowing for adaptations to accommodate varied use-cases in the future as organisational needs evolve.

### Conclusion of Introduction

This introduction serves to outline the implementation of Azure Sentinel within ZZZ Bank, offering a concise overview of the components, architecture, operational frameworks, and areas of application, serving as an informative reference for internal stakeholders. The established environment, currently designated for specific security-focused applications, is built with the flexibility to adapt and accommodate future organisational requirements and expansions. This introduction precedes further detailed sections providing deeper insights into each component and operational aspect of the service offering.