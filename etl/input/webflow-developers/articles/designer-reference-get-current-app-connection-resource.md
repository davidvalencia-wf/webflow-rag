---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-current-app-connection-resource
title: "Get Current App Connection Element | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getCurrentAppConnectionResource()`

Get the element that triggered the App Connection.

Use the `webflow.getCurrentAppConnection()` method to verify the App Launch location. If the App was launched from the element settings panel, you can use this method to get information on the resource this App was initiated by.

### Syntax

```
getCurrentAppConnectionResource(): Promise<null | AppConnectionResource>
```

### Returns

**Promise<AppConnectionResource \| `null`>**

A Promise that resolves to the AppConnectionResource of for the App. If there is not a resource associated with the App, then the Promise resolves to \`null1.

### Example

This example is for an App written in React. This code would be placed on the `editForms` page of the App

```
React.useEffect(() => {
  async function onLoad() {
    // Await the App Connection to determine where the App was launched from.
    // If the App was launched from an Element with the App Connection 'myAwesomeAppManageFormElement', proceed with additional actions.
    const appConnection = await webflow.getCurrentAppConnection();

    if (appConnection === "myAwesomeAppManageFormElement") {
      // Retrieve resource details about the element associated with this App Connection.
      // The resource provides information on the specific element initiating the App launch.
      const resource = await webflow.getCurrentAppConnectionResource();

      // Check if the resource exists and is of type 'Element'.
      // This ensures that the App can act specifically on an element within the Designer.
      if (resource && resource.type === "Element") {
        const element = resource.value;

        // As an example, set a custom attribute on the element.
        // Here, you can call any appropriate API method to interact with the element, depending on your App's functionality.
        await element.setCustomAttribute("foo", "bar");
      }
    }
  }

  // Execute the onLoad function upon component mount to check the App launch location and take action accordingly.
  onLoad();
}, []);
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |