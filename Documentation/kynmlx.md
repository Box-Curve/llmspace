### Summary

Within the established landing zone, there is a distinction between subscriptions managed by the Cloud Centre of Excellence (CCOE) and those owned and managed by various other departments within ZZZ Bank. Managed Subscriptions are integral, containing core resources that the CCOE directly manages and supports, providing services essential for the functioning of subscriptions owned by other departments. These provisions follow the hub-and-spoke pattern, ensuring optimized functionality and streamlined management.

### Description

In the hub-and-spoke model:

- **Hub**: Contains the core services and resources managed and supported by the CCOE. It serves as the central point connecting to multiple spokes.
- **Spoke**: Consists of subscriptions owned by other departments, leveraging services and resources provided by the hub.

This delineation ensures centralized management of core services by the CCOE while allowing other departments to have ownership and management of their subscriptions, facilitating an organized and efficient operational framework.

### RACI for Tasks for Azure Services in Managed Subscriptions

| Tasks                                      | CCOE | IT Department | Finance Department | HR Department | Operations Department |
|--------------------------------------------|------|---------------|--------------------|---------------|-----------------------|
| Manage Core Services in Hub                | A    | I             | I                  | I             | I                     |
| Support Core Services in Hub               | R    | I             | I                  | I             | I                     |
| Manage Departmental Subscriptions (Spoke) | C    | R             | R                  | R             | R                     |
| Support Departmental Subscriptions (Spoke) | C    | A             | A                  | A             | A                     |
| Configure Networking between Hub & Spoke   | A    | R             | I                  | I             | I                     |
| Manage Security Policies in Hub            | A    | C             | I                  | I             | I                     |
| Update and Patch Management in Hub         | A    | I             | I                  | I             | I                     |
| Monitor Services in Hub                    | A    | C             | I                  | I             | C                     |
| Implement Backup & Recovery in Hub         | A    | C             | I                  | I             | C                     |

- **R – Responsible:** The department that performs the execution of the task.
- **A – Accountable:** The department that is ultimately answerable for the correct and thorough completion of the task.
- **C – Consulted:** The department that must be consulted before a decision or action is taken.
- **I – Informed:** The department that must be informed after a decision or action is taken.

### Conclusion

This structured approach allows for clear delineation of responsibilities and roles within Azure Services, ensuring seamless interaction and operation between core services and departmental subscriptions. The adherence to the RACI model clarifies the roles and responsibilities amongst various departments in managing and supporting Azure services within the hub-and-spoke pattern, promoting efficiency, clarity, and accountability within the organisational framework.