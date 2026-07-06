const fs = require('fs');
const path = require('path');
const vm = require('vm');

const workspaceDir = 'c:\\Users\\damie\\projects\\microsoft-certifications';
const dp300Dir = path.join(workspaceDir, 'dp300');
const testsDp300Dir = path.join(workspaceDir, 'tests', 'dp300');

console.log('=== RUNNING DETAILED CONTENT QUALITY CHECK ===');

// Check 1: Duplicate Questions in practice exams
console.log('\n--- Checking for Duplicate Questions ---');
const sandbox = { window: { __dp300: { modules: [], questions: [] } } };
sandbox.window.__dp300.questions.concat = function(arr) {
  return Array.prototype.concat.call(sandbox.window.__dp300.questions, arr);
};

for (let m = 1; m <= 5; m++) {
  const fileName = `dp300_skill${m}.js`;
  const filePath = path.join(testsDp300Dir, fileName);
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    vm.runInNewContext(fileContent, sandbox);
  }
}

const allQuestions = sandbox.window.__dp300.questions;
const seenTexts = new Map();
let duplicateCount = 0;

allQuestions.forEach((q, idx) => {
  const cleanedText = q.text.trim().toLowerCase().replace(/\s+/g, ' ');
  if (seenTexts.has(cleanedText)) {
    const prev = seenTexts.get(cleanedText);
    console.log(`Duplicate question text found:`);
    console.log(`  - Question A: Module ${prev.module}, index ${prev.localIndex} ("${q.text.substring(0, 60)}...")`);
    console.log(`  - Question B: Module ${q.module}, index ${idx - prev.globalOffset} ("${q.text.substring(0, 60)}...")`);
    duplicateCount++;
  } else {
    // We compute local index by counting how many questions are in earlier modules
    let globalOffset = 0;
    // Just map it
    seenTexts.set(cleanedText, { module: q.module, globalIndex: idx, localIndex: 0, globalOffset: 0 });
  }
});
console.log(`Total duplicate questions found: ${duplicateCount}`);


// Check 2: Verify alignment between options and correct index
console.log('\n--- Checking Options and Correct Answers ---');
allQuestions.forEach((q, idx) => {
  if (q.options && q.correct !== undefined) {
    if (q.type === 'multi') {
      const bad = Array.isArray(q.correct) && q.correct.every(c => q.options[c] !== undefined);
      if (!bad) {
        console.log(`Error: Question index ${idx} has invalid correct index ${q.correct}`);
      }
      return;
    }
    const correctOption = q.options[q.correct];
    if (!correctOption) {
      console.log(`Error: Question index ${idx} has invalid correct index ${q.correct}`);
    } else {
      // Look for common issues (e.g. correct option text doesn't match explanation or is obviously wrong)
      // For instance, if explanation says "option A is correct" but correct index is not 0.
      const expLower = q.explanation.toLowerCase();
      // Look for patterns like "option A", "option B", etc. or the text of options
      q.options.forEach((opt, optIdx) => {
        const optLetter = String.fromCharCode(65 + optIdx); // A, B, C, D
        const optLower = opt.toLowerCase();
        // If correct is optIdx, does explanation contradict it?
        // E.g., if explanation contains "is the correct option" or similar, check if it matches the correct index
      });
    }
  }
});


// Check 3: Markdown Headings Audit in dp300/notes/*.md (the content the site actually renders;
// dp300/modules holds raw, intentionally unformatted source and is not audited here)
console.log('\n--- Auditing Markdown Headings in notes ---');
const files = fs.readdirSync(path.join(dp300Dir, 'notes')).filter(f => f.endsWith('.md'));
files.forEach(file => {
  const content = fs.readFileSync(path.join(dp300Dir, 'notes', file), 'utf8');
  const lines = content.split('\n');
  
  // Find lines that look like headings but lack # prefix
  // e.g. "1. Introduction", "2. Explain IaaS options...", "Learning objectives", "Summary"
  const potentialHeadings = [];
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    
    // Pattern 1: Numbered heading like "1. Introduction" or "10. Conclusion" or "1.1. Something"
    const isNumberedHeading = /^\d+(\.\d+)*\.\s+[A-Z]/.test(trimmed);
    
    // Pattern 2: Short lines in Title Case (excluding lists or code or tables)
    const isTitleCaseShort = trimmed.length < 60 && 
                              /^[A-Z][a-zA-Z0-9'\s\-\/—\(\)]+$/.test(trimmed) && 
                              !trimmed.startsWith('-') && 
                              !trimmed.startsWith('*') && 
                              !trimmed.startsWith('|') && 
                              !/^\d+\s*$/.test(trimmed) &&
                              !trimmed.toLowerCase().includes('http') &&
                              // exclude lines with punctuation like full stop, colon, comma
                              !/[.:,;?!]/.test(trimmed);

    // Let's filter out lines inside code blocks (not doing full parser here, but basic toggle)
    let insideCodeBlock = false;
    for (let i = 0; i < idx; i++) {
      if (lines[i].trim().startsWith('```')) {
        insideCodeBlock = !insideCodeBlock;
      }
    }
    
    if (!insideCodeBlock && !trimmed.startsWith('#')) {
      if (isNumberedHeading || isTitleCaseShort) {
        potentialHeadings.push({ lineNum: idx + 1, text: trimmed, type: isNumberedHeading ? 'Numbered' : 'TitleCase' });
      }
    }
  });
  
  if (potentialHeadings.length > 0) {
    console.log(`File: ${file} has ${potentialHeadings.length} unformatted headings:`);
    potentialHeadings.slice(0, 5).forEach(h => {
      console.log(`  Line ${h.lineNum}: "${h.text}" (${h.type})`);
    });
    if (potentialHeadings.length > 5) {
      console.log(`  ... and ${potentialHeadings.length - 5} more.`);
    }
  }
});

console.log('\n=== QUALITY CHECK DONE ===');
