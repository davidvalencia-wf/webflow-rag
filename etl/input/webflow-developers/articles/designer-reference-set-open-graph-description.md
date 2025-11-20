---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-open-graph-description
title: "Set Open Graph description | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.setOpenGraphDescription(description)`

Sets a page’s Open Graph description.

### Syntax

```
page.setOpenGraphDescription(description: string | null): Promise<null>
```

### Parameters

- **description**: _string \| null_ \- The Open Graph description to set.

### Returns

**Promise<`null`>**

A Promise that resolves to null.

### Example

```
// Get Current Page
const currentPage = await webflow.getCurrentPage() as Page

// Set Open Graph Description
await currentPage.setOpenGraphDescription(description)

// Print results
const openGraphDescription = await currentPage.getOpenGraphDescription()
console.log("Open Graph Description", openGraphDescription)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canManagePageSettings** | Any | Any | Any | Any |