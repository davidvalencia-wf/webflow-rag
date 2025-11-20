---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/app-intents-and-connections
title: "App Intents and Connections | Webflow Developer Documentation"
published: 2025-11-17
---

Make your Apps more discoverable in the Designer with App Intents and Connections.

Use App Intents and Connections to give users more opportunities to find and launch your App in the designer. These features display links to your App in contextual locations like the ‘Element Settings’ panel, creating smoother and more relevant interactions when users are creating and editing elements on their sites.

###### App Intents

###### App Connections

App Intents make your App discoverable when users create or modify elements. By adding an Intent to your App’s `webflow.json` file, users will be prompted to use your App for managing element settings directly within their existing workflow. Adding an intent allows your App to stand out as a relevant tool in the Designer.
![App Intents](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/app-intent-image.png)

##### Supported Elements

App Intents and connections currently supports the following elements:
`Image`, `FormForm`, and `FormWrapper`.

## How App Intents and Connections work

###### App Intents

When your App is configured to use App Intents for a supported element, your App will appear in the “Connections” section in an element’s settings panel.

If a user has already installed your App to their site, but aren’t already using connections to manage their elements, they’ll see a “Connections” section in the element settings panel. If they click the ”+” button in this section, they’ll see your App listed in the “Connect an App” section.

![Connect an App](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/app-intents-no-connection-found.png)![App Intents](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/app-intents-connect-an-app.png)

When your App launches from the element settings panel, your App will receive important context about the element that triggered the launch, which you can access using the [`getLaunchContext()`](https://developers.webflow.com/designer/reference/get-launch-context) method.

Use this context to show the most relevant interface for a user’s workflow.

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/api-playground-launch-context.png)

We've configured the API Playground to use App Intents for the Image element. When the API Playground is launched from the Element Settings Panel, the App will show the launch context in an info box and preselect the API Category to 'Elements' and the API Method to `getAltText()` ,

###### App Connections

