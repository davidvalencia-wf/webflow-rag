---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-item-live
title: "Unpublish Single Live Item | Webflow Developer Documentation"
published: 2025-11-17
---

Unpublish a live item from the site and set the `isDraft` property to `true`.

For bulk unpublishing, please use [this endpoint.](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/delete-items-live)

Required scope \| `CMS:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

collection\_idstringRequired`format: "objectid"`

Unique identifier for a Collection

item\_idstringRequired`format: "objectid"`

Unique identifier for an Item

### Query Parameters

cmsLocaleIdstringOptional

Unique identifier for a CMS Locale. This UID is different from the Site locale identifier and is listed as `cmsLocaleId` in the Sites response. To query multiple locales, input a comma separated string.

### Response

Request was successful

### Errors

400

Bad Request Error

401

Unauthorized Error

404

Not Found Error

429

Too Many Requests Error

500

Internal Server Error

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