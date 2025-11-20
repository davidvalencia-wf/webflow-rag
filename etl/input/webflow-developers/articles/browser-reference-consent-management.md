---
source: webflow-developers
category: general
url: https://developers.webflow.com/browser/reference/consent-management
title: "Site Tracking and Consent Management | Webflow Developer Documentation"
published: 2025-11-17
---

Use Webflow’s Browser APIs to manage user tracking consent for [Analyze](http://webflow.com/analyze) and [Optimize](http://webflow.com/optimize). Check consent status, control tracking, and integrate with your consent management platform—or build your own custom solution.

## Site tracking

Webflow’s [Site tracking](https://help.webflow.com/hc/en-us/articles/33620965657107-Analyze-Optimize-tracking-settings) lets you record analytics, personalize experiences, and run AI-powered tests using Analyze and Optimize. Site tracking must be enabled to use the consent management APIs.

Privacy laws like GDPR and CCPA may require you to obtain visitor consent before tracking, depending on your site’s location and audience. It’s your responsibility to determine which requirements apply to your site. Webflow’s APIs provide the tools you need to implement consent flows for data tracking as needed. [Learn more about compliance requirements](https://help.webflow.com/hc/en-us/articles/34273101581715-Analyze-Optimize-compliance-with-privacy-laws).

## Consent management

A consent management solution lets visitors choose how their data is collected. Typically shown as a banner or menu, it allows users to opt in or out of tracking. Using a consent management solution helps you inform visitors and manage their preferences.

### Consent management apps in the Webflow Marketplace

Webflow offers third-party apps for consent management in the [Webflow Marketplace](https://webflow.com/apps/compliance). These apps help you set up and manage consent workflows without writing code. Additionally, Webflow provides detailed setup guides for the [DataGrail](https://help.webflow.com/hc/en-us/articles/34394688342035) and [Finsweet](https://help.webflow.com/hc/en-us/articles/34394790067859-Integrate-Finsweet-Components-Cookie-Consent-for-consent-management) apps.

### Consent Management using Webflow’s APIs

Webflow’s Browser APIs let you check a user’s tracking preferences and manage consent directly. Use these APIs to build a custom consent management solution tailored to your site and user experience. This approach is ideal for:

- Site owners who need to manage consent themselves
- Developers integrating with existing Consent Management Platforms (CMPs)
- Teams requiring specific customization of the consent experience

## Consent management APIs

The following APIs are available in the Webflow Browser API:

- [Get consent status:](https://developers.webflow.com/browser/reference/get-user-tracking-choice) Returns the user’s current consent state
- [Allow User Tracking:](https://developers.webflow.com/browser/reference/allow-user-tracking) Opts users into Webflow’s tracking
- [Deny User Tracking:](https://developers.webflow.com/browser/reference/deny-user-tracking) Opts users out of Webflow’s tracking

### Integrating with existing consent management platforms

If you already use a consent management platform like OneTrust or TrustArc, you can add [a custom code snippet](https://help.webflow.com/hc/en-us/articles/33961357265299-Custom-code-in-head-and-body-tags) using the consent management APIs in the header of your site to pass user consent choices to Webflow. The following examples show how to detect user consent choices in your consent management platform and update Webflow’s tracking preferences in real time.

###### General

###### OneTrust

###### TrustArc

To respect user consent, detect the visitor’s choice in your consent management platform and update Webflow’s tracking preferences with the appropriate API call. Most platforms provide a callback or event when consent changes—use this to trigger the `allowUserTracking` or `denyUserTracking` API calls.

```
<Script>
wf.ready(() => {
   // First, detect the current state
   const isOptedOut = wf.getUserTrackingChoice() === 'deny';
   if (isOptedOut) {
      //
      // Your Consent Management Platform logic to detect an optIn signal goes here
      //
      // Then you call Webflow to let us know there's been an optIn
      wf.allowUserTracking();
   }
   else {
      //
      // Your Consent Management Platform logic to detect an optOut signal goes here
      //
      // Then you call Webflow to let us know there's been an optOut
      wf.denyUserTracking();
   }
});
</Script>
```

### Create your own consent management solution

If you don’t use a consent management platform, you can build your own with Webflow’s APIs. The following examples show how to add a cookie consent modal to your site and manage user consent.

1. **Add the modal in the Webflow Designer:**

This code will add a cookie consent modal to a page on your site.
   - Copy the “Designer API Example” code below
   - Open the [Designer API Playground](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62&workspace=webflow-developers-b51a9d)
   - Paste the code into the Playground and run it to add the banner to your page.
   - Optional: To ensure the modal is displayed on every page, you can [convert it into a component](https://help.webflow.com/hc/en-us/articles/33961303934611-Components-overview) and add it to all pages on your site.
2. **Enable consent logic with custom code:**

This code will connect the modal buttons to Webflow’s consent APIs, so clicking “Accept” or “Decline” updates the user’s consent status. It also uses GSAP to animate the modal in and out.
   - Copy the “Custom Code Example” code below
   - In your Webflow project, go to your site settings
   - Paste the code into the Header section
   - [Enable GSAP](https://help.webflow.com/hc/en-us/articles/40538857574419-Getting-started-with-GSAP-in-Webflow) in your site settings
   - Publish your site and interact with the modal.
3. **Check consent status in your browser:**

You can see the current consent status using your browser’s Developer Tools.
   - Open your website in a browser (such as Chrome).

   - Right-click anywhere on the page and select **Inspect** to open Developer Tools.

   - Click the **Console** tab at the top of the Developer Tools panel.

   - Paste and run the following command to display the consent status.

     ```
     wf.getUserTrackingChoice();
     ```

Designer API ExampleCustom Code Example

```
// Webflow Designer API: Cookie Consent Banner Example
// Paste and run this code in the Designer API Playground

// 1. Create styles
const popupStyle = await webflow.createStyle('popupWrapper');
await popupStyle.setProperties({
    'position': 'fixed',
    'bottom': '2rem',
    'left': '0',
    'right': '0',
    'margin-left': 'auto',
    'margin-right': 'auto',
    'max-width': '420px',
    'z-index': '9999',
    'background-color': '#fff',
    'border-radius': '1rem',
    'box-shadow': '0 4px 24px rgba(0,0,0,0.12)',
    'padding-top': '1.5rem',
    'padding-bottom': '1.5rem',
    'padding-left': '1.5rem',
    'padding-right': '1.5rem',
    'display': 'flex',
    'flex-direction': 'column',
    'align-items': 'flex-start',
    'column-gap': '1rem'
  });

const buttonStyle = await webflow.createStyle('consentButton');
await buttonStyle.setProperties({
  'border-radius': '0.5rem',
  'padding-top': '0.5rem',
  'padding-bottom': '0.5rem',
  'padding-left': '1.25rem',
  'padding-right': '1.25rem',
  'font-weight': '500',
  'cursor': 'pointer',
  'border-width': '0px',
  'outline-style': 'none',
  'transition-property': 'background-color,color',
  'transition-duration': '0.2s',
  'transition-timing-function': 'ease-in-out'
});

const acceptStyle = await webflow.createStyle('acceptButton');
await acceptStyle.setProperties({
  'background-color': '#2563eb',
  'color': '#fff'
});

// Accept button hover
await acceptStyle.setProperties({
  'background-color': '#1749b1',
  'color': '#fff'
}, { pseudo: 'hover' });

// Accept button pressed/active
await acceptStyle.setProperties({
  'background-color': '#11306e',
  'color': '#fff'
}, { pseudo: 'active' });

const declineStyle = await webflow.createStyle('declineButton');
await declineStyle.setProperties({
  'background-color': '#f3f4f6',
  'color': '#222'
});

// Decline button hover
await declineStyle.setProperties({
  'background-color': '#e5e7eb',
  'color': '#111827'
}, { pseudo: 'hover' });

// Decline button pressed/active
await declineStyle.setProperties({
  'background-color': '#d1d5db',
  'color': '#111827'
}, { pseudo: 'active' });

const buttonRowStyle = await webflow.createStyle('buttonRow');
await buttonRowStyle.setProperties({
  'display': 'flex',
  'column-gap': '0.75rem',
  'margin-top': '0.5rem'
});

const contentDivStyle = await webflow.createStyle('contentDiv');
await contentDivStyle.setProperties({
  'display': 'flex',
  'flex-direction': 'column',
  'column-gap': '0.5rem'
});

const titleStyle = await webflow.createStyle('bannerTitle');
await titleStyle.setProperties({
  'font-weight': '600',
  'font-size': '1.1rem'
});

const messageStyle = await webflow.createStyle('bannerMessage');
await messageStyle.setProperties({
  'font-size': '0.98rem',
  'color': '#444'
});

const linkStyle = await webflow.createStyle('learnMoreLink');
await linkStyle.setProperties({
  'color': '#2563eb',
  'text-decoration': 'underline'
});

// 2. Get the parent element (or use body)
const parent = await webflow.getSelectedElement();

// 3. Build the popup wrapper
const popup = webflow.elementBuilder(webflow.elementPresets.DOM);
popup.setTag('div');
popup.setAttribute('id', 'consentPopup');
popup.setStyles([popupStyle]);

// 4. Banner content
const contentDiv = popup.append(webflow.elementPresets.DOM);
contentDiv.setTag('div');
contentDiv.setStyles([contentDivStyle]);

const title = contentDiv.append(webflow.elementPresets.DOM);
title.setTag('span');
title.setTextContent('We use cookies');
title.setStyles([titleStyle]);

const message = contentDiv.append(webflow.elementPresets.DOM);
message.setTag('span');
message.setStyles([messageStyle]);
message.setTextContent('This site uses cookies to analyze traffic and enhance your experience. ');

const learnMore = message.append(webflow.elementPresets.DOM);
learnMore.setTag('a');
learnMore.setAttribute('href', '/privacy-policy');
learnMore.setAttribute('target', '_blank');
learnMore.setAttribute('rel', 'noopener');
learnMore.setStyles([linkStyle]);
learnMore.setTextContent('Learn more');

// 5. Button row
const buttonRow = popup.append(webflow.elementPresets.DOM);
buttonRow.setTag('div');
buttonRow.setStyles([buttonRowStyle]);

// Accept button
const acceptBtn = buttonRow.append(webflow.elementPresets.DOM);
acceptBtn.setTag('button');
acceptBtn.setAttribute('id', 'optIn');
acceptBtn.setAttribute('class', 'consentButton');
acceptBtn.setStyles([buttonStyle, acceptStyle]);
acceptBtn.setTextContent('Accept');

// Decline button
const declineBtn = buttonRow.append(webflow.elementPresets.DOM);
declineBtn.setTag('button');
declineBtn.setAttribute('id', 'optOut');
declineBtn.setAttribute('class', 'consentButton');
declineBtn.setStyles([buttonStyle, declineStyle]);
declineBtn.setTextContent('Decline');

// 6. Add the popup to the page
if (parent?.children) {
  await parent.append(popup);
  console.log('Cookie consent banner created!');
}
```

This example is intended as a starting point and may not fully comply with all privacy laws. Customize and validate your consent management implementation to ensure it aligns with your site’s privacy policy and the legal requirements applicable to your visitors.

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