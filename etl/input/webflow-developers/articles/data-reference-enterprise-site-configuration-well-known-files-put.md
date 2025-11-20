---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/enterprise/site-configuration/well-known-files/put
title: "Set a well-known file | Webflow Developer Documentation"
published: 2025-11-17
---

Upload a supported well-known file to a site.

The current restrictions on well-known files are as follows:

- Each file must be smaller than 100kb
- Less than 30 total files
- Have one of the following file extensions (or no extension): `.txt`, `.json`, `.noext`

##### .noext

`.noext` is a special file extension that removes other extensions. For example, `apple-app-site-association.noext.txt` will be uploaded as `apple-app-site-association`. Use this extension for tools that have trouble uploading extensionless files.

##### Enterprise Only

This endpoint requires an Enterprise workspace.

Required scope: `site_config:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Request

This endpoint expects an object.

fileNamestringRequired

The name of the file

fileDatastringRequired

The contents of the file

contentTypeenumOptionalDefaults to `application/json`

The content type of the file. Defaults to application/json

Allowed values:application/jsontext/plain

### Response

File uploaded successfully

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