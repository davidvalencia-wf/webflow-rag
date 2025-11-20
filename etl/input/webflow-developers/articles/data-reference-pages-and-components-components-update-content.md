---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/pages-and-components/components/update-content
title: "Update Component Content | Webflow Developer Documentation"
published: 2025-11-17
---

This endpoint updates content within a component defintion for **secondary locales**. It supports updating up to 1000 nodes in a single request.

Before making updates:

1. Use the [get component content](https://developers.webflow.com/data/reference/pages-and-components/components/get-content) endpoint to identify available content nodes and their types.
2. If your component definition has a component instance nested within it, retrieve the nested component instance’s properties that you’ll override using the [get component properties](https://developers.webflow.com/data/reference/pages-and-components/components/get-properties) endpoint.
3. DOM elements may include a `data-w-id` attribute. This attribute is used by Webflow to maintain custom attributes and links across locales. Always include the original `data-w-id` value in your update requests to ensure consistent behavior across all locales.

This endpoint is specifically for localizing component definitions. Ensure that the specified `localeId` is a valid **secondary locale** for the site otherwise the request will fail.

Required scope \| `components:write`

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

### Request

This endpoint expects an object.

nodeslist of objectsRequired

List of DOM Nodes with the new content that will be updated in each node.

Show 6 variants

### Response

Request was successful

errorslist of strings

A list of error messages, if any.

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