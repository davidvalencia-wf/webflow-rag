---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/get
title: "Get Workspace Audit Logs | Webflow Developer Documentation"
published: 2025-11-17
---

Get audit logs for a workspace.

##### Enterprise & workspace API token only

This endpoint requires an Enterprise workspace and a workspace token with the `workspace_activity:read` scope. Create a workspace token from your workspace dashboard integrations page to use this endpoint.

Required scope \| `workspace_activity:read`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

workspace\_id\_or\_slugstringRequired`format: "objectid"`

Unique identifier or slug for a Workspace

### Query Parameters

limitdoubleOptional

Maximum number of records to be returned (max limit: 100)

offsetdoubleOptional

Offset used for pagination if the results have more than limit records

sortOrderenumOptional

Sorts the results by asc or desc

Allowed values:ascdesc

eventTypeenumOptional

The event type to filter by

Allowed values:user\_accesscustom\_roleworkspace\_membershipsite\_membershipworkspace\_invitation

fromstringOptional`format: "date-time"`

The start date to filter by

tostringOptional`format: "date-time"`

The end date to filter by

### Response

A list of workspace audit logs

itemslist of objects or null

Show 5 variants

paginationobject or null

Pagination object

Show 3 properties

### Errors

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