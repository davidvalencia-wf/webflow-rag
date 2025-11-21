/**
 * RAG (Retrieval-Augmented Generation) Pipeline
 * Core logic for semantic search and answer generation
 */

import type { D1Database, KVNamespace } from '@cloudflare/workers-types';
import { generateEmbedding, generateChatCompletionStream, type ChatMessage, estimateTokenCount } from './openai';
import { queryVectors, type VectorMatch } from './pinecone-edge';
import { getCachedEmbedding, setCachedEmbedding, getCachedResponse, setCachedResponse } from './cache';
import { queryAll } from './db';
import type { Chunk, ConversationMessage, SourceType } from '@/lib/types';

// ==========================================
// Types
// ==========================================

export type RAGContext = {
  chunks: Array<{
    id: string;
    content: string;
    document: {
      uri: string;
      title: string | null;
      section: string | null;
    };
    score: number;
  }>;
  totalTokens: number;
};

export type RAGSource = {
  uri: string;
  title: string;
  section?: string;
};

export type RAGOptions = {
  model?: 'gpt-4o' | 'gpt-4o-mini';
  top_k?: number;
  maxContextTokens?: number;
  useCache?: boolean;
  conversationHistory?: ConversationMessage[];
  sourceFilters?: SourceType[];
};

// ==========================================
// RAG Pipeline
// ==========================================

/**
 * Step 1: Generate or retrieve cached embedding for query
 */
export async function getQueryEmbedding(
  query: string,
  kv: KVNamespace | null,
  useCache: boolean = true
): Promise<number[]> {
  // Try cache first
  if (useCache && kv) {
    const cached = await getCachedEmbedding(kv, query);
    if (cached) {
      return cached;
    }
  }

  // Generate new embedding
  const embedding = await generateEmbedding(query);

  // Cache for future use
  if (useCache && kv) {
    await setCachedEmbedding(kv, query, embedding);
  }

  return embedding;
}

/**
 * Step 2: Search for similar vectors in Pinecone
 */
export async function searchSimilarChunks(
  embedding: number[],
  topK: number = 5,
  filter?: Record<string, unknown>
): Promise<VectorMatch[]> {
  return await queryVectors(embedding, topK, filter);
}

/**
 * Step 3: Fetch full chunk data from D1 (if needed)
 */
export async function fetchChunkDetails(
  db: D1Database,
  chunkIds: string[]
): Promise<Chunk[]> {
  if (chunkIds.length === 0) {
    return [];
  }

  const placeholders = chunkIds.map(() => '?').join(',');
  const sql = `
    SELECT *
    FROM chunks
    WHERE id IN (${placeholders})
  `;

  return await queryAll<Chunk>(db, sql, chunkIds);
}

/**
 * Step 4: Assemble context from retrieved chunks
 */
export function assembleContext(
  matches: VectorMatch[],
  maxTokens: number = 4000
): RAGContext {
  const chunks: RAGContext['chunks'] = [];
  let totalTokens = 0;

  for (const match of matches) {
    const content = match.metadata.content;
    const contentTokens = estimateTokenCount(content);

    // Stop if adding this chunk would exceed token limit
    if (totalTokens + contentTokens > maxTokens) {
      break;
    }

    chunks.push({
      id: match.id,
      content,
      document: {
        uri: match.metadata.uri,
        title: match.metadata.title,
        section: match.metadata.section || null,
      },
      score: match.score,
    });

    totalTokens += contentTokens;
  }

  return { chunks, totalTokens };
}

/**
 * Step 5: Generate system prompt with context and conversation history
 */
