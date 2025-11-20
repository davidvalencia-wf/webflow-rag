---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-default-variable-collection
title: "Get default variable collection | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getDefaultVariableCollection()`

Retrieves the default variable collection. The default collection is the first variable collection created with your site.

### Syntax

```
webflow.getDefaultVariableCollection(): Promise<null | VariableCollection>;
```

### Returns

**Promise< _VariableCollection_ >**

A Promise that resolves to the default Variable Collection or null if not found.

### Example

```
// Get Collection
const defaultVariableCollection = await webflow.getDefaultVariableCollection();

// Fetch all variables within the default collection
const variables = await defaultVariableCollection?.getAllVariables();
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for Authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadVariables** | Any | Any | Any | Any |