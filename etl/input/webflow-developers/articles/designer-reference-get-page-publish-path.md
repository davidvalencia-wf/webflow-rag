---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-page-publish-path
title: "Get page publish path | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.getPublishPath()`

Get the publish path of the page.

### Syntax

```
page.getPublishPath(): Promise<null | string>
```

### Returns

**Promise<`null | string`>**

A promise that resolves to the publish path of the page.

### Example

```
// Get Current Page
const currentPage = await webflow.getCurrentPage() as Page

// Get page publish path
const pagePublishPath = await currentPage.getPublishPath()
console.log(pagePublishPath)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadPageSettings** | Any | Any | Any | Any |