export function buildRAGPrompt(query: string, context: RAGContext, conversationHistory?: ConversationMessage[]): ChatMessage[] {
  const contextText = context.chunks
    .map((chunk, idx) => {
      const source = chunk.document.section
        ? `${chunk.document.title} - ${chunk.document.section}`
        : chunk.document.title || 'Unknown';

      return `[${idx + 1}] From: ${source}\n${chunk.content}`;
    })
    .join('\n\n---\n\n');

  const systemPrompt = `You are a helpful Webflow expert assistant. Your goal is to provide accurate, helpful answers based on official Webflow documentation.

CONTEXT FROM WEBFLOW DOCUMENTATION:
${contextText}

INSTRUCTIONS:
1. Answer the user's question using ONLY the information provided in the context above
2. Be concise but comprehensive
3. If the context doesn't contain enough information to answer fully, acknowledge this
4. Use examples from the context when relevant
5. Maintain a friendly, professional tone
6. If you reference specific features or capabilities, cite the source in brackets like [1], [2], etc.
7. If there's a conversation history, use it for context but always prioritize the current question
8. Be aware of what was previously discussed and avoid redundant explanations

If the context doesn't contain relevant information for the question, politely say so and suggest what type of documentation might help.`;

  const messages: ChatMessage[] = [{ role: 'system', content: systemPrompt }];

  // Add conversation history if available (limit to last 6 messages to avoid token limit)
  if (conversationHistory && conversationHistory.length > 0) {
    const recentHistory = conversationHistory.slice(-6);
    messages.push(...recentHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    })));
  }

  // Add current query
  messages.push({ role: 'user', content: query });

  return messages;
}

/**
 * Step 6: Extract sources/citations from context
 */
export function extractSources(context: RAGContext): RAGSource[] {
  const seenUris = new Set<string>();
  const sources: RAGSource[] = [];

  for (const chunk of context.chunks) {
    const uri = chunk.document.uri;

    if (!seenUris.has(uri)) {
      seenUris.add(uri);
      sources.push({
        uri,
        title: chunk.document.title || 'Untitled',
        section: chunk.document.section || undefined,
      });
    }
  }

  return sources;
}

/**
 * Step 7: Calculate confidence score based on match quality
 */
export function calculateConfidence(matches: VectorMatch[]): number {
  if (matches.length === 0) return 0;

  // Calculate average score of top matches
  const avgScore = matches.reduce((sum, match) => sum + match.score, 0) / matches.length;

  // Boost confidence if we have multiple high-quality matches
  const highQualityMatches = matches.filter(m => m.score >= 0.8).length;
  const boost = highQualityMatches >= 3 ? 0.1 : highQualityMatches >= 2 ? 0.05 : 0;

  return Math.min(1, avgScore + boost);
}

/**
 * Step 8: Generate related questions using LLM
 */
export async function generateRelatedQuestions(
  query: string,
  answer: string,
  sources: RAGSource[]
): Promise<string[]> {
  try {
    const prompt = `Based on this Q&A about Webflow, suggest 3 related questions a user might want to ask next.

Question: ${query}
Answer: ${answer.substring(0, 500)}...

Available topics from sources: ${sources.map(s => s.title).join(', ')}

Generate 3 short, specific follow-up questions (max 10 words each) as a JSON array.
Example: ["How do I style collection items?", "Can I filter by multiple fields?", "What are CMS limits?"]

JSON array only, no explanation:`;

    const messages: ChatMessage[] = [
      { role: 'system', content: 'You are a helpful assistant that generates related questions. Return only valid JSON.' },
      { role: 'user', content: prompt }
    ];

    let result = '';
    const stream = generateChatCompletionStream(messages, { model: 'gpt-4o-mini' });

    for await (const chunk of stream) {
      result += chunk;
    }

    // Parse JSON array from response
    const cleaned = result.trim().replace(/^```json\s*/, '').replace(/```$/, '');
    const questions = JSON.parse(cleaned);

    if (Array.isArray(questions) && questions.length > 0) {
      return questions.slice(0, 3);
    }

    return [];
  } catch (error) {
    console.error('Failed to generate related questions:', error);
    return [];
  }
}

