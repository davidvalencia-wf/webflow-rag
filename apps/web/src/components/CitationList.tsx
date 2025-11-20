'use client';

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { WebflowMark } from './WebflowLogo';

export interface Citation {
  uri: string;
  title: string;
  source_type?: string;
  section?: string;
}

interface CitationListProps {
  citations: Citation[];
}

/**
 * CitationList component - Display sources/references for RAG answers
 *
 * Features:
 * - Card-based layout with hover states
 * - Source type badges and icons (University, Blog, API Docs, Forum)
 * - External link indicators
 * - Section headings when available
 * - Responsive grid layout
 * - Webflow brand styling
 * - Smooth stagger animation on entrance
 */
export function CitationList({ citations }: CitationListProps) {
  // Animation is now handled by parent page.tsx for smooth top-to-bottom flow
  // Individual card animations removed to prevent conflicts

  if (!citations || citations.length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <h2 style={{
        fontFamily: 'var(--font-inter)',
        fontSize: '16px',
        fontWeight: 600,
        color: '#D8D8D8',
        marginBottom: '16px',
      }}>
        Sources ({citations.length})
      </h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {citations.map((citation, index) => (
          <CitationCard key={`${citation.uri}-${index}`} citation={citation} index={index} />
        ))}
      </div>

      <style jsx>{`
        .citation-card {
          opacity: 1; /* Ensure cards are visible by default */
        }
      `}</style>
    </div>
  );
}

/**
 * CitationCard - Individual citation card component
 */
function CitationCard({ citation, index }: { citation: Citation; index: number }) {
  const sourceType = citation.source_type || 'unknown';
  const { color, label } = getSourceTypeInfo(sourceType);

  return (
    <a
      href={citation.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="citation-card group block rounded-lg p-4 transition-all hover:scale-102 card-lift focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#146EF5]"
      style={{
        backgroundColor: '#222222',
        border: '1px solid #363636',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#363636';
        e.currentTarget.style.borderColor = '#146EF5';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#222222';
        e.currentTarget.style.borderColor = '#363636';
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        {/* Source type badge with Webflow logo */}
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 rounded-md p-1.5 flex items-center justify-center" style={{ backgroundColor: color, width: '28px', height: '28px' }}>
            <WebflowMark variant="white" size={16} />
          </div>
          <span style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '13px',
            fontWeight: 600,
            color: color,
            letterSpacing: '0.05em',
          }}>
            {label.toUpperCase()}
          </span>
        </div>

        {/* External link icon */}
        <ArrowTopRightOnSquareIcon
          className="h-4 w-4 transition-colors"
          style={{ color: '#898989' }}
          aria-hidden="true"
        />
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold line-clamp-2 transition-colors" style={{
        fontFamily: 'var(--font-inter)',
        color: '#FFFFFF',
      }}>
        {citation.title || 'Untitled Document'}
      </h3>

      {/* Section */}
      {citation.section && (
        <p className="mt-2 text-sm line-clamp-1" style={{
          fontFamily: 'var(--font-inter)',
          color: '#ABABAB',
        }}>
          {citation.section}
        </p>
      )}

      {/* URL preview */}
      <p className="mt-2 text-xs line-clamp-1 break-all" style={{
        fontFamily: 'var(--font-inter)',
        color: '#5A5A5A',
      }}>
        {getDomain(citation.uri)}
      </p>

      {/* Citation number badge */}
      <div className="mt-3 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium" style={{
        backgroundColor: '#146EF515',
        border: '1px solid #146EF5',
        color: '#146EF5',
        fontFamily: 'var(--font-inter)',
      }}>
        [{index + 1}]
      </div>
    </a>
  );
}

/**
 * getSourceTypeInfo - Returns color and label for source types
 */
function getSourceTypeInfo(sourceType: string): {
  color: string;
  label: string;
} {
  switch (sourceType.toLowerCase()) {
    case 'university':
      return {
        color: '#146EF5', // Webflow blue
        label: 'University',
      };
    case 'blog':
      return {
        color: '#8B5CF6', // Purple
        label: 'Blog',
      };
    case 'api-docs':
    case 'api':
      return {
        color: '#0EA5E9', // Sky blue
        label: 'API Docs',
      };
    case 'forum':
      return {
        color: '#10B981', // Green
        label: 'Forum',
      };
    default:
      return {
        color: '#898989', // Gray
        label: 'Documentation',
      };
  }
}

/**
 * getDomain - Extract domain from URL for display
 */
function getDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    return url;
  }
}
