---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/structure/grid
title: "Grid layout | Webflow Developer Documentation"
published: 2025-11-17
---

## Grid system

The grid system provides a flexible layout foundation using CSS Grid. Basic grid classes come with built-in responsive behavior that automatically adjusts the layout based on screen size.

### Basic grid classes

Basic grid classes with base column configurations:

- grid\_1-col
- grid\_2-col
- grid\_3-col
- grid\_4-col
- grid\_5-col
- grid\_6-col
- grid\_9-col
- grid\_12-col

### Responsive behavior

These responsive behaviors are built into the grid classes and automatically adjust the layout based on screen size without requiring additional responsive modifiers.

| Grid Class | Desktop | Tablet | Mobile-L | Mobile |
| --- | --- | --- | --- | --- |
| grid\_1-col | 1 column | 1 column | 1 column | 1 column |
| grid\_2-col | 2 columns | 2 columns | 1 column | 1 column |
| grid\_3-col | 3 columns | 3 columns | 2 columns | 1 column |
| grid\_4-col | 4 columns | 2 columns | 1 column | 1 column |
| grid\_5-col | 5 columns | 3 columns | 2 columns | 1 column |
| grid\_6-col | 6 columns | 3 columns | 2 columns | 1 column |
| grid\_9-col | 9 columns | 3 columns | 2 columns | 1 column |
| grid\_12-col | 12 columns | 3 columns | 2 columns | 1 column |

Default behavior can be adjusted using responsive combo classes:

grid\_3-coltablet-1-col

* * *

## Spacing modifiers

Class structure:
grid\_`columns`-colgap-`size`

Size options: `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`

Example: grid\_3-colgap-medium

* * *

## Alignment modifiers

These modifiers set alignment for all child elements inside the grid.

Class structure:
grid\_`columns`-colis-`X or Y`-`position`

Available combo classes:

- is-x-left
- is-x-center
- is-x-right
- is-y-top
- is-y-center
- is-y-bottom

Example: grid\_3-colis-x-centeris-y-bottom

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