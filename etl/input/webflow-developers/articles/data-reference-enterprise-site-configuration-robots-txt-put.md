---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/enterprise/site-configuration/robots-txt/put
title: "Replace robots.txt | Webflow Developer Documentation"
published: 2025-11-17
---

Replace the `robots.txt` configuration for various user agents.

##### Enterprise Only

This endpoint requires an Enterprise workspace.

Required scope \| `site_config:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Request

This endpoint expects an object.

ruleslist of objectsOptional

List of rules for user agents.

Show 3 properties

sitemapstringOptional

URL to the sitemap.

### Response

Request was successful

ruleslist of objects or null

List of rules for user agents.

Show 3 properties

sitemapstring or null

URL to the sitemap.

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