---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/user-changes-breakpoint
title: "User changes breakpoint | Webflow Developer Documentation"
published: 2025-11-17
---

## `subscribe("mediaquery", callback)`

Use this method to start listening for specific events in your App. In this case, we’re listening for when a user selects a different media query, also known as a [breakpoint](https://university.webflow.com/lesson/intro-to-breakpoints?topics=layout-design), in the Designer.

Webflow’s built-in responsive breakpoints allow users to customize site designs for different screen sizes. Knowing the current breakpoint can help your app build responsive content that’s applicable to different screen sizes and contexts.

### Syntax

```
 webflow.subscribe(
  event: 'mediaquery',
  callback: (element: null | AnyElement) => void
): Unsubscribe;
```

### Parameters

**`event`** : `"mediaQuery"`

The name of the event to subscribe to.

* * *

**callback**: `(breakpoint: BreakpointId) => void`

This is the function that will be called each time the event occurs. It takes a `breakpoint` as a parameter. Use this function to define what should happen when the event is triggered.

* * *

### Returns

#### **_`Unsubscribe`_**

This is a special function you receive after subscribing. When you no longer want to listen to the event, call this function to stop receiving notifications.

### Example

```
/**
 * Subscribe to the 'mediaquery' event and get the Unsubscribe function.
 * This event notifies when the breakpoint changes in the Webflow Designer.
 * @param {BreakpointId} breakpoint - The current breakpoint ID ('xxl', 'xl', 'large', 'main', 'medium', 'small', 'tiny').
 */
const unsubscribeMediaQuery = webflow.subscribe("mediaquery", (breakpoint) => {
  switch (breakpoint) {
    case 'xxl':
      console.log("The current view is for very large screens or high-resolution monitors.");
      break;
    case 'xl':
      console.log("The current view is suitable for large desktop monitors.");
      break;
    case 'large':
      console.log("The current view fits standard desktop monitors.");
      break;
    case 'main':
      console.log("The current view is suitable for smaller desktops or large tablets.");
      break;
    case 'medium':
      console.log("The current view is suitable for tablets and some large phones.");
      break;
    case 'small':
      console.log("The current view is designed for larger mobile devices.");
      break;
    case 'tiny':
      console.log("The current view is for the smallest mobile devices.");
      break;
    default:
      console.log("Unknown breakpoint:", breakpoint);
  }
});

/**
 * Later, when you want to unsubscribe from the 'mediaquery' event:
 * @function
 */
unsubscribeMediaQuery();
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