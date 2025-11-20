---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook
title: "Get Webhook | Webflow Developer Documentation"
published: 2025-11-17
---

Get a site webhook

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

site\_idstringRequired`format: "uuid"`

Unique identifier for a Site

webhook\_idstringRequired`format: "uuid"`

Unique identifier for a Webhook

### Headers

Accept-VersionstringOptional

The API version

### Response

Request was successful

\_idstring or null`format: "uuid"`

Unique identifier for a Webhook

triggerTypeenum or null

- `form_submission` \- Sends the [form\_submission](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#form_submission) event
- `site_publish` \- Sends a [site\_publish](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#site_publish) event
- `ecomm_new_order` \- Sends the new [ecomm\_new\_order](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#ecomm_new_order) event
- `ecomm_order_changed` \- Sends the [ecomm\_order\_changed](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#ecomm_order_changed) event
- `ecomm_inventory_changed` \- Sends the [ecomm\_inventory\_changed](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#ecomm_inventory_changed) event
- `memberships_user_account_added` \- Sends the [memberships\_user\_account\_added](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#memberships_user_account_added) event
- `memberships_user_account_updated` \- Sends the [memberships\_user\_account\_updated](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#memberships_user_account_updated) event
- `memberships_user_account_deleted` \- Sends the [memberships\_user\_account\_deleted](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#memberships_user_account_deleted) event
- `collection_item_created` \- Sends the [collection\_item\_created](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#collection_item_created) event
- `collection_item_changed` \- Sends the [collection\_item\_changed](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#collection_item_changed) event
- `collection_item_deleted` \- Sends the [collection\_item\_deleted](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#collection_item_deleted) event
- `collection_item_unpublished` \- Sends the [collection\_item\_unpublished](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#collection_item_unpublished) event
- `comment_created` \- Sends the [comment\_created](https://developers.webflow.com/data/v1.0.0/reference/sites/webhooks/get-webhook#comment_created) event

Show 13 enum values

triggerIdstring or null`format: "uuid"`

Unique identifier for the Webhook Trigger

sitestring or null`format: "uuid"`

Unique identifier for a Webhook

filterobject or null

filter for selecting which events you want webhooks to be triggered for.

lastUsedstring or null`format: "date-time"`

Date trigger was last used

createdOnstring or null`format: "date-time"`

Date trigger was created

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

[Webflow Data API V1 is deprecated. Please view the V2 version of our API reference](https://developers.webflow.com/data/reference/rest-introduction)