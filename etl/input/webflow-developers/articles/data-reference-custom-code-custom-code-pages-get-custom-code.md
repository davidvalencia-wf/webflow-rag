---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/custom-code/custom-code-pages/get-custom-code
title: "Get Custom Code | Webflow Developer Documentation"
published: 2025-11-17
---

Get all scripts applied to a page.

Required scope \| `custom_code:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

page\_idstringRequired`format: "objectid"`

Unique identifier for a Page

### Response

Request was successful

scriptslist of objects or null

A list of scripts applied to a Site or a Page

Show 4 properties

lastUpdatedstring or null`format: "date-string"`

Date when the Site's scripts were last updated

createdOnstring or null`format: "date-string"`

Date when the Site's scripts were created

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