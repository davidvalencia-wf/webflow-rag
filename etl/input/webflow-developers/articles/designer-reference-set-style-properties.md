---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-style-properties
title: "Set style properties | Webflow Developer Documentation"
published: 2025-11-17
---

## **`style.setProperties(props, options?)`**

Set multiple style-properties on a Style object.

### Syntax

```
 style.setProperties(
  props: PropertyMap,
  options?: {
    breakpointId?: BreakpointId,
    pseudoStateKey?: PseudoStateKey
  }
): Promise<void>
```

### Parameters

- **`props`**: _PropertyMap_ \- An object of style properties and their values. See the [Style Properties](https://developers.webflow.com/designer/reference/style-properties) reference for a list of supported properties.

- **`options`**: _BreakpointAndPseudo_ \- An object that lets you filter properties by breakpoint and/or pseudo-state. (Optional)
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

**Promise<`null`>**

A Promise that resolves to `null`

### Example

```
// Create a new style
const newStyle = await webflow.createStyle('MyCustomStyle')

const propertyMap : PropertyMap = {
    'background-color': "blue",
    'font-size': "16px",
    'font-weight': "bold",
  }
const myBreakpoint = {breakpoint: "medium"} as BreakpointAndPseudo

// Set and save properties for the style
await newStyle.setProperties(propertyMap, myBreakpoint);
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canModifyStyleBlocks** | Any | Any | Canvas | Design |

Ask AI

Assistant

Hi, I'm an AI assistant with access to documentation and other content.

Tip: You can toggle this pane with

`⌘`

+

`/`

Suggestions

How do I get started with Webflow Cloud storage and what are the three main storage options available?

What are the new LLMS.txt endpoints available for Enterprise customers and how do they work?

What changes are required for internal APIs affecting site data sync, and what is the migration timeline?

How can I use the MCP server with the Designer API, and what are the system requirements?

What are the breaking changes for CMS publishing on July 7, 2025, and how should I update my code?