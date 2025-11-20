---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/v1.0.0/components/cards
title: "Cards | Webflow Developer Documentation"
published: 2025-11-17
---

## Class Naming

Cards are layout containers used to group and display content like text, images, and interactive elements. They are styled using the base class Card for standard cards and Card Link for interactive cards.

These classes can be extended using modifiers for different styles, backgrounds, and layouts.

## Surface Modifiers

Use these to adapt the card appearance based on the background context.

Naming convention for combo classes is:
Card On `Surface` and Card Link On `Surface`, where card surface can be `Primary`, `Secondary`, `Inverse`, `Accent Primary`, `Accent Secondary`, `Accent Tertiary`

Example:

- CardCard On Accent Primary
- Card LinkCard On Inverse

## Card Elements

These modifiers allow additional control over spacing and card behavior across responsive layouts.

| Class | Description |
| --- | --- |
| Card Body | Default card padding applied through a variable Card Padding. |
| Card Body SM | Small card padding. |
| Featured Card | Makes the card stand out from others. Useful for featured pricing cards. |

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