---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-folder-slug
title: "Set folder slug | Webflow Developer Documentation"
published: 2025-11-17
---

## `folder.setSlug(slug)`

Choose a new slug for your folder.

### Syntax

```
folder.setSlug(slug: string): Promise<null>
```

### Parameters:

- **slug**: `string` \- The new slug to set for the folder.

### Returns

**Promise<`null`>**

A Promise that resolves to `null`.

### Example

TypeScript

```
// Create and give slug to new folder
const newFolder = await webflow.createPageFolder()
await newFolder.setSlug(slug)

// Print details
const newSlug = await newFolder.getSlug()
console.log("My New Slug", newSlug)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canManagePageSettings** | Any | Any | Any | Any |