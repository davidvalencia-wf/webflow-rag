---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/remove-variable-modes-style
title: "Remove variable modes | Webflow Developer Documentation"
published: 2025-11-17
---

## `style.removeVariableModes(props, options)`

Remove multiple [variable modes](https://developers.webflow.com/designer/reference/variable-modes) from a style. Each variable mode is associated with a [variable collection](https://developers.webflow.com/designer/reference/variable-collections-overview). To remove multiple variable modes, provide an array of variable mode objects.

### Syntax

```
style.removeVariableModes(
    modes: Array<VariableModes>,
    options?: {
      breakpointId?: BreakpointId,
      pseudoStateKey?: PseudoStateKey
    }
): Promise<null>;
```

### Parameters

- **`modes`**: _Array<VariableMode>_ \- An array of [variable modes](https://developers.webflow.com/designer/reference/variable-modes) to remove.

- **`options?`**: _BreakpointAndPseudo_ \- An object t hat lets you filter properties by breakpoint and/or pseudo-state. (Optional)
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
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

if (selectedElement?.styles) {
// Get Styles
const styles = await selectedElement.getStyles()
const primaryStyle = styles[0] // Get the primary style

// Get Variable Modes from Collection
const variableModes = await variableCollection?.getAllVariableModes()
const remove = await primaryStyle?.removeVariableModes(variableModes)

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