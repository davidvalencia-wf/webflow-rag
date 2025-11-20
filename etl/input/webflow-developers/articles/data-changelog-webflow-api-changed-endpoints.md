---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/webflow-api-changed-endpoints
title: "API v2: Changed endpoints | Webflow Developer Documentation"
published: 2025-11-17
---

[August 25, 2023](https://developers.webflow.com/data/changelog/webflow-api-changed-endpoints)

## [API v2: Changed endpoints](https://developers.webflow.com/data/changelog/webflow-api-changed-endpoints)

As part of the [Webflow Developer Platform updates](https://webflow.com/updates/developer-platform-updates) launched on August 29th, 2023, Webflow released version 2 of the Data API with significant improvements and standardizations. This document provides a comprehensive reference of all endpoint changes between API v1 and v2.

This document is for developers who are migrating from API v1 to v2. For new API v2 implementations, please refer to the [API reference](https://developers.webflow.com/data/reference).

## Token endpoints

- **[Authorization User Info](https://developers.webflow.com/data/reference/token/authorized-by)**

Replaces the `/user` endpoint from v1. Use the `/token/authorized_by` endpoint instead.
- **[Authorization Info](https://developers.webflow.com/data/reference/token/introspect)**

Replaces the `/info` endpoint from v1. Use the `/token/introspect` endpoint instead.

## Sites endpoints

- **[List Sites](https://developers.webflow.com/data/reference/sites/list)** \| `GET``/sites`

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Added | `sites` (object) | Array of site objects |
    | Renamed | `_id` → `id` | Unique identifier for the Site |
    | Added | `workspaceId` | Unique identifier for the Workspace |
    | Renamed | `name` → `displayName` | Name given to Site |
    | Added | `lastUpdated` | Date the Site was last updated |
    | Renamed | `timezone` → `timeZone` | Site timezone set under Site Settings |
    | Deleted | `database` | Database property removed |
- **[Get Site](https://developers.webflow.com/data/reference/sites/get)** \| `GET``/sites/{site_id}`

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `_id` → `id` | Unique identifier for the Site |
    | Added | `workspaceId` | Unique identifier for the Workspace |
    | Renamed | `name` → `displayName` | Name given to Site |
    | Added | `lastUpdated` | Date the Site was last updated |
    | Renamed | `timezone` → `timeZone` | Site timezone set under Site Settings |
    | Added | `customDomains` | Custom domains array |
    | Deleted | `database` | Database property removed |
- **[Publish Site](https://developers.webflow.com/data/reference/sites/publish)** \| `POST``/sites/{site_id}/publish`

  - New properties for the request:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `domains` → `customDomains` | Array of Custom Domain ids to publish |
    | Added | `publishToWebflowSubdomain` | Choice of whether to publish to the default Webflow Subdomain |

## CMS endpoints

- **[List Collections](https://developers.webflow.com/data/reference/cms/collections/list)** \| `GET``/sites/{site_id}/collections`

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Added | `collections` | An array of Collections |
    | Renamed | `_id` → `id` | Unique identifier for a Collection |
- **[Get Collection](https://developers.webflow.com/data/reference/cms/collections/list)** \| `GET``/collections/{collection_id}`

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `_id` → `id` | Unique identifier for a Collection |
    | Renamed | `name` → `displayName` | Name given to the Collection |
    | Changed | `fields` | The list of fields in the Collection |
    | Renamed | `fields._id` → `fields.id` | Unique identifier for a field |
    | Renamed | `fields.editable` → `fields.isEditable` | Flag to denote a field as editable |
    | Renamed | `fields.required` → `fields.isRequired` | Flag to denote a field as required |
    | Renamed | `fields.name` → `fields.displayName` | Name given to the field |
    | Added | `fields.helpText` | Help text for the field |
- **[List CMS Items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items)** \| `GET``/collections/{collection_id}/items`

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `_id` → `id` | Unique identifier for the Item |
    | Renamed | `_archived` → `isArchived` | Boolean determining if the Item is set to archived |
    | Renamed | `_draft` → `isDraft` | Boolean determining if the Item is set to draft |
    | Renamed | `created-on` → `CreatedOn` | The date the item was created |
    | Renamed | `updated-on` → `lastUpdated` | The date the item was last updated |
    | Renamed | `published-on` → `lastPublished` | The date the item was last published |
    | Added | `pagination` | Pagination object containing limit, offset, and total |
    | Deleted | `count` | Number of items returned |
- **[Create CMS Item](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/create-item)** \| `POST``/collections/{collection_id}/items`

  - Deleted query parameters for the request:

    | Change | Query parameter | Description |
    | --- | --- | --- |
    | Deleted | `live` | Boolean indicating if the items should be published/unpublished to/from the live site |

  - New properties for the request:

    | Change | Property | Description |
    | --- | --- | --- |
    | Added | `isArchived` | Boolean determining if the Item is set to archived |
    | Added | `isDraft` | Boolean determining if the Item is set to draft |
    | Added | `fieldData` | Object containing item fields |
    | Added | `fieldData.name` | Name of the Item |
    | Added | `fieldData.slug` | URL structure of the Item in your site |
    | Deleted | `fields` | The fields for the new item |

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `_id` → `id` | Unique identifier for the Item |
    | Renamed | `_archived` → `isArchived` | Boolean determining if the Item is set to archived |
    | Renamed | `_draft` → `isDraft` | Boolean determining if the Item is set to draft |
    | Renamed | `created-on` → `CreatedOn` | The date the item was created |
    | Renamed | `updated-on` → `lastUpdated` | The date the item was last updated |
    | Renamed | `published-on` → `lastPublished` | The date the item was last published |
    | Added | `fieldData` | Object containing item field data |
    | Deleted | `name` | Name given to the Item |
    | Deleted | `slug` | URL structure of the Item in your site |
- **[Get CMS Item](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/get-item)** \| `GET``/collections/{collection_id}/items/{item_id}`

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `_id` → `id` | Unique identifier for the Item |
    | Renamed | `_archived` → `isArchived` | Boolean determining if the Item is set to archived |
    | Renamed | `_draft` → `isDraft` | Boolean determining if the Item is set to draft |
    | Renamed | `created-on` → `CreatedOn` | The date the item was created |
    | Renamed | `updated-on` → `lastUpdated` | The date the item was last updated |
    | Renamed | `published-on` → `lastPublished` | The date the item was last published |
    | Added | `fieldData` | Object containing item field data |
    | Deleted | `items` | List of Items within the collection |
    | Deleted | `count` | Number of items returned |
    | Deleted | `limit` | The limit specified in the request |
    | Deleted | `offset` | The offset specified for pagination |
    | Deleted | `total` | Total number of items in the collection |
- **[Delete CMS Item](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/delete-item)** \| `DELETE``/collections/{collection_id}/items/{item_id}`

  - Deleted query parameter for the request:

    | Change | Query parameter | Description |
    | --- | --- | --- |
    | Deleted | `live` | Boolean indicating if the items should be published/unpublished to/from the live site |
- **[Update CMS Item](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/update-item)**`PATCH``/collections/{collection_id}/items/{item_id}`
  - Deleted query parameter for the request:

    | Change | Query parameter | Description |
    | --- | --- | --- |
    | Deleted | `live` | Boolean indicating if the items should be published/unpublished to/from the live site |

  - New properties for the request:

    | Change | Property | Description |
    | --- | --- | --- |
    | Added | `isArchived` | Boolean determining if the Item is set to archived |
    | Added | `isDraft` | Boolean determining if the Item is set to draft |
    | Added | `fieldData` | Object containing item fields |
    | Deleted | `fields` | Fields in your collection item |

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `_id` → `id` | Unique identifier for the Item |
    | Renamed | `_archived` → `isArchived` | Boolean determining if the Item is set to archived |
    | Renamed | `_draft` → `isDraft` | Boolean determining if the Item is set to draft |
    | Renamed | `created-on` → `CreatedOn` | The date the item was created |
    | Renamed | `updated-on` → `lastUpdated` | The date the item was last updated |
    | Renamed | `published-on` → `lastPublished` | The date the item was last published |
    | Added | `fieldData` | Object containing item field data |
    | Deleted | `_cid` | Unique identifier for the Collection the Item belongs within |
    | Deleted | `name` | Name given to the Item |
    | Deleted | `slug` | URL structure of the Item in your site |

## User accounts endpoints

- **[List Users](https://developers.webflow.com/data/reference/users/users/list)** \| `GET``/sites/{site_id}/users`

This endpoint replaces the `/sites/{site_id}/accessgroups` endpoint.
  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `_id` → `id` | Unique identifier for the User |
    | Renamed | `updatedOn` → `lastUpdated` | The date the item was last updated |
    | Renamed | `emailVerified` → `isEmailVerified` | Shows whether the user has verified their email address |
    | Added | `accessGroups` | User access groups |
- **[Get User](https://developers.webflow.com/data/reference/users/users/get)** \| `GET``/sites/{site_id}/users/{user_id}`

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `_id` → `id` | Unique identifier for the User |
    | Renamed | `updatedOn` → `lastUpdated` | The date the item was last updated |
    | Renamed | `emailVerified` → `isEmailVerified` | Shows whether the user has verified their email address |
- **[Update User](https://developers.webflow.com/data/reference/users/users/update)** \| `PATCH``/sites/{site_id}/users/{user_id}`

  - New properties for the request:

    | Change | Property | Description |
    | --- | --- | --- |
    | Added | `data` | User data object |
    | Added | `data.name` | The name of the user |
    | Added | `data.accept-privacy` | Boolean indicating if the user has accepted the privacy policy |
    | Added | `data.accept-communications` | Boolean indicating if the user has accepted to receive communications |
    | Added | `accessGroups` | An array of access group slugs |

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `_id` → `id` | Unique identifier for the User |
    | Renamed | `updatedOn` → `lastUpdated` | The date the item was last updated |
    | Renamed | `emailVerified` → `isEmailVerified` | Shows whether the user has verified their email address |
- **[Invite User](https://developers.webflow.com/data/reference/users/users/invite)** \| `POST``/sites/{site_id}/users/invite`

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `_id` → `id` | Unique identifier for the User |
    | Renamed | `updatedOn` → `lastUpdated` | The date the item was last updated |
    | Renamed | `emailVerified` → `isEmailVerified` | Shows whether the user has verified their email address |
- **[List Products](https://developers.webflow.com/data/reference/ecommerce/products/list)** \| `GET``/sites/{site_id}/products`

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Added | `pagination` | Pagination object to replace pagination properties |
    | Added | `pagination.limit` | The limit used for pagination |
    | Added | `pagination.offset` | The offset used for pagination |
    | Added | `pagination.total` | The total number of records |
    | Deleted | `count` | Number of items returned |
    | Changed | `items` | List of Item objects within the Collection |
    | Renamed | `items._id` → `items.id` | Unique identifier for the Product |
    | Added | `items.lastPublished` | The date the Product was last published |

## Ecommerce endpoints

### Products

- **[Create Product](https://developers.webflow.com/data/reference/ecommerce/products/create)** \| `POST``/sites/{site_id}/products`

  - New properties for the request:

    | Change | Property | Description |
    | --- | --- | --- |
    | Added (Required) | `product` | The Product object |
    | Added (Required) | `sku` | The SKU object |
    | Added | `publishStatus` | Publish target (enum: `staging`, `live`) |
    | Changed | `product` | Modified Product object structure |
    | Renamed | `product._id` → `product.id` | Unique identifier for the Product |
    | Added | `product.isArchived` | Boolean determining if the Product is set to archived |
    | Added | `product.isDraft` | Boolean determining if the Product is set to draft |
    | Added | `product.fieldData` | Container for product fields |
    | Added | `product.fieldData.name` | Name of the Product |
    | Added | `product.fieldData.slug` | URL structure of the Product in your site |
    | Added | `product.fieldData.sku-properties` | Variant/Options types to include in SKUs |
    | Deleted | `product.fields` | Fields in your product object |
    | Changed | `sku` | Modified SKU object structure |
    | Added (Optional) | `sku._id` | SKU identifier |
    | Added (Optional) | `sku.fields` | SKU fields |
    | Added (Optional) | `sku.name` | SKU name |
    | Added (Optional) | `sku.slug` | SKU slug |
    | Added | `sku.fieldData` | Container for SKU fields |
    | Added | `sku.fieldData.name` | Name of the Product |
    | Added | `sku.fieldData.slug` | URL structure of the Product in your site |
    | Added | `sku.fieldData.price` | Price information |
    | Added | `sku.fieldData.price.value` | Price of SKU |
    | Added | `sku.fieldData.price.unit` | Currency of Item |
    | Added | `sku.fieldData.sku-values` | Dictionary mapping SKU properties to values |
    | Deleted | `sku.fields` | Fields in your SKU object |

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `sku` → `skus` | The SKU object |
    | Changed | `product` | The Product object |
    | Renamed | `product._id` → `product.id` | Unique identifier for the Product |
    | Renamed | `product._archived` → `product.isArchived` | Boolean determining if the Item is set to archived |
    | Renamed | `product._draft` → `product.isDraft` | Boolean determining if the Item is set to draft |
    | Renamed | `product.created-on` → `product.CreatedOn` | The date the item was created |
    | Renamed | `product.updated-on` → `product.lastUpdated` | The date the item was last updated |
    | Renamed | `product.published-on` → `product.lastPublished` | The date the item was last published |
    | Renamed | `product.fields` → `product.fieldData` | Fields in your product object |
    | Deleted | `product.slug` | Slug of Collection in Site URL structure |
    | Deleted | `product.singularName` | The name of one Item in Collection (for example “product” if the Collection is called “Product”) |
- **[Get Product](https://developers.webflow.com/data/reference/ecommerce/products/get)** \| `GET``/sites/{site_id}/products/{product_id}`

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Added | `product` | The Product object |
    | Renamed | `product._id` → `product.id` | Unique identifier for the Product |
    | Renamed | `product._archived` → `product.isArchived` | Boolean determining if the Item is set to archived |
    | Renamed | `product._draft` → `product.isDraft` | Boolean determining if the Item is set to draft |
    | Renamed | `product.created-on` → `product.CreatedOn` | The date the item was created |
    | Renamed | `product.updated-on` → `product.lastUpdated` | The date the item was last updated |
    | Renamed | `product.published-on` → `product.lastPublished` | The date the item was last published |
    | Moved | `sku-properties` | Now a child object of `fieldData` |
    | Added | `skus` | SKUs array |
    | Deleted | `items` | List of SKUs for a Product |
    | Deleted | `count` | Number of items returned |
    | Deleted | `limit` | The limit specified in the request |
    | Deleted | `offset` | The offset specified for pagination |
    | Deleted | `total` | Total number of items in the collection |
- **[Update Product](https://developers.webflow.com/data/reference/ecommerce/products/update)** \| `PATCH``/sites/{site_id}/products/{product_id}`

  - New properties for the request:

    | Change | Property | Description |
    | --- | --- | --- |
    | Added | `product` | The Product object |
    | Added | `publishStatus` | Publish target |
    | Added | `product` | The Product object |
    | Deleted | `fields` | Fields in your collection item |

  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Added | `fieldData` | Field data object |
    | Renamed | `_id` → `id` | Unique identifier for the Product |
    | Renamed | `_archived` → `isArchived` | Boolean determining if the Item is set to archived |
    | Renamed | `_draft` → `isDraft` | Boolean determining if the Item is set to draft |
    | Renamed | `published-on` → `lastPublished` | The date the item was last published |
    | Deleted | `name` | Name given to Collection |
    | Deleted | `slug` | Slug of Collection in Site URL structure |
    | Deleted | `singularName` | The name of one Item in Collection (for example “product” if the Collection is called “Product”) |
    | Deleted | `fields` | Fields in your product object |

### Orders

- **[List Orders](https://developers.webflow.com/data/reference/ecommerce/orders/list)** \| `GET``/sites/{site_id}/orders`

New properties for the response:

| Change | Property | Description |
| --- | --- | --- |
| Added | `items` | List of orders |
| Added | `pagination` | Pagination object |

- **[Get Order](https://developers.webflow.com/data/reference/ecommerce/orders/get)** \| `GET``/sites/{site_id}/orders/{order_id}`

Replaces the `/sites/{site_id}/orders/{order_id}` endpoint.

- **[Update Order](https://developers.webflow.com/data/reference/ecommerce/orders/update)** \| `PATCH``/sites/{site_id}/orders/{order_id}`

Replaces the `/sites/{site_id}/orders/{order_id}` endpoint.

- **[Get Custom Domains](https://developers.webflow.com/data/reference/sites/get-custom-domain)** \| `GET``/sites/{site_id}/custom_domains`

Replaces the `/sites/{site_id}/custom_domains` endpoint.

- **[Fulfill Order](https://developers.webflow.com/data/reference/ecommerce/orders/update-fulfill)** \| `POST``/sites/{site_id}/orders/{order_id}/fulfill`

Replaces the `/sites/{site_id}/orders/{order_id}/fulfill` endpoint.

- **[Unfulfill Order](https://developers.webflow.com/data/reference/ecommerce/orders/update-unfulfill)** \| `POST``/sites/{site_id}/orders/{order_id}/unfulfill`

Replaces the `/sites/{site_id}/orders/{order_id}/unfulfill` endpoint.

- **[Refund Order](https://developers.webflow.com/data/reference/ecommerce/orders/refund)** \| `POST``/sites/{site_id}/orders/{order_id}/refund`

Replaces the `/sites/{site_id}/orders/{order_id}/refund` endpoint.

### Inventory

- **[Get Inventory](https://developers.webflow.com/data/reference/ecommerce/inventory/list)** \| `GET``/collections/{collection_id}/items/{item_id}/inventory`

Replaces the `/collections/{collection_id}/items/{item_id}/inventory` endpoint.

New properties for the response:

| Change | Property | Description |
| --- | --- | --- |
| Renamed | `_id` → `id` | Unique identifier for the Product |

- **[Update Inventory](https://developers.webflow.com/data/reference/ecommerce/inventory/update)** \| `PATCH``/collections/{collection_id}/items/{item_id}/inventory`

Replaces the `/collections/{collection_id}/items/{item_id}/inventory` endpoint.

- **[Update Inventory](https://developers.webflow.com/data/reference/ecommerce/inventory/update)**`PATCH``/collections/{collection_id}/items/{item_id}/inventory`

New properties for the request:

| Change | Property | Description |
| --- | --- | --- |
| Added | `inventoryType` | Type of inventory `finite` or `infinite` |
| Added | `updateQuantity` | Quantity to update |
| Added | `quantity` | Quantity to set |
| Deleted | `fields` | Fields in your inventory object |

New properties for the response:

| Change | Property | Description |
| --- | --- | --- |
| Renamed | `_id` → `id` | Unique identifier for the Product |

### Ecommerce Settings

- **[Get Ecommerce Settings](https://developers.webflow.com/data/reference/ecommerce/settings/get-settings)** \| `GET``/sites/{site_id}/ecommerce/settings`

Replaces the `/sites/{site_id}/ecommerce/settings` endpoint.

New properties for the response:

| Change | Property | Description |
| --- | --- | --- |
| Renamed | `site` → `siteId` | The identifier of the Site |

## Webhooks

- **[Get Webhook](https://developers.webflow.com/data/reference/webhooks/get)** \| `GET``/webhooks/{webhook_id}`

Replaces the `/webhooks/{webhook_id}` endpoint.

New properties for the response:

| Change | Property | Description |
| --- | --- | --- |
| Renamed | `_id` → `id` | The identifier of the Webhook |
| Renamed | `site` → `siteId` | The identifier of the Site |
| Added | `workspaceId` | Identifier of the workspace |
| Deleted | `triggerId` | Trigger ID property removed |
| Renamed | `lastUsed` → `lastTriggered` | Date the Webhook instance was last triggered |
| Added | `url` | URL to send the Webhook payload to |

- **[List Webhooks](https://developers.webflow.com/data/reference/webhooks/list)** \| `GET``/sites/{site_id}/webhooks`

Replaces the `/sites/{site_id}/webhooks` endpoint.

New properties for the response:

| Change | Property | Description |
| --- | --- | --- |
| Added | `webhooks` | All webhooks are in an array in this object |
| Renamed | `webhooks._id` → `webhooks.id` | The identifier of the Webhook |
| Renamed | `webhooks.site` → `webhooks.siteId` | The identifier of the Site |
| Added | `webhooks.workspaceId` | Identifier of the workspace |
| Deleted | `webhooks.triggerId` | Trigger ID property removed |
| Renamed | `webhooks.lastUsed` → `webhooks.lastTriggered` | Date the Webhook instance was last triggered |
| Added | `webhooks.url` | URL to send the Webhook payload to |

- **[Create Webhook](https://developers.webflow.com/data/reference/webhooks/create)** \| `POST``/sites/{site_id}/webhooks`

Replaces the `/sites/{site_id}/webhooks` endpoint.
  - New properties for the request:

    | Change | Property | Description |
    | --- | --- | --- |
    | Added | `triggerType` | Type of webhook trigger |
    | Added | `filter` | Filter for selecting which events you want Webhooks to be sent for. Only available for `form_submission` trigger types. |

    List of `triggerType` values for [Webhook events](https://developers.webflow.com/data/reference/all-events):

    - `form_submission` \- Form submission events
    - `site_publish` \- Site publish events
    - `page_created` \- Page creation events
    - `page_metadata_updated` \- Page metadata update events
    - `page_deleted` \- Page deletion events
    - `ecomm_new_order` \- New order events
    - `ecomm_order_changed` \- Order changed events
    - `ecomm_inventory_changed` \- Inventory changed events
    - `user_account_added` \- User account added events
    - `user_account_updated` \- User account updated events
    - `user_account_deleted` \- User account deleted events

New trigger types:

    - `collection_item_created` \- CMS item creation events
    - `collection_item_changed` \- CMS item update events
    - `collection_item_deleted` \- CMS item deletion events
    - `collection_item_unpublished` \- CMS item unpublish events

Changed trigger types:
    - `memberships_user_account_added` → `user_account_added`
    - `memberships_user_account_updated` → `user_account_updated`
    - `memberships_user_account_deleted` → `user_account_deleted`
  - New properties for the response:

    | Change | Property | Description |
    | --- | --- | --- |
    | Renamed | `_id` → `id` | The identifier of the Webhook |
    | Renamed | `site` → `siteId` | The identifier of the Site |
    | Added | `workspaceId` | Identifier of the workspace |
    | Deleted | `triggerId` | Trigger ID property removed |
    | Renamed | `lastUsed` → `lastTriggered` | Date the Webhook instance was last triggered |
    | Added | `url` | URL to send the Webhook payload to |
    | Added | `filter` | Filter for selecting which events you want Webhooks to be sent for |
- **[Delete Webhook](https://developers.webflow.com/data/reference/webhooks/delete)** \| `DELETE``/webhooks/{webhook_id}`

Replaces the `/webhooks/{webhook_id}` endpoint.

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