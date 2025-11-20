---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/v1.0.0/structure/page-structure
title: "Page Structure | Webflow Developer Documentation"
published: 2025-11-17
---

## Page Structure

The Webflow CSS Framework uses a semantic and component-based layout system. Here’s a typical page layout using semantic tags:

Page – Tag: `Body`, Selector: Body (All Pages)

Navigation – Tag: `nav`, Selector: Nav Menu

Section – Tag: `section`, Selector: Section

Container – Tag: `div`, Selector: Container

Layout – e.g., Grid, Flex, Card

Footer – Tag: `footer`, Selector: Footer

Page structure:

* * *

## Section

Sections are the core layout blocks of a page. Each section must use the semantic `Section` tag, which can be set in the Webflow Settings Panel.

![Settings pannel](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/flowkit/pages/v1/page-structure/flowkit_settings.webp)

### Variations

The main class Section sets the section’s structure and default padding. Variations are applied with combo classes to adjust background and font colors.
Combo classes follow the pattern: Section`Variation Name` Section

- SectionSecondary Section
- SectionAccent Primary Section
- SectionAccent Secondary Section
- SectionAccent Tertiary Section
- SectionInverse Section

### Padding

The Section class includes vertical padding by default. Use utilities to adjust:

| Utility Class | Description |
| --- | --- |
| \[Utility\] Padding 0 | Removes top & bottom spacing |
| \[Utility\] Padding Vertical 2rem | Sets vertical spacing to 2rem |
| \[Utility\] Padding Top 0, \[Utility\] Padding Bottom 2rem | Fine-tuned vertical control |

* * *

## Container

The Container class centers content and applies a max-width with internal horizontal padding. It ensures consistent alignment across all layouts.

These combos classes adjust the width:

| Class Example | Description |
| --- | --- |
| Container | Default max width (standard layout) |
| ContainerFull Width Container | Stretches full width (edge-to-edge) |
| ContainerLarge Container | Larger max width |
| ContainerSmall Container | Smaller max width for narrow layouts |

### Padding Control

Adjust internal padding using utility classes:

- \[Utility\] Padding Horizontal 0 — removes side padding

* * *

## Navigation

The navigation bar uses the semantic `nav` tag and a base class Nav.

Navigation is adopting to the background color using combo classes:

- NavAccent Primary Nav
- NavAccent Secondary Nav
- NavAccent Tertiary Nav
- NavInverse Nav
- NavSecondary Nav

* * *

Footer uses `footer` semantic tag and class Footer.

Footer aslo adopting to the background color using combo classes:

- FooterSecondary Footer
- FooterInverse Footer
- FooterAccent Primary Footer
- FooterAccent Secondary Footer
- FooterAccent Tertiary Footer

Every footer variation has a combo class for a footer link Footer Link`Surface Name` Footer Link

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

[Webflow Data API V1 is deprecated. Please view the V2 version of our API reference](https://developers.webflow.com/data/reference/rest-introduction)