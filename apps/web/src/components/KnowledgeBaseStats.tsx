'use client';

import { useEffect, useState, useRef } from 'react';
import { CircleStackIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { AnimatedCounter } from './AnimatedCounter';
import gsap from 'gsap';
import { prefersReducedMotion } from '@/lib/animations';

interface Stats {
  documents: {
    total: number;
    by_source: Record<string, number>;
  };
  chunks: {
    total: number;
    avg_tokens: number;
  };
  vectors: {
    total: number;
  };
  last_updated?: string;
}

export function KnowledgeBaseStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load stats:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchStats();
  }, []);

  // Entrance animation
  useEffect(() => {
    if (!loading && stats && containerRef.current && !prefersReducedMotion()) {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }, [loading, stats]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchStats();

    // Animate stats cards on refresh
    if (statsRef.current && !prefersReducedMotion()) {
      const cards = statsRef.current.querySelectorAll('.stat-card');
      gsap.from(cards, {
        opacity: 0,
        scale: 0.95,
        stagger: 0.08,
        duration: 0.4,
        ease: 'back.out(1.7)',
      });
    }

    setTimeout(() => setRefreshing(false), 500);
  };

  if (loading) {
    // Skeleton loading state
    return (
      <div
        className="rounded-lg p-4 mb-6 animate-pulse"
        style={{
          backgroundColor: '#222222',
          border: '1px solid #363636',
        }}
      >
        <div className="h-4 bg-gray-700 rounded w-32 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="space-y-2">
              <div className="h-8 bg-gray-700 rounded"></div>
              <div className="h-3 bg-gray-700 rounded w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div
      ref={containerRef}
      className="rounded-lg p-4 mb-6 transition-all hover:shadow-lg"
      style={{
        backgroundColor: '#222222',
        border: '1px solid #363636',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CircleStackIcon className="h-5 w-5" style={{ color: '#146EF5' }} aria-hidden="true" />
          <h3 style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '14px',
            fontWeight: 600,
            color: '#D8D8D8',
          }}>
            Knowledge Base
          </h3>
        </div>

        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-1.5 rounded-md transition-all hover:bg-gray-700"
          style={{
            color: refreshing ? '#146EF5' : '#ABABAB',
          }}
          aria-label="Refresh statistics"
        >
          <ArrowPathIcon
            className="h-4 w-4 transition-transform"
            style={{
              transform: refreshing ? 'rotate(360deg)' : 'rotate(0deg)',
              transition: 'transform 0.5s ease',
            }}
          />
        </button>
      </div>

      <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="stat-card p-3 rounded-lg transition-all hover:bg-gray-800" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <AnimatedCounter
            target={stats.chunks.total}
            style={{
              fontFamily: 'var(--font-poppins)',
              fontSize: '32px',
              fontWeight: 600,
              color: '#FFFFFF',
              display: 'block',
              marginBottom: '4px',
            }}
          />
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            fontWeight: 500,
            color: '#ABABAB',
          }}>
            Documentation chunks
          </p>
        </div>

        <div className="stat-card p-3 rounded-lg transition-all hover:bg-gray-800" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <AnimatedCounter
            target={stats.documents.total}
            style={{
              fontFamily: 'var(--font-poppins)',
              fontSize: '32px',
              fontWeight: 600,
              color: '#FFFFFF',
              display: 'block',
              marginBottom: '4px',
            }}
          />
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            fontWeight: 500,
            color: '#ABABAB',
          }}>
            Source documents
          </p>
        </div>

        <div className="stat-card p-3 rounded-lg transition-all hover:bg-gray-800" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <AnimatedCounter
            target={Object.keys(stats.documents.by_source).length}
            style={{
              fontFamily: 'var(--font-poppins)',
              fontSize: '32px',
              fontWeight: 600,
              color: '#FFFFFF',
              display: 'block',
              marginBottom: '4px',
            }}
          />
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            fontWeight: 500,
            color: '#ABABAB',
          }}>
            Source types
          </p>
        </div>

        <div className="stat-card p-3 rounded-lg transition-all hover:bg-gray-800" style={{ backgroundColor: 'rgba(255,255,255,0.02)' }}>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '16px',
            fontWeight: 600,
            color: '#146EF5',
            marginBottom: '4px',
          }}>
            {formatDate(stats.last_updated)}
          </p>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            fontWeight: 500,
            color: '#ABABAB',
          }}>
            Last updated
          </p>
        </div>
      </div>

      {/* Source breakdown with progress bars */}
      {Object.keys(stats.documents.by_source).length > 0 && (
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid #363636' }}>
          <div className="space-y-2">
            {Object.entries(stats.documents.by_source).map(([source, count]) => {
              const percentage = (count / stats.documents.total) * 100;
              return (
                <div key={source} className="flex items-center gap-3">
                  <span
                    className="px-2 py-1 rounded-md text-xs min-w-[100px]"
                    style={{
                      backgroundColor: '#363636',
                      color: '#D8D8D8',
                      fontFamily: 'var(--font-inter)',
                      fontWeight: 600,
                    }}
                  >
                    {source}
                  </span>
                  <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-out"
                      style={{
                        width: `${percentage}%`,
                        background: 'linear-gradient(90deg, #146EF5, #0D5FE3)',
                      }}
                    />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '12px',
                    color: '#ABABAB',
                    minWidth: '40px',
                    textAlign: 'right',
                  }}>
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
