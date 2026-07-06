// New: Leitner spaced-review queue. Pulls every due question across the selected cert (or all
// certs, interleaved) from the shared SRS store — the same store practice exams write into via
// js/views/exam.js's revealQuestionAnswer — so this is genuinely "spaced re-serving," not a
// separate bolt-on quiz mode with its own disconnected history.
const reviewState = {
  queue: [],
  currentIndex: 0,
  certFilter: 'all',
  sessionStats: { correct: 0, wrong: 0 },
};

function initReviewQueue() {
  const container = document.getElementById('view-review');
  const catalog = DATA.buildQuestionCatalog();

  container.innerHTML = `
    <h1>Spaced Review Queue</h1>
    <p class="subtitle">Questions you've gotten wrong (or are due for reinforcement) resurface here on a schedule instead of all at once.</p>

    <div class="glass-panel" style="margin-bottom: 24px;">
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;">
        <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 160px;">
          <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-secondary); font-weight: 700;">Certification</label>
          <select id="review-cert-filter">
            <option value="all">All Certs (Interleaved)</option>
            <option value="dp300">DP-300 Azure DB Admin</option>
            <option value="dp600">DP-600 Fabric Analytics</option>
            <option value="dp700">DP-700 Fabric Engineer</option>
          </select>
        </div>
        <button class="btn btn-primary" onclick="startReviewSession()" style="height: 42px; min-width: 150px;">Start Review</button>
      </div>
      <div id="review-due-summary" style="margin-top: 16px; font-size: 0.85rem; color: var(--text-muted); font-weight: 600;"></div>
    </div>

    <div id="review-stage"></div>
  `;

  const certSelect = document.getElementById('review-cert-filter');
  certSelect.onchange = () => {
    reviewState.certFilter = certSelect.value;
    updateReviewSummary(catalog);
  };

  updateReviewSummary(catalog);
}

function updateReviewSummary(catalog) {
  const due = Alpine.store('srs').dueQuestions(catalog, reviewState.certFilter);
  const upcoming = Alpine.store('srs').upcomingCount(catalog, 3, reviewState.certFilter);

  const summary = document.getElementById('review-due-summary');
  if (due.length === 0) {
    summary.innerHTML = upcoming > 0
      ? `Nothing due right now — nice work. ${upcoming} more coming due in the next 3 days.`
      : `Nothing due right now. Answer some practice questions to start building your review schedule.`;
  } else {
    summary.textContent = `${due.length} question${due.length === 1 ? '' : 's'} due for review.`;
  }
}

function startReviewSession() {
  const catalog = DATA.buildQuestionCatalog();
  let due = Alpine.store('srs').dueQuestions(catalog, reviewState.certFilter);

  if (due.length === 0) {
    alert('Nothing is due for review right now — check back later or answer more practice questions.');
    return;
  }

  // Interleave across certs/skill-areas rather than blocking by topic.
  for (let i = due.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [due[i], due[j]] = [due[j], due[i]];
  }

  reviewState.queue = due.map(shuffleQuestionOptions);
  reviewState.currentIndex = 0;
  reviewState.sessionStats = { correct: 0, wrong: 0 };

  renderReviewQuestion();
}

function renderReviewQuestion() {
  const stage = document.getElementById('review-stage');
  const q = reviewState.queue[reviewState.currentIndex];
  const isMulti = q.type === 'multi';

  const typeBadge = isMulti
    ? ' • <span class="q-type-badge q-type-multi">Select all that apply</span>'
    : q.type === 'truefalse'
      ? ' • <span class="q-type-badge q-type-tf">True / False</span>'
      : '';

  stage.innerHTML = `
    <div class="exam-layout question-card">
      <div class="exam-header">
        <div style="font-weight: 700; font-size: 1.1rem; color: var(--text-secondary);">
          Review ${reviewState.currentIndex + 1} of ${reviewState.queue.length}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-muted);">✓ ${reviewState.sessionStats.correct} &nbsp; ✗ ${reviewState.sessionStats.wrong}</div>
      </div>

      <div class="glass-panel">
        <div class="question-meta">${q.cert.toUpperCase()} • Skill/Module ${q.module}${typeBadge}</div>
        <div class="question-text">${q.text}</div>
        <div class="options-list" id="review-options-list"></div>
        <div class="explanation-box" id="review-explanation-box" style="display:none;"></div>
      </div>

      <div class="exam-nav">
        ${isMulti ? '<button class="btn btn-accent" id="btn-review-multi-submit" style="display:none;" onclick="submitReviewMultiAnswer()">Submit Answer</button>' : ''}
        <button class="btn btn-primary" id="btn-review-next" style="display:none;"></button>
      </div>
    </div>
  `;

  const optList = document.getElementById('review-options-list');
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  if (isMulti) reviewState.pendingMultiSelect = [];

  q.options.forEach((opt, idx) => {
    const item = document.createElement('div');
    item.className = 'option-item';
    item.innerHTML = `<span class="option-badge">${letters[idx]}</span><span>${opt}</span>`;
    item.onclick = () => selectReviewOption(idx);
    optList.appendChild(item);
  });
}

