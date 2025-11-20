---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/create-items
title: "Create Localized Collection Item(s) | Webflow Developer Documentation"
published: 2025-11-17
---

Create an item or multiple items in a CMS Collection across multiple corresponding locales.

**Notes:**

- This endpoint can create up to 100 items in a request.
- If the `cmsLocaleIds` parameter is undefined or empty and localization is enabled, items will only be created in the primary locale.

Required scope \| `CMS:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

collection\_idstringRequired`format: "objectid"`

Unique identifier for a Collection

### Request

Details of the item to create

cmsLocaleIdslist of stringsOptional

Array of identifiers for the locales where the item will be created

isArchivedbooleanOptionalDefaults to `false`

Indicates whether the item is archived.

isDraftbooleanOptionalDefaults to `true`

Indicates whether the item is in draft state.

fieldDataobject or list of objectsOptional

Show 2 variants

### Response

Request was successful

idstring

Unique identifier for the Item

cmsLocaleIdslist of strings or null

Array of identifiers for the locales where the item will be created

lastPublishedstring or null`format: "date-string"`

The date the item was last published

lastUpdatedstring or null`format: "date-string"`

The date the item was last updated

createdOnstring or null`format: "date-string"`

The date the item was created

isArchivedboolean or nullDefaults to `false`

Boolean determining if the Item is set to archived

isDraftboolean or nullDefaults to `true`

Boolean determining if the Item is set to draft

fieldDataobject or null

Show 2 properties

### Errors

400

Bad Request Error

401

Unauthorized Error

404

Not Found Error

429

Too Many Requests Error

500

Internal Server Error