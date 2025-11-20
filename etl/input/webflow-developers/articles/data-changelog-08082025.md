---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/08082025
title: "Developer experience improvements | Webflow Developer Documentation"
published: 2025-11-17
---

[August 8, 2025](https://developers.webflow.com/data/changelog/08082025)

## [Developer experience improvements](https://developers.webflow.com/data/changelog/08082025)

This release enhances the developer experience for the Data API with improved audit logging, webhook payloads, branch support, and file handling capabilities.

## Added

### [Workspace audit logs](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/get)

- **Track guest access approvals**: The new `access_request_accepted` event subtype lets you monitor when guest access requests are approved. The response includes a `targetUsers` array so you can see exactly which users were approved.
- **Monitor access requests**: Added the `access_request` method for `workspace_membership` and `site_membership` events to track how users were granted access to workspaces and sites.

### Webhook payloads for page events

- **Navigate directly to pages**: The new `publishedPath` field in webhook payloads gives you the exact URL path to navigate to pages on your site. This makes it much easier to track page changes beyond just the page ID and title. Available for:
  - [Page created](https://developers.webflow.com/data/reference/webhooks/events/page-created)
  - [Page metadata updated](https://developers.webflow.com/data/reference/webhooks/events/page-metadata-updated)
  - [Page deleted](https://developers.webflow.com/data/reference/webhooks/events/page-deleted)

### Branch support for pages and components localization

- **Work with page branches**: Page and Component localization endpoints now support reading and writing to page branches using the `branchId` parameter. This lets you manage draft pages and components separately from published content. To get the `branchId` for a page, use the [List Pages](https://developers.webflow.com/data/reference/pages-and-components/pages/get-content) endpoint.

### Improved file handling

- **Skip invalid files gracefully**: When creating or updating CMS items with attachments, use the `skipInvalidFiles` parameter to handle problematic files more efficiently. When set to `true`, invalid files are skipped and processing continues. When `false`, the entire request fails if any file is invalid.

## JavaScript SDK updates

- `v3.2.0` is [now available](https://www.npmjs.com/package/webflow-api/v/3.2.0) and up to date with latest changes in the Data API v2. See the [SDK changelog](https://github.com/webflow/js-webflow-api/releases/tag/v3.2.0) for more details.

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