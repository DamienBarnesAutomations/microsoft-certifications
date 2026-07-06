// One-off migration: adds a stable "id" field to every question object in the
// dp300/dp600/dp700 practice-test files, needed for the Leitner spaced-review system
// (questions previously had no identity beyond array position). Run once with Node;
// not loaded by the browser app. Safe to re-run — it overwrites ids deterministically.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const base = path.join(__dirname, '..');

const CERT_FILES = {
  dp300: ['dp300_skill1.js', 'dp300_skill2.js', 'dp300_skill3.js', 'dp300_skill4.js', 'dp300_skill5.js'],
  dp600: ['dp600_module1.js', 'dp600_module2.js', 'dp600_module3.js', 'dp600_module4.js', 'dp600_module5.js'],
  dp700: ['dp700_module1.js', 'dp700_module2.js', 'dp700_module3.js', 'dp700_module4.js', 'dp700_module5.js', 'dp700_module6.js'],
};

function loadQuestions(filePath, accumulatorKey) {
  const sandbox = { window: { [accumulatorKey]: { modules: [], questions: [] } } };
  sandbox.window[accumulatorKey].questions.concat = function (arr) {
    return Array.prototype.concat.call(sandbox.window[accumulatorKey].questions, arr);
  };
  vm.runInNewContext(fs.readFileSync(filePath, 'utf8'), sandbox);
  return sandbox.window[accumulatorKey].questions;
}

let totalAssigned = 0;

for (const [cert, files] of Object.entries(CERT_FILES)) {
  const accumulatorKey = `__${cert}`;
  files.forEach((fileName) => {
    const filePath = path.join(base, 'tests', cert, fileName);
    const raw = fs.readFileSync(filePath, 'utf8');
    const questions = loadQuestions(filePath, accumulatorKey);

    const withIds = questions.map((q, i) => ({
      id: `${cert}-${q.module}-${String(i + 1).padStart(3, '0')}`,
      ...q,
    }));

    const serialized = 'var questions = ' +
      JSON.stringify(withIds, null, 2).split('\n').map((l, i) => (i === 0 ? l : '  ' + l)).join('\n') +
      ';';

    const updated = raw.replace(/var questions = \[[\s\S]*?\n\s*\];/, serialized);

    if (updated === raw) {
      throw new Error(`Failed to locate "var questions = [...]" block in ${filePath}`);
    }

    fs.writeFileSync(filePath, updated);
    console.log(`${cert}/${fileName}: assigned ${withIds.length} ids`);
    totalAssigned += withIds.length;
  });
}

console.log(`\nTotal questions with new ids: ${totalAssigned}`);
