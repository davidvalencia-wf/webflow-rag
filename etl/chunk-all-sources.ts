#!/usr/bin/env node
/**
 * Universal Document Chunker for Multi-Source ETL Pipeline
 *
 * Processes markdown files from ALL sources in etl/input/ directory:
 * - webflow-updates
 * - webflow-help-center
 * - webflow-api-docs
 * - webflow-blog
 * - webflow-way
 *
 * Outputs unified chunk JSON for embedding generation.
 *
 * Usage: npx tsx chunk-all-sources.ts
 */

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// Configuration
// ==========================================

const CONFIG = {
  inputBaseDir: path.join(__dirname, 'input'),
  outputDir: path.join(__dirname, 'output/chunks'),
  targetTokensPerChunk: 512,
  overlapTokens: 50,
  charsPerToken: 4, // Rough estimate: 1 token ≈ 4 characters
};

// ==========================================
// Types
// ==========================================

type SourceMetadata = {
  source: string;
  [key: string]: any;
};

type Document = {
  id: string;
  uri: string;
  title: string | null;
  source_type: string;
  file_path: string;
};

type Chunk = {
  id: string;
  document_id: string;
  content: string;
  hash: string;
  token_count: number;
  section: string | null;
  chunk_index: number;
  metadata: {
    uri: string;
    title: string | null;
    source_type: string;
  };
};

type ChunkingResult = {
  totalDocuments: number;
  totalChunks: number;
  bySource: Record<string, { documents: number; chunks: number }>;
  averageChunksPerDoc: number;
  averageTokensPerChunk: number;
  chunks: Chunk[];
};

// ==========================================
// Utility Functions
// ==========================================

function generateUUID(): string {
  return crypto.randomUUID();
}

function sha256(text: string): string {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

function estimateTokenCount(text: string): number {
  return Math.ceil(text.length / CONFIG.charsPerToken);
}

function parseYAMLFrontMatter(content: string): { frontMatter: Record<string, any>; markdown: string } {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);

  if (!match) {
    return { frontMatter: {}, markdown: content };
  }

  const frontMatterText = match[1];
  const markdown = match[2];

  // Simple YAML parser (supports key: value pairs)
  const frontMatter: Record<string, any> = {};
  frontMatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();

      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      frontMatter[key] = value;
    }
  });

  return { frontMatter, markdown };
}

function cleanMarkdown(markdown: string): string {
  let text = markdown;

  // Remove image syntax but keep alt text: ![alt](url) → alt
  text = text.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1');

  // Keep link text but remove URLs: [text](url) → text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

  // Remove horizontal rules
  text = text.replace(/^[*\-_]{3,}$/gm, '');

  // Normalize whitespace: multiple newlines → double newline
  text = text.replace(/\n{3,}/g, '\n\n');

  // Trim whitespace
  text = text.trim();

  return text;
}

