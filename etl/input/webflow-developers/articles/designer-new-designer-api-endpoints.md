---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/new-designer-api-endpoints
title: "Support for Components & Variables | Webflow Developer Documentation"
published: 2025-11-17
---

[October 5, 2023](https://developers.webflow.com/designer/new-designer-api-endpoints)

## [Support for Components & Variables](https://developers.webflow.com/designer/new-designer-api-endpoints)

We’re excited to announce the expansion of Webflow’s Designer API with comprehensive support for Components and Variables. This release introduces a suite of new endpoints that empower developers to implement component-based architecture and manage design systems through variable collections. These capabilities enable programmatic creation, modification, and management of components, alongside the ability to define and control design tokens such as colors, typography, and spacing variables.

## Feature highlights

- **Component creation and management** \- Create, register, and manipulate components programmatically
- **Variable collections** \- Work with design variables to maintain consistency across your projects
- **Component navigation** \- Enter and exit component instances during development

## New endpoints

### Element methods

- **[`webflow.getRootElement()`](https://developers.webflow.com/designer/reference/get-root-element)**

Access the root element of the current context, enabling traversal of the element tree.

### Component methods

- **[`webflow.getAllComponents()`](https://developers.webflow.com/designer/reference/get-components)**

Retrieve all components available in the current project.

- **[`webflow.registerComponent(name, element)`](https://developers.webflow.com/designer/reference/create-component-definition)**

Register a new component with the specified name and root element.

- **[`webflow.unregisterComponent(component)`](https://developers.webflow.com/designer/reference/delete-component-definition)**

Remove a component from the registry.

- **[`webflow.enterComponent(instance)`](https://developers.webflow.com/designer/reference/enter-component)**

Enter a component instance to make edits to its structure.

- **[`webflow.exitComponent()`](https://developers.webflow.com/designer/reference/exit-component)**

Exit the current component context.

- **[`webflow.createInstance(component)`](https://developers.webflow.com/designer/reference/create-component-instance)**

Create a new instance of a component.

- **[`component.getName()`](https://developers.webflow.com/designer/reference/get-component-name)**

Get the name of a component.

- **[`component.setName(name)`](https://developers.webflow.com/designer/reference/set-component-name)**

Change the name of a component.

### Variables and collections

- **[`webflow.getDefaultVariableCollection()`](https://developers.webflow.com/designer/reference/get-default-variable-collection)**

Access the default variable collection for the current project.

- **[`collection.getName()`](https://developers.webflow.com/designer/reference/get-collection-name)**

Get the name of a variable collection.

- **[`collection.getVariable(id)`](https://developers.webflow.com/designer/reference/get-variable)**

Retrieve a variable by its unique identifier.

- **[`collection.getVariableByName(name)`](https://developers.webflow.com/designer/reference/get-variable-by-name)**

Retrieve a variable by its name.

- **[`collection.getAllVariables()`](https://developers.webflow.com/designer/reference/get-all-variables)**

Get all variables in a collection.

- **[`variable.getName()`](https://developers.webflow.com/designer/reference/get-variable-name)**

Get the name of a variable.

- **[`variable.setName(newName)`](https://developers.webflow.com/designer/reference/set-variable-name)**

Change the name of a variable.

- **[`variable.set(value)`](https://developers.webflow.com/designer/reference/set-variable-value)**

Set the value of a variable.

- **[`variable.get()`](https://developers.webflow.com/designer/reference/get-variable-value)**

Get the current value of a variable.

- **[`variable.remove()`](https://developers.webflow.com/designer/reference/remove-variable)**

Remove a variable from its collection.

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