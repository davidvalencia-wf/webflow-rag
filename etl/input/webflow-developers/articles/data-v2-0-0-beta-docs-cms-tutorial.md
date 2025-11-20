---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/v2.0.0-beta/docs/cms-tutorial
title: "Working with the CMS | Webflow Developer Documentation"
published: 2025-11-17
---

## What you’ll build

This guide will walk you through using a Data Client app to interact with Webflow’s CMS APIs. A Data Client enables you to make calls to Webflow’s backend APIs, and through this guide, you’ll learn how use the API to:

1. Create collections and fields
2. Create, read, update, and delete items
3. Publish and unpublish collection items

To make visualizing your Collections and Items easier, you’ll also build a simple frontend using React.

## Prerequisites

- A Webflow site. If you’re not sure where to start, clone the [Astral Fund site](https://webflow.com/made-in-webflow/website/astralfund-919afdc1091df68b8dc1347f952a?searchValue=astral) with defined CMS collections.
- A registered [Webflow App](https://developers.webflow.com/data/docs/register-an-app) or a [Site Token](https://university.webflow.com/lesson/intro-to-webflow-apis?topics=cms-dynamic-content#how-to-create-an-api-token) with the following scopes: `sites:read`, `cms:read`, and `cms:write`
- An [Ngrok account](http://ngrok.com/) and an authentication token
- [Node.js](https://nodejs.org/en) and an IDE of your choice
- Additionally, you should have basic knowledge of Node.js and Express

###### 1\. Quickstart

Reference the [starter code](https://github.com/Webflow-Examples/cms-examples) for to follow along with the guide. This code already takes care of the OAuth Handshake and initializes the Webflow Client as shown in the [Authentication guide.](https://developers.webflow.com/data/reference/authorization) You’ll be able to start this App, authenticate the App, and start making requests to the Webflow CMS API.

1. **Clone the starter code.**

Run the following commands in your IDE to clone the [example repository](https://github.com/Webflow-Examples/cms-examples) and install dependencies:

Shell

```
git clone https://github.com/Webflow-Examples/cms-examples.git
cd cms-examples
npm install
```

2. **Add Environment Variables**

Add your credentials to the `.env` file. If you’re using an App, input your App’s `CLIENT_ID` and `CLIENT_SECRET`. If using a Site Token, input the token as `SITE_TOKEN`.

3. **Add Ngrok Auth Token**

Ngrok is required because Webflow Apps must run on `https://` URLs, and Ngrok provides a secure tunnel for your local server.

Get your Ngrok auth token from the [Ngrok dashboard](https://dashboard.ngrok.com/tunnels/authtokens). Then, add your token to your environment variables in `.env`:

Shell

```
NGROK_AUTH_TOKEN=your-ngrok-auth-token
```

4. **Start the Server**

Start the server by running `npm start` in your terminal.

This will output list of URLs in the terminal to access your server and your frontend.

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/ngrok-table.png)

5. **Update your Redirect URI in Webflow**

Copy the redirect URI from your terminal output. Navigate to your App in the Webflow Dashboard Settings and update the Redirect URI to the URL of your server.

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/update-redirect-uri.png)

6. **Authenticate the App**

Open the URL of your server in the browser. You’ll be prompted to authenticate the App with Webflow. You have the option to authenticate a single site or all sites on a single workspace.

7. **Start making requests**

Once authenticated, you’ll be redirected to the App frontend where you can select an authorized site and start making requests to the Webflow CMS API.

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/cms-example-app.png)

###### 2\. Shaping requests

The backend is built using Express and Node.js, and designed to handle requests from the frontend.

When a request the server receives a request, it’s first passed to the middleware function defined in `webflowClientMiddleware.js`. This function initializes and authenticates the Webflow Client and attaches it to the request object, so you don’t have to re-authenticate in each request. This client is then used in the controllers to make requests to the Webflow CMS API.

In the controller files, **requests are prefixed with `req.`** followed by the standard Webflow SDK methods. For example, to interact with collections you would use `req.webflow.collections.items.listItems()`.

webflowClientMiddleware.js

```
import { WebflowClient } from "webflow-api";
import { getToken } from "./auth/tokens.js";

// Middleware function to initialize the Webflow client and attach it to the request object
const webflowClientMiddleware = async (req, res, next) => {
try {
  // Retrieve the access token for the user using Auth Logic defined in our auth guide (https://developers.webflow.com/data/reference/authorization)
  const accessToken = await getToken("user");
  if (!accessToken) {
    // If the access token is not found, log an error and send a 401 Unauthorized response
    console.log("Access token not found for user");
    return res.status(401).send("Access token not found");
  }

  // Initialize the Webflow client with the retrieved access token
  req.webflow = new WebflowClient({ accessToken });
  // Proceed to the next middleware or route handler
  next();
} catch (error) {
  // Log any errors that occur during initialization and send a 500 Internal Server Error response
  console.error("Error initializing Webflow client:", error);
  res.status(500).send("Failed to initialize Webflow client");
}
};

// Export the middleware function for use in other parts of the application
export default webflowClientMiddleware;
```

###### 3\. Creating collections and fields

Now that you’ve handled setting up authorized requests, take a look at how the app makes requests to interact with collections and fields. All of the logic for interacting with the Webflow CMS API is located in the `Controllers` folder.

`collectionsController.js` has defined five methods for interacting with collections. Review each method in detail:

Asset API Tutorial \| Webflow API

collectionController.js

``

// List Collections

export const listCollections = async (req, res) => {

try {

    const data = await req.webflow.collections.list(req.params.siteId);

    res.json(data.collections); // Respond with collection data

} catch (error) {

    console.error("Error fetching collections:", error);

    res.status(500).send("Failed to fetch collections");

}

};

// Get Collection Details

export const getCollection = async (req, res) => {

try {

    const data = await req.webflow.collections.get(req.params.collectionId);

    res.json(data); // Respond with collection details

} catch (error) {

    console.error("Error fetching collection details:", error);

    res.status(500).send("Failed to fetch collection");

}

};

// Helper function to create multiple fields for a given collection

async function createFields(collectionId, fields) {

// Create each field in parallel and return the results

return Promise.all(

    fields.map((field) => {

      return req.webflow.collections.fields

        .create(collectionId, field)

        .then((response) => ({

          success: true,

          field: field.name,

          id: response.id,

        }))

        .catch((error) => ({

          success: false,

          field: field.name,

          error: error.message,

        }));

    })

);

}

// Create a preset collection and corresponding fields

export const createCollectionWithFields = async (req, res) => {

const siteId = req.params.siteId;

const { name, singularName, slug, fields } = req.body.collection;

// Define details of the new collection

const collectionDetails = {

    displayName: name,

    singularName: singularName,

    slug: slug,

};

try {

    // Create the collection in Webflow

    const collection = await req.webflow.collections.create(

      siteId,

      collectionDetails

    );

    console.log(`Created Collection: ${collection.id} successfully`);

    // Create fields for the new collection

    const fieldCreationResults = await createFields(collection.id, fields);

    console.log("All fields creation attempted.");

    // Filter results to separate successful and failed field creations

    const successfulFields = fieldCreationResults.filter(

      (result) => result.success

    );

    const failedFields = fieldCreationResults.filter(

      (result) => !result.success

    );

    // Respond with detailed information about the operation

    res.status(201).send({

      message: "Collection and fields processed.",

      collectionId: collection._id,

      successfulFields: successfulFields,

      failedFields: failedFields,

    });

} catch (error) {

    console.error("Failed to create collection or fields:", error);

    res.status(500).send({

      message: "Failed to create collection or fields",

      error: error.message,

    });

}

};

// Delete Collection

export const deleteCollection = async (req, res) => {

try {

    const data = await req.webflow.collections.deleteCollection(

      req.params.collectionId

    );

    res.json(data); // Respond with data

} catch (error) {

    console.error("Error deleting collection:", error);

    res.status(500).send("Failed to delete collection");

}

};

``

### List collections

Our first method, `listCollections`, is used to fetch and return the list of collections for an authorized site using the [list collections endpoint](https://developers.webflow.com/data/reference/cms/collections/list). It expects a `siteId` as a URL parameter, which our frontend should send in the request. If successful, it will respond with a JSON object containing the list of collections.

### Get collection details

Get collection details will get the details of a single collection using the [get collection endpoint](https://developers.webflow.com/data/reference/cms/collections/get). It expects a `collectionId` as a URL parameter, which our frontend should send in the request. If successful, it will respond with a JSON object with additional details about the collection, most importantly the `fields` array which contains the schema, or the fields that belong to the collection.

collectionController.js

``

// List Collections

export const listCollections = async (req, res) => {

try {

    const data = await req.webflow.collections.list(req.params.siteId);

    res.json(data.collections); // Respond with collection data

} catch (error) {

    console.error("Error fetching collections:", error);

    res.status(500).send("Failed to fetch collections");

}

};

// Get Collection Details

export const getCollection = async (req, res) => {

try {

    const data = await req.webflow.collections.get(req.params.collectionId);

    res.json(data); // Respond with collection details

} catch (error) {

    console.error("Error fetching collection details:", error);

    res.status(500).send("Failed to fetch collection");

}

};

// Helper function to create multiple fields for a given collection

async function createFields(collectionId, fields) {

// Create each field in parallel and return the results

return Promise.all(

    fields.map((field) => {

      return req.webflow.collections.fields

        .create(collectionId, field)

        .then((response) => ({

          success: true,

          field: field.name,

          id: response.id,

        }))

        .catch((error) => ({

          success: false,

          field: field.name,

          error: error.message,

        }));

    })

);

}

// Create a preset collection and corresponding fields

export const createCollectionWithFields = async (req, res) => {

const siteId = req.params.siteId;

const { name, singularName, slug, fields } = req.body.collection;

// Define details of the new collection

const collectionDetails = {

    displayName: name,

    singularName: singularName,

    slug: slug,

};

try {

    // Create the collection in Webflow

    const collection = await req.webflow.collections.create(

      siteId,

      collectionDetails

    );

    console.log(`Created Collection: ${collection.id} successfully`);

    // Create fields for the new collection

    const fieldCreationResults = await createFields(collection.id, fields);

    console.log("All fields creation attempted.");

    // Filter results to separate successful and failed field creations

    const successfulFields = fieldCreationResults.filter(

      (result) => result.success

    );

    const failedFields = fieldCreationResults.filter(

      (result) => !result.success

    );

    // Respond with detailed information about the operation

    res.status(201).send({

      message: "Collection and fields processed.",

      collectionId: collection._id,

      successfulFields: successfulFields,

      failedFields: failedFields,

    });

} catch (error) {

    console.error("Failed to create collection or fields:", error);

    res.status(500).send({

      message: "Failed to create collection or fields",

      error: error.message,

    });

}

};

// Delete Collection

export const deleteCollection = async (req, res) => {

try {

    const data = await req.webflow.collections.deleteCollection(

      req.params.collectionId

    );

    res.json(data); // Respond with data

} catch (error) {

    console.error("Error deleting collection:", error);

    res.status(500).send("Failed to delete collection");

}

};

``

### Create fields

collectionController.js

``

// List Collections

export const listCollections = async (req, res) => {

try {

    const data = await req.webflow.collections.list(req.params.siteId);

    res.json(data.collections); // Respond with collection data

} catch (error) {

    console.error("Error fetching collections:", error);

    res.status(500).send("Failed to fetch collections");

}

};

// Get Collection Details

export const getCollection = async (req, res) => {

try {

    const data = await req.webflow.collections.get(req.params.collectionId);

    res.json(data); // Respond with collection details

} catch (error) {

    console.error("Error fetching collection details:", error);

    res.status(500).send("Failed to fetch collection");

}

};

// Helper function to create multiple fields for a given collection

async function createFields(collectionId, fields) {

// Create each field in parallel and return the results

return Promise.all(

    fields.map((field) => {

      return req.webflow.collections.fields

        .create(collectionId, field)

        .then((response) => ({

          success: true,

          field: field.name,

          id: response.id,

        }))

        .catch((error) => ({

          success: false,

          field: field.name,

          error: error.message,

        }));

    })

);

}

// Create a preset collection and corresponding fields

export const createCollectionWithFields = async (req, res) => {

const siteId = req.params.siteId;

const { name, singularName, slug, fields } = req.body.collection;

// Define details of the new collection

const collectionDetails = {

    displayName: name,

    singularName: singularName,

    slug: slug,

};

try {

    // Create the collection in Webflow

    const collection = await req.webflow.collections.create(

      siteId,

      collectionDetails

    );

    console.log(`Created Collection: ${collection.id} successfully`);

    // Create fields for the new collection

    const fieldCreationResults = await createFields(collection.id, fields);

    console.log("All fields creation attempted.");

    // Filter results to separate successful and failed field creations

    const successfulFields = fieldCreationResults.filter(

      (result) => result.success

    );

    const failedFields = fieldCreationResults.filter(

      (result) => !result.success

    );

    // Respond with detailed information about the operation

    res.status(201).send({

      message: "Collection and fields processed.",

      collectionId: collection._id,

      successfulFields: successfulFields,

      failedFields: failedFields,

    });

} catch (error) {

    console.error("Failed to create collection or fields:", error);

    res.status(500).send({

      message: "Failed to create collection or fields",

      error: error.message,

    });

}

};

// Delete Collection

export const deleteCollection = async (req, res) => {

try {

    const data = await req.webflow.collections.deleteCollection(

      req.params.collectionId

    );

    res.json(data); // Respond with data

} catch (error) {

    console.error("Error deleting collection:", error);

    res.status(500).send("Failed to delete collection");

}

};

``

This is a helper function that creates multiple fields for a given collection using the [create fields endpoint](https://developers.webflow.com/v2.0.0/data/reference/cms/collection-fields/create). In our frontend we've created a list of preset collections in `CollectionPresets.js`. Each preset has a `collection` object that contains the collection details, as well as a list of fields that each have their own `name`, `type`, and other properties.

This helper function expects a `collectionId` and a list of fields, and will create each field for the given collection. So we must first create the collection, and then use the `collectionId` to create the fields.

### Create a collection with fields

This is the main function that creates a collection and the corresponding fields. It expects a `siteId`, as well as a `collection` object that contains the collection details and a list of fields from a selected preset from `CollectionPresets.js`.

It will first create the collection using the [create collection endpoint](https://developers.webflow.com/v2.0.0/data/reference/cms/collections/create), then use the helper function `createFields` to create multiple fields. Finally, it will respond with the results of each successful field creation.

collectionController.js

``

// List Collections

export const listCollections = async (req, res) => {

try {

    const data = await req.webflow.collections.list(req.params.siteId);

    res.json(data.collections); // Respond with collection data

} catch (error) {

    console.error("Error fetching collections:", error);

    res.status(500).send("Failed to fetch collections");

}

};

// Get Collection Details

export const getCollection = async (req, res) => {

try {

    const data = await req.webflow.collections.get(req.params.collectionId);

    res.json(data); // Respond with collection details

} catch (error) {

    console.error("Error fetching collection details:", error);

    res.status(500).send("Failed to fetch collection");

}

};

// Helper function to create multiple fields for a given collection

async function createFields(collectionId, fields) {

// Create each field in parallel and return the results

return Promise.all(

    fields.map((field) => {

      return req.webflow.collections.fields

        .create(collectionId, field)

        .then((response) => ({

          success: true,

          field: field.name,

          id: response.id,

        }))

        .catch((error) => ({

          success: false,

          field: field.name,

          error: error.message,

        }));

    })

);

}

// Create a preset collection and corresponding fields

export const createCollectionWithFields = async (req, res) => {

const siteId = req.params.siteId;

const { name, singularName, slug, fields } = req.body.collection;

// Define details of the new collection

const collectionDetails = {

    displayName: name,

    singularName: singularName,

    slug: slug,

};

try {

    // Create the collection in Webflow

    const collection = await req.webflow.collections.create(

      siteId,

      collectionDetails

    );

    console.log(`Created Collection: ${collection.id} successfully`);

    // Create fields for the new collection

    const fieldCreationResults = await createFields(collection.id, fields);

    console.log("All fields creation attempted.");

    // Filter results to separate successful and failed field creations

    const successfulFields = fieldCreationResults.filter(

      (result) => result.success

    );

    const failedFields = fieldCreationResults.filter(

      (result) => !result.success

    );

    // Respond with detailed information about the operation

    res.status(201).send({

      message: "Collection and fields processed.",

      collectionId: collection._id,

      successfulFields: successfulFields,

      failedFields: failedFields,

    });

} catch (error) {

    console.error("Failed to create collection or fields:", error);

    res.status(500).send({

      message: "Failed to create collection or fields",

      error: error.message,

    });

}

};

// Delete Collection

export const deleteCollection = async (req, res) => {

try {

    const data = await req.webflow.collections.deleteCollection(

      req.params.collectionId

    );

    res.json(data); // Respond with data

} catch (error) {

    console.error("Error deleting collection:", error);

    res.status(500).send("Failed to delete collection");

}

};

``

### Delete a collection

This function deletes a collection using the [delete collection endpoint](https://developers.webflow.com/v2.0.0/data/reference/cms/collections/delete). It expects a `collectionId` as a URL parameter, which our frontend should send in the request. The delete endpoint does not return any data, so we will just respond with a status of 200.

collectionController.js

``

// List Collections

export const listCollections = async (req, res) => {

try {

    const data = await req.webflow.collections.list(req.params.siteId);

    res.json(data.collections); // Respond with collection data

} catch (error) {

    console.error("Error fetching collections:", error);

    res.status(500).send("Failed to fetch collections");

}

};

// Get Collection Details

export const getCollection = async (req, res) => {

try {

    const data = await req.webflow.collections.get(req.params.collectionId);

    res.json(data); // Respond with collection details

} catch (error) {

    console.error("Error fetching collection details:", error);

    res.status(500).send("Failed to fetch collection");

}

};

// Helper function to create multiple fields for a given collection

async function createFields(collectionId, fields) {

// Create each field in parallel and return the results

return Promise.all(

    fields.map((field) => {

      return req.webflow.collections.fields

        .create(collectionId, field)

        .then((response) => ({

          success: true,

          field: field.name,

          id: response.id,

        }))

        .catch((error) => ({

          success: false,

          field: field.name,

          error: error.message,

        }));

    })

);

}

// Create a preset collection and corresponding fields

export const createCollectionWithFields = async (req, res) => {

const siteId = req.params.siteId;

const { name, singularName, slug, fields } = req.body.collection;

// Define details of the new collection

const collectionDetails = {

    displayName: name,

    singularName: singularName,

    slug: slug,

};

try {

    // Create the collection in Webflow

    const collection = await req.webflow.collections.create(

      siteId,

      collectionDetails

    );

    console.log(`Created Collection: ${collection.id} successfully`);

    // Create fields for the new collection

    const fieldCreationResults = await createFields(collection.id, fields);

    console.log("All fields creation attempted.");

    // Filter results to separate successful and failed field creations

    const successfulFields = fieldCreationResults.filter(

      (result) => result.success

    );

    const failedFields = fieldCreationResults.filter(

      (result) => !result.success

    );

    // Respond with detailed information about the operation

    res.status(201).send({

      message: "Collection and fields processed.",

      collectionId: collection._id,

      successfulFields: successfulFields,

      failedFields: failedFields,

    });

} catch (error) {

    console.error("Failed to create collection or fields:", error);

    res.status(500).send({

      message: "Failed to create collection or fields",

      error: error.message,

    });

}

};

// Delete Collection

export const deleteCollection = async (req, res) => {

try {

    const data = await req.webflow.collections.deleteCollection(

      req.params.collectionId

    );

    res.json(data); // Respond with data

} catch (error) {

    console.error("Error deleting collection:", error);

    res.status(500).send("Failed to delete collection");

}

};

``

###### 4\. Creating collection items

With our collections set up, we can start creating items within them. In `itemsController.js`, we’ve defined methods for creating, reading, updating, and deleting items.

Asset API Tutorial \| Webflow API

itemsController.js

`// List collection items

export const listItems = async (req, res) => {

try {

    const data = await req.webflow.collections.items.listItems(

      req.params.collectionId

    );

    res.json(data.items);

} catch (error) {

    console.error("Error fetching collection items:", error);

    res.status(500).send("Failed to fetch collection items");

}

};

// Create collection Item

export const createItem = async (req, res) => {

try {

    const data = await req.webflow.collections.items.createItem(

      req.params.collectionId,

      req.body

    );

    res.json(data);

} catch (error) {

    console.error("Error creating collection item:", error);

    res.status(500).send("Failed to create collection item");

}

};

// Delete Collection Item

export const deleteItem = async (req, res) => {

try {

    const data = await req.webflow.collections.items.deleteItem(

      req.params.collectionId,

      req.params.itemId

    );

    res.status(200).send("Item deleted successfully");

} catch (error) {

    console.error("Error deleting item:", error);

    res.status(500).send("Failed to delete item");

}

};

`

### List collection items

This function returns a list of items for a collection using the [list items endpoint](https://developers.webflow.com/v2.0.0/data/reference/cms/collection-items/staged-items/get-item). It expects a `collectionId` as a URL parameter, which our frontend should send in the request.

Webflow offers query parameters to filter and sort the items returned. Including `name`, `slug`, and `lastPublished`. These filters are useful for narrowing down the list of items returned.

#### Pagination

For larger collections, you can also paginate through the items using the `offset` parameters returned in the response. For example, if you have 1000 items in a collection, your first request may return the pagination object `{"limit": 100, "offset": 0, total: 1000}`.

To get the next set of 100 items, your second request should add a value of 1 to the `offset` value from the previous response in our example our new offset would be `1`. Loop this process until you have retrieved all items.

### Create collection item

itemsController.js

`// List collection items

export const listItems = async (req, res) => {

try {

    const data = await req.webflow.collections.items.listItems(

      req.params.collectionId

    );

    res.json(data.items);

} catch (error) {

    console.error("Error fetching collection items:", error);

    res.status(500).send("Failed to fetch collection items");

}

};

// Create collection Item

export const createItem = async (req, res) => {

try {

    const data = await req.webflow.collections.items.createItem(

      req.params.collectionId,

      req.body

    );

    res.json(data);

} catch (error) {

    console.error("Error creating collection item:", error);

    res.status(500).send("Failed to create collection item");

}

};

// Delete Collection Item

export const deleteItem = async (req, res) => {

try {

    const data = await req.webflow.collections.items.deleteItem(

      req.params.collectionId,

      req.params.itemId

    );

    res.status(200).send("Item deleted successfully");

} catch (error) {

    console.error("Error deleting item:", error);

    res.status(500).send("Failed to delete item");

}

};

`

This function creates a new item in a collection using the [create item endpoint](https://developers.webflow.com/v2.0.0/data/reference/cms/collection-items/staged-items/create-item). It also expects a `collectionId` as a URL parameter, as a `body` payload for the item that includes details like:

- `isDraft`: Indicates whether the item is a draft or should be published upon site publish. This defaults to `true`.
- `isArchived`: Indicates whether the item is archived. This defaults to `false`.
- `fieldData`: An object containing the field values for the item with required fields for `name` and `slug`. You can add additional fields and values as needed based on the collection schema.

On success, this function returns the new item object with the `id` and other details.

#### Create multiple items

The [create item endpoint](https://developers.webflow.com/v2.0.0/data/reference/cms/collection-items/staged-items/create-item) supports creating multiple items at once by sending
an array named `items` in the payload. Each item in the array should include the same fields as a single item payload.

If your site uses localization, you can create items in multiple locales via the [create bulk items endpoint](https://developers.webflow.com/v2.0.0/data/reference/cms/collection-items/bulk-items/create-items), which requires a `collection_id` as a path parameter.

### Delete collection item

itemsController.js

`// List collection items

export const listItems = async (req, res) => {

try {

    const data = await req.webflow.collections.items.listItems(

      req.params.collectionId

    );

    res.json(data.items);

} catch (error) {

    console.error("Error fetching collection items:", error);

    res.status(500).send("Failed to fetch collection items");

}

};

// Create collection Item

export const createItem = async (req, res) => {

try {

    const data = await req.webflow.collections.items.createItem(

      req.params.collectionId,

      req.body

    );

    res.json(data);

} catch (error) {

    console.error("Error creating collection item:", error);

    res.status(500).send("Failed to create collection item");

}

};

// Delete Collection Item

export const deleteItem = async (req, res) => {

try {

    const data = await req.webflow.collections.items.deleteItem(

      req.params.collectionId,

      req.params.itemId

    );

    res.status(200).send("Item deleted successfully");

} catch (error) {

    console.error("Error deleting item:", error);

    res.status(500).send("Failed to delete item");

}

};

`

This function deletes an item in a collection using the [delete item endpoint](https://developers.webflow.com/data/reference/cms/collection-items/bulk-items/delete-items). It expects a `collectionId` and `itemId` as URL parameters, which our frontend should send in the request.

Since this endpoint returns a 204 status code on success, we can just return a success message to the frontend.

###### 5\. Publishing items

Lastly, we’ll take a look at how we can publish and unpublish items using the Webflow CMS API.

### Publishing items

- **A full site publish**: When you publish your entire site, any collection items with `isDraft` set to `false` will be published. You can publish the site through Webflow or using the [publish site endpoint](https://developers.webflow.com/data/reference/sites/publish).
- **Single-item publish**: You can publish an item immediately, without publishing the full site, using the [publish item endpoint](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/publish-item). Even if an item is set to `isDraft: true`, it will be published when using this endpoint.
- **Live Item Creation**: The CMS API offers two options for item creation, creating a [staged item](https://developers.webflow.com/data/reference/cms/collection-items/staged-items/create-item) or a [live item](https://developers.webflow.com/data/reference/cms/collection-items/live-items/create-item-live). Creating a staged item will set the `isDraft` property to `true`, while creating a live item will set it to `false` and immediately publish the item upon creation. This endpoint is useful for immediately publishing items from an external CMS or other data sources.

### Unpublishing items

Webflow also allows you to **unpublish** collection items by using the [unpublish item endpoint](https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-item-live). This will remove the item from the live site, and set the `isDraft` property to `true`.

##### Updated publishing behavior

Starting December 2024, Webflow is introducing an improved publishing workflow for collection items. When a live item’s `isDraft` property is set to `true`, it will continue to remain published on the live site even after a full site publish. This allows users to make updates to the collection item in a draft state without changing what is visible on the live site.

To remove an item from the live site, you must now explicitly call the [unpublish endpoint](https://developers.webflow.com/data/reference/cms/collection-items/live-items/delete-item-live). This change gives developers more precise control over the publishing state of individual items.

###### Publishing 'Status' in Webflow

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/assets/images/webflow-statuses.png)

The Webflow UI shows a status for each collection item. This status is derived from the `isDraft` and `lastPublished` properties of the item. See the table below for more details of which status is shown based on these properties.

| lastPublished | isDraft | Derived status |
| --- | --- | --- |
| `null` | `false` | Queued to publish |
| exists | `false` | Queued to publish |
| `null` | `true` | Draft |
| exists | `true` | Draft changes |

## Conclusion

Congratulations! You’ve successfully navigated through the process of setting up and using the Webflow API with a fully functional backend and frontend application. Here’s a quick recap of what you’ve accomplished:

1. **Webflow Client and Backend Configuration:** You configured the WebflowClient, set up middleware, and created routes and controllers for managing collections and items.
2. **Working with Collections:** You learned how to create, retrieve, and delete collections, including handling different field types.
3. **Working with Items:** You explored how to create, retrieve, update, and delete items within a collection, managing various item states and field types.
4. **Publishing and Unpublishing:** You learned how to publish and unpublish items, and how the `isDraft` property affects the publishing state of items.

## Next Steps

- **Extend Functionality:** Enhance your application by adding new endpoints - try updating an item - or incorporating additional data processing logic.
- **Explore Localization:** Managing content localization is a crucial part of working with the Webflow CMS. Check out our [localization guide](https://developers.webflow.com/data/docs/working-with-localization) for more details on how to localize your content effectively.