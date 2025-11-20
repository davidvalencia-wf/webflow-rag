---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-app-connections
title: "Get App Connections | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.getAppConnections()`

Retrieve a list of App Connections associated with the selected element. Only App connections created by the current App will be returned.

### Syntax

```
getAppConnections(): Promise<Array<string>>
```

### Returns

**Promise<Array<string>>**

A Promise that resolves to an array of App Connection string identifiers for the element-App connection.

### Example

```
const el = await webflow.getRootElement(); // Get Root Element

// Check for an element
if (!el || !el.children) throw new Error('Expected an element');

// Create a form element
const formEl = await el.append(webflow.elementPresets.FormForm);

// Check for App Connections
if (!formEl || !formEl.appConnections) {
  throw new Error('App Connections not supported');
}

// Set App Connections
await formEl.setAppConnection('myAwesomeAppManageFormElement');

// Get App Connections
const connections = await formEl.getAppConnections();

// Expected return value
// connections should return an array with the app connection set earlier:
console.log(connections); // ['myAwesomeAppManageFormElement']
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |