## Why use Localization?

### Capture untapped market potential

Adding locales lets you connect with users in new geographic regions, many of whom may not engage with content that’s only in one language. By adding additional locales, you can expand your product, services, and brand visibility to more people.

If you’re not sure about the potential of a new market, you can add a locale to measure the impact some regional content can have.

### Enhance user experience and accessibility

Create more personalized user experiences that can connect users to your brand and services.

### Boost SEO in multiple regions

****Search engines prioritize relevant, localized content. Adding locales helps your site rank for region-specific keywords, bringing in more organic traffic from each region you serve.

### Optimize ad spend

Research the Cost Per Click (CPC) cost for different target regions to see if driving traffic to your region specific site has better ROI.

### Regulatory need

You might be running an organization that is required by law to have different versions of your site for specific regions or languages.

## Approaches to website localization

When expanding your website to reach a global audience, it's important to understand the different approaches you can take:

**Translation**is the process of converting content directly from one language to another, maintaining the original meaning.**Localization**goes a step further, adapting not just the words, but also the design, cultural nuances, and user expectations of specific regions.**Transcreation**reimagines content creatively to preserve the original intent, emotion, and brand voice — even if that means creating entirely new expressions for different audiences.

In Webflow, you have the flexibility to adopt all three approaches, starting with simple translation, scaling up to full localization, and building custom experiences through transcreation.

**Capability**

Translation

Localization

Transcreation

**Setup**

- Add primary and secondary locales based on language only (e.g., fr, es)
- Choose a root vs. subdirectory structure
- Enable URL Routing

- Add secondary locales with both language and region focus (e.g., fr-CA, es-MX).
- Choose a root vs. subdirectory structure
- Enable URL Routing

