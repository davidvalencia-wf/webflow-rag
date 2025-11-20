---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-variable-collection-by-id
title: "Get a variable collection by ID | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getVariableCollectionById(collectionId)`

Retrieves a variable collection by its ID.

### Syntax

```
webflow.getVariableCollectionById(collectionId: string)
```

### Parameters

- **collectionId**: _string_ \- The ID of the variable collection to retrieve.

### Returns

**Promise< _VariableCollection_ >**

The a promise that resolves to a variable collection object.

### Example

```
const collection = webflow.getVariableCollectionById("collection-4a393cee-14d6-d927-f2af-44169031a25b");

// returns a collection object
// {
//     "id": "collection-4a393cee-14d6-d927-f2af-44169031a25b",
// }
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadVariables** | Any | Any | Any | Any |