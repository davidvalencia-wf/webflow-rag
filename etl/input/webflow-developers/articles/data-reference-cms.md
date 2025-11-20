---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/cms
title: "Webflow CMS API | Webflow Developer Documentation"
published: 2025-11-17
---

Webflow’s CMS API lets you programmatically create, manage, and publish content. Use it to build custom workflows, integrate with external systems, and automate content management. For general information on the Webflow CMS, see the [help center documentation](https://help.webflow.com/hc/en-us/articles/33961307099027-Intro-to-the-Webflow-CMS).

## Overview

Use the Data API to manage three core components of the Webflow CMS:

[Collections\\
\\
Database-like containers that define content structure and fields.](https://developers.webflow.com/data/reference/cms#collections) [Fields\\
\\
Individual data fields that define content types within a collection.](https://developers.webflow.com/data/reference/cms#collection-fields) [Items\\
\\
Content records stored within a collection.](https://developers.webflow.com/data/reference/cms#collection-items)

The API supports both **staged** and **live** content, giving you precise control over your [publishing workflow](https://developers.webflow.com/data/docs/working-with-the-cms/publishing). You can create content programmatically, perform bulk updates, and manage multi-locale content.

* * *

## Workflows

There are a few workflows that are particularly helpful to understand when working with the CMS API.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CMS.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CMS.svg)\\
\\
Collection Management\\
\\
Learn how to create, manage, and publish collections and items.](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/PublishDesigner.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/PublishDesigner.svg)\\
\\
Publishing\\
\\
Learn how items are published, updated, and unpublished.](https://developers.webflow.com/data/docs/working-with-the-cms/publishing) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Localization.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Localization.svg)\\
\\
Localization\\
\\
Learn how to create and manage linked CMS items across multiple locales.](https://developers.webflow.com/data/docs/working-with-the-cms/localization) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/GlobalCDN.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/GlobalCDN.svg)\\
\\
Content Delivery\\
\\
Learn how to deliver cached content to external applications.](https://developers.webflow.com/data/docs/working-with-the-cms/content-delivery)

* * *

## Key concepts

###### Collections

Collections are structured containers for dynamic content, similar to database tables. Each collection defines a content type, like blog posts, team members, or testimonials, by specifying a set of fields.

Collections can contain various [field types](https://developers.webflow.com/data/reference/field-types-item-values), including text, rich text, images, dates, numbers, and references to other collections.

Each collection has a unique ID used to manage its details, fields, and items.

### Collections endpoints

| Endpoint | Description |
| --- | --- |
| GET [List collections](https://developers.webflow.com/data/reference/cms/collections/list) | Retrieve all collections for a site. |
| GET [Get collection](https://developers.webflow.com/data/reference/cms/collections/get) | Retrieve the schema and details for a specific collection. |
| POST [Create collection](https://developers.webflow.com/data/reference/cms/collections/create) | Create a new collection. |
| DELETE [Delete collection](https://developers.webflow.com/data/reference/cms/collections/delete) | Remove a collection and all of its items. |

###### Collection fields

Fields define the structure and data type for content in a collection. Each field has a unique ID used to manage its details and item data. Each field’s type determines the kind of content it can store. See the [field types reference](https://developers.webflow.com/data/reference/field-types-item-values) for a full list of types and their properties.

### Collection fields endpoints

| Endpoint | Description |
| --- | --- |
| POST [Create field](https://developers.webflow.com/data/reference/cms/collection-fields/create) | Create a new field in a collection. |
| PATCH [Update field](https://developers.webflow.com/data/reference/cms/collection-fields/update) | Modify an existing field. |
| DELETE [Delete field](https://developers.webflow.com/data/reference/cms/collection-fields/delete) | Remove a field from a collection. |

##### List fields

To list fields, retrieve collection details using the [get collection](https://developers.webflow.com/data/reference/cms/collections/get) endpoint.

###### Collection items

Items are individual records within a collection. Each item has a unique ID and contains data for the fields defined in that collection.

### Collection Item states

Items exist in two main states:

Staged

Draft content not visible on your live site.

Live

Published content that appears on your website.

This dual-state system lets you prepare content changes without affecting your live site. You can create, edit, and preview staged content before publishing. For more details, see the [CMS publishing guide](https://developers.webflow.com/data/docs/working-with-the-cms/publishing).

### Collection items endpoints

###### Staged

###### Live

Manage staged items on a site. These endpoints also work with live items. Updating a live item automatically updates its staged version. Creating a new item with these endpoints always creates a draft.

| Endpoint | Description |
| --- | --- |
| GET [List items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items) | Retrieve a list of all items in a collection. |
| GET [Get item](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/get-item) | Retrieve a specific item. |
| POST [Create item(s)](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/create-items) | Create items. Use `cmsLocaleIds` to create items across multiple locales. |
| PATCH [Update items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/update-items) | Modify one or more items. |
| DELETE [Delete items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/delete-items) | Delete one or more items. |
| POST [Publish item](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/publish-item) | Publish one or more items. |

##### Unpublish items

Use the [unpublish live item endpoint](https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-items-live) to unpublish a live item.

* * *

## Start working with the CMS API

Below is an interactive tutorial that will walk you through the basic steps of getting a collection, listing a collection schema, listing collection items, and creating a collection item.

Webflow CMS API Tutorial

## Code

JS

1

2

3

4

5

6

7

8

9

// Import the Webflow API client

import{WebflowClient}from'webflow-api';

// Initialize the client with your access token

const webflowClient = newWebflowClient({'YOUR\_ACCESS\_TOKEN'});

// Get all sites you have access to

const sites = await webflowClient.sites.list();

console.log('Available sites:', sites);

[https://api.webflow.com/v2/sites](https://developers.webflow.com/data/v2.0.0/reference/sites/list)

Previous1 of 5Next

## Step 1

![Webflow Logo](https://dhygzobemt712.cloudfront.net/Logo/Social_Circle_Blue.svg)

### CMS API Tutorial

This interactive tutorial will guide you through using the Webflow CMS API. You'll need to authenticate with your Webflow account to get started.

Authenticate with Webflow

## Bulk operations

For most CMS operations, the API provides both single-item and bulk endpoints. Bulk endpoints allow you to perform `CRUD` operations (Create, Read, Update, Delete) on multiple items in a single API call, which is more efficient for managing content at scale.

To keep the sidebar clean, we’ve hidden most single-item endpoints. However, they are fully functional and not deprecated. The tables below show both the visible and hidden endpoints for staged and live collection items.

###### Staged Items

| Operation | Single Item Endpoint | Bulk Endpoint |
| --- | --- | --- |
| **List** | [`GET /collections/{collection_id}/items`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/staged-items/list-items) | N/A |
| **Get** | [`GET /collections/{collection_id}/items/{item_id}`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/staged-items/get-item) | N/A |
| **Create** | [`POST /collections/{collection_id}/items`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/staged-items/create-item) | [`POST /collections/{collection_id}/items/bulk`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/staged-items/create-items) |
| **Update** | [`PATCH /collections/{collection_id}/items/{item_id}`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/staged-items/update-item) | [`PATCH /collections/{collection_id}/items`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/staged-items/update-items) |
| **Delete** | [`DELETE /collections/{collection_id}/items/{item_id}`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/staged-items/delete-item) | [`DELETE /collections/{collection_id}/items`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/staged-items/delete-items) |
| **Publish** | N/A | [`POST /collections/{collection_id}/items/publish`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/staged-items/publish-item) |

###### Live Items

| Operation | Single Item Endpoint | Bulk Endpoint |
| --- | --- | --- |
| **List** | [`GET /collections/{collection_id}/items/live`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/list-items-live) | N/A |
| **Get** | [`GET /collections/{collection_id}/items/{item_id}/live`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/get-item-live) | N/A |
| **Create** | [`POST /collections/{collection_id}/items/live`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/create-item-live) | N/A |
| **Update** | [`PATCH /collections/{collection_id}/items/{item_id}/live`](https://developers.webflow.com/data/reference/data/v2.0.0/reference/cms/collection-items/live-items/update-item-live) | [`PATCH /collections/{collection_id}/items/live`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/update-items-live) |
| **Unpublish** | [`DELETE /collections/{collection_id}/items/{item_id}/live`](https://developers.webflow.com/https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/delete-item-live) | [`DELETE /collections/{collection_id}/items/live`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/delete-items-live) |

## Webhooks

Use webhooks to receive real-time notifications about changes to your content. This enables automated workflows and integrations with other systems.

### Webhook events

[Create a webhook](https://developers.webflow.com/data/reference/webhooks/create) and subscribe to the following events for a given collection:

- [Collection item created](https://developers.webflow.com/data/reference/webhooks/events/collection-item-created)
- [Collection item updated](https://developers.webflow.com/data/reference/webhooks/events/collection-item-changed)
- [Collection item deleted](https://developers.webflow.com/data/reference/webhooks/events/collection-item-deleted)
- [Collection item published](https://developers.webflow.com/data/reference/webhooks/events/collection-item-published)
- [Collection item un-published](https://developers.webflow.com/data/reference/webhooks/events/collection-item-unpublished)

## Next Steps

[Getting started\\
\\
Create a collection, add fields, and create items. Includes pagination examples.](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items) [Working with webhooks\\
\\
Set up real-time notifications for content changes to build automated workflows.](https://developers.webflow.com/data/docs/working-with-webhooks)

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