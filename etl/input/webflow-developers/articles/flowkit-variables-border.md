---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/variables/border
title: "Border | Webflow Developer Documentation"
published: 2025-11-17
---

Border variables control visual boundaries between components like buttons, cards, input fields, and other UI elements. These are divided into:

- **Border Color** — Defines the visible stroke color.
- **Radius** — Defines the border corner roundness (border-radius).

These values can be applied using variables or utility classes, and may vary between projects depending on style preferences.

* * *

## Border Color

Border color variables follow a naming pattern based on surface context or visual intent.

- Border Primary
- Border Secondary
- Border Inverse Primary
- Border Inverse Secondary
- Border Accent

These colors reference the foundational colors like `Neutral` or `Accent` and may include opacity (e.g. `Neutral Inverse A50`). The exact mapping is managed in the Variables panel.

Border color variables are applied to style the border or box shadow style of elements. For example, dividers and input fields are using border styles. Buttons and cards components are using box shadow styles.

* * *

## Border Radius

Radius variables define how rounded the corners of elements should be. These values are used consistently across cards, buttons, input fields, etc.

**Common radius sizes:**

- Small Radius
- Medium Radius
- Large Radius
- X Large Radius

* * *

##### Utility Classes

To apply or override border radius styles consistently across elements, use the available utility classes. You can find the full list and usage examples in the [Border Radius Utilities](https://developers.webflow.com/flowkit/reference/utilities#border-radius) section.

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