#!/usr/bin/env node

/**
 * Test Firecrawl API directly
 * Usage: node test-firecrawl.js
 */

const FIRECRAWL_API_KEY = 'fc-0816fa448a3a4d8c85daaa724b13885f';
const FIRECRAWL_API_URL = 'https://api.firecrawl.dev/v1';

async function testScrape() {
  console.log('🧪 Testing Firecrawl API...\n');

  try {
    // Test 1: Simple scrape
    console.log('Test 1: Scraping webflow.com homepage...');
    const response = await fetch(`${FIRECRAWL_API_URL}/scrape`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
      },
      body: JSON.stringify({
        url: 'https://webflow.com',
        formats: ['markdown']
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ API Error:', response.status, error);
      return;
    }

    const data = await response.json();
    console.log('✅ Scrape successful!');
    console.log('Title:', data.data?.metadata?.title || 'N/A');
    console.log('Content length:', data.data?.markdown?.length || 0, 'characters');
    console.log('First 200 chars:', data.data?.markdown?.substring(0, 200) || 'N/A');
    console.log('\n---\n');

    // Test 2: Map URLs
    console.log('Test 2: Mapping webflow.com/updates...');
    const mapResponse = await fetch(`${FIRECRAWL_API_URL}/map`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${FIRECRAWL_API_KEY}`
      },
      body: JSON.stringify({
        url: 'https://webflow.com/updates',
        search: 'updates'
      })
    });

    if (!mapResponse.ok) {
      const error = await mapResponse.text();
      console.error('❌ Map Error:', mapResponse.status, error);
      return;
    }

    const mapData = await mapResponse.json();
    console.log('✅ Map successful!');
    console.log('Total URLs found:', mapData.links?.length || 0);

    // Filter for /updates/* URLs (one level deep)
    const updateUrls = mapData.links?.filter(url => {
      const match = url.match(/^https:\/\/webflow\.com\/updates\/([^\/]+)$/);
      return match && match[1]; // Has something after /updates/ but no further slashes
    }) || [];

    console.log('Update article URLs (one level deep):', updateUrls.length);
    console.log('\nFirst 5 update URLs:');
    updateUrls.slice(0, 5).forEach((url, i) => {
      console.log(`  ${i + 1}. ${url}`);
    });

    console.log('\n✅ All tests passed! Firecrawl is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testScrape();
