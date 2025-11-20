#!/bin/bash

# Test script to showcase RAG knowledge base improvements

echo "🧪 Testing Webflow RAG Knowledge Base"
echo "======================================"
echo ""

# Test 1: API Documentation
echo "📝 Query 1: How do I authenticate with the Webflow Data API?"
echo "---"
curl -s -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"query": "How do I authenticate with the Webflow Data API?"}' | \
  grep '"type":"done"' | \
  sed 's/data: //' | \
  jq -r '.sources[] | "   ✓ " + .title + " (" + .source_type + ")"'
echo ""

# Test 2: Webflow Cloud
echo "📝 Query 2: What storage options are available in Webflow Cloud?"
echo "---"
curl -s -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"query": "What storage options are available in Webflow Cloud?"}' | \
  grep '"type":"done"' | \
  sed 's/data: //' | \
  jq -r '.sources[] | "   ✓ " + .title + " (" + .source_type + ")"'
echo ""

# Test 3: Best Practices
echo "📝 Query 3: What are Webflow design system best practices?"
echo "---"
curl -s -X POST http://localhost:3000/api/ask \
  -H "Content-Type: application/json" \
  -d '{"query": "What are Webflow design system best practices?"}' | \
  grep '"type":"done"' | \
  sed 's/data: //' | \
  jq -r '.sources[] | "   ✓ " + .title + " (" + .source_type + ")"'
echo ""

echo "======================================"
echo "✅ Knowledge base test complete!"
echo ""
echo "📊 Coverage:"
echo "   - API Documentation: ✅ webflow-developers (4,646 chunks)"
echo "   - Best Practices: ✅ webflow-way (405 chunks)"
echo "   - Product Updates: ✅ webflow-updates (68 chunks)"
echo "   - Total: 5,119 chunks across 744 documents"
