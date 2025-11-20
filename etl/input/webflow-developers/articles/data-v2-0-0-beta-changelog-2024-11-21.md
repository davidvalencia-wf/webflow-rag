---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/11/21
title: "Improved management of form submissions | Webflow Developer Documentation"
published: 2025-11-17
---

[November 21, 2024](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/11/21)

## [Improved management of form submissions](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/11/21)

[**List form submissions by site**](https://developers.webflow.com/data/v2.0.0-beta/reference/forms/form-submissions/list-submissions-by-site) \- A new endpoint that lets you retrieve form submissions across your entire site. Unlike the existing [List Form Submissions endpoint](https://developers.webflow.com/data/v2.0.0-beta/reference/forms/form-submissions/list-submissions), this endpoint:

- Takes `siteId` as a path parameter
- Accepts `elementId` as a query parameter to filter by `formElementId`
- Works seamlessly with forms in components, where each component instance gets a unique `formId` but shares the same `formElementId`

To use this endpoint, first get the `formElementId` from the [List Forms API](https://developers.webflow.com/data/v2.0.0-beta/reference/forms/forms/list), then pass both the `siteId` and `formElementId` to retrieve all submissions for a specific form, even when it appears in multiple component instances.

Ask AI

Assistant

Hi, I'm an AI assistant with access to documentation and other content.

Tip: You can toggle this pane with

`⌘`

+

`/`

Suggestions