---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/docs/working-with-localization/localize-components
title: "Localizing components | Webflow Developer Documentation"
published: 2025-11-17
---

Components are reusable design elements that can be instanced across your site.

## Workflows

Webflow enables you to localize both a component definition and component instances via the Data API.

[![Component Definition Logo](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Components.svg)![Component Definition Logo](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Components.svg)\\
\\
Localize component definitions\\
\\
Localize the static content of a component definition across an **entire**\\
**locale**](https://developers.webflow.com/data/docs/working-with-localization/localize-components#component-definitions) [![Component Definition Logo](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/PageBuilding.svg)![Component Definition Logo](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/PageBuilding.svg)\\
\\
Localize component instances\\
\\
Localize a component instance on a **specific page** by modifying its properties.](https://developers.webflow.com/data/docs/working-with-localization/localize-components#component-instances)

## Key concepts

To understand how to localize components, you’ll need to understand the key concepts of components in Webflow.

###### Component definition

###### Component instance

A component definition serves as the blueprint for a component. It contains the component’s static content, like text and images, and defines the component’s properties: customizable fields that allow for dynamic content. When you change a component definition, the updates apply to all instances of that component, unless an instance has a property override.

A component definition contains two types of localizable content:

- **Static content**: Text nodes, form elements, and nested component instances

- **Property defaults**: Default text values for component properties
![Component Definition](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/data/pages/Localization/assets/Component-Definition-Light.svg)

### Localizable content

To completely localize your site, you’ll need to localize all three types of component content.

| Content Type | Scope | Description |
| --- | --- | --- |
| **Property Overrides** | Page-specific <br>Instance | Custom values applied to a single component instance. |
| **Property Defaults** | Site-wide <br>Definition | Default values for properties, used by instances without an override. |
| **Static Content** | Site-wide <br>Definition | Fixed text content that’s part of the component’s structure. |

Some key points to remember when localizing component content:

- Property overrides only affect a specific component instance on a page
- Default properties affect all instances that don’t have overrides
- Static content affects all instances across the site
- Only content bound to component properties can be overridden at the instance or per-page level

## Component definitions

Component definitions contain two types of localizable content:

[![Static Content Logo](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/LayoutDashboard.svg)![Static Content Logo](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/LayoutDashboard.svg)\\
\\
Static content\\
\\
Text nodes, form elements, and nested component instances](https://developers.webflow.com/data/docs/working-with-localization/localize-components#localize-static-content) [![Property Defaults Logo](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/SiteBlank.svg)![Property Defaults Logo](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/SiteBlank.svg)\\
\\
Property defaults\\
\\
Default values for component properties](https://developers.webflow.com/data/docs/working-with-localization/localize-components#localize-default-properties)

### Localize static content

To localize static content, you’ll first need to get the content of the selected component, and then update the content in a secondary locale.

[1](https://developers.webflow.com/data/docs/working-with-localization/localize-components#list-site-components)

### List site components

Use the [List\\
Components](https://developers.webflow.com/data/reference/pages-and-components/components/list) endpoint
to get a list of all components on your site.

[2](https://developers.webflow.com/data/docs/working-with-localization/localize-components#get-static-content-of-a-component)

### Get static content of a component

Use the [Get Component\\
Content](https://developers.webflow.com/data/reference/pages-and-components/components/get-content)
endpoint to get the static content of a selected component definition.

[3](https://developers.webflow.com/data/docs/working-with-localization/localize-components#update-static-content-of-a-component)

### Update static content of a component

Use the [Update Component\\
Content](https://developers.webflow.com/data/reference/pages-and-components/components/update-content)
endpoint to update the static content of the selected component definition in a secondary locale.

#### List site components

Use the [List Components](https://developers.webflow.com/data/reference/pages-and-components/components/list) endpoint to get a list of all components on your site.

##### Request

cURLNode.js

```
curl -G https://api.webflow.com/v2/sites/<SITE_ID>/components \
     -H "Authorization: Bearer <token>" \
     -d limit=100 \
     -d offset=0
```

##### Response

The endpoint returns a `components` array with the details of each component definition on your site. The response also includes a `pagination` object for pagination through results over the 100 item limit.

### Response

componentslist of objectsOptional

Show 5 properties

paginationobjectOptional

Pagination object

Show 3 properties

Response

```
{
  "components": [\
    {\
      "id": "1fa6f97b-84f7-2db3-29cb-1275161e432f",\
      "name": "Navbar"\
    },\
    {\
      "id": "9fa3a9c4-87d4-19b0-95f7-1b0b099f82a0",\
      "name": "Footer"\
    },\
    {\
      "id": "db278ae3-20d1-6657-c0c9-083a38fbc2c4",\
      "name": "Locale dropdown"\
    },\
    {\
      "id": "d2de2e85-bab1-8dbb-1648-2bbedc5417dd",\
      "name": "Hero"\
    },\
    {\
      "id": "fd06c181-43b2-e1c0-9d7f-0b332cd9905b",\
      "name": "Card"\
    },\
    {\
      "id": "33666cc8-031a-c160-37ec-654c05d48750",\
      "name": "Job Card"\
    },\
    {\
      "id": "d2154999-bbdb-8145-1152-53511d5c3f70",\
      "name": "Button"\
    }\
  ],
  "pagination": {
    "limit": 100,
    "offset": 0,
    "total": 7
  }
}
```

#### Get static content from the primary locale

Retrieve existing static content from the primary locale for a specific component. Send a GET request to the [get component content](https://developers.webflow.com/data/reference/pages-and-components/components/get-content) endpoint, and include the component `id` in the request path.

##### Request

cURLNode.js

```
curl -G https://api.webflow.com/v2/sites/<SITE_ID>/components/<COMPONENT_ID>/dom \
     -H "Authorization: Bearer <token>" \
     -d limit=100 \
     -d offset=0
```

##### Response

The response contains a `nodes` array with the component’s static content. Each node includes a `type` property that defines its content type.

### Response

componentIdstringOptional

Component ID

nodeslist of objectsOptional

Show 7 variants

paginationobjectOptional

Pagination object

Show 3 properties

Get Component Content response example

```
{
  "componentId": "33666cc8-031a-c160-37ec-654c05d48750",
  "nodes": [\
    {\
      "type": "text",\
      "id": "dca4e42f-0d46-0c2a-420f-6496321fec8b",\
      "text": {\
        "html": "<div class=\"text-block-2\">NEW&nbsp;OPPORTUNITY</div>",\
        "text": "NEW OPPORTUNITY"\
      },\
      "attributes": {}\
    },\
    {\
      "type": "component-instance",\
      "id": "d2154999-bbdb-8145-1152-53511d5c3f73",\
      "componentId": "d2154999-bbdb-8145-1152-53511d5c3f70",\
      "propertyOverrides": [\
        {\
          "propertyId": "d9e0fd5c-e7f7-d25a-fdc4-3741ec86fc43",\
          "type": "Plain Text",\
          "label": "Button Text",\
          "text": {\
            "text": "Apply Now"\
          }\
        }\
      ]\
    }\
  ],
  "pagination": {
    "limit": 100,
    "offset": 0,
    "total": 2
  }
}
```

##### Node types

| Node type | Description |
| --- | --- |
| `text` | Represents text content. Including headings, [text blocks](https://help.webflow.com/hc/en-us/articles/33961346059027-Use-text-blocks-in-Webflow), [rich text](https://help.webflow.com/hc/en-us/articles/33961256808467-Rich-text-element-overview), form labels, and other text content on a page. |
| `image` | Represents static images on a page. It contains alt text details for accessibility and the `assetId` for fetching the actual image resource. |
| `text-input` | Represents a `textinput` and `textarea` fields on a form. |
| `select` | Represents a select field and its options on a form. |
| `submit-button` | Represents a submit button on a form. It contains the button text and waiting text of the button. |
| `search-button` | Represents the button text of a search button on a [site search element](https://help.webflow.com/hc/en-us/articles/33961242348179-Site-search). |
| `component-instance` | Represents a component instance on a page. Learn more about [localizing components](https://developers.webflow.com/data/docs/working-with-localization/localize-components) in the guide. |

##### Node properties

Each node type has a specific structure and properties that define the
content it contains. However, all nodes will have `id`, `type`, and
`attributes` properties.

id

stringRequired

Node UUID

type

enumRequired

The type of the node.

attributes

map from strings to strings

The custom attributes of the node

##### Node properties by type

Each node type has a unique structure for accessing component content.

For example, a `text` node contains a `text` object, which includes `html` and `text` properties. These properties provide context for strings that can be localized. See the tabs below for the specific properties for each node type.

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

#### Update static content

After translating the content you received from your earlier request, update it with the [update component content endpoint](https://developers.webflow.com/data/reference/pages-and-components/components/update-content), passing the target `localeId` as a query parameter and the translated `nodes` in the request body.

You only need to include the `nodeId` and the content property for that specific node type.

##### Request

cURLNode.js

```
curl -X POST https://api.webflow.com/v2/sites/<SITE_ID>/components/<COMPONENT_ID>/dom?localeId=<SECONDARY_LOCALE_ID> \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{
       "nodes": [\
        {\
          "nodeId": "dca4e42f-0d46-0c2a-420f-6496321fec8b",\
          "text": "<div class=\"text-block-2\">NUEVA&nbsp;OPORTUNIDAD</div>"\
        },\
        {\
          "nodeId": "d2154999-bbdb-8145-1152-53511d5c3f73",\
          "propertyOverrides": [\
            {\
              "propertyId": "d9e0fd5c-e7f7-d25a-fdc4-3741ec86fc43",\
              "text": "Aplicar ahora"\
            }\
          ]\
        }\
      ]
     }'
```

##### Response

A successful response will return an object with and `error` property with an empty array.

### Localize default properties

Component properties are typed variables that make component content dynamic and customizable per instance. When content is bound to a property, each component instance can have different values for that property.

Component definitions can store **default values** for properties, which are used as fallbacks when instances don’t have property overrides. To localize the default values follow the steps below.

[1](https://developers.webflow.com/data/docs/working-with-localization/localize-components#list-site-components-2)

### List site components

Use the [List\\
Components](https://developers.webflow.com/data/reference/pages-and-components/components/list) endpoint
to get a list of all components on your site.

[2](https://developers.webflow.com/data/docs/working-with-localization/localize-components#get-component-properties)

### Get component properties

Use the [Get Component\\
Properties](https://developers.webflow.com/data/reference/pages-and-components/components/get-properties)
endpoint to get the default properties of the selected component definition.

[3](https://developers.webflow.com/data/docs/working-with-localization/localize-components#update-component-properties)

### Update component properties

Use the [Update Component\\
Properties](https://developers.webflow.com/data/reference/pages-and-components/components/update-properties)
endpoint to update the default properties of the selected component
definition.

#### List site components

Use the [List Components](https://developers.webflow.com/data/reference/pages-and-components/components/list) endpoint to get a list of all components on your site.

##### Request

cURLNode.js

```
curl -G https://api.webflow.com/v2/sites/<SITE_ID>/components \
     -H "Authorization: Bearer <token>" \
     -d limit=100 \
     -d offset=0
```

##### Response

The endpoint returns a `components` array with the details of each component definition on your site. The response also includes a `pagination` object for pagination through results over the 100 item limit.

### Response

componentslist of objectsOptional

Show 5 properties

paginationobjectOptional

Pagination object

Show 3 properties

Response

```
{
  "components": [\
    {\
      "id": "1fa6f97b-84f7-2db3-29cb-1275161e432f",\
      "name": "Navbar"\
    },\
    {\
      "id": "9fa3a9c4-87d4-19b0-95f7-1b0b099f82a0",\
      "name": "Footer"\
    },\
    {\
      "id": "db278ae3-20d1-6657-c0c9-083a38fbc2c4",\
      "name": "Locale dropdown"\
    },\
    {\
      "id": "d2de2e85-bab1-8dbb-1648-2bbedc5417dd",\
      "name": "Hero"\
    },\
    {\
      "id": "fd06c181-43b2-e1c0-9d7f-0b332cd9905b",\
      "name": "Card"\
    },\
    {\
      "id": "33666cc8-031a-c160-37ec-654c05d48750",\
      "name": "Job Card"\
    },\
    {\
      "id": "d2154999-bbdb-8145-1152-53511d5c3f70",\
      "name": "Button"\
    }\
  ],
  "pagination": {
    "limit": 100,
    "offset": 0,
    "total": 7
  }
}
```

#### Get component properties

Retrieve component property definitions and their default values using the [Get Component Properties](https://developers.webflow.com/data/reference/pages-and-components/components/get-properties) endpoint.

##### Request

cURLNode.js

```
curl -G https://api.webflow.com/v2/sites/<SITE_ID>/components/<COMPONENT_ID>/properties \
     -H "Authorization: Bearer <token>"
```

##### Response

The response will return an object with the `componentId`, `properties`, and `pagination` properties. Each property will have a type and text property, which contains the property’s default text value.

### Response

componentIdstringOptional

Component ID

propertieslist of objectsOptional

Show 4 properties

paginationobjectOptional

Pagination object

Show 3 properties

Response

```
{
  "componentId": "33666cc8-031a-c160-37ec-654c05d48750",
  "properties": [\
    {\
      "propertyId": "ecce29ad-f890-3428-1e29-5232054f8932",\
      "type": "Plain Text",\
      "label": "Title",\
      "text": {\
        "text": "Job Title"\
      }\
    },\
    {\
      "propertyId": "b0e6e289-f003-51df-07c2-387775f9a267",\
      "type": "Plain Text",\
      "label": "Department",\
      "text": {\
        "text": "Department"\
      }\
    },\
    {\
      "propertyId": "a0c19de3-e501-89ae-0a69-45b95dbe1dd6",\
      "type": "Plain Text",\
      "label": "Description",\
      "text": {\
        "text": "Apply if you are an expert in delaying tasks, have perfected the art of avoiding work, and mastered the subtle skill of looking busy while accomplishing nothing."\
      }\
    },\
    {\
      "propertyId": "d0b64214-eb68-fa04-3c93-26f8be2df466",\
      "type": "Plain Text",\
      "label": "Location",\
      "text": {\
        "text": "Location"\
      }\
    },\
    {\
      "propertyId": "aaeb508c-75ad-c326-ff4d-c607620dc41a",\
      "type": "Plain Text",\
      "label": "Contract Type",\
      "text": {\
        "text": "Contract Type"\
      }\
    },\
  ],
  "pagination": {
    "limit": 100,
    "offset": 0,
    "total": 5
  }
}
```

##### Property types

Component properties can be of different types:

- **Plain Text** \- Single-line text without HTML formatting
- **Rich Text** \- Multi-line text with HTML formatting support
- **Alt Text** \- Alternative text for images

#### Update component properties

Localize component property default values using the [Update Component Properties](https://developers.webflow.com/data/reference/pages-and-components/components/update-properties) endpoint. Provide a `properties` array with each of the property IDs and the translated strings in the `text` field. You must pass the `localeId` of the secondary locale you want to update as a query parameter.

##### Request

cURLNode.js

```
curl -X POST https://api.webflow.com/v2/sites/<SITE_ID>/components/<COMPONENT_ID>/properties?localeId=<SECONDARY_LOCALE_ID> \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{
       "properties": [\
         {\
           "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad623",\
           "text": "Guía del autoestopista galáctico"\
         },\
         {\
           "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad627",\
           "text": "<div><h3>¡No entres en pánico!</h3><p>Siempre sabe dónde está tu toalla.</p></div>"\
         }\
       ]
     }'
```

##### Response

A successful response will return an object with and `error` property that contains an empty array.

## Component instances

When you add a component to a page, you create an **instance**. To customize the content of an instance, you can override the default properties of that instance. **Only overridden properties can be localized via the properties endpoints.**

### Identify component instances on pages

Component instances appear in the page content response as `component-instance` nodes. To get page content, use the [Get Page Content](https://developers.webflow.com/data/reference/pages-and-components/pages/get-content) endpoint.

##### Request

GET

/v2/pages/:page\_id/dom

cURL

```
curl -G https://api.webflow.com/v2/pages/63c720f9347c2139b248e552/dom \
     -H "Authorization: Bearer <token>" \
     -d localeId=65427cf400e02b306eaa04a0 \
     -d limit=100 \
     -d offset=0
```

##### Response

The response will return a list of nodes. Any `component-instance` type nodes will have a `propertyOverrides` array with a list of available properties to localize. If a property hasn’t been overridden on the instance, it won’t be included in the `propertyOverrides` array.

Each object in the `propertyOverrides` array will have the following properties:

propertyId

stringRequired

The unique identifier for the property being overridden.

type

'Plain Text' \| 'Rich Text'Required

The type of the property.

label

stringRequired

The user-defined label for the property.

text

objectRequired

An object containing the overridden text content.

###### \+ properties

html

string \| null

The HTML content for “Rich Text” properties. This will be `null` for “Plain Text” properties.

text

string \| null

The plain text content for “Plain Text” properties. This will be `null` for “Rich Text” properties.

Response

```
{
  "pageId": "658205daa3e8206a523b5ad4",
  "nodes": [\
    {\
      "id": "a245c12d-995b-55ee-5ec7-aa36a6cad631",\
      "type": "component-instance",\
      "componentId": "6258612d1ee792848f805dcf",\
      "propertyOverrides": [\
        {\
          "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad633",\
          "type": "Plain Text",\
          "label": "Title",\
          "text": {\
            "html": null,\
            "text": "Custom Hero Title"\
          }\
        },\
        {\
          "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad635",\
          "type": "Rich Text",\
          "label": "Description",\
          "text": {\
            "html": "<div><p>Page-specific description text</p></div>",\
            "text": null\
          }\
        }\
      ]\
    }\
  ]
}
```

In this example, the component instance has overridden two properties (“Title” and “Description”) with page-specific values. Any other properties defined in the component will use their default values from the component definition.

### Update component instance

To localize a component instance, create a new `nodes` array, and include an object with the `nodeId` of the component instance and a `propertyOverrides` array. Each item in the array should have the `propertyId` and `text` of the property overrides for the secondary locale.

##### Request

cURLNode.js

```
curl -X POST https://api.webflow.com/v2/pages/<PAGE_ID>/dom?localeId=<SECONDARY_LOCALE_ID> \
     -H "Authorization: Bearer <token>" \
     -H "Content-Type: application/json" \
     -d '{
       "nodes": [\
         {\
           "nodeId": "a245c12d-995b-55ee-5ec7-aa36a6cad631",\
           "propertyOverrides": [\
             {\
               "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad633",\
               "text": "Título personalizado del héroe"\
             },\
             {\
               "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad635",\
               "text": "<div><p>Texto de descripción específico de la página</p></div>"\
             }\
           ]\
         }\
       ]
     }'
```

##### Response

A successful response will return an object with and `error` property with an empty array.

## Complete component localization workflow

Here’s a complete example demonstrating component localization across definitions and instances:

Node.js

```
const client = new WebflowClient({ accessToken: "YOUR_ACCESS_TOKEN" });

// Example `translations` object holding the localized content for the secondary locale
async function localizeComponentDefinition(
  siteId,
  componentId,
  secondaryLocaleId,
  translations
) {
  // 1. Get component content structure in primary locale
  const contentData = await client.components.getContent(siteId, componentId);

  // 2. Get component properties for a given component definition
  const propertiesData = await client.components.getProperties(
    siteId,
    componentId
  );

  // 3. Update static content in component definition
  if (translations.staticContent) {
    const staticUpdates = {
      nodes: contentData.nodes
        .filter((node) => translations.staticContent[node.id])
        .map((node) => {
          const update = { nodeId: node.id };
          if (node.type === "text") {
            update.text = translations.staticContent[node.id];
          } else if (node.type === "text-input") {
            update.placeholder = translations.staticContent[node.id];
          }
          return update;
        }),
    };

    await client.components.updateContent(siteId, componentId, {
      localeId: secondaryLocaleId,
      nodes: staticUpdates.nodes,
    });
  }

  // 4. Update component properties
  if (translations.properties) {
    const propertyUpdates = {
      properties: propertiesData.properties
        .filter((prop) => translations.properties[prop.propertyId])
        .map((prop) => ({
          propertyId: prop.propertyId,
          text: translations.properties[prop.propertyId],
        })),
    };

    await client.components.updateProperties(siteId, componentId, {
      localeId: secondaryLocaleId,
      properties: propertyUpdates.properties,
    });
  }
}

// Example `propertyTranslations` object holding the localized content for the secondary locale
async function localizeComponentInstance(
  pageId,
  instanceNodeId,
  secondaryLocaleId,
  propertyTranslations
) {
  // Update component instance property overrides on a specific page
  const instanceUpdates = {
    nodes: [\
      {\
        nodeId: instanceNodeId,\
        propertyOverrides: Object.entries(propertyTranslations).map(\
          ([propertyId, text]) => ({\
            propertyId,\
            text,\
          })\
        ),\
      },\
    ],
  };

  await client.pages.updateStaticContent(pageId, {
    localeId: secondaryLocaleId,
    nodes: instanceUpdates.nodes,
  });
}
```

## Best practices

- **Preserve HTML structure** \- Always maintain `data-w-id` attributes in HTML content. These identifiers preserve custom styling, animations, and links across locales. Example:

```
// Original: "<p>Price: <span data-w-id=\"b310743e-a1ac-8409-c039-d3b594afb816\">$10</span></p>"
// Localized: "<p>Precio: <span data-w-id=\"price-123\">$10</span></p>"
```

- **Batch operations** \- Update multiple properties or nodes in single requests when possible (up to 1000 nodes per request)
- **Pagination** \- Use `limit` and `offset` parameters in GET requests to retrieve all nodes/properties for components with extensive content
- **Content inheritance** \- Only update content that needs localization; unchanged content inherits from the primary locale
- **Test in Webflow** \- Verify localized content displays correctly across all component instances in Webflow. Refresh the canvas to see API changes reflected

## FAQ

###### What's the difference between component definition and instance localization?

Component definition localization affects all the base static content that
lives in each instance of that component across your site, while instance
localization only affects the specific component instance on a particular
page through property overrides.

###### Can I localize read-only components?

No, read-only components (like those from Workspace Libraries) can’t be
updated via the APIs. These components are marked with `readonly: true` in
the List Components response.

###### Do component property updates affect existing instances?

Yes, updating component definition property defaults affects all instances
that don’t have property overrides for those specific properties. Instances
with overrides maintain their custom values and won’t be affected by changes
to the component definition.

###### Why are some component instances missing from page content?

In the primary locale, all component instances appear in the Get Page
Content response. In secondary locales, only component instances with
property overrides are included, providing a focused view of customized
content that differs from the default component definition.

###### Can I update both static content and properties in one request?

No, static content and properties require separate API calls. Use the Update
Component Content endpoint for static content and Update Component
Properties for property values.

###### What happens if I don't preserve data-w-id attributes?

If you omit `data-w-id` attributes when updating HTML content, you may lose
custom attributes or links that were applied to those elements in Webflow.
Always preserve these identifiers exactly as they appear in the original
content.

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