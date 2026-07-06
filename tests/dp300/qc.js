const fs = require('fs');
const path = require('path');
const vm = require('vm');

const workspaceDir = 'c:\\Users\\damie\\projects\\microsoft-certifications';
const dp300Dir = path.join(workspaceDir, 'dp300');

console.log('--- STARTING DP-300 QUALITY CHECK ---');
let errors = [];
let warnings = [];

// 1. Check MODULE_CONFIG mapping in js/data.js vs actual files
console.log('\nChecking MODULE_CONFIG and file existence...');
const appJsPath = path.join(workspaceDir, 'js', 'data.js');
let dp300Config = [];
try {
  const appJsContent = fs.readFileSync(appJsPath, 'utf8');
  // Simple regex parser for MODULE_CONFIG.dp300 (bare or quoted key)
  const configMatch = appJsContent.match(/dp300:\s*\[([\s\S]*?)\n {2}\],/);
  if (!configMatch) {
    errors.push('Could not find MODULE_CONFIG[\'dp300\'] in js/data.js');
  } else {
    // Parse the individual config entries
    const entryRegex = /{\s*file:\s*'([^']*)',\s*title:\s*'([^']*)'\s*}/g;
    let match;
    while ((match = entryRegex.exec(configMatch[1])) !== null) {
      dp300Config.push({ file: match[1], title: match[2] });
    }
  }
} catch (e) {
  errors.push(`Failed to read/parse js/data.js: ${e.message}`);
}

console.log(`Found ${dp300Config.length} configured modules in js/data.js`);

