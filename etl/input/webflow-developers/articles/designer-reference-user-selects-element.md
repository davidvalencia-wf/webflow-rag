---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/user-selects-element
title: "User selects element | Webflow Developer Documentation"
published: 2025-11-17
---

## `subscribe("selectedelement", callback)`

Use this method to start listening for specific events in your App. In this case, we’re listening for when a user selects an element on a page.

### Syntax

```
 webflow.subscribe(
  event: 'selectedelement',
  callback: (element: null | AnyElement) => void
): Unsubscribe;
```

### Parameters

**`event`** : `"selectedlement"`

The name of the event to subscribe to.

* * *

**callback**: `(element: null | AnyElement => void )`

This is the function that will be called each time the event occurs. It takes an `element` as a parameter. A `null` element signifies that no element is selected. Use this function to define what should happen when the event is triggered.

* * *

### Returns

#### **_`Unsubscribe`_**

This is a special function you receive after subscribing. When you no longer want to listen to the event, call this function to stop receiving notifications.

### Example

```
// Subscribe to changes in the selected element
const selectedElementCallback = (element: AnyElement | null) => {
  if (element) {
    console.log('Selected Element:', element);
  } else {
    console.log('No element is currently selected.');
  }
}

const unsubscribeSelectedElement = webflow.subscribe('selectedelement', selectedElementCallback);
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