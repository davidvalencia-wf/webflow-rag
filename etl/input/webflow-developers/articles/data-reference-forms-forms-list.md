---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/forms/forms/list
title: "List Forms | Webflow Developer Documentation"
published: 2025-11-17
---

List forms for a given site.

Required scope \| `forms:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Query Parameters

limitdoubleOptional

Maximum number of records to be returned (max limit: 100)

offsetdoubleOptional

Offset used for pagination if the results have more than limit records

### Response

Request was successful

formslist of objects

Show 12 properties

paginationobject

Pagination object

Show 3 properties

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