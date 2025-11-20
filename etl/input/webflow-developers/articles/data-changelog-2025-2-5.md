---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/2025/2/5
title: "Enhancements to CMS fields and site configuration | Webflow Developer Documentation"
published: 2025-11-17
---

[February 5, 2025](https://developers.webflow.com/data/changelog/2025/2/5)

## [Enhancements to CMS fields and site configuration](https://developers.webflow.com/data/changelog/2025/2/5)

The Data API now supports creating reference fields and creating multiple fields during collection creation.

- **[Create reference fields](https://developers.webflow.com/data/reference/cms/collection-fields/create)**

To create a reference field, choose `MultiReference` or `Reference` as the `type` property in the `field` object. Additionally, include the `metadata` property to specify the `collectionId` of the collection that the reference field will point to. You can create a reference field during collection creation using the [create collection](https://developers.webflow.com/data/reference/cms/collections/create) endpoint or by updating an existing collection using the [create collection field](https://developers.webflow.com/data/reference/cms/collection-fields/create) endpoint.
- **[Create fields during collection creation](https://developers.webflow.com/data/reference/cms/collections/create)**

You can now create multiple fields during collection creation using the [create collection](https://developers.webflow.com/data/reference/cms/collections/create) endpoint. Collections are limited to 60 fields per collection.

## Add and manage `robots.txt`

- **[Configure `robots.txt`](https://developers.webflow.com/data/reference/enterprise/site-configuration/robots-txt/get).**

Use the following endpoints to get and update your `robots.txt` file:
  - [Get `robots.txt`](https://developers.webflow.com/data/reference/enterprise/site-configuration/robots-txt/get)
  - [Replace `robots.txt`](https://developers.webflow.com/data/reference/enterprise/site-configuration/robots-txt/put)
  - [Update `robots.txt`](https://developers.webflow.com/data/reference/enterprise/site-configuration/robots-txt/patch)
  - [Delete `robots.txt`](https://developers.webflow.com/data/reference/enterprise/site-configuration/robots-txt/delete)

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