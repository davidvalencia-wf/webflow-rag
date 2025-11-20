## The three core approaches to multilingual content

**Translation**delivers the same message in a different language**Localization**adjusts the content for regional fluency, clarity, and norms**Transcreation**reimagines the content to resonate emotionally and culturally with a specific audience

Choosing the right approach, and knowing when to use each, helps you scale your content strategy while staying authentic to your brand in every market.

**Approach**

Purpose

Text strategy

When to use

Example: French to English

**Translation**

Convey the same meaning in another language

Translate word-for-word while preserving structure and tone

When you're translating a legal disclaimer or pricing table

"Découvrez notre plateforme intégrée" → "Discover our integrated platform"

**Localization**

Make the content feel natural and familiar to a local audience

Adapt phrasing, grammar, and idioms for clarity and local expectations

When you're adjusting UI copy or product descriptions for Canada vs. France

"Découvrez notre plateforme intégrée" → “Discover our all-in-one platform"

**Transcreation**

Capture the intent and emotion behind the message

Rewrite the content to reflect how the audience *thinks, feels,* and *searches*

When you're adapting a campaign headline or homepage for UK vs.US audiences

"Découvrez notre plateforme intégrée" → "Launch your site with confidence — everything you need, all in one place"

## Localize CMS content

The Webflow CMS allows you to manage structured content (like blog posts, product listings, team bios, etc.) across all locales using a shared schema and per-locale content overrides. This structure makes it ideal for scaling multilingual content — whether you’re translating, localizing, or transcreating.

### How CMS localization works

- When you add a new locale, Webflow clones all existing Collections and their items into that locale.
- The
**Collection schema**(fields, templates, references) is shared across all locales. - Each CMS item is localized individually. Initially, content is inherited from the primary locale, but you can override fields per locale.
- Once a field is overridden, it becomes independent — future edits in the primary won’t overwrite the translated or localized version.

### How the approaches apply to CMS content

Approach

Strategy

Example

**Translation**

Translate content field-by-field using the CMS locale toggle. Structure, tone, and layout stay the same.

A product description is translated from French to English but keeps the same format and callouts.

**Localization**

Adapt phrasing, examples, formatting, or terminology to suit local expectations.

A blog post for the Canadian market includes references to Canadian regulations or spelling (e.g., “favour” instead of “favor”).

**Transcreation**

Rewrite or add independent content to reflect different messaging, emotional tone, or structure.

A promotional blog post in Japanese is rewritten to align with local storytelling and includes new headlines, CTAs, and quotes.

#### Best practices for localizing CMS content

Since all locales share the same fields, design with all markets in mind. Add optional fields like "Disclaimer," "CTA variant," or "Regional note" where needed.

The globe icon indicates which fields have been overridden. Inherited content updates with the primary; overridden content does not.

Global content must be created from the Primary locale to create linked versions of the item.

Global content must be created from the Primary locale to create linked versions of the item.If a blog post links to an author or category, those references are localized too — each pointing to the version in that locale.

Webflow’s CMS API lets you create and manage items per locale, whether publishing globally, to a few locales, or one region only.

Create a new item directly in the locale, when the content is specially relevant to that market.

## Localize static page content

Static content refers to content created directly in the Webflow on pages like your homepage, pricing page, and About page. Like CMS content, static content is localized on a per-locale basis, with content and styles inheriting from the primary locale until they’re overridden.

### How static page localization works

- When a new locale is added, each static page is duplicated under that locale and inherits its content from the primary.
- Text, links, images, alt text, and Components can be customized in each locale’s version of the page.

Approaches

Strategy

Example (French to English)

**Translation**

Override headline and body copy on canvas with direct translations. Leave layout and imagery the same.

A landing page reads the same in English and German, but with translated strings.

**Localization**

Adapt terms, currency formats, or product names to match local usage. Swap imagery or links if needed.

A pricing page for the UK uses “from £20” and features a local contact.

**Transcreation**

Restructure sections, rewrite CTAs, or change layout order to better suit local storytelling or emotional tone.

A French version of the homepage reorders value props, shortens the headline, and replaces the hero image.

#### Best practices for localizing static content

For headers, CTAs, and repeated blocks, Components make it easier to localize content via props or main overrides.

While static pages exist per locale, you can’t create locale-only static pages. Every static page must be present in all locales.

For headers, CTAs, and repeated blocks, Components make it easier to localize content via props or main overrides.Just like CMS content, static images and links can be swapped per locale, and alt text should always be localized.

Since localization is done visually, build a QA checklist to ensure no locale is missing critical content.

## Localize SEO

Search engine visibility doesn’t stop at translating metadata. To succeed globally, you need to adapt your SEO strategy to how people search in each language, region, and culture.

Webflow's Localization feature allows you to customize all key SEO fields per locale, including page titles, meta descriptions, slugs, Open Graph tags, and more. These fields follow the same inheritance and override model as other content in Webflow.

Field

Where it’s managed

**Page title**

Static page settings or CMS template settings

**Meta description**

Static page settings or CMS template settings

**Slug (URL path)**

Static page settings or CMS template settings

**Open Graph title & description**

Static page settings or CMS template settings

**Image alt text**

Asset Manager (static) or CMS field per locale

**Hreflang tags**

Automatically generated by Webflow per locale

**Sitemap**

Localized and generated automatically

### SEO strategy across the three approaches

Approaches

Strategy

Example (French to English)

**Translation**

Translate titles, descriptions, and slugs directly. Keep structure and keywords consistent with the source.

/plateforme-integree → /integrated-platform

**Localization**

Adapt titles, keywords, and phrasing for regional search behavior. Adjust slugs to match how locals search.

/plateforme-integree → /all-in-one-platform

