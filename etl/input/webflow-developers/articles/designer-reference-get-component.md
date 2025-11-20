---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-component
title: "Get component | Webflow Developer Documentation"
published: 2025-11-17
---

## **`ComponentElement.getComponent()`**

Get the Component Definition associated to a Component Instance

### Syntax

```
element.getComponent(): Promise<Component>
```

### Returns

**Promise< _Component_ >**

A promise that resolves to a Component Object associated with a Component Instance.

```
//Get User Selected Element from the Designer
const parent = await webflow.getSelectedElement();

// Check if this selected element is a Component Instance
if(parent && !parent.configurable && parent.type === 'ComponentInstance'){
      console.log(await parent.getComponent().getName());
    }
```

### Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | any | any | any | any |