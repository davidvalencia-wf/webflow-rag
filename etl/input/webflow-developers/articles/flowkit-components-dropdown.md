---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/components/dropdown
title: "Dropdown | Webflow Developer Documentation"
published: 2025-11-17
---

## Class Naming

The dropdown component is used to display a list of options that appear on interaction. It uses a base wrapper class and internal toggle/list elements to manage behavior and style.

The base class is dropdown. This class wraps the entire dropdown structure and controls visibility of the dropdown list.

## Elements

| Class | Purpose |
| --- | --- |
| dropdown\_toggle | Interactive button that reveals the dropdown |
| dropdown\_list | Container for the list of options |

## Direction Modifiers

Dropdowns support directional modifiers that control where the dropdown list appears in relation to the toggle button.

Combine these with dropdown\_list to control layout.

| Modifier Class | Description |
| --- | --- |
| dropdown\_listis-open\_left | Opens list to the left |
| dropdown\_listis-open\_up | Opens list above the toggle |
| dropdown\_listis-open\_up-left | Opens list above and to the left |

Example: dropdown\_listis-open\_left

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