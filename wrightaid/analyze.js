const fs = require('fs');
const path = require('path');

const changedFiles = [
  'public/tenants.html',
  'public/payments.html'
];

const testFilePath = path.join(__dirname, '../tests/openlease.spec.js');

const testContent = fs.readFileSync(testFilePath, 'utf-8');

console.log('=== WrightAid Coverage Analysis ===\n');

changedFiles.forEach(file => {
  console.log(`Changed File Detected: ${file}`);

  const fileContent = fs.readFileSync(
    path.join(__dirname, '..', file),
    'utf-8'
  );

  if (fileContent.includes('Pet Rent')) {
    console.log('  → Pet rent functionality detected');

    if (!testContent.includes('Pet Rent')) {
      console.log('  ⚠ Potential Coverage Gap:');
      console.log('    No Playwright tests detected for pet rent workflows\n');
    } else {
      console.log('  ✓ Pet rent coverage detected\n');
    }
  }
});