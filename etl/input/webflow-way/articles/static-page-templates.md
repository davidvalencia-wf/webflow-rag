## What are page templates

A **page template** is a reusable, static layout created in **Design mode**. It defines the foundational structure of a page—including fixed elements like headers and footers—and provides **page and component slots** where marketers can drag and drop components in **Build mode**. Templates aren’t published directly; they act as page scaffolds.

Your team may also choose to create page templates to create basic page structure for designers and web developers to use.

The Webflow Way launched with 26 articles. We used static page templates to help build more quickly.

## Why use page templates?

### Speed

Get to market faster with ready-to-go layouts—no need to start from scratch.

### Consistency

Preserve design standards with pre-set structure and branding.

### Ease of use

Templates can give marketers and content editors a starting point to help them use the tool without having to learn how to structure the page.

## Types of templates to consider

When to use

Example use cases

When you want to create a** basic page structure** that has reusable elements, custom code, and settings, but will ultimately become a bespoke or customized page

Basic starting point that includes custom code and/or basic elements like a nav and footer

Each template matches a **specific business need**—a landing page, solution overview, or announcement—with just enough flexibility to customize without risk

- Landing pages
- Competitor pages
- Feature/solution pages
- Event pages

Opt for [CMS templates](https://webflow.com/webflow-way/cms/collection-pages) when building pages that share the same structure and style and only differ in content

- Blog posts
- Help articles
- Gym locations
- App marketplace

When building a bespoke page that doesn’t share any structure/design with other pages on your site

Home pages

We recommend creating static page templates for landing pages, feature pages, target persona pages, and use case pages.

## Best practices for template setup

Each page template typically includes:

**Static sections**defined by a designer (e.g., nav bar, hero section, footer)**A drop target**(“page slot”) between your nav bar and footer, often nested in your main page section**Optional default content**inside the drop target

You may want to configure common layouts like cards, sliders, grids, and testimonial sections that teammates can configure on a new page created from the template.

You may also include default components inside component slots.

## Best practices for designers

- Use use-case based templates names (e.g., Landing page template, Developer template)
- Configure page settings like SEO, OG tags, etc that can be reused across pages
- Use contextual labels for slots (e.g. “Hero Slot”, “Card Slot”, “Features Slot”), so marketers know where they should place certain components
- Add default components inside slots to help marketers get started

## Limitations & other considerations

- A single site can have up to 40 templates
- Changes made to a template do not cascade to pages already created from it
- Only users with a Designer role can create page templates
- You cannot nest page slots inside of components. Use component slots to create flexibility inside components

## Next up: Libraries

Libraries help ensure brand consistency across multiple sites.

## More ways to level up

- Help Center
Find solutions to your Webflow questions and get help from our expert customer support team.

Go to docs - Community
Connect with other designers and developers to share tips, ask questions, and show off your work.

Go to forum

**Webflow**Way
