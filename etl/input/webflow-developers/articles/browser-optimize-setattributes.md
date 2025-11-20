---
source: webflow-developers
category: general
url: https://developers.webflow.com/browser/optimize/setAttributes
title: "Set attributes | Webflow Developer Documentation"
published: 2025-11-17
---

## `wf.setAttributes(scope, attributes)`

Set custom attributes for the current user or page view.

##### Create a custom attribute in Webflow Optimize

Before setting a custom attribute and sending it to Webflow Optimize, you need to create the attribute in the **Insights > Integrations > Custom JavaScript attributes** section of your site. See [Creating custom attributes in Webflow Optimize](https://developers.webflow.com/browser/optimize/attributes#configuring-custom-attributes) for more information.

### Syntax

```
wf.setAttributes(scope: 'user' | 'pageview', attributes: {[attributeName: string]: attributeValue: string})
```

### Parameters

- **scope**: `'user'` \| `'pageview'` \- The scope of the attributes. You can choose to set attributes for the current user or the current page view.
- **attributes**: `{[attributeName: string]: attributeValue: string}` \- An object containing key-value pairs of attributes to set. The attribute name must be less than 40 characters long and may not contain a “=” character

### Example implementation

```
// Call the wf.ready() function to ensure the script is loaded before setting attributes
wf.ready(function() {
  // Set attributes for the current user
  wf.setAttributes('user', {
    userSegment: 'enterprise'
  })
})
```

### Returns

This method doesn’t return a value to the client. Instead, it sends the attributes to Webflow Optimize, which records in the user or page view data in the dashboard. See more on [using custom attributes](https://developers.webflow.com/browser/optimize/attributes#targeting-visitors-with-custom-attributes) in the Optimize documentation.

### FAQs

###### Can I use boolean and number values for attribute values?

`wf.setAttributes()` attempts to convert values from types like boolean and number into strings for convenience. Don’t rely on this conversion and always pass in string values for attributes.

###### Why am I not seeing my attributes in my audience data?

Be sure to create the attribute in the **Insights > Integrations > Custom JavaScript attributes** section of your site before sending custom attributes to Webflow Optimize. See [Creating custom attributes in Webflow Optimize](https://developers.webflow.com/browser/optimize/attributes#creating-custom-attributes-in-webflow-optimize) for more information.

##### Enterprise sites only

This method is only available on enterprise sites.

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