---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-variable-modes-style
title: "Get variable modes | Webflow Developer Documentation"
published: 2025-11-17
---

## `style.getVariableModes(options?)`

Retrieve all [variable modes](https://developers.webflow.com/designer/reference/variable-modes) applied to a style across all [variable collections](https://developers.webflow.com/designer/reference/variable-collections-overview). Returns a map of collection IDs to their applied mode IDs.

### Syntax

```
style.getVariableModes(
  options?: {
    breakpointId?: BreakpointId,
    pseudoStateKey?: PseudoStateKey
  }
): Promise<VariableModeStylePropertyMap>;
```

### Parameters

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

A Promise that resolves to a `VariableModeStylePropertyMap` object containing variable modes applied to the style, keyed by variable collection ID.

VariableModeStylePropertyMap

```
interface VariableModeStylePropertyMap {
  [variableCollectionId: string]: string;
}

// Example
{
  "collection-09e4110d-f4b6-45f9-3c1b-614c748a01c6": "mode-2a4f8a4e-eb9b-be56-f773-9e88c3669955",
  "collection-b799d4ac-670a-8296-0f2c-e153c4b1b46b": "base",
  "collection-cd77d4e3-58e8-aac2-e2e4-4f567d399c4b": "mode-f780f7e7-1b41-b353-f931-13de2c4a1234",
  "collection-e4fba320-a8ce-aad6-a302-8f95cdac2c6a": "mode-a4a9e6df-f2a6-f5e8-97e9-59f264e37b90"
}
```

### Example

```
// Get selected element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.styles) {
    // Get styles
    const styles = await selectedElement.getStyles()
    if (styles) {
        // Get the primary style
        const primaryStyle = styles[0]

        // Get the variable modes
        const variableModes = await primaryStyle?.getVariableModes()
        console.log(variableModes)
    }
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |

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