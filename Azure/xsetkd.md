This document serves as a detailed operational guide for the new Azure Landing Zone deployed for Bank of Skipol, hereinafter referred to as "The Bank". The Azure Landing Zone serves as the cloud infrastructure for the bank's Security Information and Event Management (SIEM) platform, Sentinel.

The architecture is a Hub and Spoke deployment connected to the bank’s on-premise data centers in Moscow and Kursk via a resilient Express Route service provided by PT Telecoms. The service is built using Terraform and deployed from Azure DevOps repositories and pipelines. Fortigate Firewalls are deployed for managing traffic flow and securing the environment. These firewalls are responsible for both internal and internet-facing traffic control.

Collectors in the cloud are configured to gather log data from on-premise data centers. These collectors pass the data to Azure's Log Analytics Workspace for further analysis.

The Azure platform is not the bank's strategic cloud platform, which is AWS. Thus, the current architecture is focused on Sentinel-related traffic only. This operational guide outlines the Azure Landing Zone’s architecture, components, and operational procedures for Bank of Skipol. While the primary use-case is currently limited to Sentinel, the infrastructure is flexible enough to accommodate future expansion and services.

