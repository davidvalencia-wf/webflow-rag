---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/custom-code/custom-code/register-hosted
title: "Register Script - Hosted | Webflow Developer Documentation"
published: 2025-11-17
---

Register a hosted script to a site.

##### Script Registration

To apply a script to a site or page, the script must first be registered to a site via the [Register Script](https://developers.webflow.com/data/reference/custom-code/custom-code/register-hosted) endpoints. Once registered, the script can be applied to a Site or Page using the appropriate endpoints. See the documentation on [working with Custom Code](https://developers.webflow.com/data/docs/custom-code) for more information.

Required scope \| `custom_code:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Request

This endpoint expects an object.

hostedLocationstringRequired

URI for an externally hosted script location

integrityHashstringRequired`format: "hash"`

Sub-Resource Integrity Hash

versionstringRequired

A Semantic Version (SemVer) string, denoting the version of the script

displayNamestringRequired

User-facing name for the script. Must be between 1 and 50 alphanumeric characters

canCopybooleanOptionalDefaults to `false`

Define whether the script can be copied on site duplication and transfer

### Response

Request was successful

idstring or null

Human readable id, derived from the user-specified display name

canCopyboolean or nullDefaults to `false`

Define whether the script can be copied on site duplication and transfer

displayNamestring or null

User-facing name for the script. Must be between 1 and 50 alphanumeric characters

hostedLocationstring or null

URI for an externally hosted script location

integrityHashstring or null`format: "hash"`

Sub-Resource Integrity Hash. Only required for externally hosted scripts (passed via hostedLocation)

createdOnstring or null`format: "date-string"`

Timestamp when the script version was created

lastUpdatedstring or null`format: "date-string"`

Timestamp when the script version was last updated

versionstring or null

A Semantic Version (SemVer) string, denoting the version of the script

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