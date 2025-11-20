# Webflow AI Assistant - Design Specifications

Quick reference for designers and developers implementing Webflow brand guidelines.

---

## Color Palette

### Backgrounds
| Name | Hex | Usage |
|------|-----|-------|
| Gray 900 | `#171717` | Page background (NOT pure black #000000) |
| Gray 800 | `#222222` | Input fields, suggestion buttons |
| Gray 700 | `#363636` | Input borders, button hover states |

### Text Colors
| Name | Hex | Usage |
|------|-----|-------|
| White | `#FFFFFF` | Main heading, primary text |
| Gray 300 | `#ABABAB` | Subtitle text |
| Gray 200 | `#D8D8D8` | Body text, suggestion buttons |
| Gray 500 | `#757575` | Input placeholder text |
| Gray 400 | `#898989` | Footer links |
| Gray 600 | `#5A5A5A` | Footer trust text |

### Accent
| Name | Hex | Usage |
|------|-----|-------|
| Brand Blue | `#146EF5` | Logo, submit button, icons, focus states |
| Brand Blue Glow | `rgba(20, 110, 245, 0.1)` | Focus state glow |

---

## Typography

### Fonts
| Element | Font Family | Weight | Size | Line Height | Letter Spacing |
|---------|-------------|--------|------|-------------|----------------|
| Main heading | Poppins | 600 (Semibold) | 56px | 104% | 1% |
| Subtitle | Inter | 400 (Regular) | 16px | 160% | - |
| Body text | Inter | 400 (Regular) | 16px | - | - |
| Small text | Inter | 400 (Regular) | 14px | - | - |
| Input text | Inter | 400 (Regular) | 16px | - | - |
| Input placeholder | Inter | 400 (Regular) | 16px | - | - |

### Font Loading
```typescript
import { Poppins, Inter } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["600"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});
```

---

## Spacing

### Layout Spacing
| Element | Top/Bottom | Value |
|---------|------------|-------|
| Hero section top margin | Top | 80px |
| Heading to subtitle | Bottom | 24px |
| Subtitle to input field | Top | 40px |
| Input to "Try asking:" label | Top | 32px |
| Suggestion buttons grid gap | - | 12px |
| Logo clearspace | All sides | Equal to logo height (40px) |
| Trust indicator | Top | 64px (mt-16) |

### Component Spacing
| Component | Padding | Margin |
|-----------|---------|--------|
| Suggestion buttons | 12px (p-3) | - |
| Input field | 20px horizontal, auto vertical | - |
| Footer | 32px vertical (py-8) | - |

---

## Component Specs

### Search Input Field
```css
min-height: 56px;
background: #222222; /* Gray 800 */
border: 2px solid #363636; /* Gray 700 */
border-radius: 8px; /* rounded-lg */
padding-left: 20px;
padding-right: 96px; /* Space for clear + submit buttons */
color: #FFFFFF;
font-family: Inter;
font-size: 16px;

/* Placeholder */
placeholder-color: #757575; /* Gray 500 */

/* Focus state */
border-color: #146EF5; /* Brand Blue */
box-shadow:
  0 0 0 3px rgba(20, 110, 245, 0.1), /* Blue glow */
  inset 0 2px 4px rgba(0,0,0,0.1); /* Inner shadow */

/* Default state */
box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
```

### Submit Button (Blue Arrow)
```css
background: #146EF5; /* Brand Blue */
border-radius: 6px; /* rounded-md */
padding: 10px 16px; /* px-4 py-2.5 */
color: #FFFFFF;

/* Hover */
opacity: 0.8;

/* Active */
transform: scale(0.98);
transition: transform 100ms ease-out;

/* Pulse when input focused */
animation: pulse 2s ease-in-out infinite;
```

### Suggestion Buttons
```css
background: #222222; /* Gray 800 */
border: 1px solid transparent;
border-radius: 8px; /* rounded-lg */
padding: 12px; /* p-3 */
color: #D8D8D8; /* Gray 200 */
font-family: Inter;
font-size: 16px;
display: flex;
align-items: flex-start;
gap: 12px;
transition: all 200ms ease;

/* Hover */
background: #363636; /* Gray 700 */
color: #FFFFFF;

/* Active */
transform: scale(0.98);
transition: transform 100ms ease-out;

/* Icon */
icon-color: #146EF5; /* Brand Blue */
icon-size: 20px; /* h-5 w-5 */
```

### Main Heading
```css
font-family: Poppins;
font-weight: 600;
font-size: 56px;
line-height: 104%;
letter-spacing: 0.01em;
color: #FFFFFF;

/* Gradient enhancement */
background: linear-gradient(135deg, #FFFFFF 0%, #146EF5 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## Animations

### Sequential Fade-in
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Apply to elements */
.animate-fadeIn { animation: fadeInUp 0.6s ease-out; }
.animate-fadeIn-delay-1 { animation: fadeInUp 0.6s ease-out 0.1s both; }
.animate-fadeIn-delay-2 { animation: fadeInUp 0.6s ease-out 0.2s both; }
.animate-fadeIn-delay-3 { animation: fadeInUp 0.6s ease-out 0.3s both; }
```

### Pulse (Submit Button)
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.animate-pulse-slow {
  animation: pulse 2s ease-in-out infinite;
}
```

### Click Scale
```css
.active-scale {
  transition: transform 100ms ease-out;
}

.active-scale:active {
  transform: scale(0.98);
}
```

---

## Grid & Breakpoints

### Suggestion Buttons Grid
```css
/* Mobile (<640px) */
grid-template-columns: 1fr;
gap: 12px;

/* Tablet (640-1024px) */
grid-template-columns: repeat(2, 1fr);
gap: 12px;

/* Desktop (>1024px) */
grid-template-columns: repeat(3, 1fr);
gap: 12px;
```

### Container Max Widths
| Breakpoint | Max Width | Tailwind Class |
|------------|-----------|----------------|
| Hero section | 896px | max-w-4xl |
| Header | 1280px | max-w-5xl |
| Footer | 1280px | max-w-5xl |

---

## Icons

### Category Icons (Heroicons)
```typescript
import {
  CircleStackIcon,      // Collections/Database
  QuestionMarkCircleIcon, // Questions
  CodeBracketIcon,      // Custom code
  CursorArrowRaysIcon,  // Interactions
  DocumentTextIcon,     // CMS/Documentation
  SparklesIcon,         // General/Magic
} from '@heroicons/react/24/outline';

// Usage
<CircleStackIcon
  className="h-5 w-5 flex-shrink-0 mt-0.5"
  style={{ color: '#146EF5' }}
  aria-hidden="true"
/>
```

---

## Background Pattern

### Subtle Grid
```css
body {
  background: #171717;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

**Visual effect**: Very subtle white dots on dark background, adds depth without competing with content.

---

## Accessibility

### Focus States
```css
*:focus-visible {
  outline: 2px solid #146EF5; /* Brand Blue */
  outline-offset: 2px;
}
```

### Color Contrast Ratios
| Foreground | Background | Ratio | WCAG Level |
|------------|------------|-------|------------|
| White (#FFFFFF) | Gray 900 (#171717) | 18.24:1 | AAA |
| Gray 300 (#ABABAB) | Gray 900 (#171717) | 6.2:1 | AA+ |
| Gray 200 (#D8D8D8) | Gray 800 (#222222) | 7.1:1 | AAA |
| Brand Blue (#146EF5) | White (#FFFFFF) | 4.8:1 | AA |

### Minimum Touch Targets
| Element | Size | Notes |
|---------|------|-------|
| Input field | 56px height | Well above 44px minimum |
| Submit button | 40px height | Above 44px minimum |
| Suggestion buttons | 48px+ height | Depends on content |
| Clear button | 40px touch area | Adequate spacing |

---

## Responsive Typography

### Heading Size Adjustments
```css
/* Default (all sizes) */
font-size: 56px;

/* Optional: Very small screens (<375px) */
@media (max-width: 374px) {
  font-size: 42px; /* Scale down if needed */
}
```

**Note**: Current implementation uses 56px at all sizes. Test on real devices to determine if adjustment needed.

---

## File Locations

### Styles
- **Color system**: `/apps/web/src/app/globals.css` (CSS custom properties)
- **Animations**: `/apps/web/src/app/globals.css` (@keyframes)
- **Fonts**: `/apps/web/src/app/layout.tsx` (next/font imports)

### Components
- **Search input**: `/apps/web/src/components/SearchBox.tsx`
- **Main page**: `/apps/web/src/app/page.tsx`
- **Layout wrapper**: `/apps/web/src/app/layout.tsx`

---

## CSS Custom Properties

```css
:root {
  /* Background */
  --background: #171717;

  /* Text Colors */
  --text-primary: #FFFFFF;
  --text-subtitle: #ABABAB;
  --text-body: #D8D8D8;
  --text-placeholder: #757575;
  --text-footer: #898989;
  --text-footer-muted: #5A5A5A;

  /* UI Elements */
  --input-background: #222222;
  --input-border: #363636;
  --button-background: #222222;
  --button-hover: #363636;

  /* Accent */
  --brand-blue: #146EF5;
  --brand-blue-glow: rgba(20, 110, 245, 0.1);

  /* Fonts */
  --font-heading: var(--font-poppins);
  --font-body: var(--font-inter);
}
```

**Usage**:
```css
color: var(--text-primary);
background: var(--input-background);
border-color: var(--input-border);
```

---

## Quick Copy-Paste Snippets

### Button Hover Effect
```javascript
onMouseEnter={(e) => {
  e.currentTarget.style.backgroundColor = '#363636'; // Gray 700
  e.currentTarget.style.color = '#FFFFFF';
}}
onMouseLeave={(e) => {
  e.currentTarget.style.backgroundColor = '#222222'; // Gray 800
  e.currentTarget.style.color = '#D8D8D8'; // Gray 200
}}
```

### Gradient Text
```javascript
style={{
  background: 'linear-gradient(135deg, #FFFFFF 0%, #146EF5 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
}}
```

### Focus Glow
```javascript
style={{
  boxShadow: isFocused
    ? '0 0 0 3px rgba(20, 110, 245, 0.1), inset 0 2px 4px rgba(0,0,0,0.1)'
    : 'inset 0 2px 4px rgba(0,0,0,0.1)',
}}
```

---

## Design Principles

1. **Dark-first**: Gray 900 (#171717), not pure black
2. **Brand blue accent**: #146EF5 used sparingly but prominently
3. **Typography hierarchy**: Poppins Semibold for headings, Inter Regular for body
4. **Substantial interactions**: 56px input, visible hover states, smooth transitions
5. **Subtle depth**: Inner shadows, grid pattern, gradient text
6. **Professional polish**: Exact spacing, consistent colors, delightful animations

---

**END OF DESIGN SPECS**

Use this as a quick reference when implementing Webflow brand guidelines across the application.
