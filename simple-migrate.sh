#!/bin/bash

# Simple migration script to copy data from local to remote D1
# Uses small batches to avoid timeout issues

set -e

cd /Users/ryan.hodge/Projects/webflow-rag/apps/web

echo "🚀 Starting migration from local to remote D1..."
echo ""

# Get counts
echo "📊 Checking local database..."
LOCAL_DOCS=$(npx wrangler d1 execute webflow-rag --local --command "SELECT COUNT(*) as count FROM documents" 2>/dev/null | grep -A 1 '"count"' | tail -1 | grep -o '[0-9]\+')
LOCAL_CHUNKS=$(npx wrangler d1 execute webflow-rag --local --command "SELECT COUNT(*) as count FROM chunks" 2>/dev/null | grep -A 1 '"count"' | tail -1 | grep -o '[0-9]\+')

echo "   Local: $LOCAL_DOCS documents, $LOCAL_CHUNKS chunks"
echo ""

# Export documents in batches
echo "📦 Migrating documents..."
BATCH_SIZE=50
OFFSET=0

while [ $OFFSET -lt $LOCAL_DOCS ]; do
  echo "   Processing documents $OFFSET to $(($OFFSET + $BATCH_SIZE))..."

  # Export batch as JSON
  npx wrangler d1 execute webflow-rag --local --json \
    --command "SELECT * FROM documents LIMIT $BATCH_SIZE OFFSET $OFFSET" \
    > /tmp/docs_batch.json 2>&1

  # Extract just the results array
  cat /tmp/docs_batch.json | grep -A 999999 '"results"' | tail -n +2 > /tmp/docs_clean.json || true

  # Generate SQL INSERT statements (using a small Node script)
  node -e "
    const fs = require('fs');
    try {
      const output = fs.readFileSync('/tmp/docs_batch.json', 'utf8');
      const lines = output.split('\\n');
      const jsonLine = lines.find(l => l.trim().startsWith('['));
      if (!jsonLine) process.exit(0);
      const data = JSON.parse(jsonLine)[0];
      if (!data || !data.results || data.results.length === 0) process.exit(0);

      const inserts = data.results.map(doc => {
        const esc = s => s ? \"'\" + s.replace(/'/g, \"''\") + \"'\" : 'NULL';
        return \`INSERT OR IGNORE INTO documents (id, uri, title, source_type, license, created_at, updated_at) VALUES (\${esc(doc.id)}, \${esc(doc.uri)}, \${esc(doc.title)}, \${esc(doc.source_type)}, \${esc(doc.license)}, \${esc(doc.created_at)}, \${esc(doc.updated_at)});\`;
      }).join('\\n');

      fs.writeFileSync('/tmp/docs_insert.sql', inserts);
      console.log('Generated SQL for ' + data.results.length + ' documents');
    } catch (e) {
      console.error('Error:', e.message);
      process.exit(0);
    }
  "

  # Execute on remote
  if [ -f /tmp/docs_insert.sql ] && [ -s /tmp/docs_insert.sql ]; then
    npx wrangler d1 execute webflow-rag --remote --file /tmp/docs_insert.sql > /dev/null 2>&1
  fi

  OFFSET=$(($OFFSET + $BATCH_SIZE))
done

echo "✅ Documents migrated"
echo ""

# Export chunks in smaller batches (chunks have more data)
echo "📦 Migrating chunks (this will take a few minutes)..."
CHUNK_BATCH_SIZE=25
OFFSET=0

while [ $OFFSET -lt $LOCAL_CHUNKS ]; do
  PROGRESS=$((($OFFSET * 100) / $LOCAL_CHUNKS))
  echo "   Progress: $PROGRESS% ($OFFSET / $LOCAL_CHUNKS chunks)"

  # Export batch
  npx wrangler d1 execute webflow-rag --local --json \
    --command "SELECT * FROM chunks LIMIT $CHUNK_BATCH_SIZE OFFSET $OFFSET" \
    > /tmp/chunks_batch.json 2>&1

  # Generate SQL
  node -e "
    const fs = require('fs');
    try {
      const output = fs.readFileSync('/tmp/chunks_batch.json', 'utf8');
      const lines = output.split('\\n');
      const jsonLine = lines.find(l => l.trim().startsWith('['));
      if (!jsonLine) process.exit(0);
      const data = JSON.parse(jsonLine)[0];
      if (!data || !data.results || data.results.length === 0) process.exit(0);

      const inserts = data.results.map(chunk => {
        const esc = s => s ? \"'\" + s.replace(/'/g, \"''\").replace(/\\n/g, ' ').substring(0, 50000) + \"'\" : 'NULL';
        const num = n => n !== null && n !== undefined ? n : 'NULL';
        return \`INSERT OR IGNORE INTO chunks (id, document_id, content, hash, token_count, section, chunk_index, created_at) VALUES (\${esc(chunk.id)}, \${esc(chunk.document_id)}, \${esc(chunk.content)}, \${esc(chunk.hash)}, \${num(chunk.token_count)}, \${esc(chunk.section)}, \${num(chunk.chunk_index)}, \${esc(chunk.created_at)});\`;
      }).join('\\n');

      fs.writeFileSync('/tmp/chunks_insert.sql', inserts);
    } catch (e) {
      console.error('Error:', e.message);
      process.exit(0);
    }
  "

  # Execute on remote
  if [ -f /tmp/chunks_insert.sql ] && [ -s /tmp/chunks_insert.sql ]; then
    npx wrangler d1 execute webflow-rag --remote --file /tmp/chunks_insert.sql > /dev/null 2>&1
  fi

  OFFSET=$(($OFFSET + $CHUNK_BATCH_SIZE))
done

echo "✅ Chunks migrated"
echo ""

# Verify
echo "🔍 Verifying remote database..."
REMOTE_DOCS=$(npx wrangler d1 execute webflow-rag --remote --command "SELECT COUNT(*) as count FROM documents" 2>/dev/null | grep -A 1 '"count"' | tail -1 | grep -o '[0-9]\+')
REMOTE_CHUNKS=$(npx wrangler d1 execute webflow-rag --remote --command "SELECT COUNT(*) as count FROM chunks" 2>/dev/null | grep -A 1 '"count"' | tail -1 | grep -o '[0-9]\+')

echo "   Remote: $REMOTE_DOCS documents, $REMOTE_CHUNKS chunks"
echo ""

if [ "$REMOTE_DOCS" -eq "$LOCAL_DOCS" ] && [ "$REMOTE_CHUNKS" -eq "$LOCAL_CHUNKS" ]; then
  echo "🎉 Migration complete! All data successfully copied to production."
else
  echo "⚠️  Warning: Row counts don't match. Please verify manually."
  echo "   Expected: $LOCAL_DOCS docs, $LOCAL_CHUNKS chunks"
  echo "   Got: $REMOTE_DOCS docs, $REMOTE_CHUNKS chunks"
fi

# Cleanup
rm -f /tmp/docs_batch.json /tmp/docs_insert.sql /tmp/chunks_batch.json /tmp/chunks_insert.sql
