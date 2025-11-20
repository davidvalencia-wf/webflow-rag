---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/2025/2/28
title: "Improved control over form submission data | Webflow Developer Documentation"
published: 2025-11-17
---

[February 28, 2025](https://developers.webflow.com/data/changelog/2025/2/28)

## [Improved control over form submission data](https://developers.webflow.com/data/changelog/2025/2/28)

The [List form submissions by site](https://developers.webflow.com/data/reference/forms/form-submissions/list-submissions-by-site) endpoint now lets you retrieve form submissions across your entire site. Unlike the existing [List Form Submissions endpoint](https://developers.webflow.com/data/reference/forms/list-submissions), this endpoint:

- Takes `siteId` as a path parameter
- Accepts `elementId` as a query parameter to filter by `formElementId`
- Works seamlessly with forms in components, where each component instance gets a unique `formId` but shares the same `formElementId`

To use this endpoint, first get the `formElementId` from the [List Forms API](https://developers.webflow.com/data/reference/forms/list), then pass both the `siteId` and `formElementId` to retrieve all submissions for a specific form, even when it appears in multiple component instances.

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