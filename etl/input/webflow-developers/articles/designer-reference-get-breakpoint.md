---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-breakpoint
title: "Get the current breakpoint | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getMediaQuery()`

Retrieves the current [breakpoint](https://university.webflow.com/lesson/intro-to-breakpoints?topics=layout-design) setting in the Designer. Webflow’s built-in responsive breakpoints - also known as media queries - allow users to customize site designs for different screen sizes. Knowing the current breakpoint can help your app build responsive content that’s applicable to different screen sizes and contexts.

### Syntax

```
webflow.getMediaQuery(): Promise<BreakpointId>
```

### Returns

**Promise< _BreakpointID_ >**:`"xxl" | "xl" | "large" | "main" | "medium" | "small" | "tiny"` \- Identifier for the breakpoint size, also known as media query, in the designer.

A Promise that resolves to the value of the Breakpoint ID.

### Example

```
const breakpointId = await webflow.getMediaQuery();

  switch (breakpointId) {
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
  }
}
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)