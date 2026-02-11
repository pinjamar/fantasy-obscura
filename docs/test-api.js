#!/usr/bin/env node
/**
 * Test script to verify API endpoints are working
 * Run: node test-api.js
 */

const BASE_URL = 'http://localhost:3000';

async function testSearch() {
  console.log('🔍 Testing /api/search endpoint...\n');

  try {
    const response = await fetch(
      `${BASE_URL}/api/search?source=openlibrary&q=Lord%20of%20the%20Rings`,
    );
    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Search failed:', data.error);
      return false;
    }

    console.log(`✓ Search returned ${data.items.length} results`);
    if (data.items.length > 0) {
      const first = data.items[0];
      console.log(
        `  - First book: "${first.title}" by ${first.authors?.join(', ')}`,
      );
      console.log(`  - Source: ${first.source}`);
    }
    return true;
  } catch (err) {
    console.error('❌ Search test failed:', err.message);
    return false;
  }
}

async function testCreateBook() {
  console.log('\n💾 Testing /api/books POST endpoint...\n');

  const testBook = {
    title: 'Test Book API',
    authors: ['Test Author'],
    publication_year: 2024,
    synopsis: 'This is a test book created via the API.',
  };

  try {
    const response = await fetch(`${BASE_URL}/api/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testBook),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Create failed:', data.error);
      return false;
    }

    console.log('✓ Book created successfully');
    console.log(`  - ID: ${data.book.id}`);
    console.log(`  - Title: ${data.book.title}`);
    return true;
  } catch (err) {
    console.error('❌ Create test failed:', err.message);
    return false;
  }
}

async function runTests() {
  console.log('='.repeat(50));
  console.log('API Endpoint Tests');
  console.log('='.repeat(50));

  const searchOk = await testSearch();
  const createOk = await testCreateBook();

  console.log('\n' + '='.repeat(50));
  console.log('Results:');
  console.log(`  Search: ${searchOk ? '✓ PASS' : '✗ FAIL'}`);
  console.log(`  Create: ${createOk ? '✓ PASS' : '✗ FAIL'}`);
  console.log('='.repeat(50));
}

runTests();
