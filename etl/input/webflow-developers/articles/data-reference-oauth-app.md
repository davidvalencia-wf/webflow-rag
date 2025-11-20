---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/reference/oauth-app
title: "OAuth | Webflow Developer Documentation"
published: 2025-11-17
---

This tutorial guides you through setting up an [OAuth 2.0](https://oauth.net/2/) authentication flow. This flow allows users to grant limited permissions to your App and enables your App to request an access token to perform actions on behalf of the user.

By the end of this tutorial, your Webflow App will be able to obtain an access token on behalf of a user using the [Authorization Code Grant flow.](https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type)

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/48px/Apps.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/48px/Apps.svg)](https://github.com/Webflow-Examples/cms-examples)

[Quickstart](https://github.com/Webflow-Examples/cms-examples)

[Our example Apps come with the OAuth 2.0 flow already set up for you. Start building your Webflow App quickly by using one of our pre-configured example apps.](https://github.com/Webflow-Examples/cms-examples) [CMS Explorer](https://github.com/Webflow-Examples/cms-examples)

### Authorization Code Grant Flow

Webflow uses the [Authorization Code Grant flow](https://developer.okta.com/blog/2018/04/10/oauth-authorization-code-grant-type) to provide access tokens to Apps. This flow involves a series of interactions between Webflow’s authorization server and your web app. Here’s how the process works when a user visits your site for the first time:

1. **User sign-up/Login**: A user signs up or logs in to your App. At some point, they may need to perform an action that requires using the Webflow API.
2. **Authorization request**: To make requests to the Webflow API on the user’s behalf, your App redirects the user to an authorization screen. Here, they can review the permissions your App is requesting and authorize access to specific Webflow Sites or a Workspace.
3. **User authorization**: Once the user grants authorization, Webflow redirects them back to your App via a redirect URI specified during the app setup, adding a `code` parameter to the query string.
4. **Token Request**: Your app uses the `code` to make a secure request to Webflow’s authorization server to obtain an access token. If the request is valid, Webflow responds with an access token.
5. **API Requests**: Your app can now use this access token to make requests to the Webflow API on behalf of the user.

# Get an access token

#### Requirements

Before you begin, ensure you have the following:

- A Webflow App created with the “Data Client” building block. [Learn more here](https://developers.webflow.com/data/docs/getting-started-apps)
- Your app’s client credentials: `client_id` and `client_secret.`

**Note:** Only workspace administrators are authorized to view a client secret. If you’re not a site administrator, please contact one to get the secret for you.

###### 1\. Set up your server

Before you can request an access token, you’ll need to set up your server to handle the OAuth 2.0 flow. We recommend using JavaScript or Python, as we provide SDKs for these languages that can help simplify the authentication process.

Follow the below examples in Node.js or Python to help you create a server that can accept requests and communicate with the Webflow authorization server.

###### Node.js

###### Python

1. **Install the necessary packages**

Ensure all required libraries and dependencies are installed.

```
npm install express dotenv webflow-api
```

2. **Store environment variables**

Create a `.env` file to store your sensitive information like the `CLIENT_ID` and `CLIENT_SECRET`.

.env

```
CLIENT_ID=your_client_id
CLIENT_SECRET=your_client_secret
REDIRECT_URI=your_redirect_uri #optional
STATE=your_unique_state #optional
```

3. **Initialize server**

Set up the server to listen on a specific port.

server.js

```
require('dotenv').config();
const express = require('express');
const { WebflowClient } = require('webflow-api');

const app = express();
const port = 3000;

/*
     We'll add the necessary endpoints here in the steps below.
*/

app.listen(port, () => {
       console.log(`Server is running at http://localhost:${port}`);
});
```

###### 2\. Create an authorization link

To enable users to install your App, you need to create an authorization link. This link directs users to a Webflow authorization screen where they can grant your App permission to access their Webflow data.

##### Where do I put this link?

**App Marketplace Submission:** Supply this link in your application to the App marketplace. Users will use it to install your App from the marketplace.

**Your Site:** Place this link on your site to direct users to try out or install your App.

You can create the authorization link using various methods, with the recommended approach being through our JavaScript and Python SDKs.

### Request Parameters

To create the authorization link, you will need the following information:

client\_id

stringRequired

Unique ID for your application. Can be found in the dashboard.

response\_type

stringRequired

This value should always be “code”.

redirect\_uri

stringRequired

The URI to redirect the user once they’ve granted authorization. This must match what’s used in your App settings.

state

string

A token value provided by your application to prevent [CSRF attacks.](https://owasp.org/www-community/attacks/csrf#:~:text=CSRF%20attacks%20target%20functionality%20that,the%20response%2C%20the%20victim%20does.) If passed, the authorization server should respond with this parameter.

### Constructing the authorization link

##### Scopes on the OAuth URL

Verify that the scopes requested in this Install/OAuth URL are equal to or a subset of the scopes configured for your app in the app settings. If there’s a mismatch where the Install URL requests scopes beyond what’s configured in the app settings, users won’t be able to install your app and an error will be displayed.

#### Using the SDK

To simplify the process of creating authorization links and handling OAuth flows, you can use the provided JavaScript and Python SDKs. These SDKs offer convenient methods to generate the authorization URL with the required parameters.

###### Node.js

###### Python

server.js

```
require('dotenv').config();
const express = require('express');
const { WebflowClient } = require('webflow-api');

const app = express();
const port = 3000;

// Endpoint to redirect to the authorization link
app.get('/auth', (req, res) => {
    const authorizeUrl = WebflowClient.authorizeURL({
        state: process.env.STATE,
        scope: 'sites:read',
        clientId: process.env.CLIENT_ID,
        redirectUri: process.env.REDIRECT_URI,
    });

    res.redirect(authorizeUrl);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
```

###### Manually create the authorization link

If you prefer not to use the SDKs, you can manually construct the authorization link by adding the necessary query parameters to the authorization URL:

```
https://webflow.com/oauth/authorize
```

Construct the authorization URL using the gathered parameters:

```
https://webflow.com/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&scope=assets%3Aread%20assets%3Awrite%20authorized_user%3Aread%20cms%3Aread%20cms%3Awrite%20custom_code%3Aread%20custom_code%3Awrite%20forms%3Aread%20forms%3Awrite%20pages%3Aread%20pages%3Awrite%20sites%3Aread%20sites%3Awrite
```

- When URL encoding multiple scopes, they should be connected by a space (`%20`).
- Scopes are written in the format `scope:action`, so the colon (`:`) should be encoded as `%3A`.

For example passing the following scopes: `sites:read`, `sites:write`, and `pages:read` should look like `sites%3Aread%20sites%3Awrite%20pages%3Aread`

###### Copy the link from the Dashboard

Additionally, you can copy an auto-generated installation link from your App’s settings.

In your Workspace Dashboard:

1. Select to “Apps and Integrations” in the left-hand menu
2. Scroll to the “App Development” section and find your App
3. Copy the link from the “Install” button

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/390600a-Screenshot_2024-08-01_at_4.13.54_PM.png)

###### 3\. Handle redirect to the callback URI

When users click on the authorization link, they will be taken to a screen where they can review and grant the necessary permissions for your App.

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/bcd2d30-image.png)

After the user authorizes the App, Webflow redirects them to your server using the redirect URI specified in your App settings. This `GET` request to your server includes the following query parameters:

- `code` \- A single-use authorization code that you’ll exchange for an access token. This code is only valid for 15 minutes.
- `state` : _optional_ \- The unique state value you provided in the initial request. Ensure this value matches the original to protect against CSRF attacks.

* * *

Let’s set up an endpoint to handle the callback request and store these parameters, as you’ll need them in the next step to request an access token from Webflow.

See the example below for details on completing the following steps:

1. **Setup the callback endpoint**

Create a route to handle the redirect from Webflow
2. **Verify `state` parameter**

Optionally, check that the state parameter matches the one sent in the authorization request.
3. **Extract authorization code**

Retrieve the code from the query parameters.

#### Example

###### Node.js

###### Python

server.js

```
require('dotenv').config();
const express = require('express');
const { WebflowClient } = require('webflow-api');

const app = express();
const port = 3000;

// Endpoint to redirect to the authorization link
app.get('/auth', (req, res) => {
    const authorizeUrl = WebflowClient.authorizeURL({
        state: process.env.STATE,
        scope: 'sites:read',
        clientId: process.env.CLIENT_ID,
        redirectUri: process.env.REDIRECT_URI,
    });

    res.redirect(authorizeUrl);
});

// Endpoint to receive info from the callback URL
app.get('/callback', async (req, res) => {
    const { code, state } = req.query; // Store code and state parameters as variables

    if (state !== process.env.STATE) {
        return res.status(400).send('State does not match');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
```

###### 4\. Request an access token

Now that you have the authorization code you can exchange it for an access token. The access token request should be made as soon as possible after authorization as an unconfirmed authorization code is only valid for 15 minutes.

Let’s walk through the steps to create a smooth flow for a user:

1. **Request an access token from Webflow’s authorization server**

In the same endpoint we just set up, create a request to Webflow with the following parameters. Webflow requires these parameters to ensure that the entity requesting the access token is the same entity that received the authorization code.

#### Authorization server endpoint

`POST https://api.webflow.com/oauth/access_token`

#### Request parameters

client\_id

stringRequired

Unique ID for your application. Can be found in the dashboard.

client\_secret

stringRequired

Private value unique to your application. Can be found in the dashboard.

code

stringRequired

Authorization code used to retrieve an `access_token` for the user. Can only be used once.

2. **Store the access token securely**

For demonstration purposes, we’re storing the access token in a variable and printing it to the terminal. However, this approach isn’t secure for production. You should store the access token securely in a database or environment variables. For comprehensive guidance on securely storing tokens, please refer to our example apps on [GitHub](https://github.com/Webflow-Examples).

3. **Redirect the user within your App**

After successfully obtaining the access token, redirect the user to an appropriate location within your app. This could be a dashboard, a welcome page, or any other relevant section. Ensure that the user experience is smooth and they’re informed about the successful authentication.

#### Example

###### Node.js

###### Python

server.js

```
require('dotenv').config();
  const express = require('express');
  const { WebflowClient } = require('webflow-api');

  const app = express();
  const port = 3000;

  // Endpoint to redirect to the authorization link
  app.get( '/auth', (req, res) => {
      const authorizeUrl = WebflowClient.authorizeURL({
          state: process.env.STATE,
          scope: 'sites:read',
          clientId: process.env.CLIENT_ID,
          redirectUri: process.env.REDIRECT_URI, // If the redirect URI is included in the auth link, it must also be included in the request for an access token
      });

      res.redirect(authorizeUrl);
  });

  // Endpoint to receive info from the callback URL
  app.get('/callback', async (req, res) => {
      const { code, state } = req.query;

      if (state !== process.env.STATE) {
          return res.status(400).send('State does not match');
      }

      try {
        // Request an access token
       const accessToken = await WebflowClient.getAccessToken({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            code: code,
            redirect_uri: process.env.REDIRECT_URI,
        });

        // Store the access token securely, e.g., in a database or session (not shown here for brevity)
      console.log(accessToken)

      // Redirect the user to your App
      res.redirect('/dashboard')

    } catch (error) {
        console.error('Error during OAuth process:', error);
        res.status(500).send('Internal Server Error');
    }

  });

    // Dashboard route for demonstraton purposes
    app.get('/dashboard', async (req, res) => {
        res.send('Welcome to your dashboard!')
    });

  app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
  });

```

###### 5\. Start your server and test the authentication flow

You’re ready to test your newly created authentication flow! In this step, we’ll start our server, navigate to the authorization screen, and get an access token from Webflow.

1. **Create a secure tunnel using [ngrok](https://ngrok.com/) _(OPTIONAL)_**

###### using ngrok

ngrok can be used to create a secure tunnel to your localhost, providing you with an HTTPS link that can be used as a valid redirect URI.

1. **Install ngrok**
Download and install ngrok using a package manager or [directly from their website](https://developers.webflow.com/data/reference/oauth-app).

###### Homebrew

###### Choco

```
brew install ngrok/ngrok/ngrok
```

2. **Authorize the ngrok agent** [Copy your authentication token](https://ngrok.com/blog-post/authentication-with-ngrok) from ngrok, and enter the following command in your terminal.

```
ngrok config add-authtoken $YOUR_AUTHTOKEN
```

3. **Create a secure tunnel**
In a new terminal window, run the following command to create a tunnel to your local server:

```
ngrok http 3000
```

Ngrok will provide you with a public HTTPS URL that forwards to your local server running on port 3000. It should look something like this:

```
https://your-ngrok-url.ngrok.io
```

4. **Update your redirect URI in your App’s settings**

5. In your workspace settings, navigate to Apps & Integrations > App Development

6. Find your App and click the “Edit App” button

7. Navigate to the “Building Blocks” menu

8. Update the Redirect URI with your Ngrok URL, ensuring that you include the correct endpoint. For example, if your endpoint is `/callback`, your Redirect URI should look something like `https://your-ngrok-url.ngrok.io/callback`.

9. **Update the redirect URI in your `.env` file**
Be sure to also update your redirect URI in your `.env` file if you’re passing your callback URI when creating an authorization link.

```
REDIRECT_URI=https://your-ngrok-url.ngrok.io/callback
```

2. **Start your server**
Enter the following command into your terminal to start your server.

###### Node.js

###### Python

```
node server.js
```

3. **Start the authorization flow**
1. **Start the authentication process**
      Open your browser and go to `http://localhost:3000/auth`. You will be redirected to Webflow’s authorization screen for your App.
2. **Authorize your app**
      Select the workspace or sites you want your app to access, and click the “Authorize” button.
3. **Redirect to your app**
      Upon successful authorization, you will be redirected to your app’s dashboard.
4. **Verify the access token**
      Check your terminal to see the access token printed out.

Didn’t see what you expected? [Read the troubleshooting guide below](https://developers.webflow.com/data/reference/oauth-app#troubleshooting).

# Revoke an access token

To revoke an access token that has been issued to your application, make a POST request to the following endpoint with the below parameters:

```
https://webflow.com/oauth/revoke_authorization
```

### Request Parameters

client\_id

stringRequired

The unique identifier for your OAuth application.

client\_secret

stringRequired

The secret key associated with your OAuth application.

access\_token

stringRequired

The access token that you wish to revoke.

### Example Request

cURL

```
curl -X POST https://webflow.com/oauth/revoke_authorization \
  -H "Content-Type: application/json" \
  -d '{
        "client_id": "2ccc1b455c782fd60093590c83ee5e315b36bd6640507bb48570e5d0265c2854",
        "client_secret": "d26ec60528020e1caf426db1a20dceaf5f4e3581bb29bc659b2886d46a7160ed",
        "access_token": "53db404efe82daea0c65c635a49bc9388e470146b4d800f559cb9a7f3daf83f1"
      }'
```

### Response

If the request is successful, the access token will be revoked, and the response will return an HTTP status code of `200` OK with the following response body:

```
{
    "did_revoke": true
}
```

### Possible Errors

| Error Type | Description |
| --- | --- |
| `invalid_client` | The `client_id` or `client_secret` is invalid or doesn’t match the provided credentials. |
| `invalid_token` | The `access_token` provided doesn’t exist or has already been revoked. |
| `invalid_request` | The request is missing one or more required parameters, or is otherwise malformed. |

# Troubleshooting

###### My authorization link shows 400 Bad Request

If your authorization link returns a 400 Bad Request error, ensure the following:

- The `client_id` is correct and matches the one provided in your app’s settings.
- The scopes you are requesting are registered and valid for your app in the dashboard.
- If you are including the `redirect_uri` parameter, verify that it matches the one registered for your app in the dashboard.
- Ensure that the URL is properly constructed and encoded if you are creating it manually.

###### My server responds with an invalid\_grant error

- If you included a `redirect_uri` in your authorization link, you must also include it in your request for an access token.
- Ensure your environment variables are loading, and you’re sending the correct `client_id` and `client_secret`.
- Make sure you have a fresh `code` value, these tokens are single-use and can not be used again. Also, the token is only valid for 15 minutes after it has been granted.

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