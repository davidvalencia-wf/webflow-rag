---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-all-variables
title: "Get all variables | Webflow Developer Documentation"
published: 2025-11-17
---

## `collection.getAllVariables()`

Get all variables in a collection

### Syntax

```
collection.getAllVariables(): Promise<Array<Variable>>
```

### Returns

**Promise< _Variable_ >**

A Promise that resolves to an array of Variable objects

### Example

```
// Fetch the default variable collection
const defaultVariableCollection = await webflow.getDefaultVariableCollection();

if (defaultVariableCollection) {

  // Print Collection ID
  console.log("Default Variable Collection ID:", defaultVariableCollection.id);

  // Fetch all variables within the default collection
  const variables = await defaultVariableCollection.getAllVariables();

  if (variables.length > 0) {

    console.log("List of Variables in Default Collection:");

    // Print variable details
    for (var i in variables) {
      console.log(`${i}. Variable Name: ${await variables[i].getName()}, Variable ID: ${variables[i].id}`);
    };
  } else {
    console.log("No variables found in the default collection.");
  }
} else {
  console.log("Default Variable Collection not found.");
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for Authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadVariables** | Any | Any | Any | Any |