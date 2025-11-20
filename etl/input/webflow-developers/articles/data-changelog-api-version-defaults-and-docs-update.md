---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/api-version-defaults-and-docs-update
title: "Versioning and OAuth docs update | Webflow Developer Documentation"
published: 2025-11-17
---

[June 21, 2022](https://developers.webflow.com/data/changelog/api-version-defaults-and-docs-update)

## [Versioning and OAuth docs update](https://developers.webflow.com/data/changelog/api-version-defaults-and-docs-update)

## API version defaults to latest version

The Webflow Data API no longer requires the inclusion of `accept-version` or `api_version` in every API request. If a version isn’t provided, the API will use the latest API version.

## Added `redirect_uri` to OAuth docs

The API has always validated the `redirect_uri` when used, but it wasn’t documented… Until now! Learn more about how to use `redirect_uri` in the [OAuth section of the documentation](https://developers.webflow.com/data/reference/authentication).

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