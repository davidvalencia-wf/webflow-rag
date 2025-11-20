---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/ecommerce/settings/get-settings
title: "Get Ecommerce Settings | Webflow Developer Documentation"
published: 2025-11-17
---

Retrieve ecommerce settings for a site.

Required scope \| `ecommerce:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Response

Request was successful

siteIdstring or null`format: "objectid"`

The identifier of the Site

createdOnstring or null`format: "date-time"`

Date that the Site was created on

defaultCurrencystring or null

The three-letter ISO currency code for the Site

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