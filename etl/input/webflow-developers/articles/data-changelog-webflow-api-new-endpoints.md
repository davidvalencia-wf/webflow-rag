---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/webflow-api-new-endpoints
title: "API v2: New endpoints | Webflow Developer Documentation"
published: 2025-11-17
---

[August 24, 2023](https://developers.webflow.com/data/changelog/webflow-api-new-endpoints)

## [API v2: New endpoints](https://developers.webflow.com/data/changelog/webflow-api-new-endpoints)

As part of the [Webflow Developer Platform updates](https://webflow.com/updates/developer-platform-updates) launched on August 29th, 2023, Webflow released version 2 of the Data API with new endpoints. Here’s what’s new:

## CMS endpoints

- **[Create Collection Field](https://developers.webflow.com/data/reference/cms/collection-fields/create)** \| `POST``/collections/{collection_id}/fields`

Create a new field in an existing collection.

- **[Delete Collection Field](https://developers.webflow.com/data/reference/cms/collection-fields/delete)** \| `DELETE``/collections/{collection_id}/fields/{field_id}`

Remove a field from a collection.

- **[Update Collection Field](https://developers.webflow.com/data/reference/cms/collection-fields/update)** \| `PATCH``/collections/{collection_id}/fields/{field_id}`

Modify an existing field in a collection.

- **[Create Collection](https://developers.webflow.com/data/reference/cms/collections/create)** \| `POST``/sites/{site_id}/collections`

Create a new collection for a site.

## Pages endpoints

- **[List Pages](https://developers.webflow.com/data/reference/pages-and-components/pages/list)** \| `GET``/sites/{site_id}/pages`

Get a list of all pages for a site.

- **[Get Page Metadata](https://developers.webflow.com/data/reference/pages-and-components/pages/get-metadata)** \| `GET``/pages/{page_id}`

Retrieve metadata for a specific page.

## Custom Code endpoints

- **[Get Registered Scripts](https://developers.webflow.com/data/reference/custom-code/custom-code/list)** \| `GET``/sites/{site_id}/registered_scripts`

List all registered scripts for a site.

- **[Register Inline Custom Code](https://developers.webflow.com/data/reference/custom-code/custom-code/register-inline)** \| `POST``/sites/{site_id}/registered_scripts/inline`

Register new inline custom code to a site.

- **[Register Hosted Custom Code](https://developers.webflow.com/data/reference/custom-code/custom-code/register-hosted)** \| `POST``/sites/{site_id}/registered_scripts/hosted`

Register externally hosted custom code to a site.

- **[Add Custom Code to Site](https://developers.webflow.com/data/reference/custom-code/custom-code-sites/upsert-custom-code)** \| `PUT``/sites/{site_id}/custom_code`

Add custom code to an entire site.

- **[Add Custom Code to Page](https://developers.webflow.com/data/reference/custom-code/custom-code-pages/upsert-custom-code)** \| `PUT``/pages/{page_id}/custom_code`

Add custom code to a specific page.

## Assets endpoints

- **[List Assets](https://developers.webflow.com/data/reference/assets/assets/list)** \| `GET``/sites/{site_id}/assets`

Get a list of all assets for a site.

- **[Create Asset Metadata](https://developers.webflow.com/data/reference/assets/assets/create)** \| `POST``/sites/{site_id}/assets`

Create metadata for a new asset.

- **[Delete Asset](https://developers.webflow.com/data/reference/assets/assets/delete)** \| `DELETE``/assets/{asset_id}`

Remove an asset from a site.

- **[List Asset Folders](https://developers.webflow.com/data/reference/assets/asset-folders/list-folders)** \| `GET``/sites/{site_id}/asset_folders`

Get a list of all asset folders for a site.

- **[Create Asset Folder](https://developers.webflow.com/data/reference/assets/asset-folders/create-folder)** \| `POST``/sites/{site_id}/asset_folders`

Create a new asset folder for a site.

- **[Get Asset Folder](https://developers.webflow.com/data/reference/assets/asset-folders/get-folder)** \| `GET``/asset_folders/{asset_folder_id}`

Retrieve information about a specific asset folder.

## Forms endpoints

- **[List Forms](https://developers.webflow.com/data/reference/forms/forms/list)** \| `GET``/sites/{site_id}/forms`

Get a list of all forms for a site.

- **[Get Form Schema](https://developers.webflow.com/data/reference/forms/forms/get)** \| `GET``/forms/{form_id}`

Retrieve the schema for a specific form.

- **[List Form Submissions](https://developers.webflow.com/data/reference/forms/form-submissions/list-submissions)** \| `GET``/forms/{form_id}/submissions`

Get a list of all submissions for a specific form.

- **[Get Form Submission](https://developers.webflow.com/data/reference/forms/form-submissions/get-submission)** \| `GET``/form_submissions/{form_submission_id}`

Retrieve details about a specific form submission.

- **[Modify Form Submission](https://developers.webflow.com/data/reference/forms/form-submissions/update-submission)** \| `PATCH``/form_submissions/{form_submission_id}`

Update information for a specific form submission.

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