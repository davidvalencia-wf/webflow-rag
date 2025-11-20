---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/docs/working-with-the-cms/publishing
title: "Publishing with the CMS API | Webflow Developer Documentation"
published: 2025-11-17
---

The CMS API uses a staging system that separates draft from published content. This workflow gives you control over what goes live and when, ensuring content quality before publication.

All CMS content exists in one of two states:

Staged

Draft content that can be previewed but isn’t visible on the live site. Use this state to prepare and review changes.

Live

Content that’s published and visible on your site. A live item can have a staged version for updates that don’t affect the original.

Each CMS Item has `isDraft` and `lastPublished` properties that indicate its current state. The combination of these properties determines an item’s status, which is reflected in the Webflow UI.

| Status | Description | `lastPublished` | `isDraft` |
| --- | --- | --- | --- |
| Published | Content is live and visible on your website. | `exists` | `false` |
| Draft changes | Live content with unpublished draft changes. | `exists` | `true` |
| Draft | Content is in a draft state and has never been published. | `null` | `true` |
| Queued to publish | Content will be published on the next site-wide publish. | `null` | `false` |
| Scheduled | Content is scheduled for future publication. This can not be controlled by the CMS API. | N/A | N/A |
| Archived | Content has been archived and removed from the live site. Use the `isArchived` flag to archive items. | N/A | N/A |

This mapping helps you understand how API operations affect the content status displayed in the Webflow interface.

## Publishing workflows

The CMS API provides flexible publishing options to fit your workflow. Use the accordions below to learn more about each publishing method and see which endpoints to use.

###### Individual item publishing

Publish, unpublish, or stage a single item without affecting other content. This gives you granular control for targeted updates, such as publishing a single blog post or making a small correction to an existing page.

**Associated endpoints:**

POST/collections/:collection\_id/items/publish

```
curl https://api.webflow.com/collections/:collection_id/items/publish \
 -H "Authorization: Bearer <token>"
```

[Try it](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/publish-item)

DELETE/collections/:collection\_id/items/live

```
curl https://api.webflow.com/collections/:collection_id/items/live \
 -H "Authorization: Bearer <token>"
```

[Try it](https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-items-live)

publishSingleItem.ts

```
import { WebflowClient } from "webflow-api";

const webflow = new WebflowClient({
  accessToken: "YOUR_ACCESS_TOKEN",
});

const item = await webflow.collections.items.publishItem("COLLECTION_ID", {
  itemIds: ["ITEM_ID"],
});

console.log(item);
```

###### Site-wide publishing

Publish all staged content across your entire site in a single operation. This is ideal for coordinated releases, such as a new marketing campaign, a product launch, or a site redesign where multiple content changes need to go live simultaneously.

POST/sites/:site\_id/publish

```
curl https://api.webflow.com/sites/:site_id/publish \
 -H "Authorization: Bearer <token>"
```

Try it

publishSite.ts

```
import { WebflowClient } from "webflow-api";

const webflow = new WebflowClient({
  accessToken: "YOUR_ACCESS_TOKEN",
});

const site = await webflow.sites.publish("SITE_ID", {
  customDomains: ["CUSTOM_DOMAIN_ID_1", "CUSTOM_DOMAIN_ID_2"],
  publishToWebflowSubdomain: true,
});

console.log(site);
```

###### Draft changes on a live item

When a live item’s `isDraft` property is set to `true`, it remains published on your site. This allows you to safely update the item in a draft state without changing what’s visible to your site visitors. The changes will only go live when the item’s `isDraft` property is set to `false` and the item is published again.

PATCH/collections/:collection\_id/items

```
curl https://api.webflow.com/collections/:collection_id/items \
 -H "Authorization: Bearer <token>"
```

Try it

updateLiveItem.ts

```
import { WebflowClient } from "webflow-api";

const webflow = new WebflowClient({
  accessToken: "YOUR_ACCESS_TOKEN",
});

const item = await webflow.collections.items.updateItem("COLLECTION_ID", "ITEM_ID", {
  isDraft: true, // Set to true to update the live item in a draft state
  fieldData: {
    name: "Heart of Gold",
    slug: "heart-of-gold",
    description: "The Heart of Gold is a ship that is used to travel through space using the infinite improbability drive.",
    pilots: ["Trisha McMillan", "Zaphod Beeblebrox"],
  },
});

console.log(item);
```

###### Update a live item directly

To update an item and publish the changes to your live site in a single action, use the `updateItemLive` endpoint. This is useful for making quick corrections or immediate updates without a review stage.

PATCH/collections/:collection\_id/items/live

```
curl https://api.webflow.com/collections/:collection_id/items/live \
 -H "Authorization: Bearer <token>"
```

Try it

updateLiveItemDirectly.ts

```
import { WebflowClient } from "webflow-api";

const webflow = new WebflowClient({
  accessToken: "YOUR_ACCESS_TOKEN",
});

const item = await webflow.collections.items.updateItemLive(
  "COLLECTION_ID",
  "ITEM_ID",
  {
    fieldData: {
      name: "Heart of Gold",
      slug: "heart-of-gold",
      description: "The Heart of Gold is a ship that is used to travel through space using the infinite improbability drive.",
      pilots: ["Trisha McMillan", "Zaphod Beeblebrox"],
    }
  }
);

console.log(item);
```

###### Unpublish an item

To remove an item from the live site, you must explicitly call the `unpublishItem` endpoint. This action doesn’t delete the item from the CMS; it unpublishes it and sets its `isDraft` property to `true`, allowing you to continue editing it.

DELETE/collections/:collection\_id/items/live

```
curl https://api.webflow.com/collections/:collection_id/items/live \
 -H "Authorization: Bearer <token>"
```

Try it

unpublishItem.ts

```
import { WebflowClient } from "webflow-api";

const webflow = new WebflowClient({
  accessToken: "YOUR_ACCESS_TOKEN",
});

// Note: This does not delete the item, it just unpublishes it.
const item = await webflow.collections.items.deleteItemLive(
  "COLLECTION_ID",
  "ITEM_ID"
);

console.log(item);
```

###### Archiving content

Archiving unpublishes items from your live site at the next full-site publish, but keeps the items accessible in the CMS. To archive an item, set the `isArchived` property on the item to `true`.

PATCH/collections/:collection\_id/items

```
curl https://api.webflow.com/collections/:collection_id/items \
 -H "Authorization: Bearer <token>"
```

Try it

PATCH/collections/:collection\_id/items/live

```
curl https://api.webflow.com/collections/:collection_id/items/live \
 -H "Authorization: Bearer <token>"
```

Try it

archiveItem.ts

```
import { WebflowClient } from "webflow-api";

const webflow = new WebflowClient({
  accessToken: "YOUR_ACCESS_TOKEN",
});

const item = await webflow.collections.items.updateItem("COLLECTION_ID", "ITEM_ID", {
  isArchived: true, // Set to true to archive the item
  fieldData: {
    name: "Heart of Gold",
    slug: "heart-of-gold",
    description: "The Heart of Gold is a ship that is used to travel through space using the infinite improbability drive.",
    pilots: ["Trisha McMillan", "Zaphod Beeblebrox"],
  },
});

console.log(item);
```

## Next steps

Now that you understand the publishing workflows, here are a few topics you might want to explore next:

[Content Delivery\\
\\
Deliver your published content to your live application.](https://developers.webflow.com/data/docs/working-with-the-cms/content-delivery) [Webhooks\\
\\
Trigger automated workflows when content is published or unpublished.](https://developers.webflow.com/data/reference/webhooks/events/collection-item-created)

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