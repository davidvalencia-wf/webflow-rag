'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface StreamingAnswerProps {
  content: string;
  isStreaming: boolean;
  isLoading: boolean;
  error?: string | null;
}

/**
 * StreamingAnswer component - Displays LLM responses with typewriter effect
 *
 * Features:
 * - Progressive rendering as content streams in
 * - Markdown-like formatting (basic support)
 * - Smooth fade-in animation
 * - Copy to clipboard functionality
 * - Loading skeleton while waiting
 * - Error state handling
 */
export function StreamingAnswer({
  content,
  isStreaming,
  isLoading,
  error,
}: StreamingAnswerProps) {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom as content streams in
  useEffect(() => {
    if (contentRef.current && isStreaming) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [content, isStreaming]);

  const handleCopy = async () => {
    if (content) {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Loading skeleton
  if (isLoading && !content) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200 animate-pulse">
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-6 border border-red-200">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">
              Something went wrong
            </h3>
            <p className="mt-2 text-sm text-red-700">{error}</p>
            <p className="mt-2 text-sm text-red-600">
              Try rephrasing your question or check your connection.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // No content state
  if (!content) {
    return null;
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm border border-gray-200 relative group">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Copy answer to clipboard"
      >
        {copied ? (
          <CheckIcon className="h-5 w-5 text-green-500" aria-hidden="true" />
        ) : (
          <ClipboardDocumentIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {/* Answer content with basic markdown-like formatting */}
      <div
        ref={contentRef}
        className="prose prose-sm max-w-none text-gray-900 pr-10"
        style={{
          fontSize: '17px',
          lineHeight: '1.7',
        }}
      >
        <FormattedContent content={content} />
      </div>

      {/* Streaming indicator */}
      {isStreaming && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
          <span>Generating answer...</span>
        </div>
      )}
    </div>
  );
}

/**
 * CodeBlock - Syntax-highlighted code block with copy button
 */
function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Language mapping for better display names
  const languageLabels: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    js: 'JavaScript',
    ts: 'TypeScript',
    jsx: 'JSX',
    tsx: 'TSX',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON',
    python: 'Python',
    bash: 'Bash',
    shell: 'Shell',
  };

  const displayLanguage = languageLabels[language.toLowerCase()] || language.toUpperCase();

  return (
    <div className="relative my-4 rounded-lg overflow-hidden" style={{ backgroundColor: '#282c34', border: '1px solid #363636' }}>
      {/* Header with language label and copy button */}
      <div className="flex items-center justify-between px-4 py-2" style={{ backgroundColor: '#21252b', borderBottom: '1px solid #363636' }}>
        <span className="text-xs font-medium" style={{ color: '#abb2bf' }}>
          {displayLanguage}
        </span>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded transition-colors"
          style={{ backgroundColor: 'transparent' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#363636')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <CheckIcon className="h-4 w-4" style={{ color: '#98c379' }} aria-hidden="true" />
          ) : (
            <ClipboardDocumentIcon className="h-4 w-4" style={{ color: '#abb2bf' }} aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Code content with syntax highlighting */}
      <SyntaxHighlighter
        language={language.toLowerCase()}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          backgroundColor: '#282c34',
          fontSize: '14px',
          lineHeight: '1.6',
        }}
        codeTagProps={{
          style: {
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          },
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

/**
 * FormattedContent - Enhanced markdown-like formatting with syntax highlighting
 * Handles: bold, italic, code blocks (fenced and indented), lists, headings
 */
function FormattedContent({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactElement[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code blocks (```language)
    if (line.trim().startsWith('```')) {
      const language = line.trim().slice(3).trim() || 'text';
      const codeLines: string[] = [];
      i++; // Move past opening fence

      // Collect code block lines
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }

      elements.push(
        <CodeBlock key={elements.length} code={codeLines.join('\n')} language={language} />
      );
      i++; // Move past closing fence
      continue;
    }

    // Indented code blocks (4 spaces or tab)
    if (line.startsWith('    ') || line.startsWith('\t')) {
      const codeLines: string[] = [line.replace(/^    |\t/, '')];
      i++;

      // Collect consecutive indented lines
      while (i < lines.length && (lines[i].startsWith('    ') || lines[i].startsWith('\t'))) {
        codeLines.push(lines[i].replace(/^    |\t/, ''));
        i++;
      }

      elements.push(
        <CodeBlock key={elements.length} code={codeLines.join('\n')} language="text" />
      );
      continue;
    }

    // Headings
    if (line.startsWith('###')) {
      elements.push(<h3 key={elements.length} className="text-lg font-semibold mt-4 mb-2">{line.replace(/^###\s*/, '')}</h3>);
      i++;
      continue;
    }
    if (line.startsWith('##')) {
      elements.push(<h2 key={elements.length} className="text-xl font-semibold mt-4 mb-2">{line.replace(/^##\s*/, '')}</h2>);
      i++;
      continue;
    }
    if (line.startsWith('#')) {
      elements.push(<h1 key={elements.length} className="text-2xl font-bold mt-4 mb-2">{line.replace(/^#\s*/, '')}</h1>);
      i++;
      continue;
    }

    // Lists (unordered)
    if (line.match(/^[\*\-]\s/)) {
      elements.push(
        <li key={elements.length} className="ml-4">
          {formatInlineText(line.replace(/^[\*\-]\s/, ''))}
        </li>
      );
      i++;
      continue;
    }

    // Lists (ordered)
    if (line.match(/^\d+\.\s/)) {
      elements.push(
        <li key={elements.length} className="ml-4 list-decimal">
          {formatInlineText(line.replace(/^\d+\.\s/, ''))}
        </li>
      );
      i++;
      continue;
    }

    // Empty lines
    if (line.trim() === '') {
      elements.push(<br key={elements.length} />);
      i++;
      continue;
    }

    // Regular paragraphs
    elements.push(<p key={elements.length}>{formatInlineText(line)}</p>);
    i++;
  }

  return <div className="space-y-2">{elements}</div>;
}

/**
 * formatInlineText - Format inline markdown (bold, italic, code)
 */
function formatInlineText(text: string) {
  // This is a simple implementation - for production, consider using a proper markdown library
  // Split by backticks for code
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-indigo-600">
          {part.slice(1, -1)}
        </code>
      );
    }

    // Handle bold and italic (basic support)
    let formattedPart = part;

    // Bold (**text**)
    formattedPart = formattedPart.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic (*text*)
    formattedPart = formattedPart.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    if (formattedPart.includes('<')) {
      return <span key={index} dangerouslySetInnerHTML={{ __html: formattedPart }} />;
    }

    return <span key={index}>{part}</span>;
  });
}
