---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/06232025
title: "Breaking changes for CMS publishing | Webflow Developer Documentation"
published: 2025-11-17
---

[June 23, 2025](https://developers.webflow.com/data/changelog/06232025)

## [Breaking changes for CMS publishing](https://developers.webflow.com/data/changelog/06232025)

**On July 7, 2025, we’re releasing important updates to how CMS items are published and managed via the API.** These changes affect how you manage live items and publish CMS content with the API. Please review the breaking changes below to avoid disruptions.

## Draft management improvements

The Webflow UI now supports saving draft changes to published CMS items without affecting live content. To maintain consistency between the UI and API, we’re introducing the following change:

### Unpublishing live items Breaking Change

Previously, updating a live item’s `isDraft` property to `true` would unpublish a live item from the site. This behavior is changing to support improved draft management:

- Updating an item’s `isDraft` property to `true` on a live item will no longer unpublish it
- The item will remain live while draft updates can be made using the [staged item endpoints.](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/update-items)
- **Required Action:** Update your code to use the dedicated unpublish endpoints: [Unpublish Single Item](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/delete-item-live) or [Unpublish Multiple Items](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/delete-items-live)

**Affected endpoints:**

If you’re using the following endpoints to unpublish live items, you’ll need to update your code to use the dedicated unpublish endpoints instead:

- [Update Single Live Item](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/update-item-live)
- [Update Multiple Live Items](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/update-items-live)

### Understanding item status

![Item status in Webflow](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/assets/images/cms-publishing.png)

In the Webflow UI, CMS items have a status field that maps to the item’s `isDraft` and `lastPublished` properties. Here’s how these properties determine an item’s status:

| Status | `isDraft` | `lastPublished` | Description |
| --- | --- | --- | --- |
| Draft | `true` | `null` | Never published or previously unpublished item |
| Published | `false` | timestamp | Item is live on the site |
| Changes in draft | `true` | timestamp | Published item with pending changes in the staged item |
| Queued to publish | `false` | < `lastUpdated` | Changes will publish on next site publish. This is the default status for newly created items, as well as for updates to items that have already been published. |

**Note:** The [Unpublish Live Item](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/delete-items-live) endpoint sets `isDraft: true` and `lastPublished: null`.

## Enhanced publishing flexibility 🎉

You can now publish CMS items with the API even when site domains are out of sync. For example, if you’ve published to staging but not to production. This removes the previous limitation that caused `409` errors in these scenarios. No changes needed here - instead, we expect that you’ll see less errors!

Affected endpoints:

- [Publish Collection Items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/publish-item)

* * *

## Required actions

1. **Review Integrations**
   - Identify code using `isDraft: true` for unpublishing
   - Test with [beta APIs](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/publish-item) in development environment
2. **Update Code**
   - Replace `isDraft` unpublishing with proper endpoints
   - Test and verify changes in your development environment

### Test changes with the Beta APIs

All functionality described above is available now through the **Beta APIs** under the `/beta` namespace. To test, replace `/v2` with `/beta` in your API calls within a testing environment to see the new behavior in action. Unfortunately, the Webflow SDK doesn’t support the beta namespace at this time.

## Timeline

1. **Now - July 7, 2025**: Testing period
   - Test your integrations using the [beta API endpoints](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/publish-item)
   - Update code to use proper [unpublish endpoints](https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-items-live)
2. **July 7, 2025**: Changes go live
   - Breaking changes take effect in v2

For questions or more information, please see our [post in the Webflow Forum](https://discourse.webflow.com/t/data-api-important-changes-to-cms-publishing/323909)

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