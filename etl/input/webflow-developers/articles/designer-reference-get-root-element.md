---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-root-element
title: "Get root element | Webflow Developer Documentation"
published: 2025-11-17
---

## `component.getRootElement()`

Retrieves the root element of the component.

### Syntax

```
webflow. getRootElement(): Promise<null | AnyElement>;
```

### Returns

**Promise< _AnyElement_ >**

A Promise that resolves to the root element.

### Example

```
// Get Component
const all = await webflow.getAllComponents()
const firstComponent = all[0]

// Get Root Element of Component
const root = await firstComponent?.getRootElement()
console.log(root)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | any | any | any | any |