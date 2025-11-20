---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/ecommerce/products/update
title: "Update Product | Webflow Developer Documentation"
published: 2025-11-17
---

Update an existing Product.

Updating an existing Product will set the product type to `Advanced`, which ensures all Product and SKU fields will be shown to users in the Designer.

Required scope \| `ecommerce:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

product\_idstringRequired`format: "objectid"`

Unique identifier for a Product

### Request

The product to update

publishStatusenumOptionalDefaults to `staging`

Indicate whether your Product should be set as "staging" or "live"

Allowed values:staginglive

productobjectOptional

The Product object

Show 3 properties

skuobjectOptional

The SKU object

Show 1 properties

### Response

Request was successful

idstring or null

Unique identifier for the Product

cmsLocaleIdstring or null

Identifier for the locale of the CMS item

lastPublishedstring or null`format: "date-time"`

The date the Product was last published

lastUpdatedstring or null`format: "date-time"`

The date the Product was last updated

createdOnstring or null`format: "date-time"`

The date the Product was created

isArchivedboolean or nullDefaults to `false`

Boolean determining if the Product is set to archived

isDraftboolean or nullDefaults to `false`

Boolean determining if the Product is set to draft

fieldDataobject or null

Contains content-specific details for a product, covering both standard (e.g., title, description) and custom fields tailored to the product setup.

Show 9 properties

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