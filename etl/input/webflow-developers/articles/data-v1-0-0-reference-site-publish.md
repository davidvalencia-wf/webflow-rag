---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/site_publish
title: "Site Publish | Webflow Developer Documentation"
published: 2025-11-17
---

## Trigger Type

`site_publish`

## Properties

| Field | Type | Description |
| --- | --- | --- |
| `site` | string | The site id that was published |
| `publishTime` | string | The timestamp of the publish event |
| `domains` | \[string\] | The domains that were published |
| `publishedBy` | object | The name and id of the user who published the site |
| `publishedBy.name` | string | The full name of the person who published the site |
| `publishedBy.email` | string | The email of the person who published the site |

## Example

```
{
    "site": "62749158efef318abc8d5a0f",
    "publishTime": 1653619272801,
    "domains": [\
        "my-website.webflow.io"\
    ],
    "publishedBy": {
        "name": "Some One",
        "id": "123460a7b6c16def4527122d"
    }
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