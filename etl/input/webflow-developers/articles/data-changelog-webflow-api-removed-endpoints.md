---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/webflow-api-removed-endpoints
title: "Removed endpoints from Webflow API v2 | Webflow Developer Documentation"
published: 2025-11-17
---

[August 23, 2023](https://developers.webflow.com/data/changelog/webflow-api-removed-endpoints)

## [Removed endpoints from Webflow API v2](https://developers.webflow.com/data/changelog/webflow-api-removed-endpoints)

Effective August 29th, 2023, the following endpoints have been deprecated in Webflow Data API v2 as part of Webflow’s API improvements:

## Removed functionality

### User access group management

**PUT `/sites/{site_id}/users/{user_id}/accessgroups`**

This functionality is now consolidated into the [Update User](https://developers.webflow.com/data/reference/users/users/update) API endpoint, providing a more consistent experience for managing user permissions.

### Bulk CMS item deletion

**DELETE `/collections/{collection_id}/items`**

This functionality has been removed to ensure more controlled content management. Individual item deletion is still supported.

This change doesn’t impact any API endpoints in the legacy API version. Existing integrations using the legacy API will continue to function as expected.

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