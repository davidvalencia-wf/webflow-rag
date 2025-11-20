---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/environments
title: "Environments | Webflow Developer Documentation"
published: 2025-11-17
---

Environments are unique, isolated containers where your app is deployed. Deploy your app to multiple environments—such as production, staging, or development—using branches from your GitHub repository. Each environment is fully separate, giving you the flexibility to test, preview, and release features independently.

Environments automatically update when a deployment succeeds, with zero-downtime between versions. If a deployment fails, the environment continues serving your last successful deployment, ensuring continuous availability.

[Learn more about deployments →](https://developers.webflow.com/webflow-cloud/deployments)

* * *

See the below documentation for guidance on:

- [Creating environments](https://developers.webflow.com/webflow-cloud/environments#creating-environments)
- [Managing environments](https://developers.webflow.com/webflow-cloud/environments#managing-environments)
- [Creating environment variables](https://developers.webflow.com/webflow-cloud/environments#create-an-environment-variable)
- [Managing environment variables](https://developers.webflow.com/webflow-cloud/environments#managing-environment-variables)

* * *

# Managing environments

![Environment dashboard](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/introduction/assets/environment-dashboard-05-20.png)

## Creating environments

When you create a Webflow Cloud project, you’ll be prompted to add your first environment. You can create additional environments (like staging and development) to support your development workflow.

**To set up additional environments:**

- In Webflow Cloud, select your project name to open the Environments Dashboard.
- Click “Create New Environment.”
- Select the GitHub branch you want this environment to track.
- Define the mount path (URL path) for your environment.
- Click Create Environment.

Every push to the selected branch will trigger a deployment to this environment.

## Mount paths

Each environment is assigned a unique URL path under your Webflow domain. When you deploy to an environment, your application becomes accessible at its designated path. This path-based routing allows you to:

- Host multiple environments under a single domain
- Maintain separate URLs for staging, development, and production versions
- Seamlessly integrate with Webflow’s existing routing system

Mount paths are unique to each environment and are used to route traffic to the correct environment. Each mount path must be unique across all environments within a project.

## Changing mount paths

If you’ve already deployed an environment to your site with a mount path and you want to change it, you should:

- Click the ellipsis icon “…” for the environment
- Select “Edit”
- Change the mount path to your desired new path and save the changes
- **Publish your Webflow site**
- Trigger a deployment to the environment to propagate the mount path change

## Route conflicts

If a route conflict occurs between your Webflow Cloud application and your Webflow site, the Webflow Cloud application route takes precedence.

For instance, if you have a Webflow site at `mydomain.com` with the following:

1. A Webflow Cloud app mounted at `/users`
2. A Webflow page also created at `/users`

When a user visits `mydomain.com/users`, they will see the Webflow Cloud app, not the static page on your Webflow site.

To avoid conflicts:

- Choose mount paths that don’t conflict with existing or planned Webflow pages
- Consider using distinct paths like `/app` for your Webflow Cloud applications
- Document your app routes to prevent future conflicts when creating new Webflow pages

## Edit an environment

- Click the ellipsis icon “…” next to the environment.
- Select Edit.
- Modify the mount path or other details.
- Save your changes.
- **Re-publish** your site to reflect updates.

## Unpublish an environment

To remove the environment from your domain entirely, you must delete the Webflow Cloud project **and** republish the Webflow site.

**Deleting the environment by itself doesn’t remove it from your domain.**

## Delete an environment

Delete an environment to remove it from Webflow Cloud。 Deleting an environment doesn’t delete the GitHub branch. Conversely, deleting a GitHub branch doesn’t delete the environment - you must delete the environment manually from the dashboard.

- Click the ellipsis icon “…” next to the environment.
- Select Delete.
- Confirm the deletion.

To remove the environment from your domain entirely, you must delete the Webflow Cloud project **and** republish the Webflow site.

If you delete a GitHub branch, the associated environment won’t automatically be deleted. You must remove it manually from the dashboard.

Deleting an environment permanently removes all deployments associated with it.

## Access control and permissions

Anyone with access to your deployed mount path can view the environment. For example, if deployed to /staging, anyone with the URL can access the staging version of your site.

# Managing environment variables

Environment variables enable secure storage and management of sensitive data and configuration settings. Each environment supports up to 110 environment variables, which are accessible exclusively during runtime. For enhanced security, you can mark variables as secrets, which are then encrypted and masked in the Environment Variables dashboard. To view the value of a secret variable, click the eye icon to toggle its visibility.

## Create an environment variable

- Open the Deployments Dashboard for the environment.
- Click Environment Variables.
- Click Add Variable.
- Enter a Key and Value.
- (Optional) Mark as a Secret to mask sensitive values like API keys or client secrets.
- Push a commit to trigger a new deployment using the updated variables.

##### Environment variables are available at runtime only

Environment variables aren’t available at build time—only during runtime. If your app requires build-time configuration, consider alternative strategies.

## Edit an environment variable

- In the Environment Variables dashboard, click the “…” next to a variable.
- Select Edit.
- Modify the Key and Value.
- (Optional) Mark as a Secret to mask sensitive values like API keys or client secrets.
- Make changes to your code and push a new commit to apply the updated environment variables.

## Delete an environment variable

- In the Environment Variables dashboard, click the “…” next to a variable.
- Select Delete.
- Make changes to your code and push a new commit to apply the removal of this environment variable.

## Visibility of environment variables

Anyone with access to the Webflow Cloud project can view environment variables. Keep sensitive values stored as Secrets.

# Frequently asked questions

## Projects

###### I'm having trouble connecting to GitHub

Follow these steps to connect your GitHub repository:

1. Ensure you have admin access to the repository
2. Check that you’ve granted the necessary permissions to Webflow Cloud
3. Try disconnecting and reconnecting the GitHub integration

###### Why don't I see a list of my GitHub repositories?

If you have access to over 100 repositories, you may not see a list of your repositories. To create a project from a repository, paste the link to your repository into the GitHub repository field.

###### Can I use BitBucket or GitLab to deploy to Webflow Cloud?

No, currently only GitHub is supported for deployments to Webflow Cloud.

###### Can I load my Webflow site data into my app?

Yes, you can access your Webflow site data using our [APIs and SDKs](https://developers.webflow.com/data/reference/rest-introduction).

###### How do I deploy an API/backend to Webflow Cloud without a frontend?

Today, Webflow Cloud doesn’t support pure API/backend frameworks, though we plan to in the future. Currently only Next.js and Astro are supported - both of which are designed for full stack development (frontend and backend).

However, you can still use any of these full-stack frameworks to build an API without needing to add page/frontend files.

## Environment access and visibility

###### Who can see my environments?

Any user with access to your Webflow site can view your projects and environments.

###### Who can see my environment variables?

Any user with access to your Webflow site can view your projects and environments.

###### What happens if my path route conflicts with my Webflow site's structure?

When a route conflict occurs between your Webflow Cloud application and your Webflow site, the Webflow Cloud app route takes precedence. The system will first check for matching routes in your Webflow site pages, and if found, serve the Webflow Cloud page instead of your Webflow site page.

###### Can I see environment variables on previous deployments?

No, environment variables are only available for the current deployment.

###### How do I unpublish my environment from my Webflow site?

To unpublish an environment from your domain, you must delete the Webflow Cloud project **and** republish the Webflow site.

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