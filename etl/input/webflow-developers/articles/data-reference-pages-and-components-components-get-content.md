---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/pages-and-components/components/get-content
title: "Get Component Content | Webflow Developer Documentation"
published: 2025-11-17
---

Get static content from a component definition. This includes text nodes, image nodes, select nodes, text input nodes, submit button nodes, and nested component instances.
To retrieve dynamic content set by component properties, use the [get component properties](https://developers.webflow.com/data/reference/pages-and-components/components/get-properties) endpoint.

If you do not provide a Locale ID in your request, the response will return any content that can be localized from the Primary locale.

Required scope \| `components:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

component\_idstringRequired

Unique identifier for a Component

### Query Parameters

localeIdstringOptional

Unique identifier for a specific Locale.

[Lear more about localization.](https://developers.webflow.com/data/v2.0.0/docs/working-with-localization)

branchIdstringOptional`format: "objectid"`

Scope the operation to work on a specific branch.

limitdoubleOptional

Maximum number of records to be returned (max limit: 100)

offsetdoubleOptional

Offset used for pagination if the results have more than limit records

### Response

Request was successful

componentIdstring or null

Component ID

nodeslist of objects or null

Show 7 variants

paginationobject or null

Pagination object

Show 3 properties

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