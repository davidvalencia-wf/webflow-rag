---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/2/5
title: "Support for additional well-known files and CMS field types | Webflow Developer Documentation"
published: 2025-11-17
---

[February 5, 2025](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/2/5)

## [Support for additional well-known files and CMS field types](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/2/5)

## Add and manage well-known files

[Upload well-known files to sites](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/well-known-files/put) with the following requirements:

- File size must be less than 100KB per file
- Maximum of 30 files total
- Files must have one of these extensions (or no extension):
  - `.txt`
  - `.json`
  - `.noext` \- A special extension that removes other extensions when uploaded. This helps compatibility with tools that require file extensions

    **Example:**`apple-app-site-association.noext.txt` will be uploaded as `apple-app-site-association`

## New CMS field type: Option

- **[Create Option fields](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-fields/create)**

Option fields let you define a predefined list of choices for a collection item. You can add these fields either when creating a new collection via the [create collection](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collections/create) endpoint or add them to existing collections using the [create collection field](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-fields/create) endpoint.