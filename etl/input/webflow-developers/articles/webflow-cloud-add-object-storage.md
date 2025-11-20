---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/add-object-storage
title: "Add Object Storage to your app | Webflow Developer Documentation"
published: 2025-11-17
---

This guide will show you how to add [Object Storage](https://developers.webflow.com/webflow-cloud/storing-data/object-storage) to your project and use it to store and serve files. You’ll learn how to:

- Set up an Object Storage binding
- List and display files from your bucket
- Upload files to your bucket with proper validation
- Handle large file uploads using multipart uploads

## Prerequisites

Before you begin, make sure you have:

- A GitHub account
- A code editor like [Cursor](https://www.cursor.com/) or [VS Code](https://code.visualstudio.com/)
- Node.js 20+ and npm 10+
- Basic familiarity with JavaScript/TypeScript

## Set up your project

This tutorial uses a repository with pre-built UI, backend endpoints, and helper utilities for file uploads and management. Follow along with the steps below and reference the code in the example project to see how Object Storage is used in this Webflow Cloud app. You may need to make some code changes to the project to get it working with your Webflow Cloud environment.

[1](https://developers.webflow.com/webflow-cloud/add-object-storage#fork-and-clone-the-example-repository)

### Fork and clone the example repository

To start, [fork the project on Github](https://github.com/Webflow-Examples/webflow-cloud-object-storage/fork) so you have your own copy to work with.

Next, clone your fork of the starter repository to your local machine and install dependencies:

```
git clone https://github.com/<YOUR-GITHUB-USERNAME>/webflow-cloud-object-storage.git
cd webflow-cloud-object-storage
npm install
```

The project uses Astro with TypeScript and includes all necessary dependencies for Object Storage operations.

[2](https://developers.webflow.com/webflow-cloud/add-object-storage#create-a-new-webflow-cloud-project)

### Create a new Webflow Cloud project

Go to the Webflow Cloud dashboard in your site settings and create a new Webflow Cloud project.

1. Go to your Webflow Cloud dashboard
2. Click “Install Github app” to authorize Webflow Cloud for your fork of this repo - follow the prompts on Github
3. Click “Create new project”
4. Name your project
5. Choose the `webflow-cloud-object-storage` repository
6. Click “Create project”

##### Repository linking

Once the project is created, it will automatically deploy when you push changes to the linked GitHub repository.

[3](https://developers.webflow.com/webflow-cloud/add-object-storage#create-an-environment)

### Create an environment

Create a new environment for the main branch

1. In the same modal, choose the `main` branch
2. Choose a mount path for the environment (for example, /app → mysite.webflow.io/app)
3. Click “Create environment”
4. Publish your Webflow site to make your environment live
5. A new row should appear in the table with your new environment. Click into it to see the environment details

##### Mount paths

Mount paths are unique to each environment and are used to route traffic to the correct environment. Each mount path must be unique across all environments within a project.

[4](https://developers.webflow.com/webflow-cloud/add-object-storage#add-environment-variables)

### Add environment variables

On your environment page, click the “Environment Variables” tab and add the following environment variable:

- `Variable Key`: ORIGIN
- `Variable Value`: Your Webflow Cloud domain (for example, `https://your-site-name.webflow.io`)

Click “Add variable” to save the variable.

[5](https://developers.webflow.com/webflow-cloud/add-object-storage#update-your-project-configuration)

### Update your project configuration

Now, with your locally cloned project, open it in your preferred code editor and update the following files:

- `astro.config.mjs` to include the base path for your environment and the `assetsPrefix` to match the mount path of your environment.
- Create a new `.env` file at the root of the project to include the `ORIGIN` environment variable.

astro.config.mjs.env

```
export default defineConfig({
  base: "/YOUR_MOUNT_PATH",
  build: {
    assetsPrefix: "/YOUR_MOUNT_PATH",
  },

  // Additional configuration options...
});
```

## Add Object Storage binding

Before you can use Object Storage in your Webflow Cloud app, you need to declare a binding in your project’s configuration. This binding tells your app how to connect to the storage resource.

Once the binding is declared, your app can use simple methods like `.list()`, `.put()`, and `.delete()` to read from and write to the Object Storage bucket directly in your code.

[1](https://developers.webflow.com/webflow-cloud/add-object-storage#declare-a-binding-in-wranglerjson)

### Declare a binding in `wrangler.json`

Open your project’s `wrangler.json` file and add an `r2_buckets` array to define your Object Storage buckets with the following information:

- `binding`: The variable name you’ll use to access the bucket in your code. This must be a valid JavaScript variable name.
- `bucket_name`: The name of the bucket wher you’ll store files

wrangler.json

```
{
    "r2_buckets": [\
       {\
          "binding": "CLOUD_FILES",\
          "bucket_name": "cloud-files"\
       }\
    ]
 }
```

[2](https://developers.webflow.com/webflow-cloud/add-object-storage#generate-type-definitions-for-your-binding)

### Generate type definitions for your binding.

Update your project’s type definitions to enable autocomplete and type safety:

```
npx wrangler types
```

This ensures your code editor recognizes the Object Storage binding.

[3](https://developers.webflow.com/webflow-cloud/add-object-storage#deploy-your-app)

### Deploy your app

Commit and push any local changes to your remote Github repo to automatically deploy your app.

##### CLI deployments will not apply changes to binding configurations

To create a new binding, you’ll need to commit and push your changes to your linked repository.

[4](https://developers.webflow.com/webflow-cloud/add-object-storage#access-your-binding-in-your-environment-dashboard)

### Access your binding in your Environment Dashboard

In Webflow, navigate to your site’s settings and click on the “Webflow Cloud” tab. Navigate to your project’s environment dashboard. Once your project is deployed, you’ll see a “Storage” tab appear in the dashboard.

![Upload files to Object Storage bucket](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/storing-data/assets/storage-cloud-files.png)

Click on the “Storage” tab and you’ll see your Object Storage binding listed.

[5](https://developers.webflow.com/webflow-cloud/add-object-storage#add-test-files-to-your-bucket)

### Add test files to your bucket

Add a couple of test files to your bucket using the Webflow Cloud dashboard. Click on the “Upload” button and select the files you want to upload. Later, you’ll create a route to upload files to your bucket.

![Upload files to Object Storage bucket](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/storing-data/assets/upload-object.png)

You’ll see the file appear in your bucket in the dashboard.

###### Uploading files to your local bucket

In your local project, you can upload files to a local bucket by running the following command in your terminal:

```
npx wrangler r2 object put <YOUR_BUCKET_NAME>/<YOUR_FILE_NAME> --file=<PATH_TO_YOUR_FILE>
```

This will upload the file to your local bucket, which you can then access when developing your project.

## List files in your bucket

Get familiar with accessing your Object Storage bucket in your code by creating a new route that lists the files in your bucket. This route will return all files stored in your bucket with their metadata.

[1](https://developers.webflow.com/webflow-cloud/add-object-storage#create-an-api-directory)

### Create an API directory

In your project’s `src/pages` directory, create an `api` directory.

[2](https://developers.webflow.com/webflow-cloud/add-object-storage#create-a-list-files-route)

### Create a list files route

In your `api` directory, create a new file called `list-assets.ts`. This file will contain the logic for listing the files in your bucket.

Asset API Tutorial \| Webflow API

### Create the GET endpoint

Import the `APIRoute` type from "astro" and create a GET endpoint that accepts the `locals` parameter.

The `locals` object provides access to runtime environment variables and bindings, including the `CLOUD_FILES` binding that you'll use to interact with object storage.

### Get the bucket and validate configuration

Access the `CLOUD_FILES` binding from `locals.runtime.env` and validate that the bucket is properly configured.

If the bucket isn't available, return a 500 error with a descriptive message to help with debugging.

### List files with pagination support

Use the `.list()` method to retrieve files from the bucket.

The method returns an `R2Object` list with pagination support. Set a `limit` of 500 files per request to balance performance and memory usage. The response includes a `truncated` flag indicating if more files are available, and a `cursor` for pagination.

**Key concepts:**

- **Pagination**: Buckets may contain thousands of files, so you use pagination to retrieve them in manageable chunks
- **Cursor-based pagination**: Each response includes a cursor that points to the next page of results

### Return the files as JSON

Return the complete list of files as a JSON response with proper headers. The `listed.objects` array contains all the files from the bucket, including metadata like file names, sizes, and creation dates.

**Response format:** The returned JSON will contain an array of `R2Object` items, each with properties like:

- `key`: The file name/path
- `size`: File size in bytes
- `etag`: Entity tag for caching
- `httpEtag`: HTTP-compatible entity tag
- `uploaded`: Upload timestamp
- `checksums`: File integrity checksums
- `httpMetadata`: HTTP headers and metadata

list.ts

ExpandClose

`
_39import type { APIRoute } from "astro";

_39

_39export const GET: APIRoute = async ({ request, locals }) => {

_39try {

_39    // Check if bucket is available

_39    const bucket = locals.runtime.env.CLOUD_FILES;

_39    if (!bucket) {

_39    return new Response("Cloud storage not configured", { status: 500 });

_39    }

_39

_39    const options = { limit: 500 };

_39    const listed = await bucket.list(options);

_39    let truncated = listed.truncated;

_39

_39    // Paging through the files

_39    // @ts-ignore

_39    let cursor = truncated ? listed.cursor : undefined;

_39

_39    while (truncated) {

_39    const next = await bucket.list({

_39        ...options,

_39        cursor: cursor,

_39    });

_39    listed.objects.push(...next.objects);

_39

_39    truncated = next.truncated;

_39    // @ts-ignore

_39    cursor = next.cursor;

_39    }

_39

_39    // Return the files as a JSON object

_39    return new Response(JSON.stringify(listed.objects), {

_39    headers: { "Content-Type": "application/json" },

_39    });

_39} catch (error) {

_39    console.error("Error listing assets:", error);

_39    return new Response("Failed to list assets", { status: 500 });

_39}

_39};

`

## Serve files from your bucket

Now that you can list files, create a route to serve individual files from your bucket. This route will handle file requests and return the file content with appropriate headers.

[1](https://developers.webflow.com/webflow-cloud/add-object-storage#create-a-file-serving-route)

### Create a file serving route

In your `api` directory, create a new file called `asset.ts`. This file will contain the logic for serving individual files from your bucket.

Asset API Tutorial \| Webflow API

### Create the GET endpoint

Import the `APIRoute` type from "astro" and create a GET endpoint that accepts the `locals` parameter.

This endpoint will serve individual files from the bucket based on the file key provided in the URL query parameters.

### Get the file key from the request

Extract the file key from the URL query parameters using `url.searchParams.get("key")`. The key represents the file name or path within the bucket.

Validate that a key is provided - if missing, return a 400 Bad Request error with a descriptive message to help with debugging.

### Retrieve the object from the bucket

Access the `CLOUD_FILES` binding and use the `.get()` method to retrieve the specific file from the bucket using the provided key.

The method returns an `R2Object` if the file exists, or `null` if not found.

**Key concepts:**

- **Bucket access**: The `CLOUD_FILES` binding provides direct access to the bucket
- **Object retrieval**: The `.get()` method is the primary way to fetch individual files

### Extract data and metadata from the object

Convert the `R2Object` to a usable format using the `.arrayBuffer()` method, which returns the file data as a `Uint8Array`. Extract the content type from the object's `httpMetadata` property, with a fallback to an empty string if not available.

### Return the file with proper headers

Create a new `Response` object with the file data and set the `Content-Type` header to match the file's content type. This ensures browsers and clients can properly handle the file based on its type.

asset.ts

ExpandClose

`1import type { APIRoute } from "astro";

2

3export const GET: APIRoute = async ({ request, locals }) => {

4  // Get the key from the request

5  const url = new URL(request.url);

6  const key = url.searchParams.get("key");

7  if (!key) {

8    return new Response("Missing key", { status: 400 });

9  }

10

11  // Get the object from the bucket

12  const bucket = locals.runtime.env.CLOUD_FILES;

13  const object = await bucket.get(key as string);

14  if (!object) {

15    return new Response("Not found", { status: 404 });

16  }

17

18  // Get the data from the object and return it

19  const data = await object.arrayBuffer();

20  const contentType = object.httpMetadata?.contentType ?? "";

21

22  return new Response(data, {

23    headers: {

24      "Content-Type": contentType,

25    },

26  });

27};

`

[2](https://developers.webflow.com/webflow-cloud/add-object-storage#optional-view-files-in-your-app)

### (Optional) View files in your app

If you added assets to your [local bucket](https://developers.webflow.com/webflow-cloud/add-object-storage#uploading-files-to-your-local-bucket) in your local project, you can view them now.

To see your app locally, run the following command:

```
npm run dev
```

This will start the development server and you can view your app at `http://localhost:4321/YOUR_BASE_PATH`.

You should see the files you added to your bucket appear in the list of files.

![View files in your app](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/storing-data/examples/file-uploader.png)

[3](https://developers.webflow.com/webflow-cloud/add-object-storage#deploy-your-app-1)

### Deploy your app

To deploy your app to Webflow Cloud, commit and push your changes to your GitHub repository.

```
git add .
git commit -m "Add asset endpoints"
git push
```

Go to your environment in Webflow Cloud to see your app deployed. Once deployed, you can access your app at `https://<YOUR_DOMAIN>/<YOUR_BASE_PATH>` and see the files you uploaded via the Webflow Cloud dashboard.

To upload files from the App, you’ll create a new upload route in the next step.

## Upload files to your bucket

Next you’ll walk through the route to handle file uploads from your frontend. This route will process form data, validate files, and store them in your bucket. **This approach is best for smaller files less than 1MB.** For larger files, see the multipart upload route in the next section.

##### File uploads should be executed on the domain of your worker

To avoid size upload limits, file upload endpoints should be executed on the domain of your worker using the `ASSETS_PREFIX` environment variable, and not your custom Webflow Cloud domain. Because of this, you’ll need to handle CORS requests for this route.

[1](https://developers.webflow.com/webflow-cloud/add-object-storage#create-an-upload-route)

### Create an upload route

In your `api` directory, step into the file called `upload.ts`. This file will contain the logic for uploading files to your bucket.

Asset API Tutorial \| Webflow API

### Create the POST endpoint

Import the `APIRoute` type from "astro" and create a POST endpoint that accepts the `locals` parameter. This endpoint will handle file uploads to the R2 bucket, including CORS preflight requests and form data processing.

### Initialize API and handle CORS

Initialize the API utility with the origin set in your environment variables and handle CORS preflight requests. The OPTIONS method is used by browsers to check if the cross-origin request is allowed before sending the actual file data.

**Key concepts:**

- **CORS preflight**: Browsers send OPTIONS requests to check cross-origin permissions
- **API initialization**: Set up the API utility with the correct origin for CORS headers

### Validate bucket configuration

Access the `CLOUD_FILES` binding and verify that the Object Storage bucket is properly configured. If the bucket isn't available, return a 500 error with a descriptive message to help with debugging.

### Process form data and validate file

Extract the file from the `FormData` object and validate that it's a proper File instance.

### Generate unique filename

Create a unique filename by combining a timestamp with the original filename. This prevents filename collisions and ensures each upload has a unique identifier. Extract the file extension to preserve the file type.

### Upload file to the bucket

Use the `.put()` method to upload the file to the Object Storage bucket with the generated filename. Set the `httpMetadata` to include the file's content type, which is essential for proper file serving later.

### Return success response

Return a success response with file details including the generated filename, Object Storage key, file size, and content type. This information is useful for the client to track the uploaded file.

upload.ts

ExpandClose

``1import type { APIRoute } from "astro";

2import { API } from "../../utils/api";

3

4export const POST: APIRoute = async ({ request, locals }) => {

5// Set the origin for the API

6API.init(locals.runtime.env.ORIGIN);

7

8// Handle CORS preflight requests

9if (request.method === "OPTIONS") {

10    console.log("CORS preflight request from:", request.headers.get("Origin"));

11    return API.cors(request);

12}

13

14try {

15    // Check if bucket is available

16    const bucket = locals.runtime.env.CLOUD_FILES;

17    if (!bucket) {

18    return API.error("Cloud storage not configured", request, 500);

19    }

20

21    const formData = await request.formData();

22    const file = formData.get("file");

23

24    if (!file || !(file instanceof File)) {

25    return API.error("Missing or invalid file", request, 400);

26    }

27

28    // Generate unique filename with timestamp

29    const timestamp = Date.now();

30    const extension = file.name.split(".").pop() || "";

31    const filename = `${timestamp}-${file.name}`;

32

33    // Upload to R2 bucket

34    const object = await bucket.put(filename, file, {

35    httpMetadata: {

36        contentType: file.type,

37    },

38    });

39

40    if (!object) {

41    return API.error("Failed to upload file", request, 500);

42    }

43

44    return API.success(

45    {

46        success: true,

47        filename,

48        key: object.key,

49        size: file.size,

50        type: file.type,

51    },

52    request

53    );

54} catch (error) {

55    console.error("Upload error:", error);

56    return API.error("Upload failed", request, 500);

57}

58};

``

[2](https://developers.webflow.com/webflow-cloud/add-object-storage#test-your-upload-route)

### Test your upload route

The frontend is already set up to use the upload route. You can test it by navigating to the file uploader page and uploading a file in your development environment. You should see the file appear in the list of files.

[3](https://developers.webflow.com/webflow-cloud/add-object-storage#deploy-your-app-2)

### Deploy your app

Deploy your app to Webflow Cloud to start uploading files from the frontend. Commit and push your changes to your GitHub repository to start a deployment.

```
git add .
git commit -m "Add upload endpoints"
git push
```

Once your app is deployed, navigate to the file uploader page and upload a file. You should see the file appear in the list of files.

![Test your upload route](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/storing-data/examples/file-uploader.png)

You may see a `413 Content Too Large` error if you attempt to upload large files. For these cases, see the multipart upload route in the next section.

## Handle large files with multipart uploads

Webflow Cloud apps have a [500MB request body limit](https://developers.webflow.com/webflow-cloud/limits) and require requests to complete within 30 seconds. The direct upload approach from the previous section is good for small files. For larger files, use the multipart upload approach shown below.

Multipart uploads break large files into smaller chunks that can be uploaded concurrently, improving upload performance and reliability. This approach allows browsers to upload multiple parts simultaneously and resume interrupted uploads. To achieve this, you’ll need to set up logic on both the server and the browser to handle the multipart upload process.

### Create the server endpoints

The **server** handles three main operations:

- **Create** \- Initialize upload session and get upload ID from the bucket
- **Upload Parts** \- Accept individual file chunks
- **Complete** \- Combine all parts into final file and return the file metadata

This guide will cover the creation of the POST and PUT endpoints on the `src/pages/api/multipart-upload.ts` file to handle these operations.

[1](https://developers.webflow.com/webflow-cloud/add-object-storage#create-the-post-endpoint)

### Create the POST endpoint

First, review the POST endpoint that handles the creation of a new multipart upload session, as well as the completion once all parts are uploaded.

Asset API Tutorial \| Webflow API

## Create the POST Endpoint

The POST endpoint manages multipart uploads through two key operations: initializing new uploads and finalizing completed ones. The `action` query parameter determines which operation to perform.

Be sure to include the `locals` parameter in the POST endpoint to access your environment variables and `CLOUD_FILES` binding.

### Setup CORS handling

Since multipart uploads require direct communication with the worker domain (not your Webflow Cloud domain), you need to set up proper CORS configuration. The imported API utility automatically handles CORS headers and preflight requests to ensure seamless cross-origin communication.

### Access your Object Storage bucket

Retrieve the `CLOUD_FILES` binding that provides access to your Object Storage bucket. This binding contains all the multipart upload methods you'll need throughout the upload process.

### Get Action Parameter

Parse the `action` query parameter to route between different multipart upload operations. The POST endpoint supports both `create` and `complete` actions.

### Initialize multipart upload session

When `action=create`, this code establishes a new multipart upload session in Object Storage. The browser provides the `key` and `contentType`, then receives a unique `uploadId` that identifies the entire upload process.

### Finalize multipart upload

Once all parts are uploaded through the PUT endpoint, the browser will send a request to this POST endpoint with the `action` parameter set to `complete` with an ordered list of all uploaded parts with their corresponding entity tags (ETags).

When `action=complete`, this endpoint consolidates all uploaded parts into a single file in Object Storage using `multipartUpload.complete()` method

multipart.ts

ExpandClose

``1import type { APIRoute } from "astro";

2import { API } from "../../utils/api";

3

4interface MultipartUploadRequest {

5  key: string;

6  contentType?: string;

7}

8

9interface CompleteMultipartRequest {

10  uploadId: string;

11  key: string;

12  parts: R2UploadedPart[];

13}

14

15// Creates and completes a new multipart upload session

16export const POST: APIRoute = async ({ request, locals }) => {

17  // Set the origin for the API

18  API.init(locals.runtime.env.ORIGIN);

19

20  // Handle CORS preflight requests

21  if (request.method === "OPTIONS") {

22    console.log("CORS preflight request from:", request.headers.get("Origin"));

23    return API.cors(request);

24  }

25

26  try {

27    // Check if bucket is available

28    const bucket = locals.runtime.env.CLOUD_FILES;

29    if (!bucket) {

30      return API.error("Cloud storage not configured", request, 500);

31    }

32

33    const url = new URL(request.url);

34    const action = url.searchParams.get("action");

35

36    if (!action) {

37      return API.error("Missing action parameter", request, 400);

38    }

39

40    switch (action) {

41      case "create": {

42        // Create a new multipart upload

43        const body: MultipartUploadRequest = await request.json();

44

45        if (!body.key) {

46          return API.error("Missing key parameter", request, 400);

47        }

48

49        try {

50          const multipartUpload = await bucket.createMultipartUpload(body.key, {

51            httpMetadata: body.contentType

52              ? {

53                  contentType: body.contentType,

54                }

55              : undefined,

56          });

57

58          return API.success(

59            {

60              success: true,

61              key: multipartUpload.key,

62              uploadId: multipartUpload.uploadId,

63            },

64            request

65          );

66        } catch (error) {

67          console.error("Failed to create multipart upload:", error);

68          return API.error("Failed to create multipart upload", request, 500);

69        }

70      }

71

72      case "complete": {

73        // Complete a multipart upload

74        const body: CompleteMultipartRequest = await request.json();

75

76        if (!body.uploadId || !body.key || !body.parts) {

77          return API.error("Missing required parameters", request, 400);

78        }

79

80        try {

81          const multipartUpload = bucket.resumeMultipartUpload(

82            body.key,

83            body.uploadId

84          );

85

86          // Parts are already in R2UploadedPart format

87          const r2Parts = body.parts;

88

89          const object = await multipartUpload.complete(r2Parts);

90

91          return API.success(

92            {

93              success: true,

94              key: object.key,

95              etag: object.httpEtag,

96              size: object.size,

97            },

98            request

99          );

100        } catch (error: any) {

101          console.error("Failed to complete multipart upload:", error);

102          return API.error(

103            error.message || "Failed to complete multipart upload",

104            request,

105            400

106          );

107        }

108      }

109

110      default:

111        return API.error(`Unknown action: ${action}`, request, 400);

112    }

113  } catch (error) {

114    console.error("Multipart upload error:", error);

115    return API.error("Multipart upload failed", request, 500);

116  }

117};

118

119// Uploads individual parts of a multipart upload

120export const PUT: APIRoute = async ({ request, locals }) => {

121  // Set the origin for the API

122  API.init(locals.runtime.env.ORIGIN);

123

124  // Handle CORS preflight requests

125  if (request.method === "OPTIONS") {

126    console.log("CORS preflight request from:", request.headers.get("Origin"));

127    return API.cors(request);

128  }

129

130  try {

131    // Check if bucket is available

132    const bucket = locals.runtime.env.CLOUD_FILES;

133    if (!bucket) {

134      return API.error("Cloud storage not configured", request, 500);

135    }

136

137    const url = new URL(request.url);

138    const action = url.searchParams.get("action");

139

140    if (action !== "upload-part") {

141      return API.error(`Unknown action: ${action}`, request, 400);

142    }

143

144    const uploadId = url.searchParams.get("uploadId");

145    const partNumberStr = url.searchParams.get("partNumber");

146    const key = url.searchParams.get("key");

147

148    if (!uploadId || !partNumberStr || !key) {

149      return API.error("Missing uploadId, partNumber, or key", request, 400);

150    }

151

152    const partNumber = parseInt(partNumberStr);

153    if (isNaN(partNumber) || partNumber < 1) {

154      return API.error("Invalid part number", request, 400);

155    }

156

157    if (!request.body) {

158      return API.error("Missing request body", request, 400);

159    }

160

161    try {

162      const multipartUpload = bucket.resumeMultipartUpload(key, uploadId);

163

164      // Convert request body to ArrayBuffer to get known length

165      const arrayBuffer = await request.arrayBuffer();

166      const uploadedPart = await multipartUpload.uploadPart(

167        partNumber,

168        arrayBuffer

169      );

170

171      return API.success(

172        {

173          success: true,

174          partNumber: uploadedPart.partNumber,

175          etag: uploadedPart.etag,

176        },

177        request

178      );

179    } catch (error: any) {

180      console.error("Failed to upload part:", error);

181      return API.error(error.message || "Failed to upload part", request, 400);

182    }

183  } catch (error) {

184    console.error("Upload part error:", error);

185    return API.error("Upload part failed", request, 500);

186  }

187};

188

189// Aborts a multipart upload

190export const DELETE: APIRoute = async ({ request, locals }) => {

191  // Set the origin for the API

192  API.init(locals.runtime.env.ORIGIN);

193

194  // Handle CORS preflight requests

195  if (request.method === "OPTIONS") {

196    console.log("CORS preflight request from:", request.headers.get("Origin"));

197    return API.cors(request);

198  }

199

200  try {

201    // Check if bucket is available

202    const bucket = locals.runtime.env.CLOUD_FILES;

203    if (!bucket) {

204      return API.error("Cloud storage not configured", request, 500);

205    }

206

207    const url = new URL(request.url);

208    const action = url.searchParams.get("action");

209

210    if (action !== "abort") {

211      return API.error(`Unknown action: ${action}`, request, 400);

212    }

213

214    const uploadId = url.searchParams.get("uploadId");

215    const key = url.searchParams.get("key");

216

217    if (!uploadId || !key) {

218      return API.error("Missing uploadId or key", request, 400);

219    }

220

221    try {

222      const multipartUpload = bucket.resumeMultipartUpload(key, uploadId);

223      await multipartUpload.abort();

224

225      return API.success(

226        {

227          success: true,

228          message: "Multipart upload aborted successfully",

229        },

230        request

231      );

232    } catch (error: any) {

233      console.error("Failed to abort multipart upload:", error);

234      return API.error(

235        error.message || "Failed to abort multipart upload",

236        request,

237        400

238      );

239    }

240  } catch (error) {

241    console.error("Abort multipart upload error:", error);

242    return API.error("Abort multipart upload failed", request, 500);

243  }

244};

245

246export const OPTIONS: APIRoute = async ({ request, locals }) => {

247  // Set the origin for the API

248  API.init(locals.runtime.env.ORIGIN);

249  return API.cors(request);

250};

``

[2](https://developers.webflow.com/webflow-cloud/add-object-storage#create-the-put-endpoint)

### Create the PUT endpoint

Next, observe how the PUT endpoint handles the uploading of individual file parts.

Asset API Tutorial \| Webflow API

## Create the PUT Endpoint

The PUT endpoint handles uploading individual file parts. Each part is uploaded as a separate request, allowing browsers to upload multiple parts concurrently for better performance.

Include the `locals` parameter, and set up CORS preflight requests.

### Access your Object Storage bucket

Retrieve the `CLOUD_FILES` binding that provides access to your Object Storage bucket. This binding contains all the multipart upload methods you'll need throughout the upload process.

### Get Action Parameter

Parse the `action` query parameter. The PUT endpoint only supports the `upload-part` action. If the action isn't `upload-part`, the endpoint returns an error.

### Validate part upload parameters

Extract and validate the required parameters for part uploads, including the `uploadId`, `partNumber`, and `key`. Each part must have a unique number starting from 1, and all parts must be associated with the same upload session.

The client will send the correct `uploadId`, `partNumber`, and `key` for each part.

### Upload individual part

Process a single file part upload. The request body contains the binary data for that specific chunk of the file.

**What happens:**

- Resumes the multipart upload using the `uploadId`
- Converts the request body to `ArrayBuffer` for Object Storage compatibility
- Uploads the part with its assigned `partNumber`
- Returns the `partNumber` and `etag` for tracking

### Return the uploaded part

After successfully uploading a part, return a response containing:

- **`success: true`** \- Confirms the operation completed successfully
- **`partNumber`** \- The sequential number of this part
- **`etag`** \- The entity tag for this specific part, used for integrity verification

The client should store both the `partNumber` and `etag` for each uploaded part. These values are required when completing the multipart upload to ensure all parts are included and haven't been corrupted during transfer.

multipart.ts

ExpandClose

``1import type { APIRoute } from "astro";

2import { API } from "../../utils/api";

3

4interface MultipartUploadRequest {

5  key: string;

6  contentType?: string;

7}

8

9interface CompleteMultipartRequest {

10  uploadId: string;

11  key: string;

12  parts: R2UploadedPart[];

13}

14

15// Creates and completes a new multipart upload session

16export const POST: APIRoute = async ({ request, locals }) => {

17  // Set the origin for the API

18  API.init(locals.runtime.env.ORIGIN);

19

20  // Handle CORS preflight requests

21  if (request.method === "OPTIONS") {

22    console.log("CORS preflight request from:", request.headers.get("Origin"));

23    return API.cors(request);

24  }

25

26  try {

27    // Check if bucket is available

28    const bucket = locals.runtime.env.CLOUD_FILES;

29    if (!bucket) {

30      return API.error("Cloud storage not configured", request, 500);

31    }

32

33    const url = new URL(request.url);

34    const action = url.searchParams.get("action");

35

36    if (!action) {

37      return API.error("Missing action parameter", request, 400);

38    }

39

40    switch (action) {

41      case "create": {

42        // Create a new multipart upload

43        const body: MultipartUploadRequest = await request.json();

44

45        if (!body.key) {

46          return API.error("Missing key parameter", request, 400);

47        }

48

49        try {

50          const multipartUpload = await bucket.createMultipartUpload(body.key, {

51            httpMetadata: body.contentType

52              ? {

53                  contentType: body.contentType,

54                }

55              : undefined,

56          });

57

58          return API.success(

59            {

60              success: true,

61              key: multipartUpload.key,

62              uploadId: multipartUpload.uploadId,

63            },

64            request

65          );

66        } catch (error) {

67          console.error("Failed to create multipart upload:", error);

68          return API.error("Failed to create multipart upload", request, 500);

69        }

70      }

71

72      case "complete": {

73        // Complete a multipart upload

74        const body: CompleteMultipartRequest = await request.json();

75

76        if (!body.uploadId || !body.key || !body.parts) {

77          return API.error("Missing required parameters", request, 400);

78        }

79

80        try {

81          const multipartUpload = bucket.resumeMultipartUpload(

82            body.key,

83            body.uploadId

84          );

85

86          // Parts are already in R2UploadedPart format

87          const r2Parts = body.parts;

88

89          const object = await multipartUpload.complete(r2Parts);

90

91          return API.success(

92            {

93              success: true,

94              key: object.key,

95              etag: object.httpEtag,

96              size: object.size,

97            },

98            request

99          );

100        } catch (error: any) {

101          console.error("Failed to complete multipart upload:", error);

102          return API.error(

103            error.message || "Failed to complete multipart upload",

104            request,

105            400

106          );

107        }

108      }

109

110      default:

111        return API.error(`Unknown action: ${action}`, request, 400);

112    }

113  } catch (error) {

114    console.error("Multipart upload error:", error);

115    return API.error("Multipart upload failed", request, 500);

116  }

117};

118

119// Uploads individual parts of a multipart upload

120export const PUT: APIRoute = async ({ request, locals }) => {

121  // Set the origin for the API

122  API.init(locals.runtime.env.ORIGIN);

123

124  // Handle CORS preflight requests

125  if (request.method === "OPTIONS") {

126    console.log("CORS preflight request from:", request.headers.get("Origin"));

127    return API.cors(request);

128  }

129

130  try {

131    // Check if bucket is available

132    const bucket = locals.runtime.env.CLOUD_FILES;

133    if (!bucket) {

134      return API.error("Cloud storage not configured", request, 500);

135    }

136

137    const url = new URL(request.url);

138    const action = url.searchParams.get("action");

139

140    if (action !== "upload-part") {

141      return API.error(`Unknown action: ${action}`, request, 400);

142    }

143

144    const uploadId = url.searchParams.get("uploadId");

145    const partNumberStr = url.searchParams.get("partNumber");

146    const key = url.searchParams.get("key");

147

148    if (!uploadId || !partNumberStr || !key) {

149      return API.error("Missing uploadId, partNumber, or key", request, 400);

150    }

151

152    const partNumber = parseInt(partNumberStr);

153    if (isNaN(partNumber) || partNumber < 1) {

154      return API.error("Invalid part number", request, 400);

155    }

156

157    if (!request.body) {

158      return API.error("Missing request body", request, 400);

159    }

160

161    try {

162      const multipartUpload = bucket.resumeMultipartUpload(key, uploadId);

163

164      // Convert request body to ArrayBuffer to get known length

165      const arrayBuffer = await request.arrayBuffer();

166      const uploadedPart = await multipartUpload.uploadPart(

167        partNumber,

168        arrayBuffer

169      );

170

171      return API.success(

172        {

173          success: true,

174          partNumber: uploadedPart.partNumber,

175          etag: uploadedPart.etag,

176        },

177        request

178      );

179    } catch (error: any) {

180      console.error("Failed to upload part:", error);

181      return API.error(error.message || "Failed to upload part", request, 400);

182    }

183  } catch (error) {

184    console.error("Upload part error:", error);

185    return API.error("Upload part failed", request, 500);

186  }

187};

188

189// Aborts a multipart upload

190export const DELETE: APIRoute = async ({ request, locals }) => {

191  // Set the origin for the API

192  API.init(locals.runtime.env.ORIGIN);

193

194  // Handle CORS preflight requests

195  if (request.method === "OPTIONS") {

196    console.log("CORS preflight request from:", request.headers.get("Origin"));

197    return API.cors(request);

198  }

199

200  try {

201    // Check if bucket is available

202    const bucket = locals.runtime.env.CLOUD_FILES;

203    if (!bucket) {

204      return API.error("Cloud storage not configured", request, 500);

205    }

206

207    const url = new URL(request.url);

208    const action = url.searchParams.get("action");

209

210    if (action !== "abort") {

211      return API.error(`Unknown action: ${action}`, request, 400);

212    }

213

214    const uploadId = url.searchParams.get("uploadId");

215    const key = url.searchParams.get("key");

216

217    if (!uploadId || !key) {

218      return API.error("Missing uploadId or key", request, 400);

219    }

220

221    try {

222      const multipartUpload = bucket.resumeMultipartUpload(key, uploadId);

223      await multipartUpload.abort();

224

225      return API.success(

226        {

227          success: true,

228          message: "Multipart upload aborted successfully",

229        },

230        request

231      );

232    } catch (error: any) {

233      console.error("Failed to abort multipart upload:", error);

234      return API.error(

235        error.message || "Failed to abort multipart upload",

236        request,

237        400

238      );

239    }

240  } catch (error) {

241    console.error("Abort multipart upload error:", error);

242    return API.error("Abort multipart upload failed", request, 500);

243  }

244};

245

246export const OPTIONS: APIRoute = async ({ request, locals }) => {

247  // Set the origin for the API

248  API.init(locals.runtime.env.ORIGIN);

249  return API.cors(request);

250};

``

### Create the browser logic

The browser handles the chunking of the file and the uploading of the parts to the server. To do this, the client-side logic will need to:

- **Initiate** \- Get an `uploadId` from the server
- **Upload Parts** \- Send file chunks with the `uploadId`
- **Complete** \- Tell the server to combine all parts

The example repository already implements this logic, however below is a walk through of the code to understand how it works.

Asset API Tutorial \| Webflow API

## Component setup

Start by setting up the React component with state variables for tracking upload progress and status:

- `isUploading`: Boolean flag to track upload state and disable UI elements
- `progress`: Number to track upload completion percentage

### File input validation

Implement file input handling with proper error checking:

- Get the file input element using `getElementById`
- Extract the selected file from the input's `files` array
- Validate that a file was actually selected before proceeding
- Show user-friendly error message if no file is selected

### Upload configuration

Set up the core configuration parameters for the multipart upload:

- **Base URL**: Construct the API endpoint using `ASSETS_PREFIX` environment variable
- **File Key**: Use the original filename as the storage key
- **Chunk Size**: Set to 5MB for optimal performance
- **Total Parts**: Calculate the number of chunks needed based on file size

## Initiate upload

Begin the multipart upload by requesting an `uploadId` from the server:

- Create the initiation URL with `action=create` parameter
- Send POST request with file metadata (key and content type)

### Store `uploadId`

The `uploadId` is a unique identifier that links all parts of the multipart upload together. Store it securely as it will be used for all subsequent API calls.

### Prepare parts for upload

Set up the data structures and URL templates needed for uploading individual parts:

- **Parts Data Array**: Initialize array to store part metadata (`PartNumber` and `ETag`)
- **Upload Part URL**: Create URL template with required parameters:
  - `action=upload-part`
  - `uploadId`
  - `key` for file identification

## Upload file parts

Implement the core chunking and uploading logic:

- **File Chunking**: Use `file.slice()` to create 5MB chunks
- **Part Numbering**: Assign sequential part numbers (1-based indexing)
- **Upload**: Upload each part sequentially
- **Progress Tracking**: Update progress bar after each successful part upload

### Store part metadata

For each successfully uploaded part, store the identifying metadata in the `partsData` array:

- **Part Number**: Sequential identifier for the part
- **ETag**: Server-generated hash for integrity verification

This metadata is required to complete the multipart upload successfully.

## Complete multipart upload

Finalize the upload by combining all parts into a single file:

- Create completion URL with `action=complete` parameter
- Send POST request with:
  - `uploadId`: Links all parts together
  - `key`: Final file name
  - `parts`: Array of part metadata

### Error handling and cleanup

Handle errors and reset the state:

- **Try-Catch Block**: Wrap entire upload process in error handling
- **User Feedback**: Show success/error messages to the user
- **State Reset**: Clean up upload state and progress in `finally` block

### UI components

Create a clean, responsive UI for the upload functionality:

- **File Input**: Standard HTML file picker
- **Upload Button**: Disabled during upload with visual feedback
- **Progress Bar**: Real-time visual progress indicator
- **Status Text**: Percentage completion display

The UI provides immediate feedback and prevents multiple simultaneous uploads.

uploader.ts

ExpandClose

``1import { useState } from "react";

2

3export default function SimpleMultipartUploader() {

4  const [isUploading, setIsUploading] = useState(false);

5  const [progress, setProgress] = useState(0);

6

7    //  Initiate file upload

8  const uploadFile = async () => {

9    const fileInput = document.getElementById("fileUpload") as HTMLInputElement;

10    const file = fileInput?.files?.[0];

11

12    if (!file) {

13      alert("Please select a file first");

14      return;

15    }

16

17    setIsUploading(true);

18    setProgress(0);

19

20    try {

21      // Configuration

22      const BASE_URL = `${import.meta.env.ASSETS_PREFIX}/api/multipart-upload`;

23      const key = file.name;

24      const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB

25      const totalParts = Math.ceil(file.size / CHUNK_SIZE);

26

27      // Step 1: Initiate upload

28      const createUploadUrl = new URL(BASE_URL);

29      createUploadUrl.searchParams.append("action", "create");

30

31      const createResponse = await fetch(createUploadUrl, {

32        method: "POST",

33        headers: { "Content-Type": "application/json" },

34        body: JSON.stringify({ key, contentType: file.type }),

35      });

36

37      const createJson = await createResponse.json();

38      const uploadId = createJson.uploadId;

39

40      // Step 2: Upload parts

41      const partsData = [];

42      const uploadPartUrl = new URL(BASE_URL);

43      uploadPartUrl.searchParams.append("action", "upload-part");

44      uploadPartUrl.searchParams.append("uploadId", uploadId);

45      uploadPartUrl.searchParams.append("key", key);

46

47      for (let i = 0; i < totalParts; i++) {

48        const start = CHUNK_SIZE * i;

49        const end = Math.min(file.size, start + CHUNK_SIZE);

50        const blob = file.slice(start, end);

51        const partNumber = i + 1;

52

53        uploadPartUrl.searchParams.set("partNumber", partNumber.toString());

54

55        const uploadPartResponse = await fetch(uploadPartUrl, {

56          method: "PUT",

57          body: blob,

58        });

59

60        const uploadPartJson = await uploadPartResponse.json();

61        const eTag = uploadPartJson.etag;

62

63        partsData.push({ PartNumber: partNumber, ETag: eTag });

64

65        // Update progress

66        const currentProgress = ((i + 1) / totalParts) * 100;

67        setProgress(currentProgress);

68      }

69

70      // Step 3: Complete upload

71      const completeUploadUrl = new URL(BASE_URL);

72      completeUploadUrl.searchParams.append("action", "complete");

73

74      await fetch(completeUploadUrl, {

75        method: "POST",

76        headers: { "Content-Type": "application/json" },

77        body: JSON.stringify({ uploadId, key, parts: partsData }),

78      });

79

80      alert("File uploaded successfully!");

81    } catch (error) {

82      console.error("Upload failed:", error);

83      alert("Upload failed. Please try again.");

84    } finally {

85      setIsUploading(false);

86      setProgress(0);

87    }

88  };

89

90  return (

91    <div style={{ padding: "20px", maxWidth: "500px" }}>

92      <h2>Simple Multipart File Upload</h2>

93

94      <div style={{ marginBottom: "20px" }}>

95        <input

96          type="file"

97          id="fileUpload"

98          style={{ marginBottom: "10px", display: "block" }}

99        />

100        <button

101          onClick={uploadFile}

102          disabled={isUploading}

103          style={{

104            padding: "10px 20px",

105            backgroundColor: isUploading ? "#ccc" : "#007bff",

106            color: "white",

107            border: "none",

108            borderRadius: "4px",

109            cursor: isUploading ? "not-allowed" : "pointer",

110          }}

111        >

112          {isUploading ? "Uploading..." : "Upload"}

113        </button>

114      </div>

115

116      {isUploading && (

117        <div style={{ marginTop: "20px" }}>

118          <div

119            style={{

120              width: "100%",

121              backgroundColor: "#f0f0f0",

122              borderRadius: "4px",

123              overflow: "hidden",

124            }}

125          >

126            <div

127              style={{

128                width: `${progress}%`,

129                height: "20px",

130                backgroundColor: "#007bff",

131                transition: "width 0.3s ease",

132              }}

133            />

134          </div>

135          <p style={{ marginTop: "5px", fontSize: "14px" }}>

136            Progress: {Math.round(progress)}%

137          </p>

138        </div>

139      )}

140    </div>

141  );

142}

``

### Test your multipart upload route

Now that your routes are setup, you can test your multipart upload route by uploading a large file.

[1](https://developers.webflow.com/webflow-cloud/add-object-storage#start-your-development-server)

### Start your development server

Start your development server by running the following command:

```
npm run dev
```

Your server should be running at `http://localhost:4321/YOUR_BASE_PATH`.

[2](https://developers.webflow.com/webflow-cloud/add-object-storage#upload-a-large-file)

### Upload a large file

Navigate to the file uploader page and upload a large file. You should see the file appear in the list of files.

![Test your upload route](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/storing-data/examples/file-uploader.png)

[3](https://developers.webflow.com/webflow-cloud/add-object-storage#deploy-your-app-3)

### Deploy your app

Deploy your app to Webflow Cloud to start uploading large files. Commit and push your changes to your GitHub repository to start a deployment.

```
git add .
git commit -m "Add multipart upload endpoints"
git push
```

[4](https://developers.webflow.com/webflow-cloud/add-object-storage#test-your-multipart-upload-route-in-your-webflow-cloud-environment)

### Test your multipart upload route in your Webflow Cloud environment

Navigate to the file uploader page in your Webflow Cloud environment and upload a large file. You should see the file appear in the list of files.

## FAQs

###### How do I handle CORS requests for the upload route?

Since upload requests are made directly to the worker domain (not your Webflow Cloud domain), you need to handle CORS properly. Add these headers to your response:

```
Access-Control-Allow-Origin: <YOUR_WEBFLOW_CLOUD_DOMAIN>
Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

If you’re looking to upload files from an authenticated user with session credentials, you’ll need to generate temporary upload URLs with embedded authentication tokens. Since CORS prevents passing session cookies directly, you can create a secure token that contains user information and embed it in the upload URL.

This approach involves:

- Generating a temporary upload URL with an embedded authentication token
- Validating the token on the upload endpoint
- Using the worker domain for the actual file upload

What's the difference between the `BASE_URL` and `ASSETS_PREFIX` environment variables?

Both the `BASE_URL` and `ASSETS_PREFIX` environment variables are automatically set by Webflow Cloud to help with routing logic in your app. You can access these variables as you would any other environment variable in your app.

- `BASE_URL` is automatically set to the [mount path](https://developers.webflow.com/webflow-cloud/environments#mount-paths) of your environment (for example, `/app`). This is useful for setting up redirects and other routing logic in your app.
- `ASSETS_PREFIX` is set to the domain of the Worker your app is deployed to (for example, `https://YOUR_ENV_HASH.wf-app-prod.cosmic.webflow.services`). This link is essential for uploading large files to your bucket, and serving files directly from your app. Because this link will always be a different domain than your app’s domain, you’ll need to handle CORS requests for the upload route.

Learn more about [built in environment variables in Webflow Cloud](https://developers.webflow.com/webflow-cloud/environment/configuration#mount-path-configuration).

###### Can I create presigned URLs to upload directly to my bucket?

No, presigned URLs require credentials that aren’t available in Webflow Cloud’s secure environment. Instead, use the multipart upload endpoints to upload files through your app’s API routes.

###### Can I expose a public bucket to the web?

No, public buckets aren’t supported in Webflow Cloud. All bucket access must go through your app’s API routes, which gives you control over access permissions and allows you to implement proper authentication and authorization.

###### Why do I get a 413 Content Too Large error when uploading to my bucket?

Likely the file being uploaded is hitting current Webflow Cloud request limits. You should upload these larger files through the multipart upload strategy.

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