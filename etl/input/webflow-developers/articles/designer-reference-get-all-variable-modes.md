---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-all-variable-modes
title: "Get all variable modes | Webflow Developer Documentation"
published: 2025-11-17
---

## `collection.getAllVariableModes()`

Get all variable modes in a collection.

### Syntax

```
collection.getAllVariableModes(): Promise<Array<VariableMode>>
```

### Returns

**Promise< _Array<VariableMode>_ >**

A Promise that resolves to an array of VariableMode objects.

### Example

```
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Get All Variable Modes
const variableModes = await collection.getAllVariableModes()
console.log(variableModes)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadVariables** | Any | Any | Any | Any |