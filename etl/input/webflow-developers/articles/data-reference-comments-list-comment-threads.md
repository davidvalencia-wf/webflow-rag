---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/comments/list-comment-threads
title: "List Comment Threads | Webflow Developer Documentation"
published: 2025-11-17
---

List all comment threads for a site.

##### Timing of comment threads

There may be a delay of up to 5 minutes before new comments appear in the system.

Required scope \| `comments:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Query Parameters

localeIdstringOptional

Unique identifier for a specific Locale.

[Lear more about localization.](https://developers.webflow.com/data/v2.0.0/docs/working-with-localization)

offsetdoubleOptional

Offset used for pagination if the results have more than limit records

limitdoubleOptional

Maximum number of records to be returned (max limit: 100)

sortByenumOptional

Sort results by the provided value. Only allowed when sortOrder is provided.

Allowed values:createdOnlastUpdated

sortOrderenumOptional

Sorts the results by asc or desc

Allowed values:ascdesc

### Response

Request was successful

commentslist of objects

Show 13 properties

paginationobject

Show 3 properties

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