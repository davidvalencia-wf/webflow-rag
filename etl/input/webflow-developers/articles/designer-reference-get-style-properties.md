---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-style-properties
title: "Get style properties | Webflow Developer Documentation"
published: 2025-11-17
---

## **`style.getProperties(options?)`**

Retrieves the CSS properties of the specified Style Object. Additionally, you can get properties on a style for a specific breakpoint or pseudo-state.

See the [style properties list](https://developers.webflow.com/designer/reference/style-properties) for an index of CSS properties to set on a style.

### Syntax

```
style.getProperties(
  options?: {
    breakpoint?: {{BREAKPOINT_ID}},
    pseudo?: {{PSEUDO_STATE_KEY}}
  }
): Promise<{{PROPERTY_MAP}}>
```

### Parameters

- **options**: An object that lets you filter properties by breakpoint and pseudo-state. (optional)
  - **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.

    ```
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```

  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.

    ```
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" |
      "first-child" | "last-child" | "hover" | "active" | "pressed" |
      "visited" | "focus" | "focus-visible" | "focus-within" |
      "placeholder" | "empty" | "before" | "after"
    ```

### Returns

**Promise< _PropertyMap_ >**

A Promise that resolves to a [_PropertyMap_](https://developers.webflow.com/designer/reference/style-properties) object. A dictionary of style properties and their values.

#### Example

```
// Get selected element
const element = await webflow.getSelectedElement()

if (element?.styles) {

  // Get Element Styles
  const styles = await element.getStyles()

  // Initialize an empty object to store all properties
  const allProperties: { [key: string]: any } = {};

  for (let style of styles) {
    // Use string type for styleName
    const styleName: string = await style.getName();
    const breakpoint : BreakpointAndPseudo = {breakpoint: 'xxl'}
    const properties = await style.getProperties(breakpoint);
    allProperties[styleName] = properties;
  }

  console.log(allProperties);

}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | An |