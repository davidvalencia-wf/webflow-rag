---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/v1.0.0/structure/grid
title: "Grid layout | Webflow Developer Documentation"
published: 2025-11-17
---

The base class Grid Layout defines the element as a grid. By default, it creates a 2-column grid layout with no spacing.

Grid Layout can be extended with various combo class modifiers that adjust the layout’s spacing, column count, alignment, and responsiveness. You can combine these modifiers to configure the grid layout to your needs.

Style selector structure:

Grid Layout(Optional) Responsive Column Modifier(Optional) Spacing Modifier(Optional) Alignment Modifier

Check examples how to mix combo-classes:

Grid LayoutDesktop 9 ColumnTablet 3 ColumnMobile Landscape 1 ColumnGrid Gap MDX Center![Grid](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/flowkit/pages/v1/grid/flowkit_grids.webp)

* * *

## Spacing Modifiers

Spacing is following t-shirt size coding with 2-letter abbreviations (e.g. `SM`, `MD`, `XL`).

Style selector structure:
Grid LayoutGrid Gap `Size`

Options: `XXS`, `XS`, `SM`, `MD`, `LG`, `XL`, `XXL`

Example: Grid LayoutGrid Gap MD

* * *

## Alignment Modifiers

These modifiers set alignment for all child elements inside the grid.

Style selector structure:
Grid Layout`X or Y``Position`

Options: `X Left`, `X Center`, `X Right`, `Y Top`, `Y Center`, `Y Bottom`

Example: Grid LayoutX CenterY Bottom

* * *

## Responsive Column Modifiers

You can define unique behavior for every breakpoint by adding the combo class for the breakpoint you want to target.

Style selector structure:
Grid Layout`Breakpoint``Count` Column Grid

Options:

| Breakpoint | Count |
| --- | --- |
| `Desktop` | `1` – `12` |
| `Tablet` | `1` – `6` |
| `Mobile Landscape` | `1` – `4` |
| `Mobile Portrait` | `1` – `4` |

Example: Grid LayoutTablet 3 Column Grid

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