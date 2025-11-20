---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/ecommerce/inventory/update
title: "Update Item Inventory | Webflow Developer Documentation"
published: 2025-11-17
---

Updates the current inventory levels for a particular SKU item.

Updates may be given in one or two methods, absolutely or incrementally.

- Absolute updates are done by setting `quantity` directly.
- Incremental updates are by specifying the inventory delta in `updateQuantity` which is then added to the `quantity` stored on the server.

Required scope \| `ecommerce:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

sku\_collection\_idstringRequired`format: "objectid"`

Unique identifier for a SKU collection. Use the List Collections API to find this ID.

sku\_idstringRequired`format: "objectid"`

Unique identifier for a SKU

### Request

The updated inventory

inventoryTypeenumRequired

infinite or finite

Allowed values:infinitefinite

updateQuantitydoubleOptional

Adds this quantity to currently store quantity. Can be negative.

quantitydoubleOptional

Immediately sets quantity to this value.

### Response

Request was successful

idstring or null`format: "objectid"`

Unique identifier for a SKU item

quantitydouble or null

Total quantity of items remaining in inventory (if inventoryType is finite)

inventoryTypeenum or null

infinite or finite

Allowed values:infinitefinite

### Errors

400

Bad Request Error

401

Unauthorized Error

403

Forbidden Error

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