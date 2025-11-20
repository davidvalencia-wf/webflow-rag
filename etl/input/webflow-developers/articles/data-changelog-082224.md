---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/082224
title: "Security & permissions updates for Webflow Apps | Webflow Developer Documentation"
published: 2025-11-17
---

[August 22, 2024](https://developers.webflow.com/data/changelog/082224)

## [Security & permissions updates for Webflow Apps](https://developers.webflow.com/data/changelog/082224)

Webflow Apps now require enhanced security and permissions.

- **Enhanced Workspace App Management Permissions:**

Previously, all members within a Workspace had the ability to manage Apps (for example, uploading new bundles, updating redirect URIs). Webflow enforces stricter permissions, allowing only Workspace Admins to perform these actions. This ensures that sensitive operations are restricted to authorized personnel.
- **Mandatory 2FA for Workspace Admins:**

To further enhance security, Workspace Admins are now required to have two-factor authentication (2FA) enabled to upload new App Bundles. This additional security layer helps protect your Workspace from unauthorized access and potential threats.

### SDK version

- **[Version 2.3.6](https://www.npmjs.com/package/webflow-api/v/2.3.6?activeTab=versions)**

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