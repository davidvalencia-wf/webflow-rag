---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/pages-and-components/components/update-properties
title: "Update Component Properties | Webflow Developer Documentation"
published: 2025-11-17
---

Update the default property values of a component definition in a specificed locale.

Before making updates:

1. Use the [get component properties](https://developers.webflow.com/data/reference/pages-and-components/components/get-properties) endpoint to identify properties that can be updated in a secondary locale.
2. Rich Text properties may include a `data-w-id` attribute. This attribute is used by Webflow to maintain links across locales. Always include the original `data-w-id` value in your update requests to ensure consistent behavior across all locales.

The request requires a secondary locale ID. If a `localeId` is missing, the request will not be processed and will result in an error.

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

propertieslist of objectsRequired

A list of component properties to update within the specified secondary locale.

Show 2 properties

### Response

Request was successful

errorslist of strings

A list of error messages, if any.

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