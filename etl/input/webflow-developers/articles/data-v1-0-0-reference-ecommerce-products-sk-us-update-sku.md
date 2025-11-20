---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/ecommerce/products-sk-us/update-sku
title: "Update SKU | Webflow Developer Documentation"
published: 2025-11-17
---

Updating an existing SKU will set the product type to `Advanced` for the product associated with the SKU. The product type is used to determine which Product and SKU fields are shown to users in the `Designer` and the `Editor`. Setting it to `Advanced` ensures that all Product and SKU fields will be shown. The product type can be edited in the `Designer` or the `Editor`.

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "uuid"`

Unique identifier for a Site

product\_idstringRequired`format: "uuid"`

Unique identifier for a Product

sku\_idstringRequired`format: "uuid"`

Unique identifier for a SKU

### Headers

Accept-VersionstringOptional

The API version

### Request

The SKU to update

skuobjectOptional

The SKU object

Show 1 properties

### Response

Request was successful

\_idstring`format: "uuid"`

Unique identifier for collection

namestring

Name given to Collection

slugstring

Slug of Collection in Site URL structure

fieldsobject

Fields in your SKU object

Show 6 properties

lastUpdatedstring or null`format: "date-time"`

The date the collection was last updated

createdOnstring or null`format: "date-time"`

The date the collection was create

singularNamestring or null

The name of one Item in Collection (e.g. “sku” if the Collection is called “SKU”)

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