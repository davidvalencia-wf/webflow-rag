---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/structure/page-structure
title: "Page Structure | Webflow Developer Documentation"
published: 2025-11-17
---

## Page Structure

The Webflow CSS Framework uses a semantic and component-based layout system. Here’s a typical page layout using semantic tags:

Page – tag: `Body`, selector: Body (All Pages)

Navigation – tag: `nav`, class: nav

Section – tag: `section`, class: section

Container – tag: `div`, class: container

Layout – e.g., grid, flex, card

Footer – tag: `footer`, class: footer

**Page structure**

* * *

## Section

Sections are the core layout blocks of a page. Each section must use the semantic `Section` tag, which can be set in the Webflow Settings Panel.

![Settings pannel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/flowkit/pages/v2/page-structure/flowkit_settings.webp)

### Variations

The main class section sets the section’s structure and default padding. Variations are applied with combo classes to adjust background and font colors.
Combo classes follow the pattern: sectionis-secondary

- sectionis-secondary
- sectionis-accent-primary
- sectionis-accent-secondary
- sectionis-accent-tertiary
- sectionis-inverse

### Padding

The section class includes vertical padding by default. Use utilities to adjust:

| Utility Class | Description |
| --- | --- |
| padding\_none | Removes top & bottom spacing |
| padding-vertical\_small | Sets vertical spacing to small |
| padding-top\_none, padding-bottom\_small | Fine-tuned vertical control |

* * *

## Container

The container class centers content and applies a max-width with internal horizontal padding. It ensures consistent alignment across all layouts.

These combo classes adjust the width:

| Class Example | Description |
| --- | --- |
| container | Default max width (standard layout) |
| containeris-full-width | Stretches full width (edge-to-edge) |
| containeris-large | Larger max width |
| containeris-small | Smaller max width for narrow layouts |

### Padding Control

Adjust internal padding using utility classes:

- padding-horizontal\_none — removes side padding

* * *

## Navigation

The navigation bar uses the semantic `nav` tag and a base class Nav.

Navigation adapts to the background color using combo classes:

- navis-accent-primary
- navis-accent-secondary
- navis-accent-tertiary
- navis-inverse
- navis-secondary

* * *

Footer uses `footer` semantic tag and class Footer.

Footer also adapts to the background color using combo classes:

- footeris-secondary
- footeris-inverse
- footeris-accent-primary
- footeris-accent-secondary
- footeris-accent-tertiary

Every footer variation has a combo class for a footer link footer\_linkon-inverse or on-accent-primary etc.

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