## Planning and implementing site structure and navigation

Site structure refers to how your website’s pages are organized and linked together. A clear, logical navigation system helps users find content easily and improves how search engines crawl and index your pages.

### When planning your site structure:

- Keep your site’s structure shallow (no more than three clicks from the homepage to any page)
- Use Webflow’s navigation and footer components to create a consistent and accessible menu
- Include a clear hierarchy with categories and subcategories
- Implement internal linking to guide users to related content

### When designing your site structure:

- Keep menus simple and prioritize key pages
- Ensure dropdowns are easy to use
- Ensure your site is responsive for desktop and mobile experiences

### Defining URL structures

URLs serve as the roadmap to your website's content, guiding both users and search engines to the right destinations. When they are organized properly, your URL structures can enhance the accessibility of your content, improve user navigation, and boost SEO performance.

[Slugs for static pages](https://university.webflow.com/lesson/page-urls?topics=site-settings#static-pages) are managed in the Page settings for each page, whereas [slugs for dynamic pages](https://university.webflow.com/lesson/page-urls?topics=site-settings#dynamic-pages) are managed at the Collection or item level.

**Tip:** When you create a CMS Collection item, a slug will automatically be created based on the item’s name. Consider updating the slug for brevity and clarity.

**Static pages**

****Directories are primarily created through [page folders](https://university.webflow.com/lesson/page-folders?topics=site-settings) in the Pages panel, and subdirectories are created by nesting page folders. Any static page placed within a parent folder will reflect that hierarchical organization in its URL structure.

**CMS Collections**

****Directories and subdirectories are also created through CMS Collections, as each Collection slug serves as a parent directory for the CMS item pages within that Collection. Webflow supports the ability to [nest a Collection’s URL structure](https://university.webflow.com/lesson/structure-and-style-collection-pages#general) under a directory so you have greater control over Collection item page URLs and SEO.

Static pages can have the same slug as a directory or subdirectory, allowing you to create an index page or landing page for that folder.

Note: Webflow does not support the ability to give a Collection and a page folder the same slug — that is, it’s not currently possible for a single directory/subdirectory to contain a mix of static and dynamic content.

### Set up 301 redirects

When your page URLs change during a migration, redirects are critical to your content strategy. They ensure a seamless user experience by directing visitors from old URLs to the appropriate new pages, preventing the occurrence of 404 errors. In particular, 301 redirects are essential in preserving SEO rankings as they transfer the SEO value from the old URL to the new one. They also prevent broken links, ensuring that any existing links to your site on the web continue to lead to valid pages.

In Webflow, you can add and manage [301 redirects](https://university.webflow.com/lesson/set-301-redirects-to-maintain-seo-ranking?topics=seo) in your Site settings — manually or in bulk with a CSV file. As you begin to plan and define your new URL structures in Webflow, we recommend maintaining a list of the old (source) URLs, mapped to their new (target) URLs, as a CSV file for ease of importing later on.

**Use cases for 301 redirects: **

- Site migration
- Replace existing pages
- Modify an existing page slug

**Best practices and considerations: **

If you’re migrating lots of pages, you can add and manage 301 redirects in the Site settings — manually or in bulk with a CSV file.

Note: While Webflow currently doesn’t have a hard limit in place for total redirects, we recommend 1,000 maximum as best practice. Each redirect rule is uploaded to your site’s manifest.json file, which provides site information to visitors’ browsers. As the manifest file grows, there’s more data for browsers to download.

For the best site performance, **use wildcard redirects where possible**, which minimizes the total number of redirect rules.

Only include the path — don’t use full domains. This keeps redirects functional across different environments.

Note: Your source URLs should be listed as a relative path (excluding the domain, so that you can later test redirects on either your staging domain or production domain), although your target URLs can be either relative or absolute paths.

A [wildcard redirect](https://university.webflow.com/lesson/set-301-redirects-to-maintain-seo-ranking#wildcard-redirect-examples) refers to a type of redirect that is used to forward all URLs from one directory to another, regardless of how the rest of the path is structured. This is particularly useful when you're changing the structure of a directory that contains many subpages.

- In Webflow, wildcard redirects involve a capture group, represented by the characters (.*) in the old path. The part of the URL that matches the pattern inside the parentheses is "captured" and can be optionally repopulated in the redirect destination URL.
- For example, if you need to redirect all pages in an old directory to a new directory, while all of its subpage slugs will remain the same, your capture groups would be structured like so:
- Old path: /oldfolder/(.*)
- Redirect to path: /newfolder/%1


**Note: **Webflow’s wildcard redirects do not support regex or an order of operations in the redirects table — that is, it’s not currently possible to exclude a specific page or path from a wildcard redirect rule. Although we recommend using wildcards as much as possible to optimize your site performance, you may need to set up your redirects at the DNS level (from your domain registrar instead of Webflow) or proxy level, or create multiple groups of wildcard redirects if you require more granular redirect rules.

Redirect chains are sequences of multiple HTTP redirects that occur one after another before the final destination URL is reached. They usually happen when one URL redirects to another, which then redirects again, and so on.

How to avoid redirect chains:

- Limit redirects to a single step
- Update internal links to point to the final URL, not an intermediate redirect.
- Use tools like Screaming Frog, Ahrefs, or Google Search Console to detect chains.
- Regularly audit your redirects, especially after site migrations or URL structure changes.

To redirect an existing static page on your Webflow site to a new URL, you’ll need to delete or save the page as a draft, or change its slug before setting the redirect. To redirect an existing Collection item page on your Webflow site to a new URL, you’ll need to archive, delete, or unpublish the item then save it as a draft or change its slug setting the redirect.

After setting redirects, update links inside your Webflow site to point to the new URLs so that you’re not relying on redirects long-term.

Tip: Be sure to check mobile pages too.

301 redirects are relative to your root domain and won’t apply to localized slugs or subdirectories. For example, if you’d like both /old-url and /es/old-url to redirect to /new-url, you’d need to set these up as two separate redirect rules.

### Set up a global canonical tag

When there are multiple versions of a page with duplicate content, canonical tags (also known as rel=”canonical” tags) tell search engines which webpage is the primary or preferred version to display in search results.

#### Why is it important to set a global canonical tag

- Critical for SEO because they consolidate the link equity to a single URL, improving its ranking potential.

- Duplicate content can impact search rankings. Canonical tags prevent these issues by directing search engines to the intended version of your content you want to appear in search results.

#### How to manage canonical tags in Webflow

Set a global canonical tag in Site settings. This allows Webflow to automatically add the appropriate, self-referencing canonical tag to each page of your site, using the global canonical as the starting point and appending each page’s unique slug after it.

**Best to use when**: You want to automate the process of creating canonical tags or don’t need more granular control.

Add custom code on individual pages to manually apply your canonical tags. If you use this method, you should remove the global canonical tag URL in your Site settings to prevent duplicate tags from being added to your pages.

**Best to use when**: You have pages for localized content that you don’t want to be flagged as duplicate content.

#### When specifying the canonical URL in your Site settings

- As a best practice, your site should be encrypted with SSL/TLS, which means your canonical URL would use HTTP/HTTPS protocol.
- If your site’s default domain is set to the www subdomain, you must also include the www URL prefix in your global canonical tag (e.g., https://
[www.webflow.com](http://www.webflow.com)). - Be sure to
**exclude**the training slash at the end of your URL. Otherwise the canonical URLs for all of your site’s subpages will include double slashes (e.g., //contact).

### Creating a sitemap and indexing pages

A sitemap is an XML file that lists the URLs of your websites and helps search engines understand the structure of the site and crawl it. In Webflow, there are two options for setting up a site map.

#### Automatically generate your sitemap

Webflow automatically updates your sitemap every time your site is published, which dynamically adds and removes pages as you create or delete them. Note: By default, an auto-generated sitemap includes every live page on your site, unless you disable indexing of a specific page with the [Sitemap indexing toggle](https://university.webflow.com/lesson/disable-search-engine-indexing?topics=site-settings#how-to-enable-or-disable-indexing-of-site-pages) in its Page settings.

- It isn’t possible to delete the /sitemap.xml page once you’ve created your sitemap and published your site.
- For sites with
[Localization](https://help.webflow.com/hc/en-us/articles/33961240752147)enabled, the auto-generated sitemap includes hreflang tags for all static and dynamic pages on your site to help search engines understand the available language and region variants of your site content.[Learn more about sitemap hreflang tags](https://help.webflow.com/hc/en-us/articles/33961235675155#sitemap-hreflang-tags). - Make sure to
[set a default domain](https://university.webflow.com/lesson/set-a-default-domain-wf), as the sitemap will reflect the domain you’ve set as the default. Otherwise, search engine crawlers will hit a 301 Redirect status when they attempt to crawl the URLs in your sitemap, which indicates to them that the original pages do not exist.

#### Maintain a custom sitemap

This option is good to use if you prefer to have manual control over which exact pages are included or excluded from the sitemap. Note: You must manually update your sitemap each time you create or delete pages.

### Generate a robots.txt file

A robots.txt file is a text file placed at the root of your site (e.g., https://www.acme.com/robots.txt) that provides instructions to search engine robots/crawlers about which pages of your site should not be crawled or indexed in search results.

Webflow automatically generates the [robots.txt file](https://university.webflow.com/lesson/disable-search-engine-indexing#how-to-generate-a-robots-txt-file) for your site, but you have control over the directives that are included in the file. This allows you to determine which parts of your site are available for search engines, especially if you need to prevent sensitive or private content from being indexed.

Best practices and considerations

That happens when a search engine finds your content either because it was published previously, or there’s a link to that content from other content online. To ensure that a previously indexed page is not indexed, don’t add it in the robots.txt. Instead, use the [Sitemap indexing toggle](https://help.webflow.com/hc/en-us/articles/33961368603539-Disable-search-engine-indexing#01JGPQHKS56H0MANS8SADB1ABA) to remove that content from Google’s index. You can also use [Google’s removals tool](https://support.google.com/webmasters/answer/9689846).

Each rule in your robots.txt file consists of two main parts:

**User-agent**: Identifies which bots the rule applies to (e.g., * for all bots, or Googlebot for Google's web crawler).**Disallow / Allow**: Defines which of your site’s pages bots can or can't access. Disallow blocks access, while Allow explicitly permits access. Using / applies the rule to all pages on your site.

Robots.txt directives require specific syntax to allow or disallow certain URLs/paths, and to apply different directives for different bots (e.g., Googlebot vs. Bingbot). If your robots.txt file is misformatted or has incorrect syntax, it can lead to unintended blocking of critical pages, unwanted crawling, and poor SEO performance.

Especially malicious or poorly configured ones. As a result, these bots may still access your site, including restricted folders and pages.

If you’d like to prevent the discovery of a particular page or URL on your site, don’t use the robots.txt to disallow the URL from being crawled. Instead, use either of the following options:

- Use the
[Sitemap indexing toggle](https://help.webflow.com/hc/en-us/articles/33961368603539-Disable-search-engine-indexing#how-to-enable-or-disable-indexing-of-site-pages)to disallow search engines from indexing your content and remove content from search engines’ index. [Save pages with sensitive content as draft](https://help.webflow.com/hc/en-us/articles/33961416983955)and don’t publish them.[Password protect](https://help.webflow.com/hc/en-us/articles/33961298873235)pages that you need to publish.

## Set-up 404 error pages

A 404 page appears when a user tries to visit a page that doesn’t exist.

- Design and build custom 404 pages that align with your website’s brand styling.
- Avoid technical language like “404 error” and instead use friendly messaging like “Oops this page doesn’t exist.”
- Add a CTA or helpful links to guide users back to relevant content.
- Keep navigation intact: Make sure that you’re including the main navigation bar and footer so users can easily find their way back.

Despite their technical nature, 404s can be a moment for your brand to shine. Webflow's 404 page even won awards.

## Enable SSL Certificate for secure HTTPS

- End-to-end SSL security between Webflow servers and your websites

- End-to-end encryption between your website and your site visitors
- Automatic SSL delivery for HTML/CSS/JS and all images
- Optimized SSL certificates for maximum compatibility
- Earn Google’s trust and improve your SEO
- Instant-on with no setup required

You’ll need to obtain your custom SSL certificates from a third-party service, since Webflow does not issue custom SSL certificates. For more information, [visit our guide to uploading custom SSL certificates](https://help.webflow.com/hc/en-us/articles/36594188851603/).

When obtaining your custom SSL certificate from a third-party service, you’ll typically follow these steps:

- Generate a Certificate Signing Request (CSR) and private key. This can be done through online CSR generators or in a local development environment with various tools, such as OpenSSL. Keep a secure copy of your private key — you’ll need it for Webflow installation later.
- Choose a Certificate Authority (CA) (i.e., a trusted entity that issues SSL certificates). There are many CAs available, both commercial and free.
- Provide your CSR to the CA. When you purchase or request a certificate from a CA, they’ll typically ask for your CSR. You’ll need to copy and paste the contents of the CSR file, or upload the file itself to their website.
- Complete any domain ownership steps and additional verification steps. Depending on the CA and certificate, you may need to verify that you own the domain for which you’re requesting the certificate. This can be done through various methods, such as email verification or DNS record creation. You may need to provide additional documentation or undergo more rigorous validation processes, especially for extensive certificate types.
- Receive and download the SSL certificate. Once your request is approved, the CA will issue your custom SSL certificate. They’ll provide you with the certificate files. Download these and install them in Webflow.

Webflow doesn’t automatically renew custom SSL certificates. You are required to [manually update your custom SSL certificate](https://help.webflow.com/hc/en-us/articles/36594188851603/) before it expires. At this time, Webflow will not automatically notify you of an upcoming expiry, so we recommend scheduling a reminder for your team accordingly.

## Optimize for SEO and performance

### Optimize custom code

Using custom code in Webflow offers flexibility and additional customization options for your site, but it's important to understand how it can impact your site performance and the best practices that can help mitigate potential issues.

#### Consider where you are adding custom code

****Custom code can be added to different areas within a Webflow project, including the following:

Global code can be added to your [Site settings](https://university.webflow.com/lesson/custom-code-in-the-head-and-body-tags#custom-code-in-site-settings) to render your code on every page of the site, either in the head tag or closing body tag. While it may be tempting and convenient to centrally place all of your custom code in your Site settings, we recommend against doing so because global code will render on every single page of your site, which can impact performance. Instead, you can use a tag manager as an alternative, as it offers better control over where and when scripts are executed.

Adding external <script> tags to the <head> of your site can slow page loads. Consider adding the async or defer attribute in the <script> tag to improve performance.

****Page-specific code can be added to the [Page settings](https://university.webflow.com/lesson/custom-code-in-the-head-and-body-tags?topics=site-settings#custom-code-in-page-settings) to render your code only on the given page, either in the head tag or closing body tag.

The Head code and Footer code sections in Site settings can accommodate up to 50,000 characters each, and custom code in the <head> tag and before the </body> tag in Page settings can accommodate up to 50,000 characters each. If the code you want to add to your site is longer, you can store it on another server and reference the script in your custom code. You can also minify your custom code using a third-party tool.

Page-specific code can be added to a [Code Embed](https://university.webflow.com/lesson/custom-code-embed?topics=elements) element to render your code only on the given page within its body tag

#### Keep in mind loading behavior

****Adding external script tags to the head of your site can slow down page loads because browsers must stop and execute each script before it can continue rendering the rest of the page. To mitigate this, we recommend using the async or defer attributes whenever possible:

**Async:**This attribute tells the browser to load the script simultaneously with the rest of the page, but execute it as soon as it's ready, making the page and script asynchronous and independent of one another.**Defer:**This attribute also allows the script and the page to load simultaneously, but ensures the script only runs after the page has finished loading, effectively deferring its execution.

Tip: To help your site load faster, use async for scripts like analytics that don’t depend on the rest of the page, and use defer for scripts that need the whole page to finish loading first, so they don’t block rendering.

#### Use in moderation

****It's crucial to moderate the use of third-party scripts and libraries to ensure efficient site performance:

**Narrow the scope:**Minimize what scripts are doing when loaded or fired — try to target specific elements rather than broad sets, which can increase load times.**Limit amount of scripts:**Every additional script increases the number of HTTP requests, subsequently increasing load time.**Consider load behavior:**Render-blocking JavaScript forces the browser to stop and execute scripts before continuing with the page render, while asynchronous scripts, though not render-blocking, compete for bandwidth with other resources. Both scenarios can slow down page load times.**Manage externally-hosted scripts**: Relying on externally-hosted scripts introduces potential points of failure if changes occur to the external server or source code.

Custom code doesn’t get minified by Webflow, so we recommend that you build what you can natively in the platform.

### Minify CSS, JavaScript, and HTML

Minimizing your website code reduces the amount of data that browsers need to download, parse, and execute, leading to faster page load times and a smoother user experience. Webflow has native settings and features available to help you minimize your site code in some ways, but there are additional best practices for your team to adopt as a part of your regular development and maintenance workflows.

Webflow automatically compiles the HTML, CSS, and JavaScript files for your site, with [publishing options in your Site settings](https://university.webflow.com/lesson/advanced-publishing-options?topics=site-settings#minify-html-css-js) to minify each of these separately. When you enable the minification settings, Webflow will remove unnecessary characters (such as whitespace, comments, and block delimiters) from these files without affecting their functionality. This process reduces file sizes significantly, enabling quicker file transfer from servers to user browsers. It's considered a best practice because it not only speeds up page loading times but also reduces bandwidth usage, which can be particularly beneficial for users on slower connections.

Tip: We recommend that you enable minification for all of those native files.

Note: A downside of minification is that the simplified formatting is generally not human-readable, which can easily be disabled/reenabled in the rare occasion that it’s necessary.

Ensure that all CSS and JavaScript files are [minified](https://university.webflow.com/lesson/advanced-publishing-options?topics=site-settings#minify-html-css-js) to reduce their file size and that you regularly delete any [unused classes](https://university.webflow.com/lesson/style-selectors-panel?topics=layout-design#how-to-delete-unused-classes-from-a-site) and [unused animations](https://university.webflow.com/lesson/triggers-and-animations?topics=interactions-animations#how-to-delete-and-remove-unused-triggers-and-animations). Although Webflow handles minification for native files, any custom code should be **minified and reviewed regularly.**

[Unused classes](https://university.webflow.com/lesson/style-selectors-panel?topics=layout-design#delete-all-unused-classes-in-the-style-manager) and [unused animations](https://university.webflow.com/lesson/triggers-and-animations?topics=interactions-animations#how-to-delete-and-remove-unused-triggers-and-animations) should be regularly cleaned up from your Selectors panel and Interactions panel, respectively, to help reduce the size of your CSS and JS files.

You can only remove classes and animations from your site when they aren’t connected to any elements or pages (draft or live), so this safely protects anything that is actively in use. If you want to save a specific class or animation for use later, you can apply it to an element on your style guide page, which will prevent it from being included during the cleanup process.

The Document Object Model (DOM) refers to the structure and hierarchy of a given webpage, and the DOM size is determined by the number of HTML nodes (elements) on a page, including nested child nodes within parent nodes. Reducing the size of your DOM is crucial for enhancing site performance because a smaller DOM reduces the browser's workload in rendering and updating the page, leading to quicker interactions and faster loading times. In Webflow, you can reduce the DOM size for your pages with the following best practices:

- Remove any unnecessary elements (e.g., with “display: none;” or hidden visibility on all breakpoints)
- Add margin or padding styles to element classes instead of using empty/spacer divs
- Consider using combo classes instead of nesting multiple individual elements, each with different classes
- Reserve the use of inline SVG code for icons that need to be styled with CSS. For most use cases, referencing a hosted SVG file through an
[Image](https://university.webflow.com/lesson/image?topics=elements)element helps to reduce DOM size, and includes additional benefits of caching efficiencies and the ability to set alt text for SEO and accessibility.

Use asynchronous or deferred loading for JavaScript to maintain a fast render time.

## Set up and track SEO

### Set up Google Search Console

[Google Search Console](https://search.google.com/search-console/about) (GSC) is a free web service provided by Google that helps website owners and SEO professionals monitor, maintain, and troubleshoot their site's presence in Google’s search results. GSC offers a range of tools and reports that provide insights into how Google views your website, helping you optimize its performance in search results.

Note: Before you can connect your Webflow project to your GSC account and use GSC tools, you’ll need to first verify ownership of your site. Although you can verify your domain ownership in a number of ways, Webflow’s [Google site verification field in your Site settings](https://university.webflow.com/lesson/google-site-verification#how-to-add-your-site-to-the-google-search-console) is the most straightforward way to accomplish this.

Once the verification process is complete, you can submit your website to Google for indexing as soon as your new site is launched.

### Set up your Google Business Profiles

Google Business Profile is a free tool that allows businesses to manage their online presence on Google Search and Google Maps. It helps people find your business, see your hours, read reviews, and contact you.

Having a well-optimized profile improves your chances of appearing in local search results, attracting more customers, and building trust with potential clients. Make sure your business name, address, and phone number are accurate and match across all platforms. Add high-quality photos, respond to customer reviews, and update your profile regularly.

### Set up Google Tag Manager

Google Tag Manager is a tool that allows you to manage marketing, analytics, and tracking scripts without manually editing your site’s code. It helps improve page speed and SEO performance by reducing the number of scripts that load directly on your Webflow site.

Google Tag Manager also enables better tracking of SEO metrics, like user behavior, engagement, and Core Web Vitals, which influence rankings.

## Next up: Page-level SEO

Improve search visibility, enhance user experience, and help reduce bounce rates by delivering clear, relevant content.

## More ways to level up

- Help Center
Find solutions to your Webflow questions and get help from our expert customer support team.

Go to docs - Community
Connect with other designers and developers to share tips, ask questions, and show off your work.

Go to forum

**Webflow**Way
