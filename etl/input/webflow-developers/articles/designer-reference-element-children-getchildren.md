---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/element-children/getChildren
title: "Get Children | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.getChildren()`

Get child elements from a parent element in the [element hierarchy.](https://university.webflow.com/lesson/element-hierarchy?topics=getting-started)

## Syntax

```
element.getChildren(): Promise<Array<AnyElement>>
```

## Returns

**Promise<Array< _AnyElement_ >>**

A Promise that resolves to an array of `AnyElement` objects.

`AnyElement` represents the various element types available in a Webflow project. See a full list of supported element types in our [Designer Extension type definitions.](https://www.npmjs.com/package/@webflow/designer-extension-typings?activeTab=code)

## Example

```
// Get Selected Element
const selectedElement = await webflow.getSelectedElement();

if (selectedElement?.children) {

  // Get Children
  const children = await selectedElement.getChildren();

  // Get Children Details
  const childrenDetailsPromises = children.map(async (child) => {

    // Get style details of children (This is the name of the element in the Designer)
    let styleDetails = null;
    let childStyles = child.styles ? await child.getStyles() : null;

    if (childStyles) {
      const styleNamesPromises = childStyles.map(style => style.getName());
      styleDetails = await Promise.all(styleNamesPromises);
    }

    return {
      styleDetails,
    };
  });

  // Print details of child elements
  const childrenDetails = await Promise.all(childrenDetailsPromises);
  console.log(childrenDetails); // This will now log the array of child details
}
```

## Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |