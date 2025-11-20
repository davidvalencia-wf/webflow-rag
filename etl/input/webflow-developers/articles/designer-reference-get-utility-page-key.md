---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-utility-page-key
title: "Get utility page key | Webflow Developer Documentation"
published: 2025-11-17
---

## `page.getUtilityPageKey()`

Get the page key of a [Webflow utility page.](https://help.webflow.com/hc/en-us/articles/33961362705171-Page-URLs#utility-pages)

### Syntax

```
page.getUtilityPageKey(): Promise<null | UtilKey>
```

### Returns

**Promise<`null` \| `UtilKey`>**

A promise that resolves to one of the following utility page keys, or `null` if the page is not a utility page:

- `'401'` \- Unauthorized access page
- `'404'` \- Not found page
- `'search'` \- Search results page
- `'ecommerce-checkout'` \- Main checkout page
- `'ecommerce-paypal-checkout'` \- PayPal checkout flow
- `'ecommerce-confirmation'` \- Order confirmation page
- `'usys-log-in'` \- User login page
- `'usys-sign-up'` \- User registration page
- `'usys-reset-password'` \- Password reset request page
- `'usys-user-account'` \- User account management
- `'usys-update-password'` \- Password update page
- `'usys-access-denied'` \- Access denied error page

### Example

```
// Get Current Page
const currentPage = await webflow.getCurrentPage() as Page

// Get utility page key
const utilityKey = await currentPage.getUtilityPageKey()
console.log("Utility Key", utilityKey)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canReadPageSettings** | Any | Any | Any | Any |