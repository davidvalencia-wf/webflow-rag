'use client';

import { useState } from 'react';
import { HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';
import { HandThumbUpIcon as HandThumbUpIconSolid, HandThumbDownIcon as HandThumbDownIconSolid } from '@heroicons/react/24/solid';
import { apiPath } from '@/lib/basePath';

interface FeedbackWidgetProps {
  responseId?: string;
  onFeedback?: (helpful: boolean, issueReport?: string) => Promise<void>;
}

/**
 * FeedbackWidget component - Collect user feedback on RAG responses
 *
 * Features:
 * - Thumbs up/down buttons
 * - Optional detailed feedback text area (expandable)
 * - Thank you message after submission
 * - Subtle, non-intrusive design
 * - Accessible keyboard navigation
 */
export function FeedbackWidget({ responseId, onFeedback }: FeedbackWidgetProps) {
  const [helpful, setHelpful] = useState<boolean | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [issueReport, setIssueReport] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleThumbsClick = async (isHelpful: boolean) => {
    setHelpful(isHelpful);

    // If thumbs down, show detailed feedback form
    if (!isHelpful) {
      setShowFeedbackForm(true);
    } else {
      // If thumbs up, submit immediately
      await submitFeedback(isHelpful);
    }
  };

  const submitFeedback = async (isHelpful: boolean, report?: string) => {
    setIsSubmitting(true);

    try {
      if (onFeedback) {
        await onFeedback(isHelpful, report);
      } else {
        // Fallback: send to feedback API
        await fetch(apiPath('/feedback'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            response_id: responseId,
            helpful: isHelpful,
            issue_report: report,
          }),
        });
      }

      setSubmitted(true);
      setShowFeedbackForm(false);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      // Silent fail - don't disrupt user experience
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (helpful !== null) {
      await submitFeedback(helpful, issueReport.trim() || undefined);
    }
  };

  const handleSkip = () => {
    setShowFeedbackForm(false);
    if (helpful !== null) {
      submitFeedback(helpful);
    }
  };

  // Thank you state
  if (submitted) {
    return (
      <div className="rounded-lg bg-green-50 border border-green-200 p-4">
        <p className="text-sm font-medium text-green-800 flex items-center gap-2">
          <svg
            className="h-5 w-5 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
              clipRule="evenodd"
            />
          </svg>
          Thank you for your feedback!
        </p>
        <p className="mt-1 text-xs text-green-700">
          Your input helps us improve the quality of our answers.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-gray-50 border border-gray-200 p-4">
      {/* Thumbs up/down buttons */}
      {!showFeedbackForm && (
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-gray-700">Was this helpful?</p>
          <div className="flex gap-2">
            <button
              onClick={() => handleThumbsClick(true)}
              disabled={helpful !== null}
              className={`
                group rounded-md p-2 transition-all
                ${helpful === true
                  ? 'bg-green-100 text-green-600'
                  : 'text-gray-400 hover:bg-gray-100 hover:text-green-600'
                }
                ${helpful !== null ? 'cursor-not-allowed' : ''}
                focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
              `}
              aria-label="Mark as helpful"
            >
              {helpful === true ? (
                <HandThumbUpIconSolid className="h-5 w-5" aria-hidden="true" />
              ) : (
                <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => handleThumbsClick(false)}
              disabled={helpful !== null}
              className={`
                group rounded-md p-2 transition-all
                ${helpful === false
                  ? 'bg-red-100 text-red-600'
                  : 'text-gray-400 hover:bg-gray-100 hover:text-red-600'
                }
                ${helpful !== null ? 'cursor-not-allowed' : ''}
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
              `}
              aria-label="Mark as not helpful"
            >
              {helpful === false ? (
                <HandThumbDownIconSolid className="h-5 w-5" aria-hidden="true" />
              ) : (
                <HandThumbDownIcon className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      )}

      {/* Detailed feedback form (shown for thumbs down) */}
      {showFeedbackForm && (
        <form onSubmit={handleFeedbackSubmit} className="space-y-3">
          <div>
            <label htmlFor="issue-report" className="block text-sm font-medium text-gray-700 mb-1">
              What went wrong? (optional)
            </label>
            <textarea
              id="issue-report"
              value={issueReport}
              onChange={(e) => setIssueReport(e.target.value)}
              rows={3}
              placeholder="The answer was incorrect, incomplete, or didn't address my question..."
              className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                rounded-md px-4 py-2 text-sm font-medium text-white
                transition-all
                ${isSubmitting
                  ? 'cursor-not-allowed bg-gray-300'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                }
              `}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </button>

            <button
              type="button"
              onClick={handleSkip}
              disabled={isSubmitting}
              className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Skip
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
