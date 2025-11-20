## Collection list types

Collection lists are bound to a given Collection and act as a repeater element, allowing you to display a single or multiple CMS items using the same layout and design for each item.

Collection lists pull content dynamically from your CMS, so when you update or add an item in your CMS, it automatically appears wherever the Collection list is used. This not only saves time, but also ensures consistency and scalability as your site grows. It's a powerful way to build dynamic content-driven layouts while still maintaining full visual control through Webflow’s Designer.

Collection list contents can be defined in two distinct ways:

**Dynamic content**, which is retrieved, then optionally filtered, sorted, quantity-limited, and paginated.**Curated**, selected content, which is a specific list of items you explicitly select and sort exactly as you’d like it to be represented.

### Dynamic lists

A dynamic Collection list is ideal for displaying a repeating set of content (or CMS items) that undergoes changes over time. As new items are published, they will automatically display and appear in the Collection list, depending on the Collection list’s settings.

Here are several common scenarios for using a dynamic Collection list:

****List multiple blog posts or articles with titles, dates, and summaries — updated automatically as new posts are added.

Showcase a grid of projects or images stored in a CMS Collection (e.g., design portfolio projects, case studies).

****Present profiles of team members, customer testimonials, products, etc., instead of building each one manually.

For example, events this week. Webflow can automatically update the contents of that list to display your upcoming events.

****This is where the exact same set of items needs to govern the content shown in more than one Collection list.

### Curated Collection lists

A curated Collection list allows you to control what specific CMS items are displayed in a Collection list as well as their order placement — without needing to use filters or sort order functions.

Here are some common scenarios for using curated Collection lists:

Display specific article resources on a static page, displaying featured content.

Use CMS items to power a top-navigation component and order the pages as you choose.

Present a single CMS item displaying a customer testimonial, product, etc., without needing to use filters to set the item.

On a pricing page, easily display a list of specific products and specific details of their pricing.

### Nested Collection lists

A nested Collection list is a Collection list placed inside another Collection list’s item, allowing you to show related or referenced sub-items for each parent item. You can only bind them to the following field types: reference fields, multi-reference fields, and multi-image fields.

Nested Collection lists are useful for when you need to display associated data for each CMS item.

Common scenarios for nested Collection lists:

For example, on a blog listing page, each blog post item can include a nested list of its categories or tags, fetched from a multi-reference field. Site visitors can then see the tags/categories for each post without leaving the listing page.

****If a Collection has a multi-image field (e.g., a product with multiple images), you can nest a Collection to show images for each item.

****Any reference or multi-reference field can serve as the source for a nested list. Let’s say you have a “Conference Talks” Collection and want to display speakers for each talk from the associated “Speakers” Collection.

## Designing with lists

### Best practices for designing and building Collection lists

You can fully customize and style the Collection list element in the Designer, including its layout, typography, colors, spacing, and more. Within each Collection list, you can bind various elements to CMS fields from the Collection.

#### Ensure consistent structure and elements

Reminder: All elements you add to a Collection item will appear for every CMS entry in that Collection list. When designing, make sure you are creating a consistent structure that will work for each item. For example, if your Collection items vary in title name, check your designs with an item that has a short title and a longer title).

#### Ensure visual hierarchy and styling

Treat each Collection item in a Collection list as a “card” that needs a clear hierarchy. Use the correct heading levels when appropriate.

#### Use conditional visibility to handle variations

Conditional visibility lets you show or hide elements based on the presence or value of the CMS fields. Use this to avoid blank spaces when a field is empty, and to add special elements when a condition is met.

Example: Let’s say you have a Collection list of blog posts, and want to show a “Featured” label on featured posts. You can use conditional visibility based on a switch field for that collection to hide the label for items that have the “Featured” switch off.

#### Ensure Collection list design is responsive

Optimize your Collection list design to ensure a seamless experience on both mobile and desktop devices.

### Collection list layouts

Collection lists are structured in three parts, which you can see in the designer’s left nav:

- Collection list Wrapper
- Collection list
- Collection item

You can use these to create a wide range of styles and layouts.

### Responsive card grid layouts

At the desktop breakpoint, set the Collection list element to display: grid in the style panel. Choose the number of columns you want, and set the number of rows to one.

On other breakpoints, increase or decrease that column count to suit your layout.

Use this approach rather than the Columns feature, which requires perfectly consistent item heights to work properly.

### Flex layouts

For variable-sized items that you want to pack more tightly, set the Collection list element to display: flex, and set the direction, alignment, and gap to create your layout.

### Merged Collection lists

When you have a grid or flex layout, but you need to merge two Collection lists, or a Collection list plus additional static items, you can use a special CSS layout technique.

- Wrap the elements and lists you want in a <div>. The elements and lists should be immediate children within this <div>.
- Apply your grid for flex layout settings to that DIV directly.
- On the Collection lists, set both the Collection list Wrapper and Collection list elements to display: contents. This is done by adding a Custom property, at the bottom of the style panel.

