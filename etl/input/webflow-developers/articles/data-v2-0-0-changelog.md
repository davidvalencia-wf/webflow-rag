---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0/changelog
title: "Changelog | Webflow Developer Documentation"
published: 2025-11-17
---

[October 8, 2025](https://developers.webflow.com/data/changelog/1082025)

beta

## [New LLMS.txt endpoints, Audit Log events, and Google Tag support](https://developers.webflow.com/data/changelog/1082025)

This update gives you better control over your site configuration, with new endpoints for managing `llms.txt` files, and a new event type in Workspace Audit Logs for tracking user granular access updates.

## `LLMS.txt` supportBETA

We’ve added three new endpoints to the Beta API for managing `llms.txt` files on enterprise sites. This file can be used to provide information about your site to large language models (LLMs). These endpoints are available for Enterprise customers.

- GET [`/sites/{site_id}/llms_txt`](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/llms-txt/get) \- Retrieve the `llms.txt` file for a specific site.
- PATCH [`/sites/{site_id}/llms_txt`](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/llms-txt/patch) \- Update the `llms.txt` file for a specific site.
- DELETE [`/sites/{site_id}/llms_txt`](https://developers.webflow.com/data/v2.0.0-beta/reference/enterprise/site-configuration/llms-txt/delete) \- Delete the `llms.txt` file for a specific site.

## New `user_granular_access_updated` event in Workspace Audit Logs

The [`Get Workspace Audit Logs`](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/get) endpoint now includes a new `user_granular_access_updated` event sub-type in the response. This sub-type informs admins of when a user’s granular access to a site is updated.

* * *

[September 4, 2025](https://developers.webflow.com/data/09042025)

## [Webflow's MCP server now supports the Designer](https://developers.webflow.com/data/09042025)

Webflow’s MCP server now supports the Designer API, enabling AI agents to interact directly with the Webflow Designer canvas in real-time. This pivotal update expands the server’s capabilities beyond content management, opening new possibilities for AI-assisted visual design.

## What’s new

The MCP server now includes tools that connect directly to the Webflow Designer, allowing AI agents to:

- Create and modify design elements on the canvas
- Manage styles, variables, and components
- Work with responsive breakpoints and layouts
- Access real-time design data and structure

### Companion app for Designer connectivity

![MCP Companion App](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/data/pages/Changelog/assets/bridge-app.png)

A new companion app automatically installs during authorization and enables seamless communication between your AI agent and the Designer:

- **Automatic setup**: The companion app installs automatically when you authorize the MCP server
- **Real-time sync**: Maintains a persistent connection between your AI agent and active design sessions
- **Designer access**: Must remain open in the Designer for MCP tools to function

#### Companion app connectivity

**Keep the companion app open**: The MCP Companion App must remain open in the Webflow Designer for Designer API tools to function. Close the app, and you’ll lose access to canvas-based operations.

## Getting started

To use the new Designer API features:

1. **Update your MCP configuration** following the [installation guide](https://developers.webflow.com/data/docs/ai-tools)
2. **Authorize your sites** through the OAuth flow (the companion app installs automatically)
3. **Open the Designer** and launch the “Webflow MCP Companion App” from the Apps panel
4. **Start designing** with AI-powered prompts like “Create a hero section with responsive design”

## Important requirements

### Node.js version 22.3.0+

The MCP server now requires Node.js version **22.3.0** or higher. If you’re using an older version:

- Use `nvm` to install and switch to Node.js 22.3.0
- Clear your `npx` cache: `rm -rf ~/.npm/_npx`
- Restart your AI client after updating

See the [Node.js compatibility section](https://developers.webflow.com/data/v2.0.0/docs/ai-tools#nodejs-compatibility) for detailed troubleshooting steps.

## Learn more

For complete setup instructions, tool documentation, and troubleshooting guides, see our [MCP server and AI tools documentation](https://developers.webflow.com/data/v2.0.0/docs/ai-tools).

* * *

[August 12, 2025](https://developers.webflow.com/data/changelog/2025/8/12)

## [Changes for internal APIs affecting site data sync in the browser](https://developers.webflow.com/data/changelog/2025/8/12)

To support [real-time collaboration](https://webflow.com/collaboration), we’re implementing version control on a set of internal APIs used to read and write site data to the designer from the browser. To ensure continued functionality of browser extensions and tools that currently use this set of APIs, please see the timeline and migration steps below.

**Please note: If you’re building apps with Webflow’s official set of Public APIs, this won’t affect your work.**

## Affected internal endpoints

Starting August 13, 2025, the following internal site data sync endpoints will now support and enforce version control.

- GET`/sites/{siteName}/dom`
- POST`/pages/{pageId}/dom`
- POST`/sites/{siteName}/variables`
- PATCH`/sites/{siteName}/variables/{variableId}`
- POST`/sites/{siteName}/styles`

**Starting September 15, 2025**, these endpoints will require a version number in all write requests. Requests without a version number will return an error.

**These endpoints will be fully deprecated and removed in late 2026**. We recommend updating your tools now to comply with version checks, while also planning your migration away from these endpoints before the deprecation date. We will provide further notice about the final deprecation date at a later time.

## Timeline

[1](https://developers.webflow.com/data/v2.0.0/changelog#august-13-2025)

### August 13, 2025

This set of internal APIs will start returning and accepting version fields for reads and writes

[2](https://developers.webflow.com/data/v2.0.0/changelog#august-19-2025)

### August 19, 2025

DevRel hosted office hours for additional developer support. Sign up for office hours [here](https://riverside.fm/webinar/registration/eyJzbHVnIjoid2ViZmxvdy1vbi13ZWJmbG93IiwiZXZlbnRJZCI6IjY4OWFiMjJkODM2ZTJkZWRkYWJhYzAzMSIsInByb2plY3RJZCI6IjY4OWFiMjJkODM2ZTJkNjllMGJhYzAyZSJ9).

[3](https://developers.webflow.com/data/v2.0.0/changelog#september-15-2025)

### September 15, 2025

This set of internal APIs will start enforcing version checks on all writes

[4](https://developers.webflow.com/data/v2.0.0/changelog#late-2026)

### Late 2026

These endpoints will be fully deprecated and removed. We will provide further notice about the final deprecation date at a later time.

##### Office hours & support

We understand that this is a change for some developers, and we’re here to help. **[Sign up for our office hours](https://riverside.fm/webinar/registration/eyJzbHVnIjoid2ViZmxvdy1vbi13ZWJmbG93IiwiZXZlbnRJZCI6IjY4OWFiMjJkODM2ZTJkZWRkYWJhYzAzMSIsInByb2plY3RJZCI6IjY4OWFiMjJkODM2ZTJkNjllMGJhYzAyZSJ9) on August 19, 2025 to answer questions and help with the migration.**

Additionally, you can reach out to our developer support team at [developers@webflow.com](mailto:developers@webflow.com) for help.

## Version management

### Reading site data

The GET`/sites/{siteName}/dom` endpoint now returns a resource version number for in the following fields

###### Fields

###### Example response

| Resource | Version Field | Type | Description |
| --- | --- | --- | --- |
| `domNodes` | `domNodesVersion` | `number` | The version number of the DOM nodes array |
| `styles` | `stylesVersion` | `number` | The version number of the styles object |
| `variables` | `variables?[].version` | `number` | The version number for each object within the `variables` array |
| `variableCollections` | `variableCollections?[].version` | `number` | The version number for each object within the `variableCollections` array |

##### Versioning for interactions is not yet available

Currently, version fields aren’t returned for interactions. However, this could change in the future.

### Writing site data

The following endpoints require version numbers in the request body for all writes:

- POST`/pages/{pageId}/dom`
- POST`/sites/{siteName}/variables`
- PATCH`/sites/{siteName}/variables/{variableId}`
- POST`/sites/{siteName}/styles`

## Errors and responses

POST and PATCH requests to the above endpoints will return errors if the version numbers are missing or don’t match.

- **409 Conflict**: Version mismatch.

A later version of the data is available. Fetch the latest data and retry the operation.
- **400 Bad Request**: Missing version numbers in write requests.

The request body must include a version number for each resource in the request.

## Migration steps

##### Migrate to the Designer API before the deprecation date

Most of the functionality served by these endpoints is also available in the [Designer API](https://developers.webflow.com/designer/reference/introduction). We recommend migrating to the Designer API for future development for reliability and consistency. If you need additional functionality that’s not available in the Designer API, please reach out to our developer support team at [developers@webflow.com](mailto:developers@webflow.com) to tell us what you need.

[1](https://developers.webflow.com/data/v2.0.0/changelog#1-update-data-retrieval)

### 1\. Update data retrieval

In addition to retrieving site information, be sure to store version numbers when retrieving data.

Additionally you must include the `X-Webflow-App-ID` header in all requests. `X-Webflow-App-ID` should be a unique name that refers to your application or extension.

```
const response = await fetch(`/sites/${siteName}/dom`,
  method: 'GET',
  {
    headers: {
      'X-Webflow-App-ID': 'YOUR_UNIQUE_NAME'
    }
  }
);
const data = await response.json();

// Store version numbers for sync
const versions = {
  domNodes: data.domNodesVersion,
  styles: data.stylesVersion,
  variables: data.variables?.map(v => ({ id: v.id, version: v.version })),
  variableCollections: data.variableCollections?.map(vc => ({ id: vc.id, version: vc.version }))
};
```

[2](https://developers.webflow.com/data/v2.0.0/changelog#2-update-data-writing)

### 2\. Update data writing

Include version numbers and `X-Webflow-App-ID` header in all write requests.

`X-Webflow-App-ID` should be a unique name that refers to your application or extension.

```
// Example: Updating styles
const updateResponse = await fetch(`/sites/${siteName}/styles`, {
  method: 'POST',
  headers: {
    'X-Webflow-App-ID': 'YOUR_UNIQUE_NAME',
    'Content-Type': 'application/json; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'X-XSRF-Token': 'YOUR TOKEN HERE'  // must match the current from browser cookies
  },
  body: JSON.stringify({
    styles: newStyles,
    stylesVersion: versions.styles // Include current version
  }),
  credentials: 'same-origin'
});

if (updateResponse.status === 409) {
  // Version conflict - fetch latest data and retry
  const latestData = await fetch(`/sites/${siteName}/dom`);
  // Update your local versions and retry the operation
}
```

[3](https://developers.webflow.com/data/v2.0.0/changelog#3-handle-version-conflicts)

### 3\. Handle version conflicts

Implement retry logic for version conflicts:

```
async function updateWithRetry(endpoint, data, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'X-Webflow-App-ID': 'YOUR_UNIQUE_NAME',
          'Content-Type': 'application/json; charset=UTF-8',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-Token': 'YOUR TOKEN HERE' // must match the current from browser cookies
        },
        body: JSON.stringify(data),
        credentials: 'same-origin'
      });

      if (response.status === 409) {
        // Fetch latest versions and retry
        const latest = await fetch(`/sites/${siteName}/dom`);
        const latestData = await latest.json();
        data.stylesVersion = latestData.stylesVersion;
        // Update other version fields as needed
        continue;
      }

      return response;
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
    }
  }
}
```

## Important reminders

- This API will be fully deprecated and removed in late 2026
- Consider migrating to [official Webflow APIs](https://developers.webflow.com/designer/reference/introduction) when available.
- Test thoroughly in development environments before deploying

## Support

For questions about this migration, contact our [developer support team.](mailto:developers@webflow.com) However, we can’t provide ongoing support for private API usage.

* * *

[August 8, 2025](https://developers.webflow.com/data/changelog/08082025)

## [Developer experience improvements](https://developers.webflow.com/data/changelog/08082025)

This release enhances the developer experience for the Data API with improved audit logging, webhook payloads, branch support, and file handling capabilities.

## Added

### [Workspace audit logs](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/get)

- **Track guest access approvals**: The new `access_request_accepted` event subtype lets you monitor when guest access requests are approved. The response includes a `targetUsers` array so you can see exactly which users were approved.
- **Monitor access requests**: Added the `access_request` method for `workspace_membership` and `site_membership` events to track how users were granted access to workspaces and sites.

### Webhook payloads for page events

- **Navigate directly to pages**: The new `publishedPath` field in webhook payloads gives you the exact URL path to navigate to pages on your site. This makes it much easier to track page changes beyond just the page ID and title. Available for:
  - [Page created](https://developers.webflow.com/data/reference/webhooks/events/page-created)
  - [Page metadata updated](https://developers.webflow.com/data/reference/webhooks/events/page-metadata-updated)
  - [Page deleted](https://developers.webflow.com/data/reference/webhooks/events/page-deleted)

### Branch support for pages and components localization

- **Work with page branches**: Page and Component localization endpoints now support reading and writing to page branches using the `branchId` parameter. This lets you manage draft pages and components separately from published content. To get the `branchId` for a page, use the [List Pages](https://developers.webflow.com/data/reference/pages-and-components/pages/get-content) endpoint.

### Improved file handling

- **Skip invalid files gracefully**: When creating or updating CMS items with attachments, use the `skipInvalidFiles` parameter to handle problematic files more efficiently. When set to `true`, invalid files are skipped and processing continues. When `false`, the entire request fails if any file is invalid.

## JavaScript SDK updates

- `v3.2.0` is [now available](https://www.npmjs.com/package/webflow-api/v/3.2.0) and up to date with latest changes in the Data API v2. See the [SDK changelog](https://github.com/webflow/js-webflow-api/releases/tag/v3.2.0) for more details.

* * *

[June 23, 2025](https://developers.webflow.com/data/changelog/06232025)

## [Breaking changes for CMS publishing](https://developers.webflow.com/data/changelog/06232025)

**On July 7, 2025, we’re releasing important updates to how CMS items are published and managed via the API.** These changes affect how you manage live items and publish CMS content with the API. Please review the breaking changes below to avoid disruptions.

## Draft management improvements

The Webflow UI now supports saving draft changes to published CMS items without affecting live content. To maintain consistency between the UI and API, we’re introducing the following change:

### Unpublishing live items Breaking Change

Previously, updating a live item’s `isDraft` property to `true` would unpublish a live item from the site. This behavior is changing to support improved draft management:

- Updating an item’s `isDraft` property to `true` on a live item will no longer unpublish it
- The item will remain live while draft updates can be made using the [staged item endpoints.](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/update-items)
- **Required Action:** Update your code to use the dedicated unpublish endpoints: [Unpublish Single Item](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/delete-item-live) or [Unpublish Multiple Items](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/delete-items-live)

**Affected endpoints:**

If you’re using the following endpoints to unpublish live items, you’ll need to update your code to use the dedicated unpublish endpoints instead:

- [Update Single Live Item](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/update-item-live)
- [Update Multiple Live Items](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/update-items-live)

### Understanding item status

![Item status in Webflow](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/assets/images/cms-publishing.png)

In the Webflow UI, CMS items have a status field that maps to the item’s `isDraft` and `lastPublished` properties. Here’s how these properties determine an item’s status:

| Status | `isDraft` | `lastPublished` | Description |
| --- | --- | --- | --- |
| Draft | `true` | `null` | Never published or previously unpublished item |
| Published | `false` | timestamp | Item is live on the site |
| Changes in draft | `true` | timestamp | Published item with pending changes in the staged item |
| Queued to publish | `false` | < `lastUpdated` | Changes will publish on next site publish. This is the default status for newly created items, as well as for updates to items that have already been published. |

**Note:** The [Unpublish Live Item](https://developers.webflow.com/data/v2.0.0/reference/cms/collection-items/live-items/delete-items-live) endpoint sets `isDraft: true` and `lastPublished: null`.

## Enhanced publishing flexibility 🎉

You can now publish CMS items with the API even when site domains are out of sync. For example, if you’ve published to staging but not to production. This removes the previous limitation that caused `409` errors in these scenarios. No changes needed here - instead, we expect that you’ll see less errors!

Affected endpoints:

- [Publish Collection Items](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/publish-item)

* * *

## Required actions

1. **Review Integrations**
   - Identify code using `isDraft: true` for unpublishing
   - Test with [beta APIs](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/publish-item) in development environment
2. **Update Code**
   - Replace `isDraft` unpublishing with proper endpoints
   - Test and verify changes in your development environment

### Test changes with the Beta APIs

All functionality described above is available now through the **Beta APIs** under the `/beta` namespace. To test, replace `/v2` with `/beta` in your API calls within a testing environment to see the new behavior in action. Unfortunately, the Webflow SDK doesn’t support the beta namespace at this time.

## Timeline

1. **Now - July 7, 2025**: Testing period
   - Test your integrations using the [beta API endpoints](https://developers.webflow.com/data/v2.0.0-beta/reference/cms/collection-items/staged-items/publish-item)
   - Update code to use proper [unpublish endpoints](https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-items-live)
2. **July 7, 2025**: Changes go live
   - Breaking changes take effect in v2

For questions or more information, please see our [post in the Webflow Forum](https://discourse.webflow.com/t/data-api-important-changes-to-cms-publishing/323909)

* * *

[May 13, 2025](https://developers.webflow.com/data/changelog/05132025-mcp-server)

## [Webflow MCP Server Version Update to 0.5.1](https://developers.webflow.com/data/changelog/05132025-mcp-server)

### Feature enhancements

- **Inline script management**

Use AI agents to generate and insert (or delete) inline code snippets

- **Collection Item deletion**

Agents can now remove CMS items programmatically, completing the full CRUD through your AI coding tool.

### Improvements

- **Structural refactor**

The codebase now has a clearer folder structure, consistent naming, and easier long-term maintenance.\*\* No breaking changes.\*\*

### New tools

These updates give your AI agents deeper, safer autonomy:

| Tool | One-line description |
| --- | --- |
| **`site_registered_scripts_list`** | Fetch a catalog of all custom code registered for the site. |
| **`site_applied_scripts_list`** | Retrieve the scripts currently applied to the live site. |
| **`add_inline_site_script`** | Inject a new inline `<script>` block into the site. |
| **`delete_all_site_scripts`** | Delete all scripts from the site in a single call. |
| **`collections_items_delete_item`** | Delete a specific CMS collection item by its ID. |

### Add 0.5.1 your AI editor

See our [MCP server documentation](https://developers.webflow.com/data/docs/ai-tools#webflows-official-mcp-server) for more information on how to add the MCP server to your AI editor.

```
{
  "mcpServers": {
    "webflow": {
      "command": "npx",
      "args": ["-y", "webflow-mcp-server@0.5.1"],
      "env": {
        "WEBFLOW_TOKEN": "<YOUR_WEBFLOW_TOKEN>"
      }
    }
  }
}
```

* * *

[May 8, 2025](https://developers.webflow.com/data/changelog/05082025)

## [Workspace audit logs and improvements for Webflow Apps](https://developers.webflow.com/data/changelog/05082025)

![Workspace Audit Logs](https://cdn.prod.website-files.com/64f9399ca7d13575ff21a675/68139e78a6573cb4a58716ee_Updates_1280x720_Audit-Log-API.jpg)

## Introducing workspace audit logs

To enable better security and compliance monitoring, the Webflow Data API now supports workspace-level audit logs for enterprise customers. In combination with the existing [site-level audit logs](https://developers.webflow.com/data/reference/enterprise/site-activity/list), teams now have a complete view of user activity across their organization.

Use the [Workspace Audit Log API](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/get) to track important user events, including:

- [Login activity](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/event-types#user_access)
- [Custom role events](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/event-types#custom_role)
- [Workspace membership events](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/event-types#workspace_membership)
- [Site membership events](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/event-types#site_membership)
- [Workspace invitations](https://developers.webflow.com/data/reference/enterprise/workspace-audit-logs/event-types#workspace_invitation)

This endpoint requires authentication with a Workspace API token

## Localization support for additional elements

These updates enable you to localize more element types on a page. In addition to the existing support for text-based elements and component instances, you can now localize the following elements using the [Page APIs](https://developers.webflow.com/data/reference/pages-and-components/pages/get-content):

- Select choices on a select element
- Placeholder text on a text input element
- Button text on submit and search buttons

* * *

## Quality of life updatesWebflow Apps

Additionally, Webflow Apps now supports:

1. **Inviting users to test apps**

You can now invite external users to test your apps before publishing to the marketplace by simply providing their email address and a message. This feature addresses the previous limitation where in-development apps could only be installed within the registered workspace. Contact [developers@webflow.com](mailto:developers@webflow.com) for early access.

2. **Safeguarding app settings for marketplace apps**

We’ve improved stability for marketplace apps by implementing safeguards against breaking changes. To protect both app developers and end users, certain critical setting changes for published apps now require re-approval through our update process. This ensures your users always have a consistent experience while giving you a controlled path to evolve your app’s capabilities. In your app settings modal, you’ll now see some disabled settings that require re-approval to make changes.

These settings include:
   - Adding a new building block (Designer or Data API)
   - Changing app scopes

* * *

[April 8, 2025](https://developers.webflow.com/data/changelog/04082025-mcp-server)

## [Introducing Webflow's official MCP server and LLMS.txt support](https://developers.webflow.com/data/changelog/04082025-mcp-server)

![MCP Hero Image](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/mcp_hero.png)

### Introducing Webflow’s MCP server

For developers using AI-powered tools like Cursor or Claude Desktop, we provide a [Model Context Protocol (MCP) server](https://developers.webflow.com/data/docs/ai-tools#webflows-official-mcp-server) that enhances the agent’s understanding of your Webflow projects. The MCP server has tools that enable the AI agent to access real-time information about your sites, collections, and other objects, enabling more accurate and contextual code suggestions and troubleshooting. To see a full list of tools, [see the MCP server documentation.](https://www.npmjs.com/package/webflow-mcp-server)

### LLMS.txt support

We’re excited to announce compatibility with the emerging `llms.txt` standard, making your documentation accessible and optimized for AI developer tools such as Cursor, GitHub Copilot, ChatGPT, Perplexity, and Anthropic’s Claude.

`llms.txt` is designed to be token-efficient, ensuring faster processing and cost-effective LLM interactions without sacrificing valuable info.
[Learn more](https://developers.webflow.com/data/docs/ai-tools#documentation-for-llms)

- Use [https://developers.webflow.com/llms.txt](https://developers.webflow.com/llms.txt) to access the LLM-readable documentation.
- Additionally, you can access markdown versions of any documentation page to provide a more structured and context-rich experience for LLMs. To access the markdown version of a page, add .md to the end of the URL.

* * *

[April 8, 2025](https://developers.webflow.com/data/changelog/04082025)

## [Introducing the Comments API](https://developers.webflow.com/data/changelog/04082025)

Webflow is excited to introduce a new Comments API. With these new endpoints, you can programmatically access comments across your Webflow sites, enabling integrations with your existing tools and workflows. This release makes it easier than ever to track feedback, coordinate reviews, and streamline your content management processes.

- [List all comment threads](https://developers.webflow.com/data/reference/comments/list-comment-threads)
- [Get comment thread](https://developers.webflow.com/data/reference/comments/get-comment-thread)
- [List comment replies](https://developers.webflow.com/data/reference/comments/list-comment-replies)
- [Create webhook](https://developers.webflow.com/data/reference/webhooks/create) with a new `comment_created` trigger
- [New comment thread webhook](https://developers.webflow.com/data/reference/webhooks/events/comment-created)

##### Timing on comments

There may be up to a 5-minute delay before comment threads appear in the system. This delay may also occur in webhook notifications.

### Add `.well-known` files to your site

In addition to existing support for [site configuration](https://developers.webflow.com/data/reference/enterprise/site-configuration/url-redirects/get), the Data API now supports setting and deleting `.well-known` files. This empowers site managers to automate and streamline the management of site metadata and security configurations, enhancing integration with modern web protocols and improving overall site interoperability. For more information, see [Wefblow’s help documentation on `.well-known` files.](https://help.webflow.com/hc/en-us/articles/36293473743123-Upload-a-well-known-file)

- [Set `.well-known` file](https://developers.webflow.com/data/reference/enterprise/site-configuration/well-known-files/put)
- [Delete `.well-known` file](https://developers.webflow.com/data/reference/enterprise/site-configuration/well-known-files/delete)

* * *

[March 12, 2025](https://developers.webflow.com/data/changelog/2025/3/12)

## [Support for option fields](https://developers.webflow.com/data/changelog/2025/3/12)

- **[Create Option fields](https://developers.webflow.com/data/reference/cms/collection-fields/create)**

Option fields let you define a predefined list of choices for a collection item. You can add these fields either when creating a new collection via the [create collection](https://developers.webflow.com/data/reference/cms/collections/create) endpoint or add them to existing collections using the [create collection field](https://developers.webflow.com/data/reference/cms/collection-fields/create) endpoint.