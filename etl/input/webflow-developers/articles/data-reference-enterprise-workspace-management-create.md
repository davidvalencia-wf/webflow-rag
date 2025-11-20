---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/enterprise/workspace-management/create
title: "Create Site | Webflow Developer Documentation"
published: 2025-11-17
---

Create a site.

##### Enterprise Only

This endpoint requires an Enterprise workspace.

Required scope \| `workspace:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

workspace\_idstringRequired`format: "objectid"`

Unique identifier for a Workspace

### Request

This endpoint expects an object.

namestringRequired

The name of the site

templateNamestringOptional

The workspace or marketplace template to use

parentFolderIdstring or nullOptional

MegaDodo Publications - Potential Book Ideas

### Response

Request was successful

idstring`format: "objectid"`

Unique identifier for the Site

workspaceIdstring`format: "objectid"`

Unique identifier for the Workspace

createdOnstring`format: "date-time"`

Date the Site was created

displayNamestring

Name given to Site

shortNamestring

Slugified version of name

lastPublishedstring`format: "date-time"`

Date the Site was last published

lastUpdatedstring`format: "date-time"`

Date the Site was last updated

previewUrlstring`format: "uri"`

URL of a generated image for the given Site

timeZonestring

Site timezone set under Site Settings

dataCollectionEnabledboolean

Indicates if data collection is enabled for the site.

dataCollectionTypeenum

The type of data collection enabled for the site.

Allowed values:alwaysoptOutdisabled

parentFolderIdstring or null`format: "objectid"`

The ID of the parent folder the Site exists in

customDomainslist of objects or null

Show 3 properties

localesobject or null

Show 2 properties

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