function extractSections(markdown: string): Array<{ heading: string | null; content: string }> {
  const sections: Array<{ heading: string | null; content: string }> = [];
  const lines = markdown.split('\n');

  let currentHeading: string | null = null;
  let currentContent: string[] = [];

  for (const line of lines) {
    // Check if line is a heading (## or ###)
    const headingMatch = line.match(/^(#{2,3})\s+(.+)$/);

    if (headingMatch) {
      // Save previous section if it has content
      if (currentContent.length > 0) {
        sections.push({
          heading: currentHeading,
          content: currentContent.join('\n').trim(),
        });
      }

      // Start new section
      currentHeading = headingMatch[2].trim();
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }

  // Save last section
  if (currentContent.length > 0) {
    sections.push({
      heading: currentHeading,
      content: currentContent.join('\n').trim(),
    });
  }

  return sections.filter(s => s.content.length > 0);
}

function splitIntoChunks(text: string, targetTokens: number, overlapTokens: number): string[] {
  const chunks: string[] = [];
  const targetChars = targetTokens * CONFIG.charsPerToken;
  const overlapChars = overlapTokens * CONFIG.charsPerToken;

  // Split by sentences to avoid cutting mid-sentence
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  let currentChunk = '';
  let previousChunk = '';

  for (const sentence of sentences) {
    const testChunk = currentChunk + sentence;

    if (testChunk.length > targetChars && currentChunk.length > 0) {
      // Current chunk is full, save it
      chunks.push(currentChunk.trim());
      previousChunk = currentChunk;

      // Start new chunk with overlap from previous chunk
      const overlapText = previousChunk.slice(-overlapChars);
      currentChunk = overlapText + sentence;
    } else {
      currentChunk = testChunk;
    }
  }

  // Add final chunk if it has content
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// ==========================================
// Main Chunking Logic
// ==========================================

function chunkDocument(document: Document, markdown: string): Chunk[] {
  const chunks: Chunk[] = [];

  // Parse YAML front matter if present
  const { frontMatter, markdown: contentMarkdown } = parseYAMLFrontMatter(markdown);

  // Extract title from front matter or document
  const title = frontMatter.title || document.title || 'Untitled';

  // Clean markdown
  const cleanedMarkdown = cleanMarkdown(contentMarkdown);

  // Extract sections (by headings)
  const sections = extractSections(cleanedMarkdown);

  let globalChunkIndex = 0;

  for (const section of sections) {
    // Split section content into chunks
    const sectionChunks = splitIntoChunks(
      section.content,
      CONFIG.targetTokensPerChunk,
      CONFIG.overlapTokens
    );

    for (const chunkContent of sectionChunks) {
      const chunk: Chunk = {
        id: generateUUID(),
        document_id: document.id,
        content: chunkContent,
        hash: sha256(chunkContent),
        token_count: estimateTokenCount(chunkContent),
        section: section.heading,
        chunk_index: globalChunkIndex++,
        metadata: {
          uri: document.uri,
          title: title,
          source_type: document.source_type,
        },
      };

      chunks.push(chunk);
    }
  }

  return chunks;
}

// ==========================================
// Source Discovery & Processing
// ==========================================

async function discoverSources(): Promise<string[]> {
  const entries = await fs.readdir(CONFIG.inputBaseDir, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .filter(name => !name.startsWith('.'));
}

async function processSource(sourceName: string): Promise<Chunk[]> {
  const sourceDir = path.join(CONFIG.inputBaseDir, sourceName);
  const articlesDir = path.join(sourceDir, 'articles');
  const metadataPath = path.join(sourceDir, 'metadata.json');

  console.log(`\n📂 Processing source: ${sourceName}`);

  // Check if articles directory exists
  try {
    await fs.access(articlesDir);
  } catch {
    console.log(`   ⚠️  No articles directory found, skipping`);
    return [];
  }

  // Load metadata if available
  let metadata: SourceMetadata | null = null;
  try {
    const metadataContent = await fs.readFile(metadataPath, 'utf-8');
    metadata = JSON.parse(metadataContent);
  } catch {
    console.log(`   ℹ️  No metadata.json found`);
  }

  // Read all markdown files
  const files = await fs.readdir(articlesDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));

  console.log(`   Found ${mdFiles.length} markdown files`);

  const allChunks: Chunk[] = [];

  for (const file of mdFiles) {
    const filePath = path.join(articlesDir, file);
    const markdown = await fs.readFile(filePath, 'utf-8');

    // Parse front matter to get URL
    const { frontMatter } = parseYAMLFrontMatter(markdown);

    // Create document record
    const document: Document = {
      id: generateUUID(),
      uri: frontMatter.url || `file:///${sourceName}/${file}`,
      title: frontMatter.title || file.replace('.md', ''),
      source_type: sourceName,
      file_path: filePath,
    };

    // Chunk the document
    const chunks = chunkDocument(document, markdown);
    allChunks.push(...chunks);
  }

  const avgChunks = mdFiles.length > 0 ? Math.round(allChunks.length / mdFiles.length) : 0;
  console.log(`   ✓ Processed ${mdFiles.length} documents → ${allChunks.length} chunks (avg ${avgChunks} chunks/doc)`);

  return allChunks;
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('🔄 Universal Document Chunker - Multi-Source Processing\n');
  console.log('=' .repeat(60));

  // Ensure output directory exists
  await fs.mkdir(CONFIG.outputDir, { recursive: true });

  // Discover all sources
  const sources = await discoverSources();
  console.log(`\n📋 Discovered ${sources.length} source(s): ${sources.join(', ')}`);

  // Process each source
  const allChunks: Chunk[] = [];
  const bySource: Record<string, { documents: number; chunks: number }> = {};

  for (const source of sources) {
    const chunks = await processSource(source);
    allChunks.push(...chunks);

    // Count unique documents per source
    const docIds = new Set(chunks.map(c => c.document_id));
    bySource[source] = {
      documents: docIds.size,
      chunks: chunks.length,
    };
  }

  // Calculate statistics
  const totalDocs = Object.values(bySource).reduce((sum, s) => sum + s.documents, 0);
  const stats: ChunkingResult = {
    totalDocuments: totalDocs,
    totalChunks: allChunks.length,
    bySource,
    averageChunksPerDoc: totalDocs > 0 ? Math.round(allChunks.length / totalDocs) : 0,
    averageTokensPerChunk: allChunks.length > 0
      ? Math.round(allChunks.reduce((sum, c) => sum + c.token_count, 0) / allChunks.length)
      : 0,
    chunks: allChunks,
  };

  // Write output
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputPath = path.join(CONFIG.outputDir, `all-sources-chunks-${timestamp}.json`);
  await fs.writeFile(outputPath, JSON.stringify(stats, null, 2), 'utf-8');

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('✅ Chunking Complete!\n');
  console.log('📊 Summary by Source:');

  Object.entries(bySource)
    .sort((a, b) => b[1].chunks - a[1].chunks)
    .forEach(([source, data]) => {
      console.log(`   ${source.padEnd(25)} ${data.documents.toString().padStart(3)} docs → ${data.chunks.toString().padStart(4)} chunks`);
    });

  console.log('\n📊 Overall Statistics:');
  console.log(`   Total documents: ${stats.totalDocuments}`);
  console.log(`   Total chunks: ${stats.totalChunks}`);
  console.log(`   Average chunks/doc: ${stats.averageChunksPerDoc}`);
  console.log(`   Average tokens/chunk: ${stats.averageTokensPerChunk}`);
  console.log(`\n📁 Output: ${outputPath}`);
  console.log('='.repeat(60));
}

// Run
main().catch((error) => {
  console.error('\n❌ Fatal error:', error);
  process.exit(1);
});
