---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/enterprise/site-configuration/301-redirects/patch
title: "Update 301 redirect | Webflow Developer Documentation"
published: 2025-11-17
---

Update a 301 redirection rule from a site.

##### Enterprise Only

This endpoint requires an Enterprise workspace.

Required scope: `sites:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

redirect\_idstringRequired`format: "objectid"`

Unique identifier site rediect

### Request

This endpoint expects an object.

fromUrlstringOptional

The source URL path that will be redirected.

toUrlstringOptional

The target URL path where the user or client will be redirected.

### Response

Request was successful

idstring or null

The ID of the specific redirect rule

fromUrlstring or null

The source URL path that will be redirected.

toUrlstring or null

The target URL path where the user or client will be redirected.

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