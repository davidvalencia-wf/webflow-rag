---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/components/images
title: "Images | Webflow Developer Documentation"
published: 2025-11-17
---

## Class Naming

Images are styled using reusable classes that control fitting behavior and aspect ratio. They also apply consistent styling like border-radius using a design token.

**Image Fit**

Use the base class image or image\_cover to define the image element.

**Radius**

All images — including elements with the tag Image, or using the classes image and image\_cover — have rounded corners applied through the variable Image Radius.

To override this and make the corners square, use the combo class radius\_all-0

### Aspect Ratio

Aspect ratio combo classes must be applied on top of the image\_cover class to take effect.

Why? Because the image needs to stretch to fill the area defined by the ratio box — if only the ratio is set without forcing coverage, the image may not respect the ratio area.

Available combo classes:

- ratio\_1x1
- ratio\_16x9
- ratio\_3x2
- ratio\_4x3
- ratio\_2x2.5
- ratio\_2x3

Exasmple:

image\_coverratio\_2x3

### Responsive Modifiers

You can use responsive combo classes to change aspect ratio behavior on different breakpoints. For example, you may want to simplify layouts on smaller screens or reset custom ratios back to `auto`.

**Tablet**

- ratio\_3x2\_tablet
- ratio\_1x1\_tablet

**Mobile Landscape**

- ratio\_auto\_mobile-l

These modifiers are added in combination with the base image\_cover class and optionally other aspect combo classes.

* * *

## Icons

Icons are scalable, visual indicators used throughout the UI. They rely on a base class for consistent sizing and alignment, and support modifiers for scale and contextual styling.

The base class is icon

**Size Modifiers**

These adjust the scale of the icon element relative to the surrounding layout.

- iconis-xsmall
- iconis-small
- iconis-large
- iconis-xlarge

**Surface Modifiers**

Use these to ensure icons maintain clarity and contrast when placed on dark or colored backgrounds.

- iconon-inverse
- iconon-accent-primary
- iconon-accent-secondary
- iconon-accent-tertiary

**Enhancing Visibility with Icon Container**

You can wrap the icon with an additional background highlight using the combo class

iconis-background

This applies a soft tint using the icon’s color, creating a subtle button-like effect that draws visual attention without overwhelming the interface.

This can be combined with any surface modifier. For example:

iconon-accent-primaryis-background

* * *

## Avatars

Avatars are circular images used to visually represent a user, team, or content author. The base class defines the image as an avatar, and combo classes adjust the size.

The base class is avatar

**Size Modifiers**

Use these modifiers to adjust the avatar size while keeping alignment and proportions consistent across the UI.

- avataris-small
- avataris-large

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