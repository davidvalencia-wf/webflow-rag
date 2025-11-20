## Structuring your seats

As you start inviting users, there are two key things to keep in mind:

- How many seats you have
- What
*type*of seat tiers you’ve purchased — this impacts which roles you can assign.

There are three seat types:

For Admin, Site Manager, Designer, or any custom role based on the Designer role

For Marketer, content editor, or custom roles based on the Marketer and content editor roles

- Reviewer role (and custom roles based on the Reviewer role)
- Guest role — for external collaborators (e.g., agencies) — read more
[here](https://webflow.com/webflow-way/collaboration/working-with-clients)

For Enterprise workspaces, your Webflow account team can provide guidance on how to add more seats. On other workspace plans, you can add seats individually as needed.

### Example setup

You’re the Web Team Lead at an enterprise company managing a large-scale Webflow workspace. You’ll be assigned the Admin role, which is included as one full seat in your workspace plan.

#### Full seats

Your team includes three experienced Designers (creating pages, components, and design systems), one Junior Designer (learning and supporting builds with scoped permissions), a Developer (adding custom code and managing integrations), and a Security/IT Admin (handling SSO, SCIM, and audit logs).

To support these roles and plan for growth, you purchase 10 full seats.

#### Limited seats

You’re also bringing on two Marketers (running A/B tests and building landing pages using pre-built components) and two content editors (writing and updating CMS and static content).

To support these roles and plan for growth, you purchase 10 limited seats.

#### Free seats

You expect occasional feedback from stakeholders like Legal, the Director of Marketing, and the Brand Manager. You’ll assign these users to three free Reviewer seats.

Let's go deeper into how to decide which roles in Webflow are the best fit for the different members of your team.

Person

What they need to do

Seat Type

Webflow role

**Web Team lead **


**Other** **Job Titles:** Design Lead, Senior Manager of Web, IT Admin, Security Admin, Software Lead, Growth Marketing Team Lead

- Own and manage the company’s Webflow account
- Set up team access and roles
- Manage seats, billing, and account-level settings

Full seat

Admin

**Security/IT admin**


**Other Job Titles:** IT Engineer, SecOps, Security Engineer

- Ensure workspace compliance and security
- Configure and monitor access controls and permissions
- Manage audit logs and integrations with security tools (IdP, SIEM)

Full seat

Admin

**Web designer**


**Other Job Titles: **Brand Designer, Web Developer

- Create beautiful sites and design systems with Webflow’s full design capabilities

Full seat

Designer

**Developer**


**Other Job Titles: **Web Engineer, Software Engineer, Site Developer

- Integrate Webflow with external systems and APIs
- Add custom code and advanced interactions
- Use Webflow Cloud to deploy fullstack apps
- Ensuring performance and technical standards

Full seat

Designer

**Growth Marketers**


**Other Job Titles**: Demand Generation Specialist, Performance Marketer, Event Marketer, Product Marketer

- Create and optimize landing pages in Build mode
- Launch A/B tests
- Execute campaigns
- Analyze effectiveness of pages/campaigns/etc.
- Launch products

Limited seat

Marketer

**Content editor**


**Other Job Titles**: Content Marketer, Copywriter, Content Strategist, Translator, Legal

- Create or update content on the website — text, images, etc.
- Often responsible for updating dynamic content in specific CMS Collections

Limited seat

Content editor

**Reviewers**


**Other Job Titles:**

CMO, Brand Manager, Product Manager, CEO, Legal, HR, Client Services

- Preview the site to review how it looks and performs as it should
- Leave feedback on the website with comments

Free seat

Reviewer

## Custom roles

If you’re a Webflow Enterprise customer, you can also create tailor-made roles to fit your team’s needs. You start with a base role (like Designer or content editor) and toggle configurable permissions on or off based on what a person actually needs to do. There are hundreds of combinations possible (more details [here](https://help.webflow.com/hc/en-us/articles/37207901526419-Create-and-manage-custom-roles#replaced-by-custom-roles)), but here are a few of the most common custom roles that we’ve seen Webflow customers creating:

Custom role name

Target persona

Base role and permissions

Junior Designer

For more risk-averse teams that want to restrict the Junior Designers’ ability to edit the design system and publishing abilities.

Designer base role with no access to site settings, design system settings, and no ability to publish to production (staging only)

Limited content editor

For more risk-averse teams that want to restrict their content editors to just drafting content updates, with no publishing permissions in the CMS.

Content editor base role but cannot publish site nor CMS items

Marketer (requires approval)

For more risk-averse teams that want changes made by marketers to be approved before going live.

Marketer base role with “can make changes without approval” unchecked

## Access controls

### Defining where users can work in Webflow

#### Site specific access

By default, sites are restricted — only workspace owners and admins and explicitly invited users can access them. As an admin, you can choose to change this setting per site to allow anyone in the workspace to access it. Or you can change the default setting that determines if all newly-created sites are open or restricted by default.

*Note: This feature is only available on Growth, Agency, Freelancer, and Enterprise workspaces. It is not available on Starter or Core.*

**Recommendations for when to use restricted vs. open site access**

If...

Then...

You’re a small team of designers working on all sites in the workspace

You can set access to all sites as **open** to everyone in the workspace

You are a team with a mix of different user types and/or stricter access needs

Keep sites **restricted** and grant access per user (e.g., when you have different team members working on a marketing site vs. a community site)

You’re an agency with many designers working on separate projects

Keep sites **restricted** to limit each designer’s access to their assigned site project only

You’re inviting a freelancer to your workspace to work on a specific site

Keep sites **restricted** to ensure the freelancers’ access is just to the site they should work on

You’re an agency inviting a client to review progress on their site in your workspace

Keep sites **restricted** so clients only sees their site, not others in the workspace

In short: restricted site access is recommended for most use cases.

And if you ever start with open access, no worries. As an admin, you can always bulk reset all sites to “restricted” in your Workspace settings.

### CMS Collection access control

By default, when a user has access to a site, they can edit all CMS Collections within that site. But in many cases, you may want to limit their editing capabilities to specific collections. For example:

Need

Setup

A product marketer should only be able to add new product releases on their site

Assign the content editor role → Restrict their edit access to just the Product Updates CMS Collection

A marketer should only be able to add blog content on their site

Assign the Marketer role → Restrict their edit access to just the Blog CMS Collection

A pricing and packaging team member should only be able to update the pricing information on their site

Assign the content editor role → Restrict their edit access to just the Pricing CMS Collection

In the site access settings you can manage what collections individual users have access to.

## Next up: Designing as a team

Designing in Webflow is seamless and efficient for teams of all sizes.

## More ways to level up

- Help Center
Find solutions to your Webflow questions and get help from our expert customer support team.

Go to docs - Community
Connect with other designers and developers to share tips, ask questions, and show off your work.

Go to forum

**Webflow**Way
