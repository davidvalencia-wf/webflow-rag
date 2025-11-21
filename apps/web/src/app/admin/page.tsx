'use client';

/**
 * Admin Dashboard
 * Production-ready analytics and monitoring for the Webflow RAG system
 */

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Calendar,
  BarChart3,
  TrendingUp,
  Globe,
  User,
  Users,
  Users2,
  Hash,
  Clock,
  Zap,
  Activity,
  Database,
  Radio,
  Star,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  DollarSign,
  Flame,
  AlertTriangle,
  Smile,
  Meh,
  Frown,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
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
import {
  AdminLayout,
  MetricCard,
  Badge,
  LoadingState,
  EmptyState,
  DataTable,
  ChartContainer,
} from '@/components/admin';

type DashboardTab =
  | 'content-gaps'
  | 'overview'
  | 'performance'
  | 'quality'
  | 'cost'
  | 'content'
  | 'trends'
  | 'topic-trends'
  | 'sentiment';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('content-gaps');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Data states for each dashboard
  const [contentGaps, setContentGaps] = useState<ContentGapResponse | null>(null);
  const [overview, setOverview] = useState<UsageOverviewResponse | null>(null);
  const [performance, setPerformance] = useState<UsagePerformanceResponse | null>(null);
  const [quality, setQuality] = useState<UsageQualityResponse | null>(null);
  const [cost, setCost] = useState<UsageCostResponse | null>(null);
  const [content, setContent] = useState<UsageContentResponse | null>(null);
  const [trends, setTrends] = useState<UsageTrendsResponse | null>(null);
  const [topicTrends, setTopicTrends] = useState<TopicTrendAnalysisResponse | null>(null);
  const [sentiment, setSentiment] = useState<FeedbackSentimentResponse | null>(null);

  // Fetch data based on active tab
  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  async function fetchData(tab: DashboardTab) {
    setLoading(true);
    setError(null);

    try {
      let endpoint = '';

      switch (tab) {
        case 'content-gaps':
          endpoint = '/api/admin/content-gaps';
          break;
        case 'overview':
          endpoint = '/api/admin/analytics/overview';
          break;
        case 'performance':
          endpoint = '/api/admin/analytics/performance';
          break;
        case 'quality':
          endpoint = '/api/admin/analytics/quality';
          break;
        case 'cost':
          endpoint = '/api/admin/analytics/cost';
          break;
        case 'content':
          endpoint = '/api/admin/analytics/content';
          break;
        case 'trends':
          endpoint = '/api/admin/analytics/trends';
          break;
        case 'topic-trends':
          endpoint = '/api/admin/topic-trends';
          break;
        case 'sentiment':
          endpoint = '/api/admin/sentiment';
          break;
      }

      const method = tab === 'content-gaps' ? 'POST' : 'GET';
      const response = await fetch(endpoint, { method });

      if (!response.ok) {
        throw new Error(`Failed to fetch ${tab} data`);
      }

      const data = await response.json();

      // Set data based on tab
      switch (tab) {
        case 'content-gaps':
          setContentGaps(data as ContentGapResponse);
          break;
        case 'overview':
          setOverview(data as UsageOverviewResponse);
          break;
        case 'performance':
          setPerformance(data as UsagePerformanceResponse);
          break;
        case 'quality':
          setQuality(data as UsageQualityResponse);
          break;
        case 'cost':
          setCost(data as UsageCostResponse);
          break;
        case 'content':
          setContent(data as UsageContentResponse);
          break;
        case 'trends':
          setTrends(data as UsageTrendsResponse);
          break;
        case 'topic-trends':
          setTopicTrends(data as TopicTrendAnalysisResponse);
          break;
        case 'sentiment':
          setSentiment(data as FeedbackSentimentResponse);
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  function downloadJSON(data: unknown, filename: string) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const handleExport = () => {
    const data =
      activeTab === 'content-gaps'
        ? contentGaps
        : activeTab === 'overview'
          ? overview
          : activeTab === 'performance'
            ? performance
            : activeTab === 'quality'
              ? quality
              : activeTab === 'cost'
                ? cost
                : activeTab === 'content'
                  ? content
                  : activeTab === 'trends'
                    ? trends
                    : activeTab === 'topic-trends'
                      ? topicTrends
                      : sentiment;
    if (data) downloadJSON(data, `admin-${activeTab}`);
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      onRefresh={() => fetchData(activeTab)}
      onExport={handleExport}
    >
      {/* Error State */}
      {error && (
        <div
          className="rounded-lg p-5 mb-6 animate-fadeInScale"
          style={{
            backgroundColor: '#DC2626',
            border: '1px solid #991B1B',
            color: '#FFFFFF',
          }}
        >
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} />
            <div>
              <p style={{ fontWeight: 600, marginBottom: '4px', fontSize: '17px' }}>
                Error Loading Data
              </p>
              <p style={{ fontSize: '16px', opacity: 0.9 }}>{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && <LoadingState type="card" count={4} />}

      {/* Dashboard Content */}
      {!loading && !error && (
        <>
          {activeTab === 'content-gaps' && contentGaps && (
            <ContentGapsDashboard data={contentGaps} />
          )}
          {activeTab === 'overview' && overview && <OverviewDashboard data={overview} />}
          {activeTab === 'performance' && performance && (
            <PerformanceDashboard data={performance} />
          )}
          {activeTab === 'quality' && quality && <QualityDashboard data={quality} />}
          {activeTab === 'cost' && cost && <CostDashboard data={cost} />}
          {activeTab === 'content' && content && <ContentDashboard data={content} />}
          {activeTab === 'trends' && trends && <TrendsDashboard data={trends} />}
          {activeTab === 'topic-trends' && topicTrends && (
            <TopicTrendsDashboard data={topicTrends} />
          )}
          {activeTab === 'sentiment' && sentiment && <SentimentDashboard data={sentiment} />}
        </>
      )}
    </AdminLayout>
  );
}

// ==========================================
// Individual Dashboard Components
// ==========================================

function ContentGapsDashboard({ data }: { data: ContentGapResponse }) {
  return (
    <div className="space-y-8">
      {/* Priority Actions */}
      <div className="animate-fadeInScale">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '24px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Suggested Actions
        </h3>
        {data.suggestedActions.length > 0 ? (
          <DataTable
            columns={[
              {
                key: 'priority',
                label: 'Priority',
                render: (value) => <Badge variant="priority" value={value as string} />,
              },
              { key: 'action', label: 'Action' },
              { key: 'affected_queries', label: 'Affected Queries' },
              { key: 'impact', label: 'Impact' },
            ]}
            data={data.suggestedActions}
          />
        ) : (
          <EmptyState title="No Actions Needed" description="All content gaps are resolved!" />
        )}
      </div>

      {/* Unanswered Questions */}
      <div className="animate-fadeIn-delay-1">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Unanswered Questions (Low Confidence)
        </h3>
        {data.unansweredQuestions.length > 0 ? (
          <DataTable
            columns={[
              { key: 'query', label: 'Query' },
              {
                key: 'confidence',
                label: 'Confidence',
                render: (value) => (
                  <span style={{ color: '#F59E0B' }}>
                    {((value as number) * 100).toFixed(1)}%
                  </span>
                ),
              },
              { key: 'regeneration_count', label: 'Regenerations' },
              {
                key: 'thumbs_down',
                label: 'Thumbs Down',
                render: (value) =>
                  value ? <ThumbsDown size={16} style={{ color: '#DC2626' }} /> : '—',
              },
              {
                key: 'created_at',
                label: 'Created',
                render: (value) => format(new Date(value as string), 'MMM dd, yyyy'),
              },
            ]}
            data={data.unansweredQuestions}
          />
        ) : (
          <EmptyState
            title="No Low Confidence Queries"
            description="All queries have adequate confidence scores."
          />
        )}
      </div>

      {/* Topic Clusters */}
      <div className="animate-fadeIn-delay-2">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Topic Clusters
        </h3>
        {data.topicClusters.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.topicClusters.slice(0, 6).map((cluster, i) => (
              <div
                key={i}
                className="rounded-lg p-6 card-lift"
                style={{ backgroundColor: '#222222', border: '1px solid #363636' }}
              >
                <h4
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    fontSize: '19px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                    marginBottom: '12px',
                  }}
                >
                  {cluster.topic}
                </h4>
                <div className="flex items-center gap-4 mb-3">
                  <div>
                    <p style={{ fontSize: '14px', color: '#898989' }}>Queries</p>
                    <p
                      style={{
                        fontSize: '24px',
                        fontWeight: 600,
                        color: '#146EF5',
                        fontFamily: 'var(--font-poppins)',
                      }}
                    >
                      {cluster.query_count}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', color: '#898989' }}>Confidence</p>
                    <p
                      style={{
                        fontSize: '24px',
                        fontWeight: 600,
                        color:
                          cluster.avg_confidence > 0.7
                            ? '#10B981'
                            : cluster.avg_confidence > 0.5
                              ? '#F59E0B'
                              : '#DC2626',
                        fontFamily: 'var(--font-poppins)',
                      }}
                    >
                      {(cluster.avg_confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>
                <div
                  className="flex flex-wrap gap-2"
                  style={{ borderTop: '1px solid #363636', paddingTop: '12px' }}
                >
                  {cluster.keywords.map((keyword, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 rounded"
                      style={{
                        backgroundColor: '#363636',
                        color: '#D8D8D8',
                        fontSize: '14px',
                        fontFamily: 'var(--font-inter)',
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Topic Clusters"
            description="Not enough queries to generate clusters yet."
          />
        )}
      </div>

      {/* Trending Gaps */}
      <div className="animate-fadeIn-delay-3">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Trending Gaps
        </h3>
        {data.trendingGaps.length > 0 ? (
          <DataTable
            columns={[
              { key: 'query_pattern', label: 'Pattern' },
              { key: 'occurrence_count', label: 'Occurrences' },
              {
                key: 'growth_rate',
                label: 'Growth Rate',
                render: (value) => <Badge variant="trend" value={value as number} />,
              },
              {
                key: 'first_seen',
                label: 'First Seen',
                render: (value) => format(new Date(value as string), 'MMM dd, yyyy'),
              },
            ]}
            data={data.trendingGaps}
          />
        ) : (
          <EmptyState title="No Trending Gaps" description="No emerging patterns detected." />
        )}
      </div>
    </div>
  );
}

function OverviewDashboard({ data }: { data: UsageOverviewResponse }) {
  return (
    <div className="space-y-8">
      {/* Total Queries */}
      <div className="animate-fadeInScale">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Query Volume
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard title="Today" value={data.totalQueries.today} icon={<Calendar size={24} />} />
          <MetricCard title="Last 7 Days" value={data.totalQueries.last7d} icon={<BarChart3 size={24} />} />
          <MetricCard title="Last 30 Days" value={data.totalQueries.last30d} icon={<TrendingUp size={24} />} />
          <MetricCard title="All Time" value={data.totalQueries.allTime} icon={<Globe size={24} />} />
        </div>
      </div>

      {/* Active Users */}
      <div className="animate-fadeIn-delay-1">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Active Users
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard title="DAU (Daily)" value={data.activeUsers.dau} icon={<User size={24} />} />
          <MetricCard title="WAU (Weekly)" value={data.activeUsers.wau} icon={<Users size={24} />} />
          <MetricCard title="MAU (Monthly)" value={data.activeUsers.mau} icon={<Users2 size={24} />} />
        </div>
      </div>

      {/* Engagement */}
      <div className="animate-fadeIn-delay-2">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Engagement
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard
            title="Avg Queries Per User"
            value={data.avgQueriesPerUser.toFixed(1)}
            icon={<Hash size={24} />}
          />
          <MetricCard
            title="Avg Session Duration (min)"
            value={data.avgSessionDuration.toFixed(1)}
            icon={<Clock size={24} />}
          />
        </div>
      </div>

      {/* Retention Curve */}
      <div className="animate-fadeIn-delay-3">
        <ChartContainer title="Retention Curve (7 days)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.retentionCurve}>
              <CartesianGrid strokeDasharray="3 3" stroke="#363636" />
              <XAxis
                dataKey="day"
                stroke="#ABABAB"
                style={{ fontSize: '14px' }}
                tickFormatter={(value) => `Day ${value}`}
              />
              <YAxis
                stroke="#ABABAB"
                style={{ fontSize: '14px' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#222222',
                  border: '1px solid #363636',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-inter)',
                }}
                labelStyle={{ color: '#FFFFFF', fontWeight: 600 }}
                itemStyle={{ color: '#D8D8D8' }}
                formatter={(value: number) => [`${value.toFixed(1)}%`, 'Retention']}
              />
              <Line
                type="monotone"
                dataKey="retention_rate"
                stroke="#146EF5"
                strokeWidth={2}
                dot={{ fill: '#146EF5', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}

function PerformanceDashboard({ data }: { data: UsagePerformanceResponse }) {
  const getLatencyColor = (ms: number) => {
    if (ms < 1000) return '#10B981'; // Green
    if (ms < 3000) return '#F59E0B'; // Yellow
    return '#DC2626'; // Red
  };

  return (
    <div className="space-y-8">
      {/* Response Time */}
      <div className="animate-fadeInScale">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Response Time
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="P50 (Median)"
            value={`${data.responseTime.p50}ms`}
            icon={<Zap size={24} />}
            color={getLatencyColor(data.responseTime.p50)}
          />
          <MetricCard
            title="P95"
            value={`${data.responseTime.p95}ms`}
            icon={<Activity size={24} />}
            color={getLatencyColor(data.responseTime.p95)}
          />
          <MetricCard
            title="P99"
            value={`${data.responseTime.p99}ms`}
            icon={<TrendingUp size={24} />}
            color={getLatencyColor(data.responseTime.p99)}
          />
        </div>
      </div>

      {/* Reliability */}
      <div className="animate-fadeIn-delay-1">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Reliability
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Error Rate"
            value={`${data.errorRate.toFixed(2)}%`}
            icon={<AlertTriangle size={24} />}
            color={data.errorRate > 5 ? '#DC2626' : '#10B981'}
          />
          <MetricCard
            title="Cache Hit Rate"
            value={`${data.cacheHitRate.toFixed(2)}%`}
            icon={<Database size={24} />}
            color="#146EF5"
          />
          <MetricCard
            title="Streaming Failures"
            value={`${data.streamingFailureRate.toFixed(2)}%`}
            icon={<Radio size={24} />}
            color={data.streamingFailureRate > 5 ? '#DC2626' : '#10B981'}
          />
        </div>
      </div>

      {/* Latency Breakdown */}
      <div className="animate-fadeIn-delay-2">
        <ChartContainer title="Latency Breakdown">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: 'Pinecone', latency: data.latencyBreakdown.pinecone_avg_ms },
                { name: 'OpenAI', latency: data.latencyBreakdown.openai_avg_ms },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#363636" />
              <XAxis dataKey="name" stroke="#ABABAB" style={{ fontSize: '12px' }} />
              <YAxis
                stroke="#ABABAB"
                style={{ fontSize: '14px' }}
                tickFormatter={(value) => `${value}ms`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#222222',
                  border: '1px solid #363636',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-inter)',
                }}
                labelStyle={{ color: '#FFFFFF', fontWeight: 600 }}
                itemStyle={{ color: '#D8D8D8' }}
                formatter={(value: number) => [`${value}ms`, 'Latency']}
              />
              <Bar dataKey="latency" fill="#146EF5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}

function QualityDashboard({ data }: { data: UsageQualityResponse }) {
  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="animate-fadeInScale">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard
            title="Avg Confidence Score"
            value={data.avgConfidenceScore.toFixed(2)}
            icon={<Star size={24} />}
            color={
              data.avgConfidenceScore > 0.7
                ? '#10B981'
                : data.avgConfidenceScore > 0.5
                  ? '#F59E0B'
                  : '#DC2626'
            }
          />
          <MetricCard
            title="Satisfaction Ratio"
            value={`${(data.thumbsRatio.ratio * 100).toFixed(1)}%`}
            icon={<ThumbsUp size={24} />}
            color={data.thumbsRatio.ratio > 0.7 ? '#10B981' : '#F59E0B'}
          />
        </div>
      </div>

      {/* Feedback */}
      <div className="animate-fadeIn-delay-1">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          User Feedback
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard title="Thumbs Up" value={data.thumbsRatio.up} icon={<ThumbsUp size={24} />} color="#10B981" />
          <MetricCard
            title="Thumbs Down"
            value={data.thumbsRatio.down}
            icon={<ThumbsDown size={24} />}
            color="#DC2626"
          />
          <MetricCard
            title="Regeneration Rate"
            value={`${data.regenerationRate.toFixed(1)}%`}
            icon={<RefreshCw size={24} />}
          />
        </div>
      </div>

      {/* Top Issues */}
      <div className="animate-fadeIn-delay-2">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Top &quot;Not Helpful&quot; Reasons
        </h3>
        {data.topNotHelpfulReasons.length > 0 ? (
          <DataTable
            columns={[
              { key: 'reason', label: 'Reason' },
              { key: 'count', label: 'Count' },
              {
                key: 'percentage',
                label: 'Percentage',
                render: (value) => `${(value as number).toFixed(1)}%`,
              },
            ]}
            data={data.topNotHelpfulReasons}
          />
        ) : (
          <EmptyState
            title="No Feedback Yet"
            description="Users haven't provided detailed feedback yet."
          />
        )}
      </div>
    </div>
  );
}

function CostDashboard({ data }: { data: UsageCostResponse }) {
  const costData = [
    { name: 'Embeddings', value: data.openai.embeddings_cost },
    { name: 'Completions', value: data.openai.completions_cost },
  ];

  const COLORS = ['#146EF5', '#10B981'];

  return (
    <div className="space-y-8">
      {/* Key Metrics */}
      <div className="animate-fadeInScale">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetricCard
            title="Cost Per Query"
            value={`$${data.costPerQuery.toFixed(4)}`}
            icon={<DollarSign size={24} />}
          />
          <MetricCard
            title="Monthly Burn Rate"
            value={`$${data.monthlyBurnRate.toFixed(2)}`}
            icon={<Flame size={24} />}
            color={data.monthlyBurnRate > 100 ? '#DC2626' : '#10B981'}
          />
        </div>
      </div>

      {/* OpenAI Cost Breakdown */}
      <div className="animate-fadeIn-delay-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer title="OpenAI Cost Breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: $${entry.value.toFixed(2)}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#222222',
                    border: '1px solid #363636',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>

          <div className="rounded-lg p-6" style={{ backgroundColor: '#222222', border: '1px solid #363636' }}>
            <h4
              className="mb-4"
              style={{
                fontFamily: 'var(--font-poppins)',
                fontSize: '18px',
                fontWeight: 600,
                color: '#FFFFFF',
              }}
            >
              Cloudflare Usage
            </h4>
            <div className="space-y-4">
              <div>
                <p style={{ fontSize: '14px', color: '#898989' }}>KV Operations</p>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: 600,
                    color: '#146EF5',
                    fontFamily: 'var(--font-poppins)',
                  }}
                >
                  {data.cloudflare.kv_ops.toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#898989' }}>D1 Queries</p>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: 600,
                    color: '#146EF5',
                    fontFamily: 'var(--font-poppins)',
                  }}
                >
                  {data.cloudflare.d1_queries.toLocaleString()}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '14px', color: '#898989' }}>R2 Storage (GB)</p>
                <p
                  style={{
                    fontSize: '28px',
                    fontWeight: 600,
                    color: '#146EF5',
                    fontFamily: 'var(--font-poppins)',
                  }}
                >
                  {data.cloudflare.r2_storage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentDashboard({ data }: { data: UsageContentResponse }) {
  const classificationData = Object.entries(data.queryClassification).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#146EF5', '#10B981', '#F59E0B', '#DC2626', '#6B7280'];

  return (
    <div className="space-y-8">
      {/* Top Queries */}
      <div className="animate-fadeInScale">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Top Queries
        </h3>
        {data.topQueries.length > 0 ? (
          <DataTable
            columns={[
              { key: 'query', label: 'Query' },
              { key: 'count', label: 'Count' },
              {
                key: 'avg_confidence',
                label: 'Avg Confidence',
                render: (value) => (
                  <span
                    style={{
                      color:
                        (value as number) > 0.7
                          ? '#10B981'
                          : (value as number) > 0.5
                            ? '#F59E0B'
                            : '#DC2626',
                    }}
                  >
                    {((value as number) * 100).toFixed(1)}%
                  </span>
                ),
              },
            ]}
            data={data.topQueries}
          />
        ) : (
          <EmptyState title="No Queries Yet" description="Start using the app to see top queries." />
        )}
      </div>

      {/* Top Cited Sources */}
      <div className="animate-fadeIn-delay-1">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Top Cited Sources
        </h3>
        {data.topCitedSources.length > 0 ? (
          <DataTable
            columns={[
              {
                key: 'title',
                label: 'Title',
                render: (value, row) => (
                  <a
                    href={(row as { uri: string }).uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#146EF5', textDecoration: 'none' }}
                    className="hover:underline"
                  >
                    {value as string}
                  </a>
                ),
              },
              { key: 'citation_count', label: 'Citations' },
              {
                key: 'source_type',
                label: 'Source Type',
                render: (value) => (
                  <Badge variant="status" value={value as string} />
                ),
              },
            ]}
            data={data.topCitedSources}
          />
        ) : (
          <EmptyState title="No Citations Yet" description="Citations will appear as users query." />
        )}
      </div>

      {/* Query Classification */}
      <div className="animate-fadeIn-delay-2">
        <ChartContainer title="Query Classification">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={classificationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: ${entry.value}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {classificationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#222222',
                  border: '1px solid #363636',
                  borderRadius: '8px',
                }}
              />
              <Legend
                wrapperStyle={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '12px',
                  color: '#D8D8D8',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}

function TrendsDashboard({ data }: { data: UsageTrendsResponse }) {
  return (
    <div className="space-y-8">
      {/* Queries Over Time */}
      <div className="animate-fadeInScale">
        <ChartContainer title="Queries Over Time">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.queriesOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#363636" />
              <XAxis dataKey="timestamp" stroke="#ABABAB" style={{ fontSize: '12px' }} />
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
              <Line
                type="monotone"
                dataKey="count"
                stroke="#146EF5"
                strokeWidth={2}
                dot={{ fill: '#146EF5', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Topic Trends */}
      <div className="animate-fadeIn-delay-1">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Topic Trends
        </h3>
        {data.topicTrends.length > 0 ? (
          <DataTable
            columns={[
              { key: 'topic', label: 'Topic' },
              {
                key: 'trend_7d',
                label: '7d Trend',
                render: (value) => <Badge variant="trend" value={value as number} />,
              },
              { key: 'current_volume', label: 'Current Volume' },
            ]}
            data={data.topicTrends}
          />
        ) : (
          <EmptyState title="No Trends Yet" description="Trends will appear as data accumulates." />
        )}
      </div>
    </div>
  );
}

function TopicTrendsDashboard({ data }: { data: TopicTrendAnalysisResponse }) {
  return (
    <div className="space-y-8">
      {/* Trending Topics */}
      <div className="animate-fadeInScale">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Trending Topics
        </h3>
        {data.trendingTopics.length > 0 ? (
          <DataTable
            columns={[
              { key: 'topic', label: 'Topic' },
              {
                key: 'status',
                label: 'Status',
                render: (value) => <Badge variant="status" value={value as string} />,
              },
              {
                key: 'change_7d_vs_30d',
                label: 'Growth Rate',
                render: (value) => <Badge variant="trend" value={value as number} />,
              },
              { key: 'current_volume', label: 'Volume' },
            ]}
            data={data.trendingTopics}
          />
        ) : (
          <EmptyState
            title="No Trending Topics"
            description="Topics will appear as usage patterns emerge."
          />
        )}
      </div>

      {/* Emerging Topics */}
      <div className="animate-fadeIn-delay-1">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Emerging Topics
        </h3>
        {data.emergingTopics.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.emergingTopics.map((topic, i) => (
              <div
                key={i}
                className="rounded-lg p-6 card-lift"
                style={{ backgroundColor: '#222222', border: '1px solid #363636' }}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4
                    style={{
                      fontFamily: 'var(--font-poppins)',
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#FFFFFF',
                    }}
                  >
                    {topic.topic}
                  </h4>
                  <span
                    className="px-3 py-1.5 rounded"
                    style={{
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '13px',
                    }}
                  >
                    NEW
                  </span>
                </div>
                <p style={{ fontSize: '16px', color: '#D8D8D8', marginBottom: '12px', lineHeight: '1.6' }}>
                  {topic.suggested_action}
                </p>
                <div className="flex items-center gap-4" style={{ color: '#898989', fontSize: '15px' }}>
                  <span>{topic.mention_count} mentions</span>
                  <span>•</span>
                  <span>First seen {format(new Date(topic.first_seen), 'MMM dd')}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Emerging Topics"
            description="New topics will appear as users explore new areas."
          />
        )}
      </div>

      {/* Intent Distribution */}
      <div className="animate-fadeIn-delay-2">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Intent Distribution
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(data.intentDistribution).map(([intent, count]) => (
            <MetricCard key={intent} title={intent} value={count} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SentimentDashboard({ data }: { data: FeedbackSentimentResponse }) {
  return (
    <div className="space-y-8">
      {/* Sentiment Overview */}
      <div className="animate-fadeInScale">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Sentiment Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Positive"
            value={data.sentimentOverview.positive}
            icon={<Smile size={24} />}
            color="#10B981"
          />
          <MetricCard
            title="Neutral"
            value={data.sentimentOverview.neutral}
            icon={<Meh size={24} />}
            color="#6B7280"
          />
          <MetricCard
            title="Negative"
            value={data.sentimentOverview.negative}
            icon={<Frown size={24} />}
            color="#DC2626"
          />
        </div>
      </div>

      {/* Complaint Categories */}
      <div className="animate-fadeIn-delay-1">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Complaint Categories
        </h3>
        {data.complaintCategories.length > 0 ? (
          <DataTable
            columns={[
              { key: 'category', label: 'Category' },
              { key: 'count', label: 'Count' },
              {
                key: 'percentage',
                label: 'Percentage',
                render: (value) => `${(value as number).toFixed(1)}%`,
              },
            ]}
            data={data.complaintCategories}
          />
        ) : (
          <EmptyState
            title="No Complaints"
            description="Users haven't reported any issues yet."
          />
        )}
      </div>

      {/* Action Items */}
      <div className="animate-fadeIn-delay-2">
        <h3
          className="mb-4"
          style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '22px',
            fontWeight: 600,
            color: '#FFFFFF',
          }}
        >
          Action Items
        </h3>
        {data.actionItems.length > 0 ? (
          <DataTable
            columns={[
              {
                key: 'priority',
                label: 'Priority',
                render: (value) => <Badge variant="priority" value={value as string} />,
              },
              { key: 'category', label: 'Category' },
              { key: 'issue', label: 'Issue' },
              { key: 'suggested_fix', label: 'Suggested Fix' },
            ]}
            data={data.actionItems}
          />
        ) : (
          <EmptyState
            title="No Action Items"
            description="All feedback has been addressed!"
          />
        )}
      </div>
    </div>
  );
}
