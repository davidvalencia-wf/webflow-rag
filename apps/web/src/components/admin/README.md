# Admin Dashboard Components

Production-ready admin dashboard components with Webflow branding and beautiful data visualizations.

## Components

### AdminLayout

Main layout component with sidebar navigation and header.

**Features:**
- Collapsible sidebar
- Active tab highlighting
- Refresh and Export actions
- Responsive design
- Smooth animations

**Usage:**
```tsx
<AdminLayout
  activeTab={activeTab}
  onTabChange={setActiveTab}
  onRefresh={() => fetchData()}
  onExport={handleExport}
>
  {children}
</AdminLayout>
```

---

### MetricCard

Beautiful stat card with trend indicators and icons.

**Props:**
- `title` - Card title
- `value` - Number or string to display
- `trend` - Optional trend percentage (positive/negative)
- `icon` - Optional icon (emoji or React element)
- `subtitle` - Optional subtitle for trend
- `color` - Optional background color

**Usage:**
```tsx
<MetricCard
  title="Total Queries"
  value={1234}
  trend={12.5}
  icon="📊"
  subtitle="vs last week"
/>
```

---

### Badge

Status badges for priority, sentiment, trends, and more.

**Variants:**
- `priority` - High/Medium/Low (red/yellow/green)
- `sentiment` - Positive/Neutral/Negative
- `status` - Rising/Falling/Stable
- `trend` - Numeric trend with arrows

**Usage:**
```tsx
<Badge variant="priority" value="high" />
<Badge variant="trend" value={15.5} label="vs last month" />
```

---

### DataTable

Styled table with sorting, hover states, and empty states.

**Features:**
- Sortable columns
- Alternating row colors
- Custom cell rendering
- Responsive design
- Empty state handling

**Usage:**
```tsx
<DataTable
  columns={[
    { key: 'name', label: 'Name' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <Badge variant="status" value={value} />
    }
  ]}
  data={items}
  emptyMessage="No data available"
/>
```

---

### ChartContainer

Wrapper for Recharts components with consistent styling.

**Features:**
- Title and actions
- Card lift effect
- Dark theme styling
- Responsive container

**Usage:**
```tsx
<ChartContainer title="Queries Over Time">
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      {/* Chart components */}
    </LineChart>
  </ResponsiveContainer>
</ChartContainer>
```

---

### LoadingState

Skeleton loaders for data fetching states.

**Types:**
- `card` - Loading cards (default)
- `table` - Loading table rows
- `chart` - Loading chart placeholder
- `text` - Loading text lines

**Usage:**
```tsx
{loading && <LoadingState type="card" count={4} />}
{loading && <LoadingState type="table" />}
```

---

### EmptyState

Display when no data is available.

**Features:**
- Icon support
- Title and description
- Consistent styling

**Usage:**
```tsx
<EmptyState
  title="No Data Available"
  description="Data will appear as users interact with the app"
  icon="📊"
/>
```

---

## Design System

### Colors

```css
--background: #171717          /* Dark Gray 900 */
--card-bg: #222222             /* Card background */
--card-border: #363636         /* Card border */
--text-primary: #FFFFFF        /* Main text */
--text-subtitle: #ABABAB       /* Subtitles */
--text-body: #D8D8D8           /* Body text */
--brand-blue: #146EF5          /* Primary accent */
```

### Status Colors

```css
--success: #10B981             /* Green */
--warning: #F59E0B             /* Yellow */
--error: #DC2626               /* Red */
--info: #146EF5                /* Blue */
--neutral: #6B7280             /* Gray */
```

### Typography

```css
--font-heading: var(--font-poppins)
--font-body: var(--font-inter)
```

---

## Chart Styling

All charts use Recharts with dark theme styling:

```tsx
<CartesianGrid strokeDasharray="3 3" stroke="#363636" />
<XAxis stroke="#ABABAB" style={{ fontSize: '12px' }} />
<YAxis stroke="#ABABAB" style={{ fontSize: '12px' }} />
<Tooltip
  contentStyle={{
    backgroundColor: '#222222',
    border: '1px solid #363636',
    borderRadius: '8px',
  }}
  labelStyle={{ color: '#FFFFFF', fontWeight: 600 }}
  itemStyle={{ color: '#D8D8D8' }}
/>
<Line stroke="#146EF5" strokeWidth={2} />
```

---

## Animations

Components use Tailwind animation classes:

- `animate-fadeInScale` - Fade in with scale effect
- `animate-fadeIn-delay-1` - Staggered fade in (150ms)
- `animate-fadeIn-delay-2` - Staggered fade in (300ms)
- `animate-fadeIn-delay-3` - Staggered fade in (450ms)
- `card-lift` - Hover lift effect

---

## Responsive Grid

Standard grid patterns for metric cards:

```tsx
{/* 4 columns on desktop, 2 on tablet, 1 on mobile */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <MetricCard {...} />
</div>

{/* 3 columns */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <MetricCard {...} />
</div>

{/* 2 columns */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <ChartContainer {...} />
</div>
```

---

## Accessibility

All components follow WCAG AA guidelines:

- Proper ARIA labels
- Keyboard navigation
- Focus visible states
- Sufficient color contrast
- Screen reader support

---

## Performance

- Lazy load charts
- Memoize expensive calculations
- Responsive containers
- Optimized re-renders

---

## Example Dashboard

```tsx
function MyDashboard({ data }: { data: MyData }) {
  return (
    <div className="space-y-8">
      {/* Metrics */}
      <div className="animate-fadeInScale">
        <h3 className="mb-4" style={{
          fontFamily: 'var(--font-poppins)',
          fontSize: '20px',
          fontWeight: 600,
          color: '#FFFFFF'
        }}>
          Key Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard title="Total" value={data.total} trend={5.2} />
          <MetricCard title="Active" value={data.active} />
        </div>
      </div>

      {/* Chart */}
      <div className="animate-fadeIn-delay-1">
        <ChartContainer title="Trend Over Time">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.timeseries}>
              {/* Chart config */}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Table */}
      <div className="animate-fadeIn-delay-2">
        <h3 className="mb-4">Details</h3>
        <DataTable
          columns={columns}
          data={data.items}
        />
      </div>
    </div>
  );
}
```

---

## File Structure

```
components/admin/
├── AdminLayout.tsx        # Main layout with sidebar
├── MetricCard.tsx         # Stat cards
├── Badge.tsx              # Status badges
├── DataTable.tsx          # Styled tables
├── ChartContainer.tsx     # Chart wrapper
├── LoadingState.tsx       # Skeleton loaders
├── EmptyState.tsx         # No data states
├── index.ts               # Exports
└── README.md              # This file
```

---

## Dependencies

- `recharts` - Charts and data visualizations
- `date-fns` - Date formatting
- `tailwindcss` - Styling
- `react` - UI framework

---

## Notes

- All components use inline styles for consistency with the rest of the app
- Charts use Recharts library for data visualization
- Color palette matches Webflow brand guidelines
- Components are production-ready and fully typed
- Mobile-first responsive design
