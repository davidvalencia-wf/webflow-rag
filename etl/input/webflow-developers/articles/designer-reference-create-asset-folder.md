---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/create-asset-folder
title: "Create an Asset folder | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.createAssetFolder(name, parentFolderId)`

Creates a folder in the Assets panel, which can also be nested within an existing folder for better organization.

### Syntax

```
createAssetFolder(name: string, parentFolderId?: string): Promise<AssetFolder>
```

### Parameters

- **name**: _string_ \- The display name of the new folder
- **parentFolderId**: _string_ \- (optional) - The ID of the desired parent folder. Get existing folder IDs from [webflow.getAllAssetFolders()](https://developers.webflow.com/designer/reference/get-all-asset-folders)

### Returns

**Return Value**

A Promise resolving to an _AssetFolder_ object.

### Example

```
// Get All Asset Folders
    const folders = await webflow.getAllAssetFolders()

    const parentFolderName = "My Parent Folder Name"

    // Find Parent Folder by Name
    if (parentFolderName && parentFolderName !== '') {
      const parentFolder = await Promise.all(
        folders.map(async (folder) => {
          const folderName = await folder.getName()
          if (folderName === parentFolderName) {
            return folder
          }
          return null
        }),
      ).then((results) => results.find((folder) => folder !== null))

      // Create Asset Folder with parent folder
      if (parentFolder) {
        const newFolder = await webflow.createAssetFolder(name, parentFolder.id)
        console.log(newFolder)
      }
    } else {
      // Crate Asset Folder
      const newFolder = await webflow.createAssetFolder(name)
      console.log(newFolder)
    }
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canManageAssets** | Any | Any | Any | Any |

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