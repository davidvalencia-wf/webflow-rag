---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/resize-extension
title: "Resize the extension | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.setExtensionSize(size)`

Set the desired size of the Extension UI.

Need more room in your app for certain tasks? You can easily make your Designer Extension bigger. But remember, bigger isn’t always better. Make it large only when you really need additional surface area and then go back to a smaller size. This way, your users can work smoothly with your app and the Designer at the same time.

### Syntax

```
webflow.setExtensionSize(
  size: 'default' | 'comfortable' | 'large' | {width: number; height: number}
): Promise<null>
```

### Parameters

**size**: _“default”_ \| _“comfortable”_ \| _“large”_ \| `{height: number, width: number}`

The desired size for the Extension UI. The three available sizes are:

- **Default:** 240px by 360px

Great for simple apps that don’t require much real estate
- **Comfortable:** 320px by 460px

For apps like form submissions that may require a bit more room
- **Large:** 800px by 600px

For apps that require in-depth work flows, previews, or in depth control

If passing an object to create a custom size, please note the following size limits.

- **min:** 240x360
- **max:** 1200x800

### Returns

**Promise<`null`>**

A Promise that resolves to `null` when the size is set.

### Example

```
// Set the desired size for the extension UI
const newSize = "large"; // You can change this to "default," "comfortable," or provide { width, height }

// Set the Extension UI size
await webflow.setExtensionSize(newSize);

console.log(`Extension UI size set to: ${newSize}`);
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

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