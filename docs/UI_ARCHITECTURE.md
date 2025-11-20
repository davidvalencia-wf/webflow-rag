# UI Architecture - Webflow RAG

Visual representation of the UI component hierarchy and data flow.

---

## Component Hierarchy

```
page.tsx (Client Component)
│
├─ Header (inline)
│  ├─ Logo + Title
│  └─ HistoryView
│     └─ Dropdown Panel
│        ├─ History Items (buttons)
│        └─ Clear All Button
│
├─ Main Content
│  │
│  ├─ Hero Section (conditional: !showResults)
│  │  ├─ Heading
│  │  └─ Description
│  │
│  ├─ SearchBox
│  │  ├─ Search Icon
│  │  ├─ Input Field
│  │  ├─ Clear Button (conditional)
│  │  └─ Submit Button
│  │
│  ├─ Example Questions (conditional: !showResults)
│  │  └─ Question Buttons (6x)
│  │
│  └─ Results Section (conditional: showResults)
│     │
│     ├─ Query Display
│     │
│     ├─ StreamingAnswer
│     │  ├─ Copy Button
│     │  ├─ Formatted Content
│     │  │  ├─ Headings
│     │  │  ├─ Paragraphs
│     │  │  ├─ Lists
│     │  │  └─ Code Blocks
│     │  └─ Streaming Indicator (conditional)
│     │
│     ├─ CitationList (conditional: citations.length > 0)
│     │  └─ Citation Cards (grid)
│     │     ├─ Source Badge
│     │     ├─ Title
│     │     ├─ Section
│     │     ├─ Domain
│     │     └─ Citation Number
│     │
│     └─ FeedbackWidget (conditional: !isStreaming && answer)
│        ├─ Thumbs Up/Down Buttons
│        └─ Feedback Form (conditional)
│           ├─ Text Area
│           ├─ Submit Button
│           └─ Skip Button
│
└─ Footer (inline)
   ├─ Credits
   └─ Links
```

---

## Data Flow

### 1. User Submits Query

```
User Action
    ↓
SearchBox.onSearch(query)
    ↓
page.tsx: handleSearch(query)
    ↓
State Updates:
  - setQuery(query)
  - setAnswer('')
  - setCitations([])
  - setIsLoading(true)
    ↓
fetch('/api/ask', { query })
```

---

### 2. Streaming Response

```
/api/ask (Server)
    ↓
Server-Sent Events (SSE)
    ↓
page.tsx: ReadableStream
    ↓
Parse stream events:
  - type: 'chunk'  → setAnswer(prev + content)
  - type: 'done'   → setCitations(sources)
  - type: 'error'  → setError(message)
    ↓
StreamingAnswer re-renders
  ↓
Auto-scroll to bottom
```

---

### 3. Display Results

```
State Updates Complete
    ↓
Render Components:
  ├─ StreamingAnswer (content, isStreaming)
  ├─ CitationList (citations)
  └─ FeedbackWidget (responseId)
```

---

### 4. User Provides Feedback

```
User clicks 👍 or 👎
    ↓
FeedbackWidget: handleThumbsClick(helpful)
    ↓
If 👎: Show feedback form
If 👍: Submit immediately
    ↓
fetch('/api/feedback', { helpful, issue_report })
    ↓
Show thank you message
```

---

### 5. History Management

```
Query Submitted
    ↓
page.tsx: useEffect([currentQuery])
    ↓
HistoryView: addToHistory(query)
    ↓
localStorage.setItem('webflow-rag-history', [...])
    ↓
HistoryView re-renders with new item
    ↓
User clicks history item
    ↓
HistoryView.onQuerySelect(query)
    ↓
page.tsx: handleHistorySelect(query)
    ↓
handleSearch(query) [back to step 1]
```

---

## State Management

### page.tsx State
```typescript
const [query, setQuery] = useState('');              // Current query text
const [answer, setAnswer] = useState('');            // LLM response (streaming)
const [citations, setCitations] = useState<Citation[]>([]); // Source references
const [isLoading, setIsLoading] = useState(false);   // Before streaming starts
const [isStreaming, setIsStreaming] = useState(false); // During streaming
const [error, setError] = useState<string | null>(null); // Error message
const [responseId, setResponseId] = useState<string | null>(null); // For feedback
```

