/**
 * RAG Query Endpoint with Streaming
 * POST /api/ask
 *
 * Performs semantic search and generates streaming AI responses
 */

import { getCloudflareEnv } from '@/lib/env';

import { getDatabase } from '@/lib/db';

import { checkRateLimit, rateLimitHeaders } from '@/lib/rate-limit';

import { errorResponse, getClientIP, structuredLog, generateUUID, Timer } from '@/lib/utils';

import { performRAGQueryStream } from '@/lib/rag';

import { AskRequestSchema } from '@shared/index';

import { ZodError } from 'zod';

export const runtime = 'edge';

export async function POST(request: Request) {
  const timer = new Timer();
  const requestId = generateUUID();

  try {
    const env = getCloudflareEnv();
    const db = env.DB ? getDatabase(env) : null;

    // Rate limiting
    const clientIP = getClientIP(request);
    if (env.KV) {
      const rateLimit = await checkRateLimit(env.KV, clientIP);

      if (!rateLimit.allowed) {
        structuredLog('warn', 'Rate limit exceeded for RAG query', {
          request_id: requestId,
          client_ip: clientIP.substring(0, 10),
        });

        return errorResponse(
          'Rate limit exceeded. Please try again later.',
          429,
          'RATE_LIMIT_EXCEEDED',
          { reset_at: rateLimit.resetAt.toISOString() }
        );
      }
    }

    // Parse and validate request
    const body = await request.json();
    const validatedData = AskRequestSchema.parse(body);
    const { query, conversation_history, source_filters, options } = validatedData;

    structuredLog('info', 'RAG query received', {
      request_id: requestId,
      query: query.substring(0, 100), // Log first 100 chars
      model: options?.model || 'gpt-4o-mini',
      top_k: options?.top_k || 5,
      conversation_length: conversation_history?.length || 0,
      filters: source_filters?.join(',') || 'none',
    });

    // Create streaming response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Stream the RAG response
          for await (const chunk of performRAGQueryStream(query, db, env.KV, {
            model: options?.model,
            top_k: options?.top_k,
            useCache: true,
            conversationHistory: conversation_history,
            sourceFilters: source_filters,
          })) {
            // Format as Server-Sent Events
            const data = JSON.stringify(chunk);
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }

          // Send final done event
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();

          structuredLog('info', 'RAG query completed', {
            request_id: requestId,
            latency_ms: timer.elapsed(),
          });
        } catch (error) {
          structuredLog('error', 'RAG streaming error', {
            request_id: requestId,
            error: error instanceof Error ? error.message : 'Unknown error',
          });

          const errorData = JSON.stringify({
            type: 'error',
            error: 'An error occurred while generating the response',
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        ...rateLimitHeaders(10, new Date(Date.now() + 60000)), // Placeholder
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      structuredLog('warn', 'Invalid RAG request', {
        request_id: requestId,
        errors: error.errors,
      });

      return errorResponse(
        'Invalid request format',
        400,
        'VALIDATION_ERROR',
        { errors: error.errors }
      );
    }

    structuredLog('error', 'RAG query error', {
      request_id: requestId,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return errorResponse(
      'An error occurred while processing your question',
      500,
      'INTERNAL_ERROR'
    );
  }
}
