---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/storing-data/key-value-store
title: "Key Value Store | Webflow Developer Documentation"
published: 2025-11-17
---

Key Value Store is a globally distributed, low-latency data store for unstructured or semi-structured data in Webflow Cloud. It enables Webflow Cloud apps to store and retrieve data at the edge, close to users, for instant access.

Use Key Value Store when you need to quickly read or write individual values by key, rather than perform complex queries or transactions. It complements structured storage solutions like SQLite by providing fast, scalable access to unstructured data. This enables:

- **Low-latency, global reads** \- Cache data near users for fast response times.
- **Automatic scaling** \- Handles high read volumes without manual intervention.
- **Simple API** \- Easy methods for storing, retrieving, and deleting data.
- **Resilience** \- Replicate data for high availability and zero downtime.

## Use cases

Key Value Store is best suited for:

- **Caching API responses**
- **Storing user preferences**
- **Managing tokens and sessions**
- **Serving static or semi-static assets**
- **Feature flags and A/B testing**

Use Key Value Store for read-heavy workloads that can tolerate [eventual consistency](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store#eventual-consistency). Avoid Key Value Store for workloads that require strong consistency, transactional guarantees, or advanced querying.

## Add a Key Value Store to your app

Create a Key Value Store by declaring [bindings](https://developers.webflow.com/webflow-cloud/storing-data/overview#quick-start-defining-a-binding) in your `wrangler.json` file in the root of your project.

A namespace is a logical container for key-value pairs. Think of it as a separate bucket or database for your app’s data. For each Key Value Store you want to use, add a binding in the `kv_namespaces` array to define a unique namespace.

Once declared and deployed, Webflow Cloud automatically connects your app to the namespace, allowing you to store and retrieve data by key.

[1](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store#add-a-binding-to-your-wranglerjson-file)

### Add a binding to your `wrangler.json` file

In your `wrangler.json` file, add a `kv_namespaces` array. Declare a binding for each Key Value Store you want to use inside the array.

**Note:** Webflow Cloud will assign a unique ID for each resource on deployment.

wrangler.json

```
{
  "kv_namespaces": [\
      {\
        "binding": "CACHE_KV",\
        "id": "1234567890", // Replace after deployment\
      }\
  ]
}
```

[2](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store#generate-types-for-your-binding)

### Generate types for your binding

Generate TypeScript types for your bindings to enable autocomplete and type safety in your code editor:

AstroNext.js

```
npx wrangler types
```

This creates/updates a `worker-configuration.d.ts` file with your binding types. **Note:** in Next.js you’ll also need to update the types for the `cloudflare-env.d.ts` file to avoid type errors.

[3](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store#deploy-your-app)

### Deploy your app

Deploy your app to Webflow Cloud. After deployment, you can view and manage your namespaces [in the Webflow Cloud dashboard.](https://developers.webflow.com/webflow-cloud/storing-data/overview#accessing-storage-in-webflow-cloud)

## Working with Key Value Store

### Access the binding

Webflow Cloud exposes your Key Value Store to your app as an environment variable, known as a binding, allowing you to interact with it directly from your application code.

Always access the environment variable in your app’s runtime environment. This variable exposes methods from the [Cloudflare’s KV Bindings API](https://developers.cloudflare.com/kv/examples/workers-kv-to-serve-assets/), allowing you to run [data operations](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store#data-operations) directly from your code.

###### Astro

###### Next.js

In Astro, access the binding in your code using the `locals` object.

src/pages/api/weather.ts

```
import type { APIRoute } from "astro";
import type { KVNamespace } from "@cloudflare/workers-types";

type WeatherCache = { data: any; timestamp: number };

export const GET: APIRoute = async ({ request, locals }) => {

  // Get binding from locals runtime env
  const env = (locals as any).runtime.env;
  const kv = env.CACHE_KV as KVNamespace;

//  Rest of code...
```

### Data operations

After accessing the binding, you can use the it to read and write data to your Key Value Store with the [Cloudflare KV API](https://developers.cloudflare.com/kv/api/) methods.

#### List keys

To list all keys in a namespace, call the `list()` method of the binding. This method returns a promise you can await on to get the list of keys for the namespace.

##### Syntax

```
env.NAMESPACE.list({options?}): Promise<{ keys: {name: string}[], expiration?: number, metadata?: object}[],list_complete: boolean, cursor: string>
```

For all parameters and options for the `list()` method, see the [Cloudflare KV API documentation](https://developers.cloudflare.com/kv/api/list-keys/#list-method).

##### Example

```
// Get binding from locals runtime env
const env = (locals as any).runtime.env;
const kv = env.CACHE_KV as KVNamespace;

// List all keys in the namespace
const { keys } = await kv.list();

// Rest of code...
```

* * *

#### Write key-value pairs

To create or update a key-value pair in a namespace, use the `.put()` method on your binding.

**How it works:**

- Calling `.put(key, value)` stores or updates the value for the given key in the namespace.
- Writes are [eventually consistent](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store#eventual-consistency): changes are visible immediately in the same region, but may take up to 60 seconds to propagate globally.
- If multiple writes to the same key occur at the same time, the last write wins.

##### Syntax

```
env.NAMESPACE.put(key, value, options?): Promise<void>
```

For all parameters and options for the `.put()` method, see the [Cloudflare KV API documentation](https://developers.cloudflare.com/kv/api/write-key-value-pairs/#reference).

##### Bulk writes

The `.put()` method does **not** support bulk operations. To write multiple pairs in your app, call `.put()` in a loop or with `Promise.all`.

##### Example

```
const pairs = [\
  { key: "user:1", value: "Zaphod" },\
  { key: "user:2", value: "Ford" },\
];

await Promise.all(
  pairs.map(({ key, value }) => env.NAMESPACE.put(key, value))
);
```

* * *

#### Read key-value pairs

To retrieve values from your Key Value Store, use the `.get()` method on your binding. You can read a single key or an array of keys in one call.

```
// Read a single key
const value = await env.NAMESPACE.get(key, options?);

// Read multiple keys (up to 100)
const values = await env.NAMESPACE.get([key1, key2, key3], options?);
```

**How it works:**

- Reading a single key returns the value (or `null` if not found).
- Reading multiple keys returns a map of key-value pairs, with missing keys mapped to `null`.
- You can specify the return type (`text`, `json`, etc.) as an option.
- Reads may return stale values due to [eventual consistency](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store#eventual-consistency); updates from other regions may take up to 60 seconds to appear.

##### Syntax

```
env.NAMESPACE.get(key, type?, options?): Promise<string | Object | ArrayBuffer | ReadableStream | null>
```

For all parameters, options, and advanced usage, see the [Cloudflare KV API documentation](https://developers.cloudflare.com/kv/api/read-key-value-pairs/).

##### Example

```
// List all keys with the "user:" prefix
const { keys } = await env.NAMESPACE.list({ prefix: "user:" });

// Extract key names
const userKeys = keys.map((k) => k.name);

// Read all user values as text (default)
const users = await env.NAMESPACE.get(userKeys);
// users is a Map: { "user:1" => "Zaphod", "user:2" => "Ford" }
```

* * *

#### Delete key-value pairs

To delete a key-value pair from your namespace, use the `.delete()` method on your binding. This method removes the key and its value from the namespace.

```
await env.NAMESPACE.delete("user:1");
```

**How it works:**

- The `.delete()` method only deletes one key at a time. To delete multiple keys, call `.delete()` for each key.
- Deleting a key that doesn’t exist is treated as a successful operation.
- Deletions are **eventually consistent**: the key is removed immediately in the current region, but it may take up to 60 seconds to propagate globally.

##### Syntax

```
env.NAMESPACE.delete(key): Promise<void>
```

For all parameters and options for the `.delete()` method, see the [Cloudflare KV API documentation](https://developers.cloudflare.com/kv/api/delete-key-value-pairs/#reference).

##### Example

Single keyMultiple keys

```
// Delete a single key
await env.NAMESPACE.delete("user:1");
```

### Eventual consistency

Key Value Store is eventually consistent: when you write or delete a key, the change is visible immediately in the same region, but may take up to 60 seconds to propagate globally.

**What this means for Webflow Cloud apps**

- If you read a key from a different region shortly after writing or deleting it, you may see stale data.
- This applies to all operations: `.put()`, `.delete()`, etc.
- Eventual consistency is usually not an issue for caching, session data, or other non-critical use cases.

**Best practices**

- Avoid relying on immediate global consistency for critical workflows.
- Design your application to tolerate stale reads, or use other storage solutions if you require strong consistency.
- For time-sensitive data, consider using a different mechanism or adding a version/timestamp to your values.

For more information, see the [Cloudflare KV API documentation](https://developers.cloudflare.com/kv/concepts/how-kv-works/).

## Related resources

- [How to add a Key Value Store to your app](https://developers.webflow.com/webflow-cloud/add-key-value-store)
- [Cloudflare Workers KV documentation](https://developers.cloudflare.com/kv/)
- [Webflow Cloud storage overview](https://developers.webflow.com/webflow-cloud/storing-data/overview)
- [Learn about SQLite storage](https://developers.webflow.com/webflow-cloud/storing-data/sqlite)
- [Review storage limits and quotas](https://developers.webflow.com/webflow-cloud/limits)

* * *

[Back to overview](https://developers.webflow.com/webflow-cloud/storing-data/overview)

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