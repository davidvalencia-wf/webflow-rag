---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/create-an-asset
title: "Create an Asset | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.createAsset(fileBlob)`

Create a new asset on your Webflow site.

This method is specifically for creating new assets - if you need to update an existing asset, use the [set asset file](https://developers.webflow.com/designer/reference/set-asset-file) method instead. Be sure to review the [limits](https://developers.webflow.com/designer/reference/create-an-asset#limits) and [MIME types](https://developers.webflow.com/designer/reference/create-an-asset#mime-types) sections to ensure your files meet the requirements.

###### Adding assets to pages

To add an asset to a page:

1. Create an asset
2. Create an [image element](https://developers.webflow.com/designer/reference/image-element)
3. Use the [`element.setAsset(asset)`](https://developers.webflow.com/designer/reference/image-element/setAsset) method to set the asset

### Syntax

```
webflow.createAsset(fileBlob:File): Promise<Asset>
```

### Parameters

- **`fileBlob`**:`File` \- Represents a valid [File](https://developer.mozilla.org/en-US/docs/Web/API/File) to upload. Refer to the examples below for guidance on uploading an asset from a remote source and directly from a file picker.

### Returns

**Promise< _Asset_ >**

A Promise that resolves to the new Asset.

### Example

###### Remote File

###### Direct Upload

```
// Fetch image from remote source and build a Blob object
    const response = await fetch(url)
    const blob = await response.blob()
    const file = new File([blob], fileName, {
      type: 'image/png',
    })

    // Create and upload the asset to webflow
    const asset = await webflow.createAsset(file);
    console.log(asset)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Errors

If the method fails to create an asset, the method will return an error with the following cause and message.

| Tag | Message |
| --- | --- |
| ResourceCreationFailed | Failed to create asset for ${File.name} |

### Designer ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canManageAssets** | any | any | any | any |

## Limits

Uploaded assets must adhere to specific size limitations:

- Images must not exceed 4MB
- Documents must not exceed 10MB

## MIME types

Refer to the accepted MIME types listed below for compatibility. Pass Lottie files as `application/json` MIME types.

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