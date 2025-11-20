---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/element-styles/setStyles
title: "Set Styles | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.setStyles(styles)`

Set styles on an element.

## Syntax

```
element.setStyles(styles: Array<Style>): Promise<null>>
```

## Parameters

- **`Styles`**: _Array_ of [Style Objects](https://developers.webflow.com/designer/reference/styles-overview) \- The array of styles to set.

## Returns

**Promise<`null`>**

A Promise that resolves to `null`.

## Example

```
// Get Selected Element
const selectedElement = await Webflow.getSelectedElement()

if (selectedElement?.styles) {

  // Create a new style
  const newStyle = await Webflow.createStyle("MyCustomStyle");

  // Set properties for the style
  newStyle.setProperties({
    'background-color': "blue",
    'font-size': "32px",
    'font-weight': "bold",
  });

  // Set style on selected element
  selectedElement.setStyles([newStyle])

}
```