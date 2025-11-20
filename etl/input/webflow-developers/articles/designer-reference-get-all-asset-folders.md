---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-all-asset-folders
title: "Get all Asset folders | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getAllAssetFolders()`

Get all folders in the Assets panel.

### Syntax

```
getAllAssetFolders(): Promise<Array<AssetFolder>>
```

### Returns

**Array<AssetFolder>**

An array of AssetFolders

### Example

```
const folders = await webflow.getAllAssetFolders()
    console.log(folders)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessAssets** | Any | Any | Any | Any |