---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/user-changes-current-page
title: "User changes current page | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.subscribe("currentpage", callback)`

Use this method to start listening for specific events in your App. In this case, we’re listening for when a user selects a new page in the Designer.

### Syntax

```
 webflow.subscribe(
  event: 'currentpage',
  callback: (element: null | AnyElement) => void
): Unsubscribe;
```

### Parameters

**`event`** : `"currentpage"`

The name of the event to subscribe to.

* * *

**callback**: `(page: Page => void)`

The callback function to execute when the event occurs. The page parameter should be the page you’re watching.

* * *

### Returns

#### **_`Unsubscribe`_**

This is a special function you receive after subscribing. When you no longer want to listen to the event, call this function to stop receiving notifications.

### Example

```
// Subscribe to changes in the selected page
const selectedPageCallback = (page: Page | null) => {
  if (page) {
    console.log('Selected Page:', page);
  } else {
    console.log('No element is currently selected.');
  }
}

const unsubscribeSelectedElement = webflow.subscribe('currentpage', selectedPageCallback);
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