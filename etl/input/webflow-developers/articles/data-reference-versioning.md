---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/versioning
title: "Versioning | Webflow Developer Documentation"
published: 2025-11-17
---

API v2 versioning is **explicit** as part of the API endpoint URI.

## Versions

API v2 is composed of two version namespaces:

| Namespace | Description |
| --- | --- |
| `/beta/` | A monolithic version that houses all new APIs. |
| `/v2/` | A subset of v2 APIs that are considered “production” |

Auth tokens will be compatible across the v2 beta and v2 production namespaces

## URL

An example of an API request to v2 beta:

cURL

```
curl --request GET \
     --url https://api.webflow.com/beta/token/authorized_by \
     --header 'accept: application/json'
```

## Webflow SDK

Currently, the Webflow SDK doesn’t support requests to beta endpoints. For access to these endpoints, please refer to the Webflow API documentation and make requests directly through an HTTP client or your preferred API tool.

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