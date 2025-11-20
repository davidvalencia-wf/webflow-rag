---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/v1.0.0/reference/utilities
title: "Utilitity Classes | Webflow Developer Documentation"
published: 2025-11-17
---

Utilities are a collection of modifier classes that fine-tune layouts and components and keep consistency. You can add a utility classes as a combo class to adjust a behavior of the main class or apply it as a main class to define the functionality of an element. Fo instance, if you want to add a shadow to a card, you can add shadow utility class as a combo class for a card:

All utility classes are prefixed with `[Utility]`. The naming of the utility class describes exactly what it’s doing.

## Margins and Padding

Margins and padding are applied to sections, containers, and other elements to define inner spacing or distance between elements.

### Margin

Margin defines the space **outside** of an element.

Margin

Padding

Content

Utility classes use this structure:
\[Utility\] Margin `Direction``Value`

**Margin Vertical**

- Direction: `Top`, `Bottom`
- Value: `0`, `0.5rem`, `1rem`, `2rem`, `3rem`, `4rem`, `5rem`, `6rem`, `7rem`, `8rem`, `Auto`

**Margin Horizontal**

- Direction: `Left`, `Right`, `All`
- Value: `0`, `0.5rem`, `1rem`, `2rem`, `Auto`

**Utility classes**

| Class | Description |
| --- | --- |
| \[Utility\] Margin All 0 | Remove all margin |
| \[Utility\] Margin All 0.5rem | Apply 0.5rem margin all sides |
| \[Utility\] Tablet Margin Top 0 | Top margin 0 on Tablet |
| \[Utility\] Mobile Margin Top 0 | Top margin 0 on Mobile |

### Padding

Padding defines the space **inside** of an element.

Margin

Padding

Content

Utility classes use this structure:
\[Utility\] Padding `Direction``Value`

**Padding Vertical**

- Direction: `Top`, `Bottom`
- Value: `0`, `0.5rem`, `1rem`, `2rem`, `3rem`, `4rem`, `5rem`, `6rem`, `7rem`, `8rem`

**Padding Horizontal**

- Direction: `Left`, `Right`
- Value: `1rem`, `2rem`

**Padding Around**

- Direction: `All`
- Value: `0`, `0.5rem`, `1rem`, `2rem`, `3rem`, `4rem`

**Padding Utilities**

| Class | Description |
| --- | --- |
| \[Utility\] Tablet Padding All 0 | Remove all padding on Tablet |
| \[Utility\] Tablet Padding All 1rem | Padding 1rem on Tablet |

### Responsive Spacing

On smaller screens (like **Mobile Landscape**), some margin and padding utility classes will use **smaller spacing variables** than their desktop counterparts.

For example:

\[Utility\] Margin Top 6rem

- 6x on desktop,
- 3x on mobile devices.

This behavior ensures better vertical rhythm and balance on smaller screens without needing to apply breakpoint-specific classes manually.

* * *

## Display and Overflow

Utilities to control layout visibility and content flow.

| Class | Description |
| --- | --- |
| \[Utility\] Display Block | Forces element to behave as block |
| \[Utility\] Display Inline Block | Element behaves like inline-block |
| \[Utility\] Display None | Hides element from layout |
| \[Utility\] Overflow Clip | Clips overflow without scroll |
| \[Utility\] Overflow Hidden | Hides overflow, no scroll |
| \[Utility\] Overflow Visible | Makes overflow content visible |
| \[Utility\] Overflow Auto | Scrollbars appear as needed |
| \[Utility\] Screen Reader Visible Only | Visible to screen readers only |

* * *

## Position

Controls element positioning behavior across breakpoints.

**Desktop**

| Class | Description |
| --- | --- |
| \[Utility\] Position Relative | Offsets relative to normal position |
| \[Utility\] Position Absolute | Removes from flow, absolute position |
| \[Utility\] Position Fixed | Fixed relative to viewport |
| \[Utility\] Position FixedFixed Top | Fixed to top edge |
| \[Utility\] Position FixedFixed Left | Fixed to left edge |
| \[Utility\] Position FixedFixed Right | Fixed to right edge |
| \[Utility\] Position Sticky | Sticks to top on scroll |
| \[Utility\] Position StickyTop 120 | Custom offset sticky |
| \[Utility\] Position StickySticky Desktop | Sticky only on desktop |
| \[Utility\] Position Static | Default positioning |
| \[Utility\] Z-Index 1 | Layer stacking with values 1–5 |

**Tablet**

| Class | Description |
| --- | --- |
| \[Utility\] Tablet Position Absolute | Set position absolute on tablet |
| \[Utility\] Tablet Position Relative | Set position relative on tablet |
| \[Utility\] Tablet Position Static | Set position static on tablet |

**Mobile**

| Class | Description |
| --- | --- |
| \[Utility\] Position StickySticky Mobile | Mobile-only sticky support |

* * *

## Transform

Controls element translation and rotation.

| Class | Description |
| --- | --- |
| \[Utility\] Move Up 15% | Shifts element upward by 15% |
| \[Utility\] Move Up 50% | Shifts element upward by 50% |
| \[Utility\] Move Down 15% | Shifts element downward by 15% |
| \[Utility\] Move Down 25% | Shifts element downward by 25% |
| \[Utility\] Move Down 50% | Shifts element downward by 50% |
| \[Utility\] Rotate -12 | Rotates element left by 12 degrees |
| \[Utility\] Rotate -4.5 | Rotates element left by 4.5 degrees |
| \[Utility\] Rotate 12 | Rotates element right by 12 degrees |
| \[Utility\] Rotate 4.5 | Rotates element right by 4.5 degrees |

* * *

## Width

