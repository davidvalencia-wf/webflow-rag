---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/getting-started
title: "Getting Started | Webflow Developer Documentation"
published: 2025-11-17
---

In this guide, you’ll learn how to create projects and environments, deploy your app to your Webflow site, and integrate your Webflow design system with your app.

**Time Estimate:** 30 minutes

**Prerequisites:**

- A Webflow account
- A GitHub account
- Node.js 20.0.0 or higher and `npm` installed

## Getting started

### 1\. Install the Webflow CLI

In your terminal, run the following command to use the CLI globally:

```
npm install -g @webflow/webflow-cli
```

You can run the command `webflow --version` to verify that the CLI tool installed successfully.

### 2\. Create a new Webflow site

Create a new Webflow site by cloning the [Astral Fund template.](https://webflow.com/made-in-webflow/website/astralfund-919afdc1091df68b8dc1347f952a) This site is pre-configured with styles, variables, and components optimized for Webflow Cloud and DevLink.

[1](https://developers.webflow.com/webflow-cloud/getting-started#open-the-astral-fund-templatehttpswebflowcommade-in-webflowwebsiteastralfund-919afdc1091df68b8dc1347f952a)

### Open the [Astral Fund template](https://webflow.com/made-in-webflow/website/astralfund-919afdc1091df68b8dc1347f952a)

View the AstralFund template in “Made in Webflow”

[2](https://developers.webflow.com/webflow-cloud/getting-started#clone-the-template)

### Clone the template

Click the “Clone in Webflow” button, then in the next window click “Create site.”

[3](https://developers.webflow.com/webflow-cloud/getting-started#add-site-details)

### Add site details

Give your site a name and determine who should have access to your site. Once you’ve created your site, it will open in Webflow.

[4](https://developers.webflow.com/webflow-cloud/getting-started#review-styles-components-and-variables)

### Review styles, components, and variables

Optionally, review the [styles](https://help.webflow.com/hc/en-us/articles/33961362040723-Style-panel-overview), [variables](https://help.webflow.com/hc/en-us/articles/33961268146323-Variables), and [components](https://help.webflow.com/hc/en-us/articles/33961303934611-Components-overview) included in the site. You will export these to your new app in the following steps.

![Webflow site](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/introduction/assets/astralfund.png)

### 3\. Create a new app

Use the Webflow CLI to create a new Astro or Next.js application. The CLI will generate a project scaffold that’s synced with your Webflow site’s design system through [DevLink.](https://developers.webflow.com/devlink/reference/overview)

![Webflow CLI](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/introduction/assets/webflow-cli.png)

[1](https://developers.webflow.com/webflow-cloud/getting-started#initialize-your-project)

### Initialize your project

In your terminal, run the command

```
webflow cloud init
```

[2](https://developers.webflow.com/webflow-cloud/getting-started#select-your-framework)

### Select your framework

When prompted in the terminal, choose a supported framework to create a starter project (Astro or Next.js)

[3](https://developers.webflow.com/webflow-cloud/getting-started#select-your-mount-path)

### Select your mount path

When prompted in the terminal, enter the path where you plan to mount your app on your Webflow site (for example, /app → mysite.webflow.io/app).

[4](https://developers.webflow.com/webflow-cloud/getting-started#authenticate-with-webflow)

### Authenticate with Webflow

When prompted, authenticate with Webflow and select the site you just created for your Webflow Cloud project.

[5](https://developers.webflow.com/webflow-cloud/getting-started#import-your-webflow-design-system)

### Import your Webflow design system

When prompted in the terminal, select the same Webflow site you used to authenticate. Once selected, the Webflow CLI will import any available styles, variables, and components via DevLink. DevLink will show a success message upon successful export to your app.

[6](https://developers.webflow.com/webflow-cloud/getting-started#publish-your-project-to-a-github-repository)

### Publish your project to a GitHub repository

In your terminal, run the following commands to navigate to your new project, and create a git repository. [**Once created, publish the repository to GitHub.**](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github) You will need to publish your local project to GitHub to create a new Webflow Cloud project as outlined in the next step.

```
    cd your-project-name
    git init
```

### 4\. Create a new Webflow Cloud project

Connect GitHub to Webflow Cloud, create a project, and configure an environment for automated deployments.

![Webflow Cloud project creation](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/introduction/assets/project-setup-05-20.png)

[1](https://developers.webflow.com/webflow-cloud/getting-started#open-webflow-cloud)

### Open Webflow Cloud

In Webflow, navigate to your site’s settings and select “Webflow Cloud” from the sidebar.

[2](https://developers.webflow.com/webflow-cloud/getting-started#authenticate-with-github)

### Authenticate with Github

Click the “Login to GitHub” button to connect your GitHub account. Then click the “Install GitHub” button. Follow the instructions to enable Webflow Cloud to access your GitHub repositories.

[3](https://developers.webflow.com/webflow-cloud/getting-started#create-a-new-webflow-cloud-project)

### Create a new Webflow Cloud project

Click “Create New Project”

[4](https://developers.webflow.com/webflow-cloud/getting-started#add-project-details)

### Add project details

- Choose a **name** for your Webflow Cloud project.
- Provide the URL of your newly created **GitHub repository.**
- Optionally, enter a **description** and **directory** path for your app.
- Click **“Create project”** to save your project.

[5](https://developers.webflow.com/webflow-cloud/getting-started#create-a-new-environment)

### Create a new Environment

![Webflow Cloud environment creation](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/introduction/assets/github-setup.png)

- Choose a **branch** to deploy your project from.
- Choose a **mount path** for your project (for example, /admin → mysite.webflow.io/admin).
- Click **“Create environment”** to save a new environment for the project.

[6](https://developers.webflow.com/webflow-cloud/getting-started#publish-your-webflow-site)

### Publish your Webflow Site

To make your new project and environment live, you’ll need to publish your Webflow site. Click the “Publish” button in the top right corner of your Webflow Dashboard.

##### You won't see your app yet!

We need to build and deploy your Astro or Next.js before you see your project on your mount path. Follow the steps below to deploy your project.

### 5\. Add your Webflow design system to your Webflow Cloud app

Add Webflow components to your app by importing them from the DevLink folder, which contains assets synced from your Webflow design system.

Your scaffolded app already includes your global styles, and the [DevLinkProvider](https://developers.webflow.com/devlink/docs/component-export/whats-exported#devlinkprovider) to manage Webflow interactions in your project’s layout files.

###### Astro

###### Next.js

[1](https://developers.webflow.com/webflow-cloud/getting-started#install-dependencies-and-run-your-project-locally)

### Install dependencies and run your project locally

Run the following commands in your terminal:

```
npm install
npm run dev
```

Currently, Webflow Cloud only supports using the `npm` package manager

[2](https://developers.webflow.com/webflow-cloud/getting-started#add-webflow-components-to-your-astro-project)

### Add Webflow components to your Astro project

In the `pages` directory, update `index.astro` to include the `Navbar` and `Footer` components from the `/devlink` folder in the root of your project. Import the components, and include them within the page structure.

index.astro

```
  ---
  import Layout from '../layouts/Layout.astro';
  import { Section, Container, Block, Link } from '../../devlink/_Builtin/Basic';
  import { Navbar } from '../../devlink/Navbar'; // Import the Navbar component
  import { Footer } from '../../devlink/Footer'; // Import the Footer component
  ---

  <Layout>
  {/* Add Navbar with props. Be sure to include the client load directive */}
    <Navbar
        navbarLinkFeatures="Hello"
        navbarLinkProducts="Webflow"
        navbarLinkResources="Cloud"
        navbarLinkContact=""
    client:load />
    <Section
      client:load
      tag="section"
      className="margin-bottom-24px"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container>
        <Block
          tag="div"
          className="hero-split"
          style={{
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          <h1 class="margin-bottom-24px">Welcome to Webflow Cloud</h1>
          <p class="margin-bottom-24px">This is a simple test using Basic components with enhanced styling.</p>
          <div>
            <Link
              button={true}
              options={{
                href: "#"
              }}
              className="button-primary"
            >
              Get Started
            </Link>
          </div>
        </Block>
      </Container>
    </Section>
    <Footer client:load /> {/* Add Footer with Client load directive */}
  </Layout>

  <style>
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(83.21deg, #3245ff 0%, #bc52ee 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  </style>
```

Add the `client:load` directive to each component, to indicate Astro should load this component on the page.

[3](https://developers.webflow.com/webflow-cloud/getting-started#test-your-changes-in-a-local-preview-environment)

### Test your changes in a local preview environment

In your terminal, run the following command to start your project in a local preview environment that mimics your Webflow Cloud environment:

```
npm run preview
```

### 6\. Deploy your project to Webflow Cloud

[1](https://developers.webflow.com/webflow-cloud/getting-started#deploy-using-the-webflow-cli)

### Deploy using the Webflow CLI

In your terminal, run the following command to deploy your project to Webflow Cloud:

```
webflow cloud deploy
```

Additionally, when you commit your changes to your GitHub branch, Webflow Cloud will automatically detect the changes and deploy your project to your environment. Learn more on [deployments in the documentation.](https://developers.webflow.com/webflow-cloud/deployments)

##### Your deployment may take up to 2 minutes to complete

Your deployment may take up to 2 minutes to complete. You can view the status of your deployment in your [Environment Details](https://developers.webflow.com/webflow-cloud/deployments#deployment-history) dashboard, and see details of your build and deployment in the [build logs.](https://developers.webflow.com/webflow-cloud/deployments#build-logs)

[2](https://developers.webflow.com/webflow-cloud/getting-started#view-your-app-at-your-sites-url--mount-path)

### View your app at your site's URL + mount path

Once your app has been successfully deployed, navigate to your site’s domain and mount path to see your newly deployed Webflow Cloud app!

**🎉Congratulations! 🎉**

You’ve successfully created and deployed a Webflow Cloud project that is seamlessly integrated with your Webflow design system. Pat yourself on the back!

## Next steps

Now that you’ve successfully created and deployed a Webflow Cloud project, here’s what you can do next.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Apps.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Apps.svg)\\
\\
Bring your app to Webflow Cloud\\
\\
Learn about project configuration options to work seamlessly with Webflow Cloud, and add advanced functionality to your new project.](https://developers.webflow.com/webflow-cloud/bring-your-own-app) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/Optimize.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/Optimize.svg)\\
\\
Optimize your workflow\\
\\
Learn how to manage environments for different stages of development](https://developers.webflow.com/webflow-cloud/environments) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CloudUpload.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CloudUpload.svg)\\
\\
Manage deployments\\
\\
Explore deployment options and Webflow Cloud’s CI/CD integration with GitHub to streamline your release process](https://developers.webflow.com/webflow-cloud/deployments) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CMS.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CMS.svg)\\
\\
Add a SQLite database to your app\\
\\
Add a SQLite database to your app to store and retrieve user data.](https://developers.webflow.com/webflow-cloud/add-sqlite)

## Troubleshooting

###### I'm seeing a 404 error when I try to access my app

After creating a new environment, you’ll need to publish your Webflow site to make your environment live.

###### A deployment doesn't start when I push to my Github repo

The [Webflow Cloud GitHub App](https://github.com/apps/webflow-cloud/installations/select_target) may not have access to your repository. To check, go to the `Webflow Cloud` tab in your Webflow site settings and click “Install GitHub App.” Follow the prompts on GitHub to make sure Webflow has access to read from your repository. Once you grant access, try committing to the branch that Webflow Cloud should be monitoring for deployments in your app.

###### I can't see assets in my app

If you’re referencing assets in your project, you’ll need to reference the mount path of your project (`/app` → `mysite.webflow.io/app`) to serve them correctly.

[See more on referencing assets →](https://developers.webflow.com/webflow-cloud/bring-your-own-app#manage-assets-and-apis)

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