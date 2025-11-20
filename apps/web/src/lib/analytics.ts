/**
 * Analytics helper utilities for admin dashboard
 * Provides common calculations and data processing functions
 */

// ==========================================
// Statistical Calculations
// ==========================================

/**
 * Calculate percentile from sorted array of numbers
 */
export function calculatePercentile(sortedValues: number[], percentile: number): number {
  if (sortedValues.length === 0) return 0;

  const index = Math.ceil((percentile / 100) * sortedValues.length) - 1;
  return sortedValues[Math.max(0, index)] || 0;
}

/**
 * Calculate percentiles (p50, p95, p99) from array of numbers
 */
export function calculatePercentiles(values: number[]): { p50: number; p95: number; p99: number } {
  if (values.length === 0) {
    return { p50: 0, p95: 0, p99: 0 };
  }

  const sorted = [...values].sort((a, b) => a - b);

  return {
    p50: calculatePercentile(sorted, 50),
    p95: calculatePercentile(sorted, 95),
    p99: calculatePercentile(sorted, 99),
  };
}

/**
 * Calculate average from array of numbers
 */
export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((sum, val) => sum + val, 0) / values.length;
}

// ==========================================
// Text Analysis
// ==========================================

/**
 * Extract keywords from text using simple frequency analysis
 * Returns top N keywords by frequency (excluding common stop words)
 */
export function extractKeywords(text: string, topN: number = 5): string[] {
  const stopWords = new Set([
    'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
    'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
    'to', 'was', 'will', 'with', 'how', 'what', 'when', 'where', 'who',
    'i', 'do', 'does', 'can', 'my', 'me', 'you', 'your', 'this', 'these',
    'those', 'am', 'been', 'being', 'have', 'had', 'having', 'get', 'got'
  ]);

  // Tokenize and clean
  const words = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));

  // Count frequencies
  const freq = new Map<string, number>();
  words.forEach(word => {
    freq.set(word, (freq.get(word) || 0) + 1);
  });

  // Sort by frequency and return top N
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([word]) => word);
}

/**
 * Classify query intent based on keywords
 */
