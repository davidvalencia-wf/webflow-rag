---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/element-children/append
title: "Append | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.append(newElement)`

Insert a new element onto the page as the last child of the target element.

## Syntax

```
element.append(newElement: ElementPreset | Component): Promise<AnyElement>
```

## Parameters

- **newElement**: _Webflow.elementPresets.<preset>_ \- The new element to be inserted into the hierarchy. This element is derived from the `Webflow.elementPresets` object, which contains all Webflow elements that can be inserted onto the canvas.

## Returns

**Promise< _AnyElement_ >**

A Promise that resolves to an `AnyElement` object. `AnyElement` represents the various element types available in a Webflow project. See a full list of supported element types in our [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)

## Example

```
// Get Selected Element
const el = await webflow.getSelectedElement();

// Check if element supports child elements
if (el?.children) {

  // Append newElement as a child to of the selected element
  const newElement = await el?.append(webflow.elementPresets.DivBlock)

  // Print element Details
  console.log(JSON.stringify(newElement))

}
```

## Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canDesign** | Primary | Main | Canvas | Design |