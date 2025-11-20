/**
 * Utility functions and error handling
 * Uses Web Crypto API for edge runtime compatibility
 */

// ==========================================
// Error Handling
// ==========================================

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
  }
}

// ==========================================
// UUID Generation
// ==========================================

export function generateUUID(): string {
  return crypto.randomUUID();
}

// ==========================================
// Hashing (Web Crypto API)
// ==========================================

export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ==========================================
// IP Address Utilities
// ==========================================

export async function hashIP(ip: string): Promise<string> {
  return sha256(ip);
}

export function getClientIP(request: Request): string {
  // Try Cloudflare headers first
  const cfIP = request.headers.get('CF-Connecting-IP');
  if (cfIP) return cfIP;

  // Fallback to X-Forwarded-For
  const forwarded = request.headers.get('X-Forwarded-For');
  if (forwarded) {
    return forwarded.split(',')[0]?.trim() || 'unknown';
  }

  // Last resort
  const realIP = request.headers.get('X-Real-IP');
  if (realIP) return realIP;

  return 'unknown';
}

// ==========================================
// JSON Response Helpers
// ==========================================

export function jsonResponse<T>(
  data: T,
  status: number = 200,
  headers: Record<string, string> = {}
): Response {
  return Response.json(data, {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });
}

export function errorResponse(
  error: string,
  status: number = 500,
  code?: string,
  details?: Record<string, unknown>
): Response {
  return jsonResponse(
    {
      error,
      code,
      details,
    },
    status
  );
}

// ==========================================
// Logging
// ==========================================

export function structuredLog(
  level: 'info' | 'warn' | 'error',
  message: string,
  meta?: Record<string, unknown>
) {
  const log = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  };
  console.log(JSON.stringify(log));
}

// ==========================================
// Time Utilities
// ==========================================

export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

export class Timer {
  private start: number;

  constructor() {
    this.start = Date.now();
  }

  elapsed(): number {
    return Date.now() - this.start;
  }
}