export function classifyQueryIntent(query: string): 'how-to' | 'troubleshooting' | 'comparison' | 'explanation' {
  const lower = query.toLowerCase();

  // How-to: instructional queries
  if (lower.match(/\b(how|create|make|build|add|setup|configure|install)\b/)) {
    return 'how-to';
  }

  // Troubleshooting: problem-solving queries
  if (lower.match(/\b(error|fix|issue|problem|not working|doesn't|won't|can't|broken|failed)\b/)) {
    return 'troubleshooting';
  }

  // Comparison: comparing options
  if (lower.match(/\b(vs|versus|compare|difference|better|best|which|should i)\b/)) {
    return 'comparison';
  }

  // Default: explanation
  return 'explanation';
}

/**
 * Classify query topic based on keywords
 */
export function classifyQueryTopic(query: string): 'API' | 'Design' | 'Setup' | 'Troubleshooting' | 'Unknown' {
  const lower = query.toLowerCase();

  // API: technical integration queries
  if (lower.match(/\b(api|endpoint|authentication|auth|rest|graphql|token|webhook|request|response)\b/)) {
    return 'API';
  }

  // Design: visual/layout queries
  if (lower.match(/\b(design|layout|style|css|component|element|flexbox|grid|responsive|mobile)\b/)) {
    return 'Design';
  }

  // Setup: configuration and initialization
  if (lower.match(/\b(setup|install|configure|create|initialize|start|begin|new project)\b/)) {
    return 'Setup';
  }

  // Troubleshooting: problem-solving
  if (lower.match(/\b(error|fix|issue|problem|not working|doesn't|won't|can't|broken|failed)\b/)) {
    return 'Troubleshooting';
  }

  return 'Unknown';
}

/**
 * Categorize feedback text into complaint categories
 */
export function categorizeFeedback(feedback: string): string {
  const lower = feedback.toLowerCase();

  if (lower.match(/\b(technical|complicated|complex|jargon|difficult|hard to understand)\b/)) {
    return 'Answer too technical';
  }

  if (lower.match(/\b(code|example|sample|snippet|implementation)\b/)) {
    return 'Missing code example';
  }

  if (lower.match(/\b(outdated|old|deprecated|obsolete|no longer|not current)\b/)) {
    return 'Outdated information';
  }

  if (lower.match(/\b(wrong|incorrect|inaccurate|not right|bad|false)\b/)) {
    return 'Wrong citation';
  }

  if (lower.match(/\b(doesn't answer|not relevant|off topic|unrelated|not what i asked)\b/)) {
    return "Doesn't answer my question";
  }

  return 'Other';
}

/**
 * Determine sentiment from feedback (simple keyword-based)
 */
export function determineSentiment(helpful: number | null, issueReport: string | null): 'positive' | 'neutral' | 'negative' {
  if (helpful === 1 && !issueReport) return 'positive';
  if (helpful === 0) return 'negative';
  if (helpful === 1 && issueReport) return 'neutral'; // Helpful but has suggestions
  return 'neutral';
}

// ==========================================
// Date/Time Utilities
// ==========================================

/**
 * Get date range for common time periods
 */
export function getDateRange(period: 'today' | '7d' | '30d'): { start: Date; end: Date } {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case 'today':
      start.setHours(0, 0, 0, 0);
      break;
    case '7d':
      start.setDate(start.getDate() - 7);
      break;
    case '30d':
      start.setDate(start.getDate() - 30);
      break;
  }

  return { start, end };
}

/**
 * Format date to ISO string for SQL queries
 */
export function toSQLDate(date: Date): string {
  return date.toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * Get hour and day of week from timestamp (for heatmap)
 */
export function getHourAndDay(timestamp: string): { hour: number; day: number } {
  const date = new Date(timestamp);
  return {
    hour: date.getHours(), // 0-23
    day: date.getDay(),    // 0-6 (Sunday-Saturday)
  };
}

// ==========================================
// Cost Calculations
// ==========================================

/**
 * OpenAI pricing constants (as of 2025)
 */
export const OPENAI_PRICING = {
  EMBEDDING: 0.00002 / 1000, // $0.00002 per 1K tokens
  GPT4O_MINI_INPUT: 0.15 / 1_000_000, // $0.15 per 1M input tokens
  GPT4O_MINI_OUTPUT: 0.60 / 1_000_000, // $0.60 per 1M output tokens
};

/**
 * Estimate token count from text (rough approximation: 1 token ≈ 4 characters)
 */
export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

/**
 * Calculate OpenAI embedding cost
 */
export function calculateEmbeddingCost(queryCount: number, avgQueryLength: number = 50): number {
  const tokens = queryCount * estimateTokens('a'.repeat(avgQueryLength));
  return tokens * OPENAI_PRICING.EMBEDDING;
}

/**
 * Calculate OpenAI completion cost
 */
export function calculateCompletionCost(
  responseCount: number,
  avgInputTokens: number = 1000,
  avgOutputTokens: number = 500
): number {
  const inputCost = responseCount * avgInputTokens * OPENAI_PRICING.GPT4O_MINI_INPUT;
  const outputCost = responseCount * avgOutputTokens * OPENAI_PRICING.GPT4O_MINI_OUTPUT;
  return inputCost + outputCost;
}

// ==========================================
// Topic Clustering
// ==========================================

/**
 * Simple topic clustering using keyword extraction
 * Groups queries by common keywords
 */
export function clusterByTopic(queries: string[]): Map<string, string[]> {
  const clusters = new Map<string, string[]>();

  queries.forEach(query => {
    const keywords = extractKeywords(query, 3);
    const topic = keywords[0] || 'general';

    if (!clusters.has(topic)) {
      clusters.set(topic, []);
    }
    clusters.get(topic)!.push(query);
  });

  return clusters;
}

/**
 * Calculate growth rate between two periods
 */
export function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

/**
 * Determine trend status based on growth rate
 */
export function getTrendStatus(growthRate: number): 'rising' | 'falling' | 'stable' {
  if (growthRate > 10) return 'rising';
  if (growthRate < -10) return 'falling';
  return 'stable';
}
