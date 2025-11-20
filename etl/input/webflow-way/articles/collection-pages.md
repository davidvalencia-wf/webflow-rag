## Key concepts

### CMS Collection page template

CMS Collection page template is a reusable design that displays content from each item in a CMS Collection using a single layout. When you create a CMS Collection, Webflow automatically creates a Collection template page for it. Each page pulls in unique data (text, images, links, etc.) from the CMS item it's linked to, but uses the same structure and styling.

### CMS Collection page

CMS Collection page (or CMS Collection item page) is a unique page using the Collection page template that shows the specific content of a specific CMS Collection item.

Some key traits to keep in mind:

- URLs are automatically generated based on the Collection’s slug (e.g., /blog/my-article)
- Content is pulled dynamically from the CMS fields (title, image, description)
**** - Editing the Collection page template will update the layout for all CMS Collection pages that are using it.

## When to use a Collection page

Similar to static pages, you can visually design and develop the Collection page template. What makes Collection pages unique is that you can connect different elements in your design to fields in your Collection which will then dynamically populate the value of that field into the element.

### Easily generate new pages

****Create dynamic pages (e.g., blog posts, product pages, team member profiles) by adding entries to the CMS without designing each one manually.

### Bulk layout and design management

If you want to update the design of your Collection page template, you only need to modify a single CMS Collection page. The updates will then instantly apply to all CMS Collection pages within that Collection.

### Scalable SEO

****Each CMS page can have unique, dynamically-generated SEO metadata (title tags, descriptions, URLs) for better indexing.

### Uniform styling

Ensures all CMS-driven pages follow a structured layout, maintaining brand and design consistency.

### Client-friendly editing

****Non-technical users can add and update content without touching design elements.

## Best practices for set up

### General best practices

#### Establish consistent structure and elements

Establish a consistent layout that can accommodate varying content. Use common design patterns for items of the same type, so all pages in the Collection feel cohesive.

#### Optimize images on your Collection page templates

To optimize performance, optimize images displayed on your Collection page templates.

- For images that you’ve already uploaded to items that you want to compress, you can use Webflow’s built-in compression tool that will compress all images into AVIF or WebP file types. Note: Check which browsers support WebP or support AVIF.

- If a CMS image will be displayed on a page, set a maximum file size to ensure collaborators upload images that are optimized for page performance.

- By default, images are responsive. To disable this, you will need to do this in the Image element’s settings.
- Ensure lazy loading is in effect for any images below the page fold.

### How to create variations in a Collection page template

#### Dynamic color styles

You can use color fields to assign color values to individual CMS items. Then in your Collection page template, you can dynamically pull each item’s color value into the design. These color values can be used for text, background, and border colors.

**Example use cases: **

- Style category Collections, like blog post categories, so each category is represented with a unique color
- Highlight labels with different background colors for each label
- Alternate text colors for tags
- Alternate border colors to highlight items from the same category

#### Conditional visibility

[Conditional visibility](https://university.webflow.com/lesson/conditional-visibility?topics=cms-dynamic-content) lets you show or hide elements and create unique designs based on different criteria involving your CMS fields (e.g., show an element depending on the value of a Collection field, or hide an element bound to a Collection field when that Collection field is empty). Conditional visibility can be applied to individual elements on Collection pages or entire sections to create more complex variations.

Example use cases:

- If you have labels such as “Featured,” “On-sale,” “Out of stock,” etc., you can use conditional visibility to show them only on items that have a specific switch set to “Yes.”
- For example, you can create a contact form section on the Collection page. Then you can create a switch called "Show contact form" in your Collection. Now, if you set a conditional visibility rule on this section, the contact form will only show on Collection pages for Collection items with the contact form switch set to “Yes.”

**Considerations: **

- Before you create additional custom fields to support complex template variability, keep in mind there are limits to the number of fields you can have per Collection depending on your site plan.
- Ensure that you are using this technique strategically and keep the core style uniform in place so that the Collection item pages still feel like part of the same site.
- Conditional visibility is hidden with the CSS display:none property, which means hidden content is still present within the source code of your page. It’s still possible for search engines to find and index hidden content, and for hidden content to create code bloat on your page. Where needed, you can use custom JavaScript to remove conditionally hidden content from the DOM of the rendered page.
- To prevent hidden content from appearing in a page’s source code, for a specific field and element, you can update the Visibility setting to “Hidden” or use component properties to control it.

#### Component visibility properties

To reuse layouts across different CMS Collection pages while preserving a consistent design, you can connect and display some types of CMS Collection data in component properties. This is especially useful when you bind a CMS switch field to a component visibility property. When content is hidden through the visibility property, it is rendered server-side, so hidden elements do not appear in the source code of a page.

#### Conditional visibility vs. create a new Collection:

Here are some common scenarios and use cases for when you should use conditional visibility vs. creating a new Collection and Collection page template:

##### When to use conditional visibility


- If you need all items in a page to share the same URL subdirectory.
- The content type is the same, but the layout changes slightly. Example: You have a “Team Members” Collection and want to show a LinkedIn button only if a profile link exists.
- You want to hide/show specific components or elements.
- Think of sections, divs, or buttons that apply only under certain conditions – you can then use visibility rules tied to CMS fields like “Switch,” “Option,” or Reference fields.


##### When to create a new Collection and Collection template page:


- The content type and schema are fundamentally different.
- The design and layout need to be completely different.

## Publishing and performance

### Publishing control

Although Webflow automatically creates a template page for each Collection, you can decide whether or not a Collection’s template pages are published along with your site. By default, Collection template pages are set to publish, but you can switch this off in Collection template page’s settings. This is especially helpful when you use a Collection headlessly for data storage only and do not want item pages to be live and indexed by search engines.

### Performance considerations

For both SEO and user experience, it’s important to ensure that you’re still optimizing your Collection page templates for performance.

- If you have a Collection list on your Collection list page template that displays 10+ items, consider enabling pagination.
- Ensure any custom code or third-party widgets you include are necessary and asynchronously loaded if possible.

## Next up: Collection Lists

Collection lists allow you to design and display CMS items on static or dynamic pages, outside of their individual pages.

## More ways to level up

- Help Center
Find solutions to your Webflow questions and get help from our expert customer support team.

Go to docs - Community
Connect with other designers and developers to share tips, ask questions, and show off your work.

Go to forum

**Webflow**Way
