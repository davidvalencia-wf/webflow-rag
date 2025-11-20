---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/changelog/webhook-signatures
title: "Webhook Signatures | Webflow Developer Documentation"
published: 2025-11-17
---

[September 22, 2022](https://developers.webflow.com/data/changelog/webhook-signatures)

## [Webhook Signatures](https://developers.webflow.com/data/changelog/webhook-signatures)

## Webhook signature validation now available

Webflow’s Data API now supports webhook signature validation for enhanced security. Webhooks created with an OAuth Application now include additional headers that enable you to verify the authenticity of incoming webhook requests.

### What’s new

The following headers are now included in webhook payloads:

- **`x-webflow-signature`**: A signature hash generated using your application’s client secret
- **`x-webflow-timestamp`**: The timestamp when the webhook was sent

These headers enable you to validate that webhook requests are genuinely from Webflow and haven’t been tampered with, protecting your integrations from potential security threats.

### Why this matters

Validating webhook signatures helps you:

- Prevent unauthorized access to your webhook endpoints
- Ensure data integrity by confirming requests haven’t been modified
- Protect against replay attacks by validating request timestamps

### How to implement signature validation

#### Using the Webflow SDK (recommended)

The simplest way to validate webhook signatures is to use the Webflow SDK:

```
import { WebflowClient } from "webflow-api";
import express from "express";

const webflowClient = new WebflowClient({ accessToken: AUTHTOKEN });
const app = express();
app.use(express.json());

app.post('/webhook', async (req, res) => {
  const isValidRequest = await webflowClient.webhooks.verifySignature({
    headers: req.headers,
    body: JSON.stringify(req.body),
    secret: CLIENT_SECRET
  });

  if (isValidRequest) {
    // Process the webhook
  } else {
    // Reject the request
  }

  res.sendStatus(200);
});
```

#### Manual verification

If you prefer to validate signatures manually, follow these steps:

1. **Generate an HMAC hash** using:
   - The timestamp from the `x-webflow-timestamp` header
   - The request body string
   - Your OAuth application’s client secret
   - The SHA-256 algorithm
2. **Compare signatures** by checking if your generated hash matches the `x-webflow-signature` header

3. **Verify timestamp** to ensure the request is recent (within 5 minutes) to prevent replay attacks

For detailed implementation examples, please refer to the [webhook signature validation documentation](https://developers.webflow.com/data/docs/working-with-webhooks#validating-request-signatures).

### Backward compatibility

This update only applies to webhooks created through OAuth Applications. Existing webhooks created through the Site Dashboard will continue to function without these signature headers.

It’s highly recommended to update your webhook handlers to implement signature validation for enhanced security.

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