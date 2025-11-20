---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/v1.0.0/foundation/spacing
title: "Spacing | Webflow Developer Documentation"
published: 2025-11-17
---

Foundational predefined REM-based set of variables called Spacing are used for margins, paddings, and gaps of components. This ensures consistent rhythm and layout behavior across the entire system.

* * *

### Size Variables

All the base spacing values are defined using a simple `value`x naming convention. You can think of `x` as a multiplier of the base unit (1rem = 16px).

| Variable | REM Value | Preview |
| --- | --- | --- |
| 0.25x | 0.25rem |  |
| 0.5x | 0.5rem |  |
| 0.75x | 0.75rem |  |
| 1x | 1rem |  |
| 1.25x | 1.25rem |  |
| 1.5x | 1.5rem |  |
| 1.75x | 1.75rem |  |
| 2x | 2rem |  |
| 3x | 3rem |  |
| 4x | 4rem |  |
| 5x | 5rem |  |
| 6x | 6rem |  |
| 7x | 7rem |  |
| 8x | 8rem |  |

##### Note

Variables can be remapped. For example, `0.25x` might be set to `0.5rem` based on your project’s scale. title=“Note”> To learn more about how `rem` works and why we use it, see the [Units page](https://developers.webflow.com/flowkit/getting-started/units).

* * *

## Gap Variables

Used in flex and grid layouts. These use t-shirt sizing for consistent spacing across UI elements.

| Variable | Size Name |
| --- | --- |
| XXS Gap | XX Small |
| XS Gap | X Small |
| SM Gap | Small |
| MD Gap | Medium |
| LG Gap | Large |
| XL Gap | X Large |
| XXL Gap | XX Large |

* * *

## Utility Class Examples

These classes reuse the same size scale as the gap variables:

- Icon SM
- Flex Horizontal Flex Gap SM
- Paragraph MD
- Padding Bottom 1.5x
- Margin Top 2x

These apply spacing using the same variables as above for consistency.

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