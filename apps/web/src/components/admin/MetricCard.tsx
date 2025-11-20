/**
 * MetricCard Component
 * Beautiful stat card with trend indicators and animations
 */

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number | string;
  trend?: number;
  icon?: React.ReactNode;
  subtitle?: string;
  color?: string;
}

export function MetricCard({ title, value, trend, icon, subtitle, color }: MetricCardProps) {
  const getTrendColor = (trendValue: number) => {
    // Use white on colored backgrounds for maximum contrast
    if (color) return '#FFFFFF';

    // Use semantic colors on default dark backgrounds
    if (trendValue > 0) return '#10B981'; // Green
    if (trendValue < 0) return '#DC2626'; // Red
    return '#898989'; // Gray
  };

  const getTrendIcon = (trendValue: number) => {
    if (trendValue > 0) return <TrendingUp size={16} />;
    if (trendValue < 0) return <TrendingDown size={16} />;
    return <Minus size={16} />;
  };

  return (
    <div
      className="rounded-lg p-6 transition-all card-lift animate-fadeInScale"
      style={{
        backgroundColor: color || '#222222',
        border: '1px solid #363636',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <h3
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            fontWeight: 500,
            color: color ? '#FFFFFF' : '#ABABAB',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {title}
        </h3>
        {icon && (
          <div style={{ color: color ? '#FFFFFF' : '#146EF5', opacity: color ? 1 : 0.8 }}>{icon}</div>
        )}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-poppins)',
          fontSize: '36px',
          fontWeight: 600,
          color: '#FFFFFF',
          marginBottom: trend !== undefined ? '12px' : '0',
          lineHeight: '1.2',
        }}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>

      {trend !== undefined && (
        <div
          className="flex items-center gap-2"
          style={{
            fontSize: '14px',
            fontFamily: 'var(--font-inter)',
          }}
        >
          <span
            style={{
              color: getTrendColor(trend),
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontWeight: 600,
            }}
          >
            {getTrendIcon(trend)}
            {Math.abs(trend)}%
          </span>
          <span style={{ color: color ? 'rgba(255, 255, 255, 0.8)' : '#898989', fontWeight: 400 }}>
            {subtitle || 'vs last period'}
          </span>
        </div>
      )}
    </div>
  );
}
