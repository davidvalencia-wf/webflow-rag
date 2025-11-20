'use client';

import { useState, useRef, useEffect } from 'react';
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

/**
 * SearchBox component - Premium search input following Webflow brand guidelines
 *
 * Features:
 * - 80px height - HERO size, search is the primary focus
 * - 20px font size for bold, confident feel
 * - Blue glow on focus state with stronger depth
 * - Premium inner shadow for depth
 * - Blue arrow submit button with pulse animation
 * - Webflow brand colors (Gray 800 background, Gray 700 border)
 */
export function SearchBox({
  onSearch,
  isLoading = false,
  disabled = false,
  placeholder = "How do I create a collection in Webflow?",
  autoFocus = true,
}: SearchBoxProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery && !isLoading && !disabled) {
      onSearch(trimmedQuery);
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const isDisabled = isLoading || disabled;
  const showClearButton = query.length > 0 && !isLoading;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        {/* Input field with premium styling */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isDisabled}
          placeholder={placeholder}
          aria-label="Search query"
          aria-describedby="search-description"
          style={{
            backgroundColor: '#222222', // Gray 800
            borderColor: isFocused ? '#146EF5' : '#363636', // Brand Blue : Gray 700
            borderWidth: '3px', // Stronger border for hero element
            color: '#FFFFFF',
            minHeight: '80px', // HERO size - search is the star of the page
            boxShadow: isFocused
              ? '0 0 0 4px rgba(20, 110, 245, 0.15), inset 0 2px 6px rgba(0,0,0,0.15)'
              : 'inset 0 2px 6px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)',
          }}
          className={`
            block w-full rounded-lg pl-7 pr-28
            text-[20px] placeholder:text-[#757575]
            transition-all duration-200
            focus:outline-none
            disabled:cursor-not-allowed disabled:opacity-50
            ${isLoading ? 'animate-pulse' : ''}
          `}
        />

        {/* Clear button */}
        {showClearButton && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-20 flex items-center pr-3 hover:opacity-70 transition-opacity"
            aria-label="Clear search"
            style={{ color: '#757575' }} // Gray 500
          >
            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        )}

        {/* Submit button - Blue arrow with pulse on focus */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <button
            type="submit"
            disabled={isDisabled || !query.trim()}
            className={`
              rounded-md px-5 py-3.5 active-scale
              transition-all duration-200
              ${
                isDisabled || !query.trim()
                  ? 'cursor-not-allowed opacity-40'
                  : 'hover:opacity-80'
              }
              ${isFocused && query.trim() ? 'animate-pulse-slow' : ''}
            `}
            style={{
              backgroundColor: '#146EF5', // Brand Blue
            }}
            aria-label="Submit search"
          >
            {isLoading ? (
              <svg
                className="h-6 w-6 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <ArrowRightIcon className="h-6 w-6 text-white" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Screen reader description */}
      <p id="search-description" className="sr-only">
        Enter your question about Webflow and press Enter or click the arrow button to search
      </p>
    </form>
  );
}
