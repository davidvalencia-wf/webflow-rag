---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/changelog
title: "Changelog | Webflow Developer Documentation"
published: 2025-11-17
---

[August 8, 2025](https://developers.webflow.com/data/v2.0.0-beta/changelog/08082025)

## [Enhanced filtering and sorting capabilities](https://developers.webflow.com/data/v2.0.0-beta/changelog/08082025)

This release adds powerful filtering and sorting capabilities to help you find and organize your content more efficiently.

### Enhanced page filtering and sorting

- **Filter and sort pages**: The [list pages endpoint](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/pages/list) now supports filtering and sorting by `createdOn` and `lastUpdated`.

### Improved CMS item management

- **Better CMS item organization**: The [List Collection Items](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/list-items) endpoint now supports filtering and sorting by `lastUpdated` and `createdOn`.

* * *

[May 8, 2025](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/5/8)

## [Additional support for page branches](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/5/8)

For [branched pages](https://help.webflow.com/hc/en-us/articles/33961355506195-Page-branching), you can now use the `isBranch` and `branchId` parameters for additional details. These parameters are included in the following endpoint responses:

- [List pages](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/pages/list)
- [Get page settings](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/pages/get-metadata)
- [Update page settings](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/pages/update-page-settings)
- [Get page content](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/pages/get-content)

* * *

[March 12, 2025](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/3/12)

## [New APIs for retrieving comments](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/3/12)

Webflow’s API now supports operations to retrieve comments on a site with these new endpoints:

- [List all comment threads](https://developers.webflow.com/data/v2.0.0-beta/reference/comments/list-comment-threads) \- Get all comment threads for a site.

- [Get comment thread](https://developers.webflow.com/data/v2.0.0-beta/reference/comments/get-comment-thread) \- Retrieve a specific comment thread by ID with full details.

- [List comment replies](https://developers.webflow.com/data/v2.0.0-beta/reference/comments/list-comment-replies) \- Get all replies for a specific comment thread.

Comment replies aren’t included in the initial thread listing. To retrieve replies, first get the Comment Thread ID from the list endpoint, then use that ID with the replies endpoint.

* * *

[February 5, 2025](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/2/5)

## [Support for additional well-known files and CMS field types](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/2/5)

## Add and manage well-known files

[Upload well-known files to sites](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/well-known-files/put) with the following requirements:

- File size must be less than 100KB per file
- Maximum of 30 files total
- Files must have one of these extensions (or no extension):
  - `.txt`
  - `.json`
  - `.noext` \- A special extension that removes other extensions when uploaded. This helps compatibility with tools that require file extensions

    **Example:**`apple-app-site-association.noext.txt` will be uploaded as `apple-app-site-association`

## New CMS field type: Option

- **[Create Option fields](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-fields/create)**

Option fields let you define a predefined list of choices for a collection item. You can add these fields either when creating a new collection via the [create collection](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collections/create) endpoint or add them to existing collections using the [create collection field](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-fields/create) endpoint.

* * *

[January 16, 2025](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/1/16)

## [Collection field enhancements](https://developers.webflow.com/data/v2.0.0-beta/changelog/2025/1/16)

## Create reference fields

Create reference fields in a collection using the [create collection field](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-fields/create) endpoint.

To create a reference field, you’ll need to:

- Set the `type` property in the `field` object to either `MultiReference` or `Reference`
- Include the `metadata` property with the `collectionId` of the target collection

```
{
  "displayName": "Authors",
  "type": "Reference",
  "metadata": {
    "collectionId": "580e63fc8c9a982ac9b8b745"
  }
}
```

You can add reference fields in two ways:

- During initial collection creation via the [create collection](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collections/create) endpoint

- To an existing collection using the [create collection field](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-fields/create) endpoint

## Create multiple collection fields during collection creation

Create multiple collection fields during collection creation using the [create collection](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collections/create) endpoint. Collections are limited to 60 fields per collection.

* * *

[December 17, 2024](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/12/17)

## [Updated publishing behavior for collection items](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/12/17)

Starting December 2024, Webflow is introducing an improved publishing workflow for collection items. When a live item’s `isDraft` property is set to `true`, the item will continue to remain published on the live site even after a full site publish. This allows users to make updates to the collection item in a draft state without changing what’s visible on the live site.

To remove an item from the live site, you must now explicitly call the [unpublish endpoint](https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-item-live). This change gives developers more precise control over the publishing state of individual items. Please see the [“publishing items” section of the CMS guide](https://developers.webflow.com/data/docs/working-with-the-cms#5-publishing-items) for more details.

- **[Create CMS Item](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/create-item)**

The default behavior of the `createItem` API is now to create a draft item. All new items will be created with the `isDraft` flag set to `true`.

- **[Publish CMS Item](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/publish-item)**

Due to changes in how publishing is handled, sites with multiple domains are no longer required to have their domains in sync when publishing a single CMS Item. Previously, users would receive a `409` error when attempting to publish a CMS item while the domains weren’t in sync. Users will no longer receive a `409` error when attempting to publish a CMS item.

## Page and component content updates

We’ve updated the request body structure for updating content:

- **[Update page content](https://developers.webflow.com/data/reference/pages-and-components/pages/update-static-content)**

To update a nested Component Instance within a Component, use the `propertyOverrides` property instead of using the `properties` property.

- **[Update component content](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/update-content)**

To update a nested Component Instance within a Component, use the `propertyOverrides` property instead of using the `properties` property.

* * *

[November 21, 2024](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/11/21)

## [Improved management of form submissions](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/11/21)

[**List form submissions by site**](https://developers.webflow.com/data/v2.0.0-beta/reference/forms/form-submissions/list-submissions-by-site) \- A new endpoint that lets you retrieve form submissions across your entire site. Unlike the existing [List Form Submissions endpoint](https://developers.webflow.com/data/v2.0.0-beta/reference/forms/form-submissions/list-submissions), this endpoint:

- Takes `siteId` as a path parameter
- Accepts `elementId` as a query parameter to filter by `formElementId`
- Works seamlessly with forms in components, where each component instance gets a unique `formId` but shares the same `formElementId`

To use this endpoint, first get the `formElementId` from the [List Forms API](https://developers.webflow.com/data/v2.0.0-beta/reference/forms/forms/list), then pass both the `siteId` and `formElementId` to retrieve all submissions for a specific form, even when it appears in multiple component instances.

* * *

[October 1, 2024](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/10/1)

## [Support for bulk authoring, editing, and deleting CMS items](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/10/1)

We’ve added bulk CMS item authoring, editing, and deleting, supporting up to 100 items per request. These endpoints can help manage previous rate limit issues and makes managing large content sets more efficient.

### New endpoints

- **[Update Collection Items](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/update-item)**

Update a single item or multiple items in a Collection. This endpoint can update up to 100 items in a request.
- **[Delete Collection Items](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/delete-item)**

Delete Items from a Collection. This endpoint can delete up to 100 items in a request.
- **[Update Live Collection Items](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/live-items/update-items-live)**

Update a single live item or multiple live items in a Collection. This endpoint can update up to 100 items in a request.
- **[Delete Live Collection Items](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/live-items/delete-items-live)**

Remove an item or multiple items from the live site. Deleting published items will un-publish the items from the live site and set them to draft. This endpoint can delete up to 100 items in a request.
- [**Update Localized Component Properties**](https://developers.webflow.com/data/v2.0.0-beta/reference/pages-and-components/components/update-properties)

Update the properties of a component definition in a specified locale.

### Updated endpoints

- **[Create Collection Items](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/create-item)**

Create a single item or multiple items in a Collection. This endpoint can update up to 100 items in a request.

**Note:** This endpoint was previously used to create a single Collection Item for multiple locales. The endpoint can now handle requests for multiple items in multiple locales.

### Updated payloads

- [**Form Submission**](https://developers.webflow.com/data/v2.0.0-beta/reference/all-events#form_submission)

Added `schema` and `formElementId` properties to the `Form Submission` webhook payload for better form visibility

* * *

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

* * *

[August 22, 2024](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/8/22)

## [Enhanced security and permissions, and new endpoints for site configuration](https://developers.webflow.com/data/v2.0.0-beta/changelog/2024/8/22)

In this latest release, we’ve rolled out some significant updates to our APIs. First up, we’ve strengthened security by ensuring that only Workspace Admins can manage changes to Apps. In the Data API, we’ve introduced new endpoints that give you greater control over `robots.txt` files and site redirects. And for those using the Designer API, you can now subscribe to alerts when users select new CMS items on collection pages, making it simpler to keep track of automatically generated page paths.

## Security & permissions

- **Enhanced Workspace App Management Permissions:**

Previously, all members within a Workspace had the ability to manage Apps (for example, uploading new bundles, updating redirect URIs). Apps now enforce stricter permissions, allowing only Workspace Admins to perform these actions. This ensures that sensitive operations are restricted to authorized personnel.
- **Mandatory 2FA for Workspace Admins:**

To further enhance security, Workspace Admins are now required to have two-factor authentication (2FA) enabled to upload new App Bundles. This additional security layer helps protect your Workspace from unauthorized access and potential threats.

## New endpoints

#### **Robots.txt**

- **[Replace robots.txt](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/robots-txt/put):** Replace the `robots.txt` configuration for various user agents.
- **[Update robots.txt](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/robots-txt/patch):** Update the `robots.txt` configuration for various user agents.
- **[Delete user-agent rules](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/robots-txt/delete):** Remove specific rules for a user-agent in your `robots.txt` file.

#### **Site redirects**

- **[Get site redirects](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/301-redirects/get)**: Fetch a list of all URL redirect rules configured for a specific site.
- **[Create a site redirect rule](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/301-redirects/create):** Add a new URL redirection rule to a site.
- [**Delete site redirect rules**](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/301-redirects/delete): Remove URL redirection rules from a site.

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