---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/asset-overview
title: "Assets | Webflow Developer Documentation"
published: 2025-11-17
---

The Asset APIs enable you to manage and interact with your site’s media files through the [Designer’s Assets panel](https://university.webflow.com/lesson/assets-panel?topics=elements).

These APIs let you:

- Upload new assets to your Webflow site
- Retrieve existing assets and their metadata
- Update asset properties like names and alt text
- Organize assets into folders
- Get direct URLs to hosted assets

## Using assets on a site

To display an asset on a page, you can:

1. [Create](https://developers.webflow.com/designer/reference/create-an-asset) or [select](https://developers.webflow.com/designer/reference/get-asset-by-id) an asset
2. [Create an image element](https://developers.webflow.com/designer/reference/insert-element-after) using the `webflow.elementPresets.Image` element preset
3. [Set the asset](https://developers.webflow.com/designer/reference/image-element/setAsset) on the image element
4. Optionally set additional properties like alt text for accessibility

**Example**

```
// Get a file from a remote URL
const response = await fetch("https://fastly.picsum.photos/id/336/200/300.jpg?hmac=FYvgN5rqQdtTh1q0wSE75sgfBRdhD-qNJwP12mTVXTc")
const blob = await response.blob()
const file = new File([blob], "bikelocks.jpg", { type: 'image/jpeg' });

// Create an asset from the file and set alt text
const asset = await webflow.createAsset(file)
await asset.setAltText('Candid photo of Marvin the Paranoid Android')

// Get Selected Element
const selectedElement = await webflow.getSelectedElement()
if (selectedElement) {

  // Insert Image after selected Element
  const newImage = await selectedElement.after(webflow.elementPresets.Image)

  // Set the asset on the image element
  await newImage.setAsset(asset)
}
```

## Supported file types

The Asset APIs support various file types including images, documents, and Lottie animations. Refer to the accepted MIME types listed below for compatibility. Pass Lottie files as `application/json` MIME types.

MIME Types

```
'image/jpeg'
'image/jpg'
'image/png'
'image/gif'
'image/svg+xml'
'image/bmp'
'image/webp'
'application/pdf'
'application/msword'
'application/vnd.ms-excel'
'application/vnd.ms-powerpoint'
'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
'application/vnd.openxmlformats-officedocument.presentationml.presentation'
'text/plain'
'text/csv'
'application/vnd.oasis.opendocument.text'
'application/vnd.oasis.opendocument.spreadsheet'
'application/vnd.oasis.opendocument.presentation'
'application/json'
```

Files upload to the Assets panel aren’t restricted. They’re publicly available and discoverable, but won’t necessarily be discovered or indexed by search engines if the file isn’t on a publicly viewable webpage or linked elsewhere. [Learn more about asset privacy in Webflow.](https://university.webflow.com/lesson/asset-privacy)

## Properties

| Property | Description |
| --- | --- |
| `id` | Unique identifier of the Asset |

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