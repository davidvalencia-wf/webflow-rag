---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/2/22
title: "Manage live CMS items | Webflow Developer Documentation"
published: 2025-11-17
---

[February 22, 2024](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/2/22)

## [Manage live CMS items](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/2/22)

We’ve enhanced the V2 Beta Data API with new endpoints that enable you to directly manage live CMS items. These additions provide important feature parity with API v1, enabling you to create, update, and delete items in the live collection database without requiring a staged workflow.

The new endpoints give developers direct access to the live item database, which is especially useful for:

- Content that doesn’t require editorial review
- Real-time data updates from external systems
- Automated content workflows that need immediate publishing

### New endpoints

- **[Create Collection Item (Live)](https://developers.webflow.com/v2.0.0-beta/reference/cms/collection-items/live-items/create-item-live)**

Create and publish a new CMS item directly to the live database, bypassing the staged item workflow.

```
POST /collections/{collection_id}/items/live
```

- **[Update Collection Item (Live)](https://developers.webflow.com/v2.0.0-beta/reference/cms/collection-items/live-items/update-item-live)**

Modify an existing live CMS item’s fields without affecting the staged version.

```
PATCH /collections/{collection_id}/items/{item_id}/live
```

- **[Delete Collection Item (Live)](https://developers.webflow.com/v2.0.0-beta/reference/cms/collection-items/live-items/delete-item-live)**

Remove an item from the live collection database.

```
DELETE /collections/{collection_id}/items/{item_id}/live
```

Changes made through these endpoints affect only the live database and won’t be reflected in the staged version of items. For content requiring approval workflows, continue using the staged item endpoints and the publish operation.