---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/custom-code/custom-code-pages/delete-custom-code
title: "Delete Custom Code | Webflow Developer Documentation"
published: 2025-11-17
---

Remove all scripts from a page applied by the App. This endpoint will not remove scripts from the site’s registered scripts.

To remove individual scripts applied by the App, use the [Add/Update Custom Code](https://developers.webflow.com/data/reference/custom-code/custom-code-pages/upsert-custom-code) endpoint.

Access to this endpoint requires a bearer token obtained from an [OAuth Code Grant Flow](https://developers.webflow.com/data/reference/oauth-app).

Required scope \| `custom_code:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

page\_idstringRequired`format: "objectid"`

Unique identifier for a Page

### Response

Request was successful. No Content is returned.

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