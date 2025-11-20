import { z } from 'zod';

// ==========================================
// Database Types (from D1 schema)
// ==========================================

export type Document = {
  id: string;
  uri: string;
  title: string | null;
  source_type: string | null;
  license: string | null;
  created_at: string;
  updated_at: string;
};

export type Chunk = {
  id: string;
  document_id: string;
  content: string;
  hash: string;
  token_count: number | null;
  section: string | null;
  chunk_index: number | null;
  created_at: string;
};

export type Query = {
  id: string;
  query_text: string;
  embedding_hash: string | null;
  user_ip: string | null;
  created_at: string;
};

export type Response = {
  id: string;
  query_id: string;
  answer: string;
  sources: string | null; // JSON array
  model: string | null;
  latency_ms: number | null;
  created_at: string;
};

export type Feedback = {
  id: string;
  response_id: string;
  helpful: number | null;
  issue_report: string | null;
  created_at: string;
};

// ==========================================
// API Request/Response Types
// ==========================================

export type SearchRequest = {
  query: string;
  limit?: number;
};

export type SearchResult = {
  chunk_id: string;
  content: string;
  document: {
    uri: string;
    title: string | null;
    section: string | null;
  };
  score: number;
};

export type SearchResponse = {
  results: SearchResult[];
  total: number;
};

export type ConversationMessage = {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
};

export type AskRequest = {
  query: string;
  conversation_history?: ConversationMessage[];
  source_filters?: SourceType[];
  options?: {
    model?: 'gpt-4o' | 'gpt-4o-mini';
    top_k?: number;
  };
};

export type AskStreamChunk = {
  type: 'chunk';
  content: string;
};

export type AskStreamDone = {
  type: 'done';
  sources: Array<{
    uri: string;
    title: string;
    section?: string;
  }>;
};

export type AskStreamEvent = AskStreamChunk | AskStreamDone;

export type FeedbackRequest = {
  response_id: string;
  helpful?: boolean;
  issue_report?: string;
};

export type FeedbackResponse = {
  feedback_id: string;
};

export type HealthResponse = {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  checks?: {
    database?: 'ok' | 'error';
    kv?: 'ok' | 'error';
  };
};

export type VersionResponse = {
  version: string;
  git_sha: string;
  build_time: string;
};

export type ErrorResponse = {
  error: string;
  code?: string;
  details?: Record<string, unknown>;
};

// ==========================================
// Zod Validation Schemas
// ==========================================

export const SearchRequestSchema = z.object({
  query: z.string().min(1).max(500),
  limit: z.number().int().min(1).max(20).optional().default(5),
});

export const ConversationMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
  timestamp: z.string().optional(),
});

export const AskRequestSchema = z.object({
  query: z.string().min(1).max(500),
  conversation_history: z.array(ConversationMessageSchema).max(20).optional(),
  source_filters: z.array(z.enum(['university', 'blog', 'api-docs', 'forum'])).optional(),
  options: z.object({
    model: z.enum(['gpt-4o', 'gpt-4o-mini']).optional().default('gpt-4o-mini'),
    top_k: z.number().int().min(1).max(10).optional().default(5),
  }).optional(),
});

export const FeedbackRequestSchema = z.object({
  response_id: z.string().uuid(),
  helpful: z.boolean().optional(),
  issue_report: z.string().max(1000).optional(),
});

// ==========================================
// Utility Types
// ==========================================

export type SourceMeta = {
  uri: string;
  title?: string;
  section?: string;
  hash: string;
  tokens?: number;
  timestamp: string;
  license?: string;
};

export const SourceTypes = ['university', 'blog', 'api-docs', 'forum'] as const;
export type SourceType = typeof SourceTypes[number];

// ==========================================
// Admin Dashboard Types
// ==========================================

// Database types for admin features
export type Regeneration = {
  id: string;
  original_query_id: string;
  regenerated_query_id: string;
  strategy: string | null;
  created_at: string;
};

export type Session = {
  id: string;
  user_ip_hash: string;
  started_at: string;
  last_activity: string;
  query_count: number;
};

export type ResponseMetadata = {
  id: string;
  response_id: string;
  confidence_score: number | null;
  citation_count: number;
  has_code_block: number;
  created_at: string;
};

// Content Gap Dashboard
export type UnansweredQuestion = {
  query: string;
  confidence: number;
  created_at: string;
  regeneration_count: number;
  thumbs_down: boolean;
};

export type ZeroCitationQuery = {
  query: string;
  created_at: string;
  attempted_sources: number;
};

export type RegeneratedAnswer = {
  original_query: string;
  regeneration_count: number;
  avg_confidence: number;
  thumbs_down_ratio: number;
};

export type TopicCluster = {
  topic: string;
  query_count: number;
  avg_confidence: number;
  keywords: string[];
};

export type TrendingGap = {
  query_pattern: string;
  first_seen: string;
  occurrence_count: number;
  growth_rate: number;
};

export type SuggestedAction = {
  priority: 'high' | 'medium' | 'low';
  action: string;
  affected_queries: number;
  impact: string;
};

export type ContentGapResponse = {
  unansweredQuestions: UnansweredQuestion[];
  zeroCitationQueries: ZeroCitationQuery[];
  mostRegeneratedAnswers: RegeneratedAnswer[];
  topicClusters: TopicCluster[];
  trendingGaps: TrendingGap[];
  suggestedActions: SuggestedAction[];
};

// Usage Analytics - Overview
export type UsageOverviewResponse = {
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
};

// Usage Analytics - Performance
export type UsagePerformanceResponse = {
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
};

// Usage Analytics - Quality
export type UsageQualityResponse = {
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
};

// Usage Analytics - Cost
export type UsageCostResponse = {
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
};

// Usage Analytics - Content
export type UsageContentResponse = {
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
};

// Usage Analytics - Trends
export type UsageTrendsResponse = {
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
};

// Topic Trend Analysis
export type TopicTrendAnalysisResponse = {
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
};

// Feedback Sentiment Analysis
export type FeedbackSentimentResponse = {
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
};
