---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer-api-new-version
title: "Designer API: Version 2 | Webflow Developer Documentation"
published: 2025-11-17
---

[February 20, 2024](https://developers.webflow.com/designer-api-new-version)

## [Designer API: Version 2](https://developers.webflow.com/designer-api-new-version)

We’re excited to introduce the new version of Webflow’s Designer APIs, featuring enhanced functionality and more efficient methods for interacting with the Designer. [Refer to the migration guide](https://developers.webflow.com/designer/reference/migrating-to-v2) to learn more about configuring your App to work with version 2 of Webflow’s Designer APIs.

- [New methods](https://developers.webflow.com/designer-api-new-version#new-methods)
- [Removed methods](https://developers.webflow.com/designer-api-new-version#removed-methods)

## Notable changes

### Simplified edit semantics

The `.save()` method has been removed from many of the API’s objects. Rather than staging “local changes” and explicitly synchronizing via `element.save()`, the API now makes changes as they’re invoked.

### Accessing native elements

Through the introduction of the [Element Presets Object](https://developers.webflow.com/designer/reference/element-presets), the API now allows Apps to insert [native elements](https://university.webflow.com/lesson/add-elements-panel?topics=elements) onto the canvas.

### Inserting elements

The new version of the Designer API **introduces** new helper methods that make it easier to insert elements into a hierarchy:

- [`element.append()`](https://developers.webflow.com/designer/reference/append)
- [`element.prepend()`](https://developers.webflow.com/designer/reference/prepend)
- [`element.before()`](https://developers.webflow.com/designer/reference/insert-element-before)
- [`element.after()`](https://developers.webflow.com/designer/reference/insert-element-after)

The Designer API v2 removes legacy element creation methods in favor of more flexible insertion methods.

- `createDOM()`
- `createString()`
- `createHeading()`

### Direct editing of components

This API enables a more streamlined approach to editing component objects. You can now access the root element of a component object by [using the `get-root-element` method](https://developers.webflow.com/designer/reference/get-root-element).

### Clear and consistent naming

Minor naming changes to clarify Designer API functionality:

- _“Folders”_ → _“PageFolders”_ to disambiguate versus other Page resources (for example, Asset pages)
- _“og-”_ → _“openGraph-”_ prefix for Open Graph Page Fields

### Clear and consistent return objects

- Most methods that aren’t meant to return a value, like `remove`, now return a Promise that resolves to `null` instead of `undefined`
- Element IDs are now identified by their component and element ids, for example:

```
id:  {component: '63486e4622e33733b9002e9c', element: 'cafe0045-d304-79d9-8f68-af3adaed06e8'}
```

* * *

## New methods and objects

### Elements

- [Element Presets](https://developers.webflow.com/designer/reference/element-presets)
- [Remove element](https://developers.webflow.com/designer/reference/remove-element)
- [Insert Element before target element](https://developers.webflow.com/designer/reference/insert-element-before)
- [Insert element after target element](https://developers.webflow.com/designer/reference/insert-element-after)
- [Nest element as first child](https://developers.webflow.com/designer/reference/prepend)
- [Nest element as last child](https://developers.webflow.com/designer/reference/prepend)

### Styles

- [Remove a single style property](https://developers.webflow.com/designer/reference/remove-a-style-property)
- [Remove multiple style properties](https://developers.webflow.com/designer/reference/remove-style-properties)

## Removed methods

- `.save()`
- `webflow.createDOM()`
- `webflow.createHeading()`
- `webflow.createString()`