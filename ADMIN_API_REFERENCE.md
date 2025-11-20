# Admin Dashboard API Reference

Quick reference for all admin API endpoints.

---

## Endpoint Summary

| Endpoint | Method | Purpose | Response Type |
|----------|--------|---------|---------------|
| `/api/admin/content-gaps` | POST | Content gap analysis | `ContentGapResponse` |
| `/api/admin/analytics/overview` | GET | Usage overview | `UsageOverviewResponse` |
| `/api/admin/analytics/performance` | GET | Performance metrics | `UsagePerformanceResponse` |
| `/api/admin/analytics/quality` | GET | Quality metrics | `UsageQualityResponse` |
| `/api/admin/analytics/cost` | GET | Cost analysis | `UsageCostResponse` |
| `/api/admin/analytics/content` | GET | Content analytics | `UsageContentResponse` |
| `/api/admin/analytics/trends` | GET | Trend analysis | `UsageTrendsResponse` |
| `/api/admin/topic-trends` | GET | Topic trends | `TopicTrendAnalysisResponse` |
| `/api/admin/sentiment` | GET | Sentiment analysis | `FeedbackSentimentResponse` |

---

## 1. Content Gap Analysis

### `POST /api/admin/content-gaps`

Identifies missing documentation and low-quality answers.

**Request**: None (empty body)

**Response**: `ContentGapResponse`
```typescript
{
  unansweredQuestions: Array<{
    query: string;
    confidence: number;
    created_at: string;
    regeneration_count: number;
    thumbs_down: boolean;
  }>;
  zeroCitationQueries: Array<{
    query: string;
    created_at: string;
    attempted_sources: number;
  }>;
  mostRegeneratedAnswers: Array<{
    original_query: string;
    regeneration_count: number;
    avg_confidence: number;
    thumbs_down_ratio: number;
  }>;
  topicClusters: Array<{
    topic: string;
    query_count: number;
    avg_confidence: number;
    keywords: string[];
  }>;
  trendingGaps: Array<{
    query_pattern: string;
    first_seen: string;
    occurrence_count: number;
    growth_rate: number;
  }>;
  suggestedActions: Array<{
    priority: 'high' | 'medium' | 'low';
    action: string;
    affected_queries: number;
    impact: string;
  }>;
}
```

**Example**:
```bash
curl -X POST http://localhost:3000/api/admin/content-gaps
```

---

## 2. Usage Overview

### `GET /api/admin/analytics/overview`

High-level usage statistics.

**Response**: `UsageOverviewResponse`
```typescript
{
  totalQueries: {
    today: number;
    last7d: number;
    last30d: number;
    allTime: number;
  };
  activeUsers: {
    dau: number;
    wau: number;
    mau: number;
  };
  avgQueriesPerUser: number;
  avgSessionDuration: number;
  retentionCurve: Array<{
    day: number;
    retention_rate: number;
  }>;
}
```

**Example**:
```bash
curl http://localhost:3000/api/admin/analytics/overview
```

---

## 3. Performance Metrics

### `GET /api/admin/analytics/performance`

System performance and reliability metrics.

**Response**: `UsagePerformanceResponse`
```typescript
{
  responseTime: {
    p50: number;
    p95: number;
    p99: number;
  };
  errorRate: number;
  cacheHitRate: number;
  streamingFailureRate: number;
  latencyBreakdown: {
    pinecone_avg_ms: number;
    openai_avg_ms: number;
    total_avg_ms: number;
  };
}
```

**Example**:
```bash
curl http://localhost:3000/api/admin/analytics/performance
```

---

## 4. Quality Metrics

### `GET /api/admin/analytics/quality`

Answer quality and user satisfaction.

**Response**: `UsageQualityResponse`
```typescript
{
  avgConfidenceScore: number;
  thumbsRatio: {
    up: number;
    down: number;
    ratio: number;
  };
  regenerationRate: number;
  feedbackSubmissionRate: number;
  topNotHelpfulReasons: Array<{
    reason: string;
    count: number;
    percentage: number;
  }>;
}
```

**Example**:
```bash
curl http://localhost:3000/api/admin/analytics/quality
```

---

## 5. Cost Analysis

### `GET /api/admin/analytics/cost`

API and infrastructure cost tracking.

**Response**: `UsageCostResponse`
```typescript
{
  openai: {
    embeddings_cost: number;
    completions_cost: number;
    total: number;
  };
  pinecone: {
    query_cost: number;
    storage_cost: number;
  };
  cloudflare: {
    kv_ops: number;
    d1_queries: number;
    r2_storage: number;
    total: number;
  };
  costPerQuery: number;
  monthlyBurnRate: number;
}
```

**Example**:
```bash
curl http://localhost:3000/api/admin/analytics/cost
```

---

## 6. Content Analytics

### `GET /api/admin/analytics/content`

Content usage and source analytics.

**Response**: `UsageContentResponse`
```typescript
{
  topQueries: Array<{
    query: string;
    count: number;
    avg_confidence: number;
  }>;
  topCitedSources: Array<{
    uri: string;
    title: string;
    citation_count: number;
    source_type: string;
  }>;
  uncitedSources: Array<{
    uri: string;
    title: string;
    last_indexed: string;
  }>;
  sourceTypeDistribution: {
    'webflow-developers': number;
    'webflow-way': number;
    'webflow-updates': number;
  };
  queryClassification: {
    'API': number;
    'Design': number;
    'Setup': number;
    'Troubleshooting': number;
    'Unknown': number;
  };
}
```

**Example**:
```bash
curl http://localhost:3000/api/admin/analytics/content
```

---

## 7. Trend Analysis

### `GET /api/admin/analytics/trends`

Temporal patterns and trends.