App Connections establish links between supported elements and your App. Using the [`element.setAppConnection()`](https://developers.webflow.com/designer/reference/set-app-connection) method, you can create a direct connection that prompts users to manage that element’s settings through your App. For example, you can connect an image element to your App so users choose to manage assets and alt text in your App rather than managing the settings themselves.

![App Connections](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/set-app-connection-diagram.png)

When your App creates a connection with an element:

- Webflow adds a button in the element’s settings panel to launch your App
- Webflow opens your App with context about the specific element

Your App knows exactly which element launched it and can instantly show the most relevant interface for a user’s workflow. Instead of dropping users at your App’s home screen, you can welcome them with the tools and settings they need for that specific element; creating a personalized entrance for every connected element.

![App Connection Button](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/app-connections-open.gif)

##### Try App Connections on Your Site

Explore App Connections firsthand. [Download and run our example App](https://github.com/Webflow-Examples/app-connections-tester) on your site to see how it integrates directly into your workflow.

[Test App Connections](https://github.com/Webflow-Examples/app-connections-tester)

## Setting up App Intents and Connections

In the steps below, we’ll walk through the following:

###### 1\. Configuring your App

With the addition of App Intents and Connections, your [`webflow.json`](https://developers.webflow.com/designer/reference/app-settings) can now use two additional properties: `appIntents` and `appConnections`.

### Adding App Intents

In [`webflow.json`](https://developers.webflow.com/designer/reference/app-settings), add a new property called `appIntents`. Create an object with a key for each element type you’d like to support. Each key should have a value of an array of strings, where each string is a unique identifier for an App Intent.

As we improve support for more elements and intents, you’ll be able to add them to your App Intents list.

webflow.json

```
{
    "appIntents": {
        "image": ["manage"],
        "form": ["manage"]
    }
}
```

Once this is added to your `webflow.json`, your App will appear in the “Connections” section of the supported elements’ settings panels.

### Adding App Connections

In [`webflow.json`](https://developers.webflow.com/designer/reference/app-settings), add a new property called `appConnections`. Set it to an array of strings, where each string is a unique identifier for an App Connection.

webflow.json

```
{
  "appConnections": ["manageImageElement", "manageFormElement"]
}
```

###### 2\. Listening for Launch Context from an App Intent

When your App launches from the element settings panel, Webflow will send information about how your App was launched back to your App. To get this information, you’ll need to listen for launch context from the Webflow Designer by calling the [`getLaunchContext()`](https://developers.webflow.com/designer/reference/get-launch-context) method.

When your App is launched from an App Intent, [`getLaunchContext()`](https://developers.webflow.com/designer/reference/get-launch-context) returns an object with the following structure:

```
type LaunchContext = {
    type: 'AppIntent';
    value: {
        image: 'manage'; // Will only be present if the App Intent is for managing images
        form: 'manage'; // Will only be present if the App Intent is for managing forms
    };
};
```

It’s most appropriate to call [`getLaunchContext()`](https://developers.webflow.com/designer/reference/get-launch-context) on the main page of your App, such as the entry point of a React App.

main.

```
// Initialize state to store the launch context
const [launchContext, setLaunchContext] = React.useState(null);

React.useEffect(() => {
    // Define async function to fetch launch context
    async function onLoad() {

        // Get context from Webflow Designer when App is launched
        const context = await webflow.getLaunchContext();
        setLaunchContext(context); // Update state with the received context

        // Determine which page to show based on launch context
        if (context?.type === 'AppIntent') {
            if (context.value?.image === 'manage') {
                navigate('/image-manager');
            } else if (context.value?.form === 'manage') {
                navigate('/form-manager');
            } else {
                navigate('/');
            }
        } else {
            navigate('/');
        }
    }

    // Call onLoad immediately when component mounts
    onLoad();
}, []); // Empty dependency array means this effect runs once on mount
```

###### 3\. Create an App Connection

Now that you’ve retrieved the launch context, you can access the details of the element that launched your App. From there, you can [create an App Connection](https://developers.webflow.com/designer/reference/app-intents-and-connections#setting-up-an-app-connection) to the element so that users are prompted to use your App each time they open that element’s settings panel.

Since an element will always be selected in the Designer when accessing its settings, you can simply call the [`getSelectedElement()`](https://developers.webflow.com/designer/reference/get-selected-element) method to get the element that launched your App. Then you can create an App Connection to the element using the identifier you configured in [`webflow.json`](https://developers.webflow.com/designer/reference/app-settings).

main.

```
// Initialize state to store the launch context and selected element
const [launchContext, setLaunchContext] = React.useState(null);
const [selectedElement, setSelectedElement] = React.useState(null);

React.useEffect(() => {
    // Define async function to fetch launch context and selected element
    async function onLoad() {
        // Get context from Webflow Designer when App is launched
        const context = await webflow.getLaunchContext();
        setLaunchContext(context); // Update state with the received context

        // Get and set the selected element
        const element = await webflow.getSelectedElement();
        setSelectedElement(element);

        // Set the App Connection based on element type and determine which page to show your user
        if (context?.type === 'AppIntent') {
            if (context.value?.image === 'manage') {
                await element.setAppConnection('manageImageElement');
                navigate('/image-manager');
            } else if (context.value?.form === 'manage') {
                await element.setAppConnection('manageFormElement');
                navigate('/form-manager');
            } else {
                navigate('/');
            }
        } else {
            navigate('/');
        }
    }

    // Call onLoad immediately when component mounts
    onLoad();
}, []); // Empty dependency array means this effect runs once on mount
```

###### 4\. Listening for Launch Context from an App Connection

As with App Intents, when your App is launched from an App Connection, Webflow will send information about how your App was launched back to your App. To get this information, you’ll need to listen for launch context from the Webflow Designer by calling the [`getLaunchContext()`](https://developers.webflow.com/designer/reference/get-launch-context) method.

When launched from an App Connection, the LaunchContext object will have the following structure:

```
type LaunchContext = {
    type: 'AppConnection';
    value: string; // The identifier for the App Connection
};
```

Let’s reconfigure our App to listen for launch context from either an App Intent or App Connection.

main.tsx

```
// Initialize state to store the launch context and selected element
const [launchContext, setLaunchContext] = React.useState(null);
const [selectedElement, setSelectedElement] = React.useState(null);

React.useEffect(() => {
    // Define async function to fetch launch context and selected element
    async function onLoad() {
        // Get context from Webflow Designer when App is launched
        const context = await webflow.getLaunchContext();
        setLaunchContext(context); // Update state with the received context

        // Get and set the selected element
        const element = await webflow.getSelectedElement();
        setSelectedElement(element);

        // Handle different launch contexts
        if (context?.type === 'AppIntent') {
            // Handle App Intent launches
            if (context.value?.image === 'manage') {
                await element.setAppConnection('manageImageElement');
                navigate('/image-manager');
            } else if (context.value?.form === 'manage') {
                await element.setAppConnection('manageFormElement');
                navigate('/form-manager');
            } else {
                navigate('/');
            }
        } else if (context?.type === 'AppConnection') {
            // Handle App Connection launches
            switch (context.value) {
                case 'manageImageElement':
                    navigate('/image-manager');
                    break;
                case 'manageFormElement':
                    navigate('/form-manager');
                    break;
                default:
                    navigate('/');
            }
        } else {
            // Handle direct launches (not from Intent or Connection)
            navigate('/');
        }
    }

    // Call onLoad immediately when component mounts
    onLoad();
}, []); // Empty dependency array means this effect runs once on mount
```

###### 5\. Listing App Connections

If your App manages multiple resources, you may want to organize and list them in your App for users to reference. You can retrieve a list of all App Connections for a given element using the [`getAppConnections()`](https://developers.webflow.com/designer/reference/get-app-connections) method on an individual element.

To do this, let’s get a list of all elements on the page and then retrieve the App Connections for each element.

```
async function findConnectedElements() {
    // Get all elements on the page
    const elements = await webflow.getAllElements();
    const connectedElements = [];

    // Iterate through elements and check for connections
    for (const element of elements) {
        try {
            // Check if element supports App Connections
            if (element.getAppConnections) {
                const connections = await element.getAppConnections();

                // If element has connections, store it with relevant info
                if (connections && connections.length > 0) {
                    connectedElements.push({
                        connections,
                        type: element.type,
                        id: element.id
                    });
                }
            }
        } catch (error) {
            console.error(`Error checking connections for element: ${element.id}`, error);
        }
    }

    return connectedElements;
}
```

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