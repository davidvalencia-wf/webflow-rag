---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/docs/working-with-localization/localize-pages
title: "Localizing pages | Webflow Developer Documentation"
published: 2025-11-17
---

Webflow’s Data API enables you to localize DOM content and metadata across different locales. Localizing pages requires two main steps:

1. Retrieve data from the **primary locale**
2. Update data in the **secondary locale**

## Workflows

There are two main workflows for localizing pages:

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Grid.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Grid.svg)\\
\\
DOM Content\\
\\
Localize text content in a secondary locale](https://developers.webflow.com/data/docs/working-with-localization/localize-pages#dom-content) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Controls.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Controls.svg)\\
\\
Metadata\\
\\
Localize page titles, SEO descriptions, and Open Graph descriptions in a secondary locale](https://developers.webflow.com/data/docs/working-with-localization/localize-pages#metadata)

## DOM Content

The DOM content endpoints enable you to localize text for any secondary locale. The process involves the following steps:

[1](https://developers.webflow.com/data/docs/working-with-localization/localize-pages#fetch-primary-locale-content)

### Fetch primary locale content

Use the [Get page content endpoint](https://developers.webflow.com/data/reference/pages-and-components/pages/get-content) to retrieve the page’s DOM structure and default content.

[2](https://developers.webflow.com/data/docs/working-with-localization/localize-pages#translate-content)

### Translate content

Traverse the `nodes` array in the response to identify and translate all text content.

[3](https://developers.webflow.com/data/docs/working-with-localization/localize-pages#update-secondary-locale-content)

### Update secondary locale content

Use the `localeId` parameter in your request to the [Update Page Content endpoint](https://developers.webflow.com/data/reference/pages-and-components/pages/update-static-content) to apply the localized content.

* * *

### Retrieve page content

Start by getting the content structure for a given static page. You’ll need the `pageId`, which you can find by listing all pages for a site using the [list pages endpoint](https://developers.webflow.com/data/reference/pages-and-components/pages/list). Once you have the `pageId`, you can use the [get page content endpoint](https://developers.webflow.com/data/reference/pages-and-components/pages/get-content) to retrieve the content structure for the page.

##### Request

cURLgetPageContent.ts

```
curl -G https://api.webflow.com/v2/pages/<PAGE_ID>/dom \
    -H "Authorization: Bearer <token>" \
    -d limit=100 \
    -d offset=0
```

**Note:** This API will only return content for static pages. Dynamic pages, like CMS Collection templates will return an empty response.

##### Response

The response contains a `nodes` array with the page’s static content. Each node includes a `type` property that defines its content type.

pageId

stringRequired

The unique identifier for the page

nodes

list of objectsRequired

The list of nodes that represent the static content of the page

pagination

objectRequired

The pagination information for the response

lastUpdated

stringRequired

The date the page was most recently updated

Response

```
{
  "pageId": "658205daa3e8206a523b5ad4",
  "nodes": [\
    {\
      "id": "a245c12d-995b-55ee-5ec7-aa36a6cad623",\
      "type": "text",\
      "text": {\
        "html": "<h1>The Hitchhiker's Guide to the Galaxy</h1>",\
        "text": "The Hitchhiker's Guide to the Galaxy"\
      },\
      "attributes": {}\
    },\
    {\
      "id": "a245c12d-995b-55ee-5ec7-aa36a6cad627",\
      "type": "text",\
      "text": {\
        "html": "<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>",\
        "text": "string"\
      },\
      "attributes": {\
        "number": "forty two"\
      }\
    },\
    {\
      "id": "a245c12d-995b-55ee-5ec7-aa36a6cad629",\
      "type": "image",\
      "image": {\
        "alt": "Marvin, the Paranoid Android",\
        "assetId": "659595234426a9fcbad57043"\
      },\
      "attributes": {}\
    },\
    {\
      "id": "a245c12d-995b-55ee-5ec7-aa36a6cad635",\
      "type": "select",\
      "choices": [\
        {\
          "value": "choice-1",\
          "text": "First choice"\
        },\
        {\
          "value": "choice-2",\
          "text": "Second choice"\
        }\
      ],\
      "attributes": {}\
    },\
    {\
      "id": "a245c12d-995b-55ee-5ec7-aa36a6cad642",\
      "type": "text-input",\
      "placeholder": "Enter something here...",\
      "attributes": {}\
    },\
    {\
      "id": "a245c12d-995b-55ee-5ec7-aa36a6cad671",\
      "type": "submit-button",\
      "value": "Submit",\
      "waitingText": "Submitting...",\
      "attributes": {}\
    },\
    {\
      "id": "a245c12d-995b-55ee-5ec7-aa36a6cad631",\
      "type": "text",\
      "text": {\
        "html": "string",\
        "text": "string"\
      },\
      "componentId": "6258612d1ee792848f805dcf",\
      "propertyOverrides": [\
        {\
          "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad633",\
          "type": "Plain Text",\
          "label": "Catchphrase",\
          "text": {\
            "html": null,\
            "text": "Don't Panic!"\
          }\
        },\
        {\
          "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad635",\
          "type": "Rich Text",\
          "label": "Tagline",\
          "text": {\
            "html": "<div><p>Always know where your towel is.</p></div>",\
            "text": null\
          }\
        }\
      ]\
    }\
  ],
  "pagination": {
    "limit": 4,
    "offset": 0,
    "total": 4
  },
  "lastUpdated": "2016-10-24T19:42:38.929Z"
}
```

By default, if you don’t include a `localeId` in your request, the response will return content from the primary locale.

#### Nodes

The [page content endpoint](https://developers.webflow.com/data/reference/pages-and-components/pages/get-content) returns a list of nodes that represent static text and images available for localization. **Note:** this endpoint doesn’t return the entire DOM structure of the page, but only the static content available for localization.

#### Node types

Different node types represent different kinds of content, each with its own structure and properties.

| Node type | Description |
| --- | --- |
| `text` | Represents text content. Including headings, [text blocks](https://help.webflow.com/hc/en-us/articles/33961346059027-Use-text-blocks-in-Webflow), [rich text](https://help.webflow.com/hc/en-us/articles/33961256808467-Rich-text-element-overview), form labels, and other text content on a page. |
| `image` | Represents static images on a page. It contains alt text details for accessibility and the `assetId` for fetching the actual image resource. |
| `text-input` | Represents a `textinput` and `textarea` fields on a form. |
| `select` | Represents a select field and its options on a form. |
| `submit-button` | Represents a submit button on a form. It contains the button text and waiting text of the button. |
| `search-button` | Represents the button text of a search button on a [site search element](https://help.webflow.com/hc/en-us/articles/33961242348179-Site-search). |
| `component-instance` | Represents a component instance on a page. Learn more about [localizing components](https://developers.webflow.com/data/docs/working-with-localization/localize-components) in the guide. |

#### Node properties

Each node type has a specific structure and properties that define the content it contains. However, all nodes will have the following properties:

id

stringRequired

Node UUID

type

enumRequired

The type of the node.

Acceptable values: `text`, `image`, `text-input`, `select`, `submit-button`, `search-button`, `component-instance`

attributes

object

The [custom attributes](https://help.webflow.com/hc/en-us/articles/33961389460115-Custom-attributes#how-to-use-cms-data-in-custom-attributes) of the node. These are typically used to store custom data on the node like `aria-labels` for accessibility or `data-w-id`.

##### Node properties by type

Each node type has a unique structure for accessing page content. For example, a `text` node contains a `text` object, which typically includes `html` and `text` properties. These properties provide context for strings that can be localized. The tabs below detail the specific properties for each node type.

###### Text

###### Image

###### Text Input

###### Select

###### Submit Button

###### Component Instance

id

stringRequired

Node UUID

type

enumRequired

The type of the node. `text`

text

objectRequired

The text content of the node

###### \+ Show 2 properties

html

stringRequired

The HTML content of the node

text

stringRequired

The text content of the node

attributes

map from strings to strings

The custom attributes of the node

Text node example

```
{
  "id": "a245c12d-995b-55ee-5ec7-aa36a6cad623",
  "type": "text",
  "text": {
    "html": "<h1>Don't Panic!</h1>",
    "text": "Don't Panic!"
  },
  "attributes": {}
},
{
  "id": "a245c12d-995b-55ee-5ec7-aa36a6cad627",
  "type": "text",
  "text": {
    "html": "<span data-w-id=\"b3107...\">$9.99</span>",
    "text": "$9.99"
  },
  "attributes": {}
}
```

##### Nested HTML tags

The `text.html` property may contain nested HTML tags with `data-w-id` attributes (e.g., `data-w-id="some-unique-identifier"`). Retain these identifiers when updating page content in secondary locales to preserve custom attributes and links on inner HTML elements.

### Update page content

Once you’ve identified and translated the content you want to localize, you can update it using the [update page content endpoint](https://developers.webflow.com/data/reference/pages-and-components/pages/update-static-content). You’ll need to pass in the `localeId` of the secondary locale you want to update as a query parameter, and a list of `nodes` to update in the request body.

Each node should have the `nodeId` of the node you want to update, and the node value you want to update. The node value will vary depending on the node type.

POST

/v2/pages/:page\_id/dom

cURL

```
curl -X POST "https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom?localeId=localeId" \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{
  "nodes": [\
    {\
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad623",\
      "text": "<h1>The Hitchhiker\'s Guide to the Galaxy</h1>"\
    },\
    {\
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad627",\
      "text": "<div><h3>Don\'t Panic!</h3><p>Always know where your towel is.</p></div>"\
    },\
    {\
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad635",\
      "text": "<h1>Hello world</h1>",\
      "choices": [\
        {\
          "value": "choice-1",\
          "text": "First choice"\
        },\
        {\
          "value": "choice-2",\
          "text": "Second choice"\
        }\
      ]\
    },\
    {\
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad642",\
      "text": "<h1>Hello world</h1>",\
      "placeholder": "Enter something here..."\
    },\
    {\
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad671",\
      "text": "<h1>Hello world</h1>",\
      "value": "Submit",\
      "waitingText": "Submitting..."\
    },\
    {\
      "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad629",\
      "text": "<h1>Hello world</h1>",\
      "propertyOverrides": [\
        {\
          "propertyId": "7dd14c08-2e96-8d3d-2b19-b5c03642a0f0",\
          "text": "<div><h1>Time is an <em>illusion</em></h1></div>"\
        },\
        {\
          "propertyId": "7dd14c08-2e96-8d3d-2b19-b5c03642a0f1",\
          "text": "Life, the Universe and Everything"\
        }\
      ]\
    }\
  ]
}'
```

##### Updating text nodes

When updating text nodes, pass the `text` property with the translated text, structured as the HTML content received from the Get Page Content endpoint. The HTML tag structure must remain identical to the Get Content endpoint’s response.

##### Updating images isn't supported by the API

Currently, updating images isn’t supported by the API. To update images, you’ll need to update the image asset in the Webflow designer.

## Metadata

The metadata endpoints enable you to localize SEO and Open Graph content for any secondary locale. The process involves the following steps:

[1](https://developers.webflow.com/data/docs/working-with-localization/localize-pages#retrieve-primary-locale-metadata)

### Retrieve primary locale metadata

Use the [Get page metadata endpoint](https://developers.webflow.com/data/reference/pages-and-components/pages/get-metadata) to retrieve the page’s metadata.

[2](https://developers.webflow.com/data/docs/working-with-localization/localize-pages#translate-metadata)

### Translate metadata

Translate the metadata for the secondary locale.

[3](https://developers.webflow.com/data/docs/working-with-localization/localize-pages#update-secondary-locale-metadata)

### Update secondary locale metadata

Use the [Update page metadata endpoint](https://developers.webflow.com/data/reference/pages-and-components/pages/update-page-settings) to update the metadata for the secondary locale.

### Retrieve page metadata

First, retrieve the page metadata for the primary locale using the [Get page metadata endpoint](https://developers.webflow.com/data/reference/pages-and-components/pages/get-metadata).

This endpoint will return metadata shown above for the primary locale. The response includes both internal and external information about your webflow page, including unique identifiers, draft information, and publish times.

For a full list of information returned see the [Get page metadata page in the API reference](https://developers.webflow.com/data/reference/pages-and-components/pages/get-metadata).

##### Request

GET

/v2/pages/:page\_id

cURL

```
curl -G https://api.webflow.com/v2/pages/63c720f9347c2139b248e552 \
     -H "Authorization: Bearer <token>" \
     -d localeId=65427cf400e02b306eaa04a0
```

##### Response

Response

```
{
  "id": "6596da6045e56dee495bcbba",
  "siteId": "6258612d1ee792848f805dcf",
  "title": "Guide to the Galaxy",
  "slug": "guide-to-the-galaxy",
  "parentId": {},
  "collectionId": {},
  "createdOn": "2024-03-11T10:42:00.000Z",
  "lastUpdated": "2024-03-11T10:42:42.000Z",
  "archived": false,
  "draft": false,
  "canBranch": false,
  "isBranch": true,
  "branchId": "68026fa68ef6dc744c75b833",
  "seo": {
    "title": "The Ultimate Hitchhiker's Guide to the Galaxy",
    "description": "Everything you need to know about the galaxy, from avoiding Vogon poetry to the importance of towels."
  },
  "openGraph": {
    "title": "Explore the Cosmos with The Ultimate Guide",
    "titleCopied": false,
    "description": "Dive deep into the mysteries of the universe with your guide to everything galactic.",
    "descriptionCopied": false
  },
  "localeId": "653fd9af6a07fc9cfd7a5e57",
  "publishedPath": "/en-us/guide-to-the-galaxy"
}
```

### Update page metadata

To update metadata for a secondary locale, translate the properties listed below and include them in the request body when calling the [Update page metadata endpoint](https://developers.webflow.com/data/reference/pages-and-components/pages/update-page-settings).

### Request

titlestringOptional

Title for the page

slugstringOptional

Slug for the page.

\*\*Note:\*\* Updating slugs in secondary locales is only supported in <a href="https://webflow.com/localization">Advanced and Enterprise localization add-on plans.</a>

seoobjectOptional

SEO-related fields for the Page

Show 2 properties

openGraphobjectOptional

Open Graph fields for the Page

Show 4 properties

cURLNode.js

```
curl -X PUT https://api.webflow.com/v2/pages/<PAGE_ID>?localeId=<SECONDARY_LOCALE_ID> \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Página de inicio - Mi sitio web",
       "seo": {
         "title": "Mi sitio web - Página de inicio",
         "description": "Descripción SEO en español para mejor visibilidad en buscadores"
       },
       "openGraph": {
         "title": "Mi sitio web",
         "description": "Descripción para compartir en redes sociales"
       }
     }'
```

**Slug localization** is only available with specific Webflow plans:

- **Localize Advanced add-on**
- **Enterprise Localization**

## Complete localization workflow

Here’s a complete example that demonstrates the full page localization process for static content (not including components):

Node.js

```
const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });

// Localize page static content and metadata
// Assume `translations` object holds page-level translations in memory for the secondary locale
async function localizePage(pageId, secondaryLocaleId, translations) {
  // 1. Get primary locale content structure
  const contentData = await client.pages.getContent(pageId);

  // 2. Prepare static content updates
  const staticUpdates = {
    nodes: contentData.nodes
      .filter(node => node.type === 'text' && translations.static[node.id])
      .map(node => ({
        nodeId: node.id,
        text: translations.static[node.id]
      }))
  };

  // 3. Update page content
  if (staticUpdates.nodes.length > 0) {
    await client.pages.updateStaticContent(pageId, {
      localeId: secondaryLocaleId,
      nodes: staticUpdates.nodes,
    });
  }

  // 4. Update page metadata
  if (translations.metadata) {
    await client.pages.updatePageSettings(pageId, {
      localeId: secondaryLocaleId,
      title: translations.metadata.title,
      seo: {
        title: translations.metadata.seo.title,
        description: translations.metadata.seo.description,
      },
      openGraph: {
        title: translations.metadata.openGraph.title,
        description: translations.metadata.openGraph.description,
      },
    });
  }
}
```

## FAQ

###### Do I need to update all nodes when updating page content?

No, you only need to include the nodes you want to update in the request body. If you don’t include a node in the Update Page Content request body, that element will inherit the content from the primary locale.

###### What happens if an error occurs when updating page content?

If an error occurs when attempting to update a node on a page, the request may still return a 200 status code, but you may want to check the response body for the `errors` array to see if any errors surfaced.

###### Why can't I update page content in the primary locale with APIs?

Because the primary locale is the source of truth for content, changes must be initiated through the Webflow canvas at this time.

###### Why am I getting component-instance types in the Get Page Content response?

Component instances are included in the [Get Page Content API](https://developers.webflow.com/data/reference/pages-and-components/pages/get-content) response to provide a more wholistic view of the content on a page.

When getting page content for the primary locale, all component instances are included in the response. When getting page content for a secondary locale, only component instances with property overrides are included in the response.

Learn more in the [Components and properties](https://developers.webflow.com/data/docs/working-with-localization/localize-pages) guide.

###### After making updates to page content, why isnt' the content reflecting in the Webflow canvas?

When making updates to your site via Data APIs, you may need to refresh the page in order to see the changes reflect in the Webflow canvas.

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