**Response**: `UsageTrendsResponse`
```typescript
{
  queriesOverTime: Array<{
    timestamp: string;
    count: number;
  }>;
  topicTrends: Array<{
    topic: string;
    trend_7d: number;
    trend_30d: number;
    current_volume: number;
  }>;
  queryVolumeHeatmap: Array<{
    hour: number;
    day: number;
    count: number;
  }>;
  geographicDistribution: Array<{
    country: string;
    count: number;
    percentage: number;
  }>;
}
```

**Example**:
```bash
curl http://localhost:3000/api/admin/analytics/trends
```

---

## 8. Topic Trend Analysis

### `GET /api/admin/topic-trends`

Advanced topic analysis and emerging trends.

**Response**: `TopicTrendAnalysisResponse`
```typescript
{
  trendingTopics: Array<{
    topic: string;
    change_7d_vs_30d: number;
    current_volume: number;
    example_queries: string[];
    status: 'rising' | 'falling' | 'stable';
  }>;
  seasonalPatterns: Array<{
    topic: string;
    peak_month: string;
    peak_volume: number;
    pattern_description: string;
  }>;
  emergingTopics: Array<{
    topic: string;
    first_seen: string;
    mention_count: number;
    in_docs: boolean;
    suggested_action: string;
  }>;
  intentDistribution: {
    'how-to': number;
    'troubleshooting': number;
    'comparison': number;
    'explanation': number;
  };
  visualizations: {
    topicTimeSeries: Array<{
      date: string;
      [topic: string]: number | string;
    }>;
    wordCloud: Array<{
      word: string;
      weight: number;
    }>;
  };
}
```

**Example**:
```bash
curl http://localhost:3000/api/admin/topic-trends
```

---

## 9. Feedback Sentiment Analysis

### `GET /api/admin/sentiment`

User feedback categorization and sentiment.

**Response**: `FeedbackSentimentResponse`
```typescript
{
  sentimentOverview: {
    positive: number;
    neutral: number;
    negative: number;
  };
  complaintCategories: Array<{
    category: string;
    count: number;
    percentage: number;
    example_feedback: string[];
  }>;
  improvementTrend: Array<{
    week: string;
    satisfaction_rate: number;
  }>;
  actionItems: Array<{
    priority: 'high' | 'medium' | 'low';
    category: string;
    issue: string;
    affected_responses: number;
    suggested_fix: string;
  }>;
}
```

**Example**:
```bash
curl http://localhost:3000/api/admin/sentiment
```

---

## Error Responses

All endpoints return consistent error format:

```typescript
{
  error: string;        // Human-readable message
  code: string;         // ERROR_CODE
  details?: {           // Optional context
    requestId: string;
  };
}
```

**Status Codes**:
- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized (when auth added)
- `429` - Rate Limit Exceeded (when rate limiting added)
- `500` - Internal Server Error

**Example Error**:
```json
{
  "error": "Failed to analyze content gaps",
  "code": "INTERNAL_ERROR",
  "details": {
    "requestId": "abc-123-def-456"
  }
}
```

---

## Testing Endpoints

### Using curl

```bash
# Content gaps
curl -X POST http://localhost:3000/api/admin/content-gaps

# Overview
curl http://localhost:3000/api/admin/analytics/overview

# Performance
curl http://localhost:3000/api/admin/analytics/performance

# All other endpoints (GET)
curl http://localhost:3000/api/admin/analytics/quality
curl http://localhost:3000/api/admin/analytics/cost
curl http://localhost:3000/api/admin/analytics/content
curl http://localhost:3000/api/admin/analytics/trends
curl http://localhost:3000/api/admin/topic-trends
curl http://localhost:3000/api/admin/sentiment
```

### Using JavaScript

```javascript
// Fetch content gaps
const response = await fetch('/api/admin/content-gaps', {
  method: 'POST'
});
const data = await response.json();

// Fetch overview
const overview = await fetch('/api/admin/analytics/overview').then(r => r.json());

// With error handling
try {
  const response = await fetch('/api/admin/analytics/performance');
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error('Failed to fetch performance data:', error);
}
```

---

## Rate Limiting (Future)

When rate limiting is added:

**Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1234567890
```

**429 Response**:
```json
{
  "error": "Rate limit exceeded",
  "code": "RATE_LIMIT",
  "details": {
    "limit": 100,
    "reset": 1234567890
  }
}
```

---

## Authentication (Future)

When authentication is added:

**Headers**:
```
Authorization: Bearer YOUR_API_KEY
```

**401 Response**:
```json
{
  "error": "Unauthorized",
  "code": "UNAUTHORIZED"
}
```

---

## Caching (Recommended)

Add KV caching to reduce database load:

```typescript
// Example caching pattern
const cacheKey = `admin:${endpoint}:${Math.floor(Date.now() / 300000)}`; // 5min buckets

const cached = await env.KV.get(cacheKey, 'json');
if (cached) return Response.json(cached);

const data = await computeExpensiveData();
await env.KV.put(cacheKey, JSON.stringify(data), { expirationTtl: 300 });
return Response.json(data);
```

**Recommended TTLs**:
- Content gaps: 5 minutes
- Overview: 5 minutes
- Performance: 1 minute
- Quality: 5 minutes
- Cost: 1 hour
- Content: 5 minutes
- Trends: 5 minutes
- Topic trends: 5 minutes
- Sentiment: 5 minutes

---

## File Locations

All admin API endpoints are in:
```
/Users/ryan.hodge/Projects/webflow-rag/apps/web/src/app/api/admin/
```

Type definitions are in:
```
/Users/ryan.hodge/Projects/webflow-rag/packages/shared/index.ts
```

---

**Last Updated**: 2025-11-17
