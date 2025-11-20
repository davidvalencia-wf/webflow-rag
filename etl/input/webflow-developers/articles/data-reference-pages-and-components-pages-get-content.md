---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/pages-and-components/pages/get-content
title: "Get Page Content | Webflow Developer Documentation"
published: 2025-11-17
---

Get text and component instance content from a static page.

Localization

Required scope \| `pages:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

page\_idstringRequired`format: "objectid"`

Unique identifier for a Page

### Query Parameters

localeIdstringOptional

Unique identifier for a specific Locale.

[Lear more about localization.](https://developers.webflow.com/data/v2.0.0/docs/working-with-localization)

limitdoubleOptional

Maximum number of records to be returned (max limit: 100)

offsetdoubleOptional

Offset used for pagination if the results have more than limit records

### Response

Request was successful

pageIdstring or null

Page ID

branchIdstring or null`format: "objectid"`

The unique identifier of a [specific page branch.](https://help.webflow.com/hc/en-us/articles/33961355506195-Page-branching)

nodeslist of objects or null

Show 7 variants

paginationobject or null

Pagination object

Show 3 properties

lastUpdatedstring or null`format: "date-time"`

The date the page dom was most recently updated

### Errors

400

Bad Request Error

401

Unauthorized Error

403

Forbidden Error

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