---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/cms/collection-items/live-items/update-items-live
title: "Update Live Items | Webflow Developer Documentation"
published: 2025-11-17
---

Update a single published item or multiple published items (up to 100) in a Collection

##### Localization Tip

Items will only be updated in the primary locale, unless a `cmsLocaleId` is included in the request.

Required scope \| `CMS:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

collection\_idstringRequired`format: "objectid"`

Unique identifier for a Collection

### Query Parameters

skipInvalidFilesbooleanOptionalDefaults to `true`

When true, invalid files are skipped and processing continues. When false, the entire request fails if any file is invalid.

### Request

Details of the live items to update

itemslist of objectsOptional

Show 5 properties

### Response

Request was successful

itemslist of objects or null

List of Items within the collection

Show 8 properties

### Errors

400

Bad Request Error

401

Unauthorized Error

404

Not Found Error

409

Conflict Error

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