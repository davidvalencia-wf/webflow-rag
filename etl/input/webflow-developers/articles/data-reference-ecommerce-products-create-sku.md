---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/ecommerce/products/create-sku
title: "Create SKUs | Webflow Developer Documentation"
published: 2025-11-17
---

Create additional SKUs to manage every [option and variant of your Product.](https://help.webflow.com/hc/en-us/articles/33961334531347-Create-product-options-and-variants)

Creating SKUs through the API will set the product type to `Advanced`, which ensures all Product and SKU fields will be shown to users in the Designer.

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

The SKUs to add

skuslist of objectsRequired

An array of the SKU data your are adding

Show 1 properties

publishStatusenumOptionalDefaults to `staging`

Indicate whether your Product should be set as "staging" or "live"

Allowed values:staginglive

### Response

Request was successful

skuslist of objects

Show 6 properties

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