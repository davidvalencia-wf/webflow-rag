-- Migration: 0001_initial_schema
-- Description: Initial database schema for Webflow RAG application
-- Created: 2025-11-12

-- ==========================================
-- Documents Table
-- ==========================================
-- Stores metadata about source documents (Webflow University, Blog, API Docs, Forums)
CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,              -- UUID
  uri TEXT NOT NULL UNIQUE,         -- Source URL (e.g., https://university.webflow.com/...)
  title TEXT,                       -- Document title
  source_type TEXT,                 -- 'university' | 'blog' | 'api-docs' | 'forum'
  license TEXT,                     -- License info (e.g., 'CC BY 4.0')
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

-- ==========================================
-- Chunks Table
-- ==========================================
-- Stores text chunks from documents with metadata
-- Each chunk is ~512 tokens with 50 token overlap
CREATE TABLE IF NOT EXISTS chunks (
  id TEXT PRIMARY KEY,              -- UUID (matches Pinecone vector ID)
  document_id TEXT NOT NULL,        -- FK to documents.id
  content TEXT NOT NULL,            -- Chunk text content
  hash TEXT NOT NULL,               -- SHA-256 hash of content (for deduplication)
  token_count INTEGER,              -- Approximate token count
  section TEXT,                     -- Heading/section context (e.g., "Creating Collections")
  chunk_index INTEGER,              -- Position in document (0-indexed)
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (document_id) REFERENCES documents(id) ON DELETE CASCADE
);

-- Indexes for chunks table
CREATE INDEX IF NOT EXISTS idx_chunks_document ON chunks(document_id);
CREATE INDEX IF NOT EXISTS idx_chunks_hash ON chunks(hash);

-- ==========================================
-- Full-Text Search Index (FTS5)
-- ==========================================
-- Phase 1 fallback search before vector search is implemented
-- Enables SQLite full-text search on chunk content
CREATE VIRTUAL TABLE IF NOT EXISTS chunks_fts USING fts5(
  content,
  content=chunks,
  content_rowid=id
);

-- Triggers to keep FTS index in sync with chunks table
CREATE TRIGGER IF NOT EXISTS chunks_fts_insert AFTER INSERT ON chunks BEGIN
  INSERT INTO chunks_fts(rowid, content) VALUES (new.rowid, new.content);
END;

CREATE TRIGGER IF NOT EXISTS chunks_fts_delete AFTER DELETE ON chunks BEGIN
  DELETE FROM chunks_fts WHERE rowid = old.rowid;
END;

CREATE TRIGGER IF NOT EXISTS chunks_fts_update AFTER UPDATE ON chunks BEGIN
  UPDATE chunks_fts SET content = new.content WHERE rowid = new.rowid;
END;

-- ==========================================
-- Queries Table
-- ==========================================
-- Stores user search queries for analytics and caching
CREATE TABLE IF NOT EXISTS queries (
  id TEXT PRIMARY KEY,              -- UUID
  query_text TEXT NOT NULL,         -- User's question
  embedding_hash TEXT,              -- SHA-256 hash of query (for embedding caching)
  user_ip TEXT,                     -- Hashed IP address (for rate limiting)
  created_at TEXT DEFAULT (datetime('now'))
);

-- Index for analytics queries (most recent first)
CREATE INDEX IF NOT EXISTS idx_queries_created ON queries(created_at DESC);

-- ==========================================
-- Responses Table
-- ==========================================
-- Stores LLM-generated responses to queries
CREATE TABLE IF NOT EXISTS responses (
  id TEXT PRIMARY KEY,              -- UUID
  query_id TEXT NOT NULL,           -- FK to queries.id
  answer TEXT NOT NULL,             -- LLM-generated answer
  sources TEXT,                     -- JSON array of sources: [{ uri, title, section }]
  model TEXT,                       -- Model used (e.g., 'gpt-4o-mini')
  latency_ms INTEGER,               -- Response time in milliseconds
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (query_id) REFERENCES queries(id) ON DELETE CASCADE
);

-- Index for joining responses to queries
CREATE INDEX IF NOT EXISTS idx_responses_query ON responses(query_id);

-- ==========================================
-- Feedback Table
-- ==========================================
-- Stores user feedback on responses
CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY,              -- UUID
  response_id TEXT NOT NULL,        -- FK to responses.id
  helpful INTEGER,                  -- 1=yes, 0=no, null=not answered
  issue_report TEXT,                -- Free-form feedback text
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (response_id) REFERENCES responses(id) ON DELETE CASCADE
);

-- Index for analytics on feedback
CREATE INDEX IF NOT EXISTS idx_feedback_response ON feedback(response_id);
