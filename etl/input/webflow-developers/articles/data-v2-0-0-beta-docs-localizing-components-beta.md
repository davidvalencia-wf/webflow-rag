---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/docs/localizing-components-beta
title: "Localizing Components (Beta) | Webflow Developer Documentation"
published: 2025-11-17
---

##### Beta Feature

This feature is currently in beta and may be subject to changes. During the beta phase, some functionality might be limited or unstable. Please use it with caution in production environments and provide feedback to help us improve.

## What are Components?

Components in Webflow empower you to create reusable and customizable blocks from various elements to help maintain a consistent, efficient, and scalable design workflow. Using the Localization APIs for components, teams can ensure the design of components remain consistent, while ensuring their translations are suited for a specific locale.

Below, we’ll quickly cover the key concepts of components in Webflow. For a more detailed understanding, [visit Webflow University](https://university.webflow.com/lesson/components?topics=layout-design).

## Component definitions, instances, and properties

### Component definition

The component definition is the blueprint for a component. It establishes the foundational structure of the elements within the component, as well as properties that can be further defined in a component instance. Any modifications made to the component definition will propagate and automatically update all associated component instances. This ensures consistency across instances while allowing for centralized changes.

### Component instance

A component instance is a single instantiation of the component definition. While it retains the core design and structure of the definition, each instance can be [customized through component properties](https://university.webflow.com/lesson/components?topics=layout-design#how-to-define-component-properties).

### Component properties

Component properties, or “props,” in Webflow define the customizable elements of a component, such as text, images, or links. While designers can provide default values for props, they can also be overridden in a component instance without changing the original component definition.

These properties can be modified across locales, enabling seamless translation of your site into different languages. This flexibility allows you to create unique, localized variations of a component across different pages or sections, maintaining consistency while adapting to specific needs of a locale.

## Localizing Components in Webflow

When it comes to localizing components in Webflow, you have two approaches based on your preferences and specific needs:

1. **Localize a Component Definition**
This approach is more suitable for commonly used components, like Navbars and Footers, that will appear throughout the localized version of your site. By localizing properties at the component definition level, you ensure consistency across all instances, making it easier to manage and update as needed.
2. **Localize a Component Instance**
This method is ideal for components that are used in varied contexts, such as Hero Sections, Testimonials, and Call-to-Action Buttons. By localizing each instance individually, you can customize the content to meet specific needs and contexts, ensuring that it resonates with local audiences.

###### Localize Component Definition

For frequently used components or those whose content remains consistent, localizing the component definition is the most effective approach. This method ensures that any changes made to the component’s properties will automatically propagate to all instances, maintaining uniformity across your site while streamlining localization efforts.

### Step 1: Identify Components to Localize

Start by identifying the main components you want to localize. You can obtain a comprehensive list of all components available on your site by calling the [List Components endpoint](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/list). This endpoint provides details about each component, including its ID, name, group, and description.

**Example Response**

JSON

```
{
  "components": [\
    {\
      "id": "6596da6045e56dee495bcbba",\
      "name": "Primary Button",\
      "group": "Buttons",\
      "description": "A default button component that can be used across the site"\
    },\
    {\
      "id": "658205daa3e8206a523b5ad4",\
      "name": "Secondary Button",\
      "group": "Buttons",\
      "description": "A secondary button component that can be used across the site"\
    },\
    {\
      "id": "6258612d1ee792848f805dcf",\
      "name": "Card",\
      "group": null,\
      "description": null\
    },\
    {\
      "id": "68a2b1d1ee792848f805dcf",\
      "name": "Nav",\
      "group": null,\
      "description": null,\
      "readonly": true\
    }\
  ],
  "pagination": {
    "limit": 20,
    "offset": 0,
    "total": 4
  }
}
```

**Understanding the component object**
Each component object contains the following properties:

- `id`: A unique identifier for the component.
- `name`: The name of the component.
- `group`: The category to which the component belongs, which may be null.
- `description`: A user-defined explanation of the component’s purpose, which may be null.
- `readonly`: Indicates whether the component can be updated within the site. For example, components in Workspace Libraries are set to read-only.

### Step 2: Localizing Component Properties

To localize a component definition, you’ll primarily work with its properties. With the ID of your selected component, use the [Get Component Properties endpoint](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/get-properties) to get a list of the different properties that can be localized.

**Example Response**

```
{
  "componentId": "658205daa3e8206a523b5ad4",
  "properties": [\
    {\
      "id": "a245c12d-995b-55ee-5ec7-aa36a6cad623",\
      "label": "Title",\
      "type": "Plain Text",\
      "text": {\
        "html": null,\
        "text": "The Hitchhiker's Guide to the Galaxy"\
      }\
    },\
    {\
      "id": "a245c12d-995b-55ee-5ec7-aa36a6cad627",\
      "label": "Content",\
      "type": "Rich Text",\
      "text": {\
        "html": "<div><h3>Don't Panic!</h3><p>Always know where your towel is.</p></div>",\
        "text": null\
      }\
    }\
  ],
  "pagination": {
    "limit": 2,
    "offset": 0,
    "total": 2
  }
}
```

**Understanding the property object**
Each property object consists of the following fields:

- `id`: The unique identifier for the property.
- `label`: The display name of the property.
- `type`: The type of data.
- `text`: An object containing the text values:
  - `html`: The HTML representation of the content.
  - `text`: Plain text representation.

##### Viewing Component DOM

If you’d like to see the component’s DOM structure, you can use the [Get Component Content endpoint](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/get-content) to fetch the static content of the component, that cannot be localized through properties.

### Step 3: Updating Component property values in a secondary locale

Now that you have the properties of the component you wish to localize, you can translate the property values and use them as default values in your localized component definition.

To localize component property values in a secondary locale, we’ll need to make a post request to the [Update Component Properties endpoint](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/update-properties). Our request should include the following:

###### cURL Request

###### Parameters

CURL REQUEST

```
curl --request POST \
     --url 'https://api.webflow.com/beta/sites/65427cf400e02b306eaa049c/components/1fa6f97b-84f7-2db3-29cb-1275161e432f/properties?locale_id=65427cf400e02b306eaa04a0' \
     --header 'accept: application/json' \
     --header 'content-type: application/json' \
     --data '
{
  "properties": [\
    {\
      "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad623",\
      "text": "La guía del autoestopista galáctico"\
    },\
    {\
      "propertyId": "a245c12d-995b-55ee-5ec7-aa36a6cad627",\
      "text": "¡No entres en pánico!<p>Siempre sabe dónde está tu toalla.</p>"\
    }\
  ]
}
'
```

###### Localize Component Instances

For components that are repurposed to fit the specific needs of a page—such as custom landing pages, campaigns, or time-sensitive promotions—localizing a component instance is the right approach. This method allows you to overwrite default text and tailor the content to resonate with local audiences.

When localizing a component instance, you’ll make updates directly on the specific page where the instance appears, rather than modifying the component definition itself. **It’s important to note that while you’re managing the localized component properties, the default property values must have been overwritten in the primary locale to ensure consistency and relevance.**

### Step 1: Get Page Content of the Primary Locale

To begin localizing a component instance, you need to retrieve the page content of the primary locale using the [Get Page Content endpoint](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/pages/get-content). This endpoint returns details about every element that can be localized, now including component instances.

##### Overridden Properties

A component instance will only appear in the [Get Page Content response](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/pages/get-content) if its property values have been overridden from the default settings in the primary locale. The API response will include only these overridden properties, and will not return [static content of a component](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/get-content).

**Example Response**

JSON

```
{
  "id": "34a7a7db-656d-7f88-167b-408785df039f",
  "type": "component-instance",
  "componentId": "1fa6f97b-84f7-2db3-29cb-1275161e432f",
  "properties": [\
    {\
      "id": "ea72bc3f-05ad-603b-1c91-6c6d875d1379",\
      "text": {\
        "html": null,\
        "text": "Features"\
      }\
    },\
    {\
      "id": "c231a00f-3df8-ec07-15b7-86a4795541c4",\
      "type": "Plain Text",\
      "label": "Navbar link - Products",\
      "text": {\
        "html": null,\
        "text": "Products"\
      }\
    },\
    {\
      "id": "52be38f0-169b-8da1-63f8-951da106280a",\
      "type": "Plain Text",\
      "label": "Navbar link - Resources",\
      "text": {\
        "html": null,\
        "text": "Resources"\
      }\
    },\
    {\
      "id": "68924720-efbe-730d-eccf-47118e486009",\
      "type": "Plain Text",\
      "label": "Navbar link - Contact",\
      "text": {\
        "html": null,\
        "text": "Contact"\
      }\
    },\
    {\
      "id": "6644d791-c4b3-a065-35c5-053d194a759b",\
      "type": "Plain Text",\
      "label": "Button Text - Get Started",\
      "text": {\
        "html": null,\
        "text": "Get Started"\
      }\
    }\
  ]
}
```

**Component Instance Structure**
A component instance has a different structure compared to regular elements. Here are the main fields you’ll encounter:

- `id`: The element ID.
- `type`: The element type, which is component-instance.
- `componentId`: The ID of the component definition.
- `properties`: An array of all the overridden properties that can be localized. Each property object contains the following fields:
  - `id`: The property ID.
  - `type`: The property type (currently only text properties can be localized).
  - `label`: The property name as defined in the Component Definition.
  - `text`: An object containing the text and/or HTML of the property value. For now, the HTML value will always be null.

### Step 2: Update Page Content of the Secondary Locale

With the IDs of the nodes and component properties you wish to update, you can create a payload for the [Update Page Content endpoint](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/pages/update-static-content) to localize your content. This payload should include the `nodeId` of the component instance and an array of `properties` that need to be updated.

**Example Payload**

JSON

```
{
  "nodes": [\
    {\
      "nodeId": "1fa6f97b-84f7-2db3-29cb-1275161e432f",\
      "properties": [\
        {\
          "propertyId": "ea72bc3f-05ad-603b-1c91-6c6d875d1379",\
          "text": "Fonctionnalités"\
        },\
        {\
          "propertyId": "c231a00f-3df8-ec07-15b7-86a4795541c4",\
          "text": "Produits"\
        },\
        {\
          "propertyId": "52be38f0-169b-8da1-63f8-951da106280a",\
          "text": "Ressources"\
        },\
        {\
          "propertyId": "68924720-efbe-730d-eccf-47118e486009",\
          "text": "Contact"\
        },\
        {\
          "propertyId": "6644d791-c4b3-a065-35c5-053d194a759b",\
          "text": "Commencer"\
        }\
      ]\
    }\
  ]
}
```

In this example, we’ve only updated plain text properties. For other property types, ensure that the property value matches the expected type:

- Plain Text and Alt Text: `text: Hello World!`
- Rich Text: “text”: `<div><h1>Hello<em>World!</em></h1></div>`

### Step 3: Get Page Content of the Secondary Locale

Use the Get Page Content endpoint with the locale query parameter set to your secondary locale. This request will return the page content for that locale, including any localized changes to component instance properties.

## Conclusion

By following these steps, you can effectively localize components on a Webflow site. Keep in mind the current limitations regarding what can be localized and ensure your payload matches the property type requirements to avoid issues during the localization process.