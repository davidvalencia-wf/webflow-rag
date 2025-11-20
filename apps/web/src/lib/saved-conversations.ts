/**
 * Saved Conversations - localStorage management utilities
 * Handles saving, loading, and managing user's bookmarked conversations
 */

import type { Citation } from '@/components/CitationList';

export interface ConversationTurn {
  query: string;
  answer: string;
  citations: Citation[];
  responseId: string | null;
  relatedQuestions?: string[];
  confidence?: number;
  timestamp: string;
}

export interface SavedConversation {
  id: string;
  name: string;
  savedAt: string;
  conversation: ConversationTurn[];
}

const STORAGE_KEY = 'webflow-rag-saved-conversations';
const MAX_SAVED = 20;

/**
 * Get all saved conversations from localStorage
 */
export function getSavedConversations(): SavedConversation[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch (error) {
    console.error('Failed to load saved conversations:', error);
    return [];
  }
}

/**
 * Save a new conversation to localStorage
 * Automatically generates a name based on the first question
 */
export function saveConversation(
  conversation: ConversationTurn[],
  customName?: string
): SavedConversation {
  if (conversation.length === 0) {
    throw new Error('Cannot save empty conversation');
  }

  const firstQuestion = conversation[0].query;
  const autoName = firstQuestion.length > 50
    ? firstQuestion.slice(0, 50) + '...'
    : firstQuestion;

  const newConversation: SavedConversation = {
    id: crypto.randomUUID(),
    name: customName || autoName,
    savedAt: new Date().toISOString(),
    conversation,
  };

  const existing = getSavedConversations();

  // Add new conversation at the beginning (most recent first)
  const updated = [newConversation, ...existing];

  // Limit to MAX_SAVED (FIFO - remove oldest)
  const trimmed = updated.slice(0, MAX_SAVED);

  // Save to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to save conversation:', error);
    throw new Error('Failed to save conversation. Storage might be full.');
  }

  return newConversation;
}

/**
 * Delete a saved conversation by ID
 */
export function deleteSavedConversation(id: string): void {
  const existing = getSavedConversations();
  const filtered = existing.filter(conv => conv.id !== id);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete conversation:', error);
    throw new Error('Failed to delete conversation');
  }
}

/**
 * Get a single saved conversation by ID
 */
export function getSavedConversation(id: string): SavedConversation | null {
  const conversations = getSavedConversations();
  return conversations.find(conv => conv.id === id) || null;
}

/**
 * Update the name of a saved conversation
 */
export function updateConversationName(id: string, newName: string): void {
  const existing = getSavedConversations();
  const updated = existing.map(conv =>
    conv.id === id ? { ...conv, name: newName } : conv
  );

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Failed to update conversation name:', error);
    throw new Error('Failed to update conversation name');
  }
}

/**
 * Check if storage is available and working
 */
export function isStorageAvailable(): boolean {
  if (typeof window === 'undefined') return false;

  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}
