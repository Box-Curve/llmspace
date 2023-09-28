### Summary:

Subscriptions, which are directly managed by the owners, form the other critical component of the Landing Zone. The creation of such subscriptions is executed by the CCOE to ensure adherence to organizational standards and policies. Once created, the management and maintenance of these subscriptions primarily fall under the Subscription Owner’s purview. However, other departments like ZZZ Security Team and ZZZ Architecture also play pivotal roles in specific tasks, ensuring alignment with organizational security and architectural standards.

### Description:

In owner-managed subscriptions:
- **Subscription Creation:** Executed by the CCOE, it establishes the baseline for subscription set-up, maintaining consistency and adherence to the organizational framework.
- **Subscription Management:** Primarily overseen by the Subscription Owner, it involves the management and maintenance of individual subscriptions, ensuring they meet the specific needs of the departments.
- **Security and Architecture:** The ZZZ Security Team and ZZZ Architecture are involved in refining and maintaining the security and architectural integrity of the subscriptions, respectively.

### RACI for Tasks for Azure Services in Owner-Managed Subscriptions

| Tasks                                    | CCOE ZZZ | CCOE HCL | Subscription Owner | ZZZ Security Team | ZZZ Architecture |
|------------------------------------------|----------|----------|--------------------|-------------------|------------------|
| Create Subscriptions                     | A        | I        | R                  | I                 | I                |
| Manage Subscription Configurations       | I        | C        | A                  | C                 | R                |
| Implement Security Policies              | I        | I        | C                  | A                 | R                |
| Oversee Subscription Maintenance         | I        | A        | R                  | C                 | C                |
| Update and Patch Management              | I        | R        | A                  | C                 | C                |
| Configure Networking within Subscriptions| I        | C        | A                  | R                 | C                |
| Monitor Services in Subscriptions       | C        | A        | R                  | C                 | I                |
| Execute Backup & Recovery                | I        | C        | A                  | R                 | C                |
| Validate Architectural Integrity         | I        | I        | C                  | C                 | A                |
| Support and Resolve Issues               | C        | R        | A                  | C                 | I                |

- **R – Responsible:** The entity that executes the task.
- **A – Accountable:** The entity ultimately answerable for the complete and correct execution of the task.
- **C – Consulted:** The entity whose opinions are sought; and with whom there is two-way communication.
- **I – Informed:** The entity that is kept informed of progress and with whom there is one-way communication.

### Conclusion

This delineation provides a clear outline of responsibilities and tasks within owner-managed subscriptions. The structured RACI model ensures smooth collaboration amongst different departments, clarifying roles, and maintaining the high standard and integrity of Azure services within the subscriptions, aligning with ZZZ Bank’s security and architectural policies. This structured approach promotes optimal functionality, alignment, and compliance within owner-managed subscriptions in the Azure environment.