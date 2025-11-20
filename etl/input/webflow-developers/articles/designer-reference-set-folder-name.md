---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-folder-name
title: "Set folder name | Webflow Developer Documentation"
published: 2025-11-17
---

## `folder.setName(name)`

Set the folder name.

### Syntax

```
folder.setName(name: string): Promise<null>
```

### Parameters

- **name**: `string` \- The new name to set for the folder.

### Returns

**Promise<`null`>**

A Promise that resolves to `null`.

### Example

TypeScript

```
// Create and name new folder
const newFolder = await webflow.createPageFolder()
await newFolder.setName(name)

// Print details
const folderName = await newFolder.getName()
console.log("My New Folder", folderName)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canManagePageSettings** | Any | Any | Any | Any |