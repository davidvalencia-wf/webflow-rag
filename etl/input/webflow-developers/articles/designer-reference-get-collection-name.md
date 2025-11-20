---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-collection-name
title: "Get collection name | Webflow Developer Documentation"
published: 2025-11-17
---

## `collection.getName()`

Retrieves the name of the variable collection.

### Syntax

```
collection.getName(): Promise<string>
```

### Returns

**Promise< `string`>**

A Promise that resolves to a `string` of the Variable Collection’s name

### Example

```
// Get Collection
const defaultVariableCollection = await webflow.getDefaultVariableCollection();

// Get Collection Name
const collectionName = await defaultVariableCollection?.getName()
console.log(collectionName)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for Authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadVariables** | Any | Any | Any | Any |