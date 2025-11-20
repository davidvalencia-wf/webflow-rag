---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/close-extension
title: "Close the extension | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.closeExtension()`

Close the Designer Extension using the Webflow object.

### Syntax

```
webflow.closeExtension(): Promise<null>
```

### Returns

**Promise<`null`>**

A Promise that resolves to `null`.

### Example

This ReactJSexample shows how to close the extension using a button.

```
function CloseExtensionButton() {
    const handleCloseExtension = async () => {
        try {
            await webflow.closeExtension();
            console.log("Extension closed successfully.");
        } catch (error) {
            console.error("Failed to close the extension:", error);
        }
    };

    return (
        <button onClick={handleCloseExtension}>
            Close Extension
        </button>
    );
}
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