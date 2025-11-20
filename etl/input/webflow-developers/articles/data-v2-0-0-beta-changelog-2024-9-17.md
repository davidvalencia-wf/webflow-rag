---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/9/17
title: "Improved page content APIs and support for site configuration | Webflow Developer Documentation"
published: 2025-11-17
---

[September 17, 2024](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/9/17)

## [Improved page content APIs and support for site configuration](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/9/17)

We’ve made a number of updates to the Data API to help you better manage components and site configurations, alongside improvements to page content handling. These changes include new endpoints for retrieving components and their properties, as well as additional functionality for `.well-known` files and URL redirects.

### New Endpoints

#### **Page Content & Components**

Components are powerful, reusable blocks used to create consistent layouts across your site. Learn more about components in the [Webflow University lesson](https://university.webflow.com/lesson/components?topics=layout-design).

##### New scope for components endpoints

These endpoints will require the `components:read` scope.

- [**Get all components for a site**](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/list)
Retrieve all components for a site. This makes it easier to programmatically access reusable design elements.
- [**Get static content for a component**](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/get-content)
Retrieve static content for a specific component. Note that dynamic content set via props isn’t included—use the **Get Component Properties** endpoint for that.
- [**Get component properties**](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/get-properties)
Retrieve detailed information about component-specific properties for a more dynamic and customizable component experience.

#### **Well Known Files**

Webflow supports the management of `.well-known` files, which are commonly used for site verification and configuration with external services. At this time, Webflow only accepts the following `.well-known` files:

- `apple-app-site-association`

Used for iOS Universal Links, allowing apps to handle specific web URLs.
- `apple-developer-merchantid-domain-association`

Used to verify your domain for Apple Pay on the web.

* * *

- [**Create Well Known File**](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/well-known-files/put)

Upload or update a `.well-known` file to a site.
- [**Delete Well Known File**](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/well-known-files/delete)

Remove a `.well-known` file from a site when it’s no longer needed.

#### **Site Redirects**

- [**Update Site Redirect**](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/301-redirects/patch)

Update an existing URL redirection rule for a site.

#### **Form Submissions**

- [**Delete Form Submission**](https://developers.webflow.com/data/v2.0.0-beta/reference/forms/form-submissions/delete-submission)

Remove an individual form submission.

Deleting form submissions will also delete the file submissions and make the submitted file URLs inaccessible. Before you delete your form submission data, back up any file uploads you want to keep.

### Updated Endpoints

- [**Get Page Content**](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/pages/get-content)
Now returns component instances present on a page. **Note:** Component instances are included only when their default property values have been modified. Additionally, only the modified properties are returned, while the component’s static content remains excluded.
- [**Update Page Content**](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/pages/update-static-content)
Update properties on component instances directly. Use the [**Get Page Content**](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/pages/get-content) endpoint to identify component IDs, and the [**Get Component Properties**](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/get-properties) endpoint to retrieve the relevant component properties. When updating a component instance, include a list of component properties with their IDs and values. This update supports plain text, rich text, and component instances.