---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/cms/collection-fields/update
title: "Update field | Webflow Developer Documentation"
published: 2025-11-17
---

Update a custom field in a collection.

Required scope \| `cms:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

collection\_idstringRequired`format: "objectid"`

Unique identifier for a Collection

field\_idstringRequired`format: "objectid"`

Unique identifier for a Field in a collection

### Request

The field details to update

isRequiredbooleanOptional

Define whether a field is required in a collection

displayNamestringOptional

The name of a field

helpTextstringOptional

Additional text to help anyone filling out this field

### Response

Request was successful

idstring`format: "objectid"`

Unique identifier for a Field

isRequiredboolean

define whether a field is required in a collection

typeenum

Choose these appropriate field type for your collection data

Show 17 enum values

displayNamestring

The name of a field

isEditableboolean or null

Define whether the field is editable

slugstring or null

Slug of Field in Site URL structure. Slugs should be all lowercase with no spaces. Any spaces will be converted to ”-.”

helpTextstring or null

Additional text to help anyone filling out this field

validationsobject or null

The validations for the field

Show 1 properties

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