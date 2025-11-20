---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/user-changes-cms-page
title: "User changes CMS Page | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.subscribe("currentcmsitem", callback)`

Use this method to listen for specific events in your app. When a user selects a [collection page](https://university.webflow.com/lesson/structure-and-style-collection-pages?topics=cms-dynamic-content) or chooses a new CMS item on a collection page, this event will trigger. This can be especially useful for determining the path of auto-generated pages from a CMS or Ecommerce collection.

### Syntax

```
webflow.subscribe(
  event: 'currentcmsitem',
  callback: (element: null | AnyElement) => void
): Unsubscribe;
```

### Parameters

**`event`** : `"currentpage"`

The name of the event to subscribe to.

* * *

**callback**: `(() => void)`

The callback function to execute when the event occurs.

* * *

### Returns

#### **_`Unsubscribe`_**

This is a special function returned after subscribing. Call this function when you want to stop listening to the event and discontinue receiving notifications.

### Example

```
// Callback for subscription
    const cmsCallback = async () => {
      const page = await webflow.getCurrentPage()
      console.log(await page.getPublishPath())
    }

// Subscribe to changes for CMS Pages
 const unsubscribeCmsPages = webflow.subscribe('currentcmsitem', cmsCallback)
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