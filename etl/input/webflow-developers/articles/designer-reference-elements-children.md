---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/elements/children
title: "Children | Webflow Developer Documentation"
published: 2025-11-17
---

Correctly handling an element’s child elements is crucial for keeping the [element hierarchy](https://university.webflow.com/lesson/element-hierarchy?topics=getting-started) organized. These Element methods let you retrieve and insert child elements, offering programmatic ways to change page structure.

To effectively use these methods, check if an element has its `Children` property set to `true`. This property is read-only, so it’s important to use elements that have this attribute. Using these methods with elements that don’t have this property will return an error.

Your browser does not support HTML video.

## Methods

The Children property supports the following methods:

[Get children\\
\\
Get child elements from a parent element in the element hierarchy.](https://developers.webflow.com/designer/reference/element-children/getChildren) [Prepend\\
\\
Insert a new element onto the page as the first child of the target element.](https://developers.webflow.com/designer/reference/element-children/prepend) [Append\\
\\
Insert a new element onto the page as the last child of the target element.](https://developers.webflow.com/designer/reference/element-children/append)