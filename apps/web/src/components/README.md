# Webflow RAG UI Components

This directory contains all React components for the Webflow RAG application UI. All components are built with TypeScript, Tailwind CSS, and follow accessibility best practices.

## Component Overview

### SearchBox.tsx
Main search input component for RAG queries.

**Features:**
- Auto-focus on mount
- Enter key submission
- Clear button when text is present
- Loading state with disabled input
- ARIA labels for screen readers
- Search icon and submit button

**Props:**
```typescript
interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}
```

**Usage:**
```tsx
<SearchBox
  onSearch={(query) => handleSearch(query)}
  isLoading={isSearching}
  autoFocus={true}
/>
```

---

### StreamingAnswer.tsx
Displays LLM responses with progressive rendering.

**Features:**
- Progressive rendering as content streams in
- Basic markdown formatting (headings, lists, code blocks, bold, italic)
- Smooth auto-scroll during streaming
- Copy to clipboard functionality
- Loading skeleton while waiting
- Error state with helpful messages
- Streaming indicator (animated dots)

**Props:**
```typescript
interface StreamingAnswerProps {
  content: string;
  isStreaming: boolean;
  isLoading: boolean;
  error?: string | null;
}
```

**Usage:**
```tsx
<StreamingAnswer
  content={answer}
  isStreaming={isStreaming}
  isLoading={isLoading}
  error={error}
/>
```

**Markdown Support:**
- Headers: `# H1`, `## H2`, `### H3`
- Lists: `- item` or `* item` (unordered), `1. item` (ordered)
- Code blocks: indent with 4 spaces or tab
- Inline code: `` `code` ``
- Bold: `**text**`
- Italic: `*text*`

---

### CitationList.tsx
Display sources/references for RAG answers.

**Features:**
- Card-based responsive grid layout
- Source type badges with icons (University, Blog, API Docs, Forum)
- External link indicators
- Section headings when available
- Hover states and smooth transitions
- Citation numbering

**Types:**
```typescript
interface Citation {
  uri: string;
  title: string;
  source_type?: string;
  section?: string;
}
```

**Props:**
```typescript
interface CitationListProps {
  citations: Citation[];
}
```

**Usage:**
```tsx
<CitationList
  citations={[
    {
      uri: "https://university.webflow.com/...",
      title: "Collections Guide",
      source_type: "university",
      section: "Creating Collections"
    }
  ]}
/>
```

**Source Types:**
- `university` - Webflow University (indigo)
- `blog` - Webflow Blog (purple)
- `api-docs` or `api` - API Documentation (blue)
- `forum` - Forum posts (green)
- Default - Generic documentation (gray)

---

### FeedbackWidget.tsx
Collect user feedback on RAG responses.

**Features:**
- Thumbs up/down buttons with filled/outlined states
- Optional detailed feedback form (expandable for thumbs down)
- Thank you message after submission
- Async feedback submission
- Subtle, non-intrusive design
- Keyboard accessible

**Props:**
```typescript
interface FeedbackWidgetProps {
  responseId?: string;
  onFeedback?: (helpful: boolean, issueReport?: string) => Promise<void>;
}
```

**Usage:**
```tsx
<FeedbackWidget
  responseId={responseId}
  onFeedback={async (helpful, report) => {
    await submitFeedback(helpful, report);
  }}
/>
```

**Behavior:**
- Thumbs up: Submits immediately
- Thumbs down: Shows optional text area for detailed feedback
- Fallback: Posts to `/api/feedback` if no `onFeedback` prop

---

### HistoryView.tsx
Display and manage search history.

**Features:**
- Stores recent queries in localStorage (client-side, MVP)
- Click to re-run previous query
- Clear individual items or entire history
- Collapsible dropdown design
- Responsive (hidden on small screens, expandable on desktop)
- Relative timestamps (e.g., "2 hours ago")

**Props:**
```typescript
interface HistoryViewProps {
  onQuerySelect: (query: string) => void;
  currentQuery?: string;
}
```

**Usage:**
```tsx
<HistoryView
  onQuerySelect={(query) => handleSearch(query)}
  currentQuery={currentQuery}
/>
```

