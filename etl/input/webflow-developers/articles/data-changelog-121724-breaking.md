---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/121724-breaking
title: "Breaking changes in JavaScript SDK: December 17, 2024 release | Webflow Developer Documentation"
published: 2025-11-17
---

[December 16, 2024](https://developers.webflow.com/data/changelog/121724-breaking)

## [Breaking changes in JavaScript SDK: December 17, 2024 release](https://developers.webflow.com/data/changelog/121724-breaking)

This document outlines the breaking changes introduced in the [December 17, 2024 release](https://developers.webflow.com/data/changelog/121724) of the Webflow Data API and JavaScript SDK. Review these changes carefully as they may require updates to your existing implementations.

## Breaking changes in JavaScript SDK

These changes require updates to existing code if you’re using the JavaScript SDK. Review and update your implementation to ensure compatibility.

### Collection management

- **Changed method name for deleting collections**

```
// Old
client.collections.deleteCollection()

// New
client.collections.delete(collectionId)
```

- **New method for deleting collection fields**

```
client.collections.deleteField(collectionId, fieldId)
```

### CMS item creation

- **Changed:**`client.collections.createItems()` replaces previous methods
- **Removed:**`client.collections.createItemForMultipleLocales()`

### Pages localization

- **Changed parameter name:** The `locale` query parameter is now `localeId`

## Migration guide

### Deleting collection items

If you’re using the existing collection deletion method, update your code to use the new method name:

Delete collection item

```
// Before
await client.collections.deleteCollection(collectionId);

// After
await client.collections.delete(collectionId);
```

### Collection item creation

Replace any usage of the deprecated methods with the new unified method:

Create collection item

```
// Before (deprecated)
await client.collections.createItemForMultipleLocales(collectionId, {
  localeIds: [primaryCmsLocaleId, secondaryCmsLocaleId],
  // other params
});

// After
await client.collections.items.createItems(collectionId, {
  cmsLocaleIds: [primaryCmsLocaleId, secondaryCmsLocaleId],
  isArchived: false,
  isDraft: false,
  fieldData: {
    // your fields here
  },
});
```

### Page localization

Update any code that queries localized pages to use the new parameter name:

Page localization

```
// Before
const pages = await client.pages.list({ locale: "507f1f77bcf86cd799439011" });

// After
const pages = await client.pages.list({ localeId: "507f1f77bcf86cd799439011" });
```

If you encounter any issues with these changes, please [contact our support team](https://webflow.com/dashboard/support) for assistance.

## SDK improvements

- **Type improvements**
  - Removed requirement for `id` in request payloads when creating resources
  - `fieldData` type in CMS Items now allows arbitrary key/value pairs, supporting custom fields
- **Flexible CMS item creation**
The SDK now allows creation of CMS items with custom fields without requiring type updates

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