**Transcreation**

Rethink SEO to reflect local search intent, emotion, and behavior. Titles and descriptions may be completely rewritten.

/plateforme-integree → /build-grow-online

### Best practices for localized SEO in Webflow

Don’t just translate metadata word-for-word. Consider how your audience actually searches, their phrasing, tone, and expectations.

Webflow allows you to set a localized URL slug for each page. Use this feature to improve SEO and readability (e.g., /a-propos instead of /about-us).

Social sharing content should match the tone and context of the locale. Localize OG titles and descriptions just like SEO fields.

The right keywords in one country may not work in another, even if the language is the same. Use tools like Google Trends or SEMrush to identify relevant terms per region.

Localize image alt text for every market to support both accessibility and image SEO.

Webflow handles hreflang tags and generates separate sitemap entries per locale, improving international SEO visibility without manual setup.

## Using machine translation in Webflow

Webflow offers built-in machine translation (MT) to help you quickly translate content across your site, including static pages, CMS content, and SEO fields. It’s a powerful way to accelerate localization, especially when launching in new markets or translating large volumes of content.

But MT is just one piece of a full localization strategy. To use it effectively, it's important to understand how it fits into the three core content approahces: Translation, Localization, and Transcreation.

### What can be machine translated

Content type

How it's translated

**Static content**

On-canvas elements (headings, paragraphs, links, buttons, alt text) can be machine translated on canvas.

**CMS content**

Text fields (plain or rich text) in CMS items can be machine translated per locale.

**SEO fields**

Page titles, meta descriptions, Open Graph content, and slugs can be machine translated per locale in Page or CMS settings.

### How machine translation fits into the approaches

Approaches

Role of machine translation

Recommended use

**Translation**

Primary tool, machine translation offers a fast and scalable starting point for direct translation.

Use MT to translate static and CMS content, then review and edit for accuracy.

**Localization**

Helpful as a draft, but requires review and adjustment for region-specific terms and tone.

Use MT to accelerate translation, then localize product names, spelling, grammar, cultural references.

**Transcreation**

Not suitable, MT can't recreate tone, emotion, or brand positioning.

Don’t use MT for high-impact marketing copy, landing pages, or campaigns requiring narrative.

### When to use machine translation

#### Use machine translation when:

- The content is
**informational**, not emotional (e.g., product specs, FAQs, system text) - You need a
**first draft**to accelerate content production - The page or locale is
**low-priority or experimental** - You're translating
**SEO metadata**to get started quickly, with plans to localize later - You're localizing
**large volumes of CMS content**(e.g., documentation, blog posts) - You have a clear
**QA process**to review and refine translations after generation

#### Avoid machine translation when:

- The content is
**brand voice-sensitive**(e.g., homepage hero, campaign CTA) - The page contains
**idioms, humor, or culturally specific references** - You’re targeting a
**high-impact market or priority launch** - The tone needs to evoke
**emotion, trust, or urgency** - You’re
**repositioning messaging**or changing narrative structure per region - You require
**regulatory accuracy**(e.g., legal or financial disclosures)

#### Best practices for using machine translation in Webflow

Even in translation workflows, it's critical to have a human reviewer ensure terminology, grammar, and brand tone are correct.

Even in translation workflows, it's critical to have a human reviewer ensure terminology, grammar, and brand tone are correct.Using the "translate entire page" option is often faster than translating elements individually. Review the result holistically after generation.

Webflow supports a **custom glossary on Enterprise** that locks specific terms (like product names, brand phrases, or technical terminology) to predefined translations.

This is especially useful for:

- Company names or product lines that should never be translated
- Industry-specific terms that must remain consistent
- UI phrases or CTAs with precise meanings

Use it for informational or structural content like system labels, product specs, or documentation, but not for brand taglines or headlines where nuance matters.

Especially helpful for launching MVPs, internal reviews, or low-priority locales, MT can get your site multilingual quickly, then you can refine content iteratively.

After generating MT content, you can override any field manually, just like with any other localized content. This is especially useful for SEO fields and slugs.

Let content, brand, and legal teams know which content was machine translated, what’s been reviewed, and what’s still in draft.

## Localize text with Webflow APIs

For teams working across multiple locales, Webflow’s APIs make it possible to automate content localization across static pages, CMS items, SEO metadata, and reusable components. Whether you are integrating with a translation management system (TMS), syncing from a headless CMS, or building an internal editorial workflow, the APIs give you fine-grained control over localized content at scale.

### What you can do with Webflow's Localization APIs

Using the **CMS API**, **Pages API**, and **Components API** together, you can:

- Create content for multiple locales in a single operation
- Translate or update content in static pages, CMS items, and Components
- Programmatically manage SEO metadata and slugs for every locale
- Push translated content from an external system directly into Webflow
- Keep localized pages and components aligned with global brand structure

All three APIs work with Webflow’s localization model, where content starts by inheriting from the primary locale and can be overridden for each secondary locale.

#### Key use cases

Use case

Supported by

Create a blog post in English, French, and Spanish

CMS API

Translate headings and button labels on the homepage

Pages API

Update localized CTAs inside a reusable hero component

Components API

Customize slugs, titles, and meta descriptions per locale

CMS API and Pages API

Sync translated content from a TMS or spreadsheet

All APIs

Create a French-only campaign post

CMS API

## Next up: Publishing localized content

In Webflow, you have the ability to stage and launch content across locales in a way that matches your content maturity, regional readiness, and marketing goals.

## More ways to level up

- Help Center
Find solutions to your Webflow questions and get help from our expert customer support team.

Go to docs - Community
Connect with other designers and developers to share tips, ask questions, and show off your work.

Go to forum

**Webflow**Way
