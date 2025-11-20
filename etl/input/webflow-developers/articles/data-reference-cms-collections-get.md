---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/cms/collections/get
title: "Get Collection Details | Webflow Developer Documentation"
published: 2025-11-17
---

Get the full details of a collection from its ID.

Required scope \| `cms:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

collection\_idstringRequired`format: "objectid"`

Unique identifier for a Collection

### Response

Request was successful

idstring`format: "objectid"`

Unique identifier for a Collection

displayNamestring

Name given to the Collection

singularNamestring

The name of one Item in Collection (e.g. ”Blog Post” if the Collection is called “Blog Posts”)

fieldslist of objects

The list of fields in the Collection

Show 8 properties

slugstring or null

Slug of Collection in Site URL structure

createdOnstring or null`format: "date-time"`

The date the collection was created

lastUpdatedstring or null`format: "date-time"`

The date the collection was last updated

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