### Component Props Flow
```
page.tsx
  │
  ├─ SearchBox
  │   Props: { onSearch, isLoading }
  │
  ├─ StreamingAnswer
  │   Props: { content, isStreaming, isLoading, error }
  │
  ├─ CitationList
  │   Props: { citations }
  │
  ├─ FeedbackWidget
  │   Props: { responseId }
  │
  └─ HistoryView
      Props: { onQuerySelect, currentQuery }
```

---

## Event Handlers

### SearchBox
```typescript
onSearch(query: string) → page.handleSearch(query)
```

### StreamingAnswer
```typescript
handleCopy() → navigator.clipboard.writeText(content)
```

### CitationList
```typescript
onClick(uri) → window.open(uri, '_blank')
```

### FeedbackWidget
```typescript
handleThumbsClick(helpful: boolean) → submitFeedback()
handleFeedbackSubmit(e) → fetch('/api/feedback')
```

### HistoryView
```typescript
onQuerySelect(query: string) → page.handleHistorySelect(query)
handleClear(timestamp) → removeFromHistory()
clearHistory() → localStorage.removeItem()
```

---

## API Integration Points

### 1. POST /api/ask
**Request**:
```json
{
  "query": "How do I create a collection?"
}
```

**Response** (Server-Sent Events):
```
data: {"type":"chunk","content":"To create"}
data: {"type":"chunk","content":" a collection"}
...
data: {"type":"done","sources":[{"uri":"...","title":"..."}]}
```

### 2. POST /api/feedback
**Request**:
```json
{
  "response_id": "uuid",
  "helpful": true,
  "issue_report": "optional text"
}
```

**Response**:
```json
{
  "feedback_id": "uuid"
}
```

---

## Local Storage

### History Storage
**Key**: `webflow-rag-history`

**Format**:
```json
[
  { "query": "How do I...", "timestamp": 1699900000000 },
  { "query": "What is...", "timestamp": 1699900100000 }
]
```

**Operations**:
- Load: `localStorage.getItem()` on mount
- Save: `localStorage.setItem()` after each query
- Clear: `localStorage.removeItem()` on user action
- Max items: 10 (auto-trim oldest)

---

## Conditional Rendering

### Hero Section
```typescript
{!showResults && (
  <HeroSection />
)}
```
**Shows when**: No answer and no error

---

### Example Questions
```typescript
{!showResults && (
  <ExampleQuestions />
)}
```
**Shows when**: No answer and no error

---

### Results Section
```typescript
{showResults && (
  <ResultsSection />
)}
```
**Shows when**: Answer exists OR error exists

---

### Citations
```typescript
{citations.length > 0 && (
  <CitationList />
)}
```
**Shows when**: API returns sources

---

### Feedback Widget
```typescript
{!isStreaming && !isLoading && answer && !error && (
  <FeedbackWidget />
)}
```
**Shows when**: Answer is complete and no errors

---

### Streaming Indicator
```typescript
{isStreaming && (
  <StreamingIndicator />
)}
```
**Shows when**: Receiving stream data

---

## Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Full-width search box
- Stacked example questions
- History hidden (collapsible only)
- Single column citations
- Simplified header

### Tablet (640px - 1024px)
- 2-column example questions
- 2-column citations
- Header with logo + history
- Wider search box

### Desktop (> 1024px)
- 3-column example questions
- 3-column citations
- Full header with all elements
- Max-width container (1280px)

---

## Accessibility Tree

### Semantic Structure
```html
<html lang="en">
  <body>
    <header role="banner">
      <div role="img">Logo</div>
      <h1>Webflow AI Assistant</h1>
      <nav>
        <button aria-expanded="false">Recent searches</button>
      </nav>
    </header>

    <main role="main">
      <section aria-label="Search">
        <form role="search">
          <input aria-label="Search query" />
          <button type="submit">Ask</button>
        </form>
      </section>

      <section aria-label="Results" aria-live="polite">
        <div role="article">
          <!-- Answer content -->
        </div>

        <nav aria-label="Sources">
          <!-- Citations -->
        </nav>

        <form aria-label="Feedback">
          <!-- Feedback widget -->
        </form>
      </section>
    </main>

    <footer role="contentinfo">
      <!-- Footer links -->
    </footer>
  </body>
</html>
```

