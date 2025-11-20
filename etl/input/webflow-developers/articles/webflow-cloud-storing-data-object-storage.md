---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/storing-data/object-storage
title: "Object Storage | Webflow Developer Documentation"
published: 2025-11-17
---

Object Storage is a scalable, high-performance storage solution for large files and unstructured data in Webflow Cloud. It enables you to store, retrieve, and manage objects, like images, videos, documents, and backups—without the complexity or egress fees of traditional cloud storage.

Use Object Storage when you need to store and serve large, binary, or unstructured data that doesn’t fit well in a database or key-value store.

## How Object Storage works

Object Storage organizes data as objects, each identified by a unique key within a bucket, a container for objects.

Objects are stored and retrieved via a simple API, supporting direct uploads, downloads, and deletions. Data is distributed and replicated for durability and high availability.

**Key features:**

- **No egress fees** \- Download your data without extra costs.
- **S3-compatible API** \- Use familiar tools and SDKs.
- **Scalable and performant** \- Handles large files and high request volumes.
- **CORS and public buckets** \- Serve assets directly to the web.

## When to use object storage

Object Storage is ideal for:

- Storing and serving static assets (images, videos, PDF files)
- Backups and large data exports
- Data lakes and analytics workloads
- Any scenario requiring scalable, unstructured storage

## Add Object Storage to your app

