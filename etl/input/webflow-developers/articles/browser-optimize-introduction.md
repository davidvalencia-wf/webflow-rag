---
source: webflow-developers
category: general
url: https://developers.webflow.com/browser/optimize/introduction
title: "Optimize methods in the Browser API | Webflow Developer Documentation"
published: 2025-11-17
---

![](https://cdn.prod.website-files.com/650311fc2ebc7fe34237a592/6707da8cde91dd9813b4aaba_hero.webp)![](https://cdn.prod.website-files.com/650311fc2ebc7fe34237a592/6707dbd2416640c50f680a46_successrate.webp)![](https://cdn.prod.website-files.com/650311fc2ebc7fe34237a592/672296f31b581bfa0c5cc890_performancechart.webp)

[Webflow Optimize](https://webflow.com/optimize) enables you to customize the version of a page shown to visitors based on their characteristics. Think of it as a supercharged A/B testing tool that enables you to test numerous variations of your site to dynamically personalize a visitor’s experience based on their attributes.

## Optimize methods in the Browser API

The Browser API includes Optimize-specific methods that enable you to extend this functionality to incorporate other tools you may use to track audiences and goals. With these Optimize methods, you can:

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Test.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Test.svg)\\
\\
Track variations\\
\\
Send variations from Optimize experiments to third-party tools](https://developers.webflow.com/browser/optimize/variations) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/OptimizeUser.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/OptimizeUser.svg)\\
\\
Personalize experiences with custom attributes\\
\\
Set custom attributes to personalize experiences based on user behavior and data](https://developers.webflow.com/browser/optimize/attributes)

## Get started with the Optimize in the Browser API

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CirclePlay.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CirclePlay.svg)](https://developers.webflow.com/browser/optimize/quickstart)

[Get started with Optimize](https://developers.webflow.com/browser/optimize/quickstart)

[Use the Quickstart guide to learn how to use the Optimize methods to track variations and set custom attributes.](https://developers.webflow.com/browser/optimize/quickstart) [Get started](https://developers.webflow.com/browser/optimize/quickstart)

## FAQs

###### What are the Optimize methods?

The Optimize methods are JavaScript functions available through the Webflow Browser API’s `wf` namespace that enable you to track optimization variations and manage custom user attributes.

You can use methods like [`wf.onVariationRecorded()`](https://developers.webflow.com/browser/optimize/onVariationRecorded) and [`wf.setAttributes()`](https://developers.webflow.com/browser/optimize/setAttributes) to send Webflow Optimize data to third-party analytics and marketing tools, helping you better understand user behavior and personalize experiences.

###### Is the Browser API already installed on my site?

The Webflow Browser APIs and Optimize methods are automatically available on all Webflow Optimize enabled sites with no manual installation required. See the [Quickstart guide](https://developers.webflow.com/browser/optimize/quickstart) for more information.

###### How can I use the Optimize methods?

The Optimize methods are available through the global `wf` object in your browser. You can access them through custom code in your site’s pages or through services like Google Tag Manager. The APIs can be called from any JavaScript code running on your site. See the [Quickstart guide](https://developers.webflow.com/browser/optimize/quickstart) for more information.

## Looking for more information?

Visit the [Webflow Help Center](https://help.webflow.com/hc/en-us/articles/33609390628243-Intro-to-Webflow-Optimize) to learn more about Optimize features, including experiments, personalization, and analytics. The Help Center provides detailed guides on:

- Setting up and configuring Optimize experiments
- Creating and managing audience segments
- Analyzing test results and insights
- Best practices for running effective experiments
- Enterprise-specific features and capabilities

You can also explore [Webflow University](https://university.webflow.com/videos/start-optimizing-your-site-with-webflow-optimize) for additional tutorials and resources on making the most of Webflow Optimize.

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