// Verify that the files exist in dp300/notes (this is what the site actually renders;
// dp300/modules holds raw, unformatted source content and is only a fetch fallback)
dp300Config.forEach(cfg => {
  const filePath = path.join(dp300Dir, 'notes', cfg.file);
  if (!fs.existsSync(filePath)) {
    errors.push(`Configured file does not exist: ${filePath}`);
  } else {
    // Read and verify markdown content briefly
    const content = fs.readFileSync(filePath, 'utf8');
    if (!content.trim()) {
      errors.push(`Markdown file is empty: ${filePath}`);
    }
    // Check if the file starts with a header matching the title or similar
    const headerMatch = content.match(/^#\s+(.*)/m);
    if (!headerMatch) {
      warnings.push(`No H1 header found in markdown: ${cfg.file}`);
    }
  }
});

// Check if there are extra files in dp300/notes
const notesDir = path.join(dp300Dir, 'notes');
if (fs.existsSync(notesDir)) {
  const actualFiles = fs.readdirSync(notesDir);
  actualFiles.forEach(file => {
    if (file.endsWith('.md')) {
      const isConfigured = dp300Config.some(cfg => cfg.file === file);
      if (!isConfigured) {
        warnings.push(`File ${file} exists in dp300/notes but is not configured in js/data.js`);
      }
    }
  });
} else {
  errors.push(`Directory does not exist: ${notesDir}`);
}

// 2. Check summary files
console.log('\nChecking summary files...');
const summaryDir = path.join(dp300Dir, 'summary');
if (fs.existsSync(summaryDir)) {
  const summaries = fs.readdirSync(summaryDir).filter(f => f.endsWith('.md'));
  // We expect M1.Summary.md to M6.Summary.md
  for (let m = 1; m <= 6; m++) {
    const expectedName = `M${m}.Summary.md`;
    if (!summaries.includes(expectedName)) {
      errors.push(`Expected summary file not found: ${expectedName}`);
    } else {
      const summaryPath = path.join(summaryDir, expectedName);
      const content = fs.readFileSync(summaryPath, 'utf8');
      if (!content.trim()) {
        errors.push(`Summary file is empty: ${expectedName}`);
      }
    }
  }
} else {
  errors.push(`Directory does not exist: ${summaryDir}`);
}

// 3. Check cards_dp300.js
console.log('\nChecking cards_dp300.js...');
const cardsPath = path.join(workspaceDir, 'cards_dp300.js');
if (!fs.existsSync(cardsPath)) {
  errors.push(`cards_dp300.js not found`);
} else {
  try {
    const cardsContent = fs.readFileSync(cardsPath, 'utf8');
    const sandbox = {};
    vm.runInNewContext(cardsContent, sandbox);
    if (!sandbox.DP300_DATA) {
      errors.push(`DP300_DATA not found in cards_dp300.js global context`);
    } else {
      const data = sandbox.DP300_DATA;
      if (data.title !== 'Designing and Implementing Azure Database Solutions') {
        warnings.push(`Unexpected title in cards_dp300.js: ${data.title}`);
      }
      if (!data.modules || typeof data.modules !== 'object') {
        errors.push(`DP300_DATA.modules is missing or not an object`);
      } else {
        // We expect Module 1 to Module 6
        for (let m = 1; m <= 6; m++) {
          const modKey = `Module ${m}`;
          if (!data.modules[modKey]) {
            errors.push(`Module ${modKey} missing in cards_dp300.js`);
          } else {
            const mod = data.modules[modKey];
            if (!mod.topics || typeof mod.topics !== 'object') {
              errors.push(`topics missing or not an object in cards_dp300.js for ${modKey}`);
            } else {
              const topicKeys = Object.keys(mod.topics);
              if (topicKeys.length === 0) {
                errors.push(`No topics found in ${modKey} in cards_dp300.js`);
              }
              topicKeys.forEach(tKey => {
                const topic = mod.topics[tKey];
                const requiredFields = ['What It Is', 'Exam Gotchas']; // minimum common fields in concept cards
                requiredFields.forEach(field => {
                  if (!topic[field]) {
                    warnings.push(`Topic "${tKey}" in ${modKey} is missing standard field "${field}"`);
                  }
                });
              });
            }
          }
        }
      }
    }
  } catch (e) {
    errors.push(`Failed to compile or execute cards_dp300.js: ${e.message}`);
  }
}

// 4. Check practice test files under tests/dp300/
console.log('\nChecking tests/dp300/ files...');
const testsDp300Dir = path.join(workspaceDir, 'tests', 'dp300');
if (!fs.existsSync(testsDp300Dir)) {
  errors.push(`tests/dp300 directory does not exist`);
} else {
  // We mock window.__dp300
  const sandbox = {
    window: {
      __dp300: {
        modules: [],
        questions: []
      }
    }
  };
  sandbox.window.__dp300.questions.concat = function(arr) {
    return Array.prototype.concat.call(sandbox.window.__dp300.questions, arr);
  };
  
  // Load each skill-area file in order
  for (let m = 1; m <= 5; m++) {
    const fileName = `dp300_skill${m}.js`;
    const filePath = path.join(testsDp300Dir, fileName);
    if (!fs.existsSync(filePath)) {
      errors.push(`Practice test file not found: ${fileName}`);
      continue;
    }
    
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      // Before execution, record how many questions we had
      const prevQCount = sandbox.window.__dp300.questions.length;
      
      // Run in VM with window mocked
      vm.runInNewContext(fileContent, sandbox);
      
      const newQCount = sandbox.window.__dp300.questions.length;
      const questionsAdded = newQCount - prevQCount;
      console.log(`Loaded ${fileName} successfully. Added ${questionsAdded} questions.`);
      
      if (questionsAdded === 0) {
        warnings.push(`${fileName} did not add any questions to window.__dp300.questions`);
      }
      
      // Validate the newly added questions
      const addedQuestions = sandbox.window.__dp300.questions.slice(prevQCount);
      addedQuestions.forEach((q, idx) => {
        const qLabel = `${fileName} Question #${idx + 1}`;
        if (!q.id || typeof q.id !== 'string') {
          errors.push(`${qLabel} is missing a stable "id" field (required for spaced-review tracking)`);
        }
        if (!q.text || typeof q.text !== 'string') {
          errors.push(`${qLabel} is missing text or text is not a string`);
        }
        if (!Array.isArray(q.options) || q.options.length < 2) {
          errors.push(`${qLabel} options must be an array of at least 2 elements`);
        } else {
          q.options.forEach((opt, oIdx) => {
            if (typeof opt !== 'string' || !opt.trim()) {
              errors.push(`${qLabel} option ${oIdx} is empty or not a string`);
            }
          });
        }
        if (q.type === 'multi') {
          if (!Array.isArray(q.correct) || q.correct.length < 1) {
            errors.push(`${qLabel} correct must be a non-empty array of indices for a "multi" question`);
          } else {
            q.correct.forEach(c => {
              if (typeof c !== 'number' || c < 0 || (q.options && c >= q.options.length)) {
                errors.push(`${qLabel} correct index (${c}) is out of bounds (options length is ${q.options ? q.options.length : 0})`);
              }
            });
          }
        } else if (typeof q.correct !== 'number' || q.correct < 0 || (q.options && q.correct >= q.options.length)) {
          errors.push(`${qLabel} correct index (${q.correct}) is out of bounds (options length is ${q.options ? q.options.length : 0})`);
        }
        if (q.module !== m) {
          errors.push(`${qLabel} module property (${q.module}) does not match expected module (${m})`);
        }
        if (!q.explanation || typeof q.explanation !== 'string' || !q.explanation.trim()) {
          warnings.push(`${qLabel} has empty or missing explanation`);
        }
        
        // Double check explanation correctness: does it reference the correct answer or contain formatting errors?
        // Basic check for markdown syntax inside explanation or text
        const mdBoldRegex = /\*\*[^*]+\*\*/g;
        // Just checking unclosed tags or brackets in text/explanation
        if (q.text && (q.text.match(/</g) || []).length !== (q.text.match(/>/g) || []).length) {
          warnings.push(`${qLabel} text might have unclosed HTML tags: "${q.text}"`);
        }
        if (q.explanation && (q.explanation.match(/</g) || []).length !== (q.explanation.match(/>/g) || []).length) {
          warnings.push(`${qLabel} explanation might have unclosed HTML tags: "${q.explanation}"`);
        }
      });
    } catch (e) {
      errors.push(`Failed to compile or execute ${fileName}: ${e.message}`);
    }
  }

  // Check id uniqueness across the whole dp300 question pool
  const idCounts = {};
  sandbox.window.__dp300.questions.forEach(q => {
    if (q.id) idCounts[q.id] = (idCounts[q.id] || 0) + 1;
  });
  Object.entries(idCounts).forEach(([id, count]) => {
    if (count > 1) errors.push(`Duplicate question id "${id}" appears ${count} times across dp300 files`);
  });

  // Check tests/dp300/dp300.js aggregator
  const aggregatorPath = path.join(testsDp300Dir, 'dp300.js');
  if (!fs.existsSync(aggregatorPath)) {
    errors.push(`Aggregator file tests/dp300/dp300.js not found`);
  } else {
    try {
      const aggContent = fs.readFileSync(aggregatorPath, 'utf8');
      const aggSandbox = {
        window: {
          __dp300: sandbox.window.__dp300
        }
      };
      vm.runInNewContext(aggContent, aggSandbox);
      // It should check if DP300_MODULES and DP300_QUESTIONS are set
      if (!aggSandbox.DP300_MODULES || !Array.isArray(aggSandbox.DP300_MODULES)) {
        errors.push(`DP300_MODULES missing or not an array after executing aggregator`);
      }
      if (!aggSandbox.DP300_QUESTIONS || !Array.isArray(aggSandbox.DP300_QUESTIONS)) {
        errors.push(`DP300_QUESTIONS missing or not an array after executing aggregator`);
      }
    } catch (e) {
      errors.push(`Failed to compile or execute tests/dp300/dp300.js: ${e.message}`);
    }
  }
}

