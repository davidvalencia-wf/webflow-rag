---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-style-property
title: "Set style property | Webflow Developer Documentation"
published: 2025-11-17
---

## **`style.setProperty(prop, value, options?)`**

Manage the CSS of a Style by setting a specific style property at the given breakpoint and pseudo-state.

### Syntax

```
 style.setProperty(
  prop: StyleProperty,
  value: string | VariableReference,
  options?: {
    breakpointId?: BreakpointId,
    pseudoStateKey?: PseudoStateKey
  }
): Promise<void>
```

### Parameters

- **`prop`**: _StyleProperty_ \- The property to set. See the [Style Properties](https://developers.webflow.com/designer/reference/style-properties) reference for a list of supported properties.

- **`value`**: _String_ \| _VariableReference_ \- The value to set. You can set the value to a string or a [variable reference](https://developers.webflow.com/designer/reference/variables-overview).

- **`options`**: _BreakpointAndPseudo_ \- An object that lets you filter properties by breakpoint and/or pseudo-state. (Optional)
  - **`BreakpointId`**: Identifies the responsive breakpoint to set the style property for.

    ```
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```

  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to set the style property for.

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
// Retrieve the style by name
const retrievedStyle = await webflow.getStyleByName(styleName);

// Set Style Properties
const options: BreakpointAndPseudo = { breakpoint: "xl", pseudo: "hover" }
await retrievedStyle?.setProperty('background-color', 'blue', options)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

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