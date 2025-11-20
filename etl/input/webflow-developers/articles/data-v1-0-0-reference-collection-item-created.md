---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/collection_item_created
title: "Collection Item Created | Webflow Developer Documentation"
published: 2025-11-17
---

## Trigger Type

`collection_item_created`

## Properties

| Field | Type | Description |
| --- | --- | --- |
| `_archived` | Boolean | Boolean determining if the Item is set to archived |
| `_draft` | Boolean | Boolean determining if the Item is set to draft |
| `_id` | string | Unique identifier for the Item |
| `_cid` | string | Unique identifier for the Collection the Item belongs within |
| `name` | string | Name given to the Item |
| `slug` | string | URL structure of the Item in your site. Note: Updates to an item slug will break all links referencing the old slug. |

## Example

```
{
    "_archived": false,
    "_draft": false,
    "color": "#a98080",
    "name": "Exciting blog post title",
    "post-body": "<p>Blog post contents...</p>",
    "post-summary": "Summary of exciting blog post",
    "main-image": {
        "fileId": "580e63fe8c9a982ac9b8b749",
        "url": "https://dev-assets.website-files.com/580e63fc8c9a982ac9b8b744/580e63fe8c9a982ac9b8b749_1477338110257-image20.jpg"
    },
    "slug": "exciting-post",
    "author": "580e640c8c9a982ac9b8b778",
    "updated-on": "2016-11-15T22:45:32.647Z",
    "updated-by": "Person_5660c5338e9d3b0bee3b86aa",
    "created-on": "2016-11-15T22:45:32.647Z",
    "created-by": "Person_5660c5338e9d3b0bee3b86aa",
    "published-on": null,
    "published-by": null,
    "_cid": "580e63fc8c9a982ac9b8b745",
    "_id": "582b900cba19143b2bb8a759"
}
```

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