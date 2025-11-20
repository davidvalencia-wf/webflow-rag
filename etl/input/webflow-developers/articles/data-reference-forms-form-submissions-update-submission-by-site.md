---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/forms/form-submissions/update-submission-by-site
title: "Update Form Submission | Webflow Developer Documentation"
published: 2025-11-17
---

Update hidden fields on a form submission within a specific site.

Required scope \| `forms:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

form\_submission\_idstringRequired`format: "objectid"`

Unique identifier for a Form Submission

### Request

This endpoint expects an object.

formSubmissionDataobjectOptional

An existing **hidden field** defined on the form schema, and the corresponding value to set

### Response

Request was successful

idstring or null`format: "objectid"`

The unique ID of the Form submission

displayNamestring or null

The Form name displayed on the site

siteIdstring or null`format: "objectid"`

The unique ID of the Site the Form belongs to

workspaceIdstring or null`format: "objectid"`

The unique ID of the Workspace the Site belongs to

dateSubmittedstring or null`format: "date-time"`

Date that the Form was submitted on

formResponseobject or null

The data submitted in the Form

### Errors

400

Bad Request Error

401

Unauthorized Error

403

Forbidden Error

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