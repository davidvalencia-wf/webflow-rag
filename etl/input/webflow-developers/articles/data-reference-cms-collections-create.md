---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/cms/collections/create
title: "Create Collection | Webflow Developer Documentation"
published: 2025-11-17
---

Create a Collection for a site with collection fields.

Each collection includes the required _name_ and _slug_ fields, which are generated automatically. You can update the `displayName` of these fields, but the slug for them cannot be changed. Fields slugs are automatically converted to lowercase. Spaces in slugs are replaced with hyphens.

Required scope \| `cms:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Request

Pass the Name of the collection, as well as the singular name of each item in the collection.

displayNamestringRequired

Name of the collection. Each collection name must be distinct.

singularNamestringRequired

Singular name of each item.

slugstringOptional

Part of a URL that identifier

fieldslist of objectsOptional

An array of custom fields to add to the collection

Show 3 variants

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