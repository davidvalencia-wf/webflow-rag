---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/v1.0.0/components/buttons
title: "Buttons | Webflow Developer Documentation"
published: 2025-11-17
---

## Class Naming

Buttons are reusable components used to trigger actions or link to other pages. They follow a consistent class structure for color type, size, and placement.

The class naming convention is:

Button`Type Modifier` Button`Size Modifer` Button`Surface Modifier` Button

For example:

ButtonSecondary ButtonPrimary On Accent Button

These modifiers adjust button styling for contrast and visual clarity when buttons are placed over colored or dark backgrounds.

**Size Modifiers**

- Small Button
- Large Button
- Secondary Small Button

**Type Modifiers**

- Secondary Button

**Surface Modifiers: On Accent**

- Primary Button On Accent Button
- Secondary Button On Accent
- Primary Button On Accent Secondary
- Secondary Button On Accent Secondary
- Primary Button On Accent Tertiary
- Secondary Button On Accent Tertiary

**Surface Modifiers: On Inverse**

- Primary Button On Inverse
- Secondary Button On Inverse

## Button Group

Buttons should be wrapped in a parent element with the class Button Group to maintain vertical spacing and horizontal gaps between buttons. This helps enforce consistent layout and rhythm across UI elements.

You can further modify alignment and layout behavior using combo classes:

| Class | Description |
| --- | --- |
| Align Left | Aligns buttons to the left (default) |
| Align Center | Aligns buttons to the center |
| Align Right | Aligns buttons to the right |
| Vertical Stretch | Stretches buttons to fill the container width |

* * *

## Text Button

Text Buttons are lightweight, inline-style buttons often used in navigation patterns, CTAs, or subtle interactions. They follow the same structure as standard buttons with color, size, and on-surface placement variations.

The base class is Text Button

**Size Modifiers:**

- Small Text Button

**Type Modifiers:**

- Secondary Text Button

**Surface Modifiers:**

These combinations allow for subtle yet clear interactions across all background contexts.

- Text Button On Inverse
- Text Button On Accent Primary
- Text Button On Accent Secondary
- Text Button On Accent Tertiary

* * *

## Text Link

Text Links resemble hyperlinks and are meant for in-line use. They follow the same class structure logic as buttons and text buttons.

The base class is Text Link

**Size Modifiers:**

- Small Text Link

**Type Modifiers:**

- Secondary Text Link

**Surface Modifiers:**

Text Links work well inside body copy, feature sections, or anywhere link-level interactions are required.

- Text Link On Inverse
- Text Link On Accent Primary
- Text Link On Accent Secondary
- Text Link On Accent Tertiary

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