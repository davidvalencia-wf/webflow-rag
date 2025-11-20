---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/string-element
title: "String Element | Webflow Developer Documentation"
published: 2025-11-17
---

The String element represents text content of an element within the Webflow Designer.

String elements can’t be created directly, and are only created when adding elements that contain text content.

## Methods

You can get and set the text value of a string element using the following methods:

[Get Text\\
\\
Retrieves the text value from a String element.](https://developers.webflow.com/designer/reference/string-element/getText) [Set Text\\
\\
Sets the text value on a String element, overwriting any prior text value.](https://developers.webflow.com/designer/reference/string-element/setText)

## Properties

| Property | Description | Type | Example |
| --- | --- | --- | --- |
| `id` | Unique identifier for the element composed of two identifiers, the `component`and the `element`. | `object` | `{component: "64c813...", element: "5edf8e59-71f9..."}` |
| `type` | Specifies the type of the element. | `string` | ’String’ |
| `children` | Indicates whether an element can contain child elements. | `boolean` | `false` |
| `styles` | Indicates if the element can be styled. | `boolean` | `false` |
| `textContent` | Indicates if the element can contain text content | `boolean` | `false` |
| `customAttributes` | Indicates whether an element can have custom attributes | `boolean` | `false` |

## Supported Elements

The following elements contain string elements as children, which can be accessed using the String element methods.

- `DOMElement`
- `BlockquoteElement`
- `EmphasizedElement`
- `HeadingElement`
- `LinkElement`
- `ParagraphElement`
- `SpanElement`
- `StrongElement`
- `SuperscriptElement`
- `SubscriptElement`
- `InlineCodeElement`
- `CommerceBuyNowButtonElement`
- `CommerceCartOpenLinkElement`
- `CommerceCartCheckoutButtonElement`
- `CommerceCartCloseLinkElement`
- `CommerceCartRemoveLinkElement`
- `CommerceCartOptionListItemLabelElement`
- `CommerceCartOptionListItemValueElement`
- `CommerceCartQuickCheckoutButtonElement`
- `CommerceCartApplePayButtonElement`
- `CommerceCheckoutLabelElement`
- `CommerceLabelElement`
- `CommerceCheckoutPlaceOrderButtonElement`
- `CommerceCheckoutBillingAddressToggleLabelElement`
- `CommerceCheckoutOrderItemOptionListItemLabelElement`
- `CommerceCheckoutOrderItemOptionListItemValueElement`
- `CommerceCheckoutSummaryLabelElement`
- `CommerceCheckoutDiscountsButtonElement`
- `CommerceCheckoutDiscountsLabelElement`
- `DropdownLinkElement`
- `LightboxWrapperElement`
- `FormBlockLabelElement`
- `FormInlineLabelElement`
- `NavbarLinkElement`
- `TabsLinkElement`
- `UserFormBlockLabelElement`