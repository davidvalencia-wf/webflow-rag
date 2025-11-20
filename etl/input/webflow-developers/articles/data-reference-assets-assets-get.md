---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/assets/assets/get
title: "Get Asset | Webflow Developer Documentation"
published: 2025-11-17
---

Get details about an asset

Required scope \| `assets:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

asset\_idstringRequired`format: "objectid"`

Unique identifier for an Asset on a site

### Response

Request was successful

idstring`format: "objectid"`

Unique identifier for this asset

contentTypestring`format: "mime-type"`

File format type

sizeinteger

size in bytes

siteIdstring`format: "objectid"`

Unique identifier for the site that hosts this asset

hostedUrlstring`format: "uri"`

Link to the asset

originalFileNamestring

Original file name at the time of upload

displayNamestring

Display name of the asset

lastUpdatedstring`format: "date-time"`

Date the asset metadata was last updated

createdOnstring`format: "date-time"`

Date the asset metadata was created

variantslist of objects

A list of [asset variants](https://help.webflow.com/hc/en-us/articles/33961378697107-Responsive-images) created by Webflow to serve your site responsively.

Show 8 properties

altTextstring or null

The visual description of the asset

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