function selectReviewOption(optionIdx) {
  const q = reviewState.queue[reviewState.currentIndex];

  if (q.type === 'multi') {
    const pending = reviewState.pendingMultiSelect;
    const i = pending.indexOf(optionIdx);
    if (i === -1) pending.push(optionIdx); else pending.splice(i, 1);

    document.querySelectorAll('#review-options-list .option-item').forEach((item, idx) => {
      item.classList.toggle('selected', pending.includes(idx));
    });

    const submitBtn = document.getElementById('btn-review-multi-submit');
    if (submitBtn) submitBtn.style.display = pending.length > 0 ? 'inline-flex' : 'none';
  } else {
    revealReviewAnswer(optionIdx);
  }
}

function submitReviewMultiAnswer() {
  const pending = [...(reviewState.pendingMultiSelect || [])].sort((a, b) => a - b);
  if (pending.length === 0) return;
  revealReviewAnswer(pending);
}

function revealReviewAnswer(selectedIdx) {
  const q = reviewState.queue[reviewState.currentIndex];
  const items = document.querySelectorAll('#review-options-list .option-item');
  const nextBtn = document.getElementById('btn-review-next');
  const submitBtn = document.getElementById('btn-review-multi-submit');

  const isMulti = q.type === 'multi';
  const correctSet = isMulti ? new Set(q.correct) : null;
  const selectedSet = isMulti ? new Set(Array.isArray(selectedIdx) ? selectedIdx : [selectedIdx]) : null;

  items.forEach((item, idx) => {
    item.classList.add('disabled');
    if (isMulti) {
      if (correctSet.has(idx)) item.classList.add('correct');
      if (selectedSet.has(idx) && !correctSet.has(idx)) item.classList.add('wrong');
      if (selectedSet.has(idx)) item.classList.add('selected');
    } else {
      if (idx === q.correct) item.classList.add('correct');
      if (idx === selectedIdx && idx !== q.correct) item.classList.add('wrong');
      if (idx === selectedIdx) item.classList.add('selected');
    }
  });

  if (q.explanation) {
    const expBox = document.getElementById('review-explanation-box');
    expBox.innerHTML = `<strong>Explanation:</strong><br>${q.explanation}`;
    expBox.style.display = 'block';
  }

  if (submitBtn) submitBtn.style.display = 'none';
  nextBtn.style.display = 'inline-flex';

  const isLast = reviewState.currentIndex === reviewState.queue.length - 1;
  nextBtn.textContent = isLast ? 'Finish Review' : 'Next →';
  nextBtn.onclick = isLast ? finishReviewSession : nextReviewQuestion;

  const wasCorrect = isAnswerCorrect(q, selectedIdx);
  if (wasCorrect) reviewState.sessionStats.correct++; else reviewState.sessionStats.wrong++;
  Alpine.store('srs').record(q.id, wasCorrect, q.cert);
}

function nextReviewQuestion() {
  if (reviewState.currentIndex < reviewState.queue.length - 1) {
    reviewState.currentIndex++;
    renderReviewQuestion();
  }
}

function finishReviewSession() {
  const stage = document.getElementById('review-stage');
  const { correct, wrong } = reviewState.sessionStats;
  const total = correct + wrong;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  stage.innerHTML = `
    <div class="glass-panel results-score-panel">
      <div class="score-circle-wrapper">
        <div class="score-circle ${pct >= 70 ? 'score-pass' : 'score-fail'}">${pct}%</div>
      </div>
      <h2 style="margin-bottom: 8px;">Review Session Complete</h2>
      <p style="color: var(--text-secondary); margin-bottom: 24px;">${correct} correct, ${wrong} wrong. Missed questions are back at box 1 and will resurface tomorrow.</p>
      <button class="btn btn-primary" onclick="initReviewQueue()">Back to Review Hub</button>
    </div>
  `;

  renderDashboard();
}
