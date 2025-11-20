---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/2024/2/21
title: "Localization support, site activity logs and content management improvements | Webflow Developer Documentation"
published: 2025-11-17
---

[February 21, 2024](https://developers.webflow.com/data/changelog/2024/2/21)

## [Localization support, site activity logs and content management improvements](https://developers.webflow.com/data/changelog/2024/2/21)

Webflow’s Data API now supports [localization features](https://university.webflow.com/lesson/localization-overview?topics=localization), allowing you to create, manage, and retrieve content in multiple languages through the API. This enables you to build multilingual applications and automation workflows.

### Key localization features

- **Site locale information**

Get detailed information about all available site locales, including primary and secondary languages

- **Locale-specific page content**

Retrieve and update page content for specific language variants

- **Localized CMS content**

Access and modify CMS items across multiple language versions

### Updated endpoints with localization support

#### Site endpoints

The following endpoints now include `locale` information with primary and secondary locale settings:

- **[Get sites list](https://developers.webflow.com/data/reference/sites/list)** and **[Get site details](https://developers.webflow.com/data/reference/sites/get)**

Response example

```
{
    "locale": {
      "primary": {
        "id": "en-US",
        "cmsLocaleId": "uuid-for-primary-locale",
        "displayName": "English (United States)",
        "enabled": true,
        "subdirectory": ""
      },
      "secondary": [\
        {\
          "id": "es",\
          "cmsLocaleId": "uuid-for-secondary-locale",\
          "displayName": "Spanish",\
          "enabled": true,\
          "subdirectory": "/es"\
        }\
      ]
    }
}
```

#### Page endpoints

These endpoints now support the `locale` query parameter to work with language-specific pages:

- **[Get page metadata](https://developers.webflow.com/data/reference/pages/get-metadata)** and **[List site pages](https://developers.webflow.com/data/reference/pages/list)**

#### CMS item endpoints

These endpoints now support the `cmsLocaleIds` parameter to filter and manage content by language:

- **[List CMS items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/list-items)**
- **[Get CMS item](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/get-item)**
- **[Update CMS item](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/update-item)**

CMS locale IDs (`cmsLocaleId`) are different from site locale identifiers. You can find the `cmsLocaleId` for each language in the Sites response.

## Site activity logs

Monitor site activity with the [Get site activity logs](https://developers.webflow.com/data/reference/enterprise/site-activity/list) endpoint.

- **[Get site activity logs](https://developers.webflow.com/data/reference/enterprise/site-activity/list)**

Track changes made to your site by team members

## Page content management

New endpoints for more granular control over page content and metadata:

- **[Get](https://developers.webflow.com/data/reference/pages/get-content) and [Update](https://developers.webflow.com/data/reference/pages/update-static-content) page content**

Work with the DOM structure of pages

- **[Update page metadata](https://developers.webflow.com/data/reference/pages/update-page-settings)**

Modify page settings

## Asset management

- **[Update asset](https://developers.webflow.com/data/reference/assets/assets/update)**

Modify asset properties

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