---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/ecommerce/inventory/update-inventory
title: "Update Item Inventory | Webflow Developer Documentation"
published: 2025-11-17
---

Updates the current inventory levels for a particular SKU item. Updates may be
given in one or two methods, absolutely or incrementally. Absolute updates
are done by setting `quantity` directly. Incremental updates are by specifying
the inventory delta in `updateQuantity` which is then added to the `quantity`
stored on the server.

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

### Request

The updated inventory

fieldsobjectOptional

The inventory fields to update

Show 3 properties

### Response

Request was successful

\_idstring or null`format: "uuid"`

Unique identifier for a SKU item

quantitydouble or null

Total quantity of items remaining in inventory (if finite)

inventoryTypeenum or null

infinite or finite

Allowed values:infinitefinite

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