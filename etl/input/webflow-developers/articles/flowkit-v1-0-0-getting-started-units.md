---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/v1.0.0/getting-started/units
title: "Units | Webflow Developer Documentation"
published: 2025-11-17
---

## Overview

The primary unit of the framework is `REM`. It’s used for sizing, spacing, and typography to ensure flexibility and accessibility. Other units also used based on the use-cases. Here is the list of all the units used:

| Category | Unit | Primary Uses | Description |
| --- | --- | --- | --- |
| **Responsive** | `REM` | - Typography<br>- Spacing<br>- Components | Scales with root font size (default: 16px) |
|  | `EM` | - Button padding<br>- Icon sizes | Scales with parent element’s font size |
| **Layout** | `%` | - Container widths<br>- Max-widths | Relative to parent element’s size |
|  | `FR` | - Grid columns<br>- Grid layouts | Distributes available space in CSS Grid |
| **Viewport** | `VH`/`VW` | - Hero sections<br>- Full-height layouts | Relative to viewport dimensions |
|  | `DVH` | - Mobile layouts<br>- Dynamic heights | Adjusts for mobile browser chrome |
| **Special** | `PX` | - Borders<br>- Shadows | Fixed-size elements (use sparingly) |
|  | `CQW` | Fluid typography | Character-width-based unit for responsive typography. Requires \[Utility\] CQW Container |

* * *

## Why do we use REM?

`REM` (short for “root em”) is the foundation of our unit system.

- It scales based on the root `<html>` font size (by default `16px`)
- It makes spacing and typography fluid-responsive and consistent
- It improves accessibility and user control

If `1rem = 16px`, then:

| REM | Pixels |
| --- | --- |
| `0.5rem` | 8px |
| `1rem` | 16px |
| `2rem` | 32px |

You can override the base by embedding a rule in your Webflow project custom code:

```
<style>
  html { font-size: 20px; } /* 1rem now equals 20px */
</style>
```

##### Pro Tip

To see the font size change reflected in the Webflow Designer, it’s best to place this code inside a [Code embed element](https://help.webflow.com/hc/en-us/articles/33961332238611-Custom-code-embed) within a reusable Component. This ensures the override is included on every page of your project.

* * *

## REM in Webflow

Webflow supports REM-based math directly in input fields. You can type formulas like 64/16 hit `↵` and get a result of 4. In Webflow `PX` is the default unit, you can switch to REM by clicking on units indicator and select REM, or simply add 64/16REM, hit `↵` and get `4 REM`.

![Style Guide](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/flowkit/pages/v1/units/flowkit-calc.gif)

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