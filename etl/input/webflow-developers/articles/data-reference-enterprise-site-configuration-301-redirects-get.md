---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/enterprise/site-configuration/301-redirects/get
title: "Get 301 redirects | Webflow Developer Documentation"
published: 2025-11-17
---

Fetch a list of all 301 redirect rules configured for a specific site.

Use this endpoint to review, audit, or manage the redirection rules that control how traffic is rerouted on your site.

##### Enterprise Only

This endpoint requires an Enterprise workspace.

Required scope: `sites:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Response

Request was successful

redirectslist of objects or null

List of redirects for a given site

Show 3 properties

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