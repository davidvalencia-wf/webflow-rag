---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/cms/items/patch-item
title: "Patch Collection Item | Webflow Developer Documentation"
published: 2025-11-17
---

Update only fields that need to be changed. To upload a new image set the image URL to the corresponding item's field. Collection items that reuse images previously uploaded can just reference their fileId property.

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

collection\_idstringRequired`format: "uuid"`

Unique identifier for a Collection

item\_idstringRequired`format: "uuid"`

Unique identifier for and Item

### Headers

Accept-VersionstringOptional

The API version

### Query Parameters

livebooleanOptional

Boolean indicating if the item(s) should be published/unpublished to/from the live site

### Request

The item to update

fieldsobjectOptional

Fields in your collection item

Show 4 properties

### Response

Request was successful

\_archivedboolean or nullDefaults to `false`

Boolean determining if the Item is set to archived

\_draftboolean or nullDefaults to `false`

Boolean determining if the Item is set to draft

\_idstring or null

Unique identifier for the Item

\_cidstring or null

Unique identifier for the Collection the Item belongs within

namestring or null

Name given to the Item

slugstring or null

URL structure of the Item in your site. Note: Updates to an item slug will break all links referencing the old slug.

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

[Webflow Data API V1 is deprecated. Please view the V2 version of our API reference](https://developers.webflow.com/data/reference/rest-introduction)