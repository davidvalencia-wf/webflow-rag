---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/ecommerce/products-sk-us/create-product
title: "Create Product & SKU | Webflow Developer Documentation"
published: 2025-11-17
---

Adding a new Product involves creating both a Product Item and a SKU Item, since a Product Item has to have, at minimum, a SKU Item.

To create a new Product with multiple SKUs, you must:

- Create the Product and Default SKU using this endpoint, making sure to add `sku-properties` in the product data.
- You can’t add `sku-values` to the SKU yet, since there are no enum IDs created yet. When this endpoint returns, it will have IDs filled in for the `sku-properties` enums.
- With those IDs, update the default SKU with valid `sku-values` and create any additional SKUs (if needed), with valid `sku-values`.
- You can also create the Product without `sku-properties` and add them in later.
- If you add any `sku` properties, the default SKU will default to the first value of each option.

Upon creation, the default product type will be `Advanced`. The product type is used to determine which Product and SKU fields are shown to users in the `Designer` and the `Editor`. Setting it to `Advanced` ensures that all Product and SKU fields will be shown. The product type can be edited in the `Designer` or the `Editor`.

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "uuid"`

Unique identifier for a Site

### Headers

Accept-VersionstringOptional

The API version

### Request

The product and sku to create

productobjectOptional

The Product object

Show 1 properties

skuobjectOptional

The SKU object

Show 1 properties

### Response

Request was successful

productobject or null

The Product object

Show 7 properties

skuobject or null

The SKU object

Show 7 properties

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