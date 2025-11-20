---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/components/buttons
title: "Buttons | Webflow Developer Documentation"
published: 2025-11-17
---

## Class Naming

Buttons are reusable components used to trigger actions or link to other pages. They follow a consistent class structure for color type, size, and placement.

The class naming convention is:

buttonis-secondaryis-smallon-accent-primary

For example:

buttonis-secondaryon-accent-primary

These modifiers adjust button styling for contrast and visual clarity when buttons are placed over colored or dark backgrounds.

**Size Modifiers**

- buttonis-small
- buttonis-large

**Type Modifiers**

- buttonis-secondary

**Surface Modifiers: On Accent**

- buttonon-accent-primary
- buttonis-secondaryon-accent-primary
- buttonon-accent-secondary
- buttonis-secondaryon-accent-secondary
- buttonon-accent-tertiary
- buttonis-secondaryon-accent-tertiary

**Surface Modifiers: On Inverse**

- buttonon-inverse
- buttonis-secondaryon-inverse

## Button Group

Buttons should be wrapped in a parent element with the class button-group to maintain vertical spacing and horizontal gaps between buttons. This helps enforce consistent layout and rhythm across UI elements.

You can further modify alignment and layout behavior using combo classes:

| Class | Description |
| --- | --- |
| button-group | Aligns buttons to the left (default) |
| button-groupis-align-center | Aligns buttons to the center |
| button-groupis-align-right | Aligns buttons to the right |
| button-groupis-vertical-stretch | Stretches buttons to fill the container width |

* * *

## Text Button

Text Buttons are lightweight, inline-style buttons often used in navigation patterns, CTAs, or subtle interactions. They follow the same structure as standard buttons with color, size, and on-surface placement variations.

The base class is text-button

**Size Modifiers:**

- text-buttonis-small

**Type Modifiers:**

- text-buttonis-secondary

**Surface Modifiers:**

These combinations allow for subtle yet clear interactions across all background contexts.

- text-buttonon-inverse
- text-buttonon-accent-primary
- text-buttonon-accent-secondary
- text-buttonon-accent-tertiary

* * *

## Text Link

Text Links resemble hyperlinks and are meant for in-line use. They follow the same class structure logic as buttons and text buttons.

The base class is text-link

**Size Modifiers:**

- text-linkis-small

**Type Modifiers:**

- text-linkis-secondary

**Surface Modifiers:**

Text Links work well inside body copy, feature sections, or anywhere link-level interactions are required.

- text-linkon-inverse
- text-linkon-accent-primary
- text-linkon-accent-secondary
- text-linkon-accent-tertiary

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