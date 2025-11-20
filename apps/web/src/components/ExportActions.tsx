'use client';

import { useState } from 'react';
import {
  ShareIcon,
  ArrowDownTrayIcon,
  ChatBubbleLeftIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import type { Citation } from './CitationList';
import toast from 'react-hot-toast';

interface ExportActionsProps {
  query: string;
  answer: string;
  citations: Citation[];
}

export function ExportActions({ query, answer, citations }: ExportActionsProps) {
  const [copied, setCopied] = useState<'share' | 'slack' | null>(null);

  // Generate shareable URL
  const handleShareURL = async () => {
    const params = new URLSearchParams({ q: query });
    const url = `${window.location.origin}?${params.toString()}`;

    await navigator.clipboard.writeText(url);
    setCopied('share');
    toast.success('Link copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  // Export as Markdown
  const handleExportMarkdown = () => {
    const markdown = generateMarkdown(query, answer, citations);
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `webflow-qa-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Markdown file downloaded!');
  };

  // Copy for Slack
  const handleCopySlack = async () => {
    const slackFormat = generateSlackFormat(query, answer, citations);
    await navigator.clipboard.writeText(slackFormat);
    setCopied('slack');
    toast.success('Slack format copied!');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="mt-4 rounded-lg p-5" style={{
      backgroundColor: '#1A1A1A',
      border: '1px solid #555555',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-inter)',
        fontSize: '16px',
        fontWeight: 600,
        color: '#FFFFFF',
        marginBottom: '16px',
      }}>
        Share & Export
      </h3>

      <div className="flex flex-wrap items-center gap-3">
        {/* Share URL */}
        <button
          onClick={handleShareURL}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-md transition-all hover:scale-105 active:scale-95"
          style={{
            backgroundColor: copied === 'share' ? '#10B981' : '#363636',
            color: '#FFFFFF',
            border: `1px solid ${copied === 'share' ? '#10B981' : '#555555'}`,
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            fontWeight: 600,
          }}
          onMouseEnter={(e) => {
            if (copied !== 'share') {
              e.currentTarget.style.backgroundColor = '#146EF5';
              e.currentTarget.style.borderColor = '#146EF5';
            }
          }}
          onMouseLeave={(e) => {
            if (copied !== 'share') {
              e.currentTarget.style.backgroundColor = '#363636';
              e.currentTarget.style.borderColor = '#555555';
            }
          }}
          aria-label="Copy shareable link"
        >
          {copied === 'share' ? (
            <>
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
              <span>Link copied!</span>
            </>
          ) : (
            <>
              <ShareIcon className="h-5 w-5" aria-hidden="true" />
              <span>Copy link</span>
            </>
          )}
        </button>

        {/* Download Markdown */}
        <button
          onClick={handleExportMarkdown}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-md transition-all hover:scale-105 active:scale-95"
          style={{
            backgroundColor: '#363636',
            color: '#FFFFFF',
            border: '1px solid #555555',
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            fontWeight: 600,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#146EF5';
            e.currentTarget.style.borderColor = '#146EF5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#363636';
            e.currentTarget.style.borderColor = '#555555';
          }}
          aria-label="Download as Markdown"
        >
          <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />
          <span>Download MD</span>
        </button>

        {/* Copy for Slack */}
        <button
          onClick={handleCopySlack}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-md transition-all hover:scale-105 active:scale-95"
          style={{
            backgroundColor: copied === 'slack' ? '#10B981' : '#363636',
            color: '#FFFFFF',
            border: `1px solid ${copied === 'slack' ? '#10B981' : '#555555'}`,
            fontFamily: 'var(--font-inter)',
            fontSize: '15px',
            fontWeight: 600,
          }}
          onMouseEnter={(e) => {
            if (copied !== 'slack') {
              e.currentTarget.style.backgroundColor = '#146EF5';
              e.currentTarget.style.borderColor = '#146EF5';
            }
          }}
          onMouseLeave={(e) => {
            if (copied !== 'slack') {
              e.currentTarget.style.backgroundColor = '#363636';
              e.currentTarget.style.borderColor = '#555555';
            }
          }}
          aria-label="Copy for Slack"
        >
          {copied === 'slack' ? (
            <>
              <CheckIcon className="h-5 w-5" aria-hidden="true" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <ChatBubbleLeftIcon className="h-5 w-5" aria-hidden="true" />
              <span>Copy for Slack</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// Helper: Generate Markdown format
function generateMarkdown(query: string, answer: string, citations: Citation[]): string {
  let markdown = `# Webflow Q&A\n\n`;
  markdown += `**Question:** ${query}\n\n`;
  markdown += `**Answer:**\n\n${answer}\n\n`;

  if (citations.length > 0) {
    markdown += `## Sources\n\n`;
    citations.forEach((citation, idx) => {
      markdown += `${idx + 1}. [${citation.title}](${citation.uri})`;
      if (citation.section) {
        markdown += ` - ${citation.section}`;
      }
      markdown += '\n';
    });
  }

  markdown += `\n---\n`;
  markdown += `*Generated by Webflow AI Assistant on ${new Date().toLocaleDateString()}*\n`;

  return markdown;
}

// Helper: Generate Slack format (using mrkdwn)
function generateSlackFormat(query: string, answer: string, citations: Citation[]): string {
  let slack = `*Question:* ${query}\n\n`;
  slack += `*Answer:*\n${answer}\n\n`;

  if (citations.length > 0) {
    slack += `*Sources:*\n`;
    citations.forEach((citation, idx) => {
      slack += `${idx + 1}. <${citation.uri}|${citation.title}>`;
      if (citation.section) {
        slack += ` - ${citation.section}`;
      }
      slack += '\n';
    });
  }

  return slack;
}
