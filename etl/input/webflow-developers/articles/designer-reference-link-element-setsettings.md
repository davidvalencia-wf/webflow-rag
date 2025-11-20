---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/link-element/setSettings
title: "Set Link Settings | Webflow Developer Documentation"
published: 2025-11-17
---

## `element.setSettings(mode, target, metadata)`

Apply settings for a Link Block element. Including the type of link, its value, and metadata settings.

## Syntax

```
element.setSettings(
  mode: 'url' | 'page' | 'pageSection' | 'email' | 'phone' | 'attachment';
  target: string | Page | Element | Asset;
  metadata?: {openInNewTab?: boolean; subject?: string;}
): Promise<null>
```

## Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `mode` | enum <br>`'url'` \| `'page'` \| `'pageSection'` \| `'email'` \| `'phone'` \| `'attachment'` | The type of link to set. Can be a URL, email, phone number, link to another page or page section, or an attachment. |
| `target` | `string` \| `Page` \| `Element` \| `Asset` | The value of the link. The value type is determined by the selected mode. For example, if the link mode is “attachment”, the method expects an Asset object. |
| `metadata` | object (optional) | Optional metadata for link settings. See fields below. |

**metadata fields:**

| Field | Type | Description |
| --- | --- | --- |
| `openInNewTab` | boolean | Choose to open the link in a new tab. |
| `subject` | string | The subject line of an `email` link. |

## Returns

**Promise<`null`>**

A Promise that resolves to `null`

## Example

```
// Get Selected Element
const element = await webflow.getSelectedElement();

if (element) {
  const newLink = await element.after(webflow.elementPresets.LinkBlock); // Create new link element
  await newLink.setSettings("url", "https://www.webflow.com", {
    openInNewTab: true,
  }); // Set link element settings
  const targetValue = await newLink.getTarget(); // Get target value
  console.log(targetValue);
}
```

## Designer ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canEdit** | Any | Any | Canvas | Any |