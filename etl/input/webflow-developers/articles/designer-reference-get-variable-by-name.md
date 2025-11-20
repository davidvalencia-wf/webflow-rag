---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-variable-by-name
title: "Get variable by name | Webflow Developer Documentation"
published: 2025-11-17
---

## `collection.getVariableByName(name)`

Retrieve a variable by its name.

### Syntax

```
collection.getVariableByName(name: string): Promise<null | Variable>>
```

### Parameters

- **name** : _string_ \- Name of the variable you’d like to retrieve

### Returns

**Promise< _Variable_ \| `null`>**

A Promise that resolves to a Variable object, or `null` if not found

### Example

```
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Get Variable by Name
const variableByName = await collection?.getVariableByName('Space Cadet')
console.log(variableByName)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for Authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadVariables** | Any | Any | Any | Any |