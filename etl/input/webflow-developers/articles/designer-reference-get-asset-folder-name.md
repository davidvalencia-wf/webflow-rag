---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-asset-folder-name
title: "Get Asset folder name | Webflow Developer Documentation"
published: 2025-11-17
---

## `assetFolder.getName()`

Get the name of the current AssetFolder object

### Syntax

```
AssetFolder.getName(): Promise<string>
```

### Returns

**String**

A Promise that returns the name of the AssetFolder object

### Example

```
// Create Asset Folder
const newFolder = await webflow.createAssetFolder(name)
const folderName = await newFolder.getName()

console.log(folderName)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessAssets** | Any | Any | Any | Any |