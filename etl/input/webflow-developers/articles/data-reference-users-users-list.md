---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/users/users/list
title: "List Users | Webflow Developer Documentation"
published: 2025-11-17
---

Get a list of users for a site

Required scope \| `users:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Query Parameters

offsetdoubleOptional

Offset used for pagination if the results have more than limit records

limitdoubleOptional

Maximum number of records to be returned (max limit: 100)

sortenumOptional

Sort string to use when ordering users

Example(`CreatedOn`, `Email`, `Status`, `LastLogin`, `UpdatedOn`).

Can be prefixed with a `-` to reverse the sort (ex. `-CreatedOn`)

Show 10 enum values

### Response

Request was successful

countdouble or null

Number of users returned

limitdouble or nullDefaults to `10`

The limit specified in the request

offsetdouble or nullDefaults to `0`

The offset specified for pagination

totaldouble or null

Total number of users in the collection

userslist of objects or null

List of Users for a Site

Show 9 properties

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