---

## Performance Optimizations

### Client-Side
1. **Server Components by default**: Only interactive components use 'use client'
2. **Lazy loading**: History dropdown only renders when opened
3. **Debouncing**: None needed (submit on Enter or click only)
4. **Memoization**: Could add React.memo to CitationCard (future optimization)

### Network
1. **Streaming**: Progressive rendering (no waiting for full response)
2. **Caching**: Browser caches static assets
3. **Compression**: Gzip on Cloudflare edge
4. **CDN**: Static files served from edge

### Bundle
1. **Tree-shaking**: Tailwind purges unused classes
2. **Code splitting**: Next.js automatic chunking
3. **Icon optimization**: Only import used Heroicons
4. **No heavy deps**: No moment.js, lodash, etc.

---

## Error Boundaries

### Current Implementation
```typescript
try {
  const response = await fetch('/api/ask');
  // Handle response
} catch (err) {
  setError(err.message);
  setIsStreaming(false);
}
```

### Future: React Error Boundary
```typescript
// apps/web/src/components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  // Catch component rendering errors
}

// Wrap entire app
<ErrorBoundary>
  <HomePage />
</ErrorBoundary>
```

---

## Animation Flow

### Page Load
```
1. Fade in hero section (0.3s)
2. Auto-focus search box
3. Fade in example questions (0.3s, staggered)
```

### Query Submission
```
1. Search box: Show loading spinner
2. Hide example questions (fade out 0.2s)
3. Show loading skeleton (fade in 0.3s)
```

### Streaming Answer
```
1. Remove skeleton (fade out 0.2s)
2. Show answer container (fade in 0.3s)
3. Progressive text rendering (no animation, just append)
4. Auto-scroll to bottom (smooth scroll)
```

### Citations Appear
```
1. Fade in citations section (0.3s)
2. Slide in each card (0.2s, staggered by 50ms)
```

### Feedback Interaction
```
1. Hover: Scale up 1.05 (0.2s)
2. Click: Fill icon (0.1s)
3. Thank you: Fade in green background (0.3s)
```

---

## CSS Architecture

### Tailwind Utilities
```css
/* Layout */
.flex, .grid, .block, .inline-flex

/* Spacing */
.p-{size}, .m-{size}, .gap-{size}

/* Colors */
.bg-{color}, .text-{color}, .border-{color}

/* Typography */
.text-{size}, .font-{weight}, .leading-{height}

/* Responsive */
.sm:{class}, .md:{class}, .lg:{class}

/* States */
.hover:{class}, .focus:{class}, .disabled:{class}

/* Animations */
.transition-{property}, .duration-{time}, .animate-{name}
```

### Custom Classes (globals.css)
```css
.animate-fadeIn       /* Custom fade-in animation */
::-webkit-scrollbar   /* Custom scrollbar */
*:focus-visible       /* Focus outline override */
```

---

## Testing Strategy

### Manual Testing
1. **Functionality**: Each component's features
2. **Responsive**: Test at 5 breakpoints
3. **Accessibility**: Keyboard navigation, screen reader
4. **Browser**: Chrome, Safari, Firefox, Edge
5. **Mobile**: iOS Safari, Chrome Mobile

### Automated Testing (Future)
```typescript
// SearchBox.test.tsx
describe('SearchBox', () => {
  it('submits query on Enter key', () => {});
  it('disables submit when empty', () => {});
  it('shows loading state', () => {});
});

// StreamingAnswer.test.tsx
describe('StreamingAnswer', () => {
  it('renders markdown correctly', () => {});
  it('copies to clipboard', () => {});
  it('shows error state', () => {});
});
```

---

## Deployment Considerations

### Environment Variables
None required for UI (all client-side or static)

### Build Output
```
.next/
├── static/           # Static assets
├── server/           # Server components
└── standalone/       # Cloudflare Workers adapter
```

### Edge Compatibility
✅ All components work on Cloudflare Workers edge runtime
✅ No Node.js-specific APIs used
✅ No filesystem access
✅ No server-only packages in client code

---

**Last Updated**: 2025-11-15
**Diagrams**: Text-based (can be converted to visual diagrams later)
