---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/pages-and-components/pages/update-page-settings
title: "Update Page Metadata | Webflow Developer Documentation"
published: 2025-11-17
---

Update Page-level metadata, including SEO and Open Graph fields.

Required scope \| `pages:write`

### Authentication

AuthorizationBearer

Bearer authentication of the form `Bearer <token>`, where token is your auth token.

### Path Parameters

page\_idstringRequired`format: "objectid"`

Unique identifier for a Page

### Query Parameters

localeIdstringOptional

Unique identifier for a specific Locale.

[Lear more about localization.](https://developers.webflow.com/data/v2.0.0/docs/working-with-localization)

### Request

This endpoint expects an object.

titlestringOptional

Title for the page

slugstringOptional

Slug for the page.

**Note:** Updating slugs in secondary locales is only supported in [Advanced and Enterprise localization add-on plans.](https://webflow.com/localization)

seoobjectOptional

SEO-related fields for the Page

Show 2 properties

openGraphobjectOptional

Open Graph fields for the Page

Show 4 properties

### Response

Request was successful

idstring`format: "objectid"`

Unique identifier for the Page

siteIdstring or null`format: "objectid"`

Unique identifier for the Site

titlestring or null

Title of the Page

slugstring or null

slug of the Page (derived from title)

parentIdstring or null`format: "objectid"`

Identifier of the parent folder

collectionIdstring or null`format: "objectid"`

Unique identifier for a linked Collection, value will be null if the Page is not part of a Collection.

createdOnstring or null`format: "date-time"`

The date the Page was created

lastUpdatedstring or null`format: "date-time"`

The date the Page was most recently updated

archivedboolean or nullDefaults to `false`

Whether the Page has been archived

draftboolean or nullDefaults to `false`

Whether the Page is a draft

canBranchboolean or nullDefaults to `false`

Indicates whether the Page supports [Page Branching](https://university.webflow.com/lesson/page-branching). Pages that are already branches cannot be branched again.

isBranchboolean or nullDefaults to `false`

Indicates whether the Page is a Branch of another Page [Page Branching](https://university.webflow.com/lesson/page-branching)

branchIdstring or null`format: "objectid"`

If the Page is a Branch of another Page, this is the ID of the Branch

seoobject or null

SEO-related fields for the Page

Show 2 properties

openGraphobject or null

Open Graph fields for the Page

Show 4 properties

localeIdstring or null`format: "objectid"`

Unique ID of the page locale

publishedPathstring or null

Relative path of the published page URL

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