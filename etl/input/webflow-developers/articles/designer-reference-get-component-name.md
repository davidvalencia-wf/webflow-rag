---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-component-name
title: "Get component name | Webflow Developer Documentation"
published: 2025-11-17
---

## **`component.getName()`**

Get the name of the Component Object.

### Syntax

```
component.getName(): Promise<string>
```

### Returns

**Promise<`string`>**

A Promise that resolves to a `string` representing the name of a component.

```
const myComponentName = "Hero-Component";
const components = await webflow.getAllComponents();

// Check if component exists
for (const c in components) {
  const currentComponentName = await components[c].getName();
  if (myComponentName === currentComponentName) {
    console.log("Found Hero Component");
  }
}
```

### Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | any | any | any | any |