---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-style-by-name
title: "Get style by name | Webflow Developer Documentation"
published: 2025-11-17
---

## **`webflow.getStyleByName(name)`**

Retrieve a Style by its name.

### Syntax

```
webflow.getStyleByName(name: string): Promise<Style | null>
```

### Parameters

- **`name`**: _string_ \- The name of the style to retrieve.

### Returns

**Promise< _`Style`_ \| `null`>**

A Promise that resolves to a style object, or `null` if the named style doesn’t exist.

### Example

```
getStyleByName: async (styleName: string) => {
  // Retrieve the style by name
  const retrievedStyle = await webflow.getStyleByName(styleName);

  if (retrievedStyle) {
    // Get and print properties of the retrieved style
    const styleProperties = await retrievedStyle.getProperties();
    console.log("Style properties:", styleProperties);
  } else {
    console.log(`Style ${styleName} not found.`);
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