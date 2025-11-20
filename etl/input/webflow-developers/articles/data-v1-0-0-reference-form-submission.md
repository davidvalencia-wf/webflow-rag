---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/reference/form_submission
title: "Form Submission | Webflow Developer Documentation"
published: 2025-11-17
---

## Trigger Type

`form_submission`

## Properties

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | The name of the form |
| `site` | string | The id of the site that the form was submitted from |
| `data` | object | The data submitted in the form |
| `d` | string | The timestamp the form was submitted |
| `_id` | string | The id of the form submission |

## Example

```
{
    "name": "Sample Form",
    "site": "62749158efef318abc8d5a0f",
    "data": {
        "name": "Some One",
        "email": "some.one@home.com"
    },
    "d": "2022-09-14T12:35:16.117Z",
    "_id": "6321ca84df3949bfc6752327"
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