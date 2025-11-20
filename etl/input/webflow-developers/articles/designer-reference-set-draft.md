---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-draft
title: "Set draft status | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.setDraft()`

Set the draft status of the page.

### Syntax

```
page.setDraft(isDraft: boolean): Promise<null>
```

### Parameters

- **isDraft**: _boolean_ \- Whether the page should be set to draft mode.

### Returns

**Promise<`null`>**

A promise that resolves to `null`.

### Example

```
// Get Current Page
const currentPage = await webflow.getCurrentPage() as Page

// Set page as draft
await currentPage.setDraft(true)
const isDraft = await currentPage.isDraft()

// Print status
console.log(isDraft)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canManagePageSettings** | Any | Any | Any | Any |