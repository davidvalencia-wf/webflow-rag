---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-pseudo-mode
title: "Get the pseudo state | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getPseudoMode()`

Get the current [pseudo-class state](https://help.webflow.com/hc/en-us/articles/33961301727251-States) (e.g. hover, focus, pressed) of the designer.

### Syntax

```
webflow.getPseudoMode(): Promise<null | PseudoStateKey>
```

### Returns

A Promise that resolves to the current pseudo-class state of the designer, or `null` if no pseudo-state is active.

**Promise< _PseudoStateKey_ \| null>**

### Example

```
const pseudoState = await webflow.getPseudoMode();
console.log(pseudoState);
// Output: "hover"
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |

### Pseudo-State Keys

| Pseudo-State | Designer State | Description |
| --- | --- | --- |
| `hover` | Hover | Element is hovered over by the mouse |
| `pressed` | Pressed | Element is in pressed state |
| `visited` | Visited | **Link** element has been visited |
| `focus` | Focused | Element has keyboard/input focus |
| `focus-visible` | Focused (Keyboard) | Element has keyboard focus with visible indicator |
| `focus-within` | — | Element or its descendant has focus |
| `placeholder` | Placeholder | Placeholder text in form block inputs |
| `first-child` | First Item | First Collection Item in a collection list |
| `last-child` | Last Item | Last Collection Item in a collection list |
| `nth-child(odd)` | Odd Items | Odd-numbered Collection Item in a collection list |
| `nth-child(even)` | Even Items | Even-numbered Collection Item in a collection list |