---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-open-graph-title
title: "Get Open Graph title | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.getOpenGraphTitle()`

Retrieves the Open Graph title of the page.

### Syntax

```
page.getOpenGraphTitle(): Promise<string>
```

### Returns

**Promise<`string`>**

A Promise that resolves to a string with the Open Graph title of the page.

### Example

```
// Get Current Page
const currentPage = await webflow.getCurrentPage() as Page

// Get Open Graph Title
const openGraphTitle = await currentPage.getOpenGraphTitle()
console.log("Open Graph Title", openGraphTitle)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadPageSettings** | Any | Any | Any | Any |