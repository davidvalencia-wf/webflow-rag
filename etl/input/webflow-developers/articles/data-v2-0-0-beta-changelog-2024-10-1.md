---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/10/1
title: "Support for bulk authoring, editing, and deleting CMS items | Webflow Developer Documentation"
published: 2025-11-17
---

[October 1, 2024](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/10/1)

## [Support for bulk authoring, editing, and deleting CMS items](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/10/1)

We’ve added bulk CMS item authoring, editing, and deleting, supporting up to 100 items per request. These endpoints can help manage previous rate limit issues and makes managing large content sets more efficient.

### New endpoints

- **[Update Collection Items](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/update-item)**

Update a single item or multiple items in a Collection. This endpoint can update up to 100 items in a request.
- **[Delete Collection Items](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/delete-item)**

Delete Items from a Collection. This endpoint can delete up to 100 items in a request.
- **[Update Live Collection Items](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/live-items/update-items-live)**

Update a single live item or multiple live items in a Collection. This endpoint can update up to 100 items in a request.
- **[Delete Live Collection Items](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/live-items/delete-items-live)**

Remove an item or multiple items from the live site. Deleting published items will un-publish the items from the live site and set them to draft. This endpoint can delete up to 100 items in a request.
- [**Update Localized Component Properties**](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/update-properties)

Update the properties of a component definition in a specified locale.

### Updated endpoints

- **[Create Collection Items](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/create-item)**

Create a single item or multiple items in a Collection. This endpoint can update up to 100 items in a request.

**Note:** This endpoint was previously used to create a single Collection Item for multiple locales. The endpoint can now handle requests for multiple items in multiple locales.

### Updated payloads

- [**Form Submission**](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#form_submission)

Added `schema` and `formElementId` properties to the `Form Submission` webhook payload for better form visibility