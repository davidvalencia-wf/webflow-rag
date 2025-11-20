---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/components/forms
title: "Forms | Webflow Developer Documentation"
published: 2025-11-17
---

## Class Naming

Forms consist of modular components with consistent styling patterns. Each element within a form, like labels, fields, toggles, and messages, is styled using reusable classes and combo modifiers to adapt to different contexts (inverse, accents, etc.).

**Form Components**

| Element Class | Purpose |
| --- | --- |
| input\_field | For basic text fields |
| input\_fieldis-select | For select fields |
| input\_fieldis-text-area | For multiline input |
| checkbox | Custom-styled checkbox |
| radio | Custom-styled radio |
| button | For submitting the form |
| form\_success-message | Visible after submission |
| form\_error-message | Shows validation errors |

## Elements

**Input elements**

- input\_label
- input \- wrapper of the label and input field

**Checkbox elements:**

- checkbox\_toggle
- checkbox\_label

**Radio elements:**

- radio\_toggle
- radio\_label

## Surface Modifiers

To ensure proper contrast and accessibility, surface modifiers are applied as combo classes to individual form elements and following naming convention `element`on-`surface`

Surface options: `on-inverse`, `on-accent-primary`, `on-accent-secondary`, `on-accent-tertiary`

Example: checkbox\_toggleon-inverse

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