// 5. Index.html cross check
console.log('\nChecking index.html script references...');
try {
  const indexHtmlContent = fs.readFileSync(path.join(workspaceDir, 'index.html'), 'utf8');
  // Check if cards_dp300.js and all test/dp300 files are referenced in index.html
  if (!indexHtmlContent.includes('cards_dp300.js')) {
    errors.push('index.html is missing script reference to cards_dp300.js');
  }
  for (let m = 1; m <= 5; m++) {
    const scriptRef = `tests/dp300/dp300_skill${m}.js`;
    if (!indexHtmlContent.includes(scriptRef)) {
      errors.push(`index.html is missing script reference to ${scriptRef}`);
    }
  }
  if (!indexHtmlContent.includes('tests/dp300/dp300.js')) {
    errors.push('index.html is missing script reference to tests/dp300/dp300.js');
  }
} catch (e) {
  errors.push(`Failed to read/verify index.html: ${e.message}`);
}

// Report results
console.log('\n======================================');
console.log('QUALITY CHECK SUMMARY:');
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);
console.log('======================================');

if (errors.length > 0) {
  console.log('\nERRORS FOUND:');
  errors.forEach(e => console.log(`- ${e}`));
} else {
  console.log('\nNo errors found!');
}

if (warnings.length > 0) {
  console.log('\nWARNINGS FOUND:');
  warnings.forEach(w => console.log(`- ${w}`));
}
