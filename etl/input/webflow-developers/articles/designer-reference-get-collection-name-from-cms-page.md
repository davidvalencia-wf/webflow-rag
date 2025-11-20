---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-collection-name-from-cms-page
title: "Get collection name from a CMS page | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.getCollectionName()`

Get the name of the collection that generated the collection-generated page.

### Syntax

```
page.getCollectionName(): Promise<string>
```

### Returns

**Promise<`string`>**

A promise that resolves to the name of the collection that generated the page.

### Example

```
try{
    // Get Current Page
    const currentPage = (await webflow.getCurrentPage()) as Page

    // Get Collection ID if page belongs to a collection
    const collectionName = await currentPage.getCollectionName()
    console.log(collectionName)
    }
catch (error) {
      console.error([error.message, error.cause.tag])
    }
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Error Handling

If the method fails to find a collection, the method will return an error with the following tag and message.

| Tag | Message |
| --- | --- |
| `ResourceMissing` | `Missing ${page.id}` |

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadPageSettings** | Any | Any | Any | Any |