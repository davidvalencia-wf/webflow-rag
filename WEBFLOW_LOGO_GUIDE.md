# Webflow Logo Implementation Guide

## Official Brand Assets

**Download Official Logos:** https://brand.webflow.com/brand-assets

### Available Formats
- **Full Logo** (wordmark): Blue+White, Blue+Black, Black, White
- **Mark** (W symbol): Blue, Black, White
- **Icon** (social): Circle and square formats
- **Formats**: SVG (recommended) and PNG

### Brand Colors
- **Primary Blue**: `#146EF5`
- **Black**: `#080808`
- **White**: `#FFFFFF`

## Quick Implementation

### 1. Using the Component (Current Setup)

I've created a `WebflowLogo` component for quick use:

```tsx
import { WebflowLogo, WebflowMark } from '@/components';

// Full wordmark logo
<WebflowLogo variant="white" size={120} />

// Just the W mark
<WebflowMark variant="blue" size={40} />
```

**Props:**
- `variant`: `'blue'` | `'white'` (default: `'blue'`)
- `size`: Width in pixels (default: 120 for full logo, 40 for mark)
- `className`: Additional CSS classes

### 2. Add Logo to Homepage

Add to the top of your page (apps/web/src/app/page.tsx):

```tsx
import { WebflowLogo } from '@/components';

export default function Home() {
  return (
    <div className="min-h-screen bg-webflow-gray-900">
      {/* Header with logo */}
      <header className="w-full px-6 py-8">
        <WebflowLogo variant="white" size={120} />
      </header>

      {/* Rest of your content */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        {/* ... */}
      </main>
    </div>
  );
}
```

### 3. Add Logo to Layout (Persistent Header)

For a logo that appears on all pages, add to `apps/web/src/app/layout.tsx`:

```tsx
import { WebflowLogo } from '@/components/WebflowLogo';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} antialiased`}>
        <nav className="fixed top-0 left-0 right-0 bg-webflow-gray-900/80 backdrop-blur-sm border-b border-webflow-gray-700 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <WebflowLogo variant="white" size={100} />

            {/* Optional: Add navigation links */}
            <div className="flex gap-6">
              <a href="/" className="text-webflow-gray-300 hover:text-white transition-colors">
                Home
              </a>
              <a href="/about" className="text-webflow-gray-300 hover:text-white transition-colors">
                About
              </a>
            </div>
          </div>
        </nav>

        {/* Add top padding to account for fixed header */}
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  );
}
```

## Best Practices (Webflow Brand Guidelines)

### Logo Usage

✅ **DO:**
- Use the blue logo whenever possible (#146EF5)
- Use white logo on dark backgrounds (#171717, #222222)
- Maintain clearspace equal to logo height on all sides
- Keep logo proportions intact (don't stretch or distort)
- Use official SVG from brand.webflow.com for production

❌ **DON'T:**
- Don't use other colors (only blue, black, white)
- Don't rotate or skew the logo
- Don't add effects (drop shadows, gradients, outlines)
- Don't place on busy backgrounds
- Don't make it smaller than 80px wide for full logo

### Clearspace

The logo should have breathing room equal to the height of the logo:

```tsx
<div className="p-8"> {/* Padding = logo height */}
  <WebflowLogo variant="white" size={120} />
</div>
```

### Accessibility

```tsx
<WebflowLogo
  variant="white"
  size={120}
  className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-webflow-blue rounded"
/>
```

## Recommended Placements

### 1. Top Left (Traditional)
```tsx
<header className="fixed top-0 left-0 p-6">
  <WebflowLogo variant="white" size={100} />
</header>
```

### 2. Center Top (Hero Style - Current Design)
```tsx
<div className="text-center">
  <WebflowLogo variant="white" size={140} className="mx-auto mb-8" />
  <h1>Ask anything about Webflow</h1>
</div>
```

### 3. Footer Branding
```tsx
<footer className="mt-20 border-t border-webflow-gray-700 pt-8">
  <WebflowMark variant="blue" size={32} className="mb-4" />
  <p className="text-webflow-gray-400 text-sm">
    Built with Webflow Cloud and OpenAI
  </p>
</footer>
```

## Using Official SVG (Production Recommendation)

### Step 1: Download Official Logo

1. Visit https://brand.webflow.com/brand-assets
2. Download **"Full Logo - Blue + White"** in **SVG** format
3. Save to `apps/web/public/webflow-logo.svg`

### Step 2: Use in Your App

```tsx
import Image from 'next/image';

<Image
  src="/webflow-logo.svg"
  alt="Webflow"
  width={120}
  height={29} // Maintain ~5:1 aspect ratio
  priority // Loads faster
/>
```

### Step 3: Optimize SVG (Optional)

```bash
# Install SVGO
npm install -g svgo

# Optimize the downloaded SVG
svgo apps/web/public/webflow-logo.svg
```

## Advanced: Animated Logo

Add a subtle hover effect:

```tsx
<WebflowLogo
  variant="white"
  size={120}
  className="transition-transform duration-300 hover:scale-105"
/>
```

## Contact

For custom usage requests or questions about brand assets:
**brand@webflow.com**

## Current Implementation Status

- ✅ WebflowLogo component created
- ✅ WebflowMark component created
- ⏳ Logo not yet added to UI (awaiting your preference)
- ⏳ Official SVG not downloaded (use component or download from brand.webflow.com)

## Next Steps

1. **Download official logo** from https://brand.webflow.com/brand-assets
2. **Save to** `apps/web/public/webflow-logo.svg`
3. **Add to page.tsx** or layout.tsx using one of the examples above
4. **Review** the Design Guidelines PDF from Webflow's brand page

---

**Note:** The current `WebflowLogo` component contains a simplified SVG for quick prototyping. For production, replace with the official SVG from Webflow's brand assets page.
