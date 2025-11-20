---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-asset-mime-type
title: "Get Asset MIME Type | Webflow Developer Documentation"
published: 2025-11-17
---

## `asset.getMimeType()`

Retrieve the [MIME Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) of a specified asset.

### Syntax

```
asset.getMimeType(): Promise<string>
```

### Returns

**Promise< _string_ >**

A Promise that resolves to the MIME type of the Asset

### Example

```
// Get Selected Element
const el = await webflow.getSelectedElement()

// Check if element is selected and its type
if (!el || el.type !== 'Image') {
  console.error('Please select an Image element on the canvas')
  await webflow.notify({
    type: 'Error',
    message: 'Please select an Image element on the canvas',
  })
} else {
  const asset = await el.getAsset() // Get Asset
  const assetMimeType = await asset?.getMimeType() // Get Asset MIME Type
  console.log(`Asset MIME type: ${assetMimeType}`)
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessAssets** | any | any | any | any |

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