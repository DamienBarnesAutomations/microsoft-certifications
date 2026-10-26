// Question formats beyond single / multi / true-false: 'ordering' (arrange steps in sequence) and
// 'yesno' (a series of statements, each answered Yes or No). Both are all-or-nothing, like the real exam.
//
// Stored shape (before the per-question shuffle):
//   ordering: options = the steps in CORRECT order.
//   yesno:    options = the statements, correct = [true, false, ...] per statement.
// After shuffleQuestionOptions both carry `correct` as an array comparable to the answer:
//   ordering: the display indexes in correct order; answer = display indexes in the learner's order.
//   yesno:    booleans per displayed statement; answer = booleans (null until picked).
// A question may also carry `scenario` (case-study text shown above it) and `case` (the case id).
const FORMAT_TYPES = ['ordering', 'yesno'];

function isFormatQuestion(q) {
  return FORMAT_TYPES.includes(q.type);
}

function isFormatAnswered(q, ans) {
  if (!Array.isArray(ans) || ans.length !== q.options.length) return false;
  return q.type !== 'yesno' || !ans.includes(null);
}

function isFormatCorrect(q, ans) {
  return isFormatAnswered(q, ans) && q.correct.every((c, i) => c === ans[i]);
}

// Applies the shuffle permutation (order[newIdx] = oldIdx) to a format question's options and key.
function shuffleFormatQuestion(q, order, oldToNew) {
  const options = order.map((oldIdx) => q.options[oldIdx]);
  const correct = q.type === 'ordering'
    ? q.options.map((_, oldIdx) => oldToNew[oldIdx])
    : order.map((oldIdx) => q.correct[oldIdx]);
  return { ...q, options, correct };
}

function formatTypeBadge(q) {
  if (q.type === 'ordering') return ' • <span class="q-type-badge q-type-multi">Put in order</span>';
  if (q.type === 'yesno') return ' • <span class="q-type-badge q-type-tf">Yes / No</span>';
  return '';
}

function scenarioHtml(q) {
  if (!q.scenario) return '';
  return `<details class="scenario-box" open><summary>Case study${q.caseTitle ? ': ' + q.caseTitle : ''}</summary><div>${q.scenario}</div></details>`;
}

// Draws the answer area for an ordering / yesno question into `host`.
// opts: { answer, locked, reveal, onChange(answerOrNull) }. When locked the rows are not editable;
// reveal additionally marks each row right or wrong.
function renderFormatWidget(q, host, opts) {
  const n = q.options.length;
  const state = Array.isArray(opts.answer) ? [...opts.answer]
    : q.type === 'ordering' ? q.options.map((_, i) => i) : new Array(n).fill(null);

  const draw = () => {
    host.innerHTML = '';
    if (q.type === 'ordering') drawOrdering(q, host, state, opts, draw);
    else drawYesNo(q, host, state, opts, draw);
  };
  draw();
}

function drawOrdering(q, host, seq, opts, redraw) {
  seq.forEach((optIdx, pos) => {
    const row = document.createElement('div');
    row.className = 'option-item order-row';
    if (opts.locked) row.classList.add('disabled');
    if (opts.reveal) row.classList.add(q.correct[pos] === optIdx ? 'correct' : 'wrong');
    row.innerHTML = `<span class="option-badge">${pos + 1}</span><span class="order-text">${q.options[optIdx]}</span>`;
    if (!opts.locked) {
      const move = (delta) => {
        const to = pos + delta;
        if (to < 0 || to >= seq.length) return;
        [seq[pos], seq[to]] = [seq[to], seq[pos]];
        redraw();
        opts.onChange([...seq]);
      };
      const mk = (label, aria, delta) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'btn btn-secondary btn-sm order-btn';
        b.textContent = label;
        b.setAttribute('aria-label', aria);
        b.disabled = pos + delta < 0 || pos + delta >= seq.length;
        b.onclick = () => move(delta);
        return b;
      };
      const ctl = document.createElement('span');
      ctl.className = 'order-ctl';
      ctl.append(mk('↑', 'Move up', -1), mk('↓', 'Move down', 1));
      row.appendChild(ctl);
    }
    host.appendChild(row);
  });
  if (opts.reveal) {
    const key = document.createElement('div');
    key.className = 'order-key';
    key.innerHTML = '<strong>Correct order:</strong><ol>' + q.correct.map((i) => `<li>${q.options[i]}</li>`).join('') + '</ol>';
    host.appendChild(key);
  }
}

function drawYesNo(q, host, vals, opts, redraw) {
  q.options.forEach((stmt, i) => {
    const row = document.createElement('div');
    row.className = 'option-item yesno-row';
    if (opts.reveal) row.classList.add(vals[i] === q.correct[i] ? 'correct' : 'wrong');
    row.innerHTML = `<span class="yesno-text">${stmt}</span>`;
    const ctl = document.createElement('span');
    ctl.className = 'yesno-ctl';
    [[true, 'Yes'], [false, 'No']].forEach(([val, label]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn btn-sm yesno-btn ' + (vals[i] === val ? 'btn-primary' : 'btn-secondary');
      b.textContent = label;
      b.disabled = !!opts.locked;
      b.onclick = () => {
        vals[i] = val;
        redraw();
        opts.onChange([...vals]);
      };
      ctl.appendChild(b);
    });
    row.appendChild(ctl);
    if (opts.reveal && vals[i] !== q.correct[i]) {
      const hint = document.createElement('div');
      hint.className = 'yesno-hint';
      hint.textContent = `Correct answer: ${q.correct[i] ? 'Yes' : 'No'}`;
      row.appendChild(hint);
    }
    host.appendChild(row);
  });
}

// Static markup for the Answer Review screen. `chosen` is the saved answer or null.
function formatReviewHtml(q, chosen) {
  const given = Array.isArray(chosen) ? chosen : null;
  if (q.type === 'ordering') {
    const row = (idxs, title) => `<div><strong>${title}</strong><ol>${idxs.map((i) => `<li>${q.options[i]}</li>`).join('')}</ol></div>`;
    return (given ? row(given, 'Your order') : '<div><em>Not answered</em></div>') + row(q.correct, 'Correct order');
  }
  const rows = q.options.map((stmt, i) => {
    const mine = given ? given[i] : null;
    const ok = mine === q.correct[i];
    const mineLabel = mine === null ? 'no answer' : mine ? 'Yes' : 'No';
    return `<li style="color: var(${ok ? '--color-success' : '--color-danger'})">${stmt} — you: ${mineLabel}, correct: ${q.correct[i] ? 'Yes' : 'No'}</li>`;
  });
  return `<ul class="yesno-review">${rows.join('')}</ul>`;
}
