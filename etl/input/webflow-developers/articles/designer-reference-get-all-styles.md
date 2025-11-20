---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-all-styles
title: "Get all styles | Webflow Developer Documentation"
published: 2025-11-17
---

## **`webflow.getAllStyles()`**

[Retrieve all Styles, also known as Classes](https://university.webflow.com/lesson/web-styling-using-classes?topics=layout-design), present on the Webflow site.

### Syntax

```
webflow.getAllStyles(): Promise<Array<Style>>
```

### Returns

**Promise<Array< _Style_ >>**

A Promise that resolves to an array of _Style_ objects representing all the styles present on the current site.

### Example

```
// Get all Styles
const allStyles = await webflow.getAllStyles();

// List Styles
if (allStyles.length > 0) {

  console.log("List of all styles:");

  allStyles.forEach(async (style, index) => {

    // Print style names and ids
    console.log(`${index + 1}. Style Name: ${await style.getName()}, Style ID: ${style.id}`);
  });
} else {
  console.log("No styles found in the current context.");
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

Checks for authorization only

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |