---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/variable-collections-overview
title: "Variable collections | Webflow Developer Documentation"
published: 2025-11-17
---

Variable collections provide an organizational structure for managing related variables. Collections allow you to group variables logically - for example, you might create separate collections for brand colors, typography, or spacing variables. Collections help maintain a clean and organized variable system, making it easier to manage design tokens at scale across your projects.

## Creating a collection

Create a collection using the [create variable collection](https://developers.webflow.com/designer/reference/create-variable-collection) endpoint.

```
// Create a collection
const collection = await webflow.createVariableCollection('Brand Styles')
```

## Selecting a collection

Select a collection in multiple ways. Either, get all collections or get a specific collection by name or ID.

```
// Get all collections
const collections = await webflow.getAllVariableCollections()

// Get a collection by ID
const collection = await webflow.getVariableCollectionById('collection-4a393cee-14d6-d927-f2af-44169031a25')
```

## Working with variables

Once a collection is selected, you can use the collection methods to [create, retrieve, and manage variables](https://developers.webflow.com/designer/reference/variables-overview).

```
// Get collection
const collection = await webflow.getDefaultVariableCollection()

// Create a variable
const variable = await collection?.createColorVariable('primary', 'red')

// Get all variables
const variables = await collection?.getAllVariables()
```