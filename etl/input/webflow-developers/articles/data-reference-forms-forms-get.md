---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/forms/forms/get
title: "Get Form Schema | Webflow Developer Documentation"
published: 2025-11-17
---

Get information about a given form.

Required scope \| `forms:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

form\_idstringRequired`format: "objectid"`

Unique identifier for a Form

### Response

Request was successful

displayNamestring or null

The Form name displayed on the site

createdOnstring or null`format: "date-time"`

Date that the Form was created on

lastUpdatedstring or null`format: "date-time"`

Date that the Form was last updated on

fieldsmap from strings to objects or null

A collection of form field objects

Show 4 properties

responseSettingsobject or null

Settings for form responses

Show 4 properties

idstring or null`format: "objectid"`

The unique ID for the Form

siteIdstring or null`format: "objectid"`

The unique ID of the Site the Form belongs to

siteDomainIdstring or null`format: "objectid"`

The unique ID corresponding to the site's Domain name

pageIdstring or null`format: "objectid"`

The unique ID for the Page on which the Form is placed

pageNamestring or null

The user-visible name of the Page where the Form is placed

formElementIdstring or null

The unique ID of the Form element

workspaceIdstring or null`format: "objectid"`

The unique ID of the Workspace the Site belongs to

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