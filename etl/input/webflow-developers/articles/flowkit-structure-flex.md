---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/structure/flex
title: "Flex Layout | Webflow Developer Documentation"
published: 2025-11-17
---

Flex layout utilities define how elements are laid out in one dimension (either horizontally or vertically).

Use direction, spacing, alignment, and child behavior modifiers to achieve flexible and consistent layouts.

* * *

## Flex Directions

Class flex\_horizontal and flex\_vertical define the element as a flex layout container in either row or column direction.

* * *

## Flex Spacing

Spacing between children is controlled with gap modifiers: flex\_`direction`gap-`size`

Size options: `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`

* * *

## Flex Alignment

Use alignment combo-classes to control positioning of children inside a flex layout.

Alignment can be horizontal (`X`) or vertical (`Y`) depending on the direction of the parent container.

Common examples:

- flex\_horizontalis-x-center
- flex\_horizontalis-x-right
- flex\_horizontalis-y-bottom
- flex\_verticalis-x-center
- flex\_verticalis-y-bottom

**Align Horizontal Left**

flex\_horizontalis-x-left

Content

Content

**Align Horizontal Center**

flex\_horizontalis-x-center

Content

Content

**Align Horizontal Right**

flex\_horizontalis-x-right

Content

Content

**Align Space Between**

flex\_horizontalis-x-space-between

Content

Content

**Flex Wrap**

flex\_horizontalflex\_wrap

Content

Content

Content

**Align Vertical Top**

flex\_horizontalis-y-top

Content

Content

**Align Vertical Center**

flex\_horizontalis-y-center

Content

Content

**Align Vertical Bottom**

flex\_horizontalis-y-bottom

Content

Content

**Align Horizontal Left**

flex\_verticalis-x-left

Content

Content

**Align Horizontal Center**

flex\_verticalis-x-center

Content

Content

**Align Horizontal Right**

flex\_verticalis-x-right

Content

Content

**Align Vertical Bottom**

flex\_verticalis-y-bottom

Content

Content

**Align Vertical Center**

flex\_verticalis-y-center

Content

Content

**Expand Horizontally**

flex\_verticalis-x-stretch

Content

Content

**Side by Side Vertically**

flex\_verticalis-space-between

Content

Content

* * *

## Flex Child Modifiers

These combo-classes define how children inside a flex container behave:

| Behavior | Combo Class |
| --- | --- |
| No Shrink | flex-child\_no\_shrink |
| Expand | flex-child\_expand |
| Shrink | flex-child\_shrink |

Useful for allowing or preventing children from stretching, shrinking, or expanding based on available space.

Element with flex\_child\_no\_shrink applied

Element with width\_100percent applied

Element with flex\_child\_expand applied

Content

Element with width\_100percent applied

Element with flex\_child\_shrink applied

* * *

## Responsive Modifiers

Available responsive combo classes

| Combo Class | Description |
| --- | --- |
| tablet-x-center | Center horizontally on tablet |
| tablet-y-center | Center vertically on tablet |
| mobile-l-x-center | Center horizontally on mobile large |
| mobile-l-y-center | Center vertically on mobile large |
| mobile-x-center | Center horizontally on mobile |
| mobile-y-center | Center vertically on mobile |

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