Create a bucket by adding a [binding](https://developers.webflow.com/webflow-cloud/storing-data/overview#quick-start-defining-a-binding) to the `r2_buckets` array in your `wrangler.json` file at the root of your project.

A bucket is a logical container for objects. Think of it as a dedicated database for your app’s files and media. Add a separate binding for each bucket you need for storing and serving files.

After deployment, Webflow Cloud automatically connects your app to each bucket, so you can store and retrieve objects by key.

[1](https://developers.webflow.com/webflow-cloud/storing-data/object-storage#add-a-binding-to-your-wranglerjson-file)

### Add a binding to your `wrangler.json` file

In your `wrangler.json` file, add a `r2_buckets` array. Declare a binding for each bucket you want to use inside the array. Binding names must be valid JavaScript variable names.

wrangler.json

```
{
  "r2_buckets": [\
      {\
        "binding": "WEBFLOW_CLOUD_MEDIA",\
        "bucket_name": <YOUR_BUCKET_NAME>, // Replace after deployment\
      }\
  ]
}
```

[2](https://developers.webflow.com/webflow-cloud/storing-data/object-storage#generate-types-for-your-binding)

### Generate types for your binding

Generate TypeScript types for your bindings to enable autocomplete and type safety in your code editor:

AstroNext.js

```
npx wrangler types
```

This creates/updates a `worker-configuration.d.ts` file with your binding types. **Note:** in Next.js you’ll also need to update the types for the `cloudflare-env.d.ts` file to avoid type errors.

[3](https://developers.webflow.com/webflow-cloud/storing-data/object-storage#deploy-your-app)

### Deploy your app

Deploy your app to Webflow Cloud. After deployment, you can view and manage your buckets [in the Webflow Cloud dashboard.](https://developers.webflow.com/webflow-cloud/storing-data/overview#accessing-storage-in-webflow-cloud)

## Working with Object Storage

### Access the binding

Webflow Cloud exposes Object Storage buckets to your app as an environment variable, known as a binding, allowing you to interact with it directly from your application code without the need for API keys and credentials.

Always access the environment variable in your app’s runtime environment. This variable exposes methods from [Cloudflare’s R2 Bindings API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/#create-a-binding), allowing you to run [data operations](https://developers.webflow.com/webflow-cloud/storing-data/object-storage#data-operations) directly from your code.

###### Astro

###### Next.js

In Astro, access the binding in your code using the `locals` object.

src/pages/api/weather.ts

```
import type { APIRoute } from "astro";
import type { R2Bucket } from "@cloudflare/workers-types";

type WeatherCache = { data: any; timestamp: number };

export const GET: APIRoute = async ({ request, locals }) => {

  // Get binding from locals runtime env
  const env = (locals as any).runtime.env;
  const bucket = env.WEBFLOW_CLOUD_MEDIA as R2Bucket;

//  Rest of code...
```

### Data operations

Manage objects in your bucket using the [R2 API](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) methods available on the binding. The most common operations are uploading, downloading, deleting, and listing objects. Each method is designed for fast, reliable access to your files and data directly from your app, with no need for external API keys.

Object Storage also supports S3-compatible API operations, making it easy to integrate with existing S3 tools and workflows. [Learn more about S3 API compatibility.](https://developers.cloudflare.com/r2/api/s3/api/)

#### Upload an object

To upload (store) an object in your bucket, use the `.put()` method on your binding. This method stores the provided data under the specified key and creates an [`R2Object`](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/#r2object-definition) containing the object’s metadata.

`.put()` returns a promise that resolves to an `R2Object` with metadata about the stored object. If a precondition in `options` fails, `.put()` returns `null` and the object isn’t stored.

##### Syntax

```
await env.WEBFLOW_CLOUD_MEDIA.put(key, value, options?): Promise<R2Object | null>;
```

- `key`: Unique name for the object (string)
- `value`: Data to store (string, ArrayBuffer, ReadableStream, Blob, etc.)
- `options`: (Optional) Metadata, HTTP headers, or storage class

Object Storage writes are **strongly consistent**: once the promise resolves, all subsequent reads will see the new object globally.

For all parameters and advanced options, see the [Cloudflare R2 API documentation](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/#bucket-method-definitions).

##### Example

AstroNext.js

```
import type { APIRoute } from "astro";
import type { R2Bucket } from "@cloudflare/workers-types";

export const PUT: APIRoute = async ({ request, locals }) => {

    // Get binding from locals runtime env
    const env = (locals as any).runtime.env;
    const bucket = env.WEBFLOW_CLOUD_MEDIA as R2Bucket;

    const url = new URL(request.url);
    const key = url.pathname.slice(1); // for example, "uploads/photo.jpg"

    if (request.method === "PUT") {

    // Get the file data from the request body
    const fileStream = request.body;
    const contentType = request.headers.get("content-type") || "application/octet-stream";

    // Store the object in the bucket with metadata
    const result = await bucket.put(key, fileStream, {
        httpMetadata: { contentType }
    });

    // Return a JSON response with the object metadata
    if (result) {
        return new Response(
        JSON.stringify({
            message: `File uploaded successfully.`,
            key: result.key,
            size: result.size,
            uploadedAt: result.uploaded
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } else {
        return new Response("Upload failed due to precondition.", { status: 412 });
    }
    }

    return new Response("Method Not Allowed", { status: 405, headers: { Allow: "PUT" } });
}
};
```

* * *

#### Download an object

To retrieve an object from your bucket, use the `.get()` method on your binding. This method fetches the object body and metadata if the key exists, or returns `null` if not found.

`.get()` returns a promise that resolves to an `R2ObjectBody` that contains the object’s data and metadata, or `null` if the object doesn’t exist.

##### Syntax

```
env.WEBFLOW_CLOUD_MEDIA.get(key, options?): Promise<R2ObjectBody | null>;
```

- `key`: The object key (string)
- `options`: (Optional) Conditional headers or response options

For all parameters and advanced options, see the [Cloudflare R2 API documentation](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/#bucket-method-definitions).

##### Example

AstroNext.js

```
import type { APIRoute } from "astro";
import type { R2Bucket } from "@cloudflare/workers-types";

export const GET: APIRoute = async ({ request, locals }) => {

    // Get binding from locals runtime env
    const env = (locals as any).runtime.env;
    const bucket = env.WEBFLOW_CLOUD_MEDIA as R2Bucket;

    // Get the object key from the request URL
    const url = new URL(request.url);
    const key = url.pathname.slice(1); // for example, "uploads/photo.jpg"

    // Get the object from the bucket
    const object = await bucket.get(key);
    if (object) {
        return new Response(object.body, {
            headers: { "Content-Type": object.httpMetadata?.contentType || "application/octet-stream" }
        });
    } else {
        return new Response("Not found", { status: 404 });
    }
};
```

* * *

#### Delete an object

To delete an object from your bucket, use the `.delete()` method on your binding. You can delete a single object by key or multiple objects by passing an array of keys (up to 1000 per call).

`.delete()` returns a promise that resolves when the objects have been deleted. Deleting a key that doesn’t exist is treated as a successful operation.

##### Syntax

```
env.WEBFLOW_CLOUD_MEDIA.delete(key): Promise<void>;
```

- `key`: The object key (string) or an array of keys

For all parameters and advanced options, see the [Cloudflare R2 API documentation](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/#bucket-method-definitions).

##### Example

AstroNext.js

```
import type { APIRoute } from "astro";
import type { R2Bucket } from "@cloudflare/workers-types";

export const DELETE: APIRoute = async ({ request, locals }) => {
    // Get binding from locals runtime env
    const env = (locals as any).runtime.env;
    const bucket = env.WEBFLOW_CLOUD_MEDIA as R2Bucket;
    // Get the object key from the request URL
    const url = new URL(request.url);
    const key = url.pathname.slice(1); // for example, "uploads/photo.jpg"

    await bucket.delete(key);
    return new Response("Deleted", { status: 204 });
};
```

* * *

#### List objects

To list objects in your bucket, use the `.list()` method on your binding. This method returns an array of objects and supports options such as prefix filtering, result limits, and pagination.

`.list()` returns a promise that resolves to an object containing an array of `R2Object` entries, a `truncated` boolean indicating if more results are available, and a `cursor` for pagination.

##### Syntax

```
env.WEBFLOW_CLOUD_MEDIA.list(options?: R2ListOptions): Promise<R2Objects>;
```

- `options`: (Optional) Object with properties like `prefix`, `limit`, `cursor`, and `delimiter`

For all parameters and advanced options, see the [Cloudflare R2 API documentation](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/#bucket-method-definitions).

##### Example

AstroNext.js

```
import type { APIRoute } from "astro";
import type { R2Bucket } from "@cloudflare/workers-types";

export const GET: APIRoute = async ({ request, locals }) => {
    // Get binding from locals runtime env
    const env = (locals as any).runtime.env;
    const bucket = env.WEBFLOW_CLOUD_MEDIA as R2Bucket;
    // List all objects with the prefix "images/"
    const { objects, truncated, cursor } = await bucket.list({ prefix: "images/", limit: 100 });
    const keys = objects.map(obj => obj.key);
    return new Response(JSON.stringify({ keys, truncated, cursor }), {
        headers: { "Content-Type": "application/json" }
    });
};
```

For more information on object storage, see the [Cloudflare R2 API documentation](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/).

## Related resources

- [Storage options for Webflow Cloud](https://developers.webflow.com/webflow-cloud/storing-data/overview)
- [Add a SQLite database to your app](https://developers.webflow.com/webflow-cloud/add-sqlite)
- [Webflow Cloud limits](https://developers.webflow.com/webflow-cloud/limits)

* * *

[Back to overview](https://developers.webflow.com/webflow-cloud/storing-data/overview)

### FAQs

###### Can a bucket be public?

Public buckets aren’t currently supported in Webflow Cloud. To serve files publicly, add them to your public folder.

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