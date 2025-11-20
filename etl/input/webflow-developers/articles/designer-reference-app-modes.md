---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/app-modes
title: "App Modes | Webflow Developer Documentation"
published: 2025-11-17
---

## Modes in the Webflow Designer

The Webflow Designer is a powerful collaborative tool for teams to design and build websites quickly and at scale. To support collaboration, the Designer offers various modes to support different aspects of the design process:

- **[Designing and Building](https://university.webflow.com/lesson/collaborate-in-the-webflow-designer?topics=layout-design):** Designers can create and refine the website’s layout and appearance in the Webflow Designer, while marketers and content writers manage and update content in build mode.
- **[Page Branching](https://university.webflow.com/lesson/page-branching?topics=collaboration):** Multiple designers can work on different pages of the same site at the same time, allowing for parallel development and reducing bottlenecks.
- **[Localization](https://arc.net/l/quote/cjoktvxx)**: Global teams can create customized experiences for different languages or regions, enabling global reach and tailored content for diverse audiences.

Through these features and modes, the Webflow Designer determines the specific actions a user can take to ensure teams make the right updates at the right time.

## Modes in Webflow Apps

Designer Extensions extend the user’s capabilities while respecting the mode the Designer is in. Each method in the Designer API offers distinct functionality, aligning with the actions feasible in each mode. By understanding the various modes in the Designer, and how Designer APIs interact with them, you can ensure your App functions correctly across different contexts within the Webflow Designer, thus providing a seamless user experience.

## Understanding modes and API methods

Each API method’s documentation includes an “App Modes” section that outlines where and how the API can be used, as well as any limitations.

Here’s an example from the “ [Remove Element](https://developers.webflow.com/designer/reference/remove-element)” method:

| **Ability** | **Locale** | **Branch** | **Workflow** | **Sitemode** |
| --- | --- | --- | --- | --- |
| _Name of the current ability_ | Site uses Localization, and the user is working in a primary or secondary locale | Site uses Page Branching, and the users working in a primary or branched paged | Determines whether the user is actively working on the canvas, or viewing the site in preview mode. | Determines whether the user is in design mode, or build mode. |
| **canDesign** | `primary` | `main` | `canvas` | `design` |

In this example, the “Remove Element” method can only be successfully called if the user is in design sitemode, working on the canvas in a primary locale on the main branch. If the user is in any other mode, the API will throw a “Forbidden” error.

See below for a complete table of abilities, which defines where and how an API method can be used.

| **Name** | **Locale** | **Branch** | **Workflow** | **Sitemode** |
| --- | --- | --- | --- | --- |
| **canManageAssets** | Any | Any | Any | Any |
| **canAccessAssets** | Any | Any | Any | Any |
| **canAccessCanvas** | Any | Any | Any | Any |
| **canDesign** | primary | main | canvas | design |
| **canEdit** | Any | Any | canvas | Any |
| **canCreateComponents** | primary | Any | canvas | Any |
| **canModifyComponents** | Any | Any | canvas | design |
| **canCreateStyles** | primary | Any | canvas | design |
| **canModifyStyles** | Any | Any | canvas | design |
| **canCreatePage** | Any | Any | Any | design |
| **canReadPageSettings** | Any | Any | Any | Any |
| **canManagePageSettings** | Any | Any | Any | Any |
| **canReadVariables** | Any | Any | Any | Any |
| **canModifyVariables** | Any | main | canvas | design |
| **canModifyImageElement** | Any | main | canvas | Any |

## Checking for App modes with `webflow.canForAppMode`

To ensure your app functions correctly in the different modes of the Webflow Designer, you can leverage the [`webflow.canForAppMode`](https://developers.webflow.com/designer/reference/get-users-designer-capabilities) method. This method allows you to check whether a specific action is allowed in the user’s current mode before executing it, helping to prevent errors and improve the user experience.

#### Example Usage

The `webflow.canForAppMode` method returns a Boolean indicating whether the specified action is permitted based on the current mode of the Designer. Here’s a basic example:

```
const capabilities = await webflow.canForAppMode([webflow.appModes.canDesign, webflow.appModes.canEdit\
]);

if (capabilities.canDesign) {
  // Proceed with the action
  const el = await webflow.getSelectedElement();
  await el.append(webflow.elementPresets.DOM);
} else {
  // Provide feedback to the user
  await webflow.notify({
    type: 'Error',
    message: 'This action cannot be performed right now. Ensure you are working in the Primary Locale, on the Main Branch, and in design mode.',
  });
}
```

### When to Use `webflow.canForAppMode`

Use `webflow.canForAppMode` before any critical action that depends on the mode the user is in, such as:

- Adding or modifying elements in the Designer.
- Creating or editing styles that are only permitted in specific locales or branches.
- Managing components that might be restricted based on the current workflow.

[See the documentation for `webflow.canForAppMode` for more details.](https://developers.webflow.com/designer/reference/get-users-designer-capabilities)

## Error handling for App modes

When an API call is made in an incorrect mode, a “Forbidden” error will be thrown. To manage this, implement error handling to guide users back to the appropriate mode. For more guidance on errors, see our guide on [understanding and handling API errors.](https://developers.webflow.com/designer/reference/error-handling)

To help you implement robust error handling for App Modes, we have included a list of API abilities along with the accepted modes for each ability and example error messages to direct users back to the correct mode:

| **Name** | **Example Error Message** |
| --- | --- |
| **canManageAssets** | This action cannot be performed right now. Please ensure you have the correct permissions to manage assets. |
| **canAccessAssets** | This action cannot be performed right now. Please ensure you have the correct permissions to view assets. |
| **canAccessCanvas** | This action cannot be performed right now. Please ensure you are working in the correct mode to access the canvas. |
| **canDesign** | This action cannot be performed right now. Ensure you are working in the Primary Locale and the Main Branch, and in design mode. |
| **canCreateComponents** | This action cannot be performed right now. Ensure you have the correct permissions to create components, and are working in the Primary Locale. |
| **canModifyComponents** | This action cannot be performed right now. Ensure you have the correct permissions to modify components. |
| **canCreateStyleBlocks** | This action cannot be performed right now. To create Styles, ensure you are working in the Primary Locale and in design mode. |
| **canModifyStyleBlocks** | This action cannot be performed right now. Make sure you are in design mode to modify Styles. |
| **canCreatePage** | This action cannot be performed right now. Ensure you have the correct plan and/or permissions to create additional pages. Additionally, ensure you are in design mode. |
| **canReadPageSettings** | This action cannot be performed right now. Please ensure you have the correct permissions to view Page Settings. |
| **canManagePageSettings** | This action cannot be performed right now. Please ensure you have the correct permissions to manage Page Settings. |
| **canReadVariables** | This action cannot be performed right now. Please ensure you have the correct permissions to view Variables. |
| **canModifyVariables** | This action cannot be performed right now. Please ensure you have the correct permissions to manage Variables. |

As an example, see the below snippets on guidance for how to catch the new `Forbidden` error and surface appropriate user messaging.

**Before App Modes**

```
const el = await webflow.getSelectedElement();
// Assumes a user can create elements
await el.append(webflow.elementPresets.DOM);
```

**After App Modes**

```
try {
  // The element is able to be selected
  const el = await webflow.getSelectedElement();
  // However, appending an element is disallowed in a secondary locale
  await el.append(webflow.elementPresets.DOM);
} catch (error) {
  if (error.cause.tag === 'Forbidden') {
    // It is up to the developer to craft an error message to the user.
    // below is an example of what they could do:
    await webflow.notify({
      type: 'Error',
      message: 'This action cannot be performed right now. Ensure you are working in the Primary Locale and the Main Branch, and  in design mode.',
    })
  }
}
```

## Testing with App Modes

To test out how your Designer Extension will function with Expanded App Modes, you can opt-in to the feature with your `webflow.json` manifest file.

```
// webflow.json manifest file
{
  "name": "my app",
  "apiVersion": "2",
  "featureFlags": {
    "expandedAppModes": true
  }
}
```

Now, if you launch your Designer Extension from the Apps Panel as you normally would today, you can switch to Build mode, as an example, and your App should remain open. If you take an action via your App that a user shouldn’t be able to in that mode, you will see a `Forbidden` error thrown, and you can catch the error appropriately to surface relevant user messaging.

## Opt Out

We recognize that for some Apps, it may take more time to incorporate code changes to add extra error handling, UI considerations, etc. with expanded App Modes. To opt-out, set the `expandedAppModes` feature flag to false in your `webflow.json` manifest file (see below). Then, simply create a new updated app bundle with this change and submit it for review.

```
// webflow.json manifest file
{
  "name": "my app",
  "apiVersion": "2",
  "featureFlags": {
    "expandedAppModes": false
  }
}
```

### Deciding to Opt Out

Opting-out of this feature means your App will only be able to be launched under the existing conditions; end-users who are Designing in the primary locale and main branch. Additionally, your App will not be launched from the Apps panel of the Designer by users who don’t meet those conditions (i.e,. in build mode).

## Designer v1 APIs

If you have an App using Designer v1 APIs, your app will not be able to be launched in other modes around the Designer, and will continue to only be launched when Designing in the canvas in the primary locale and main branch.

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