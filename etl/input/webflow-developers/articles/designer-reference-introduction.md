---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/introduction
title: "Introduction | Webflow Developer Documentation"
published: 2025-11-17
---

Your browser does not support HTML video.

Webflow’s Designer APIs let you build apps that programmatically control the Webflow Designer. With these APIs, developers can create tools that automatically add elements to pages, apply styles, manage components, and streamline design workflows.

## Getting started

To start using the Designer APIs, [register a Webflow App](https://developers.webflow.com/data/docs/getting-started-apps) and create a [Designer Extension](https://developers.webflow.com/designer/docs/getting-started-designer-extensions) using the [Webflow CLI.](https://developers.webflow.com/designer/reference/webflow-cli) Once you have your Designer Extension running locally on a Webflow project, you can start using the Designer APIs to create elements, styles, components, and more.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/App.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/App.svg)](https://developers.webflow.com/designer/docs/getting-started-designer-extensions)

[Create your first extension](https://developers.webflow.com/designer/docs/getting-started-designer-extensions)

[Follow our step-by-step guide to build and deploy your first Designer Extension](https://developers.webflow.com/designer/docs/getting-started-designer-extensions) [Create a Designer Extension](https://developers.webflow.com/designer/docs/getting-started-designer-extensions)

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/PublishDesigner.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/PublishDesigner.svg)\\
\\
Try the interactive playground\\
\\
Experiment with live API calls in our interactive playground environment\\
\\
Test the API playground](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

## Working with the Designer APIs

The Designer APIs provide several objects and methods that give Apps control over the Webflow Designer. Each object serves a specific purpose and contains methods to help you design automated workflows for teams working in Webflow.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Grid.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Grid.svg)\\
\\
Elements\\
\\
Create and manipulate elements on the canvas, including their properties, content, and styles.](https://developers.webflow.com/designer/reference/elements-overview) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Styles.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Styles.svg)\\
\\
Styles\\
\\
Manage reusable CSS classes to control the visual appearance of elements across your site.](https://developers.webflow.com/designer/reference/styles-overview) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Components.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Components.svg)\\
\\
Components\\
\\
Create and modify reusable element groups to maintain consistency across your designs.](https://developers.webflow.com/designer/reference/components-overview) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Variable.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Variable.svg)\\
\\
Variables\\
\\
Define and manage global values for numbers, percentages, sizes, colors, and fonts.](https://developers.webflow.com/designer/reference/variables-overview) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/PageBuilding.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/PageBuilding.svg)\\
\\
Pages\\
\\
Manage page properties, SEO settings, and site structure.](https://developers.webflow.com/designer/reference/pages-overview) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/ToolNut.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/ToolNut.svg)\\
\\
Extension Utilities\\
\\
Utility methods to manage your extension’s behavior and interaction with the Designer.](https://developers.webflow.com/designer/reference/extension-utilities)

## How the Designer APIs work in Webflow

Designer APIs are client-side JavaScript APIs that execute in the browser via an iframe. They interact with Webflow just as a user would - creating elements, applying styles, and modifying properties. This client-side approach allows your apps to directly manipulate the Designer interface in real-time, creating a seamless integration between your code and the Webflow environment.

To work with objects in your Webflow project, you’ll need to reference the object using an appropriate method, and then make changes using the available methods.

###### Referencing objects

###### Modifying objects

- **Existing Objects:** Get an existing object using an appropriate **GET** method. For example, to get the currently selected element, you can use the [`webflow.getSelectedElement()`](https://developers.webflow.com/designer/reference/get-selected-element) method. You can see all the methods available for retrieving objects in the [Designer API Reference](https://developers.webflow.com/designer/reference/elements-overview).

- **New Objects:** Create a new object using an appropriate **CREATE** method. When you create a new object, Webflow will always return a reference to the new object. For example, to create a new element, you can use the [`element.after()`](https://developers.webflow.com/designer/reference/insert-element-after) method. You can see all the methods available for creating objects in the [Designer API Reference](https://developers.webflow.com/designer/reference/elements-overview).

![Getting a reference to a resource](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/26ae3a1-Getting_a_reference_to_a_resource.png)

`webflow.getSelectedElement()` returns a reference to the currently selected element.

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