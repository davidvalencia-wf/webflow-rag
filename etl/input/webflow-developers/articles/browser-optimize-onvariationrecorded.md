---
source: webflow-developers
category: general
url: https://developers.webflow.com/browser/optimize/onVariationRecorded
title: "Recording Variations | Webflow Developer Documentation"
published: 2025-11-17
---

## `wf.onVariationRecorded()`

Registers a callback function that executes whenever a variation runs successfully on your page. This is useful for integrating Webflow Optimize’s experiment data with external analytics services.

Before using this method, make sure you’ve [created and published at least one variation in Webflow.](https://help.webflow.com/hc/en-us/articles/33776880496275-Create-or-edit-optimization-variations)

### Syntax

```
wf.onVariationRecorded(function(result))
```

### Parameters

- **`function(result)`**: _function_ \- A callback function that receives a `result` object containing information about the variation.

The callback function will only trigger for variations that run after it has been registered on the page.

### Example implementation

```
// Call wf.ready() to ensure the Browser API is available
wf.ready(function(){
    // Register the callback function inside wf.ready()
    wf.onVariationRecorded(function(result){
      console.log(result) // Log the result to the console
    })
})
```

### Returns

A success callback which includes the results of the successful variation.

**Object properties**

| Property | Type | Description |
| --- | --- | --- |
| `experienceId` | `string` | Unique identifier for the experience/experiment |
| `experienceName` | `string` | Display name of the experience/experiment |
| `experienceType` | `'ab' | 'rbp' | 'cc'` | Type of experience: A/B Test (`ab`), Rules-Based Personalization (`rbp`), or Content Configuration (`cc`) |
| `variationId` | `string` | Unique identifier for the specific variation |
| `variationName` | `string` | Display name of the variation |
| `ccStatus` | `'holdout' | 'optimized'` | For Content Configuration experiences only: indicates if the user is in the holdout group or receiving optimized content |

### Example

```
{
    "experienceId": "417228929",
    "experienceName": "Hero Optimization",
    "experienceType": "rbp",
    "variationId": "617106113",
    "variationName": "Desktop",
    "ccStatus": "optimized"
}
```

## FAQs

When should you call `onVariationRecorded()`?

To make sure your callback fires, call `onVariationRecorded()` as early as possible to guarantee it’s registered before Webflow returns any recorded variations. Preferably, before the DOM starts rendering. This prevents the callback from missing any variations. To illustrate:

![Timing your script to run after a variation is recorded](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/browser/pages/Optimize/variations/assets/optimize-diagram.png)

We recommend adding the API call in before the closing `</head>` tag of your site or page using Webflow’s [Custom Code](https://help.webflow.com/hc/en-us/articles/33961357265299-Custom-code-in-head-and-body-tags) feature. Or, if using a tool like Google Tag Manager, add the API call when configuring the tag.

###### When is a variation considered recorded?

A variation is considered recorded when the page loads and the variation has been displayed to the user. You can review the full logic that leads up to a recorded variation [in this help article](https://help.webflow.com/hc/en-us/articles/33776880496275-Create-or-edit-variations). A simplified version of the logic is as follows:

- A variation is selected by Webflow Optimize
- That variation is applied to the page
- Events, like the selected variation and integrated analytics, are sent asynchronously
- Webflow Optimize records the variation

###### How often do callbacks fire?

Each time a variation is recorded, the callback fires. You may have multiple variations on a page, so the callback will fire once for each variation.

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