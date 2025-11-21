/**
 * Mock data for development mode when D1 is not available
 */

import type {
  ContentGapResponse,
  UsageOverviewResponse,
  UsagePerformanceResponse,
  UsageQualityResponse,
  UsageCostResponse,
  UsageContentResponse,
  UsageTrendsResponse,
  TopicTrendAnalysisResponse,
  FeedbackSentimentResponse,
} from '@/lib/types';

export function getMockContentGaps(): ContentGapResponse {
  return {
    unansweredQuestions: [
      {
        query: 'How do I set up Webflow hosting with custom DNS?',
        confidence: 0.25,
        created_at: new Date(Date.now() - 3600000).toISOString(),
        regeneration_count: 3,
        thumbs_down: true,
      },
      {
        query: 'Can I use Webflow with React components?',
        confidence: 0.18,
        created_at: new Date(Date.now() - 7200000).toISOString(),
        regeneration_count: 2,
        thumbs_down: true,
      },
    ],
    zeroCitationQueries: [
      {
        query: 'Webflow pricing for enterprise',
        created_at: new Date(Date.now() - 1800000).toISOString(),
        attempted_sources: 0,
      },
    ],
    mostRegeneratedAnswers: [
      {
        original_query: 'How do I create a CMS collection?',
        regeneration_count: 5,
        avg_confidence: 0.62,
        thumbs_down_ratio: 0.4,
      },
    ],
    topicClusters: [
      {
        topic: 'CMS & Collections',
        query_count: 45,
        avg_confidence: 0.75,
        keywords: ['cms', 'collection', 'dynamic', 'content'],
      },
      {
        topic: 'Custom Code',
        query_count: 32,
        avg_confidence: 0.68,
        keywords: ['code', 'custom', 'javascript', 'css'],
      },
    ],
    trendingGaps: [
      {
        query_pattern: 'Webflow Apps integration',
        first_seen: new Date(Date.now() - 86400000).toISOString(),
        occurrence_count: 15,
        growth_rate: 250,
      },
    ],
    suggestedActions: [
      {
        priority: 'high',
        action: 'Add documentation for Webflow Apps API integration',
        affected_queries: 15,
        impact: 'Growing topic with 250% increase in queries',
      },
      {
        priority: 'medium',
        action: 'Improve CMS collection tutorials with more examples',
        affected_queries: 5,
        impact: 'High regeneration rate indicates unclear documentation',
      },
    ],
  };
}

export function getMockUsageOverview(): UsageOverviewResponse {
  return {
    totalQueries: {
      today: 47,
      last7d: 312,
      last30d: 1245,
      allTime: 3420,
    },
    activeUsers: {
      dau: 12,
      wau: 45,
      mau: 156,
    },
    avgQueriesPerUser: 6.8,
    avgSessionDuration: 8.5,
    retentionCurve: Array.from({ length: 30 }, (_, i) => ({
      day: i,
      retention_rate: Math.max(0.2, 1 - i * 0.025),
    })),
  };
}

export function getMockPerformanceMetrics(): UsagePerformanceResponse {
  return {
    responseTime: {
      p50: 1250,
      p95: 3420,
      p99: 5890,
    },
    errorRate: 0.02,
    cacheHitRate: 0.45,
    streamingFailureRate: 0.01,
    latencyBreakdown: {
      pinecone_avg_ms: 450,
      openai_avg_ms: 1800,
      total_avg_ms: 2500,
    },
  };
}

export function getMockQualityMetrics(): UsageQualityResponse {
  return {
    avgConfidenceScore: 0.78,
    thumbsRatio: {
      up: 234,
      down: 45,
      ratio: 0.84,
    },
    regenerationRate: 0.12,
    feedbackSubmissionRate: 0.35,
    topNotHelpfulReasons: [
      { reason: 'Answer too technical', count: 15, percentage: 33.3 },
      { reason: 'Missing code example', count: 12, percentage: 26.7 },
      { reason: 'Outdated information', count: 10, percentage: 22.2 },
      { reason: 'Wrong citation', count: 8, percentage: 17.8 },
    ],
  };
}

export function getMockCostAnalysis(): UsageCostResponse {
  return {
    openai: {
      embeddings_cost: 0.12,
      completions_cost: 4.56,
      total: 4.68,
    },
    pinecone: {
      query_cost: 0,
      storage_cost: 0,
    },
    cloudflare: {
      kv_ops: 0.05,
      d1_queries: 0.02,
      r2_storage: 0.01,
      total: 0.08,
    },
    costPerQuery: 0.0015,
    monthlyBurnRate: 4.76,
  };
}

