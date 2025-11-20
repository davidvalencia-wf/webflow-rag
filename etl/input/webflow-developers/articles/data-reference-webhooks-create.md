---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/webhooks/create
title: "Create Webhook | Webflow Developer Documentation"
published: 2025-11-17
---

Create a new Webhook.

Limit of 75 registrations per `triggerType`, per site.

Access to this endpoint requires a bearer token from a [Data Client App](https://developers.webflow.com/data/docs/getting-started-data-clients).

Required scope \| `sites:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

OR

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "objectid"`

Unique identifier for a Site

### Request

The Webhook registration object

triggerTypeenumOptional

The type of event that triggered the request. See the the documentation for details on [supported events](https://developers.webflow.com/data/reference/all-events).

Show 17 enum values

urlstringOptional

URL to send the Webhook payload to

filterobjectOptional

Only supported for the `form_submission` trigger type. Filter for the form you want Webhooks to be sent for.

Show 1 properties

### Response

Request was successful

idstring or null`format: "objectid"`

Unique identifier for the Webhook registration

triggerTypeenum or null

The type of event that triggered the request. See the the documentation for details on [supported events](https://developers.webflow.com/data/reference/all-events).

Show 17 enum values

urlstring or null

URL to send the Webhook payload to

workspaceIdstring or null`format: "objectid"`

Unique identifier for the Workspace the Webhook is registered in

siteIdstring or null`format: "objectid"`

Unique identifier for the Site the Webhook is registered in

filterobject or null

Only supported for the `form_submission` trigger type. Filter for the form you want Webhooks to be sent for.

Show 1 properties

lastTriggeredstring or null`format: "date-time"`

Date the Webhook instance was last triggered

createdOnstring or null`format: "date-time"`

Date the Webhook registration was created

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