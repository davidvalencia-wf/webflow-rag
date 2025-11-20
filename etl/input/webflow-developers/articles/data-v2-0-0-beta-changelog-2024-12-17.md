---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/12/17
title: "Updated publishing behavior for collection items | Webflow Developer Documentation"
published: 2025-11-17
---

[December 17, 2024](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/12/17)

## [Updated publishing behavior for collection items](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/12/17)

Starting December 2024, Webflow is introducing an improved publishing workflow for collection items. When a live item’s `isDraft` property is set to `true`, the item will continue to remain published on the live site even after a full site publish. This allows users to make updates to the collection item in a draft state without changing what’s visible on the live site.

To remove an item from the live site, you must now explicitly call the [unpublish endpoint](https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-item-live). This change gives developers more precise control over the publishing state of individual items. Please see the [“publishing items” section of the CMS guide](https://developers.webflow.com/data/docs/working-with-the-cms#5-publishing-items) for more details.

- **[Create CMS Item](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/create-item)**

The default behavior of the `createItem` API is now to create a draft item. All new items will be created with the `isDraft` flag set to `true`.

- **[Publish CMS Item](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/publish-item)**

Due to changes in how publishing is handled, sites with multiple domains are no longer required to have their domains in sync when publishing a single CMS Item. Previously, users would receive a `409` error when attempting to publish a CMS item while the domains weren’t in sync. Users will no longer receive a `409` error when attempting to publish a CMS item.

## Page and component content updates

We’ve updated the request body structure for updating content:

- **[Update page content](https://developers.webflow.com/data/reference/pages-and-components/pages/update-static-content)**

To update a nested Component Instance within a Component, use the `propertyOverrides` property instead of using the `properties` property.

- **[Update component content](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/update-content)**

To update a nested Component Instance within a Component, use the `propertyOverrides` property instead of using the `properties` property.