---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/121724
title: "Enhanced extension management and variable types | Webflow Developer Documentation"
published: 2025-11-17
---

[December 17, 2024](https://developers.webflow.com/designer/121724)

## [Enhanced extension management and variable types](https://developers.webflow.com/designer/121724)

In this release, the Designer API introduces key enhancements to improve extension lifecycle management and expand the types of variables available in the Designer.

## Extension management

Programmatically close extensions and access contextual launch information

- **[`webflow.closeExtension()`](https://developers.webflow.com/designer/reference/close-extension)**

Close the current extension. This enables more control over the extension lifecycle and user experience flows.

- **[`webflow.getLaunchContext()`](https://developers.webflow.com/designer/reference/get-launch-context)**

Retrieve initialization context information when an extension is launched. This method provides critical data about how the extension was activated, whether through an [App Intent, App Connection](https://developers.webflow.com/designer/reference/app-intents-and-connections), or [deep link](https://developers.webflow.com/apps/deep-linking).

## Variable system enhancements

Create and manage **percentage** and **number** variables for more flexible design systems

- **[`webflow.createPercentageVariable(options)`](https://developers.webflow.com/designer/reference/create-percentage-variable)**

Create percentage-based variables for responsive design values such as opacity levels, width/height constraints, or other proportional measurements.

- **[`webflow.createNumberVariable(options)`](https://developers.webflow.com/designer/reference/create-number-variable)**

Create numeric variables for values that require precise control without measurement units, such as animation iterations, z-index values, or quantity indicators.

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