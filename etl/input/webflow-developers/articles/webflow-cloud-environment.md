---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/environment
title: "About the Webflow Cloud edge environment | Webflow Developer Documentation"
published: 2025-11-17
---

Webflow Cloud runs your app on [Cloudflare Workers](https://developers.cloudflare.com/workers/), executing code at edge locations worldwide using the [Workers runtime](https://developers.cloudflare.com/workers/runtime-apis/). While it shares some concepts with traditional serverless platforms, Workers differs from Node.js environments.

This guide outlines those key differences and provides best practices to prepare your code for deployment on Webflow Cloud.

## Understanding the workers runtime

Unlike traditional serverless platforms built on containers or virtual machines, [Workers use lightweight V8 isolates](https://developers.cloudflare.com/workers/reference/how-workers-works/) to deliver fast, scalable, and secure performance. The Workers runtime is designed to start code instantly with minimal overhead, allowing each function to run in its own isolated environment. This reduces cold start times and provides strong security boundaries between executions.

Because of this architecture, there are important differences in how your app runs—especially around API support, state management, resource limits, and deployment workflows. The guides below outline what to expect and how to prepare your code for Webflow Cloud.

##### Edge runtime vs Workers runtime

Throughout the documentation, you may encounter the term “edge runtime.” The Workers runtime is a specific implementation of the edge runtime, and the terms are often used interchangeably.

[Configuration\\
\\
Configure your project for deployment on Webflow Cloud.](https://developers.webflow.com/webflow-cloud/environment/configuration) [Framework setup\\
\\
Some frameworks need additional configuration to run as expected on Webflow Cloud.](https://developers.webflow.com/webflow-cloud/environment/framework-customization) [Node.js compatibility\\
\\
Webflow Cloud partially supports Node.js APIs. Review your code and dependencies for compatibility.](https://developers.webflow.com/webflow-cloud/environment/nodejs-compatibility)

[Environment variables](https://developers.webflow.com/webflow-cloud/environments#managing-environment-variables)

[Define environment variables in](https://developers.webflow.com/webflow-cloud/environments#managing-environment-variables) [Webflow Cloud Environments](https://developers.webflow.com/webflow-cloud/environments).

[Resource limits\\
\\
The runtime enforces strict limits on memory, CPU, and bundle size.](https://developers.webflow.com/webflow-cloud/limits)

Before deploying, review your code and dependencies for compatibility. If you’re migrating, pay close attention to API routes, authentication, and third-party libraries.

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