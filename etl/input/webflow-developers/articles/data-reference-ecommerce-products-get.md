---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/ecommerce/products/get
title: "Get Product and SKUs | Webflow Developer Documentation"
published: 2025-11-17
---

Retrieve a single product by its ID. All of its SKUs will also be
retrieved.

Required scope \| `ecommerce:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

product\_idstringRequired`format: "objectid"`

Unique identifier for a Product

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