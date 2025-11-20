---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-site-info
title: "Get site information | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getSiteInfo()`

Get metadata about the current site.

### Syntax

```
webflow.getSiteInfo(): Promise<{
    siteId: string;
    siteName: string;
    shortName: string;
    isPasswordProtected: boolean;
    isPrivateStaging: boolean;
    workspaceId: string;
    workspaceSlug: string;
    domains: Array<{
        url: string;
        lastPublished: string | null;
        default: boolean;
        stage: "staging" | "production";
    }>;
}>
```

### Returns

A Promise that resolves to a record containing information about the site that’s currently open in the Designer. The record has the following properties:

| Property | Type | Description |
| --- | --- | --- |
| `siteId` | _string_ | The unique ID of the current Webflow site. |
| `siteName` | _string_ | The name of the current Webflow site. |
| `shortName` | _string_ | The short name of the current Webflow site. |
| `isPasswordProtected` | _boolean_ | Whether the current site is password protected. |
| `isPrivateStaging` | _boolean_ | Whether the current site is private staging. |
| `domains` | _Array`<{url: string, lastPublished: string | null, default: boolean, stage: "staging" | "production"}>`_ | An array of objects containing information about the domains associated with the current site. |
| `workspaceId` | _string_ | The unique ID of the workspace that the current site belongs to. |
| `workspaceSlug` | _string_ | The unique slug of the workspace that the current site belongs to. |

### Example

```
const siteInfo = await webflow.getSiteInfo();

console.log("Site ID:", siteInfo.siteId);
console.log("Site Name:", siteInfo.siteName);
console.log("Short Name:", siteInfo.shortName);
console.log("Is Password Protected:", siteInfo.isPasswordProtected);
console.log("Is Private Staging:", siteInfo.isPrivateStaging);
console.log("Domains:", siteInfo.domains);
console.log("Workspace ID:", siteInfo.workspaceId);
console.log("Workspace Slug:", siteInfo.workspaceSlug);
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)