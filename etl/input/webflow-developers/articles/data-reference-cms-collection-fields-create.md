---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/cms/collection-fields/create
title: "Create field | Webflow Developer Documentation"
published: 2025-11-17
---

Create a custom field in a collection.

Field validation is currently not available through the API.

Bulk creation of fields is not supported with this endpoint. To add multiple fields at once, include them when you [create the collection.](https://developers.webflow.com/data/v2.0.0/reference/cms/collections/create)

Required scope \| `cms:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

collection\_idstringRequired`format: "objectid"`

Unique identifier for a Collection

### Request

The field to create

Static FieldobjectRequired

Show 4 properties

OR

Option FieldobjectRequired

Show 5 properties

OR

Reference FieldobjectRequired

Show 5 properties

### Response

Request was successful

Static Fieldobject

Show 6 properties

OR

Option Fieldobject

Show 7 properties

OR

Reference Fieldobject

Show 7 properties

### Errors

400

Bad Request Error

401

Unauthorized Error

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