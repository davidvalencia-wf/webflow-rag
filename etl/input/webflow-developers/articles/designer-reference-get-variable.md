---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-variable
title: "Get variable by ID | Webflow Developer Documentation"
published: 2025-11-17
---

## `collection.getVariable(id)`

Retrieve a variable by its ID.

### Syntax

```
collection.getVariable(id: VariableId): Promise<null | Variable>
```

### Parameters

- **ID** : _string_ \- ID of the variable you’d like to retrieve

### Returns

**Promise< _Variable_ \| `null`>**

A promise that resolves to a Variable object, or `null` if not found

### Example

```
// Get Collection
const collection = await webflow.getDefaultVariableCollection()

// Get variable by ID
const variableById = await collection?.getVariable('id-123')
console.log(variableById)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for Authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadVariables** | Any | Any | Any | Any |