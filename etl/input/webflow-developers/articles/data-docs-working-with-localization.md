---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/docs/working-with-localization
title: "Working with Localization APIs | Webflow Developer Documentation"
published: 2025-11-17
---

Webflow offers APIs that enable you to manage site content across different locales. Use the APIs to localize content for pages, components, and CMS items on your site.

For detailed information on enabling localization, see the [help center documentation](https://help.webflow.com/hc/en-us/articles/33961240752147-Localization-overview)

## Localizable content

Webflow supports the localization of text-based content across pages, components, and CMS items.

| Content Type | Scope | Description |
| --- | --- | --- |
| **Page Content** | Page-specific | Static text placed directly on a page. |
| **Component Overrides** | Page-specific | Custom property values applied to a single component instance. |
| **Component Property Defaults** | Site-wide | Default values for component properties. |
| **Component Static Content** | Site-wide | Fixed content that’s part of a component’s structure. |
| **CMS Items** | Site-wide | Content stored in the fields of a CMS Collection item. |

##### Data APIs do no support localizing images

Currently, the Data API doesn’t support localizing images. To localize images, you’ll need to update the image asset in the Webflow designer.

## Locales

When localizing a site, you’ll define different **locales** to support specific languages or language-region combinations. These locales will be used to present content to users in different geographical areas or cultural backgrounds.

Locales can be defined as either primary or secondary.

Primary locale

The default language for your site. **There can only be one primary locale per site.**

Secondary locale

Additional languages or regions for your site. The number of secondary locales you can have is limited by your Webflow plan.

## Locale identifiers

Once your locales are defined, you can retrieve the identifiers for each locale, which are needed for all requests to the Localization APIs. To get the identifiers, make a call to the [Get Site endpoint](https://developers.webflow.com/data/reference/sites/get).

#### Primary and secondary locales

The `primary` property contains a single locale object, while the `secondary` property contains an array of locale objects.

#### Locale properties

The locale object contains the following properties relevant to the localization APIs:

- **`id`**: The unique identifier of the locale.
- **`cmsLocaleId`**: The unique identifier of the locale for CMS operations.

To see all the properties of a locale, see the [Locale object](https://developers.webflow.com/data/reference/sites/get#locale) in the API reference.

GET

/v2/sites/:site\_id

cURL

```
curl https://api.webflow.com/v2/sites/580e63e98c9a982ac9b8b741 \
     -H "Authorization: Bearer <token>"
```

Get Site API response example

```
{
  ...
  "locales": {
    "primary": {
      "id": "653fd9af6a07fc9cfd7a5e57",
      "cmsLocaleId": "653ad57de882f528b32e810e",
      "tag": "en-US",
      ...
    },
    "secondary": [\
      {\
        "id": "653fd9af6a07fc9cfd7a5e56",\
        "cmsLocaleId": "653fd9af6a07fc9cfd7a5e5d",\
        "tag": "fr-FR",\
        ...\
      },\
      {\
        "id": "654112a3a525b2739d97664c",\
        "cmsLocaleId": "654112a3a525b2739d97664f",\
        "tag": "es-MX",\
        ...\
      },\
      ...\
    ]
  }
}
```

### Locale parameters and properties

When making requests to endpoints that support localization, provide the locale identifier as a query parameter or in the request body, depending on the endpoint. **If no locale identifier is provided, the request will return information from the primary locale.** These identifiers are both used as parameters in your requests and returned as properties in the response body to indicate when you’re working with locale-specific data:

- **`localeId`**: The unique identifier of the locale for pages and components.
- **`cmsLocaleId`**: The unique identifier of the locale for CMS operations.

###### Locale-specific endpoints

Some endpoints only support updating content in secondary locales. For these, you must provide the `localeId` parameter; otherwise, **requests to update primary locale content will fail.** These endpoints include:

- [Update page content](https://developers.webflow.com/data/reference/pages-and-components/pages/update-static-content)
- [Update component content](https://developers.webflow.com/data/reference/pages-and-components/components/update-content)

## Workflows

Localizing content in Webflow can be done across three main areas:

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/FileEdit.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/FileEdit.svg)\\
\\
Pages\\
\\
Static page content, metadata, and SEO settings](https://developers.webflow.com/data/docs/working-with-localization/localize-pages) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Components.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Components.svg)\\
\\
Components\\
\\
Reusable elements that can be customized with dynamic properties](https://developers.webflow.com/data/docs/working-with-localization/localize-components) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CMS.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CMS.svg)\\
\\
CMS\\
\\
Organized, dynamic content within collections](https://developers.webflow.com/data/docs/working-with-localization#cms-localization)

###### Pages

The page localization APIs enable you to localize the following content:

- **Static content** \- Text nodes, images, form elements, and component property overrides
- **Metadata** \- Page titles, SEO descriptions, and Open Graph descriptions
- **URLs** \- Locale-specific slugs and URL structures

[Learn how to localize pages](https://developers.webflow.com/data/docs/working-with-localization/localize-pages)

###### Components

Components are reusable design elements that contain static content, set in the component definition, and dynamic content, which can be customized with component properties.

When localizing components in a **secondary locale**, you can use two approaches:

- **Localize the component definition**: Modify a component’s definition to update its static content, default property values, and any nested components. These changes apply to all instances of the component for the specified locale.
- **Localize a component instance**: Override properties on a specific component instance on a page. This provides unique content for that instance without affecting the component’s definition or other instances.

### Example scenario

Consider a `Call-to-Action` component with a button that has the text property “Learn More.”

- **Definition localization**: To change the button text for all French-speaking users, you would update the component definition in the French locale. The button text in all `Call-to-Action` component instances on your French site would automatically change to “En savoir plus”

- **Instance localization**: On a specific landing page in the French locale, you might want a `Call-to-Action` button to have a unique message. You would override the text property on that component instance to “Découvrez nos offres spéciales.” This change would only apply to that single instance.

To understand the difference between definition localization and instance localization, see the [“Working with Components”](https://developers.webflow.com/data/docs/working-with-localization/localize-components) guide.

[Learn how to localize components](https://developers.webflow.com/data/docs/working-with-localization/localize-components)

###### Webflow CMS

The Webflow CMS enables you to manage and deliver dynamic content, and supports comprehensive content localization to scale content delivery for diverse audiences.

Key localization features include:

- **Localized Variants:** Items from your primary locale can have corresponding localized variants, all sharing a single, consistent ID.
- **Independent Publishing:** Publish localized content variants individually as needed.
- **Locale-Specific Items:** Create CMS items that exist solely within a specific locale, without a primary locale counterpart.

[Learn how to localize CMS items](https://developers.webflow.com/data/docs/working-with-localization/localize-cms-content)

## Glossary

- **Locale**: A specific language or language-region combination used to present content (e.g., `en-US` for English, `fr-FR` for French).
- **Primary Locale**: The default language version of your site. There can only be one primary locale. API requests default to this locale if no other is specified.
- **Secondary Locale**: Any additional language or regional version of your site content.
- **`localeId`**: The unique identifier for a locale, used when working with Pages and Components APIs.
- **`cmsLocaleId`**: The unique identifier for a locale, used specifically for CMS-related API operations.

## Frequently asked questions

###### What's the difference between localeId and cmsLocaleId?

`localeId` is used for localizing page and component content. `cmsLocaleId` is used exclusively for localizing CMS items. Both are retrieved from the [Get Site endpoint](https://developers.webflow.com/data/reference/sites/get).

###### Can I update primary locale content via the API?

Currently, API-based updates to page and component content are limited to secondary locales. Primary locale content for pages and components must be updated through the Webflow Designer. However, you can create and manage CMS item content in both primary and secondary locales via the API.

###### Can I localize styles and classes via the API?

No, styles and classes can’t be localized via the Data API. They’re managed through the Webflow Designer and aren’t supported by the Data API.

###### What happens if I don't provide a locale identifier in my API request?

If no locale identifier is specified, the API will default to the site’s primary locale for the request.

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