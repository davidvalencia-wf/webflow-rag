---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-variable-mode-style
title: "Get variable mode | Webflow Developer Documentation"
published: 2025-11-17
---

## `style.getVariableMode(VariableCollecton, options?)`

Retrieve the [variable mode](https://developers.webflow.com/designer/reference/variable-modes) applied to a style for a given [variable collection](https://developers.webflow.com/designer/reference/variable-collections-overview). A collection can define multiple modes, but a style can have only one variable mode applied per collection.

### Syntax

```
style.getVariableMode(
    collection: VariableCollection,
    options?: {
      breakpointId?: BreakpointId,
      pseudoStateKey?: PseudoStateKey
    }
): Promise<VariableMode | null>
```

### Parameters

- **collection**: _VariableCollection_ \- The variable collection of the variable mode.
- **options?**: _BreakpointAndPseudo_ \- The [breakpoint and pseudo state](https://developers.webflow.com/designer/reference/styles-overview#responsive-styling-with-breakpoints-and-pseudo-states) for the style.
  - **`BreakpointId`**: Identifies the responsive breakpoint to get styles for.

    ```
    type BreakpointId = "xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"
    ```

  - **`PseudoStateKey`**: Specifies a CSS pseudo-class to get styles for.

    ```
    type PseudoStateKey = "noPseudo" | "nth-child(odd)" | "nth-child(even)" |
      "first-child" | "last-child" | "hover" | "active" | "pressed" |
    ```

### Returns

A Promise that resolves to a `VariableMode` object or `null` if the variable mode isn’t found.

### Example

```
// Get Selected Element
const selectedElement = await webflow.getSelectedElement()

    if (selectedElement?.styles) {
    // Get Styles
    const styles = await selectedElement.getStyles()
    const primaryStyle = styles[0] // Get the primary style

    // Get Variable Mode
    if (primaryStyle && variableCollection) {
        const variableMode =
        await primaryStyle.getVariableMode(variableCollection)
        const variableModeName = await variableMode?.getName()
        console.log(variableModeName)
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