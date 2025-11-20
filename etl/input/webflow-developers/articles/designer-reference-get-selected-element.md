---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-selected-element
title: "Get selected element | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getSelectedElement()`

Retrieve the [element](https://university.webflow.com/courses/web-elements-course) that the user has selected in the Webflow Designer.

The returned element object provides access to all element properties (like `type`, `id`, and `styles`) and exposes methods such as `getChildren()`, `getStyles()`, and `getCustomAttributes()` for working with the element programmatically.

### Syntax

```
webflow.getSelectedElement(): Promise<null | AnyElement>
```

### Returns

_Promise<`AnyElement` \| `null`>_

A Promise that resolves to one of the following:

- `AnyElement`: An object that represents the various element types available in a Webflow project. See a full list of supported element types in the [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)
- `null`: If an element is not currently selected in the Designer

### Example

```
// Get Selected Element
const element = await webflow.getSelectedElement();

// Print element info
if (element) {
  console.log(`Selected Element ID: ${element.id}`);
  console.log(`Element type: ${element.type}`);

  // If the element has children, print the child elements
  if(element.children){
    const children = await element.getChildren();
    console.log(`Child elements: ${children}`);
  }

} else {
  console.log("No element is currently selected.");
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | An |