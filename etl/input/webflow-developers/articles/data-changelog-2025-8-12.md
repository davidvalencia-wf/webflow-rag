---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/2025/8/12
title: "Changes for internal APIs affecting site data sync in the browser | Webflow Developer Documentation"
published: 2025-11-17
---

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

[1](https://developers.webflow.com/data/changelog/2025/8/12#august-13-2025)

### August 13, 2025

This set of internal APIs will start returning and accepting version fields for reads and writes

[2](https://developers.webflow.com/data/changelog/2025/8/12#august-19-2025)

### August 19, 2025

DevRel hosted office hours for additional developer support. Sign up for office hours [here](https://riverside.fm/webinar/registration/eyJzbHVnIjoid2ViZmxvdy1vbi13ZWJmbG93IiwiZXZlbnRJZCI6IjY4OWFiMjJkODM2ZTJkZWRkYWJhYzAzMSIsInByb2plY3RJZCI6IjY4OWFiMjJkODM2ZTJkNjllMGJhYzAyZSJ9).

[3](https://developers.webflow.com/data/changelog/2025/8/12#september-15-2025)

### September 15, 2025

This set of internal APIs will start enforcing version checks on all writes

[4](https://developers.webflow.com/data/changelog/2025/8/12#late-2026)

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

[1](https://developers.webflow.com/data/changelog/2025/8/12#1-update-data-retrieval)

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

[2](https://developers.webflow.com/data/changelog/2025/8/12#2-update-data-writing)

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

[3](https://developers.webflow.com/data/changelog/2025/8/12#3-handle-version-conflicts)

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