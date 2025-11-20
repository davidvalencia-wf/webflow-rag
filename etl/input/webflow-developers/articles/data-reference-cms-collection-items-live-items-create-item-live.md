---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/cms/collection-items/live-items/create-item-live
title: "Create Live Items | Webflow Developer Documentation"
published: 2025-11-17
---

Create item(s) in a collection that will be immediately published to the live site.

To create items across multiple locales, [please use this endpoint.](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/create-items)

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

Details of the item(s) to create

Collection ItemobjectRequired

A Collection Item represents a single entry in your collection. Each item includes:

- **System metadata** \- Automatically managed fields like IDs and timestamp

- **Status flags** \- Controls for managing content state: `isDraft`, `isArchived`

- **Content fields** \- Stored in `fieldData`. Each item needs a `name` and `slug`, and may include additional fields matching your collection’s schema definition.

Show 4 properties

OR

Multiple Live ItemsobjectRequired

Show 1 properties

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