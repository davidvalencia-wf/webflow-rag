---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/set-selected-element
title: "Set selected element | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.setSelectedElement()`

Set the selected element on the current page, or on the current component when the Designer is [entered into a component.](https://developers.webflow.com/designer/reference/enter-component)

The returned element object can be further queried using [element-level properties](https://developers.webflow.com/designer/reference/elements/children) (e.g. type, styles) and methods (e.g. `getChildren()`)

### Syntax

```
webflow.setSelectedElement(element: AnyElement): Promise<AnyElement>
```

### Parameters

- **Element**: _AnyElement_ \- Any element that is on the current canvas, or is with the current component when the designer is [entered into a component.](https://developers.webflow.com/designer/reference/enter-component)

### Returns

_Promise<AnyElement>_

A Promise that resolves to `AnyElement`.

### Example

```
// Get the Root Element
const rootElement = await webflow.getRootElement();

if (rootElement) {

  // Select the root element
  const selectedElement = await webflow.setSelectedElement(rootElement);

  if (selectedElement?.children) {

    // Start building elements on the selected element
    await selectedElement?.append(webflow.elementPresets.DOM)

  }
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for authorization only

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