// Checks the DP-600 Learn cards (flashcards/dp600-teach-*.js): every skill in the study guide
// outline has cards, every card points at a real skill, and the card HTML is well formed.
// Prints cards and practice questions per skill. Run with Node; exits 1 if anything is wrong.
//   node scripts/check_learn_cards.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const base = path.join(__dirname, '..');
// A floor that catches a skill left without cover; the smaller skills genuinely need only a few cards.
const MIN_CARDS_PER_SKILL = 4;
const MAX_TEXT_LENGTH = 360;

const sandbox = { window: {} };
vm.createContext(sandbox);
const run = (file) => vm.runInContext(fs.readFileSync(path.join(base, file), 'utf8'), sandbox, { filename: file });

run('tests/dp600/dp600_outline.js');
fs.readdirSync(path.join(base, 'flashcards')).filter((f) => /^dp600-teach-\d+\.js$/.test(f)).sort()
  .forEach((f) => run('flashcards/' + f));

const outline = sandbox.window.DP600_OUTLINE;
const cards = sandbox.window.DP600_TEACH || [];
const problems = [];

const skills = [];
outline.domains.filter((d) => d.inOutline !== false).forEach((d) => d.topics.forEach((t) => t.skills.forEach((s) => skills.push(s))));
const known = new Set(skills.map((s) => s.id));

const perSkill = {};
const seenTitles = new Set();
cards.forEach((c, i) => {
  const where = `card ${i + 1} (${c.skill} "${c.title}")`;
  if (!known.has(c.skill)) problems.push(`${where}: skill is not in the outline`);
  if (!c.title || !c.text) problems.push(`${where}: empty title or text`);
  if (c.text && c.text.length > MAX_TEXT_LENGTH) problems.push(`${where}: text is ${c.text.length} characters, over ${MAX_TEXT_LENGTH}`);
  for (const tag of ['b', 'code']) {
    const opens = (c.text.match(new RegExp(`<${tag}>`, 'g')) || []).length;
    const closes = (c.text.match(new RegExp(`</${tag}>`, 'g')) || []).length;
    if (opens !== closes) problems.push(`${where}: unbalanced <${tag}>`);
  }
  const key = c.skill + '|' + c.title;
  if (seenTitles.has(key)) problems.push(`${where}: duplicate title within the skill`);
  seenTitles.add(key);
  perSkill[c.skill] = (perSkill[c.skill] || 0) + 1;
});

console.log('Skill   Cards  Questions  Title');
skills.forEach((s) => {
  const n = perSkill[s.id] || 0;
  const q = (outline.questionsBySkill[s.id] || []).length;
  console.log(`${s.id.padEnd(7)} ${String(n).padStart(5)}  ${String(q).padStart(9)}  ${s.title}`);
  if (n < MIN_CARDS_PER_SKILL) problems.push(`${s.id}: only ${n} cards, expected at least ${MIN_CARDS_PER_SKILL}`);
});
console.log(`\n${cards.length} cards across ${skills.length} skills.`);

if (problems.length) {
  console.error('\nProblems:\n- ' + problems.join('\n- '));
  process.exit(1);
}
console.log('No problems found.');
