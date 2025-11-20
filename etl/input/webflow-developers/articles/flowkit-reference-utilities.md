---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/reference/utilities
title: "Utility Classes | Webflow Developer Documentation"
published: 2025-11-17
---

All utility classes use descriptive naming that describes exactly what they are doing.

Utilities are a collection of modifier classes that fine-tune layouts and components and keep consistency. You can add a utility class as a combo class to adjust a behavior of the main class or apply it as a main class to define the functionality of an element. For instance, if you want to add a shadow to a card, you can add shadow utility class as a combo class for a card:

## Margins and Padding

Margins and padding are applied to sections, containers, and other elements to define inner spacing or distance between elements.

### Margin

Margin defines the space **outside** of an element.

Margin

Padding

Content

Utility classes use this structure:
margin-`direction`\_`value`

**Margin All**

- Value: `none`, `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`, `auto`

Example:
margin\_xxsmall , margin\_none

**Margin Vertical**

- Direction: `top`, `bottom`
- Value: `none`, `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`, `auto`

Example:
margin-top\_xsmall , margin-bottom\_large

**Margin Horizontal**

- Direction: `left`, `right`, `all`
- Value: `none`, `xxsmall`, `xsmall`, `small`, `medium`, `auto`

Example:
margin-right\_small , margin-left\_auto

### Padding

Padding defines the space **inside** of an element.

Margin

Padding

Content

Utility classes use this structure:
padding-`direction`\_`value`

**Padding Vertical**

- Direction: `top`, `bottom`
- Value: `none`, `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`

Example:
padding-top\_small

**Padding Horizontal**

- Direction: `left`, `right`
- Value: `none`, `xxsmall`, `xsmall`, `small`, `medium`, `large`

Example:
padding-right\_xsmall

**Padding Around**

- Value: `none`, `xxsmall`, `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`

Example:
padding\_none , padding\_large

### Responsive Spacing

On smaller screens (like **Mobile Landscape**), some margin and padding utility classes will use **smaller spacing variables** than their desktop counterparts.

For example:

margin-top\_xlarge

- 6x on desktop,
- 3x on mobile devices.

This behavior ensures better vertical rhythm and balance on smaller screens without needing to apply breakpoint-specific classes manually.

* * *

## Display and Overflow

Utilities to control layout visibility and content flow.

| Class | Description |
| --- | --- |
| display\_block | Forces element to behave as block |
| display\_inline-block | Element behaves like inline-block |
| display\_none | Hides element from layout |
| overflow\_clip | Clips overflow without scroll |
| overflow\_hidden | Hides overflow, no scroll |
| overflow\_visible | Makes overflow content visible |
| overflow\_auto | Scrollbars appear as needed |
| screen-reader | Visible to screen readers only |

* * *

## Position

Controls element positioning behavior across breakpoints.

**Desktop**

| Class | Description |
| --- | --- |
| position\_relative | Offsets relative to normal position |
| position\_absolute | Removes from flow, absolute position |
| position\_fixed | Fixed relative to viewport |
| position\_fixedis-top | Fixed to top edge |
| position\_fixedis-left | Fixed to left edge |
| position\_fixedis-right | Fixed to right edge |
| position\_sticky | Sticks to top on scroll |
| position\_stickyis-top\_large | Custom offset sticky |
| position\_stickyis-desktop-only | Sticky only on desktop |
| position\_static | Default positioning |
| z-index\_1 | Layer stacking with values 1–5 |

**Tablet**

| Class | Description |
| --- | --- |
| position\_absolute\_tablet | Set position absolute on tablet |
| position\_relative\_tablet | Set position relative on tablet |
| position\_static\_tablet | Set position static on tablet |

**Mobile**

| Class | Description |
| --- | --- |
| position\_sticky\_mobile | Mobile-only sticky support |

* * *

## Transform

Controls element translation and rotation.

| Class | Description |
| --- | --- |
| move-up\_15percent | Shifts element upward by 15% |
| move-up\_50percent | Shifts element upward by 50% |
| move-down\_15percent | Shifts element downward by 15% |
| move-down\_25percent | Shifts element downward by 25% |
| move-down\_50percent | Shifts element downward by 50% |
| rotate\_-12deg | Rotates element left by 12 degrees |
| rotate\_-4.5deg | Rotates element left by 4.5 degrees |
| rotate\_12deg | Rotates element right by 12 degrees |
| rotate\_4.5deg | Rotates element right by 4.5 degrees |

* * *

## Width

Controls fixed, responsive, and percentage-based width settings.

**Desktop**