- Add secondary locales with language and region focus (e.g., en-US, en-UK
- Customize folder names (eg., /us, /uk)
- Choose a root vs. subdirectory structure
- Enable URL Routing

**Design**

- Use Webflow Design Systems to maintain design consistency
- Use localized styles to control for text contraction and expansion
- Use localized styles to choose fonts that support the target language

- Use Component Style Variants to change a components design to match the locale
- Create locale based style variable collections in combination with localized styles

- Combine Component Style Variants, locale-based variable collections, and conditional visibility to design culturally distinct layouts for market-specific storytelling

**Media & Assets**

- Swap out links to docs and PDFs to translated version use localization overrides

- Swap images, videos, and icons to reflect regional culture and preferences

- Swap images, videos, icons and docs for regionally specific story telling

**Static & CMS Content**

- Create primary static and CMS pages automatically duplicate into our secondary locales.
- Translate elements, components, and CMS fields manually or with machine assistance, while preserving the original meaning
- Reset elements and fields when original content changes, to translate again


- Localize elements, component and CMS fields to adopt the language, and choose terms and phrases that fit regional preferences and cultural nuances

- Use Static Draft Pages to show and hide regional specific content
- Create independent CMS items to create highly tailored content for each locale, adjusting messaging, storytelling, and structure as needed

**SEO**

Convert existing SEO content into another language accurately: Translate original keywords

**Titles and descriptions**: Keep structure and meaning intact******Page slugs:**Translate literally

Adapt SEO content to reflect local language usage and search behavior

**Titles and descriptions**: Modify structure, tone, and formatting for regional fluency**Page slugs:**Shorten or rephrase to match local conventions and readability

Recreate SEO content to match cultural expectations and emotional resonance

**Titles and descriptions**: Write entirely new messaging optimized for market-specific emotional and functional triggers**Page slugs:**Rewrite to reflect local positioning or value propositions

**Workflow & Tools**

Smaller teams

- Webflow native UI
- Machine translation for a first pass
- Manual reviews

Growing cross-functional teams including: Marketing, design and translators

- Build / Edit Mode
- Machine translation for a first pass
- Design systems
- Commenting

Scaled teams with regional stakeholders

- Build / Edit Mode
- APIs & TMS integrations
- Branching and Staged Branching
- Design systems
- Commenting

## Adding and managing locales

### What is a locale?

A locale represents a combination of:

- A language (e.g., French, Spanish, Arabic)
- Optionally, a country (e.g., Canada, Mexico, France)

Locales are used to configure:

- Language of the content
- URL structure (e.g., /fr/, /fr-ca/)
- URL routing and hreflang behaviour

Aspect localized their 50+ page site across 5 secondary locales.

### Primary vs. secondary locales

Term

Definition

Purpose

Primary locale

The default language/country for your Webflow project. It’s the base site you design first.


Tip: Be mindful and intentional when selecting your primary locale it can be changed at anytime, however localizations do not automatically update.

Defines your core audience and primary operations area.

Secondary locale

Additional locales you add to serve other audiences or markets.

Represents all other translated, localized, or transcreated versions of your site content.

### Choosing locale structure: Language-only vs. Language + Region

Structure

Example

When to use

Language-only

`/fr/`


Use when your content applies broadly to all speakers of a language, regardless of location. Ideal for translation or basic localization.

Language + Region (ISO)

`/fr-ca/`


`/es-mx/`


Use when content varies by country or region ( e.g., vocabulary, imagery, content availability, compliance) required for region-specific localization and transcreation.

Custom / Market-First

`/uk/`


`/us/`


`/quebec/`


Use when content varies by country or region ( e.g., vocabulary, imagery, content availability, compliance) required for region-specific localization and transcreation.

#### Example:

`/fr/`

serves general French content globally.

`/fr-ca/`

would target Canadian French specifically — accounting for distinct phrases, laws, or offers.

`/fr-fr/`

would do the same for France.

### Choosing the primary locale URL structure

In Webflow, you can choose whether your primary locale appears at the root of your domain (e.g., mydomain.com) or lives under a folder/subdirectory (e.g., mydomain.com/en/)

This decision affects:

- SEO structure
- User perception
- Scalability of your localization strategy

#### When to use Root level Locale (No Folder)

- Your primary market is dominant (e.g., Canada is your main audience).
- You want the cleanest possible URL for your main site.
- You’d like a slight SEO preference for the root domain.

#### When to use folder based primary locale (/en/)

- You want structural consistency across all locales (especially for international brands).
- You’re planning for equal treatment of all markets — no default bias.

### Best practices

- Start simple: If you’re just beginning global expansion, a language-only locale like
`/fr/`

might be sufficient. - Get specific where needed: As content becomes more market-tailored, use region-specific locales like
`/fr-ca/`

or`/es-mx/`

- Be consistent: Follow ISO conventions for folder naming unless transcreation requires a branded or simplified variation.
- Plan ahead: Even if you’re only supporting one region now, defining locales precisely helps scale in the future without rework.

## Dive deeper

### Localize design and assets

Design is more than aesthetics, it's how your content communicates across cultures. As you translate, localize, or transcreate your website, your design system must adapt to support different languages, scripts, layouts, imagery, and emotional contexts.

In this section, we explore how to scale and adapt typography, layout, color, media, and components across locales using Webflow, from simple translation tweaks to fully transcreated visual experiences.

### Localize text and SEO

Words shape experience, and localizing the words on your website is just as important as translating them. From CMS-driven blog posts to static page headlines to page slugs and meta descriptions, your words need to be clear, culturally fluent, and searchable in every market you serve.

This section explores how content strategy and SEO practices scale across the pillars of translation, localization, and transcreation, and how Webflow helps you manage this across:

- CMS content
- Static page content
- SEO metadata
- Machine translation
- Localization via API

We’ll walk through how to adapt CMS content, static pages, and SEO metadata across locales, and how to use Webflow’s built-in tools, APIs, and translation workflows to scale multilingual publishing efficiently and accurately.

### Publishing localized content

Publishing localized content isn’t one-size-fits-all. This section outlines how Webflow handles publishing across locales, and how to time your rollouts based on your content goals, whether you’re translating, localizing, or transcreating. It also covers which tools allow you to stage content before launch, and how publishing behavior differs between CMS items and static pages.

## Next up: Localize design and assets

Creating a truly global website goes beyond translating text — it requires adapting the design to fit the needs of different languages and cultural expectations.

## More ways to level up

- Help Center
Find solutions to your Webflow questions and get help from our expert customer support team.

Go to docs - Community
Connect with other designers and developers to share tips, ask questions, and show off your work.

Go to forum

**Webflow**Way
