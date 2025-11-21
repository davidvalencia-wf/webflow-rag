'use client';

import { useState, useEffect, useRef } from 'react';
import { SearchBox } from '@/components/SearchBox';
import { StreamingAnswer } from '@/components/StreamingAnswer';
import { CitationList, type Citation } from '@/components/CitationList';
import { FeedbackWidget } from '@/components/FeedbackWidget';
import { HistoryView } from '@/components/HistoryView';
import { WebflowMark } from '@/components/WebflowLogo';
import { ExportActions } from '@/components/ExportActions';
import { ConfidenceBadge } from '@/components/ConfidenceBadge';
import { SavedConversations } from '@/components/SavedConversations';
import { RegenerateButton, type RegenerateStrategy } from '@/components/RegenerateButton';
import { saveConversation, type ConversationTurn as SavedConversationTurn } from '@/lib/saved-conversations';
import type { ConversationMessage, SourceType } from '@/lib/types';
import {
  CircleStackIcon,
  QuestionMarkCircleIcon,
  CodeBracketIcon,
  SparklesIcon,
  CursorArrowRaysIcon,
  DocumentTextIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from '@/lib/animations';
import toast from 'react-hot-toast';

interface StreamEvent {
  type: 'chunk' | 'done' | 'error' | 'related_questions';
  content?: string;
  sources?: Citation[];
  related_questions?: string[];
  error?: string;
  confidence?: number;
  total_sources?: number;
}

interface ConversationTurn {
  query: string;
  answer: string;
  citations: Citation[];
  responseId: string | null;
  relatedQuestions?: string[];
  confidence?: number;
  timestamp: string;
}

// Suggestion categories with icons
const EXAMPLE_QUESTIONS = [
  {
    text: "How do I create a collection in Webflow?",
    icon: CircleStackIcon,
  },
  {
    text: "What's the difference between classes and combos?",
    icon: QuestionMarkCircleIcon,
  },
  {
    text: "Can I use custom code in Webflow?",
    icon: CodeBracketIcon,
  },
  {
    text: "How do Webflow interactions work?",
    icon: CursorArrowRaysIcon,
  },
  {
    text: "What are CMS dynamic lists?",
    icon: DocumentTextIcon,
  },
  {
    text: "How do I set up a custom domain?",
    icon: SparklesIcon,
  },
];

export default function Home() {
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentCitations, setCurrentCitations] = useState<Citation[]>([]);
  const [currentRelatedQuestions, setCurrentRelatedQuestions] = useState<string[]>([]);
  const [currentConfidence, setCurrentConfidence] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseId, setResponseId] = useState<string | null>(null);
  const [sourceFilters, setSourceFilters] = useState<SourceType[]>([]);

  // Computed value - must be defined before useEffect hooks that use it
  const showResults = currentAnswer || error || conversation.length > 0;

  // Refs for animations
  const heroRef = useRef<HTMLDivElement>(null);
  const relatedQuestionsRef = useRef<HTMLDivElement>(null);

  // Smooth hero entrance animation with staggered elements
  useGSAP(() => {
    if (!heroRef.current || prefersReducedMotion()) return;

    const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

    // Progressive reveal with gentle stagger
    tl.from('.hero-heading', {
      opacity: 0,
      y: 30,
      duration: 0.8,
    })
    .from('.hero-search-box', {
      opacity: 0,
      y: 20,
      duration: 0.7,
    }, '-=0.4')
    .from('.hero-filters', {
      opacity: 0,
      y: 15,
      duration: 0.6,
    }, '-=0.4')
    .from('.hero-try-asking', {
      opacity: 0,
      y: 15,
      duration: 0.5,
    }, '-=0.3')
    .from('.hero-example-card', {
      opacity: 0,
      y: 20,
      stagger: 0.08,
      duration: 0.5,
    }, '-=0.3')
    .from('.hero-trust', {
      opacity: 0,
      y: 15,
      duration: 0.6,
    }, '-=0.2');
  }, { dependencies: [], scope: heroRef });

  // Smooth sequential animation for all result sections (top to bottom)
  useEffect(() => {
    if (!currentAnswer || isStreaming || prefersReducedMotion()) return;

    // Minimal delay to ensure DOM is ready - reduced from 100ms to 50ms
    const timer = setTimeout(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

      // Set initial state immediately to prevent any flash
      gsap.set(['.result-confidence', '.result-export', '.result-citations', '.result-related', '.result-feedback'], { opacity: 0, y: 15 });

      if (relatedQuestionsRef.current) {
        const questions = relatedQuestionsRef.current.querySelectorAll('.related-question');
        gsap.set(questions, { opacity: 0, y: 10 });
      }

      // Sequence from top to bottom with smooth transitions
      tl.to('.result-confidence', { opacity: 1, y: 0, duration: 0.5 })
        .to('.result-export', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .to('.result-citations', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .to('.result-related', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
        .to('.result-feedback', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

      // Animate related question items with subtle stagger
      if (relatedQuestionsRef.current) {
        const questions = relatedQuestionsRef.current.querySelectorAll('.related-question');
        tl.to(questions, {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.4,
          ease: 'power1.out',
        }, '-=0.4');
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [currentAnswer, isStreaming]);

  // Removed problematic results animation - keeping it simple

  // Handle shared URL query params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedQuery = params.get('q');
    if (sharedQuery) {
      handleSearch(sharedQuery);
      // Clean up URL without reloading
      window.history.replaceState({}, '', window.location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (searchQuery: string, clearConversation: boolean = false) => {
    // Save current answer to conversation history before starting new query
    if (currentQuery && currentAnswer && !isStreaming && !isLoading) {
      setConversation(prev => [...prev, {
        query: currentQuery,
        answer: currentAnswer,
        citations: currentCitations,
        responseId: responseId,
        relatedQuestions: currentRelatedQuestions,
        confidence: currentConfidence,
        timestamp: new Date().toISOString(),
      }]);
    }

    // Reset current answer state
    setCurrentQuery(searchQuery);
    setCurrentAnswer('');
    setCurrentCitations([]);
    setCurrentRelatedQuestions([]);
    setCurrentConfidence(undefined);
    setError(null);
    setResponseId(null);
    setIsLoading(true);
    setIsStreaming(false);

    // Clear conversation if requested (new topic)
    if (clearConversation) {
      setConversation([]);
    }

    try {
      // Build conversation history for API
      const conversationHistory: ConversationMessage[] = conversation.flatMap(turn => [
        { role: 'user' as const, content: turn.query, timestamp: turn.timestamp },
        { role: 'assistant' as const, content: turn.answer, timestamp: turn.timestamp },
      ]);

      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          conversation_history: conversationHistory,
          source_filters: sourceFilters.length > 0 ? sourceFilters : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch answer');
      }

      setIsLoading(false);
      setIsStreaming(true);

      // Process streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let buffer = '';
      let fullAnswer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          setIsStreaming(false);
          // Don't add to conversation here - wait until next query is submitted
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');

        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();

            if (data === '[DONE]') {
              setIsStreaming(false);
              continue;
            }

            try {
              const event: StreamEvent = JSON.parse(data);

              if (event.type === 'chunk' && event.content) {
                fullAnswer += event.content;
                setCurrentAnswer((prev) => prev + event.content);
              } else if (event.type === 'done') {
                if (event.sources) {
                  setCurrentCitations(event.sources);
                }
                if (event.confidence !== undefined) {
                  setCurrentConfidence(event.confidence);
                }
                setResponseId(crypto.randomUUID());
              } else if (event.type === 'related_questions' && event.related_questions) {
                setCurrentRelatedQuestions(event.related_questions);
              } else if (event.type === 'error') {
                setError(event.error || 'An error occurred');
                setIsStreaming(false);
              }
            } catch (e) {
              console.error('Failed to parse stream event:', e);
            }
          }
        }
      }
    } catch (err) {
      setIsLoading(false);
      setIsStreaming(false);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  const handleHistorySelect = (historicalQuery: string) => {
    handleSearch(historicalQuery, true); // Clear conversation for historical queries
  };

  const handleRelatedQuestionClick = (question: string) => {
    handleSearch(question, false); // Keep conversation context
  };

  const handleNewConversation = () => {
    setConversation([]);
    setCurrentQuery('');
    setCurrentAnswer('');
    setCurrentCitations([]);
    setCurrentRelatedQuestions([]);
    setCurrentConfidence(undefined);
    setError(null);
  };

  const handleSaveConversation = () => {
    // Combine previous conversation and current turn if available
    const fullConversation: ConversationTurn[] = [...conversation];

    if (currentQuery && currentAnswer && !isStreaming && !isLoading) {
      fullConversation.push({
        query: currentQuery,
        answer: currentAnswer,
        citations: currentCitations,
        responseId: responseId,
        relatedQuestions: currentRelatedQuestions,
        confidence: currentConfidence,
        timestamp: new Date().toISOString(),
      });
    }

    if (fullConversation.length === 0) {
      toast.error('No conversation to save');
      return;
    }

    try {
      saveConversation(fullConversation);
      toast.success('Conversation saved!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save conversation');
    }
  };

  const handleLoadConversation = (savedConversation: SavedConversationTurn[]) => {
    // Clear current state
    setCurrentQuery('');
    setCurrentAnswer('');
    setCurrentCitations([]);
    setCurrentRelatedQuestions([]);
    setCurrentConfidence(undefined);
    setError(null);

    // Load the saved conversation
    setConversation(savedConversation);
    toast.success('Conversation loaded!');
  };

  const handleRegenerate = async (strategy: RegenerateStrategy) => {
    if (!currentQuery) return;

    // Modify query based on strategy
    let modifiedQuery = currentQuery;
    let modifiedTopK = 5;

    switch (strategy) {
      case 'more-sources':
        modifiedTopK = 10;
        break;
      case 'simpler':
        modifiedQuery = `${currentQuery}\n\nExplain this in simple terms for beginners.`;
        break;
      case 'technical':
        modifiedQuery = `${currentQuery}\n\nProvide more technical details and advanced information.`;
        break;
      case 'default':
      default:
        // Use default parameters
        break;
    }

    // Reset current answer state (keep query displayed)
    setCurrentAnswer('');
    setCurrentCitations([]);
    setCurrentRelatedQuestions([]);
    setCurrentConfidence(undefined);
    setError(null);
    setResponseId(null);
    setIsLoading(true);
    setIsStreaming(false);

    try {
      // Build conversation history for API (don't include current incomplete turn)
      const conversationHistory: ConversationMessage[] = conversation.flatMap(turn => [
        { role: 'user' as const, content: turn.query, timestamp: turn.timestamp },
        { role: 'assistant' as const, content: turn.answer, timestamp: turn.timestamp },
      ]);

      const response = await fetch('/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: modifiedQuery,
          conversation_history: conversationHistory,
          source_filters: sourceFilters.length > 0 ? sourceFilters : undefined,
          options: {
            top_k: modifiedTopK,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch answer');
      }

      setIsLoading(false);
      setIsStreaming(true);

      // Process streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          setIsStreaming(false);
          // Note: We don't add to conversation here - user can decide if they like this version
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');

        // Keep the last incomplete line in the buffer
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();

            if (data === '[DONE]') {
              setIsStreaming(false);
              continue;
            }

            try {
              const event: StreamEvent = JSON.parse(data);

              if (event.type === 'chunk' && event.content) {
                setCurrentAnswer((prev) => prev + event.content);
              } else if (event.type === 'done') {
                if (event.sources) {
                  setCurrentCitations(event.sources);
                }
                if (event.confidence !== undefined) {
                  setCurrentConfidence(event.confidence);
                }
                setResponseId(crypto.randomUUID());
              } else if (event.type === 'related_questions' && event.related_questions) {
                setCurrentRelatedQuestions(event.related_questions);
              } else if (event.type === 'error') {
                setError(event.error || 'An error occurred');
                setIsStreaming(false);
              }
            } catch (e) {
              console.error('Failed to parse stream event:', e);
            }
          }
        }
      }
    } catch (err) {
      setIsLoading(false);
      setIsStreaming(false);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#171717' }}>
      {/* Header - Only shown when results are displayed */}
      {showResults && (
        <header className="sticky top-0 z-10 glass" style={{
          borderBottom: '1px solid #363636',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}>
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleNewConversation}
                className="flex items-center gap-3 transition-opacity hover:opacity-80 active:opacity-60"
                aria-label="Return to home and start new conversation"
              >
                <WebflowMark variant="white" size={40} />
                <div>
                  <h1 className="text-xl font-semibold" style={{
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-poppins)'
                  }}>
                    Flow Find
                  </h1>
                </div>
              </button>

              {/* History view in header */}
              <div className="flex items-center gap-3">
                <HistoryView onQuerySelect={handleHistorySelect} currentQuery={currentQuery} />
                <SavedConversations
                  onLoad={handleLoadConversation}
                  currentConversation={conversation}
                />
                <button
                  onClick={handleNewConversation}
                  className="px-3 py-1.5 rounded-md transition-all hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: '#222222',
                    border: '1px solid #363636',
                    color: '#D8D8D8',
                    fontFamily: 'var(--font-inter)',
                    fontSize: '15px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#363636';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#222222';
                    e.currentTarget.style.color = '#D8D8D8';
                  }}
                >
                  New Topic
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Hero section (shown when no results) */}
        {!showResults && (
          <div ref={heroRef}>
            {/* All hero content - elements have class names for GSAP targeting */}
            <div>
              {/* Main heading with gradient text and blue W mark */}
              <div className="hero-heading text-center mb-4" style={{ marginTop: '40px' }}>
                <h2
                  className="mb-4 flex items-center justify-center gap-3 flex-wrap"
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    fontSize: '60px',
                    fontWeight: 600,
                    lineHeight: '1.2',
                    letterSpacing: '0.01em',
                  }}
                >
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #D8D8D8 0%, #146EF5 70%, #0D5CD9 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Ask anything about
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <WebflowMark variant="blue" size={48} className="inline-block" />
                    <span
                      style={{
                        color: '#146EF5',
                      }}
                    >
                      Webflow
                    </span>
                  </span>
                </h2>
              </div>

              {/* Search box - THE HERO ELEMENT */}
              <div className="hero-search-box mb-8" style={{ marginTop: '24px' }}>
                <SearchBox
                  onSearch={handleSearch}
                  isLoading={isLoading}
                  autoFocus={true}
                />

                {/* Source type filters */}
                <div className="hero-filters mt-4 flex flex-wrap items-center justify-center gap-2">
                  <span style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '17px',
                    fontWeight: 500,
                    color: '#D8D8D8',
                    marginRight: '8px'
                  }}>
                    Filter sources:
                  </span>
                  {(['university', 'blog', 'api-docs', 'forum'] as const).map((sourceType) => {
                    const isActive = sourceFilters.includes(sourceType);
                    const labels = {
                      'university': 'University',
                      'blog': 'Blog',
                      'api-docs': 'API Docs',
                      'forum': 'Forum',
                    };

                    return (
                      <button
                        key={sourceType}
                        onClick={() => {
                          setSourceFilters(prev =>
                            prev.includes(sourceType)
                              ? prev.filter(f => f !== sourceType)
                              : [...prev, sourceType]
                          );
                        }}
                        className="px-3 py-1.5 text-sm rounded-full transition-all hover:scale-105 active:scale-95"
                        style={{
                          backgroundColor: isActive ? '#146EF5' : '#222222',
                          border: `1px solid ${isActive ? '#146EF5' : '#363636'}`,
                          color: isActive ? '#FFFFFF' : '#D8D8D8',
                          fontFamily: 'var(--font-inter)',
                        }}
                      >
                        {labels[sourceType]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Example questions with icons */}
              <div className="mb-12 hero-try-asking" style={{ marginTop: '48px' }}>
                <p
                  className="text-center mb-4"
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '17px',
                    fontWeight: 500,
                    color: '#D8D8D8',
                  }}
                >
                  Try asking:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {EXAMPLE_QUESTIONS.map((question, index) => {
                    const IconComponent = question.icon;
                    return (
                      <button
                        key={index}
                        onClick={() => handleSearch(question.text)}
                        className="hero-example-card card-lift rounded-lg p-2.5 text-left transition-all duration-200 flex items-start gap-2.5"
                        style={{
                          backgroundColor: '#222222',
                          border: '1px solid #363636',
                          color: '#D8D8D8',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#363636';
                          e.currentTarget.style.borderColor = '#146EF5';
                          e.currentTarget.style.color = '#FFFFFF';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#222222';
                          e.currentTarget.style.borderColor = '#363636';
                          e.currentTarget.style.color = '#D8D8D8';
                        }}
                      >
                        <IconComponent
                          className="h-4.5 w-4.5 flex-shrink-0 mt-0.5"
                          style={{ color: '#146EF5' }}
                          aria-hidden="true"
                        />
                        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '16px', fontWeight: 500 }}>
                          {question.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Trust indicator */}
              <div className="hero-trust text-center mt-16">
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 transition-all hover:scale-105"
                  style={{
                    backgroundColor: '#222222',
                    border: '1px solid #363636',
                  }}
                >
                  <SparklesIcon className="h-4 w-4" style={{ color: '#146EF5' }} aria-hidden="true" />
                  <span style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '15px',
                    color: '#898989'
                  }}>
                    Answers generated from official Webflow documentation
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search box when results are shown (compact version) */}
        {showResults && (
          <div>
            <div className="mb-8">
              <SearchBox
                onSearch={handleSearch}
                isLoading={isLoading}
                autoFocus={false}
              />

              {/* Source type filters */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#D8D8D8',
                  marginRight: '4px'
                }}>
                  Filter:
                </span>
                {(['university', 'blog', 'api-docs', 'forum'] as const).map((sourceType) => {
                  const isActive = sourceFilters.includes(sourceType);
                  const labels = {
                    'university': 'University',
                    'blog': 'Blog',
                    'api-docs': 'API Docs',
                    'forum': 'Forum',
                  };

                  return (
                    <button
                      key={sourceType}
                      onClick={() => {
                        setSourceFilters(prev =>
                          prev.includes(sourceType)
                            ? prev.filter(f => f !== sourceType)
                            : [...prev, sourceType]
                        );
                      }}
                      className="px-2.5 py-1 text-xs rounded-full transition-all"
                      style={{
                        backgroundColor: isActive ? '#146EF5' : '#222222',
                        border: `1px solid ${isActive ? '#146EF5' : '#363636'}`,
                        color: isActive ? '#FFFFFF' : '#D8D8D8',
                        fontFamily: 'var(--font-inter)',
                      }}
                    >
                      {labels[sourceType]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results section */}
            <div className="space-y-6">
            {/* Previous conversation turns */}
            {conversation.map((turn, index) => (
              <div key={index} className="space-y-4 pb-6" style={{ borderBottom: '1px solid #363636' }}>
                {/* Query */}
                <div
                  className="rounded-lg p-4"
                  style={{
                    backgroundColor: 'rgba(20, 110, 245, 0.1)',
                    border: '1px solid rgba(20, 110, 245, 0.3)',
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#146EF5',
                    marginBottom: '4px'
                  }}>
                    Your question:
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '17px',
                    color: '#FFFFFF'
                  }}>
                    {turn.query}
                  </p>
                </div>

                {/* Answer */}
                <StreamingAnswer
                  content={turn.answer}
                  isStreaming={false}
                  isLoading={false}
                />

                {/* Citations */}
                {turn.citations.length > 0 && (
                  <CitationList citations={turn.citations} />
                )}
              </div>
            ))}

            {/* Current query and answer */}
            {currentQuery && (
              <>
                {/* Current Query display */}
                <div
                  className="rounded-lg p-4"
                  style={{
                    backgroundColor: 'rgba(20, 110, 245, 0.1)',
                    border: '1px solid rgba(20, 110, 245, 0.3)',
                  }}
                >
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '15px',
                    fontWeight: 600,
                    color: '#146EF5',
                    marginBottom: '4px'
                  }}>
                    Your question:
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '17px',
                    color: '#FFFFFF'
                  }}>
                    {currentQuery}
                  </p>
                </div>

                {/* Streaming answer */}
                <StreamingAnswer
                  content={currentAnswer}
                  isStreaming={isStreaming}
                  isLoading={isLoading}
                  error={error}
                />

                {/* Regenerate and Save buttons */}
                {!isStreaming && !isLoading && currentAnswer && !error && (
                  <div className="mt-4 flex items-center gap-3 flex-wrap">
                    <RegenerateButton
                      onRegenerate={handleRegenerate}
                      isLoading={isLoading}
                    />
                    <button
                      onClick={handleSaveConversation}
                      className="flex items-center gap-2 px-4 py-2 rounded-md transition-all hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: '#222222',
                        border: '1px solid #363636',
                        color: '#D8D8D8',
                        fontFamily: 'var(--font-inter)',
                        fontSize: '15px',
                        fontWeight: 500,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#363636';
                        e.currentTarget.style.borderColor = '#146EF5';
                        e.currentTarget.style.color = '#FFFFFF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#222222';
                        e.currentTarget.style.borderColor = '#363636';
                        e.currentTarget.style.color = '#D8D8D8';
                      }}
                      aria-label="Save this conversation"
                    >
                      <BookmarkIcon className="h-4 w-4" aria-hidden="true" />
                      <span>Save conversation</span>
                    </button>
                  </div>
                )}

                {/* Confidence Badge - positioned above export/share */}
                {currentConfidence !== undefined && !isStreaming && !isLoading && !error && (
                  <div className="result-confidence mt-4 flex justify-start">
                    <ConfidenceBadge
                      confidence={currentConfidence}
                      totalSources={currentCitations.length}
                    />
                  </div>
                )}

                {/* Export/Share actions - positioned right after answer/confidence */}
                {!isStreaming && !isLoading && currentAnswer && !error && (
                  <div className="result-export">
                    <ExportActions
                      query={currentQuery}
                      answer={currentAnswer}
                      citations={currentCitations}
                    />
                  </div>
                )}

                {/* Citations */}
                {currentCitations.length > 0 && (
                  <div className="result-citations">
                    <CitationList citations={currentCitations} />
                  </div>
                )}

                {/* Related Questions */}
                {currentRelatedQuestions.length > 0 && !isStreaming && !isLoading && (
                  <div ref={relatedQuestionsRef} className="result-related mt-6">
                    <h3 style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '17px',
                      fontWeight: 600,
                      color: '#D8D8D8',
                      marginBottom: '12px'
                    }}>
                      Related questions:
                    </h3>
                    <div className="flex flex-col gap-2">
                      {currentRelatedQuestions.map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRelatedQuestionClick(question)}
                          className="related-question w-full text-left px-4 py-3 rounded-lg transition-all card-lift flex items-center gap-3"
                          style={{
                            backgroundColor: '#222222',
                            border: '1px solid #363636',
                            color: '#D8D8D8',
                            fontFamily: 'var(--font-inter)',
                            fontSize: '16px',
                            fontWeight: 500,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#363636';
                            e.currentTarget.style.borderColor = '#146EF5';
                            e.currentTarget.style.color = '#FFFFFF';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#222222';
                            e.currentTarget.style.borderColor = '#363636';
                            e.currentTarget.style.color = '#D8D8D8';
                          }}
                        >
                          <span className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 rounded-full text-xs font-semibold" style={{
                            backgroundColor: '#146EF5',
                            color: '#FFFFFF',
                          }}>
                            {idx + 1}
                          </span>
                          <span className="flex-1">{question}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Feedback widget (shown after answer is complete) */}
                {!isStreaming && !isLoading && currentAnswer && !error && (
                  <div className="result-feedback">
                    <FeedbackWidget responseId={responseId || undefined} />
                  </div>
                )}
              </>
            )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8" style={{ borderTop: '1px solid #363636' }}>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '15px',
              color: '#D8D8D8'
            }}>
              Built with{' '}
              <a
                href="https://webflow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:underline"
                style={{ color: '#E5E5E5' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#E5E5E5'}
              >
                Webflow Cloud
              </a>
              {' '}and OpenAI
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="transition-colors"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '15px',
                  color: '#D8D8D8'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#D8D8D8'}
              >
                Github
              </a>
              <a
                href="/admin"
                className="transition-colors"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '15px',
                  color: '#D8D8D8'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#D8D8D8'}
              >
                Admin
              </a>
              <a
                href="#"
                className="transition-colors"
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '15px',
                  color: '#D8D8D8'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#FFFFFF'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#D8D8D8'}
              >
                MySpace
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
