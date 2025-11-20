/**
 * Document Chunker for ETL Pipeline
 *
 * Reads markdown files from input directory, splits them into token-aware chunks,
 * and outputs structured JSON with metadata for embedding generation.
 *
 * Usage: node --import tsx chunker.ts
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

// ES modules workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================================
// Configuration
// ==========================================

const CONFIG = {
  inputDir: path.join(__dirname, 'input/webflow-updates/articles'),
  metadataFile: path.join(__dirname, 'input/webflow-updates/metadata.json'),
  outputDir: path.join(__dirname, 'output/chunks'),
  targetTokensPerChunk: 512,
  overlapTokens: 50,
  charsPerToken: 4, // Rough estimate: 1 token ≈ 4 characters
};

// ==========================================
// Types
// ==========================================

type ArticleMetadata = {
  url: string;
  slug: string;
  title: string;
  publishDate: string;
  description: string;
  category: string;
  file: string;
  scraped: boolean;
  word_count: number;
  char_count: number;
  scraped_at: string;
};

type Document = {
  id: string;
  uri: string;
  title: string;
  source_type: string;
  metadata: ArticleMetadata;
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
    title: string;
    publishDate: string;
    category: string;
  };
};

type ChunkingResult = {
  totalDocuments: number;
  totalChunks: number;
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
  // Simple estimation: 1 token ≈ 4 characters
  // This is a rough approximation; real tokenization is more complex
  return Math.ceil(text.length / CONFIG.charsPerToken);
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

function splitIntoChunks(
  text: string,
  targetTokens: number,
  overlapTokens: number
): string[] {
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

function chunkDocument(
  document: Document,
  markdown: string
): Chunk[] {
  const chunks: Chunk[] = [];

  // Clean markdown
  const cleanedMarkdown = cleanMarkdown(markdown);

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
          title: document.title,
          publishDate: document.metadata.publishDate,
          category: document.metadata.category,
        },
      };

      chunks.push(chunk);
    }
  }

  return chunks;
}

// ==========================================
// Main Execution
// ==========================================

async function main() {
  console.log('📄 Webflow RAG - Document Chunker\n');

  // Ensure output directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    console.log(`✓ Created output directory: ${CONFIG.outputDir}\n`);
  }

  // Load metadata
  console.log('📖 Loading metadata...');
  const metadataRaw = fs.readFileSync(CONFIG.metadataFile, 'utf-8');
  const metadata = JSON.parse(metadataRaw) as { articles: ArticleMetadata[] };
  console.log(`✓ Loaded metadata for ${metadata.articles.length} articles\n`);

  // Process each article
  const allChunks: Chunk[] = [];
  let processedCount = 0;

  console.log('🔄 Processing articles...\n');

  for (const article of metadata.articles) {
    const articlePath = path.join(__dirname, 'input/webflow-updates', article.file);

    if (!fs.existsSync(articlePath)) {
      console.log(`⚠️  Skipping ${article.slug}: file not found`);
      continue;
    }

    // Read markdown
    const markdown = fs.readFileSync(articlePath, 'utf-8');

    // Create document record
    const document: Document = {
      id: generateUUID(),
      uri: article.url,
      title: article.title,
      source_type: 'webflow-updates',
      metadata: article,
    };

    // Chunk the document
    const chunks = chunkDocument(document, markdown);
    allChunks.push(...chunks);
    processedCount++;

    console.log(
      `✓ ${article.slug.padEnd(40)} → ${chunks.length.toString().padStart(2)} chunks (${article.word_count} words)`
    );
  }

  // Calculate statistics
  const stats: ChunkingResult = {
    totalDocuments: processedCount,
    totalChunks: allChunks.length,
    averageChunksPerDoc: Math.round(allChunks.length / processedCount),
    averageTokensPerChunk: Math.round(
      allChunks.reduce((sum, c) => sum + c.token_count, 0) / allChunks.length
    ),
    chunks: allChunks,
  };

  // Write output
  const outputPath = path.join(CONFIG.outputDir, 'webflow-updates-chunks.json');
  fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2), 'utf-8');

  console.log('\n' + '='.repeat(60));
  console.log('✅ Chunking Complete!\n');
  console.log(`📊 Statistics:`);
  console.log(`   Documents processed: ${stats.totalDocuments}`);
  console.log(`   Total chunks: ${stats.totalChunks}`);
  console.log(`   Average chunks/doc: ${stats.averageChunksPerDoc}`);
  console.log(`   Average tokens/chunk: ${stats.averageTokensPerChunk}`);
  console.log(`\n📁 Output saved to: ${outputPath}`);
  console.log('='.repeat(60));
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
}

export { chunkDocument, cleanMarkdown, extractSections, splitIntoChunks, estimateTokenCount };
