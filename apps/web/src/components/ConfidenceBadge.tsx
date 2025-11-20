/**
 * ConfidenceBadge Component
 * Trust indicator with pulse animation
 */

'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/animations';

interface ConfidenceBadgeProps {
  confidence: number; // 0-1
  totalSources?: number;
}

export function ConfidenceBadge({ confidence, totalSources }: ConfidenceBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);

  const getConfidenceLevel = () => {
    // Use source count for confidence if available, otherwise fall back to confidence score
    const sourceCount = totalSources ?? 0;

    if (sourceCount >= 3) {
      return { label: 'HIGH CONFIDENCE', color: '#10B981', icon: '🟢' };
    } else if (sourceCount === 2) {
      return { label: 'MEDIUM CONFIDENCE', color: '#F59E0B', icon: '🟡' };
    } else if (sourceCount === 1) {
      return { label: 'LIMITED CONFIDENCE', color: '#EF4444', icon: '🔴', showWarning: true };
    }

    // Fallback to confidence score if no sources
    if (confidence >= 0.8) return { label: 'HIGH CONFIDENCE', color: '#10B981', icon: '🟢' };
    if (confidence >= 0.5) return { label: 'MEDIUM CONFIDENCE', color: '#F59E0B', icon: '🟡' };
    return { label: 'LIMITED CONFIDENCE', color: '#EF4444', icon: '🔴', showWarning: true };
  };

  const confidenceData = getConfidenceLevel();

  useEffect(() => {
    const badge = badgeRef.current;
    if (!badge || prefersReducedMotion()) return;

    // Pulse animation on mount
    gsap.to(badge, {
      boxShadow: `0 0 20px ${confidenceData.color}40`,
      duration: 1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: 2,
    });
  }, [confidenceData.color]);

  return (
    <div className="space-y-2">
      <div
        ref={badgeRef}
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition-all"
        style={{
          backgroundColor: `${confidenceData.color}15`,
          border: `1px solid ${confidenceData.color}`,
        }}
      >
        <span style={{ fontSize: '12px' }}>{confidenceData.icon}</span>
        <span
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '12px',
            fontWeight: 600,
            color: confidenceData.color,
            letterSpacing: '0.05em',
          }}
        >
          {confidenceData.label}
        </span>
        {totalSources !== undefined && (
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '12px',
              color: '#ABABAB',
            }}
          >
            ({totalSources} {totalSources === 1 ? 'source' : 'sources'})
          </span>
        )}
      </div>
      {confidenceData.showWarning && (
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '13px',
          color: '#ABABAB',
          fontStyle: 'italic',
        }}>
          Please verify this information with the source below
        </p>
      )}
    </div>
  );
}
