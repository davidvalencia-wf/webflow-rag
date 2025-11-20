---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/element-types-methods
title: "Element Types & Methods | Webflow Developer Documentation"
published: 2025-11-17
---

Each element in Webflow has a specific type that determines its functionality and available methods. While all elements share some [common properties](https://developers.webflow.com/designer/reference/element-properties-methods), each element type also has specialized methods that allow you to manipulate that element’s unique characteristics.

## Identifying element types

You can identify an element’s type using the `element.type` property:

```
const element = await Webflow.getSelectedElement();
console.log(element.type); // "DOM", "String", "Image", etc.
```

## Element presets

To add a specific element type to the canvas, you can use the [`webflow.elementPresets` object](https://developers.webflow.com/designer/reference/element-presets), which contains a set of presets for different element types available in the designer.

```
const element = await webflow.elementPresets.DOM;
await webflow.addElement(element);
```

## Element type methods

Different element types have unique methods tailored to their functionality. Always check an element’s type before applying type-specific methods.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/CodeBrackets.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/CodeBrackets.svg)\\
\\
DOM Elements\\
\\
Customize HTML elements with methods for HTML tags and attributes.](https://developers.webflow.com/designer/reference/dom-element) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Typography.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Typography.svg)\\
\\
Strings\\
\\
Work with text content and manipulate their text values.](https://developers.webflow.com/designer/reference/string-element) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Image.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Image.svg)\\
\\
Images\\
\\
Manage images and alt text.](https://developers.webflow.com/designer/reference/image-element) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/TypographyDetails.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/TypographyDetails.svg)\\
\\
Headings\\
\\
Modify heading levels and heading content.](https://developers.webflow.com/designer/reference/heading-element) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/SiteWWW.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/SiteWWW.svg)\\
\\
Links\\
\\
Configure links with methods for URLs, targets, and link settings.](https://developers.webflow.com/designer/reference/link-element) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Test.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Test.svg)\\
\\
Forms\\
\\
Create and configure forms and form field settings.](https://developers.webflow.com/designer/reference/forms) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Components.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Components.svg)\\
\\
Components\\
\\
Get components definitions from a component instance.](https://developers.webflow.com/designer/reference/component-element)

## Best Practices for Element Type Methods

1. **Always check element type before applying type-specific methods**:

```
if (element.type === "Image") {
     // Now it's safe to use Image methods
     await element.setAltText("Description");
}
```

2. **Handle multiple element types with type guards**:

```
function handleElement(element) {
     switch(element.type) {
       case "String":
         return element.getText();
       case "Image":
         return element.getAsset();
       default:
         return null;
     }
}
```

3. **Combine property and type checks for maximum safety**:

```
if (element.type === "DOM" && element.children) {
     // Safe to use DOM methods and children methods
     await element.setTag("div");
     await element.append(Webflow.elementPresets.Paragraph);
}
```