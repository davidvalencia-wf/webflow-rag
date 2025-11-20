---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/docs/migrating-to-v2
title: "Migrating to v2 | Webflow Developer Documentation"
published: 2025-11-17
---

##### Webflow API v1 is deprecated.

For more details about this deprecation, timeline, and its implications, please refer to the [Webflow API v1 deprecation notice](https://developers.webflow.com/data/docs/webflow-v1-api-deprecation-notice).

## v2 Apps and APIs

Webflow’s new v2 Apps and APIs enhance security, efficiency, and developer experience. With [scopes](https://developers.webflow.com/data/reference/scopes) and an expanded [resources](https://developers.webflow.com/data/reference/structure-1), both developers and users gain more control and clarity over their Webflow data. Follow the sections below to migrate from v1 Apps, site tokens, webhooks, or APIs.

## Migrating to API v2 for site owners

Did you receive a notification that your site may be using v1 APIs? Read the below section for instructions on how to transition to using v2 APIs by the deprecation date.

###### Migrating to v2 site tokens, webhooks, and v2 Apps

###### Site Tokens

###### Webhooks

###### Apps

**Action Item:** Create a new v2 site token.

- **Site tokens with third-party integrations** \- Reach out to the external integration provider for guidance on how to use the v2 API Site Token with their Webflow integrations
- **Site tokens for custom integrations** \- Replace v1 Site Token with the new v2 Site Token and [update v1 API calls](https://developers.webflow.com/data/changelog/webflow-api-changed-endpoints) to [v2 APIs](https://developers.webflow.com/data/reference/token/authorized-by)

### Third-party integrations

If you’re using v1 site tokens with third-party tools — for example, integrations or chrome extensions that have asked for your API Key — you’ll want to replace them with a new [v2 API site token](https://developers.webflow.com/data/reference/site-token) to persist any critical workflows you have in place. These new tokens are more secure and can be used to call v2 Webflow APIs.

To check for v1 API Site Tokens, go to **Apps & Integrations -> API access** in your site settings. v1 tokens will show a warning about using the legacy API.

![v1 Site Token warning](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/data/pages/Resources/migrating-to-v2/v1-site-token-warning.png)

First, check to see if the token is still needed by seeing if the “Last used” date is recent. If it is, you’ll want to generate a new v2 API token. To persist existing, active workflows, [generate a new v2 API token](https://help.webflow.com/hc/en-us/articles/33961356296723-Intro-to-Webflow-s-APIs) and update your integration to use the new token.

When generating a new API token, you’ll have the option to select the needed [permissions](https://developers.webflow.com/data/reference/scopes) for the token. If you’re not sure which permissions to set, reach out to the integration provider for guidance.

### Third-party tools that don’t support v2 site tokens

If your third-party tool doesn’t accept v2 site tokens, contact their support team for guidance. You can also email [developers@webflow.com](mailto:developers@webflow.com) to let us know which tool you’re using so we can help ensure they add v2 support.

## Custom integrations

If your team built and/or owns a custom integration that uses a v1 site token, in addition to switching to use a v2 API site token, you’ll need to update the requests your integration is making from v1 APIs to v2 APIs.

You can find more information about the changes from v1 to v2 in the [changelog](https://developers.webflow.com/data/changelog/webflow-api-changed-endpoints), and explore the new [v2 API structure and resources in the v2 API reference docs](https://developers.webflow.com/data/reference/structure-1).

For more details on site tokens and how to use them for calling Webflow APIs, see the [site token guide](https://developers.webflow.com/data/reference/site-token).

## Migrating to API v2 for App developers

Are you a developer using v1 APIs and need guidance on implementing v2 APIs for a new v2 App? Read this section below.

###### Building v2 Apps

We know migrating APIs can be challenging, but we’re excited to help you upgrade to v2. The new version brings powerful capabilities that will let you build even better experiences for your users. Let’s walk through how to migrate your existing v1 App:

[1](https://developers.webflow.com/data/docs/migrating-to-v2#register-a-new-v2-app)

### Register a new v2 App

To use the v2 API, you’ll need to create a brand new App with a new Client ID and secret. Additionally, you’ll need to add permissions to your App to align with the [v2 API scopes](https://developers.webflow.com/data/reference/scopes). Please use this [App registraton guide to help create a new v2 App.](https://developers.webflow.com/data/docs/register-an-app)

[2](https://developers.webflow.com/data/docs/migrating-to-v2#update-your-apps-oauth-flow)

### Update your App’s OAuth flow

Update your App’s [OAuth flow](https://developers.webflow.com/data/reference/oauth-app) to use your new client ID and secret. Additionally, you will need to use the new [v2 API scopes](https://developers.webflow.com/data/reference/scopes) in your App’s Authorization URI. For a full guide on how to update your App’s OAuth flow, see the [OAuth flow guide](https://developers.webflow.com/data/reference/oauth-app).

[3](https://developers.webflow.com/data/docs/migrating-to-v2#update-your-app-to-use-v2-apis)

### Update your App to use v2 APIs

Update the logic in your App to make requests to the new [v2 resources and endpoints.](https://developers.webflow.com/data/reference/structure-1) Additionally, you can use the updated [JavaScript or Python SDKs](https://developers.webflow.com/data/reference/sdks) to make requests to the new v2 APIs.

[4](https://developers.webflow.com/data/docs/migrating-to-v2#submit-your-v2-app-to-the-marketplace)

### Submit your v2 App to the Marketplace

Once you’ve updated your App to use scopes and v2 endpoints, you can share these updates by [submitting your new App to the Marketplace](https://developers.webflow.com/submit). Before submitting your App, please refer to Webflow’s [guidance on Marketplace submissions and listings](https://developers.webflow.com/apps/docs/marketplace-guidelines) to make sure your App is compliant with Webflow’s guidelines.

##### Avoiding disruption

To avoid disrupting any existing workflows for users on the v1 App version, you’ll want to support both v1 and v2 Apps in production until you’ve migrated all users to the v2 App.

[5](https://developers.webflow.com/data/docs/migrating-to-v2#instruct-users-to-migrate-to-your-v2-app)

### Instruct users to migrate to your v2 App

Webflow won’t automatically migrate or notify users of your new v2 App. Instead, **users must create a new authorization for the v2 App**. It’s recommended that you reach out to existing v1 App users with migration instructions on how to safely migrate their existing workflows to your approved, v2 Marketplace App. This could include:

- Notifications in your v1 App that tell users about the upcoming deprecation and the need to migrate to the v2 App
- A link to your new v2 App Authorization page and/or a link to your v2 App in the Webflow App Marketplace
- A migration tool in your v1 App that automatically replaces existing v1 integrations with v2 integrations
- A blog post or migration guide on how to migrate from v1 to v2

## v2 Apps and API changes

- **v1 Apps are now named ‘Data Clients’**

The v2 equivalent of v1 Apps are named [‘Data Clients’](https://developers.webflow.com/data/docs/data-clients). This is a change from the previous naming convention of ‘Apps’. Here’s a quick rundown of what that means:
  - Data Clients access site data, spanning from the [CMS](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/get-item) to [Ecommerce](https://developers.webflow.com/data/reference/ecommerce/settings/get-settings), as well as new resources like [assets](https://developers.webflow.com/data/reference/assets/assets/list), [pages](https://developers.webflow.com/data/reference/pages/list), and [custom code](https://developers.webflow.com/data/reference/custom-code). For an overview of the v2 API resources, see the [v2 API reference docs](https://developers.webflow.com/data/reference/structure-1).
  - Data Clients leverage Webflow’s REST APIs to fetch this information.
  - For use cases that require real-time updates, Data Clients can send event notifications through [webhooks.](https://developers.webflow.com/data/reference/webhooks/list)
- **Data API changes**

The v2 API includes significant changes to Webflow’s REST APIs, including updates, additions, and removals to key endpoints. For a thorough overview of what’s changed, visit the changelog of:

  - [Changed Endpoints](https://developers.webflow.com/data/changelog/webflow-api-changed-endpoints)
  - [New Endpoints](https://developers.webflow.com/data/changelog/webflow-api-new-endpoints)
  - [Removed Endpoints](https://developers.webflow.com/data/changelog/webflow-api-removed-endpoints)

To explore the current v2 API offerings, check out the [reference docs](https://developers.webflow.com/data/reference/token/authorized-by).

- **Introduction of scopes**

The new version of the API incorporates [scopes](https://developers.webflow.com/data/reference/scopes) into the authorization process. Scopes specify an App’s permissions, ensuring that users have clearer control over the data an App can access and act upon. It’s a step towards more transparency and security. For a granular approach to permissions, make sure you’re aligned with [Webflow’s guidance on scopes.](https://developers.webflow.com/data/reference/scopes)

- **Updates to the JavaScript SDK**

We’re currently revamping the JavaScript SDK to provide robust support for the v2 APIs. In the meantime, if you’re using the [JavaScript SDK](https://github.com/webflow/js-webflow-api), please:

  - Update to the most recent SDK version.
  - Use TypeScript/Intellisense in your code editor to guide API usage after instantiating a client. You may also find SDK snippets in the API reference docs examples. Here’s a brief example on usage:

JavaScript

```
   import { WebflowClient } from "webflow-api";

   const webflow = new WebflowClient({ accessToken });

   // Env. variables
   // in format of string, e.g.: "639656400769508adc12fe42"
   const siteId = process.env.SITE_ID;
   const customDomainId1 = process.env.CUSTOM_DOMAIN_ID_1;
   const customDomainId2 = process.env.CUSTOM_DOMAIN_ID_2;

   // Sites

   // List Sites
   const sites = await webflow.sites.list();

   // Get Site
   const site = await webflow.sites.get(siteId);

   // Get Custom Domains
   const customDomains = await webflow.sites.getCustomDomain(siteId);

   // Publish Site
   const site = await webflow.sites.publish(siteId, {
      customDomains: [customDomainId1, customDomainId2],
      publishToWebflowSubdomain: true,
   });
```

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