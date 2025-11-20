---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/exit-component
title: "Exit out of a component | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.exitComponent()`

Exit the focus of the Designer from a component definition. After exiting out of a component, the focus of the Designer will return to the `body` of the page.

### Syntax

```
webflow.exitComponent(): Promise<null>
```

### Returns

**Promise<`null`>**

A Promise that resolves to `null` when the context switch is successful.

### Example

```
await webflow.exitComponent()
const rootElement = await webflow.getRootElement()
const rootElementType = rootElement?.type

// Print Root Element Type. If element type is Body, the Designer has exited out of the Component context
console.log(`Element Type: ${rootElementType}`)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

* * *

### Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | any | any | any | any |

Ask AI

Assistant

Hi, I'm an AI assistant with access to documentation and other content.

Tip: You can toggle this pane with

`⌘`

+

`/`

Suggestions