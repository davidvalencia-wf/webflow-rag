---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/exclude-page-from-search
title: "Exclude page from search | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.excludeFromSearch(shouldExclude)`

Exclude the page from [internal site search.](https://help.webflow.com/hc/en-us/articles/33961242348179-Site-search)

### Syntax

```
page.excludeFromSearch(shouldExclude: boolean): Promise<null>;
```

### Parameters

- **shouldExclude**: _`boolean`_ \- Whether the page should be excluded from search engine indexing.

### Returns

**Promise<`null`>**

A Promise that resolves to `null`.

### Example

```
// Get Current Page
const currentPage = await webflow.getCurrentPage()

// Exclude from search engine indexing
await currentPage.excludeFromSearch(true)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canManagePageSettings** | Any | Any | Any | Any |