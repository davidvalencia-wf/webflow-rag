'use client';

import { useState } from 'react';
import { BookmarkIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import {
  getSavedConversations,
  deleteSavedConversation,
  type SavedConversation,
  type ConversationTurn,
} from '@/lib/saved-conversations';

interface SavedConversationsProps {
  onLoad: (conversation: ConversationTurn[]) => void;
  currentConversation: ConversationTurn[];
}

/**
 * SavedConversations - Manages saved/bookmarked conversations
 *
 * Features:
 * - View list of saved conversations
 * - Load a saved conversation
 * - Delete saved conversations
 * - Shows preview of first question
 * - Displays save date
 */
export function SavedConversations({ onLoad }: SavedConversationsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [savedConversations, setSavedConversations] = useState<SavedConversation[]>([]);
  // Check if we're on client side (typeof window !== 'undefined')
  const [isClient] = useState(() => typeof window !== 'undefined');

  // Load saved conversations when modal opens
  const handleOpenModal = () => {
    setIsOpen(true);
    if (isClient) {
      setSavedConversations(getSavedConversations());
    }
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering load

    if (confirm('Are you sure you want to delete this saved conversation?')) {
      deleteSavedConversation(id);
      setSavedConversations(getSavedConversations());
    }
  };

  const handleLoad = (conversation: ConversationTurn[]) => {
    onLoad(conversation);
    setIsOpen(false);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (!isClient) return null;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={handleOpenModal}
        className="relative px-3 py-1.5 text-sm rounded-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        style={{
          backgroundColor: '#222222',
          border: '1px solid #363636',
          color: '#D8D8D8',
          fontFamily: 'var(--font-inter)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#363636';
          e.currentTarget.style.color = '#FFFFFF';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#222222';
          e.currentTarget.style.color = '#D8D8D8';
        }}
        aria-label="View saved conversations"
      >
        <BookmarkIcon className="h-4 w-4" aria-hidden="true" />
        <span>Saved</span>
        {savedConversations.length > 0 && (
          <span
            className="px-1.5 py-0.5 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: '#146EF5',
              color: '#FFFFFF',
            }}
          >
            {savedConversations.length}
          </span>
        )}
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-lg shadow-2xl max-h-[80vh] overflow-hidden flex flex-col"
            style={{
              backgroundColor: '#171717',
              border: '1px solid #363636',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid #363636' }}
            >
              <div className="flex items-center gap-3">
                <BookmarkSolidIcon className="h-6 w-6" style={{ color: '#146EF5' }} aria-hidden="true" />
                <h2
                  style={{
                    fontFamily: 'var(--font-poppins)',
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#FFFFFF',
                  }}
                >
                  Saved Conversations
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md transition-colors"
                style={{ color: '#898989' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#363636';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#898989';
                }}
                aria-label="Close modal"
              >
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {savedConversations.length === 0 ? (
                <div className="text-center py-12">
                  <BookmarkIcon
                    className="mx-auto h-12 w-12 mb-4"
                    style={{ color: '#363636' }}
                    aria-hidden="true"
                  />
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '16px',
                      color: '#898989',
                    }}
                  >
                    No saved conversations yet.
                  </p>
                  <p
                    className="mt-2"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '14px',
                      color: '#5A5A5A',
                    }}
                  >
                    Click the bookmark icon next to any answer to save it.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedConversations.map((saved) => (
                    <button
                      key={saved.id}
                      onClick={() => handleLoad(saved.conversation)}
                      className="w-full text-left p-4 rounded-lg transition-all hover:scale-102 card-lift group"
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
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3
                            className="truncate"
                            style={{
                              fontFamily: 'var(--font-inter)',
                              fontSize: '15px',
                              fontWeight: 600,
                              color: '#FFFFFF',
                              marginBottom: '6px',
                            }}
                          >
                            {saved.name}
                          </h3>
                          <div className="flex items-center gap-3 text-xs">
                            <span style={{ color: '#898989', fontFamily: 'var(--font-inter)' }}>
                              {saved.conversation.length} {saved.conversation.length === 1 ? 'turn' : 'turns'}
                            </span>
                            <span style={{ color: '#5A5A5A' }}>•</span>
                            <span style={{ color: '#898989', fontFamily: 'var(--font-inter)' }}>
                              {formatDate(saved.savedAt)}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={(e) => handleDelete(saved.id, e)}
                          className="p-2 rounded-md transition-all opacity-0 group-hover:opacity-100"
                          style={{
                            backgroundColor: 'transparent',
                            color: '#898989',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#171717';
                            e.currentTarget.style.color = '#EF4444';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#898989';
                          }}
                          aria-label="Delete saved conversation"
                        >
                          <TrashIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {savedConversations.length > 0 && (
              <div
                className="px-6 py-3 text-center"
                style={{
                  borderTop: '1px solid #363636',
                  backgroundColor: '#1a1a1a',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '12px',
                    color: '#5A5A5A',
                  }}
                >
                  {savedConversations.length} of 20 conversations saved
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
