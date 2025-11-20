---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-user-id-token
title: "Get user ID token | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getIdToken()`

Retrieves a [JSON Web Token (JWT)](https://jwt.io/) that uniquely identifies the current user of your Designer Extension. This ID token contains encoded user information that can be used for authentication and authorization purposes.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Encryption.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Encryption.svg)](https://developers.webflow.com/apps/docs/authenticating-users-with-id-tokens)

[Authenticating users with the Data API](https://developers.webflow.com/apps/docs/authenticating-users-with-id-tokens)

[To decode and verify the token, send a POST request to the](https://developers.webflow.com/apps/docs/authenticating-users-with-id-tokens) [Resolve ID Token endpoint](https://developers.webflow.com/data/v2.0.0-beta/reference/token/resolve). The endpoint will return the user’s details, which you can use to implement permission-based features or personalized experiences in your extension.

[Read the guide](https://developers.webflow.com/apps/docs/authenticating-users-with-id-tokens)

### Syntax

```
webflow.getIdToken(): Promise<string>;
```

### Returns

**Promise< _String_ >**

A Promise that resolves to the value of the ID Token. The ID token will remain valid for 15 minutes.

### Example

```
// Get ID Token
const idToken = await webflow.getIdToken()

// Print ID Token
console.log(idToken)
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)