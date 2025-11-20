---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/element-styles/getStyles
title: "Get Styles | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.getStyles()`

Retrieve the current style properties of the element for analysis or changes.

## Syntax

```
element.getStyles(): Promise<Array<Style>>
```

## Returns

**Promise< _Style_ >**

A Promise that resolves to an array of [Style Objects](https://developers.webflow.com/designer/reference/styles-overview).

## Example

```
// Get Selected Element
const selectedElement = await Webflow.getSelectedElement()

if (selectedElement?.styles) {

  // Get Styles
  const styles = await selectedElement.getStyles()

  // Get Style Details
  const styleDetails = styles.map(async style => {

    const styleName = await style.getName()
    const styleProperties = await style.getProperties()

    return {
      Name: styleName,
      Properties: styleProperties,
      ID: style.id,
    }

  })

  // Print Style Details
  console.log(await Promise.all(styleDetails))
}
```

## Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |