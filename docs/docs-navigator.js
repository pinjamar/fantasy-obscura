#!/usr/bin/env node
/**
 * Fantasy-Obscura Documentation Navigator
 *
 * This script provides a visual guide to all documentation files
 * and helps users find what they need quickly.
 *
 * Usage: node docs-navigator.js
 */

const fs = require('fs');
const path = require('path');

const DOCS = {
  START: {
    file: '00_START_HERE.md',
    title: '🎯 START HERE - Project Completion Report',
    description:
      "Main entry point. Overview of everything that was built and what's ready to use.",
    tags: ['quickstart', 'overview', 'setup'],
    readTime: '5 min',
    audience: 'Everyone',
  },
  DATABASE: {
    file: 'DATABASE_SETUP.md',
    title: '🗄️ Database Setup Guide',
    description:
      'Initialize Supabase PostgreSQL, apply schema, verify indexes, seed test data.',
    tags: ['database', 'setup', 'initialization'],
    readTime: '10 min',
    audience: 'Developers',
    dependencies: ['env vars', 'Supabase account'],
  },
  IMPORT: {
    file: 'BULK_IMPORT_GUIDE.md',
    title: '📚 Bulk Import Guide',
    description:
      'Step-by-step walkthrough for importing books via UI, API, or scripts.',
    tags: ['import', 'books', 'workflow'],
    readTime: '8 min',
    audience: 'Everyone',
    requires: ['Database Setup'],
  },
  INTEGRATION: {
    file: 'BOOKHUB_API_INTEGRATION.md',
    title: '⚙️ BookHub API Integration',
    description:
      'Technical deep-dive into component changes, API endpoints, and data flows.',
    tags: ['technical', 'api', 'component'],
    readTime: '12 min',
    audience: 'Developers',
  },
  ARCHITECTURE: {
    file: 'SYSTEM_ARCHITECTURE.md',
    title: '🏗️ System Architecture',
    description:
      'Complete system design with diagrams, type definitions, and performance notes.',
    tags: ['architecture', 'design', 'types'],
    readTime: '15 min',
    audience: 'Architects/Senior Developers',
  },
  REFERENCE: {
    file: 'QUICK_REFERENCE.md',
    title: '⚡ Quick Reference',
    description:
      'Cheat sheet with commands, types, APIs, and common tasks at a glance.',
    tags: ['reference', 'cheat sheet', 'commands'],
    readTime: '2 min lookup',
    audience: 'Everyone',
  },
  CHECKLIST: {
    file: 'VERIFICATION_CHECKLIST.md',
    title: '✅ Verification Checklist',
    description:
      'Comprehensive quality assurance checklist with all verification steps.',
    tags: ['qa', 'testing', 'verification'],
    readTime: '10 min',
    audience: 'QA/Testers',
  },
  SUMMARY: {
    file: 'COMPLETION_SUMMARY.md',
    title: '📋 Project Completion Summary',
    description:
      'Executive summary of what was completed, status, and next steps.',
    tags: ['summary', 'status', 'handoff'],
    readTime: '5 min',
    audience: 'Project Leads',
  },
  README: {
    file: 'README.md',
    title: '📖 Project README',
    description: 'Original project README with general information.',
    tags: ['readme', 'general'],
    readTime: '3 min',
    audience: 'Everyone',
  },
};

// Personas and their recommended reading order
const PERSONAS = {
  'first-time-user': {
    name: 'First-Time User',
    icon: '👤',
    description: "I'm new to this project",
    order: ['START', 'IMPORT', 'REFERENCE', 'DATABASE'],
  },
  developer: {
    name: 'Developer',
    icon: '👨‍💻',
    description: 'I need to understand the code',
    order: [
      'START',
      'INTEGRATION',
      'ARCHITECTURE',
      'REFERENCE',
      'QUICK_REFERENCE',
    ],
  },
  devops: {
    name: 'DevOps/Infrastructure',
    icon: '🚀',
    description: 'I need to deploy this',
    order: ['START', 'DATABASE', 'ARCHITECTURE', 'COMPLETION_SUMMARY'],
  },
  qa: {
    name: 'QA/Tester',
    icon: '🧪',
    description: 'I need to test this',
    order: ['START', 'CHECKLIST', 'BULK_IMPORT_GUIDE', 'QUICK_REFERENCE'],
  },
  product: {
    name: 'Product Manager',
    icon: '📊',
    description: 'I need the overview',
    order: ['COMPLETION_SUMMARY', 'START', 'BULK_IMPORT_GUIDE'],
  },
};

function getFileSizeKB(filename) {
  try {
    const stats = fs.statSync(filename);
    return (stats.size / 1024).toFixed(1);
  } catch (e) {
    return '?';
  }
}

function printHeader() {
  console.log(
    '\n╔════════════════════════════════════════════════════════════════╗',
  );
  console.log(
    '║      📚 Fantasy-Obscura Documentation Navigator 📚             ║',
  );
  console.log(
    '╚════════════════════════════════════════════════════════════════╝\n',
  );
}

function printAllDocs() {
  console.log('📖 ALL DOCUMENTATION FILES\n');
  console.log('─'.repeat(70));

  Object.entries(DOCS).forEach(([key, doc], idx) => {
    const size = getFileSizeKB(doc.file);
    const marker = idx === 0 ? '🌟' : ' ';

    console.log(`\n${marker} ${idx + 1}. ${doc.title}`);
    console.log(`   📄 File: ${doc.file} (${size} KB)`);
    console.log(`   📝 ${doc.description}`);
    console.log(`   ⏱️  Read time: ${doc.readTime}`);
    console.log(`   👥 Audience: ${doc.audience}`);

    if (doc.tags) {
      console.log(`   🏷️  Tags: ${doc.tags.join(', ')}`);
    }

    if (doc.requires) {
      console.log(`   📋 Requires: ${doc.requires.join(', ')}`);
    }

    if (doc.dependencies) {
      console.log(`   ⚠️  Dependencies: ${doc.dependencies.join(', ')}`);
    }
  });

  console.log('\n' + '─'.repeat(70));
}

function printPersonaGuides() {
  console.log('\n🎯 READING GUIDES BY ROLE\n');
  console.log('─'.repeat(70));

  Object.entries(PERSONAS).forEach(([key, persona]) => {
    console.log(`\n${persona.icon} ${persona.name}`);
    console.log(`   ${persona.description}`);
    console.log(`   Recommended reading order:`);

    persona.order.forEach((docKey, idx) => {
      const doc = DOCS[docKey];
      if (doc) {
        console.log(`   ${idx + 1}. ${doc.title}`);
        console.log(`      → ${doc.file}`);
      }
    });
  });

  console.log('\n' + '─'.repeat(70));
}

function printQuickStart() {
  console.log('\n⚡ QUICK START PATHS\n');
  console.log('─'.repeat(70));

  console.log('\n🟢 I just want to use this:');
  console.log('   1. Read: 00_START_HERE.md (5 min)');
  console.log('   2. Run:  npm run dev');
  console.log('   3. Try:  BookHub component with Open Library');
  console.log('   4. Save: Test with node test-api.js\n');

  console.log('🔧 I need to set up the database:');
  console.log('   1. Read: DATABASE_SETUP.md');
  console.log('   2. Step 1-2: Set env vars & apply schema');
  console.log('   3. Step 3-4: Verify & test');
  console.log('   4. Step 6: Run test script\n');

  console.log('📚 I want to import many books:');
  console.log('   1. Read: BULK_IMPORT_GUIDE.md');
  console.log('   2. Method 1: Search UI in BookHub');
  console.log('   3. Method 2: Use batch scripts');
  console.log('   4. Check: QUICK_REFERENCE.md for examples\n');

  console.log('🏗️ I need to understand the architecture:');
  console.log('   1. Read: SYSTEM_ARCHITECTURE.md');
  console.log('   2. Read: BOOKHUB_API_INTEGRATION.md');
  console.log('   3. Check: Types in src/lib/types.ts');
  console.log('   4. Debug: Use QUICK_REFERENCE.md\n');

  console.log('─'.repeat(70));
}

function printFileMap() {
  console.log('\n📁 FILE LOCATION MAP\n');
  console.log('─'.repeat(70));

  console.log('\nCore Documentation:');
  Object.entries(DOCS).forEach(([key, doc]) => {
    console.log(`   ${doc.file.padEnd(35)} → ${doc.title}`);
  });

  console.log('\nCore Source Files (in src/):');
  console.log(
    '   components/BookHub.tsx'.padEnd(35) +
      ' → React component for book management',
  );
  console.log('   pages/api/search.ts'.padEnd(35) + ' → Search endpoint');
  console.log('   pages/api/books.ts'.padEnd(35) + ' → Create endpoint');
  console.log('   lib/books/providers.ts'.padEnd(35) + ' → Book API fetchers');
  console.log('   lib/db/books.ts'.padEnd(35) + ' → Database operations');
  console.log('   lib/types.ts'.padEnd(35) + ' → TypeScript definitions');

  console.log('\nScripts:');
  console.log('   test-api.js'.padEnd(35) + ' → Test API endpoints');
  console.log('   docs-navigator.js'.padEnd(35) + ' → This script');

  console.log('\n' + '─'.repeat(70));
}

function printSearchGuide() {
  console.log('\n🔍 SEARCH KEYWORDS\n');
  console.log('─'.repeat(70));

  const keywords = {
    setup: ['DATABASE_SETUP.md', 'BOOKHUB_API_INTEGRATION.md'],
    import: ['BULK_IMPORT_GUIDE.md', 'QUICK_REFERENCE.md'],
    api: ['BOOKHUB_API_INTEGRATION.md', 'QUICK_REFERENCE.md'],
    types: ['SYSTEM_ARCHITECTURE.md', 'QUICK_REFERENCE.md'],
    deploy: ['COMPLETION_SUMMARY.md', 'DATABASE_SETUP.md'],
    test: ['VERIFICATION_CHECKLIST.md', 'QUICK_REFERENCE.md'],
    error: ['QUICK_REFERENCE.md', 'BULK_IMPORT_GUIDE.md'],
    filter: ['QUICK_REFERENCE.md', 'DATABASE_SETUP.md'],
  };

  Object.entries(keywords).forEach(([keyword, files]) => {
    console.log(`\n"${keyword}"`);
    files.forEach((file) => {
      console.log(`   → ${file}`);
    });
  });

  console.log('\n' + '─'.repeat(70));
}

function printStats() {
  console.log('\n📊 DOCUMENTATION STATISTICS\n');
  console.log('─'.repeat(70));

  let totalSize = 0;
  let totalReadTime = 0;
  const readTimes = {
    '2 min lookup': 2,
    '3 min': 3,
    '5 min': 5,
    '8 min': 8,
    '10 min': 10,
    '12 min': 12,
    '15 min': 15,
  };

  Object.values(DOCS).forEach((doc) => {
    const size = parseFloat(getFileSizeKB(doc.file));
    totalSize += isNaN(size) ? 0 : size;

    const timeMatch = doc.readTime.match(/(\d+)/);
    if (timeMatch) {
      totalReadTime += parseInt(timeMatch[1]);
    }
  });

  console.log(`Total Files: ${Object.keys(DOCS).length}`);
  console.log(`Total Size: ${totalSize.toFixed(1)} KB`);
  console.log(`Total Read Time: ~${totalReadTime} minutes`);
  console.log(
    `Average per File: ${(totalReadTime / Object.keys(DOCS).length).toFixed(1)} min`,
  );

  console.log('\n' + '─'.repeat(70));
}

function printFooter() {
  console.log('\n💡 TIPS\n');
  console.log('─'.repeat(70));
  console.log('\n• Start with 00_START_HERE.md if unsure');
  console.log('• Use QUICK_REFERENCE.md as a cheat sheet');
  console.log('• See BULK_IMPORT_GUIDE.md for practical examples');
  console.log('• Check SYSTEM_ARCHITECTURE.md for deep understanding');
  console.log('• Run "node test-api.js" to verify setup');
  console.log('\n' + '─'.repeat(70) + '\n');
}

// Main execution
if (require.main === module) {
  printHeader();
  printAllDocs();
  printPersonaGuides();
  printQuickStart();
  printFileMap();
  printSearchGuide();
  printStats();
  printFooter();
}

module.exports = { DOCS, PERSONAS };
