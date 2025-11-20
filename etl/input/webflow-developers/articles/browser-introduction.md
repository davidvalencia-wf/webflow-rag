---
source: webflow-developers
category: general
url: https://developers.webflow.com/browser/introduction
title: "Browser API | Webflow Developer Documentation"
published: 2025-11-17
---

The Browser API lets you control Webflow Analyze and Optimize features directly from your site’s JavaScript. Use it to manage consent, track experiments, and personalize user experiences.

## What you can do with the Browser API

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/OptimizeUser.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/OptimizeUser.svg)\\
\\
Manage consent\\
\\
Manage user consent and privacy preferences in real time](https://developers.webflow.com/browser/reference/consent-management) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Test.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Test.svg)\\
\\
Track variations\\
\\
Send optimization variations from experiments to third-party tools](https://developers.webflow.com/browser/optimize/variations) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/SitePersonalization.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/SitePersonalization.svg)\\
\\
Personalize experiences with custom attributes\\
\\
Set custom attributes based on user behavior and data](https://developers.webflow.com/browser/optimize/attributes)

## Getting started

[1](https://developers.webflow.com/browser/introduction#choose-where-to-add-your-code)

### Choose where to add your code

You can use the Browser API by adding JavaScript in one of two ways:

- **Directly in your site**

Add a script before the closing `</head>` tag using Webflow’s [custom code settings](https://help.webflow.com/hc/en-us/articles/33961357265299-Custom-code-in-head-and-body-tags).

_Best for simple use cases._

- **With Google Tag Manager (or similar)**

Add a script as a [custom tag](https://support.google.com/tagmanager/answer/6107167?hl=en).

_Recommended for advanced tracking or integrations._

[2](https://developers.webflow.com/browser/introduction#wait-for-the-api-to-be-ready)

### Wait for the API to be ready

Wrap your code in [`wf.ready()`](https://developers.webflow.com/browser/reference/wf-ready) to ensure the API has loaded before you call any methods:

```
wf.ready(function() {
  // Your code here
});
```

[3](https://developers.webflow.com/browser/introduction#start-building)

### Start building

Once inside `wf.ready()`, you can call any Browser API methods to manage consent, track variations, or set custom attributes.

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

## FAQs

###### What is the Browser API?

The Browser API is a JavaScript API that allows you to interact with Webflow features directly in the browser. It provides methods to retrieve Optimize variations, set custom attributes, and handle other Webflow features.

###### How do I add the Browser API to my site?

The Browser API is automatically included on all Webflow sites with Analyze and Optimize enabled, and handles loading the necessary code in an optimized way to minimize impact on page performance.

###### How do I use the Browser API?

The Browser API is available through the global `wf` object in your browser. You can access the API by adding a script using [custom code](https://help.webflow.com/hc/en-us/articles/33961357265299-Custom-code-in-head-and-body-tags) on your sites and pages or through external services that load scripts on your site like Google Tag Manager.

The API can be called from any JavaScript code running on your site.

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