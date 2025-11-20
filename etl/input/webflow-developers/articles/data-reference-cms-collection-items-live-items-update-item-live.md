---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/cms/collection-items/live-items/update-item-live
title: "Update Single Live Item | Webflow Developer Documentation"
published: 2025-11-17
---

Update a selected live Item in a Collection. The updates for this Item will be published to the live site.

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

skipInvalidFilesbooleanOptionalDefaults to `true`

When true, invalid files are skipped and processing continues. When false, the entire request fails if any file is invalid.

### Request

Details of the item to update

cmsLocaleIdstringOptional

Identifier for the locale of the CMS item

isArchivedbooleanOptional

Boolean determining if the Item is set to archived

isDraftbooleanOptional

Boolean determining if the Item is set to draft

fieldDataobjectOptional

Show 2 properties

### Response

Request was successful

idstring

Unique identifier for the Item

lastPublishedstring`format: "date-string"`

The date the item was last published

lastUpdatedstring`format: "date-string"`

The date the item was last updated

createdOnstring`format: "date-string"`

The date the item was created

fieldDataobject

Show 2 properties

cmsLocaleIdstring or null

Identifier for the locale of the CMS item

isArchivedboolean or nullDefaults to `false`

Boolean determining if the Item is set to archived

isDraftboolean or nullDefaults to `false`

Boolean determining if the Item is set to draft

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