Controls fixed, responsive, and percentage-based width settings.

**Desktop**

| Class | Description |
| --- | --- |
| \[Utility\] Max Width XS | Restricts max width to XS |
| \[Utility\] Max Width SM | Restricts max width to SM |
| \[Utility\] Max Width MD | Restricts max width to MD |
| \[Utility\] Max Width LG | Restricts max width to LG |
| \[Utility\] Width Auto | Width auto based on content |
| \[Utility\] Width SM | Small fixed width |
| \[Utility\] Width MD | Medium fixed width |
| \[Utility\] Width 35% | Width set to 35% |
| \[Utility\] Width 40% | Width set to 40% |
| \[Utility\] Width 60% | Width set to 60% |

**Tablet**

| Class | Description |
| --- | --- |
| \[Utility\] Tablet Width 50% | Sets width to 50% on tablets |
| \[Utility\] Tablet Width 60% | Sets width to 60% on tablets |
| \[Utility\] Tablet Width 100% | Sets width to 100% on tablets |

**Mobile Landscape**

| Class | Description |
| --- | --- |
| \[Utility\] Mobile Landscape Width 70% | Sets width to 70% |
| \[Utility\] Mobile Landscape Width 80% | Sets width to 80% |
| \[Utility\] Mobile Landscape Width 100% | Sets width to 100% |

**Mobile Portrait**

| Class | Description |
| --- | --- |
| \[Utility\] Mobile Portrait Width 100% | Sets width to 100% |

* * *

## Height

Controls element height and minimum height behavior across breakpoints.

**Desktop**

| Class | Description |
| --- | --- |
| \[Utility\] Height 100% | Full height of parent |
| \[Utility\] Min Height 100% | Minimum height 100% |
| \[Utility\] Viewport Height 50 | 50% of viewport height |
| \[Utility\] Viewport Height 100 | 100% of viewport height |

**Tablet**

| Class | Description |
| --- | --- |
| \[Utility\] Tablet Height Auto | Sets height auto on tablets |
| \[Utility\] Tablet Min Height Auto | Sets min-height auto on tablets |

* * *

## Border Radius

Controls element corner roundness using utility classes.

### Component Specific

These are helpful when you need to customize or reset corners without affecting the base component class.

- \[Utility\] Radius Card
- \[Utility\] Radius Button

### Size Specific

Use the \[Utility\] Radius `Size` format to control element corner roundness.

The `Size` follows t-shirt sizing convention: `SM`, `MD`, `LG`, `XL`, `Round`

Example: \[Utility\] Radius LG

### Side-specific

These utilities give you full control when working with overlapping sections, containers with flush corners, or when selectively removing roundness.

- \[Utility\] Radius All 0
- \[Utility\] Radius Top 0
- \[Utility\] Radius Right 0
- \[Utility\] Radius Bottom 0
- \[Utility\] Radius Left 0

* * *

## Mask

Use utility mask classes \[Utility\] Mask (Direction) to apply directional fades to images or elements.

These are commonly paired with Overlay and Image

Apply one of the following as a combo class:

- \[Utility\] Mask Top
- \[Utility\] Mask Bottom
- \[Utility\] Mask Left
- \[Utility\] Mask Right
- \[Utility\] Mask Horizontal Fade
- \[Utility\] Mask Vertical Fade

Example:

Image\[Utility\] Mask Bottom

* * *

## Overlay

Overlay classes are used to create translucent layers above content.

They are commonly used to improve readability on background images or to emphasize text.

| Class | Description |
| --- | --- |
| Overlay | Adds a dark semi-transparent background |
| Inverse Overlay | Adds a light semi-transparent background |

**Link Overlay**

| Class | Description |
| --- | --- |
| \[Utility\] Link Overlay | Expands a link to cover its entire container (use inside position: relative) |

**Overlay with Mask**

Combine Overlay with directional mask utility classes to create faded on a side images or faded overlays.

Example:

- Overlay\[Utility\] Mask Top
- Overlay\[Utility\] Mask Left

* * *

## Drop Shadow

Add subtle or strong depth to elements using drop shadow utility classes.

- \[Utility\] Shadow XXS
- \[Utility\] Shadow XS
- \[Utility\] Shadow SM
- \[Utility\] Shadow MD
- \[Utility\] Shadow LG
- \[Utility\] Shadow XL
- \[Utility\] Shadow XXL

* * *

## Typography

These utility classes allow you to control alignment and color of text elements globally or responsively.

### Text Color

These utility classes are used to apply specific text colors to an element.

- \[Utility\] Text Primary
- \[Utility\] Text Secondary
- \[Utility\] Text Inverse
- \[Utility\] Text Inverse Secondary
- \[Utility\] Text Accent Primary
- \[Utility\] Text Accent Secondary
- \[Utility\] Text Accent Tertiary
- \[Utility\] Text Accent On Inverse
- \[Utility\] Text Accent On Primary
- \[Utility\] Text On Accent Primary
- \[Utility\] Text On Accent Secondary

### Text Alignment

Text alignment utilities let you override the default left-aligned behavior.

- \[Utility\] Text Align Left
- \[Utility\] Text Align Center
- \[Utility\] Text Align Right

Responsive modifiers:

- \[Utility\] Text Align Center Tablet
- \[Utility\] Text Align Right Mobile

* * *

## Misc

Other utility helpers for visual effects and behaviors.

| Class | Description |
| --- | --- |
| \[Utility\] Filter Invert | Inverts colors (dark/light mode) |
| \[Utility\] Text Decoration None | Removes underline from links or text |
| \[Utility\] Backdrop Filter Blur | Applies backdrop blur filter |
| \[Utility\] Link Content Block | Expands link to fill container |

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