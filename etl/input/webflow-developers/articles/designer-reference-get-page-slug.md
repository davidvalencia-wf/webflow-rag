---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-page-slug
title: "Get page slug | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.getSlug()`

Get the slug of the page.

### Syntax

```
page.getSlug(): Promise<string>
```

### Returns

**Promise<`string`>**

A promise that resolves to the slug of the page.

### Example

```
// Get Current Page
const currentPage = await webflow.getCurrentPage() as Page

// Get page slug
const pageSlug = await currentPage.getSlug()
console.log(pageSlug)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadPageSettings** | Any | Any | Any | Any |