## Which role is best for my use case?

[Page building](https://webflow.com/page-building) was designed to enable marketers to build landing pages in Webflow. Users with a **Marketer role** have access to page building. This is compared to [Edit mode,](https://webflow.com/edit-mode) which gives users with a **Content editor role** access to a simplified canvas to make copy and image updates.

So which role should you choose? This really depends on your comfort level and use case. For those looking to generate content, we recommend the Content editor role. For those looking for more flexibility and capabilities to create new pages, we recommend the Marketer role.

Role

Description

Best for...

**Content editor role**

Gives you access to edit mode which empowers your copy and content teams to edit content, manage assets, localize content, and more.

- Generating or updating content
- Translating content
- Updating site assets

**Marketer role**

Gives you access to drag-and-drop page building using pre-built components so that marketers can self-serve landing pages for events, campaigns, and new products.

- Creating and optimizing landing pages
- Launching A/B tests
- Executing campaigns

For more guidance on how to set your team up with the right roles and access, see [Inviting your team](https://docs.google.com/document/d/1jSrI1_pboYDTb2K1YV9uhR1hQebzXy_b84EZeEibBQk/edit?tab=t.ifh8sb78ld57). Let’s dive into the benefits of each experience.

## What is page building?

Page building is a drag-and-drop interface that allows users with a marketer role to add approved components to build your page. Designers create the guardrails by creating configurable components that follow underlying web best practices. Marketers assemble and edit pages without ever touching the underlying CSS or breaking the system.

Use page building when you need to ship pages that can be built out of common components. Some examples includes:

**Landing pages**for campaigns, events, product launches, and gated content**Solution or feature pages**that mirror established layouts**Competitor or comparison pages**built from a standard pattern

### Why use page building?

**Speed to launch:**Marketers publish campaigns without waiting on dev cycles.**Flexibility**: Marketers may want to leverage more of your design system to create customized pages that go beyond what you’ve configured in the CMS.**Brand consistency:**Components and templates are built to follow your brand and style guides, so no rogue fonts or classes are slipping through.**Scalability:**A component-first library stays tidy even after your team has created hundreds of pages.

### Laying the foundation: Best practices for designers and developers

Page building requires setting up a few building blocks:

**Page templates**provide overall page scaffolding.**Page slots**act as drop targets for components. Marketers cannot make structural changes to pages that don’t have a page slot.**Components**are reusable, styled set of elements (e.g., Hero, Card, FAQ, testimonial).**Component slots**are placeholders within your components where marketers can add other components.

Getting your team set up for success requires a clear strategy and a time investment. Here’s how we recommend approaching the set up process to make the most of your time:

### Consider a framework that aligns with your team's needs

****There are many great frameworks out there that can help you get started with your design system. Generally, there are two approaches:

- Create full sections and layouts for stricter brand control and faster page assembly
- Create a set of common components to give layout flexibility and create a smaller CSS footprint.

Each has their benefits and tradeoffs, but you can be successful with any approach. The important part is to make sure it will work for your team and their skillset.

### Build component-first

****Create [components](https://webflow.com/webflow-way/design-systems/components) for reusable UI for layouts that enable marketers to configure a page and its content. Based on your approach, this could include creating full sections or a set of components that can be configured with buttons, text, and images. Page building only allows marketers to place components on a page if it’s in a page slot, so you’ll need to remember to add a page slot to templates.

### Create templates

****Create static [page templates](https://webflow.com/webflow-way/design-systems/static-page-templates) for common and reusable pages. Add at least one page slot to the Body of the page to ensure marketers can drop in components.

#### Best practices for marketers building pages

**Start from a template when possible:**Static page templates inherit SEO/meta settings so you’re never missing essentials.**Stay inside the page slot:**If you can’t drop a component, you’re probably outside the page slot — ask a designer to confirm the page you’re editing has a slot.**Use props to configure components:**Use the props in the right hand panel to configure components to meet your needs.

### Preview, stage, and publish

****Once you’re done making updates, we recommend sharing a preview link with your team to QA and approve your page. When you’re ready, you can stage or publish your changes.

### Use page building across your team

While we designed page building to enable marketers or clients to build in Webflow, page building also makes it easier and faster for experienced Webflow users to build out pages. Generally, we recommend building pages from static page templates for any page that can be built from the components that already exist in your site. In fact, using page building enables greater consistency and less overhead since you’re using approved and configured components.

When you need a bespoke layout, alternative styles, or advanced interactions, we recommend starting your page from scratch.

The Mural team relies on page building to empower marketers to build their own pages for campaigns.

## What is edit mode?

Edit mode gives content editors (e.g., copywriters, product marketers, content strategists, etc.) the power to edit site content directly on the canvas. Edit mode ensures that site designs stay untouched, while content — such as copy, assets, and videos — is edited. Users with a Content editor role can also access your CMS to edit content.

### Why use edit mode?

**Visual-first:**Edit mode is great for when you want to see content updates within the context of your page.**Simplified interface**: With a simplified interface, edit mode can feel more approachable to users with less experience with CMS tools.**Safe collaboration**: Users in edit mode can only update content (e.g. text, images, links) which ensures the site is safe from breaking changes.

### Laying the foundation: Best practices for designers and developers

Before jumping into the CMS or edit mode, designers need to set up a few building blocks including setting up their [CMS Collections](https://docs.google.com/document/d/1jSrI1_pboYDTb2K1YV9uhR1hQebzXy_b84EZeEibBQk/edit?tab=t.niaiuo3kgu40), setting up [CMS template pages](https://docs.google.com/document/d/1jSrI1_pboYDTb2K1YV9uhR1hQebzXy_b84EZeEibBQk/edit?tab=t.uev7u1pb71tv), setting up [component props](https://docs.google.com/document/d/1jSrI1_pboYDTb2K1YV9uhR1hQebzXy_b84EZeEibBQk/edit?tab=t.o2w1vfwvq0fw), and adding assets.

If you use Webflow’s CMS, you have a few options as a content editor:

**Use the data manager for new or long form content******

We recommend you use the data manager to create net new CMS content like adding a blog post or to update longer form content. You may also choose to make updates in the data manager if you want to schedule something to be published.

**Use on canvas editing for quick updates******

We recommend you make on canvas updates when you’re updating existing content, or when you want to see how the content fits within the overall design of the page.

## Next up: Feedback and testing

Teams have multiple ways to review and test pages and sites before publishing live, including (a) capturing feedback directly in Webflow through comments, (b) leveraging approval workflows, and (c) publishing to a staging environment.

## More ways to level up

- Help Center
Find solutions to your Webflow questions and get help from our expert customer support team.

Go to docs - Community
Connect with other designers and developers to share tips, ask questions, and show off your work.

Go to forum

**Webflow**Way
