---
source: webflow-developers
category: general
url: https://developers.webflow.com/browser/optimize/quickstart
title: "Quickstart | Webflow Developer Documentation"
published: 2025-11-17
---

This guide will help you get started making requests to Webflow Optimize through the Browser API. It will walk you through the process of creating a script and adding Optimize methods as callbacks.

##### No installation required

The Browser API is automatically enabled on your site with no manual installation required. The Optimize methods are available through the global `wf` object in your browser.

## Prerequisites

- A Webflow site with [Optimize enabled](https://university.webflow.com/videos/start-optimizing-your-site-with-webflow-optimize)
- Ability to add [custom JavaScript](https://help.webflow.com/hc/en-us/articles/33961357265299-Custom-code-in-head-and-body-tags) to your site or use a tool like [Google Tag Manager](https://support.google.com/tagmanager/answer/6107167?hl=en)

## Getting started with the Optimize Browser APIs

There are two main approaches to implementing your Optimize code:

1. **Add code directly to your site**: Place your script in the `<head>` section of your site using Webflow’s [Custom Code](https://help.webflow.com/hc/en-us/articles/33961357265299-Custom-code-in-head-and-body-tags) feature.
2. **Use Google Tag Manager**: Add the API call when configuring a custom tag

[1](https://developers.webflow.com/browser/optimize/quickstart#call-wfready)

### Call `wf.ready()`

Since the Webflow Browser API loads asynchronously, you need to ensure your code runs at the right time by using `wf.ready()`.

```
// Call wf.ready() to ensure the Browser API is available
wf.ready(function() {
    // Your code here
});
```

Add this call to the `<head>` section of your site or page using Webflow’s [Custom Code](https://help.webflow.com/hc/en-us/articles/33961357265299-Custom-code-in-head-and-body-tags) feature. Or, if using a tool like Google Tag Manager, add the API call when configuring the tag. Adding the call early ensures you won’t miss any events on the page.

###### When should you call wf.ready() ?

To make sure your callback fires, call `wf.ready()` as early as possible to guarantee it’s registered before Webflow Optimize returns any time sensitive events. Preferably, before the DOM starts rendering. This prevents the callback from missing any events. To illustrate:

![Timing your script to run after a variation is recorded](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/browser/pages/Optimize/variations/assets/optimize-diagram.png)

We recommend adding the API call in before the closing `</head>` tag on your site or page using Webflow’s [Custom Code](https://help.webflow.com/hc/en-us/articles/33961357265299-Custom-code-in-head-and-body-tags) feature. Or, if using a tool like Google Tag Manager, add the API call when configuring the tag.

[2](https://developers.webflow.com/browser/optimize/quickstart#add-callbacks-to-wfready)

### Add callbacks to `wf.ready()`

Now you can start adding callbacks to your script to [retrieve variations](https://developers.webflow.com/browser/optimize/variations) and [set custom attributes.](https://developers.webflow.com/browser/optimize/attributes)

###### Multiple callbacks

###### Multiple API calls per page

You can add multiple callbacks in `wf.ready()` to handle different Optimize functionality in a single script. This enables you to efficiently manage multiple operations like retrieving variations and setting attributes in one place. Each callback will execute once the Webflow Browser API is ready.

**Example:**

```
// Call wf.ready() to ensure the Browser API is available
wf.ready(function() {
    // Retrieve variations
    wf.onVariationRecorded(function(result){
        // Do something with the result
        console.log(result);
    });

    // Set custom attributes
    wf.setAttributes("user",{
        userSegment: 'enterprise',
        userRole: 'technicalBuyer'
    });
});
```

## Next steps

Now that you’re familiar with making requests to the Browser API, you can learn more about Optimize methods to add to your callbacks:

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Test.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Test.svg)\\
\\
Track variations\\
\\
Send variations from Optimize experiments to third-party tools](https://developers.webflow.com/browser/optimize/variations) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/OptimizeUser.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/OptimizeUser.svg)\\
\\
Personalize experiences with custom attributes\\
\\
Set custom attributes to personalize experiences based on user behavior and data](https://developers.webflow.com/browser/optimize/attributes)

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