---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/11212024
title: "Bulk CMS authoring improvements and Localization updates | Webflow Developer Documentation"
published: 2025-11-17
---

[November 21, 2024](https://developers.webflow.com/data/changelog/11212024)

## [Bulk CMS authoring improvements and Localization updates](https://developers.webflow.com/data/changelog/11212024)

## Bulk CMS authoring

The [Create Collection Items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/create-item) endpoint now supports bulk creation. You can create multiple CMS items in a single request by passing an array of items to the `items` property. This provides a more efficient way to create multiple items while maintaining compatibility with the existing [bulk Create Items endpoint](https://developers.webflow.com/data/reference/cms/collection-items/bulk-items/create-items).

## Introducing the `localeId` Parameter

Webflow is standardizing query parameter naming by introducing `localeId` as the preferred parameter name, replacing `locale`. For backward compatibility, the `locale` parameter will continue to work, but it’s recommended to use `localeId` in all new implementations. This change affects the following endpoints:

- [List Pages](https://developers.webflow.com/data/reference/pages/list)
- [Get Page Metadata](https://developers.webflow.com/data/reference/pages/get-metadata)
- [Update Page Metadata](https://developers.webflow.com/data/reference/pages/update-page-settings)
- [Get Page Content](https://developers.webflow.com/data/reference/pages/get-content)
- [Update Page Content](https://developers.webflow.com/data/reference/pages/update-static-content)

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