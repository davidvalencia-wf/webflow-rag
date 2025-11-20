---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/ecommerce/products/create
title: "Create Product & SKU | Webflow Developer Documentation"
published: 2025-11-17
---

Create a new ecommerce product and defaultSKU. A product, at minimum, must have a single SKU.

To create a product with multiple SKUs:

- First, create a list of `sku-properties`, also known as [product options](https://help.webflow.com/hc/en-us/articles/33961334531347-Create-product-options-and-variants). For example, a T-shirt product may have a “color” `sku-property`, with a list of enum values: red, yellow, and blue, another `sku-property` may be “size”, with a list of enum values: small, medium, and large.
- Once, a product is created with a list of `sku-properties`, Webflow will create a **default SKU**, which is always a combination of the first `enum` values of each `sku-property`. (e.g. Small - Red - T-Shirt)
- After creation, you can create additional SKUs for the product, using the [Create SKUs endpoint.](https://developers.webflow.com/data/reference/ecommerce/products/create-sku)

Upon creation, the default product type will be `Advanced`, which ensures all Product and SKU fields will be shown to users in the Designer.

Required scope \| `ecommerce:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Request

The Product and SKU to create

productobjectRequired

Show 1 properties

skuobjectRequired

Show 1 properties

publishStatusenumOptionalDefaults to `staging`

Indicate whether your Product should be set as "staging" or "live"

Allowed values:staginglive

### Response

Request was successful

productobject or null

The Product object

Show 8 properties

skuslist of objects or null

A list of SKU Objects

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