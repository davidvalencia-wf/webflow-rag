---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/assets/asset-folders/get-folder
title: "Get Asset Folder | Webflow Developer Documentation"
published: 2025-11-17
---

Get details about a specific Asset Folder

Required scope \| `assets:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

asset\_folder\_idstringRequired`format: "objectid"`

Unique identifier for an Asset Folder

### Response

Request was successful

idstring or null`format: "objectid"`

Unique identifier for the Asset Folder

displayNamestring or null

User visible name for the Asset Folder

parentFolderstring or null

Pointer to parent Asset Folder (or null if root)

assetslist of strings or null

Array of Asset instances in the folder

siteIdstring or null`format: "objectid"`

The unique ID of the site the Asset Folder belongs to

createdOnstring or null`format: "date-time"`

Date that the Asset Folder was created on

lastUpdatedstring or null`format: "date-time"`

Date that the Asset Folder was last updated on

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