**Storage:**
- Key: `webflow-rag-history`
- Max items: 10
- Auto-deduplication
- Auto-saves on query submission

---

## Design Patterns

### Color Palette
- **Primary**: Indigo (`#4F46E5`, `indigo-600`)
- **Secondary**: Purple (`purple-600`)
- **Success**: Green (`green-600`)
- **Error**: Red (`red-600`)
- **Neutral**: Gray scales (`gray-50` to `gray-900`)

### Responsive Breakpoints
```css
/* Mobile first */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
```

### Typography
- **Font**: Geist Sans (loaded in layout.tsx)
- **Headings**: Bold, tracking-tight
- **Body**: Regular, line-height-relaxed
- **Code**: Geist Mono

### Spacing
Consistent spacing using Tailwind scale:
- Micro: `gap-2`, `p-2` (8px)
- Small: `gap-3`, `p-3` (12px)
- Medium: `gap-4`, `p-4` (16px)
- Large: `gap-6`, `p-6` (24px)
- XLarge: `gap-8`, `p-8` (32px)

### Accessibility
All components follow WCAG AA standards:
- Semantic HTML (buttons, links, headings)
- ARIA labels on interactive elements
- Keyboard navigation (Tab, Enter, Escape)
- Focus states (ring-2, ring-offset-2)
- Color contrast ratios (4.5:1 minimum)
- Screen reader support

---

## Testing Checklist

Before deploying, verify:

### Keyboard Navigation
- [ ] Tab through all interactive elements in logical order
- [ ] Enter key submits search
- [ ] Escape key closes modals/dropdowns
- [ ] Focus states are visible

### Mobile Responsiveness
- [ ] Test on 320px width (iPhone SE)
- [ ] Test on 375px width (iPhone 12)
- [ ] Test on 768px width (iPad)
- [ ] Touch targets are 44px minimum
- [ ] Text is readable without zoom

### Dark Mode
- [ ] All components support dark mode
- [ ] Color contrast maintained
- [ ] Icons and borders visible

### Error States
- [ ] Network failures show helpful messages
- [ ] Rate limits display properly
- [ ] Retry/refresh options available

### Performance
- [ ] No layout shift during streaming
- [ ] Smooth animations (60fps)
- [ ] Fast initial render
- [ ] Optimized images

---

## Component Dependencies

External packages:
- `@heroicons/react` - Icon library
- `react` - Component framework
- `tailwindcss` - Styling

Internal dependencies:
- None (all components are self-contained)

---

## Future Enhancements

Potential improvements for future phases:

1. **SearchBox**
   - Voice input support
   - Search suggestions/autocomplete
   - Advanced filters (source type, date range)

2. **StreamingAnswer**
   - Full markdown library (remark/rehype)
   - Syntax highlighting for code blocks
   - LaTeX math rendering
   - Export to PDF/Markdown

3. **CitationList**
   - Inline citations (numbered references in text)
   - Preview on hover
   - Sort/filter citations

4. **FeedbackWidget**
   - Star ratings (1-5)
   - Categorized issues (incorrect, incomplete, irrelevant)
   - Follow-up questions

5. **HistoryView**
   - Cloud sync (requires auth)
   - Favorites/bookmarks
   - Export history
   - Search within history

---

## Code Style

All components follow these conventions:

```typescript
// 1. Client component declaration (if needed)
'use client';

// 2. Imports (external, then internal, then types)
import { useState } from 'react';
import { SomeIcon } from '@heroicons/react/24/outline';
import type { SomeType } from './types';

// 3. Type definitions
interface ComponentProps {
  // Props
}

// 4. Main component with JSDoc
/**
 * Component description
 *
 * Features:
 * - Feature 1
 * - Feature 2
 */
export function Component({ ...props }: ComponentProps) {
  // Implementation
}

// 5. Helper functions/components (not exported)
function HelperFunction() {
  // Implementation
}
```

---

## Questions or Issues?

For component-related questions:
1. Check this README
2. Review component source code (well-commented)
3. Check CLAUDE.md for architecture decisions
4. Open an issue on GitHub

---

**Last Updated**: 2025-11-15
**Phase**: 3 (UI & Polish)
