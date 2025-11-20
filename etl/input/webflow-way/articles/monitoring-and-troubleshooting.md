## Monitoring strategies


Who uses this

Purpose

Example

Which events the log focuses on

**Audit log API**

Security teams (including admins that might not have a webflow account)

— Only Workspace admins can generate a Workspace API token

Pipe audit log data across tools into a centralized SIEM (e.g., Splunk) for org-wide security monitoring

Detect anomalies like login spikes or impossible travel indicates there could be a security incident.

Focused on key security-related events at both the Workspace and Site level: logins, permission changes, role assignments, etc. Accessible via API.

**Site Activity log**

Designers, Marketers, and Content Editors

— All roles except reviewer can view Site Activity logs

Track project updates, reverse unintended changes, and monitor team collaboration.

Notice a styling bug on your home page — check who edited the class and when.

Covers key site-level events such as site or CMS item publishing, design updates (e.g., class and component edits), content modifications, page setting adjustments, and new page creation. Available directly within individual sites in Webflow and accessible via API.

## Site Activity log

Webflow’s Site Activity log provides a detailed record of all major actions taken within a project, helping teams track changes, maintain accountability, and troubleshoot issues effectively. Key benefits of using the Site Activity log include:

**Change tracking:**View a history of changes made to a project, including who made them and when.**Accountability:**Identify team members responsible for specific updates.**Troubleshooting:**Diagnose potential issues by reviewing past actions.**Audit compliance:**Maintain a reliable record of site modifications for review.

### When to use the Site Activity log

**Tracking project updates:**See a timeline of key changes like publishing events, settings modifications.**Reversing unintended changes:**Quickly pinpoint when an issue occurred and take corrective action.**Monitoring team collaboration:**Keep an eye on actions performed by different team members.**Ensuring security and compliance**: Detect unauthorized actions or unexpected modifications.

### When not to rely solely on the Site Activity log

While the log is a valuable tool, it is not a version control system. Avoid using it as a substitute for:

**Design versioning:**Use Webflow’s backup and restore feature to revert to previous site versions.******Design reviews:**Use commenting and design approvals for collaborative feedback and review cycles.

## Next up: Working with clients

This guide will provide the key information that freelancers and agencies need to know to effectively collaborate with clients and manage your business on Webflow.

## More ways to level up

- Help Center
Find solutions to your Webflow questions and get help from our expert customer support team.

Go to docs - Community
Connect with other designers and developers to share tips, ask questions, and show off your work.

Go to forum

**Webflow**Way
