---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-all-variable-collections
title: "Get all variable collections | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getAllVariableCollections()`

Retrieves all variable collections for a site.

### Syntax

```
webflow.getAllVariableCollections()
```

### Returns

**`Promise<Array<VariableCollection>>`**

A Promise that resolves to an array of variable collection objects.

### Example

```
const collections = webflow.getAllVariableCollections();

// returns an array of collection objects
// [\
//     {\
//         "id": "collection-4a393cee-14d6-d927-f2af-44169031a25b",\
//     },\
//     {\
//         "id": "collection-4a393cee-14d6-d927-f2af-44169031a49c",\
//     }\
// ]
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadVariables** | Any | Any | Any | Any |