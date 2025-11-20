---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/variables/color
title: "Color | Webflow Developer Documentation"
published: 2025-11-17
---

The framework uses a system of structured color variables that power the entire site. These variables are applied consistently across text, backgrounds, borders, and component variations.

All colors are managed through variables and that are grouped by the following roles:

- [**Core Colors**](https://developers.webflow.com/flowkit/variables/color#core-colors)

The foundational palette used across the system
- [**Tints**](https://developers.webflow.com/flowkit/variables/color#tints)

Create depth and hierarchy without introducing additional colors
- [**Contextual Usage**](https://developers.webflow.com/flowkit/variables/color#contextual-usage)

Semantic variables that reference core colors behind the scenes

* * *

## Core Colors

Core colors represent the main color tokens for UI elements like buttons, cards, and links. These include both accent and neutral palettes. These are the foundational variables used for background fills, button states, and links.

| Accent Colors | Neutral Colors |
| --- | --- |
| Accent Primary | Neutral Primary |
| Accent Secondary | Neutral Secondary |
| Accent Tertiary | Neutral Inverse |
| Accent Primary Hover |  |
| Accent Secondary Hover |  |
| Accent Tertiary Hover |  |

* * *

## Tints

Each core color includes a tint scale ranging from `A10` (lightest) to `A90` (strongest). These are used for opacity layering, accessible text, or background overlays. Tints allow you to create depth and hierarchy without introducing additional colors.

| Group | Tint Range |
| --- | --- |
| Accent Primary | A10 – A90 |
| Accent Secondary | A10 – A90 |
| Accent Tertiary | A10 – A90 |
| Neutral Primary | A10 – A90 |
| Neutral Inverse | A10 – A90 |

Examples:

- Text Secondary uses Neutral Inverse A60
- Border Primary uses Neutral Inverse A50
- BG Overlay uses Neutral Inverse A90

* * *

## Contextual Usage

Many design variables reference core colors behind the scenes. These are more semantic and mapped to actual UI roles. Update any of the base colors, and these will automatically reflect those changes in the UI.

| Usage Context | Variable Example |
| --- | --- |
| Background | BG Primary, BG Accent Secondary, BG Inverse |
| Text | Text Primary, Text On Accent Primary, Text On Overlay |
| Border | Border Primary, Border Accent, Border Inverse Secondary |

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