/**
 * Complete RAG Pipeline - Streaming
 */
export async function* performRAGQueryStream(
  query: string,
  db: D1Database | null,
  kv: KVNamespace | null,
  options: RAGOptions = {}
): AsyncGenerator<{
  type: 'chunk' | 'sources' | 'done' | 'related_questions';
  content?: string;
  sources?: RAGSource[];
  related_questions?: string[];
  confidence?: number;
}, void, unknown> {
  const {
    model = 'gpt-4o-mini',
    top_k = 5,
    maxContextTokens = 4000,
    useCache = true,
    conversationHistory,
    sourceFilters,
  } = options;

  // Check cache first (for complete responses)
  if (useCache && kv) {
    const cached = await getCachedResponse(kv, query, top_k);
    if (cached) {
      // Return cached answer as stream
      const words = cached.answer.split(' ');
      for (const word of words) {
        yield { type: 'chunk', content: word + ' ' };
      }
      yield { type: 'sources', sources: cached.sources };
      return;
    }
  }

  // Step 1: Generate embedding
  const embedding = await getQueryEmbedding(query, kv, useCache);

  // Step 2: Build Pinecone filter from source filters
  let pineconeFilter: Record<string, unknown> | undefined;
  if (sourceFilters && sourceFilters.length > 0) {
    pineconeFilter = {
      source_type: { $in: sourceFilters }
    };
  }

  // Step 3: Search similar chunks with filters
  const matches = await searchSimilarChunks(embedding, top_k, pineconeFilter);

  if (matches.length === 0) {
    yield { type: 'chunk', content: "I couldn't find any relevant information in the Webflow documentation to answer your question. Please try rephrasing your query or ask about a different topic." };
    yield { type: 'done', sources: [], confidence: 0 };
    return;
  }

  // Step 4: Calculate confidence
  const confidence = calculateConfidence(matches);

  // Step 5: Assemble context
  const context = assembleContext(matches, maxContextTokens);

  // Step 6: Build prompt with conversation history
  const messages = buildRAGPrompt(query, context, conversationHistory);

  // Step 7: Generate streaming response
  let fullAnswer = '';
  const stream = generateChatCompletionStream(messages, { model });

  for await (const chunk of stream) {
    fullAnswer += chunk;
    yield { type: 'chunk', content: chunk };
  }

  // Step 8: Extract sources
  const sources = extractSources(context);

  // Step 9: Send done event with confidence and sources
  yield { type: 'done', sources, confidence };

  // Step 10: Generate related questions (async, don't wait)
  generateRelatedQuestions(query, fullAnswer, sources)
    .then(questions => {
      // This will be sent after the stream "completes" but that's okay
      // In practice, we can't yield after the function returns, so we'll handle this differently
    })
    .catch(err => console.error('Failed to generate related questions:', err));

  // For now, generate related questions synchronously before completing
  const relatedQuestions = await generateRelatedQuestions(query, fullAnswer, sources);
  if (relatedQuestions.length > 0) {
    yield { type: 'related_questions', related_questions: relatedQuestions };
  }

  // Cache the complete response
  if (useCache && kv) {
    await setCachedResponse(kv, query, top_k, {
      answer: fullAnswer,
      sources,
      model,
    });
  }
}

/**
 * Complete RAG Pipeline - Non-streaming (for testing)
 */
export async function performRAGQuery(
  query: string,
  db: D1Database | null,
  kv: KVNamespace | null,
  options: RAGOptions = {}
): Promise<{ answer: string; sources: RAGSource[] }> {
  let answer = '';
  let sources: RAGSource[] = [];

  for await (const chunk of performRAGQueryStream(query, db, kv, options)) {
    if (chunk.type === 'chunk' && chunk.content) {
      answer += chunk.content;
    } else if (chunk.type === 'sources' && chunk.sources) {
      sources = chunk.sources;
    }
  }

  return { answer, sources };
}