export function getMockContentAnalytics(): UsageContentResponse {
  return {
    topQueries: [
      { query: 'How do I create a collection?', count: 45, avg_confidence: 0.89 },
      { query: 'Can I use custom code in Webflow?', count: 32, avg_confidence: 0.82 },
      { query: 'Webflow hosting pricing', count: 28, avg_confidence: 0.75 },
    ],
    topCitedSources: [
      {
        uri: 'https://developers.webflow.com/data/docs/collections',
        title: 'Collections API',
        citation_count: 145,
        source_type: 'webflow-developers',
      },
      {
        uri: 'https://webflow.com/blog/custom-code',
        title: 'Custom Code Guide',
        citation_count: 98,
        source_type: 'webflow-way',
      },
    ],
    uncitedSources: [
      {
        uri: 'https://webflow.com/blog/old-post',
        title: 'Legacy Feature Announcement',
        last_indexed: '2024-01-15T00:00:00.000Z',
      },
    ],
    sourceTypeDistribution: {
      'webflow-developers': 145,
      'webflow-way': 89,
      'webflow-updates': 23,
    },
    queryClassification: {
      API: 45,
      Design: 32,
      Setup: 28,
      Troubleshooting: 15,
      Unknown: 5,
    },
  };
}

export function getMockTrendsAnalytics(): UsageTrendsResponse {
  const now = Date.now();
  return {
    queriesOverTime: Array.from({ length: 24 }, (_, i) => ({
      timestamp: new Date(now - (23 - i) * 3600000).toISOString(),
      count: Math.floor(Math.random() * 20) + 5,
    })),
    topicTrends: [
      { topic: 'Webflow Apps', trend_7d: 250, trend_30d: 180, current_volume: 45 },
      { topic: 'CMS Collections', trend_7d: -15, trend_30d: 5, current_volume: 120 },
      { topic: 'Custom Code', trend_7d: 30, trend_30d: 25, current_volume: 85 },
    ],
    queryVolumeHeatmap: Array.from({ length: 7 * 24 }, (_, i) => ({
      hour: i % 24,
      day: Math.floor(i / 24),
      count: Math.floor(Math.random() * 15),
    })),
    geographicDistribution: [
      { country: 'US', count: 156, percentage: 45.6 },
      { country: 'GB', count: 78, percentage: 22.8 },
      { country: 'CA', count: 45, percentage: 13.2 },
    ],
  };
}

export function getMockTopicTrends(): TopicTrendAnalysisResponse {
  return {
    trendingTopics: [
      {
        topic: 'Webflow Apps',
        change_7d_vs_30d: 250,
        current_volume: 45,
        example_queries: ['How to integrate apps?', 'Webflow Apps pricing'],
        status: 'rising',
      },
      {
        topic: 'Legacy Features',
        change_7d_vs_30d: -45,
        current_volume: 12,
        example_queries: ['Old Designer interface'],
        status: 'falling',
      },
    ],
    seasonalPatterns: [
      {
        topic: 'E-commerce',
        peak_month: 'November',
        peak_volume: 450,
        pattern_description: 'Holiday season preparation',
      },
    ],
    emergingTopics: [
      {
        topic: 'Webflow AI Features',
        first_seen: new Date(Date.now() - 604800000).toISOString(),
        mention_count: 15,
        in_docs: false,
        suggested_action: 'Add documentation for AI features',
      },
    ],
    intentDistribution: {
      'how-to': 145,
      troubleshooting: 89,
      comparison: 45,
      explanation: 33,
    },
    visualizations: {
      topicTimeSeries: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 86400000).toISOString().split('T')[0],
        'Webflow Apps': Math.floor(Math.random() * 20) + 30,
        'CMS': Math.floor(Math.random() * 15) + 80,
      })),
      wordCloud: [
        { word: 'collection', weight: 145 },
        { word: 'custom', weight: 98 },
        { word: 'code', weight: 87 },
        { word: 'cms', weight: 76 },
        { word: 'api', weight: 65 },
      ],
    },
  };
}

export function getMockSentimentAnalysis(): FeedbackSentimentResponse {
  return {
    sentimentOverview: {
      positive: 234,
      neutral: 89,
      negative: 45,
    },
    complaintCategories: [
      {
        category: 'Answer too technical',
        count: 15,
        percentage: 33.3,
        example_feedback: [
          'Too many technical terms, need simpler explanation',
          'Assumes too much prior knowledge',
        ],
      },
      {
        category: 'Missing code example',
        count: 12,
        percentage: 26.7,
        example_feedback: ['Need actual code snippet', 'Show me an example'],
      },
    ],
    improvementTrend: Array.from({ length: 8 }, (_, i) => ({
      week: `Week ${i + 1}`,
      satisfaction_rate: 0.7 + i * 0.03,
    })),
    actionItems: [
      {
        priority: 'high',
        category: 'Answer too technical',
        issue: 'Users find answers overly complex',
        affected_responses: 15,
        suggested_fix: 'Add beginner-friendly explanations with examples',
      },
      {
        priority: 'medium',
        category: 'Missing code example',
        issue: 'Users want more code snippets',
        affected_responses: 12,
        suggested_fix: 'Include code examples in all technical answers',
      },
    ],
  };
}
