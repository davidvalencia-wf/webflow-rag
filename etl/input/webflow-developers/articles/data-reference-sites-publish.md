---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/sites/publish
title: "Publish Site | Webflow Developer Documentation"
published: 2025-11-17
---

Publishes a site to one or more more domains.

To publish to a specific custom domain, use the domain IDs from the [Get Custom Domains](https://developers.webflow.com/data/reference/sites/get-custom-domain) endpoint.

##### Rate limit: 1 publish per minute

This endpoint has a specific rate limit of one successful publish queue per minute.

Required scope \| `sites:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Request

This endpoint expects an object.

customDomainslist of stringsOptional

Array of Custom Domain IDs to publish

publishToWebflowSubdomainbooleanOptionalDefaults to `false`

Choice of whether to publish to the default Webflow Subdomain

### Response

Request accepted

customDomainslist of objects or null

Array of domains objects

Show 3 properties

publishToWebflowSubdomainboolean or nullDefaults to `false`

Flag for publishing to webflow.io subdomain

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