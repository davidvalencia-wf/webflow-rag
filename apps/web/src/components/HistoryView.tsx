'use client';

import { useState, useEffect } from 'react';
import { ClockIcon, XMarkIcon, TrashIcon } from '@heroicons/react/24/outline';

interface HistoryItem {
  query: string;
  timestamp: number;
}

interface HistoryViewProps {
  onQuerySelect: (query: string) => void;
  currentQuery?: string;
}

const STORAGE_KEY = 'webflow-rag-history';
const MAX_HISTORY_ITEMS = 10;

/**
 * HistoryView component - Display and manage search history
 *
 * Features:
 * - Stores recent queries in localStorage (client-side only, no auth in MVP)
 * - Click to re-run previous query
 * - Clear individual items or entire history
 * - Collapsible sidebar/dropdown design
 * - Responsive (hidden on mobile, expandable on desktop)
 */
export function HistoryView({ onQuerySelect, currentQuery }: HistoryViewProps) {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as HistoryItem[];
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading from localStorage on mount is a valid use case
        setHistory(parsed);
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  }, []);

  // Save current query to history when it changes
  useEffect(() => {
    if (!currentQuery || !currentQuery.trim()) {
      return;
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let currentHistory: HistoryItem[] = stored ? JSON.parse(stored) : [];

      // Don't add duplicates (check if query already exists)
      const isDuplicate = currentHistory.some(item => item.query === currentQuery.trim());
      if (isDuplicate) {
        return;
      }

      // Add new item at the beginning
      const newItem: HistoryItem = {
        query: currentQuery.trim(),
        timestamp: Date.now(),
      };

      currentHistory = [newItem, ...currentHistory];

      // Keep only MAX_HISTORY_ITEMS
      if (currentHistory.length > MAX_HISTORY_ITEMS) {
        currentHistory = currentHistory.slice(0, MAX_HISTORY_ITEMS);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentHistory));
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Syncing state with localStorage is a valid use case
      setHistory(currentHistory);
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  }, [currentQuery]);

  const removeFromHistory = (timestamp: number) => {
    try {
      const newHistory = history.filter(item => item.timestamp !== timestamp);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
      setHistory(newHistory);
    } catch (error) {
      console.error('Failed to remove history item:', error);
    }
  };

  const clearHistory = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setHistory([]);
      setIsExpanded(false);
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  };

  const handleQueryClick = (query: string) => {
    onQuerySelect(query);
    setIsExpanded(false);
  };

  // Don't render if no history
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          color: '#FFFFFF',
          fontFamily: 'var(--font-inter)',
        }}
        aria-expanded={isExpanded}
        aria-label="View search history"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#363636';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        <ClockIcon className="h-5 w-5" style={{ color: '#146EF5' }} aria-hidden="true" />
        <span className="hidden sm:inline">Recent searches</span>
        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium" style={{
          backgroundColor: '#363636',
          color: '#D8D8D8',
        }}>
          {history.length}
        </span>
      </button>

      {/* History dropdown */}
      {isExpanded && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 z-10 sm:hidden"
            onClick={() => setIsExpanded(false)}
            aria-hidden="true"
          />

          {/* Dropdown panel */}
          <div
            className="absolute right-0 z-20 mt-2 w-80 sm:w-96 rounded-lg bg-white shadow-lg border border-gray-200 overflow-hidden"
            onMouseLeave={() => setIsExpanded(false)}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <ClockIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                Recent Searches
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearHistory}
                  className="text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors"
                  aria-label="Clear all history"
                >
                  <TrashIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  Clear all
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="rounded-md p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all"
                  aria-label="Close history"
                >
                  <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* History list */}
            <div className="max-h-80 overflow-y-auto">
              {history.map((item) => (
                <div
                  key={item.timestamp}
                  className="group flex items-start gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <button
                    onClick={() => handleQueryClick(item.query)}
                    className="flex-1 text-left text-sm text-gray-900 hover:text-indigo-600 transition-colors focus:outline-none focus:text-indigo-600"
                  >
                    <p className="line-clamp-2">{item.query}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatTimestamp(item.timestamp)}
                    </p>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromHistory(item.timestamp);
                    }}
                    className="flex-shrink-0 rounded-md p-1 text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-200 hover:text-red-600 transition-all focus:opacity-100"
                    aria-label="Remove from history"
                  >
                    <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * formatTimestamp - Format timestamp to relative time
 */
function formatTimestamp(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return 'Just now';
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (days < 7) {
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return new Date(timestamp).toLocaleDateString();
  }
}
