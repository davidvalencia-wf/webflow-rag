---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/apps/docs/marketplace-guidelines
title: "Marketplace Guidelines | Webflow Developer Documentation"
published: 2025-11-17
---

Please note that these guidelines are subject to change. If you have any questions or concerns about our review process, please contact us at [developers@webflow.com](mailto:developers@webflow.com).

Before an App can be listed in the [Webflow Marketplace](https://webflow.com/apps), it must go through our thorough review process.

## Guidelines

The guidelines outlined below will be used by our review team to evaluate your submission.

### Safety / Legal

Ensuring the safety and security of our users and their projects is our utmost priority when it comes to Webflow Apps.

1. **Malicious, Damaging, or Objectionable Content:**
1. We do not allow Apps that intend to harm or compromise the security of our users or their projects.
2. Content that is offensive, insensitive, or intended to disgust is strictly prohibited.
3. Ensure that your App fully adheres to our [Acceptable Use](https://webflow.com/legal/aup) policy.
2. **Intellectual Property:**
1. Ensure that your App only uses content for which you have the necessary rights, licenses, or permissions.
2. Do not infringe upon the intellectual property rights of others, including trademarks, copyrights, or patents.
3. **Compliance:**
1. Comply with all applicable laws, regulations, and legal requirements in the jurisdictions where your Marketplace App is available.
2. Do not engage in any illegal activities or promote content that is prohibited or restricted by law.
3. You may want to consult legal counsel if you have additional questions.
4. **Privacy and Data Protection:**
1. It is imperative that your App respects user privacy and handles personal data in accordance with relevant privacy laws and regulations. Apps that infringe on individuals’ privacy rights or misuse their data in any way will be removed from the marketplace.
2. Provide clear and transparent information to users about the collection, storage, and use of their data within your Marketplace App.
3. Implement appropriate security measures to protect user data from unauthorized access or breaches.

### Performance / Technical

All Webflow Apps must adhere to the following guidelines:

1. Performance:
1. Optimize your App for efficient resource usage to provide a smooth and responsive experience to users.
2. Avoid long-running background processes or tasks that may impact the overall performance of your App.
3. Regularly monitor and address any performance issues or bottlenecks to maintain a high-quality user experience.
4. Apps that have persistent performance issues may be subject to removal from the Marketplace.
2. Technical
1. Apps should only utilize official Webflow APIs and should not require users to install separate packages that manipulate Webflow.
2. Ensure that your App’s source code is well-organized and adheres to industry standards and conventions. It should be easily readable, maintainable, and free from unnecessary complexity.

Additionally, Apps built using Designer APIs must adhere to the following additional guidelines:

1. Technical
1. Strive for clarity and consistency in your codebase, utilizing meaningful variable and function names, proper indentation, and appropriate comments where necessary.
2. Do not use statements or patterns that could introduce vulnerabilities in your App (e.g. `eval()` statements, direct DOM manipulation, excessive use of global variables, etc.).
3. Avoid using externally hosted iframes for anything beyond authentication.

### Design / Usability

Webflow users gravitate towards products that are easy to use, polished, and designed with intentionality. The guidelines below represent the minimum expectations for a Webflow App, however, we strongly encourage you to design your App in a way that users find useful.

All Marketplace Apps must adhere to the following guidelines:

1. **Consistency:**
1. Ensure that your App’s design and user interface are consistent throughout, providing a cohesive and familiar experience.
2. **Usability:**
1. Provide comprehensive and user-friendly documentation or help resources to assist users in understanding and utilizing your App effectively. We recommend utilizing a Webflow site as your platform for hosting support docs.
2. Ensure that end users are provided with a fully functional experience that is free of placeholder content and test data.
3. **Accessibility**:
1. Design your App with accessibility in mind, ensuring that it can be used by individuals with disabilities or different abilities.
2. Follow [best practices for accessibility](https://www.w3.org/WAI/standards-guidelines/wcag/), such as providing alternative text for images, supporting keyboard navigation, and maintaining sufficient color contrast.
4. **User Feedback and Testing:**
1. Gather user feedback and conduct usability testing to identify areas for improvement and refine your App’s design.
2. Incorporate user suggestions and address reported usability issues in a timely manner to enhance the overall user experience.
3. Apps that are error prone, not actively maintained, or those that present users with persistent usability issues will be removed from the marketplace.

Additionally, Apps built using Designer APIs must adhere to the following additional guidelines:

1. **Consistency:**
1. Align the visual style, typography, and color palette of your App with our [App design guidelines](https://developers.webflow.com/apps/designer/docs/design-guidelines) to create a seamless integration.
2. Maintain consistency with established Designer patterns and affordances. For example:
      - Use component icons only to represent components
      - Follow existing interaction patterns that users are familiar with
      - Avoid creating new UI patterns that could confuse users or conflict with Designer functionality
2. **Usability**
1. Design your App with a user-centric approach, considering intuitive navigation, clear labeling, and logical flow.
2. Ensure that your App’s interface is visually appealing, consistent, and accessible to a wide range of users.
3. Minimize user input requirements and strive for simplicity in App interactions.
4. Avoid implementing intrusive or disruptive features that may negatively impact the usability or overall user experience.
5. Do not use keyboard shortcuts to invoke your app or any functionality within it.

### Business / Branding

1. **Monetization:**
1. Provide clear and transparent information regarding any fees, subscriptions, or in-App purchases associated with your Webflow App.
2. Avoid deceptive or misleading practices related to monetization, such as hidden charges or misleading pricing information.
2. **Advertising:**
1. Do not display ads to users to help maintain a focused and distraction-free experience.
3. **Branding:**
1. Avoid unauthorized use of trademarks, logos, or copyrighted materials belonging to others.
2. Clearly indicate any affiliations, partnerships, or endorsements in a truthful and transparent manner.
3. Impersonating a company as an App author will result in rejection. Please provide accurate, reliable contact information for user inquiries, support issues, or feedback.
4. **One Developer Account Policy**
1. Developers listing apps in the Webflow App Marketplace are limited to using only one developer account for active marketplace listings. Submitting and/or listing apps using multiple developer accounts is strictly prohibited.
2. Any developer found violating the one-account-per-developer policy, including attempts to circumvent app listing restrictions or marketplace rules, may face immediate enforcement actions. We encourage all developers to uphold integrity and transparency within our developer community.

## Submitting your App

### **Submission Prep**

To expedite your App’s review, please make sure you have completed the following:

1. **Test. Test. Test!** Thoroughly test your App to identify and resolve any crashes or bugs.
2. **Grant Webflow Access to your App:** If your Webflow App includes account-based features or requires specific resources, you’ll need to provide us with full access. This can be achieved by offering an active demo account, fully-featured demo mode, or granting access to any necessary resources (e.g., login credentials, sample QR code) required for reviewing your App thoroughly.
3. **Enable live backend services:** Ensure that any backend services or APIs utilized by your App are enabled and accessible during the review process. This will allow our reviewers to evaluate the functionality and integration of your marketplace App effectively.
4. **Offer detailed explanations of non-obvious features and in-App purchases:** Include detailed explanations of any non-obvious features or in-app purchases within the review notes & demo video you submit alongside your submission. Clearly articulate the purpose, functionality, and value of these elements to provide a comprehensive understanding for the reviewers. Additionally, include any supporting documentation if necessary.

By following these steps and providing the necessary information and access, you can ensure a smoother review process for your Webflow App.

### **How to submit**

All prospective Apps must be submitted through our Webflow [App submission form](https://developers.webflow.com/submit). To expedite the approval process, please provide all requested details about your App.

Before submitting, you’ll need to prepare the following items:

1. **App Avatar Image:** Fits neatly into a 512x512 square; 1:1 aspect ratio. Browse the Marketplace for examples.
2. **App Detailed Description:** Avoid vagueness. Clearly explain your app’s function and its benefits to users.
3. **App Screenshots:** Provide 3-5 images (1280x846) that highlight the App features with clear visuals.
4. **Demo Video:** If your App uses a Data Client, include a demo video demonstrating a working OAuth flow for users approving and denying the request. This video should also describe in detail your deep integration with Webflow. You may provide a private link to Loom, YouTube, or Google Drive.
5. **Upload your Source Code (If Applicable):** Apps that utilize the Designer Extension capability must upload client-side source code through the App version manager within the Webflow Designer. The review process for these Apps will commence once both components – form submission and App source code – are received.

### **After submitting**

Our goal is to provide a prompt decision, ideally within 10-15 business days. You will be notified of our decision via the email associated with your Webflow account.

If your App submission is rejected, we will send you an email with a brief explanation. You will have the opportunity to address any feedback and resubmit your App for review.

Important: Any attempts to exploit the Marketplace App APIs or review process, such as providing false information, engaging in plagiarism, deceitful manipulation of user files, or data theft, will result in immediate removal. Additionally, you will be banned from publishing future Apps in our community.

We look forward to reviewing what you’ve developed! For more context, please reference our [Developer Terms of Service](https://webflow.com/legal/developer-terms-of-service).

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