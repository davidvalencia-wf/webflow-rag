---
source: webflow-developers
category: general
url: https://developers.webflow.com/webflow-cloud/add-key-value-store
title: "Add a Key Value Store to your app | Webflow Developer Documentation"
published: 2025-11-17
---

**What you’ll learn:**

- How to add a Key Value Store to your Webflow Cloud project
- How to use a Key Value Store as a caching layer for third-party API data
- How to improve performance and reduce external requests

## Prerequisites

Before you begin, make sure you have:

- A Webflow Cloud project linked to a GitHub repository
- A Webflow Cloud environment set up
- Node.js 20+ and npm 10+
- Basic familiarity with JavaScript/TypeScript

##### New to Webflow Cloud?

If you haven’t already, follow the [Quick Start guide](https://developers.webflow.com/webflow-cloud/getting-started) to set up your project and environment.

## Add a Key Value Store binding

Before you can use a Key Value Store in your Webflow Cloud app, you need to declare a binding in your project’s configuration. This binding tells your app how to connect to the storage resource.

Once the binding is declared, your app can use simple methods like `.get()`, `.put()`, and `.delete()` to read from and write to the Key Value Store directly in your code.

[1](https://developers.webflow.com/webflow-cloud/add-key-value-store#update-your-project-in-webflow-cloud-optional)

### Update your project in Webflow Cloud (Optional)

If you created a Webflow Cloud prior to 7/16/2025, you’ll need to update your project in the Webflow Cloud dashboard to use Webflow Cloud’s new storage system.

1. Go to your project in the Webflow Cloud dashboard.

2. Select the ”…” icon in the “Actions” section of the menu.

3. Select “Edit” (you don’t actually need to edit anything).

4. Press “Save Changes” to update your project.

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/assets/update-project.png)

[2](https://developers.webflow.com/webflow-cloud/add-key-value-store#open-your-project)

### Open your project.

Launch your project in your preferred code editor.

[3](https://developers.webflow.com/webflow-cloud/add-key-value-store#declare-the-key-value-store-binding)

### Declare the Key Value Store binding.

In your project’s `wrangler.json` file, add a `kv_namespaces` array to define your Key Value Store binding:

wrangler.json

```
"kv_namespaces": [\
    {\
        "binding": "WEATHER_CACHE",\
        "id": "1234567890", // Webflow Cloud will generate this for you once you deploy your app\
    }\
]
```

- `binding`: The variable name you’ll use to access the database in your code. This must be a valid JavaScript variable name.
- `id`: A unique identifier for your database (Webflow Cloud will generate this for you once you deploy your app).

[4](https://developers.webflow.com/webflow-cloud/add-key-value-store#generate-type-definitions-for-your-binding)

### Generate type definitions for your binding.

Update your project’s type definitions to enable autocomplete and type safety:

###### Astro

###### Next.js

Terminal

```
wrangler types
```

This ensures your code editor recognizes the Key Value Store binding.

## Get weather data

Now that your Key Value Store binding is set up, you can use it to cache data in your app. In this section, you’ll build an API route that fetches weather information based on the user’s location. Each response will be stored in your Key Value Store for 10 minutes, so repeated requests are fast and reduce calls to the external weather API.

[1](https://developers.webflow.com/webflow-cloud/add-key-value-store#create-a-new-api-route)

### Create a new API route

Set up an API endpoint that will fetch weather data for your users.

###### Astro

###### Next.js

1. In your Astro project, go to the `src/pages/api` directory. If this directory doesn’t exist, create it.

2. Inside this directory, create a new file called `weather.ts`.

3. Add the following code into your new file:

src/pages/api/weather.ts

```
import { APIRoute } from "astro";

// Get api/weather
export const GET: APIRoute = async ({ request, locals }) => {

//... Implementation will be added in the next steps
}
```

[2](https://developers.webflow.com/webflow-cloud/add-key-value-store#get-the-key-value-store-binding)

### Get the Key Value Store binding

Access your Key Value Store binding in your API route so you can read from and write to the store.

###### Astro

###### Next.js

In your `weather.ts` file, access the binding from the runtime environment:

src/pages/api/weather.ts

```
import { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {

    // Access the environment bindings
    { env } = locals.runtime;
    const weatherCache = env.WEATHER_CACHE;

    //... continue with the next steps
}
```

- `env.WEATHER_CACHE` gives you access to the Key Value Store you declared in `wrangler.json`.

[3](https://developers.webflow.com/webflow-cloud/add-key-value-store#get-users-location)

### Get user's location

Extract the user’s location from the request headers. This information will be used to fetch location-specific weather data.

###### Astro

###### Next.js

In your `weather.ts` file, add the following code to get the user’s latitude and longitude from the Cloudflare request headers:

src/pages/api/weather.ts

```
import { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, locals }) => {

    { env } = locals.runtime;
    const weatherCache = env.WEATHER_CACHE;

    // Get User's location from Cloudflare headers
    if (!request.cf) {
        return new Response("No Cloudflare headers found", { status: 400 });
    }
    const { latitude, longitude } = request.cf;

    //... continue with the next steps
}
```

- `request.cf` contains the user’s location information.
- If the headers are missing, return a 400 error.

[4](https://developers.webflow.com/webflow-cloud/add-key-value-store#check-for-cached-data)

### Check for cached data

Before making an external API call, check if the weather data for the user’s location is already stored in your Key Value Store. If cached data exists, return it immediately to improve performance and reduce external requests.

Use the `.get()` method on the binding to check for cached data.

###### Astro

###### Next.js

In your `weather.ts` file, add the following logic after retrieving the user’s location:

src/pages/api/weather.ts

```
// ...previous code

    // Create a cache key from latitude and longitude
    const cacheKey = `${latitude}-${longitude}`;

    try {
        // Try to get the weather data from the cache
        const cachedWeather = await weatherCache.get(cacheKey);

        // If the cached data exists, return it
        if (cachedWeather) {
            return new Response(cachedWeather, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "X-Cache-Status": "HIT"
            },
            });
        }

        //... continue with fetching weather data from the API if not cached
```

- This creates a unique cache key for each location.
- If data is found, return it with a `X-Cache-Status: HIT` header.
- If not, continue to the next step to fetch and cache new data.

[5](https://developers.webflow.com/webflow-cloud/add-key-value-store#fetch-and-cache-fresh-weather-data)

### Fetch and cache fresh weather data

If no cached weather data is found, fetch fresh data from the Open-Meteo API, store it in your Key Value Store, and return it to the user.

Store the fresh data in your Key Value Store using the `.put()` method.

###### Astro

###### Next.js

In your `weather.ts` file, add the following logic after checking for cached data:

src/pages/api/weather.ts

```
// ...previous code

// If NOT cached, fetch weather data from Open-Meteo API
const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&temperature_unit=fahrenheit`;
const weatherData = await fetch(weatherUrl);

// If error, return error message
if (!weatherData.ok) {
    throw new Error(`Weather API error: ${weatherData.status}`);
}

// Parse the weather data
const weatherDataJson = await weatherData.json();

// Cache the weather data for 10 minutes (600 seconds)
await weatherCache.put(cacheKey, JSON.stringify(weatherDataJson), {
    expirationTtl: 600,
});

// Return the weather data with a cache status header
return new Response(JSON.stringify(weatherDataJson), {
    status: 200,
    headers: {
        "Content-Type": "application/json",
        "X-Cache-Status": "MISS"
            },
});

// Add error handling
} catch (error) {
    console.error("Error fetching or caching weather data:", error);
    return new Response(
        JSON.stringify({ error: "Failed to fetch weather data" }),
        {
            status: 502,
            headers: { "Content-Type": "application/json" },
        }
    );
}
};
```

- Fetches weather data for the user’s location.
- Stores the result in your Key Value Store for 10 minutes.
- Returns the data with a `X-Cache-Status: MISS` header.
- If error, return error message.

[6](https://developers.webflow.com/webflow-cloud/add-key-value-store#test-your-weather-api-endpoint)

### Test your weather API endpoint

Make sure your API route works as expected by sending a request from your terminal.

1. In your terminal, start your dev server using Cloudflare’s context.

```
npm run preview
```

2. In a new terminal, run:

```
curl http://localhost:<YOUR_PORT_NUMBER>/<YOUR_BASE_PATH>/api/weather
```

   - `<YOUR_PORT_NUMBER>` is the port number of your dev server.
   - `<YOUR_BASE_PATH>` is the base path of your project.
3. Check the response headers:

   - The first request should include `X-Cache-Status: MISS` (data fetched from the API and cached).
   - Subsequent requests should include `X-Cache-Status: HIT` (data returned from the cache).

If you see the expected headers and weather data in the response, your endpoint and caching are working!

## Update your home page

Now that your API is returning weather data, let’s display it directly on your home page. In this section, you’ll add a weather widget that shows the current temperature and a matching weather icon for your user’s location. This gives users instant, dynamic feedback and demonstrates how to connect your frontend to your new API.

[1](https://developers.webflow.com/webflow-cloud/add-key-value-store#add-weather-icons-to-your-project)

### Add weather icons to your project

Add weather icons to your project so you can visually represent the current weather.

```
npm install weather-icons
```

- Run this command in your project’s root directory.
- The `weather-icons` package provides a set of CSS classes for common weather conditions

[2](https://developers.webflow.com/webflow-cloud/add-key-value-store#map-weather-codes-to-icon-classes)

### Map weather codes to icon classes

Create a utility to translate weather codes from your API into icon classes for display.

1. In your project’s `src` directory, create a `utils` folder if it doesn’t already exist.
2. Inside `utils`, create a file named `iconMap.ts`.
3. Copy and paste the following code into `iconMap.ts`:

src/utils/iconMap.ts

```
    const ICON_MAP: { [key: number]: string } = {
        0: "wi-day-sunny", // Clear
        1: "wi-day-sunny-overcast", // Mostly Clear
        2: "wi-day-cloudy", // Partly Cloudy
        3: "wi-cloudy", // Overcast

        45: "wi-fog", // Fog
        48: "wi-fog", // Icy Fog

        51: "wi-sprinkle", // Light Drizzle
        53: "wi-showers", // Drizzle
        55: "wi-rain", // Heavy Drizzle

        56: "wi-rain-mix", // Light Freezing Drizzle
        57: "wi-rain-mix", // Freezing Drizzle

        61: "wi-raindrops", // Light Rain
        63: "wi-rain", // Rain
        65: "wi-rain-wind", // Heavy Rain

        66: "wi-rain-mix", // Light Freezing Rain
        67: "wi-rain-mix", // Freezing Rain

        71: "wi-snow", // Light Snow
        73: "wi-snow", // Snow
        75: "wi-snow-wind", // Heavy Snow

        77: "wi-snowflake-cold", // Snow Grains

        80: "wi-raindrops", // Light Showers
        81: "wi-rain", // Showers
        82: "wi-rain-wind", // Heavy Showers

        85: "wi-snow", // Light Snow Showers
        86: "wi-snow-wind", // Snow Showers

        95: "wi-thunderstorm", // Thunderstorm
        96: "wi-storm-showers", // Light T-storm w/ Hail
        99: "wi-storm-showers", // T-storm w/ Hail
    };

    export default ICON_MAP;
```

[3](https://developers.webflow.com/webflow-cloud/add-key-value-store#call-the-weather-api-from-your-home-page)

### Call the weather API from your home page

Fetch the latest weather data from your API and display it on your home page, along with the appropriate weather icon.

###### Astro

###### Next.js

1. Open your home page file. (for example, `src/pages/index.astro`)

2. Import the weather icons CSS and your icon map utility at the top of the file.

src/pages/index.astro

```
import 'weather-icons/css/weather-icons.css';
import ICON_MAP from '../utils/iconMap.js';
```

3. Fetch the weather data from your API and extract the temperature and weather code. Then, use the weather code to get the appropriate icon class from your icon map utility.

src/pages/index.astro

```
// Get the base URL for your API
const url = Astro.url.origin + import.meta.env.BASE_URL;

// Fetch weather data
const weather = await fetch(`${url}/api/weather`);
const weatherData = await weather.json();
const { temperature, weathercode } = weatherData?.current_weather;

// Map the weather code to an icon class
const iconClass = ICON_MAP[weathercode];
   ---
```

4. Display the weather data and icon in your page’s markup, below the welcome message:

src/pages/index.astro

```
<h1 class="margin-bottom-24px">Welcome to Webflow Cloud</h1>
<p class="margin-bottom-24px">This is a simple test using Basic components with enhanced styling.</p>
<h2>{temperature}°F <i class={`wi ${iconClass}`}></i></h2>
<div>
```

See the full code example below:

src/pages/index.astro

```
---
import Layout from '../layouts/Layout.astro';
import { Navbar } from '../../devlink/Navbar.jsx';
import { Section, Container, Block, Link } from '../../devlink/_Builtin/Basic';
import 'weather-icons/css/weather-icons.css';
import ICON_MAP from '../utils/iconMap.js';

// Get base url for API calls
const url = Astro.url.origin + import.meta.env.BASE_URL;

//  Get weather data
const weather = await fetch(`${url}/api/weather`);
console.log(weather);
const weatherData = await weather.json();
const { temperature, weathercode }: { temperature: number; weathercode: number } = weatherData?.current_weather;

const iconClass = ICON_MAP[weathercode];

---

<Layout>
<Navbar
/>
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
        <h2>{temperature}°F <i class={`wi ${iconClass}`}></i></h2>
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

## Test and deploy your app

Make sure your app is working as expected by running it locally and verifying the weather widget displays correctly.

[1](https://developers.webflow.com/webflow-cloud/add-key-value-store#start-your-development-server)

### Start your development server

Start your app in development mode with the Cloudflare context.

```
npm run preview
```

[2](https://developers.webflow.com/webflow-cloud/add-key-value-store#open-your-app-in-the-browser)

### Open your app in the browser

Visit your app in a web browser.

- Go to `http://<YOUR_PORT_NUMBER>/<YOUR_BASE_PATH>` to see your app running locally.

  - `<YOUR_PORT_NUMBER>` is the port number of your dev server.
  - `<YOUR_BASE_PATH>` is the base path of your project.

You should see your app running locally with the weather widget displaying the current temperature and weather icon.

![](https://files.buildwithfern.com/https://webflow.docs.buildwithfern.com/2025-11-12T14:56:23.206Z/products/webflow-cloud/pages/concepts/assets/weather.png)

[3](https://developers.webflow.com/webflow-cloud/add-key-value-store#deploy-your-app)

### Deploy your app

Deploy your app to Webflow Cloud. You can deploy your app in two ways:

1. Use the Webflow CLI

```
webflow cloud deploy
```

2. Commit and push your changes to your GitHub repository.

```
git add .
git commit -m "Deploying app to Webflow Cloud"
git push
```

Go to your environment in Webflow Cloud to see your app deployed. Once deployed, you can access your app at `https://<YOUR_DOMAIN>/<YOUR_BASE_PATH>`.

## Next steps

Congratulations! You’ve successfully added a Key Value Store to your Webflow Cloud app, built a weather API with caching, and displayed live weather data on your home page.

[![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/DeveloperToolsSDK.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/DeveloperToolsSDK.svg)\\
\\
Explore more Key Value Store features\\
\\
Learn how to manage data, set advanced expiration rules, and handle larger datasets in the Key Value Store documentation.](https://developers.webflow.com/webflow-cloud/storing-data/key-value-store) [![](https://dhygzobemt712.cloudfront.net/Icons/Dark/64px/CMS.svg)![](https://dhygzobemt712.cloudfront.net/Icons/Light/64px/CMS.svg)\\
\\
Compare storage options\\
\\
See how Key Value Store fits alongside other storage solutions in Webflow Cloud.](https://developers.webflow.com/webflow-cloud/storing-data/overview)

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