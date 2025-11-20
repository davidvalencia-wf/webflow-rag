---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/1/16
title: "Collection field enhancements | Webflow Developer Documentation"
published: 2025-11-17
---

[January 16, 2025](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/1/16)

## [Collection field enhancements](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/1/16)

## Create reference fields

Create reference fields in a collection using the [create collection field](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-fields/create) endpoint.

To create a reference field, you’ll need to:

- Set the `type` property in the `field` object to either `MultiReference` or `Reference`
- Include the `metadata` property with the `collectionId` of the target collection

```
{
  "displayName": "Authors",
  "type": "Reference",
  "metadata": {
    "collectionId": "580e63fc8c9a982ac9b8b745"
  }
}
```

You can add reference fields in two ways:

- During initial collection creation via the [create collection](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collections/create) endpoint

- To an existing collection using the [create collection field](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-fields/create) endpoint

## Create multiple collection fields during collection creation

Create multiple collection fields during collection creation using the [create collection](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collections/create) endpoint. Collections are limited to 60 fields per collection.