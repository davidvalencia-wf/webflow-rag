---
source: webflow-developers
category: general
url: https://developers.webflow.com/designer/reference/get-current-app-connection
title: "Get Current App Connection | Webflow Developer Documentation"
published: 2025-11-17
---

## `webflow.getCurrentAppConnection()`

Get the current App Connection identifier, if any.

Use this method on initial load of an App to determine whether the App was launched via an “App Connection” button in the Designer. The App can then choose to show a different experience based on the information received.

### Syntax

```
webflow.getCurrentAppConnection(): Promise<null | string>
```

### Returns

**Promise<`string` \| `null`>**

If the App was launched from an App connection, this method will return a Promise that resolves to the string identifier for the App Connection. Otherwise, it returns a Promise resolving to `null`.

### Example

_This example is for an App written in React. This code would be placed on the index page of the App_

```
React.useEffect(() => {
  async function onLoad() {
    /*
    Await the current App Connection information. If the App was launched via a specific App Connection button, this will return a string with the connection name; otherwise, it returns null.
    */
    const appConnection = await webflow.getCurrentAppConnection();

    /*
    Check if the App Connection matches 'myAwesomeAppManageFormElement'.
    If it does, the App will redirect to the '/editForms' page to provide a tailored experience based on the App Connection.
    */
    if (appConnection === "myAwesomeAppManageFormElement") {
      redirectToPage("/editForms");
    }
  }

  // Call the onLoad function when the component mounts.
  onLoad();
}, []);
```

[Try this example](https://webflow.com/oauth/authorize?response_type=code&client_id=19511de1ec410f9228d8dcbc9420e67916dea80d86d18f0c9a533eb475ea0f62)

### Designer Ability

| Designer Ability | Locale | Branch | Workflow | Sitemode |
| --- | --- | --- | --- | --- |
| **canAccessCanvas** | Any | Any | Any | Any |