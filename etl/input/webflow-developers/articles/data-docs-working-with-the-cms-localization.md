---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/docs/working-with-the-cms/localization
title: "Localization with the CMS API | Webflow Developer Documentation"
published: 2025-11-17
---

Webflow localization provides an end-to-end solution for adapting your site for a global audience. The API gives you programmatic control over localizing both dynamic **CMS Content** and **Static Page Content**.

- **CMS content localization** enables you to create variants of a single CMS item for each locale.
- **Static content localization** uses the [Pages API](https://developers.webflow.com/data/reference/pages-and-components/pages/list) to update DOM elements and localize SEO metadata. Learn more about [localizing pages →](https://developers.webflow.com/data/docs/working-with-localization/localize-pages).

This guide covers the core concepts of **CMS localization**.

## Key concepts

Understanding a few key concepts is essential for working with localization via the API. At its core, a single CMS item becomes a group of item variants when you add locales.

![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Localization.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Localization.svg)

Item ID

When you create an item in multiple locales, all variants are linked by a shared `itemId`, which represents the entire item group.

![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CMS.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CMS.svg)

CMS Locale ID

The `cmsLocaleId` is a unique locale identifier when working with CMS resources. Always include it when creating, updating, and retrieving localized CMS items.

### Getting locale identifiers

To get the `localeId` and `cmsLocaleId` for your site’s configured locales, use the [Get Site](https://developers.webflow.com/data/reference/sites/get) endpoint. The response will include a `locales` object containing the primary locale and any secondary locales. Before using these endpoints, you must first **enable localization** in the Site settings within the Designer.

response.json

```
{
  "locales": {
    "primary": {
      "id": "653fd9af6a07fc9cfd7a5e57",
      "cmsLocaleId": "653ad57de882f528b32e810e",
      "enabled": false,
      "displayName": "English (United States)",
      "displayImageId": null,
      "redirect": true,
      "subdirectory": "",
      "tag": "en-US"
    },
    "secondary": [\
      {\
        "id": "653fd9af6a07fc9cfd7a5e56",\
        "cmsLocaleId": "653fd9af6a07fc9cfd7a5e5d",\
        "enabled": true,\
        "displayName": "French (France)",\
        "displayImageId": null,\
        "subdirectory": "fr-fr",\
        "tag": "fr-FR"\
      },\
      {\
        "id": "654112a3a525b2739d97664c",\
        "cmsLocaleId": "654112a3a525b2739d97664f",\
        "enabled": true,\
        "displayName": "Spanish (Mexico)",\
        "displayImageId": null,\
        "subdirectory": "es-mx",\
        "tag": "es-MX"\
      }\
    ]
  }
}
```

## Managing localized content

You can create and update localized CMS items via the API, as well as independently publish items in each locale.

### Creating localized items

Creating a new localized item is a two-step process:

1. **Create items across all locales**

Call the [`Create Items`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/staged-items/create-items) endpoint with an array of `cmsLocaleIds` for every locale you want to target. Provide a single `fieldData` object containing the content for the primary locale. The API creates a unique item variant for each specified locale, all linked by a shared `itemId` and populated with the initial content.

createItemRequest.tscreateItemResponse.json

```
import { WebflowClient } from "webflow-api";

const webflow = new WebflowClient({
     accessToken: "YOUR_ACCESS_TOKEN",
});

const newItemVariants = await webflow.collections.items.createItems("COLLECTION_ID", {
       cmsLocaleIds: ["CMS_LOCALE_ID_1", "CMS_LOCALE_ID_2"],
       fieldData: {
           name: "The Hitchhiker's Guide to the Galaxy",
           slug: "the-hitchhikers-guide-to-the-galaxy",
           description: "Don't Panic!",
       },
})

console.log(newItemVariants);
```

2. **Update each variant with translated content**

After creating the locale-specific variants, make a request to the [`Update Item`](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/staged-items/update-item) endpoint. In the request, pass the shared `itemId`, the specific `cmsLocaleId` for the variants you are updating, and its unique, translated `fieldData`.

updateItemRequest.tsupdateItemResponse.json

```
import { WebflowClient } from "webflow-api";

const webflow = new WebflowClient({
     accessToken: "YOUR_ACCESS_TOKEN",
});

const updateItems = await webflow.collections.items.updateItems(
     "COLLECTION_ID",
     {
       items: [\
         {\
           id: "ITEM_ID",\
           cmsLocaleId: "CMS_LOCALE_ID-FRENCH",\
           fieldData: {\
             name: "Le Guide du voyageur galactique",\
             slug: "le-guide-du-voyageur-galactique",\
             description: "Pas de panique !",\
           },\
         },\
         {\
           id: "ITEM_ID",\
           cmsLocaleId: "CMS_LOCALE_ID-SPANISH",\
           fieldData: {\
             name: "Guía del autoestopista galáctico",\
             slug: "guia-del-autoestopista-galactico",\
             description: "¡Que no cunda el pánico!",\
           },\
         },\
       ],
     }
);

console.log(updateItems);
```

##### Adding secondary locales to existing items is not supported via the API

For any Collection items that **already exist**, you must add the desired secondary locales in the CMS panel within the Designer. **You can’t add a new locale to an existing item via the API.**

### Retrieving localized items

To get localized items, use the [List Items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items) endpoint and pass the desired `cmsLocaleId` as a query parameter. If you omit the `cmsLocaleId`, the API will return items from the primary locale.

getLocalizedItems.ts

```
import { WebflowClient } from "webflow-api";

const webflow = new WebflowClient({
  accessToken: "YOUR_ACCESS_TOKEN",
});

const localizedItems = await webflow.collections.items.listItems("COLLECTION_ID", {
  cmsLocaleId: "CMS_LOCALE_ID,CMS_LOCALE_ID_2" // To pass multiple locales, separate the IDs with a comma within a single string
});

console.log(localizedItems);
```

### Locale-specific publishing

Each locale maintains its own independent publishing state. This means you can have a version of an item live in your primary locale while the version for a secondary locale is still in a draft state. Publishing changes in one locale doesn’t affect the status of that item in any other locale. [See the publishing guide for more details →](https://developers.webflow.com/data/docs/working-with-the-cms/publishing).

## Next steps

To ensure your site is completely localized, follow the guides for localizing pages and components.

[Localize pages\\
\\
Learn how to localize a site with the Pages and CMS APIs.](https://developers.webflow.com/data/docs/working-with-localization/localize-pages) [Localize components\\
\\
Review the CMS API endpoints for localization operations.](https://developers.webflow.com/data/docs/working-with-localization/localize-components)

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