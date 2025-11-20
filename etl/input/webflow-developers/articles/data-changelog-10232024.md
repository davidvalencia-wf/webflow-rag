---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/10232024
title: "Bulk CMS item authoring and management | Webflow Developer Documentation"
published: 2025-11-17
---

[October 23, 2024](https://developers.webflow.com/data/changelog/10232024)

## [Bulk CMS item authoring and management](https://developers.webflow.com/data/changelog/10232024)

## Create and manage multiple CMS items

Scale your content operations with new bulk CMS endpoints supporting up to 100 items per request. These APIs significantly improve large-scale content management workflows, and help prevent rate limiting when working with large collections.

- [Create multiple CMS items](https://developers.webflow.com/data/reference/cms/collection-items/bulk-items/create-items)

Create a single item or multiple items. This endpoint supports creating items across multiple locales and can update up to 100 items in a request.

- [Update multiple CMS items](https://developers.webflow.com/data/reference/cms/collection-items/bulk-items/update-items)

Update a single item or multiple items in a Collection. This endpoint can update up to 100 items in a request.

- [Delete multiple CMS items](https://developers.webflow.com/data/reference/cms/collection-items/bulk-items/delete-items)

Delete Items from a Collection. This endpoint can delete up to 100 items in a request.

## Bulk management for live CMS items

- **[Update live collection items](https://developers.webflow.com/data/reference/cms/collection-items/bulk-live-items/update-items-live)**

Update a single live item or multiple live items in a Collection. This endpoint can update up to 100 items in a request.
- **[Delete live collection items](https://developers.webflow.com/data/reference/cms/collection-items/bulk-live-items/delete-items-live)**

Remove an item or multiple items from the live site. Deleting published items will un-publish the items from the live site and set them to draft. This endpoint can delete up to 100 items in a request.

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