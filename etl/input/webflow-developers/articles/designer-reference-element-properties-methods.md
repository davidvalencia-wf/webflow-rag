---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/element-properties-methods
title: "Element properties & methods | Webflow Developer Documentation"
published: 2025-11-17
---

Elements in Webflow have properties that determine what functionality they support. These properties are boolean flags that indicate whether an element can have certain features like children, styles, or text content. Each property unlocks a set of related methods that you can use to manipulate the element.

## Core element properties

All elements have a set of core properties that determine what actions you can perform on them:

| Property | Description | Examples of Elements with Property |
| --- | --- | --- |
| `children` | Whether the element can contain child elements | `DivBlock`, `Section`, `Container` |
| `customAttributes` | Whether the element can have custom HTML attributes | Most elements |
| `styles` | Whether the element can have styles applied | Most elements |
| `textContent` | Whether the element can contain direct text content | `Paragraph`, `Heading` |
| `appConnections` | Whether the element can connect with external apps | `Image`, `FormForm` |

## Checking element properties

Before using property-based methods, you should always check if the element has the required property:

```
const element = await Webflow.getSelectedElement();

// Check if element can have children
if (element?.children) {
  // Safe to use children-related methods
  await element.append(Webflow.elementPresets.Paragraph);
}

// Check if element can have styles
if (element?.styles) {
  // Safe to use style-related methods
  await element.setStyles([myStyle]);
}
```

## Property-based methods

Each element property unlocks specific functionality that you can use in your Designer Extension:

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Scalability.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Scalability.svg)\\
\\
Children\\
\\
Methods for adding, retrieving, and managing child elements.](https://developers.webflow.com/designer/reference/elements/children) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Styles.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Styles.svg)\\
\\
Styles\\
\\
Methods for applying and managing styles on elements.](https://developers.webflow.com/designer/reference/elements/styles) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Typography.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Typography.svg)\\
\\
Text Content\\
\\
Methods for setting and manipulating text content.](https://developers.webflow.com/designer/reference/elements/text-content) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/CodeBrackets.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/CodeBrackets.svg)\\
\\
Custom Attributes\\
\\
Methods for working with custom HTML attributes.](https://developers.webflow.com/designer/reference/elements/custom-attributes) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Sync.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Sync.svg)\\
\\
App Connections\\
\\
Methods for connecting elements with external apps.](https://developers.webflow.com/designer/reference/app-intents-and-connections)

## Best practices

1. **Always check properties before using methods**:

```
if (element?.styles) {
     // Now it's safe to use style methods
     await element.setStyles([myStyle]);
}
```

2. **Combine property and type checks when needed**:

```
if (element.type === "Paragraph" && element.textContent) {
     await element.setTextContent("New paragraph text");
}
```

3. **Handle missing properties gracefully**:

```
try {
     if (!element.children) {
       console.log("This element doesn't support child elements");
       return;
     }

     await element.append(Webflow.elementPresets.Paragraph);
} catch (error) {
     console.error("Error adding child element:", error);
}
```