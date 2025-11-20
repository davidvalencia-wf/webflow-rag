---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/cms/collection-items/live-items/list-items-live
title: "List Live Items | Webflow Developer Documentation"
published: 2025-11-17
---

List all published items in a collection.

##### Serve data with the Content Delivery API

Serving data to applications in real-time? Use the Content Delivery API at `api-cdn.webflow.com` for better performance. The CDN-backed endpoint is optimized for high-volume reads, while the Data API is designed for writes and management operations.

Required scope \| `CMS:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

collection\_idstringRequired`format: "objectid"`

Unique identifier for a Collection

### Query Parameters

cmsLocaleIdstringOptional

Unique identifier for a CMS Locale. This UID is different from the Site locale identifier and is listed as `cmsLocaleId` in the Sites response. To query multiple locales, input a comma separated string.

offsetdoubleOptional

Offset used for pagination if the results have more than limit records

limitdoubleOptional

Maximum number of records to be returned (max limit: 100)

namestringOptional

Filter by the exact name of the item(s)

slugstringOptional

Filter by the exact slug of the item

lastPublishedobjectOptional

Filter by the last published date of the item(s)

Show 2 properties

sortByenumOptional

Sort results by the provided value

Allowed values:lastPublishednameslug

sortOrderenumOptional

Sorts the results by asc or desc

Allowed values:ascdesc

### Response

Request was successful

itemslist of objects

List of Items within the collection

Show 8 properties

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