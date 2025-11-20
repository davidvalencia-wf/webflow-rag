---
source: webflow-developers
category: general
url: https://developers.webflow.com/browser/optimize/variations
title: "Variations | Webflow Developer Documentation"
published: 2025-11-17
---

Variations are alternate versions of a webpage shown to some visitors. By showing different variations to different visitors, you can test which version resonates best and drives more engagement. Variations are always part of either a test or personalization optimization.

For example, to test three new homepage headlines, you’d create an optimization for the homepage with three variations—one for each headline. To learn more about variations in Webflow Optimize, visit [the support documentation](https://help.webflow.com/hc/en-us/articles/33776880496275-Create-or-edit-optimization-variations).

## API callbacks

After each variation is recorded, the applied variation is passed to callback functions registered via [`onVariationRecorded()`](https://developers.webflow.com/browser/optimize/onVariationRecorded). Note that each time a variation is recorded, the callback fires (as opposed to just once per page).

Use the [`onVariationRecorded()`](https://developers.webflow.com/browser/optimize/onVariationRecorded) method to capture variation data and send it to custom in-house analytics tools.

## Looking for more information?

Visit the [Webflow Help Center](https://help.webflow.com/hc/en-us/articles/33776880496275-Create-or-edit-optimization-variations) to learn more about variations in Webflow Optimize, including:

- Creating and editing variations
- Setting variation strengths and traffic allocation
- Previewing variations before publishing
- Best practices for variation design
- Troubleshooting common variation issues

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