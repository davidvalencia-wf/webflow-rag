---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/rest-introduction
title: "Introduction | Webflow Developer Documentation"
published: 2025-11-17
---

The Webflow Data API provides an extensive set of RESTful endpoints to help you create advanced tools and applications for Webflow users. This documentation is your guide to building successful integrations.

## Make your first API call

To get started, click the “Try it” button on the Get Sites endpoint to make your first API call. Clicking it will open an interactive API explorer where you can authenticate and send a live request to see a list of your sites.

Once you authenticate, you can navigate to other endpoints to see the different resources and actions you can perform.

GET/v2/sites

```
curl https://api.webflow.com/v2/sites \
 -H "Authorization: Bearer <token>"
```

[Try it](https://developers.webflow.com/data/reference/sites/list?explorer=true)

## Core concepts

Get familiar with the core concepts of the Webflow Data API.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/SecurityCertified.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/SecurityCertified.svg)\\
\\
Authentication\\
\\
Learn how to authenticate your requests to the Webflow Data API.](https://developers.webflow.com/data/reference/authentication) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/TimeTurner.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/TimeTurner.svg)\\
\\
Rate Limiting\\
\\
Understand the rate limits for the Webflow Data API.](https://developers.webflow.com/data/reference/rate-limits) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/BranchMerge.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/BranchMerge.svg)\\
\\
Versioning\\
\\
Learn how to work with API versions.](https://developers.webflow.com/data/reference/versioning) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Support.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Support.svg)\\
\\
Error Handling\\
\\
Understand how to handle errors returned by the API.](https://developers.webflow.com/data/reference/error-handling)

## API structure

Webflow’s API follows a resource model, providing a clear hierarchy for accessing and manipulating data. The diagram below illustrates the main resources and their relationships. Lear more about the response objects for each resource in the [API structure](https://developers.webflow.com/data/reference/structure-1) documentation.

API Diagram Preview

### Authorization

Allows Webflow users to Authorize your App to make requests to the API on their behalf.

### Sites

Retrieve information about sites. Publish sites to their domains.

### Pages

Retrieve page information and content, and make updates to pages.

### Custom Code

Add and maintain custom JavaScript on a Site or Page.

### Assets

Add assets to a site, or get a list of all existing assets.

### Dynamic Content

APIs that allow you to manage the different kinds of dynamic site content available in Webflow.

### Forms

Connect native Webflow forms to external data sources.

### Webhooks

Receive notifications of changes to site-related resources.

### Token

Get information about the current authorization instance.

### CMS

Manage Webflow collections and items.

### User Accounts

Manage users and their access to content on a site

### Ecommerce

Manage ecommerce data such as products, SKUs, inventory and order information.

### Collections & Fields

Create and manage collections and their field schemas to define content structure.

### Items

Create and manage collection item details.

### Users

Create and manage users on a site

### Access Groups

List available Access Groups for users

### eCommerce Settings

List eCommerce settings to find currency data.

### Products & SKUs

Create and manage eCommerce products.

### Orders

Manage Orders and eCommerce operations.

### Inventory

Manage eCommerce item inventory.

## Next steps

Now that you’ve made your first API call, you’re ready to dive deeper.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Docs.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Docs.svg)\\
\\
Developer Guides\\
\\
Follow our guides to build common integrations and workflows.](https://developers.webflow.com/data/docs/data-clients) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Code.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Code.svg)\\
\\
SDKs\\
\\
Explore our official SDKs to accelerate your development.](https://developers.webflow.com/data/reference/sdks)

##### Need to work directly in the Designer?

If you’re looking to build apps that create and enhance designs within
Webflow, the [Designer APIs](https://developers.webflow.com/designer/reference/introduction) are the right
tools for the job. These APIs enable you to add and modify elements, styles,
assets, and more on your design canvas.

[Explore the Designer APIs](https://developers.webflow.com/designer/reference/introduction)

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