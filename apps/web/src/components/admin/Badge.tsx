/**
 * Badge Component
 * Status badges for priority, sentiment, trends, etc.
 */

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

type BadgeVariant = 'priority' | 'sentiment' | 'status' | 'trend';

interface BadgeProps {
  variant: BadgeVariant;
  value: string | number;
  label?: string;
}

export function Badge({ variant, value, label }: BadgeProps) {
  const getStyles = () => {
    switch (variant) {
      case 'priority':
        const priority = value as 'high' | 'medium' | 'low';
        return {
          backgroundColor:
            priority === 'high' ? '#DC2626' : priority === 'medium' ? '#F59E0B' : '#10B981',
          color: '#FFFFFF',
        };

      case 'sentiment':
        const sentiment = value as 'positive' | 'neutral' | 'negative';
        return {
          backgroundColor:
            sentiment === 'positive'
              ? '#10B981'
              : sentiment === 'negative'
                ? '#DC2626'
                : '#6B7280',
          color: '#FFFFFF',
        };

      case 'status':
        const status = value as string;
        return {
          backgroundColor:
            status === 'rising' || status === 'new'
              ? '#10B981'
              : status === 'falling'
                ? '#DC2626'
                : '#6B7280',
          color: '#FFFFFF',
        };

      case 'trend':
        const trend = value as number;
        return {
          backgroundColor: 'transparent',
          color: trend > 0 ? '#10B981' : trend < 0 ? '#DC2626' : '#898989',
        };

      default:
        return {
          backgroundColor: '#363636',
          color: '#FFFFFF',
        };
    }
  };

  const styles = getStyles();

  if (variant === 'trend') {
    const trendValue = value as number;
    const TrendIcon = trendValue > 0 ? TrendingUp : trendValue < 0 ? TrendingDown : Minus;

    return (
      <span
        className="inline-flex items-center gap-1"
        style={{
          fontSize: '14px',
          fontFamily: 'var(--font-inter)',
          fontWeight: 600,
        }}
      >
        <span style={{ color: styles.color, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <TrendIcon size={14} />
          {Math.abs(trendValue)}%
        </span>
        {label && <span style={{ color: '#898989', fontWeight: 400 }}>{label}</span>}
      </span>
    );
  }

  return (
    <span
      className="px-3 py-1.5 rounded-full font-semibold"
      style={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        fontFamily: 'var(--font-inter)',
        fontSize: '13px',
      }}
    >
      {typeof value === 'string' ? value.toUpperCase() : value}
    </span>
  );
}