| Class | Description |
| --- | --- |
| max-width\_xsmall | Restricts max width to xsmall |
| max-width\_small | Restricts max width to small |
| max-width\_medium | Restricts max width to medium |
| max-width\_large | Restricts max width to large |
| width\_auto | Width auto based on content |
| width\_small | Small fixed width |
| width\_medium | Medium fixed width |
| width\_35percent | Width set to 35% |
| width\_40percent | Width set to 40% |
| width\_50percent | Width set to 50% |
| width\_60percent | Width set to 60% |
| width\_100percent | Width set to 100% |

**Tablet**

| Class | Description |
| --- | --- |
| width\_50percent\_tablet | Sets width to 50% on tablets |
| width\_60percent\_tablet | Sets width to 60% on tablets |
| width\_100percent\_tablet | Sets width to 100% on tablets |

**Mobile Landscape**

| Class | Description |
| --- | --- |
| width\_70percent\_mobile-l | Sets width to 70% |
| width\_80percent\_mobile-l | Sets width to 80% |
| width\_100percent\_mobile-l | Sets width to 100% |

**Mobile Portrait**

| Class | Description |
| --- | --- |
| width\_100percent\_mobile | Sets width to 100% |

* * *

## Height

Controls element height and minimum height behavior across breakpoints.

**Desktop**

| Class | Description |
| --- | --- |
| height\_100percent | Full height of parent |
| height\_100dvh | Full dynamic viewport height |
| min-height\_100percent | Minimum height 100% |
| min-height\_100dvh | Minimum height 100% dynamic viewport |
| height\_50vh | 50% of viewport height |
| height\_100vh | 100% of viewport height |

**Tablet**

| Class | Description |
| --- | --- |
| height\_auto\_tablet | Sets height auto on tablets |
| min-height\_auto\_tablet | Sets min-height auto on tablets |

* * *

## Border Radius

Controls element corner roundness using utility classes.

### Component Specific

These are helpful when you need to customize or reset corners without affecting the base component class.

- radius\_card
- radius\_button

### Size Specific

Use the radius\_`size` format to control element corner roundness.

The `size` follows t-shirt sizing convention: `small`, `medium`, `large`, `xlarge`, `round`

Example: radius\_large

### Side-specific

These utilities give you full control when working with overlapping sections, containers with flush corners, or when selectively removing roundness.

- radius\_all-0
- radius\_top-0
- radius\_right-0
- radius\_bottom-0
- radius\_left-0

* * *

## Mask

Use utility mask classes mask\_`direction` to apply directional fades to images or elements.

These are commonly paired with overlay and Image

Apply one of the following as a combo class:

- mask\_top
- mask\_bottom
- mask\_left
- mask\_right
- mask\_fade-horizontal
- mask\_fade-vertical

Example:

imagemask\_bottom

* * *

## Overlay

Overlay classes are used to create translucent layers above content. They’re commonly used to improve readability on background images or to emphasize text.

| Class | Description |
| --- | --- |
| overlay | Adds a dark semi-transparent background |
| overlayis-inverse | Adds a light semi-transparent background |
| overlay\_opacity-low | Adds a low opacity overlay |

**Link Overlay**

| Class | Description |
| --- | --- |
| link-overlay | Expands a link to cover its entire container (use inside position: relative) |

**Overlay with Mask**

Combine overlay with directional mask utility classes to create faded on a side images or faded overlays.

Example:

- overlaymask\_top
- overlaymask\_left

* * *

## Drop Shadow

Add subtle or strong depth to elements using drop shadow utility classes.

- shadow\_xxsmall
- shadow\_xsmall
- shadow\_small
- shadow\_medium
- shadow\_large
- shadow\_xlarge
- shadow\_xxlarge

* * *

## Typography

These utility classes allow you to control alignment and color of text elements globally or responsively.

### Text Color

These utility classes are used to apply specific text colors to an element.

- text-color\_primary
- text-color\_secondary
- text-color\_inverse
- text-color\_inverse-secondary
- text-color\_accent-primary
- text-color\_accent-secondary
- text-color\_accent-tertiary
- text-color\_accent-on-inverse
- text-color\_accent-on-primary
- text-color\_on-accent-primary
- text-color\_on-accent-secondary
- text-color\_on-overlay

### Text Alignment

Text alignment utilities let you override the default left-aligned behavior.

- text-align\_left
- text-align\_center
- text-align\_right

Responsive modifiers:

- text-align\_center\_tablet
- text-align\_center\_mobile-l
- text-align\_center\_mobile

* * *

## Misc

| Class | Description |
| --- | --- |
| events\_none | Disables pointer events |
| events\_auto | Enables pointer events |

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