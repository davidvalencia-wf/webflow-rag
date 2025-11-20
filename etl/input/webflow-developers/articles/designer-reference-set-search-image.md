---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-search-image
title: "Set search image | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.setSearchImage(url)`

Set the search image of the page.

### Syntax

```
page.setSearchImage(url: string | null): Promise<null>;
```

### Parameters

- **url**: _`string | null`_ \- The URL of the image to set as the search image.

### Returns

**Promise<`null`>**

A Promise that resolves to `null`.

### Example

```
// Get current page
const currentPage = await webflow.getCurrentPage()

// Set search image
await currentPage?.setSearchImage('https://example.com/image.jpg')
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canManagePageSettings** | Any | Any | Any | Any |