-- Migration: 0002_admin_features
-- Description: Add tables for admin dashboard analytics
-- Created: 2025-11-17

-- ==========================================
-- Regenerations Table
-- ==========================================
-- Tracks when users regenerate answers for the same question
CREATE TABLE IF NOT EXISTS regenerations (
  id TEXT PRIMARY KEY,
  original_query_id TEXT NOT NULL,
  regenerated_query_id TEXT NOT NULL,
  strategy TEXT,                    -- 'default', 'more-sources', 'simpler', 'technical'
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (original_query_id) REFERENCES queries(id) ON DELETE CASCADE,
  FOREIGN KEY (regenerated_query_id) REFERENCES queries(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_regenerations_original ON regenerations(original_query_id);
CREATE INDEX IF NOT EXISTS idx_regenerations_created ON regenerations(created_at DESC);

-- ==========================================
-- Sessions Table
-- ==========================================
-- Tracks user sessions for session duration and retention analytics
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_ip_hash TEXT NOT NULL,
  started_at TEXT DEFAULT (datetime('now')),
  last_activity TEXT DEFAULT (datetime('now')),
  query_count INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_ip_hash);
CREATE INDEX IF NOT EXISTS idx_sessions_started ON sessions(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_sessions_activity ON sessions(last_activity DESC);

-- ==========================================
-- Response Metadata Table
-- ==========================================
-- Additional metadata about responses for analytics
-- Stores confidence scores and citation counts
CREATE TABLE IF NOT EXISTS response_metadata (
  id TEXT PRIMARY KEY,
  response_id TEXT NOT NULL UNIQUE,
  confidence_score REAL,            -- 0.0 - 1.0
  citation_count INTEGER DEFAULT 0,
  has_code_block INTEGER DEFAULT 0, -- 1=yes, 0=no (boolean)
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (response_id) REFERENCES responses(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_response_metadata_response ON response_metadata(response_id);
CREATE INDEX IF NOT EXISTS idx_response_metadata_confidence ON response_metadata(confidence_score);