This tells the browser to ignore the Collection list wrapper and Collection list, and layout the list items only in the containing grid.

This is especially useful when you’re designing a CMS-driven radio-button filter — e.g., Red, Green, Blue — and you also need an All item to be arranged in that set of choices.

## Configuring dynamic Collection lists

For dynamic Collection lists, there are several settings that allow you to control which content to display.

### Use filters to specify items to display in a Collection list

To display Collection items in a list that meet a specific criteria you define, you can use filters.

- You can add more than one filter. There are no limits to how many filters a Collection list can have. They will be combined by an AND operator.
- When using filters, avoid over-filtering as they can slow down performance or in a worst case scenario exclude all items from your Collection list, displaying an empty state.
- If you want to display a specific set of CMS items in a list, instead of setting filters, use a curated Collection list. Example: Display specific resource articles on a page.

- If you are using a Collection field as a filter and modify the field name or field content, review your Collection lists to ensure you haven’t accidentally impacted any Collection lists. Example: Let’s say you have an Articles list and want to filter items to display articles written by a specific author so you filter by the Author field’s name. If you were to update the name of the author, the filter will break since you are filtering by the exact match name.

### Apply sort orders to organize your list

You can specify the sort order of Collection lists based on a specific field or fields. There are different sort rules available for each field type.

- Random order: Randomizes the order of a list on every publish.
- Smallest to largest or largest to smallest: used to sort number fields.
- Oldest to newest or newest to oldest: Used to sort date fields.
- Is “ON” first or is “OFF” first: Used to sort switch fields.
- Alphabetical (A-Z) and reverse-alphabetical: Used for sorting plain text, switch, date/time, or number fields.

#### Best practices and considerations when applying sort order:

- Use consistent field types for sorting and make sure fields are filled out consistently across all items.
- You can sort by multiple sort rules, but be mindful of how you implement them. Example:
- Sort Rule 1: Sort by Featured (reverse alphabetical)
- Sort Rule 2: Then by Publish Date (Newest → Oldest)

- Content in Collection lists will have featured content appear first and then sorted by recency.
- Alphabetical sorting uses internal database sorting rules which is not locale-aware, and can generate unexpected sort ordering even with U.S. English. For best results, ensure your text field contents use consistent uppercase/lowercase rules.
- If you are using fields for sorting, be mindful of how any updates to the Collection Schema or item field content can impact your designed Collection lists.

### Show a subset of items by limiting number of items displayed

If you want to display a specific number of items, update the number of items displayed in your Collection list.

- Consider responsiveness when choosing item count. The same number of items will be shown on large, desktop, tablet, and mobile breakpoints.
- If you want to vary the number of items shown by breakpoint, you can use
[custom breakpoint-specific CSS](https://webflow.com/made-in-webflow/website/limit-collection-items-by-breakpoint).

### Paginate Collection lists to limit and paginate items in Collection lists

If your Collection list has many items you want to display, you may want to enable pagination to break the list into multiple pages. Pagination helps to not only improve the user experience, but also is good for page load speed and performance as well.

- Consider pagination for lists that are less than 100 CMS items. Although pagination is crucial for displaying more than 100 items in a single collection, lists with fewer items can also benefit from pagination as well to ensure optimal performance.
- Decide on a reasonable number of items to display per page. Often 12-24 items per page is a good balance to ensure an optimal user experience (e.g., users won’t scroll forever) and from a performance perspective (e.g., page load remains quick).

### Optimize images in Collection lists

To ensure performance, optimize images displayed in your Collection lists.

- Use Webflow-native image compression tools to compress images used in CMS to AVIF or WebP format.
- Enable “Responsive images” in Project Settings.
- Ensure lazy loading is in effect.

### Design an intentional empty state

Empty states occur when a Collection list has no items to display. For example, a filter yields no results or the CMS Collection is empty. Rather than leaving users with a blank or confusing layout, use empty states to inform, guide, or engage your users.

- Use the “Empty” state inside the Collection list wrapper: Webflow provides an "Empty" state for Collection lists that you can customize with static content — like messages, illustrations, or links. This content only appears when the list has zero items. Style it just like any other layout block.
- Guide users with clear, friendly messaging: Your empty state text should explain what’s going on. For example: “No blog posts found. Try removing filters or check back soon!”
- Offer an action or alternative: Whenever possible, give users a way forward. For example: link to a relevant page (e.g., “See all articles).

## Next up: Site-level SEO

Learn how to plan, structure, and optimize your Webflow site for SEO — from URL strategies and redirects to canonical tags, sitemaps, performance enhancements, and essential tool integrations.

## More ways to level up

- Help Center
Find solutions to your Webflow questions and get help from our expert customer support team.

Go to docs - Community
Connect with other designers and developers to share tips, ask questions, and show off your work.

Go to forum

**Webflow**Way
