'use client';

import { useState, Fragment } from 'react';
import { ArrowPathIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

export type RegenerateStrategy = 'default' | 'more-sources' | 'simpler' | 'technical';

interface RegenerateButtonProps {
  onRegenerate: (strategy: RegenerateStrategy) => void;
  isLoading?: boolean;
}

/**
 * RegenerateButton - Allows users to regenerate answers with different strategies
 *
 * Strategies:
 * - default: Re-run with same parameters (natural randomness)
 * - more-sources: Increase top_k from 5 to 10
 * - simpler: Add prompt modifier for simpler explanation
 * - technical: Add prompt modifier for more technical details
 */
export function RegenerateButton({ onRegenerate, isLoading = false }: RegenerateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const strategies = [
    {
      key: 'default' as const,
      label: 'Re-generate',
      description: 'Try again with default settings',
      icon: '🔄',
    },
    {
      key: 'more-sources' as const,
      label: 'Search more sources',
      description: 'Expand search to 10 sources',
      icon: '📚',
    },
    {
      key: 'simpler' as const,
      label: 'Explain simpler',
      description: 'Get a beginner-friendly explanation',
      icon: '💡',
    },
    {
      key: 'technical' as const,
      label: 'More technical',
      description: 'Get advanced technical details',
      icon: '⚙️',
    },
  ];

  const handleStrategyClick = (strategy: RegenerateStrategy) => {
    setIsOpen(false);
    onRegenerate(strategy);
  };

  return (
    <div className="relative inline-block">
      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 rounded-md transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: '#222222',
          border: '1px solid #363636',
          color: '#D8D8D8',
          fontFamily: 'var(--font-inter)',
          fontSize: '14px',
          fontWeight: 500,
        }}
        onMouseEnter={(e) => {
          if (!isLoading) {
            e.currentTarget.style.backgroundColor = '#363636';
            e.currentTarget.style.borderColor = '#146EF5';
            e.currentTarget.style.color = '#FFFFFF';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#222222';
          e.currentTarget.style.borderColor = '#363636';
          e.currentTarget.style.color = '#D8D8D8';
        }}
        aria-label="Regenerate answer with different approach"
      >
        {isLoading ? (
          <>
            <ArrowPathIcon className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Regenerating...</span>
          </>
        ) : (
          <>
            <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
            <span>Try different approach</span>
            <ChevronDownIcon className="h-3.5 w-3.5" aria-hidden="true" />
          </>
        )}
      </button>

      {/* Dropdown menu */}
      {isOpen && !isLoading && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu */}
          <div
            className="absolute left-0 mt-2 w-72 rounded-lg shadow-xl z-20 overflow-hidden"
            style={{
              backgroundColor: '#171717',
              border: '1px solid #363636',
            }}
          >
            <div className="p-2 space-y-1">
              {strategies.map((strategy) => (
                <button
                  key={strategy.key}
                  onClick={() => handleStrategyClick(strategy.key)}
                  className="w-full text-left px-3 py-2.5 rounded-md transition-all flex items-start gap-3"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#D8D8D8',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#363636';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span className="text-lg" aria-hidden="true">
                    {strategy.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        marginBottom: '2px',
                      }}
                    >
                      {strategy.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '12px',
                        color: '#898989',
                        lineHeight: '1.4',
                      }}
                    >
                      {strategy.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
