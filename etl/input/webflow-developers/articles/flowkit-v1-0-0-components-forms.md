---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/v1.0.0/components/forms
title: "Forms | Webflow Developer Documentation"
published: 2025-11-17
---

## Class Naming

Forms consist of modular components with consistent styling patterns. Each element (labels, fields, toggles, and messages) is styled using reusable classes and combo modifiers to adapt to different contexts (inverse, accents, etc.).

**Form Components**

| Element Class | Purpose |
| --- | --- |
| Input | For basic text fields |
| InputSelect | For select fields |
| InputText Area | For multiline input |
| Checkbox | Custom-styled checkbox |
| Radio | Custom-styled radio |
| Button | For submitting the form |
| Form Success Message | Visible after submission |
| Form Error Message | Shows validation errors |

## Elements

**Input elements**

- Input Label
- Input Block \- wrapper of the label and input field

**Checkbox elements:**

- Checkbox Toggle
- Checkbox Label

**Radio elements:**

- Radio Toggle
- Radio Label

## Surface Modifiers

To ensure proper contrast and accessibility, surface modifiers are applied as combo classes to individual form elements and following naming convention `Element``Element``Surface`

| Element | Surface |
| --- | --- |
| Input | On Inverse |
| Radio (Main class is Radio Toggle) | On Accent Primary |
| Checkbox (Main class is Checkbox Toggle) | On Accent Secondary |
|  | On Accent Tertiary |

Example: Checkbox ToggleCheckbox On inverse

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