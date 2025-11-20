---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-style-property
title: "Get style property | Webflow Developer Documentation"
published: 2025-11-17
---

## **`style.getProperty(prop, options?)`**

Retrieve the value of a specific css property in a Style object.

### Syntax

```
style.getProperty(
  prop: {{STYLE_PROPERTY}},
  options?: {
    breakpointId?: {{BREAKPOINT_ID}},
    pseudoStateKey?: {{PSEUDO_STATE_KEY}}
  }
): Promise<null | {{PROPERTY_MAP}}>
```

### Parameters

- **`prop`**: _StyleProperty_ \- The property to get. See the [Style Properties](https://developers.webflow.com/designer/reference/style-properties) reference for a list of supported properties.

- **options**: An object that lets you filter properties by breakpoint and/or pseudo-state.
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

**Promise< _PropertyMap\[p\]_ \| _Variable_ \| `null`>**

Returns a Promise that resolves to:

- _PropertyMap\[p\]_ \- The value of the provided style property, if one exists.
- A [Variable](https://developers.webflow.com/designer/reference/variables-overview) representing the value of the provided style property, if a variable is used as the value of the provided style property.
- `null` \- If value doesn’t exist for the provided style property, this method will return `null`.

### Example

```
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

// Get Element Styles
if (selectedElement?.styles) {

    const styles = await selectedElement.getStyles()
    const selectedPropertyList = await Promise.all(styles.map(async style => {

      const styleName = await style.getName()
      const property = await style.getProperty(`box-shadow`)
      console.log(`Style Name: ${styleName}, box-shadow: ${property}`)

    }))

  }
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | An |