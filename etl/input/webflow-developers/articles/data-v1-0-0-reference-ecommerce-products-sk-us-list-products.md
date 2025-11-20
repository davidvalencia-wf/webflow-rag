---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/ecommerce/products-sk-us/list-products
title: "List Products & SKUs | Webflow Developer Documentation"
published: 2025-11-17
---

Retrieve all products for a site. Use `limit` and `offset` to page through all products with subsequent requests. All SKUs for each product will also be fetched and returned. The `count`, `limit` and `offset` and `total` values represent Products only and do not include any SKUs.

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "uuid"`

Unique identifier for a Site

### Headers

Accept-VersionstringOptional

The API version

### Query Parameters

offsetdoubleOptional

Offset used for pagination if the results have more than limit records

limitdoubleOptional

Maximum number of records to be returned (max limit: 100)

### Response

Request was successful

itemslist of objects or null

List of Item objects within the Collection. Contains product and skus keys

Show 7 properties

countdouble or null

Number of items returned

limitdouble or nullDefaults to `100`

The limit specified in the request

offsetdouble or nullDefaults to `0`

The offset specified for pagination

totaldouble or null

Total number of items in the collection

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