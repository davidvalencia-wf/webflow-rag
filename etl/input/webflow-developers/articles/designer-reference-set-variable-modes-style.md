---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-variable-modes-style
title: "Set variable modes on a style | Webflow Developer Documentation"
published: 2025-11-17
---

## `style.setVariableModes(props, options?)`

Apply multiple [variable modes](https://developers.webflow.com/designer/reference/variable-modes) to a style. Each variable mode belongs to a [variable collection](https://developers.webflow.com/designer/reference/variable-collections-overview). To apply multiple variable modes, you must provide a map of variable collection IDs to their corresponding variable mode IDs.

### Syntax

```
style.setVariableModes(
    props: VariableModeStylePropertyMap,
    options?: {
      breakpointId?: BreakpointId,
      pseudoStateKey?: PseudoStateKey
    }
): Promise<null>;
```

### Parameters

- **props**: _VariableModeStylePropertyMap_ \- A map of variable collection IDs to their corresponding variable mode IDs.

VariableModeStylePropertyMap

```
// Example
const props: VariableModeStylePropertyMap = {
"collection-09e4110d-f4b6-45f9-3c1b-614c748a01c6": "mode-2a4f8a4e-eb9b-be56-f773-9e88c3669955",
"collection-b799d4ac-670a-8296-0f2c-e153c4b1b46b": "base",
"collection-cd77d4e3-58e8-aac2-e2e4-4f567d399c4b": "mode-f780f7e7-1b41-b353-f931-13de2c4a1234",
"collection-e4fba320-a8ce-aad6-a302-8f95cdac2c6a": "mode-a4a9e6df-f2a6-f5e8-97e9-59f264e37b90"
}
```

- **options?**: _BreakpointAndPseudo_ \- An object that lets you filter properties by breakpoint and/or pseudo-state. (Optional)
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

A Promise that resolves to `null`.

### Example

```
// This example gets variable modes from the style of the currently selected element, then sets them a chosen style

// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.styles) {
    // Get Styles
    const styles = await selectedElement.getStyles()
    const primaryStyle = styles?.[0] // Get the primary style
    const variableModes = await primaryStyle?.getVariableModes()

    // Set Variable Modes on Selected Style
    if (variableModes) {
        await selectedStyle?.setVariableModes(variableModes)
    }
}
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