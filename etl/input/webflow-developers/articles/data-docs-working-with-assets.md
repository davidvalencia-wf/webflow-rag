---
source: webflow-developers
category: general
url: https://developers.webflow.com/data/docs/working-with-assets
title: "Working with Assets | Webflow Developer Documentation"
published: 2025-11-17
---

Webflow’s asset APIs enable apps to upload and manage a site’s assets. Learn more about assets in Webflow in the [support documentation.](https://help.webflow.com/hc/en-us/articles/33961269934227-Assets-panel#supported-file-types)

These APIs enable developers to create integrations that sync with external file management systems like [Digital Asset Managers (DAMs)](https://www.bynder.com/en/what-is-digital-asset-management/). Keeping these systems in sync ensures that site designers and content managers have the assets they need when working in Webflow.

##### Important

Files you upload to the assets panel aren’t restricted — that is, they’re
publicly available and discoverable, but won’t necessarily be discovered or
indexed by search engines if the file isn’t on a publicly viewable webpage
or linked elsewhere. [Learn more about asset privacy in Webflow.](https://help.webflow.com/hc/en-us/articles/33961281837843)

## FAQs

###### Which file types are supported?

###### Images

###### Documents

###### Lottie

- PNG
- JPEG and JPG
- GIF
- SVG
- WebP
- AVIF

###### Are there size limits for assets?

Yes, uploaded assets must adhere to specific size limitations:

- Images must not exceed 4MB
- Documents are capped at 10MB

###### Why do I need to include a file hash for asset uploads?

When uploading a file, Webflow requires an [MD5 hash](https://en.wikipedia.org/wiki/MD5) generated from the contents of the file to ensure data integrity and manage duplicate assets.

### What is a cryptographic hash?

> A cryptographic hash, also often referred to as a “digest”, “fingerprint” or “signature”, is an almost perfectly unique string of characters that is generated from a separate piece of input text. — [boot.dev](https://blog.boot.dev/cryptography/how-sha-2-works-step-by-step-sha-256/)

A cryptographic hash is the result of a hashing algorithm, which deterministically converts input data into an output of fixed length, regardless of input size.

### What are cryptographic hashes used for?

Hashes serve a range of purposes, from verifying data integrity and enabling fast lookups in databases, to efficiently identifying duplicates.
Let’s break down what that looks like when uploading a file to Webflow and including an [MD5 hash](https://www.okta.com/identity-101/md5/):

[1](https://developers.webflow.com/data/docs/working-with-assets#generate-the-file-hash)

### Generate the file hash

Before uploading, use the MD5 hashing algorithm to convert the binary contents of your file into a 128-bit hash. This hash will serve as the `fileHash` value.

[2](https://developers.webflow.com/data/docs/working-with-assets#provide-the-hash-on-upload)

### Provide the hash on upload

When creating a new asset in Webflow, include this generated `fileHash` with a request to the [Create Asset Metadata](https://developers.webflow.com/data/reference/assets/assets/create) endpoint.

[3](https://developers.webflow.com/data/docs/working-with-assets#webflow-uses-the-hash-for-de-duplication)

### Webflow uses the hash for de-duplication

Webflow uses the `fileHash` as a unique identifier to prevent duplicate uploads. If a hash matches an existing file’s hash, Webflow avoids redundant storage, optimizing resources.

[4](https://developers.webflow.com/data/docs/working-with-assets#lookup-and-verification)

### Lookup and verification

Webflow may use the `fileHash` as a lookup key to retrieve or verify file data, ensuring consistency across operations.

## What you’ll build

In this tutorial, you’ll build an example script that:

- Creates asset folders on a site
- Uploads a new image to an Webflow with a [MD5 hash](https://developers.webflow.com/data/docs/working-with-assets#cryptographic-hashing)
- Organizes the image within a site’s asset folders

## Prerequisites

- A Webflow site in your development Workspace
- A Webflow App or site token with the following scopes: `assets:read`, `assets:write`
- Some knowledge of Node.js or Python

Asset API Tutorial \| Webflow API

Node.jsPython

## Set up your development environment

### 1\. Create a new Node.js project

First, set up the basic Node.js environment for your project. Start by creating a new directory and initializing a Node.js project:

`$ mkdir webflow-asset-uploader

$ cd webflow-asset-uploader

$ npm init -y

`

This will create a new directory called `webflow-asset-uploader` and set up a `package.json` file, which will manage the project's dependencies and configurations.

### 2\. Create a new `.env` file

Next, create a `.env` file to securely store environment variables like your API token. These values are crucial for authenticating requests to the Webflow API.

Open the `.env` file in your editor and add the following variables:

Replace `YOUR_WEBFLOW_API_TOKEN` and `YOUR_SITE_ID` with your Webflow credentials.

### 3\. Install necessary packages

To build this asset upload script, you'll need several Node.js packages. Use npm to install these dependencies.

`$ npm install dotenv webflow-api axios form-data crypto
`

- **dotenv**: Loads environment variables from your `.env` file.
- **webflow-api**: The official Webflow API client for interacting with Webflow resources.
- **axios**: A promise-based HTTP client for making requests to external APIs.
- **form-data**: Helps you create form data for uploading files.
- **crypto**: A built-in Node.js module for generating hashes, which will help verify file integrity during uploads.

Once installed, these packages will enable you to interact with the Webflow API and upload assets to your projects.

### 4\. Create `assets.js`

Next, create a JavaScript file named `assets.js`—this is where we’ll build out the code to handle asset uploads to Webflow.

`$ touch assets.js
`

### 5\. Import packages

Open the `assets.js` file in your editor and import the packages you installed.

These imports will give you access to the tools you need for interacting with the Webflow API, making HTTP requests, and working with form data.

### 6\. Initialize the Webflow client

Initialize the Webflow client using the API token from your `.env` file.

The Webflow client will allow you to interact with Webflow's resources, such as creating asset folders and uploading assets.

### 7\. Define asset folders and files

For this example, we'll define a set of folders and assets to upload. In practice, you might be pulling these from another location or database, but for this guide, we'll use a hardcoded list.

## Create asset folders

Now that we have defined our folders and assets, the next step is to create asset folders on the Webflow site.

### 1\. Create function `createAssetFolder()`

This function, `createAssetFolder()`, takes the site ID and folder name as arguments.

### 2\. Check for existing asset folders

Webflow only allows unique names for asset folders, so the first step is to check if a folder with the specified name already exists. We do this using the [List Asset Folders](https://developers.webflow.com/data/reference/assets/asset-folders/list-folders) endpoint. If a folder with the given name is found, the function returns the folder's ID.

### 3\. Create new asset folder if one doesn't exist

If a folder does not already exist, create one using the [Create Asset Folder](https://developers.webflow.com/data/reference/assets/asset-folders/create-folder) endpoint. Once successfully created, the function returns the ID of the newly created folder.

### 4\. Create main function

To execute the `createAssetFolder()` function, create an anonymous asynchronous function that iterates through the list of folders we defined earlier and calls `createAssetFolder()` for each one. This ensures that all required folders are created.

## Generate a file hash

When uploading a file, Webflow requires you to include a cryptographic hash generated from the contents of that file.

This hash helps ensure data integrity and security, providing a unique "fingerprint" of the file that guarantees it hasn't been altered or tampered with during the upload process.

Before uploading an asset, we'll need to generate its hash using the **SHA-256** algorithm.

### 1\. Create `getFileHashFromUrl` function

To generate the file hash, create a function named `getFileHashFromUrl()`. This function will:

- Use **axios** to retrieve the file from the provided URL with a GET request.
- Use **crypto** to calculate the hash with a stream-based approach, which efficiently handles larger files.

### 2\. Create the Promise

Wrap the function logic in a new `Promise` to handle the asynchronous hashing. Use `resolve` to return the hash value once calculated, and `reject` to handle any errors that occur.

### 3\. Fetch the file as a stream

Use axios to download the file as a stream from the provided URL. Streaming is particularly helpful for large files since it avoids loading the entire file into memory.

### 4\. Hash the file

Create a SHA-256 hash instance to compute the hash of the file. Update the hash with each data chunk as it is streamed. Once the entire file has been streamed, resolve the promise with the final hash value.

## Upload a new asset

Now that we have set up the necessary folders, defined the files, and implemented the file hashing logic, it's time to upload these assets to Webflow. This process consists of two main steps:

1. **Update Metadata to Webflow:** Send metadata to Webflow to initiate the upload. Webflow will respond with the necessary details to proceed with uploading the file to Amazon S3.
2. **Upload the File to S3:** Use the provided URL and Amazon headers to upload the actual file to Amazon S3.

### 1\. Create `uploadAsset()` function

Define an asynchronous function called `uploadAsset()` that takes the following arguments: `siteId`, `folderId`, and `assetUrl`.

### 2\. Get file hash and file name

Use the `getFileHashFromUrl()` function to generate the file hash. Extract the file name from the URL.

#### 3\. Upload Metadata to Webflow

Use the [`webflow.assets.create()`](https://developers.webflow.com/data/reference/assets/assets/create) method to send the `siteId`, `parentFolder`, `fileName,` and `fileHash` to Webflow.

The response from Webflow includes:

- `uploadUrl`: The Amazon S3 URL to upload the file.
- `uploadDetails`: Amazon-specific headers and parameters required for the file upload.

### 4\. Prepare form data for Amazon S3 upload

Use the `FormData` library to create a form object needed for the Amazon S3 upload

Refer to the [Amazon S3 Upload Documentation](https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingRESTAPImpUpload.html) for more details on each parameter.

#### Append Amazon S3 Headers

Append the required Amazon S3 headers from `uploadDetails` to the form. These headers are provided by Webflow and are necessary for the upload authorization.

#### Append File Data

Fetch the file using **axios** with a `responseType` of stream to handle large files efficiently. Append the file to the form data.

### 5\. Upload to Amazon S3

Use **axios** to make a POST request to the provided `uploadUrl`. The URL, along with the specific headers from `uploadDetails`, allows the file to be uploaded directly to AWS S3.

## Call the main function

Now that we have defined all the necessary functions (`createAssetFolder`, `getFileHashFromUrl`, and `uploadAsset`), it's time to call the main function and complete the process of uploading assets to Webflow.

### 1\. Update the main function

In `assets.js`, make sure the main function is properly set up to create the asset folders and upload the files. Update it to include the `uploadAsset()` function call for each asset URL.

This will:

- Iterate through each folder in `assetDetails`.
- Create the folder in Webflow if it doesn't already exist.
- Upload each asset to the corresponding folder using the `uploadAsset()` function.

### 2\. Run the script

To execute the script and upload the assets, run `assets.js` using Node.js in the terminal:

`$ node assets.js
`

### 3\. Verify successful upload

If everything is configured correctly, you should see output in the terminal that indicates the successful creation of folders and uploads of assets.

Additionally, you can refresh the Designer and open the [Assets Panel](https://help.webflow.com/hc/en-us/articles/33961269934227-Assets-panel#how-to-add-assets) in the Webflow designer to see your newly created assets.

If there are any errors (e.g., issues with the API token, invalid URLs, or upload failures), they will be logged in the console, providing useful feedback to troubleshoot.

assets.js

.env

ExpandClose

``1require("dotenv").config();

2const { WebflowClient } = require("webflow-api");

3const crypto = require("crypto");

4const axios = require("axios");

5const FormData = require("form-data");

6

7// Initialize Webflow client

8const webflow = new WebflowClient({

9  accessToken: process.env.WEBFLOW_API_TOKEN,

10});

11

12// Organize folders and assets

13const assetDetails = [\
\
14  {\
\
15    folderName: "Universal Assets",\
\
16    assets: ["https://images.unsplash.com/photo-1451187580459-43490279c0fa"],\
\
17  },\
\
18  {\
\
19    folderName: "English Assets",\
\
20    assets: [\
\
21      "https://images.unsplash.com/photo-1543109740-4bdb38fda756",\
\
22      "https://images.unsplash.com/photo-1665410620550-c54105af7d0c",\
\
23      "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9",\
\
24    ],\
\
25  },\
\
26  {\
\
27    folderName: "French Assets",\
\
28    assets: [\
\
29      "https://images.unsplash.com/photo-1454386608169-1c3b4edc1df8",\
\
30      "https://images.unsplash.com/photo-1500039436846-25ae2f11882e",\
\
31      "https://images.unsplash.com/photo-1528717663417-3742fee05a29",\
\
32    ],\
\
33  },\
\
34];

35

36// Function to create an asset folder

37async function createAssetFolder(siteId, folderName) {

38  try {

39    // Check if the folder already exists

40    const existingFolders = await webflow.assets.listFolders(siteId);

41    const existingFolder = existingFolders.assetFolders.find(

42      (folder) => folder.displayName === folderName

43    );

44    if (existingFolder) {

45      console.log(

46        `Folder '${folderName}' already exists with ID: ${existingFolder.id}`

47      );

48      return existingFolder.id;

49    }

50    // Create the folder if it does not exist

51    console.log(`Creating folder: ${folderName}`);

52    const response = await webflow.assets.createFolder(siteId, {

53      displayName: folderName,

54    });

55    console.log(`Folder '${folderName}' created with ID: ${response.id}`);

56    return response.id; // Return folder ID for further use

57  } catch (error) {

58    console.error(

59      `Error creating or retrieving asset folder '${folderName}':`,

60      error

61    );

62  }

63}

64

65// Function to hash file data from URL

66async function getFileHashFromUrl(assetUrl) {

67

68  // Create a promise to handle asynchronous hashing of the file data

69  return new Promise(async (resolve, reject) => {

70    try {

71

72      // Fetch the file as a stream

73      const response = await axios.get(assetUrl, { responseType: "stream" });

74

75      // Initialize SHA-256 hash

76      const hash = crypto.createHash("sha256");

77

78      // Update the hash with each chunk of data received from the stream

79      response.data.on("data", (data) => hash.update(data));

80

81      // Finalize the hash calculation and resolve the promise with the hash value

82      response.data.on("end", () => resolve(hash.digest("hex")));

83      response.data.on("error", reject);

84    } catch (error) {

85      reject(error);

86    }

87  });

88}

89

90// Function to upload an asset to Webflow via S3

91async function uploadAsset(siteId, folderId, assetUrl) {

92  try {

93    // Generate the file hash for validation

94    const fileHash = await getFileHashFromUrl(assetUrl);

95    const fileName = assetUrl.split("/").pop();

96

97    // Step 1: Initialize the upload

98    const uploadInit = await webflow.assets.create(siteId, {

99      parentFolder: folderId,

100      fileName: fileName + `.jpeg`,

101      fileHash: fileHash,

102    });

103    const { uploadUrl, uploadDetails } = uploadInit;

104

105    // Create form data for S3 upload

106    const form = new FormData();

107

108    // Append all required fields to the form

109    form.append("acl", uploadDetails.acl);

110    form.append("bucket", uploadDetails.bucket);

111    form.append("X-Amz-Algorithm", uploadDetails.xAmzAlgorithm);

112    form.append("X-Amz-Credential", uploadDetails.xAmzCredential);

113    form.append("X-Amz-Date", uploadDetails.xAmzDate);

114    form.append("key", uploadDetails.key);

115    form.append("Policy", uploadDetails.policy);

116    form.append("X-Amz-Signature", uploadDetails.xAmzSignature);

117    form.append("success_action_status", uploadDetails.successActionStatus);

118    form.append("Content-Type", uploadDetails.contentType);

119    form.append("Cache-Control", uploadDetails.cacheControl);

120

121    // Append the file to be uploaded

122    const response = await axios.get(assetUrl, { responseType: "stream" });

123    form.append("file", response.data, {

124      filename: fileName,

125      contentType: uploadDetails.contentType,

126    });

127    console.log(response);

128

129    // Step 2: Upload to the provided S3 URL

130    const uploadResponse = await axios.post(uploadUrl, form, {

131      headers: {

132        ...form.getHeaders(),

133      },

134    });

135

136    if (uploadResponse.status === 201) {

137      console.log(`Successfully uploaded ${fileName} to Webflow.`);

138    } else {

139      console.error(

140        `Failed to upload ${fileName}. Response status: ${uploadResponse.status}`

141      );

142    }

143  } catch (error) {

144    console.error(`Error uploading asset from ${assetUrl}:`, error);

145  }

146}

147

148// Main function to execute the folder creation and asset upload

149(async () => {

150  const siteId = process.env.SITE_ID;

151

152  for (const { folderName, assets } of assetDetails) {

153    const folderId = await createAssetFolder(siteId, folderName);

154    if (folderId) {

155      for (const assetUrl of assets) {

156        await uploadAsset(siteId, folderId, assetUrl);

157      }

158    }

159  }

160})();

``

## Conclusion

Congratulations! You’ve just programmatically created asset folders and uploaded assets to a Webflow site. These assets can now be organized and used across the site by designers and editors of Webflow projects.

Looking for more things to try with the API? Check out:

- [Working with Custom Code](https://developers.webflow.com/data/docs/custom-code)
- [Working with the CMS](https://developers.webflow.com/data/docs/working-with-the-cms)
- [Working with Webhooks](https://developers.webflow.com/data/docs/working-with-webhooks)

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