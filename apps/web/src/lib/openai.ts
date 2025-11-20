/**
 * OpenAI client wrapper for embeddings and LLM completions
 */

import OpenAI from 'openai';
import { getEnvVar } from './env';

// ==========================================
// Client Initialization
// ==========================================

let openaiClient: OpenAI | null = null;

export function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    const apiKey = getEnvVar('OPENAI_API_KEY');
    openaiClient = new OpenAI({
      apiKey,
    });
  }
  return openaiClient;
}

// ==========================================
// Embeddings
// ==========================================

export const EMBEDDING_MODEL = 'text-embedding-3-small';
export const EMBEDDING_DIMENSIONS = 1536;

export async function generateEmbedding(text: string): Promise<number[]> {
  const client = getOpenAIClient();

  const response = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
    encoding_format: 'float',
  });

  return response.data[0]?.embedding || [];
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const client = getOpenAIClient();

  const response = await client.embeddings.create({
    model: EMBEDDING_MODEL,
    input: texts,
    encoding_format: 'float',
  });

  return response.data.map((item) => item.embedding);
}

// ==========================================
// Chat Completions
// ==========================================

export type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export type ChatCompletionOptions = {
  model?: 'gpt-4o' | 'gpt-4o-mini';
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
};

export async function generateChatCompletion(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {}
): Promise<string> {
  const client = getOpenAIClient();

  const {
    model = 'gpt-4o-mini',
    temperature = 0.7,
    maxTokens = 1000,
  } = options;

  const response = await client.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
  });

  return response.choices[0]?.message?.content || '';
}

export async function* generateChatCompletionStream(
  messages: ChatMessage[],
  options: ChatCompletionOptions = {}
): AsyncGenerator<string, void, unknown> {
  const client = getOpenAIClient();

  const {
    model = 'gpt-4o-mini',
    temperature = 0.7,
    maxTokens = 1000,
  } = options;

  const stream = await client.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: maxTokens,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || '';
    if (content) {
      yield content;
    }
  }
}

// ==========================================
// Token Estimation
// ==========================================

/**
 * Rough token estimation (approximately 4 characters per token)
 * For production, consider using a proper tokenizer like tiktoken
 */
export function estimateTokenCount(text: string): number {
  return Math.ceil(text.length / 4);
}

export function truncateToTokenLimit(text: string, maxTokens: number): string {
  const estimatedTokens = estimateTokenCount(text);

  if (estimatedTokens <= maxTokens) {
    return text;
  }

  const maxChars = maxTokens * 4;
  return text.substring(0, maxChars) + '...';
}
