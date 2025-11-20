---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/deployments
title: "Deployments | Webflow Developer Documentation"
published: 2025-11-17
---

Deployments automatically build and publish your application to Webflow Cloud. Each deployment creates a new version of your app in the associated environment. Webflow Cloud automatically triggers deployments when you push changes to the branch linked to that environment.

Publishing your Webflow site won’t trigger a Webflow Cloud deployment. The deployment process for Webflow Cloud apps is decoupled from the Webflow site publishing process.

[Learn more about environments →](https://developers.webflow.com/webflow-cloud/environments)

* * *

See the below documentation for guidance on:

- [Continuous deployment](https://developers.webflow.com/webflow-cloud/deployments#continuous-deployment)
- [Deployment process](https://developers.webflow.com/webflow-cloud/deployments#deployment-process)
- [Deployment history](https://developers.webflow.com/webflow-cloud/deployments#deployment-history)
- [Build logs](https://developers.webflow.com/webflow-cloud/deployments#build-logs)
- [Runtime logs](https://developers.webflow.com/webflow-cloud/deployments#runtime-logs)
- [Rolling back deployments](https://developers.webflow.com/webflow-cloud/deployments#rolling-back-deployments)

* * *

## Continuous deployment

Webflow Cloud supports continuous integration and deployment (CI/CD) through GitHub. When you connect your GitHub repository, Webflow Cloud automatically:

- Watches for changes in your connected branches
- Triggers new deployments when changes are detected
- Updates your environments with the latest code

##### Deploying using the Webflow CLI

You can also manually deploy your local environment using the Webflow CLI. In your terminal, run the following command to deploy your project to Webflow Cloud:

```
webflow cloud deploy
```

### Setting up continuous deployment with GitHub

1. Navigate to Webflow Cloud and select your project
2. Click “Connect GitHub”
3. Follow the instructions to connect your GitHub repository or multiple repositories
4. Select a GitHub repository to connect your Webflow Cloud app to
5. Create or select an [environment](https://developers.webflow.com/webflow-cloud/environments) to deploy to
6. Choose the branch you want to deploy to the selected environment

If you have access to over 100 repositories, you may not see a list of your repositories to select from. To create a project from a repository, paste the link to your repository into the GitHub repository field.

## Manual deployments

There are two ways to manually deploy your environment:

1. **Deploy using the Webflow CLI**

Run the following command in your terminal:

```
webflow cloud deploy
```

2. **Deploy in the Webflow Cloud dashboard**

Navigate to your environments dashboard and click the “Deploy latest build” button.

## Deployment process

Webflow Cloud serves your app through a streamlined deployment process:

1. Clones your GitHub repository
2. Detects your app’s framework
3. Installs dependencies
4. Builds your application
5. Deploys to your specified environment

Each step is logged and available for review in the [build logs.](https://developers.webflow.com/webflow-cloud/deployments#build-logs)

## Deployment history

![Deployment history](https://prod.ferndocs.com/_next/image?url=https%3A%2F%2Ffiles.buildwithfern.com%2Fhttps%3A%2F%2Fwebflow.docs.buildwithfern.com%2F2025-11-12T14%3A56%3A23.206Z%2Fproducts%2Fwebflow-cloud%2Fpages%2Fintroduction%2Fassets%2Fdeployment-dashboard-05-20.png&w=3840&q=75)

Each deployment appears in your environment’s deployment history. The history provides:

- Deployment status (building, deploying, success, cancelled,failure)
- Deployment date and time
- Build and deployment duration
- Build and runtime logs

**In the event of a failed deployment, your environment continues running your last successful deployment**, ensuring zero downtime.

## Build logs

Build logs provide detailed information about how Webflow Cloud builds and deploys your app. To view build logs:

1. In Webflow Cloud, click your project name to open the Environments Dashboard
2. Click the environment name to open the Deployment Dashboard
3. Click the Deployment ID (Commit SHA) to view the build log for that deployment

Build logs are particularly helpful for:

- Debugging failed deployments
- Optimizing build performance
- Understanding dependency installation issues
- Tracking build progress

## Runtime logs

![Runtime logs](https://prod.ferndocs.com/_next/image?url=https%3A%2F%2Ffiles.buildwithfern.com%2Fhttps%3A%2F%2Fwebflow.docs.buildwithfern.com%2F2025-11-12T14%3A56%3A23.206Z%2Fproducts%2Fwebflow-cloud%2Fpages%2Fintroduction%2Fassets%2Fruntime-logs.png&w=3840&q=75)

Runtime logs show you what’s happening on your application’s server after deployment. These logs capture server-side activity, including:

- Server-side function execution
- Application errors and exceptions
- Server-side console logs and debugging output

For example, if your application includes an API endpoint and a user makes a request to that endpoint, you’ll see the corresponding server-side activity in the runtime logs.

To view runtime logs:

1. In Webflow Cloud, click your project name to open the Environments Dashboard
2. Click the environment name to open the Deployment Dashboard
3. Select the “Runtime Logs” tab

Runtime logs are helpful for debugging server-side issues and monitoring your application’s API behavior in production.

## Rolling back deployments

If you need to revert to a previous version of your app:

1. Navigate to your GitHub repository
2. Revert your working branch to the desired commit
3. Push the changes to trigger a new deployment

Rolling back a deployment creates a new deployment with the previous code version. It doesn’t restore the exact state of the previous deployment.

## Deployment locations

# Frequently asked questions

### Build issues

###### Why is Webflow Cloud not identifying my project at build?

Webflow Cloud currently supports Next.js and Astro projects. Make sure:

- Your project is using one of these frameworks
- You have included a configuration file (`next.config.js` or `astro.config.mjs`) with the necessary Webflow Cloud-specific configurations.

###### Why aren't my environment variables used at build?

Environment variables are only available at runtime, not during the build process.

###### Why are my assets not showing up?

This is typically related to base path configuration. Check your asset paths and ensure they’re configured for your environment. For more information on base path configuration, see [base path configuration](https://developers.webflow.com/webflow-cloud/bring-your-own-app#3-manage-assets-and-apis) section of the Bring Your Own App documentation.

###### Which build runs on my production site if I had a successful build followed by a failed build?

The most recent successful build will continue running. Failed deployments never impact your live site.

### Deployment issues

###### How do I rollback to a previous deployment?

To rollback to a previous deployment:

1. Revert your branch to the desired commit in GitHub
2. Push the changes to trigger a new deployment with the previous version

###### Why can't I see my latest deployment in my dashboard?

Try refreshing your page - new deployments may not appear immediately in the dashboard.

###### Can I preview specific deployments?

No, only the most recent successful deployment for each environment can be previewed.

###### Can I share deployment previews?

Preview access is limited to the most recent successful deployment for each environment.

###### Why doesn't a deployment start when I push to my Github repo?

The [Webflow Cloud GitHub App](https://github.com/apps/webflow-cloud/installations/select_target) may not have access to your repository. To check, go to the `Webflow Cloud` tab in your Webflow site settings and click “Install GitHub App.” Follow the prompts on GitHub to ensure Webflow has access to read from your repository. Once you grant access, try committing to the branch that Webflow Cloud should be monitoring for deployments in your app.

### Publishing issues

###### Will my Webflow Cloud app deployment automatically publish my Webflow site, and vice versa?

No, the deployment process for Webflow Cloud apps is separate from the Webflow site publishing process. Publishing your Webflow site will also not trigger a Webflow Cloud deployment.

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

![](https://bat.bing.com/action/0?ti=187060700&tm=gtm002&Ver=2&mid=b9f18b2e-d460-44b4-9e8a-d8733039748d&bo=1&sid=fe5ee8f0c40811f0aaf8b7b9eb680300&vid=fe5f33a0c40811f09e1abd87b0cc4db2&vids=1&msclkid=N&uach=pv%3D10.0&pi=918639831&lg=en-US&sw=1280&sh=720&sc=24&tl=Deployments%20%7C%20Webflow%20Developer%20Documentation&p=https%3A%2F%2Fdevelopers.webflow.com%2Fwebflow-cloud%2Fdeployments&r=&lt=203&evt=pageLoad&sv=2&cdb=ARoR&rn=999202)