---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/forms/form-submissions/list-submissions
title: "List Form Submissions by Form | Webflow Developer Documentation"
published: 2025-11-17
---

List form submissions for a given form

##### Forms in components

When a form is used in a component definition, each instance of the form is considered a unique form.

To get a combined list of submissions for a form that appears across multiple component instances, use the [List Form Submissions by Site](https://developers.webflow.com/data/reference/forms/form-submissions/list-submissions-by-site) endpoint.

Required scope \| `forms:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

form\_idstringRequired`format: "objectid"`

Unique identifier for a Form

### Query Parameters

offsetdoubleOptional

Offset used for pagination if the results have more than limit records

limitdoubleOptional

Maximum number of records to be returned (max limit: 100)

### Response

Request was successful

formSubmissionslist of objects or null

Show 6 properties

paginationobject or null

Pagination object

Show 3 properties

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