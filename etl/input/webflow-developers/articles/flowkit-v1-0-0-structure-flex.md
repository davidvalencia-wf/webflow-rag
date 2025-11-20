---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/v1.0.0/structure/flex
title: "Flex Layout | Webflow Developer Documentation"
published: 2025-11-17
---

Flex layout utilities define how elements are laid out in one dimension (either horizontally or vertically).

Use direction, spacing, alignment, and child behavior modifiers to achieve flexible and consistent layouts.

* * *

## Flex Directions

Class Flex Horizontal and Flex Vertical define the element as a flex layout container in either row or column direction.

* * *

## Flex Spacing

Spacing between children is controlled with gap modifiers: Flex (Direction)Flex Gap (X)

| Label | Combo Class Example |
| --- | --- |
| XX Small Gap | Flex HorizontalFlex Gap XXS |
| X Small Gap | Flex HorizontalFlex Gap XS |
| Small Gap | Flex HorizontalFlex Gap SM |
| Medium Gap | Flex HorizontalFlex Gap MD |
| Large Gap | Flex HorizontalFlex Gap LG |

* * *

## Flex Alignment

Use alignment combo-classes to control positioning of children inside a flex layout.

Alignment can be horizontal (`X`) or vertical (`Y`) depending on the direction of the parent container.

Common examples:

- Flex HorizontalX Center
- Flex HorizontalX Right
- Flex HorizontalY Bottom
- Flex VerticalX Center
- Flex VerticalY Bottom

**Align Horizontal Left**

Flex HorizontalX Left

Content

Content

**Align Horizontal Center**

Flex HorizontalX Center

Content

Content

**Align Horizontal Right**

Flex HorizontalX Right

Content

Content

**Align Space Between**

Flex HorizontalX Space Between

Content

Content

**Flex Wrap**

Flex HorizontalFlex Wrap

Content

Content

Content

**Align Vertical Top**

Flex HorizontalY Top

Content

Content

**Align Vertical Center**

Flex HorizontalY Center

Content

Content

**Align Vertical Bottom**

Flex HorizontalY Bottom

Content

Content

**Align Horizontal Left**

Flex VerticalX Left

Content

Content

**Align Horizontal Center**

Flex VerticalX Center

Content

Content

**Align Horizontal Right**

Flex VerticalX Right

Content

Content

**Align Vertical Bottom**

Flex VerticalY Bottom

Content

Content

**Align Vertical Center**

Flex VerticalY Center

Content

Content

**Expand Horizontally**

Flex VerticalX Stretch

Content

Content

**Side by Side Vertically**

Flex VerticalSpace Between

Content

Content

* * *

## Flex Child Modifiers

These combo-classes define how children inside a flex container behave:

| Behavior | Combo Class |
| --- | --- |
| No Shrink | Flex Child No Shrink |
| Expand | Flex Child Expand |
| Shrink | Flex Child Shrink |

Useful for allowing or preventing children from stretching, shrinking, or expanding based on available space.

Element with `Flex Child No Shrink` applied

Element with `[Utility] Width 100%` applied

Element with `Flex Child Expand` applied

Content

Element with `[Utility] Width 100%` applied

Element with `Flex Child Shrink` applied

* * *

## Responsive Modifiers

On Tablet resolution (991px and below), Flex Horizontal automatically changes to vertical layout by default.

To override this behavior, use responsive modifier combo classes, such as:

Tablet Flex HorizontalMobile Landscape Flex Horizontal

These allow you to force direction across breakpoints.

### Tablet

| Description | Combo Classes |
| --- | --- |
| Horizontal direction | Flex HorizontalTablet Flex Horizontal |
| Vertical direction | Flex HorizontalTablet Flex Vertical |
| Vertical direction, center content X | Flex HorizontalTablet Flex VerticalTablet X Center |
| Vertical direction, center content Y | Flex HorizontalTablet Flex VerticalTablet Y Center |

### Mobile Landscape

| Description | Combo Classes |
| --- | --- |
| Horizontal direction | Flex HorizontalMobile Landscape Flex Horizontal |
| Vertical direction | Flex HorizontalMobile Landscape Flex Vertical |

### Mobile Portrait

| Description | Combo Classes |
| --- | --- |
| Horizontal direction | Flex HorizontalMobile Landscape Flex Horizontal |
| Vertical direction | Mobile Landscape Flex Vertical |

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