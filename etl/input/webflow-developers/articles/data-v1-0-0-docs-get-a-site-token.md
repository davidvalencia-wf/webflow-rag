---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v1.0.0/docs/get-a-site-token
title: "Get a Site Token | Webflow Developer Documentation"
published: 2025-11-17
---

Site tokens grant access to the [Webflow Data API](https://developers.webflow.com/data/reference/rest-introduction) for a specific site, making it possible to programmatically retrieve and manage your CMS data, handle form submissions, set up webhooks for event notifications, and more.

This approach is ideal for site owners looking to create personalized integrations tailored to their specific needs. If you’re building an internal tool, a site API token offers a quick and easy solution. However, for integrations intended for broader use, [consider building a Webflow App that authenticates via OAuth.](https://developers.webflow.com/data/docs/getting-started-apps)

##### API Integrations

Not familiar with integrations? [Check out how Webflow Apps and Integrations can help you build powerful and engaging websites.](https://webflow.com/blog/data-integration-tools)

## What is a site token?

A site token is a unique identifier that provides access to a specific site’s information via the Webflow Data API. When you make a request to Webflow’s APIs, you need to provide a site token to authenticate. Similar to a password, a site token (also known as an “API key” or “access token”) identifies the entity making a request to an API, as well as actions that entity can perform through its [scopes and permissions.](https://developers.webflow.com/data/reference/scopes)

Using a site token, you can:

- **[Access CMS Data:](https://developers.webflow.com/data/docs/working-with-the-cms)** Retrieve, create, update, and delete CMS items directly from your external applications.
- **\[Handle Form Submissions:\] [https://developers.webflow.com/data/reference/forms/get-submission](https://developers.webflow.com/data/reference/forms/get-submission))** Collect form data submissions and manage them programmatically.
- **[Set Up Webhooks:](https://developers.webflow.com/data/reference/webhooks/list)** Receive real-time notifications about events happening on your site, such as form submissions or changes to CMS content.
- **Integrate with 3rd Party Services and Internal Tools:** Seamlessly connect your Webflow site with your own internal tools and platforms to automate workflows and enhance functionality.

By leveraging site tokens, you can build custom integrations that cater to your specific needs, whether it’s automating content updates or syncing data across platforms.

**Key Points to Remember:**

**Security:** Treat your site token like a password. Store it securely and avoid sharing it publicly.

**Permissions:** Customize the [scopes](https://developers.webflow.com/data/reference/scopes) of your token to control which parts of your site it can access and what actions it can perform. Remember to ask only for the scopes you need.

## Creating a site token

To create a site token:

1. Go to Site settings > Apps & integrations > API access.
2. Click Generate API token.
3. Enter a name for your API token.
4. Choose the permissions you want the API token to have for each of Webflow’s APIs

(i.e., no access, read-only, or read and write).
5. Click Generate token.
6. Copy the generated token to your clipboard.

**Limitations**

Site tokens are created per site. If you’re looking to build an integration that works across multiple sites, [consider creating a Webflow App.](https://developers.webflow.com/data/docs/getting-started-apps) Site tokens do not grant access to:

- Authorization endpoints.
- Custom code endpoints.

## Using a site token

Now that you have your site token, you can start making requests to the Webflow Data APIs. Here’s how to get started.

###### cURL

###### JavaScript

###### Python

#### Making a Request with CURL

The simplest way to make a request is by using CURL. CURL is a command-line tool that allows you to transfer data to and from a server.

##### Example

```
curl --request GET \
      --url https://api.webflow.com/v2/sites \
      --header 'accept: application/json' \
      --header 'authorization: Bearer YOUR_API_TOKEN'
```

This command retrieves a list of sites associated with your Webflow account. Replace `YOUR_API_TOKEN` with the site token you generated.

### Example API Response

Here’s an example of what a response from the Webflow API might look like:

JSON

```
{
  "sites": [\
    {\
      "id": "42e63e98c9a982ac9b8b741",\
      "workspaceId": "42e63fc8c9a982ac9b8b744",\
      "createdOn": "1979-10-12T12:00:00.000Z",\
      "displayName": "Heart of Gold Spaceship",\
      "shortName": "heart-of-gold",\
      "lastPublished": "2023-04-02T12:42:00.000Z",\
      "previewUrl": "https://dev-assets.website-files.com/42e63e98c9a982ac9b8b741/197910121200.png",\
      "timeZone": "DeepSpace/InfiniteImprobability",\
      "parentFolderId": "1as2d3f4g5h6j7k8l9z0x1c2v3b4n5m6",\
      "customDomains": [\
        {\
          "id": "589a331aa51e760df7ccb89e",\
          "url": "heartofgold.galaxy"\
        }\
      ],\
      "locales": {\
        "primary": {\
          "id": "653fd9af6a07fc9cfd7a5e57",\
          "cmsLocaleId": "653ad57de882f528b32e810e",\
          "enabled": true,\
          "displayName": "English - Heart of Gold Standard",\
          "redirect": false,\
          "subdirectory": "/en",\
          "tag": "The Ultimate Answer"\
        },\
        "secondary": [\
          {\
            "id": "653fd9af6a07fc9cfd7a5e58",\
            "cmsLocaleId": "653ad57de882f528b32e810g",\
            "enabled": true,\
            "displayName": "Betelgeusian - Vogon Liaison",\
            "redirect": true,\
            "subdirectory": "/bet",\
            "tag": "Vogon"\
          },\
          {\
            "id": "653fd9af6a07fc9cfd7a5e59",\
            "cmsLocaleId": "653ad57de882f528b32e810h",\
            "enabled": false,\
            "displayName": "Magrathean - Custom Planet Designs",\
            "redirect": true,\
            "subdirectory": "/mg",\
            "tag": "Magrathean"\
          }\
        ]\
      }\
    },  ]
}
```

### Best Practices

- **Always use HTTPS**: Ensure that your token is transmitted securely.
- **Mint tokens for each use case**: Instead of reusing tokens, generate a new token for each specific use case to maintain better security and control.
- **Rotate tokens periodically**: Regularly update and revoke old tokens to maintain security.
- **Be Descriptive**: Name your tokens something descriptive and meaningful to easily identify their purpose.
- **Minimal Scopes**: Generate tokens with the minimal scopes needed for your use case. Mint a new one if you need to add new scopes. This limits the potential impact if a token is compromised.

## Troubleshooting and FAQs

###### How long is a site token valid?

Site tokens are valid until they are manually revoked or after 365 days of inactivity.

###### Can I regenerate a site token?

Yes, you can generate a new token at any time from the API access section in your site settings.

###### What happens if I lose my site token?

You will need to generate a new one and update any integrations using the old token.

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

[Webflow Data API V1 is deprecated. Please view the V2 version of our API reference](https://developers.webflow.com/data/reference/rest-introduction)