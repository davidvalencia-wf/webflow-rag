---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items
title: "Managing CMS Collections and Items | Webflow Developer Documentation"
published: 2025-11-17
---

This page covers how to programmatically manage your Webflow CMS content. You’ll learn how to:

1. Create a collection and define its schema.
2. Populate the collection with content and perform CRUD operations on those items.
3. Publish a collection and its items.

##### Generate schemas and content with AI

Use the [MCP Server](https://developers.webflow.com/data/docs/ai-tools) to create a Collection and its Items from a single natural language prompt. Go from a simple description to a fully populated Collection in seconds.

* * *

## 1\. Creating a collection

The first step in managing your content is to create a collection, which serves as a blueprint for your items. This process involves getting your `site_id`, defining a schema, and then creating the collection via the API. To learn more about collections, see the [Collections Reference](https://developers.webflow.com/data/reference/cms/collections).

[1](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#get-your-site-id)

### Get your site ID

Every collection is associated with a specific Webflow site. You’ll need your `site_id` to create a collection. You can find this by calling the [List Sites](https://developers.webflow.com/data/reference/sites/list) endpoint and locating the site you want to work with in the response.

GET

/v2/sites

cURL

```
curl https://api.webflow.com/v2/sites \
     -H "Authorization: Bearer <token>"
```

[2](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#define-the-collection-schema)

### Define the collection schema

Next, you’ll define the schema for your collection. This includes the `displayName` for the collection, the `singularName` for its items, the `slug` for the collection, and an array of `fields`.

#### Default fields

Each collection will always have the following fields in its schema:

- `name` \- The name of the item
- `slug` \- The slug of the item. Slugs should be unique, and formatted as all lowercase with no spaces. Any spaces will be converted to ”-”.

#### Custom fields

You can add additional custom fields to the collection. Each field will have its own `type`, `displayName`, `slug`, and other properties to configure its behavior. A collection’s schema can have up to 60 fields. To see the different field types and their properties, see the [Field Types & Item Values Reference](https://developers.webflow.com/data/reference/field-types-item-values).

Here is an example of a schema for a “Hitchhiker’s Guide” collection that includes various field types:

Example collection schema

```
{
  "displayName": "Guide Entries",
  "singularName": "Guide Entry",
  "slug": "guide-entries",
  "fields": [\
    {\
      "type": "PlainText",\
      "displayName": "Entry Title",\
      "slug": "entry-title",\
      "isRequired": true\
    },\
    {\
      "type": "RichText",\
      "displayName": "Entry HTML",\
      "slug": "entry-html"\
    },\
    {\
      "type": "Image",\
      "displayName": "Illustration Image",\
      "slug": "illustration-image"\
    },\
    {\
      "type": "Number",\
      "displayName": "Importance Level",\
      "slug": "importance-level"\
    },\
    {\
      "type": "Switch",\
      "displayName": "Is Essential",\
      "slug": "is-essential"\
    },\
    {\
      "type": "Reference",\
      "displayName": "Related Entry",\
      "slug": "related-entry",\
      "metadata": {\
        "collectionId": "7f15043107e2fc95644e93807ee25dd6"\
      }\
    },\
    {\
      "type": "Option",\
      "displayName": "Item Type",\
      "slug": "item-type",\
      "metadata": {\
        "options": [\
          {"name": "Survival Gear"},\
          {"name": "Gadget"},\
          {"name": "Other"}\
        ]\
      }\
    }\
  ]
}
```

##### Field Validations

When defining a field in the Webflow UI, you can also specify validations for the field. Currently, the API doesn’t support field validations. All validations must be specified in the Webflow UI.

[3](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#create-the-collection)

### Create the collection

With your `site_id` and schema, you can now create the collection by making a `POST` request to the [Create Collection](https://developers.webflow.com/data/reference/cms/collections/create) endpoint.

POST

/v2/sites/:site\_id/collections

cURL

```
curl -X POST https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{
  "displayName": "Blog Posts",
  "singularName": "Blog Post",
  "slug": "posts",
  "fields": [\
    {\
      "isRequired": true,\
      "type": "PlainText",\
      "displayName": "Title",\
      "helpText": "The title of the blog post",\
      "slug": "title"\
    },\
    {\
      "isRequired": true,\
      "type": "RichText",\
      "displayName": "Content",\
      "helpText": "The content of the blog post",\
      "slug": "content"\
    },\
    {\
      "isRequired": true,\
      "type": "Reference",\
      "displayName": "Author",\
      "helpText": "The author of the blog post",\
      "metadata": {\
        "collectionId": "23cc2d952d4e4631ffd4345d2743db4e"\
      },\
      "slug": "author"\
    }\
  ]
}'
```

#### Adding advanced field types

When defining a collection’s schema, `Option` and `Reference` fields require a `metadata` object to be configured.

###### Defining an Option Field

The `Option` field allows you to create a predefined list of choices for an item, which can be selected from a dropdown menu in the CMS.

When creating an `Option` field, you must provide a `metadata` object containing an `options` array. Each object in the array defines a choice with a `name`. Webflow will automatically generate an `id` for each option.

```
{
  "type": "Option",
  "displayName": "Item Type",
  "slug": "item-type",
  "metadata": {
    "options": [\
      {"name": "Survival Gear"},\
      {"name": "Gadget"},\
      {"name": "Other"}\
    ]
  }
}
```

###### Defining Reference and Multi-Reference Fields

The `Reference` and `Multi-Reference` fields allow you to link a collection item to one or more other items from another collection.

When creating `Reference` or `Multi-Reference` fields, you must provide a `metadata` object containing the `collectionId` of the collection you intend to reference.

[1](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#get-the-collection-id)

### Get the Collection ID

First, you need the `id` of the collection you want to reference. You can get this by calling the [List Collections](https://developers.webflow.com/data/reference/cms/collections/list) endpoint and finding the target collection in the response.

GET

/v2/sites/:site\_id/collections

cURL

```
curl https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/collections \
     -H "Authorization: Bearer <token>"
```

[2](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#define-the-field)

### Define the Field

Use the retrieved `collectionId` in the `metadata` object when defining your `Reference` or `Multi-Reference` field in a “Create Collection” or “Create Field” request.

```
{
  "type": "Reference",
  "displayName": "Related Entry",
  "slug": "related-entry",
  "metadata": {
    "collectionId": "7f15043107e2fc95644e93807ee25dd6" // ID of the collection to reference
  }
}
```

* * *

## 2\. Managing collection items

Once your collection is created, you can begin to populate it with items. The following sections demonstrate how to perform CRUD (Create, Read, Update, Delete) operations on the items in your new collection.

When creating collection items, you can use the staged or live endpoints to manage the item’s publishing state. For more details on publishing options when creating an item, see the [Publishing Guide](https://developers.webflow.com/data/docs/working-with-the-cms/publishing).

### Creating an item

[1](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#get-the-collection-id-1)

### Get the collection ID

First, you need the `id` of the collection you want to create an item for. The [Create Collection](https://developers.webflow.com/data/reference/cms/collections/create) response will include the collection’s `id`. However, you can also get the collection ID by calling the [List Collections](https://developers.webflow.com/data/reference/cms/collections/list) endpoint and finding the collection in the response.

GET

/v2/collections/:collection\_id

cURL

```
curl https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745 \
     -H "Authorization: Bearer <token>"
```

[2](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#create-a-collection-item)

### Create a collection item

To add an item, send a `POST` request to the [Create Collection Item](https://developers.webflow.com/data/reference/cms/collection-items/create-item) endpoint. The `fieldData` object in the request body must match the schema you defined for the collection.

POST

/v2/collections/:collection\_id/items

cURL

```
curl -X POST "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items?skipInvalidFiles=true" \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{
  "isArchived": false,
  "isDraft": false,
  "fieldData": {
    "name": "The Hitchhiker\'s Guide to the Galaxy",
    "slug": "hitchhikers-guide-to-the-galaxy",
    "plain-text": "Don\'t Panic.",
    "rich-text": "<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don\'t forget yours!</strong></p>",
    "main-image": {
      "fileId": "62b720ef280c7a7a3be8cabe",
      "url": "/files/62b720ef280c7a7a3be8cabe_image.png"
    },
    "image-gallery": [\
      {\
        "fileId": "62b720ef280c7a7a3be8cabd",\
        "url": "/files/62b720ef280c7a7a3be8cabd_image.png"\
      },\
      {\
        "fileId": "62b720ef280c7a7a3be8cabe",\
        "url": "/files/62b720ef280c7a7a3be8cabe_image.png"\
      }\
    ],
    "intro-video": "https://www.youtube.com/watch?v=aJ83KAggd-4",
    "official-site": "https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy",
    "contact-email": "zaphod.beeblebrox@heartofgold.gov",
    "support-phone": "424-242-4242",
    "answer-to-everything": 42,
    "release-date": "1979-10-12T00:00:00.000Z",
    "is-featured": true,
    "brand-color": "#000000",
    "category": "62b720ef280c7a7a3be8cabf",
    "author": "62b720ef280c7a7a3be8cab0",
    "tags": [\
      "62b720ef280c7a7a3be8cab1",\
      "62b720ef280c7a7a3be8cab2"\
    ],
    "downloadable-asset": {
      "fileId": "62b720ef280c7a7a3be8cab3",
      "url": "/files/62b720ef280c7a7a3be8cab3_document.pdf"
    }
  }
}'
```

#### Populating advanced field types

Most fields accept simple values like strings or numbers. However, fields like `Option`, and `Reference` require specific identifiers. The sections below explain how to get the correct IDs to populate these fields when creating or updating an item.

###### Populating an option field

`Option` fields require the unique `id` of the choice, which is defined in the collection’s schema.

[1](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#get-collection-details)

### Get collection details

To find the `id` for each option, retrieve the collection’s schema by calling the [Get Collection Details](https://developers.webflow.com/data/reference/cms/collections/get) endpoint.

GET

/v2/collections/:collection\_id

cURL

```
curl https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745 \
     -H "Authorization: Bearer <token>"
```

[2](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#find-the-option-id)

### Find the option ID

In the response, locate your `Option` field within the `fields` array. The `validations.options` array will contain each choice with its `name` and `id`.

```
// Snippet from GET /v2/collections/{collection_id} response
{
  "fields": [\
    {\
      "type": "Option",\
      "slug": "item-type",\
      "validations": {\
        "options": [\
          { "name": "Survival Gear", "id": "66f6e966c9e1dc700a857ca3" },\
          { "name": "Gadget", "id": "66f6e966c9e1dc700a857ca4" },\
          { "name": "Other", "id": "66f6e966c9e1dc700a857ca5" }\
        ]\
      }\
    }\
  ]
}
```

[3](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#use-the-option-id)

### Use the option ID

When creating or updating an item, pass the `id` of your chosen option as a string in the `fieldData`.

```
{
  "fieldData": {
    "item-type": "66f6e966c9e1dc700a857ca3" // ID for "Survival Gear"
  }
}
```

###### Populating reference and multi-reference fields

`Reference` and `Multi-Reference` fields link an item to one or more other collection items. To create a reference, you need the `id` of the item you want to link to.

To reference a collection item, the collection must be published to the site.

[1](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#find-the-item-ids)

### Find the item IDs

To get the `id` of the item you want to reference, call the [List Items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items) endpoint on the collection that contains the target item. You can filter the results to find the specific items you need.

[2](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#use-the-item-ids)

### Use the item IDs

For a `Reference` field, pass the item `id` as a string. For a `Multi-Reference` field, pass an array of item `id` strings.

```
{
  "fieldData": {
    "related-entry": "42b720ef280c7a7a3be8cabe", // Single item reference
    "mentioned-in": [\
      "62b720ef280c7a7a3be8cabd",\
      "62c880ef281c7b7b4cf9dabc"\
    ] // Multi-item reference
  }
}
```

### Listing, updating, and deleting items

[1](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#list-collection-items)

### List collection items

To get a list of all items in a collection, send a `GET` request to the [List Collection Items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items) endpoint.

GET

/v2/collections/:collection\_id/items

cURL

```
curl -G https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items \
     -H "Authorization: Bearer <token>" \
     -d offset=0 \
     -d limit=100
```

#### Pagination

When listing items, the response will be paginated. You can control the pagination using the `limit` and `offset` query parameters.

- `limit`: The maximum number of items to return (up to 100).
- `offset`: The number of items to skip from the beginning of the list.

By default, the API will return up to 100 items. If a collection contains more than 100 items, you can use `offset` to retrieve additional pages of results. For example, to get the second page of 100 items, you would set `offset` to `100`.

The response will include a `pagination` object with `total`, `limit`, and `offset` fields, which you can use to loop through the pages of results.

Example pagination object

```
// Snippet from GET /v2/collections/{collection_id}/items response
{
  "items": [\
    // ... item data ...\
  ],
  "pagination": {
    "total": 250,
    "limit": 100,
    "offset": 100
  }
}
```

[2](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#update-a-collection-item)

### Update a collection item

To modify an existing item, you’ll first need its `id`. You can get the item’s `id` by calling the [List Collection Items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items) endpoint and finding the item in the response.

Then, use the `PATCH` endpoint to [Update a Collection Item](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/update-items). You only need to provide the fields you want to change in the `fieldData` object.

PATCH

/v2/collections/:collection\_id/items/:item\_id

cURL

```
curl -X PATCH "https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754?skipInvalidFiles=true" \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{
  "isArchived": false,
  "isDraft": false,
  "fieldData": {
    "name": "The Hitchhiker\'s Guide to the Galaxy",
    "slug": "hitchhikers-guide-to-the-galaxy",
    "plain-text": "Don\'t Panic.",
    "rich-text": "<h3>A Guide to Interstellar Travel</h3><p>A towel is about the most massively useful thing an interstellar hitchhiker can have. <strong>Don\'t forget yours!</strong></p>",
    "main-image": {
      "fileId": "62b720ef280c7a7a3be8cabe",
      "url": "/files/62b720ef280c7a7a3be8cabe_image.png"
    },
    "image-gallery": [\
      {\
        "fileId": "62b720ef280c7a7a3be8cabd",\
        "url": "/files/62b720ef280c7a7a3be8cabd_image.png"\
      },\
      {\
        "fileId": "62b720ef280c7a7a3be8cabe",\
        "url": "/files/62b720ef280c7a7a3be8cabe_image.png"\
      }\
    ],
    "intro-video": "https://www.youtube.com/watch?v=aJ83KAggd-4",
    "official-site": "https://hitchhikers.fandom.com/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy",
    "contact-email": "zaphod.beeblebrox@heartofgold.gov",
    "support-phone": "424-242-4242",
    "answer-to-everything": 42,
    "release-date": "1979-10-12T00:00:00.000Z",
    "is-featured": true,
    "brand-color": "#000000",
    "category": "62b720ef280c7a7a3be8cabf",
    "author": "62b720ef280c7a7a3be8cab0",
    "tags": [\
      "62b720ef280c7a7a3be8cab1",\
      "62b720ef280c7a7a3be8cab2"\
    ],
    "downloadable-asset": {
      "fileId": "62b720ef280c7a7a3be8cab3",
      "url": "/files/62b720ef280c7a7a3be8cab3_document.pdf"
    }
  }
}'
```

[3](https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items#delete-a-collection-item)

### Delete a collection item

To remove an item from a collection, you’ll need its `id`. You can get the item’s `id` by calling the [List Collection Items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items) endpoint and finding the item in the response.

Then, use the `DELETE` endpoint to [Delete a Collection Item](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/delete-items).

DELETE

/v2/collections/:collection\_id/items/:item\_id

cURL

```
curl -X DELETE https://api.webflow.com/v2/collections/580e63fc8c9a982ac9b8b745/items/580e64008c9a982ac9b8b754 \
     -H "Authorization: Bearer <token>"
```

* * *

## 3\. Publishing a collection

Once you’ve created your collection and its items, you can publish the collection. This will make the collection and its items visible on your live site. Additionally, this allows the collection’s items to be referenced by other collections.

To publish a collection or any collection items, **you’ll need to publish the entire site.** You can publish the site by calling the [Publish Site](https://developers.webflow.com/data/reference/sites/publish) endpoint.

POST

/v2/sites/:site\_id/publish

cURL

```
curl -X POST https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741/publish \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{
  "customDomains": [\
    "660c6449dd97ebc7346ac629",\
    "660c6449dd97ebc7346ac62f"\
  ],
  "publishToWebflowSubdomain": false
}'
```

* * *

## Next steps

Once you have created your collections and populated them with content, you can explore more advanced topics like publishing and localization.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/PublishDesigner.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/PublishDesigner.svg)\\
\\
Publishing Content\\
\\
Learn how to tailor CMS publishing workflows to your needs.](https://developers.webflow.com/data/docs/working-with-the-cms/publishing) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Localization.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Localization.svg)\\
\\
Localizing Content\\
\\
Learn how to create and manage linked CMS items across multiple locales.](https://developers.webflow.com/data/docs/working-with-the-cms/localization)

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