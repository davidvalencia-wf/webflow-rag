---
source: webflow-developers
category: general
url: https://developers.webflow.com/flowkit/variables/typography
title: "Typography | Webflow Developer Documentation"
published: 2025-11-17
---

The typography system provides consistent text styling with variables to control **size**, **spacing**, and **hierarchy**.

The base typography variables define the fundamental text properties used throughout the project. These variables are inherited by the default Paragraph, Text elements, and Body tag.

| Base Typography Variable | Property |
| --- | --- |
| Base Font | Font Family |
| Base Font Size | Font Size (1rem) |
| Base Font Weight | Font Weight |
| Base Letter Spacing | Letter Spacing |
| Base Line Height | Line Height |
| Base Margin Bottom | Margin Bottom (using em units) |

##### Note

In the Webflow Variables panel, these variables appear exactly as shown in the **Properties** column above.
In the Styles panel, purple color indicates that the property is linked to a variable.

![Styles panel with linked variables](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/flowkit/pages/v2/typography/flowkit_typography.webp)

* * *

## Font Family

A font family is applied to text elements through the variable. To update the font, make changes in the Variables panel.

| Font Variables | Usage |
| --- | --- |
| Heading Font | All H1-H6 Heading and heading\_h1 through heading\_h6 heading selectors |
| Body Font | Body tag, All Paragraph tag, default text, text links |
| Button Font | Button tag, button class, tag class, etc. |

* * *

## Headings

Heading tags and classes use the same variables, making it easy to keep styles consistent and manage them in the variables panel.

Here’s an example of how variables are applied to the heading\_h1 and All H1 Heading tag:

![Styles panel with linked variables](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/flowkit/pages/v2/typography/flowkit_heading.webp)

Each heading level has its own responsive variables for different breakpoints, following the same pattern.

##### Subheading

For consistency across the site, Flowkit uses the subheading class to accompany headings.

It works with any text element and automatically inherits its color, applying a transparent tint.

* * *

## Paragraph

Similar to headings, All Paragraphs selector, text class, and its size variations properties are controlled through related text variables.

Available text sizes:

- All Paragraphs
- text (default)
- textis-small
- textis-large
- textis-xlarge
- textis-xxlarge

* * *

## Default Spacing

Headings and paragraphs have default bottom spacing applied via variables.

For example, the heading\_h1 and All H1 Heading use the variable H1 Margin Bottom

The same pattern applies to paragraphs using Base Margin Bottom.

To override this spacing, use a margin utility class such as:

margin-bottom\_none

See the full list of margin utilities [here](https://developers.webflow.com/flowkit/reference/utilities#margin).

* * *

## Utility classes

Also check how to use utility classes to override the default behavior of typography classes:

- [Text Color Modifiers](https://developers.webflow.com/flowkit/reference/utilities#text-color)
- [Text Alignment Modifiers](https://developers.webflow.com/flowkit/reference/utilities#text-alignment)

* * *

## Best Practices

- **Use variables for consistency** — Modify variables when possible instead of creating custom styles.
- **Choose appropriate sizes** — Use textis-small for small text, textis-large / is-xlarge / is-xxlarge for emphasis.
- **Maintain readability** — Ensure text remains readable at all screen sizes.
- **Preserve hierarchy** — Maintain clear distinction between headings and paragraph text.
- **Semantic order** — Keep the hierarchy in tag usage (e.g., `h1` \> `h2` \> `h3` \> `p`).
- **One H1 tag per page** — Only one `h1` tag per page. If you need multiple visually styled H1s, apply the heading\_h1 class instead.

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