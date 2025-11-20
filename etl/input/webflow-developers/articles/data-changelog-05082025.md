---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/05082025
title: "Workspace audit logs and improvements for Webflow Apps | Webflow Developer Documentation"
published: 2025-11-17
---

[May 8, 2025](https://developers.webflow.com/data/changelog/05082025)

## [Workspace audit logs and improvements for Webflow Apps](https://developers.webflow.com/data/changelog/05082025)

![Workspace Audit Logs](https://cdn.prod.website-files.com/64f9399ca7d13575ff21a675/68139e78a6573cb4a58716ee_Updates_1280x720_Audit-Log-API.jpg)

## Introducing workspace audit logs

To enable better security and compliance monitoring, the Webflow Data API now supports workspace-level audit logs for enterprise customers. In combination with the existing [site-level audit logs](https://developers.webflow.com/data/reference/enterprise/site-activity/list), teams now have a complete view of user activity across their organization.

Use the [Workspace Audit Log API](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/get) to track important user events, including:

- [Login activity](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/event-types#user_access)
- [Custom role events](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/event-types#custom_role)
- [Workspace membership events](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/event-types#workspace_membership)
- [Site membership events](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/event-types#site_membership)
- [Workspace invitations](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/event-types#workspace_invitation)

This endpoint requires authentication with a Workspace API token

## Localization support for additional elements

These updates enable you to localize more element types on a page. In addition to the existing support for text-based elements and component instances, you can now localize the following elements using the [Page APIs](https://developers.webflow.com/data/reference/pages-and-components/pages/get-content):

- Select choices on a select element
- Placeholder text on a text input element
- Button text on submit and search buttons

* * *

## Quality of life updatesWebflow Apps

Additionally, Webflow Apps now supports:

1. **Inviting users to test apps**

You can now invite external users to test your apps before publishing to the marketplace by simply providing their email address and a message. This feature addresses the previous limitation where in-development apps could only be installed within the registered workspace. Contact [developers@webflow.com](mailto:developers@webflow.com) for early access.

2. **Safeguarding app settings for marketplace apps**

We’ve improved stability for marketplace apps by implementing safeguards against breaking changes. To protect both app developers and end users, certain critical setting changes for published apps now require re-approval through our update process. This ensures your users always have a consistent experience while giving you a controlled path to evolve your app’s capabilities. In your app settings modal, you’ll now see some disabled settings that require re-approval to make changes.

These settings include:
   - Adding a new building block (Designer or Data API)
   - Changing app scopes

Ask AI

Assistant

Hi, I'm an AI assistant with access to documentation and other content.

Tip: You can toggle this pane with

`⌘`

+

`/`

Suggestions

How do I get started with Webflow Cloud storage and what are the three main storage options available?

What are the new LLMS.txt endpoints available for Enterprise customers and how do they work?

What changes are required for internal APIs affecting site data sync, and what is the migration timeline?

How can I use the MCP server with the Designer API, and what are the system requirements?

What are the breaking changes for CMS publishing on July 7, 2025, and how should I update my code?

![Workspace Audit Logs](https://cdn.prod.website-files.com/64f9399ca7d13575ff21a675/68139e78a6573cb4a58716ee_Updates_1280x720_Audit-Log-API.jpg)