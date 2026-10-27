// Mock/Practice Exam engine. Behavior ported from the legacy app unchanged (cert/module
// filters, timer, single/multi/truefalse question types, per-question option shuffle, exam
// history + past-session review) with one addition: every revealed answer now also feeds the
// Leitner spaced-review store (Alpine.store('srs')), so practice exams and the dedicated
// Review Queue draw from the same scheduling data instead of being two disconnected systems.
const examState = {
  activeExam: null,
  activeExamInterval: null,
};

function initExamHub() {
  const container = document.getElementById('view-test');

  container.innerHTML = `
    <div class="exam-layout" id="exam-hub-stage">
      <h1>${Alpine.store('ui').certInfo.code} Test</h1>

      <div id="exam-filter-block"></div>

      <div id="exam-queue-stats" class="queue-stats"></div>

      <div class="exam-actions">
        <div id="exam-pool-counter" class="exam-pool-counter">Loading pools...</div>
        <div class="exam-actions-row exam-queue-row">
          <select id="exam-queue-select" aria-label="Questions from" onchange="updateExamPoolCount()">
            <option value="all">All questions</option>
            <option value="unseen">Not seen yet</option>
            <option value="wrong">Wrong queue</option>
          </select>
        </div>
        ${DATA.getOutline(currentCertId()) ? `
        <div class="mock-card">
          <div><b>Mock exam</b><span>50 questions · 100 min countdown · weighted by domain · answers shown at the end</span></div>
          <button class="btn btn-accent" onclick="startMockExam()">Start mock</button>
        </div>` : ''}
        <div class="exam-actions-row">
          <select id="exam-count-select" aria-label="Question count">
            <option value="10">10 questions</option>
            <option value="20" selected>20 questions</option>
            <option value="30">30 questions</option>
            <option value="50">50 questions</option>
            <option value="all">All available</option>
          </select>
          <button class="btn btn-primary" onclick="startPracticeExam()">Start</button>
        </div>
      </div>

      <div id="exam-history-card" class="exam-history">
        <div class="section-head">
          <h2>History <span class="section-meta" id="exam-stat-line"></span></h2>
          <button class="btn btn-danger btn-sm" onclick="clearExamHistory()">Clear</button>
        </div>
        <div id="exam-history-container" class="history-table-container"></div>
      </div>
    </div>
  `;

  renderExamFilters();
  updateExamPoolCount();
  renderExamHistory();
}

// Question filter. Certifications with a skills outline show the outline's domains with their
// topics (one level down) as checkboxes; ticking a topic includes every skill beneath it. The
// others keep a single module select. examFilterValue() returns 'all', a comma-separated list of
// outline node ids ('1.1,2.3') or a module key ('dp700_3').
function renderExamFilters() {
  const cert = currentCertId();
  const block = document.getElementById('exam-filter-block');
  const outline = DATA.getOutline(cert);

  if (!outline) {
    block.innerHTML = `<select id="exam-module-select" aria-label="Module"><option value="all">All modules</option></select>`;
    const sel = document.getElementById('exam-module-select');
    DATA.getQuestionModules(cert).forEach((m, i) => {
      const opt = document.createElement('option');
      opt.value = `${cert}_${i + 1}`;
      opt.textContent = m;
      sel.appendChild(opt);
    });
    sel.onchange = updateExamPoolCount;
    return;
  }

  // The picker is long, so it sits behind a button; the button says what is selected.
  block.innerHTML = `
    <details class="collapse-filter">
      <summary id="exam-filter-summary">Topics: everything</summary>
      <div id="exam-picker"></div>
    </details>`;
  const picker = document.getElementById('exam-picker');
  const summary = document.getElementById('exam-filter-summary');
  const pool = getExamQuestionsPool(cert);
  const inNode = (node) => pool.filter((q) => DATA.skillInNode(q.skill, node));
  const queue = Alpine.store('questionQueue');
  const progress = {
    unit: 'questions answered right (green) and wrong (red)',
    of(node) {
      const c = queue.counts(inNode(node).map((q) => q.id));
      return { total: c.total, good: c.right, bad: c.wrong, tip: `${c.right} right · ${c.wrong} wrong · ${c.unseen} not seen` };
    },
  };
  renderTopicPicker(picker, outline, (node) => inNode(node).length, 'Pick topics', () => {
    const n = pickedTopics(picker).length;
    summary.textContent = n ? `Topics: ${n} selected` : 'Topics: everything';
    updateExamPoolCount();
  }, progress);
}

function examFilterValue() {
  const moduleSel = document.getElementById('exam-module-select');
  if (moduleSel) return moduleSel.value || 'all';
  const ticked = pickedTopics(document.getElementById('exam-picker'));
  return ticked.length ? ticked.join(',') : 'all';
}

// Questions for a certification, each tagged with the skill it tests (when the cert has an outline).
function getExamQuestionsPool(cert) {
  const banks = { dp700: window.DP700_QUESTIONS, dp600: window.DP600_QUESTIONS, dp300: window.DP300_QUESTIONS };
  const outline = DATA.getOutline(cert);
  const code = DATA.getCert(cert).code;
  const tagged = (banks[cert] || []).map((q) => ({ ...q, cert: code, skill: outline ? outline.skillOfQuestion[q.id] : undefined }));
  if (!outline) return tagged;
  // Only questions on skills in the current exam outline are offered.
  const offOutline = outline.domains.filter((d) => d.inOutline === false).map((d) => d.id);
  return tagged.filter((q) => !offOutline.some((id) => DATA.skillInNode(q.skill, id)));
}

function filterExamPool(pool, filter) {
  if (filter === 'all') return pool;
  if (filter.includes('_')) {
    const [, modNum] = filter.split('_');
    return pool.filter((q) => q.module === parseInt(modNum));
  }
  const nodes = filter.split(',');
  return pool.filter((q) => nodes.some((n) => DATA.skillInNode(q.skill, n)));
}

// Narrows a pool to one of the progress queues: 'all', 'unseen' or 'wrong'.
function filterByQueue(pool, queue) {
  if (queue === 'all') return pool;
  const store = Alpine.store('questionQueue');
  return pool.filter((q) => store.state(q.id) === queue);
}

function examQueueValue() {
  const sel = document.getElementById('exam-queue-select');
  return sel ? sel.value : 'all';
}

function updateExamPoolCount() {
  const base = filterExamPool(getExamQuestionsPool(currentCertId()), examFilterValue());
  const pool = filterByQueue(base, examQueueValue());
  document.getElementById('exam-pool-counter').textContent = `${pool.length} question${pool.length === 1 ? '' : 's'} in this selection`;

  const c = Alpine.store('questionQueue').counts(base.map((q) => q.id));
  const wrongOpt = document.querySelector('#exam-queue-select option[value="wrong"]');
  if (wrongOpt) wrongOpt.textContent = `Wrong queue (${c.wrong})`;
  const unseenOpt = document.querySelector('#exam-queue-select option[value="unseen"]');
  if (unseenOpt) unseenOpt.textContent = `Not seen yet (${c.unseen})`;
  const stats = document.getElementById('exam-queue-stats');
  if (stats) {
    stats.innerHTML = `
      <div class="queue-stat"><b>${c.total - c.unseen}</b><span>seen of ${c.total}</span></div>
      <div class="queue-stat is-right"><b>${c.right}</b><span>right</span></div>
      <div class="queue-stat is-wrong"><b>${c.wrong}</b><span>wrong</span></div>
      <button class="btn btn-sm queue-reset" onclick="resetQuestionProgress()">Reset</button>`;
  }
}

function resetQuestionProgress() {
  if (!confirm('Reset your seen, right and wrong progress for this selection?')) return;
  const base = filterExamPool(getExamQuestionsPool(currentCertId()), examFilterValue());
  Alpine.store('questionQueue').reset(base.map((q) => q.id));
  updateExamPoolCount();
}

function shuffleQuestionOptions(q) {
  const order = q.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const oldToNew = new Array(order.length);
  order.forEach((oldIdx, newIdx) => { oldToNew[oldIdx] = newIdx; });

  if (isFormatQuestion(q)) return shuffleFormatQuestion(q, order, oldToNew);

  const newOptions = order.map((oldIdx) => q.options[oldIdx]);
  const newCorrect = q.type === 'multi'
    ? q.correct.map((oldIdx) => oldToNew[oldIdx])
    : oldToNew[q.correct];

  return { ...q, options: newOptions, correct: newCorrect };
}

function isAnswerCorrect(q, ans) {
  if (ans === null || ans === undefined) return false;
  if (isFormatQuestion(q)) return isFormatCorrect(q, ans);
  if (q.type === 'multi') {
    const correctKey = [...q.correct].sort((a, b) => a - b).join(',');
    const ansKey = [...ans].sort((a, b) => a - b).join(',');
    return correctKey === ansKey;
  }
  return ans === q.correct;
}

function startPracticeExam() {
  const cert = currentCertId();
  const moduleVal = examFilterValue();
  const countSelect = document.getElementById('exam-count-select').value;

  const pool = filterByQueue(filterExamPool(getExamQuestionsPool(cert), moduleVal), examQueueValue());

  if (pool.length === 0) {
    alert(examQueueValue() === 'wrong' ? 'The wrong queue is empty for this selection.' : 'No questions available in selected pool.');
    return;
  }

  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const count = countSelect === 'all' ? pool.length : Math.min(parseInt(countSelect), pool.length);
  const questions = pool.slice(0, count).map(shuffleQuestionOptions);

  examState.activeExam = {
    questions,
    currentIndex: 0,
    answers: new Array(count).fill(null),
    startTime: Date.now(),
    elapsedSeconds: 0,
    certFilter: cert,
    moduleFilter: moduleVal,
  };

  if (examState.activeExamInterval) clearInterval(examState.activeExamInterval);
  examState.activeExamInterval = setInterval(updateExamTimer, 1000);
  document.body.classList.add('exam-active');

  renderActiveQuestion();
}

function updateExamTimer() {
  if (!examState.activeExam) return;
  examState.activeExam.elapsedSeconds = Math.floor((Date.now() - examState.activeExam.startTime) / 1000);

  const limit = examState.activeExam.limitSeconds;
  const shown = limit ? Math.max(0, limit - examState.activeExam.elapsedSeconds) : examState.activeExam.elapsedSeconds;
  const m = Math.floor(shown / 60);
  const s = shown % 60;
  if (limit && shown === 0) { finishMockExam(true); return; }

  const timerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const timerBox = document.getElementById('active-exam-timer');
  if (timerBox) timerBox.textContent = timerText;
}

function renderActiveQuestion() {
  const exam = examState.activeExam;
  const q = exam.questions[exam.currentIndex];
  const isMulti = q.type === 'multi';

  const stage = document.getElementById('view-test');

  const typeBadge = isMulti
    ? ' • <span class="q-type-badge q-type-multi">Select all that apply</span>'
    : q.type === 'truefalse'
      ? ' • <span class="q-type-badge q-type-tf">True / False</span>'
      : formatTypeBadge(q);
  const isFormat = isFormatQuestion(q);

  stage.innerHTML = `
    <div class="exam-layout question-card">
      <div class="exam-header">
        <button class="exam-exit" onclick="exitExam()" aria-label="Exit test">✕</button>
        <div class="exam-count">${exam.currentIndex + 1} / ${exam.questions.length}</div>
        <div class="timer-box"><span id="active-exam-timer">00:00</span></div>
      </div>
      <div class="exam-progress"><div class="exam-progress-fill" style="width: ${(exam.currentIndex / exam.questions.length) * 100}%"></div></div>

      <div class="question-body">
        <div class="question-meta">${q.cert} • ${questionTopicLabel(q)}${typeBadge}</div>
        ${scenarioHtml(q)}
        <div class="question-text">${q.text}</div>

        <div class="options-list" id="active-options-list"></div>

        <div class="explanation-box" id="active-explanation-box" style="display:none;"></div>
      </div>

      <div class="exam-nav">
        <button class="btn btn-secondary" id="btn-skip" onclick="skipQuestion()">Skip</button>
        ${isMulti ? '<button class="btn btn-accent" id="btn-multi-submit" style="display:none;" onclick="submitMultiAnswer()">Submit Answer</button>' : ''}
        ${isFormat ? '<button class="btn btn-accent" id="btn-fmt-submit" style="display:none;" onclick="submitFormatAnswer()">Submit Answer</button>' : ''}
        <button class="btn btn-primary" id="btn-exam-next" style="display:none;"></button>
      </div>
    </div>
  `;

  updateExamTimer();

  const optList = document.getElementById('active-options-list');
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  if (isMulti) exam.pendingMultiSelect = [];

  if (isFormat) {
    exam.pendingFormat = null;
    const done = exam.answers[exam.currentIndex];
    renderFormatWidget(q, optList, {
      answer: done,
      locked: done !== null,
      onChange: (ans) => {
        exam.pendingFormat = ans;
        document.getElementById('btn-fmt-submit').style.display = isFormatAnswered(q, ans) ? 'inline-flex' : 'none';
      },
    });
    if (done !== null) revealQuestionAnswer(done, false);
    else if (q.type === 'ordering') {
      exam.pendingFormat = q.options.map((_, i) => i);
      document.getElementById('btn-fmt-submit').style.display = 'inline-flex';
    }
    return;
  }

  q.options.forEach((opt, idx) => {
    const item = document.createElement('div');
    item.className = 'option-item';
    item.innerHTML = `
      <span class="option-badge">${letters[idx]}</span>
      <span>${opt}</span>
    `;
    item.onclick = () => selectExamOption(idx);
    optList.appendChild(item);
  });

  const savedAns = exam.answers[exam.currentIndex];
  if (savedAns !== null) {
    if (isMulti) exam.pendingMultiSelect = Array.isArray(savedAns) ? [...savedAns] : [savedAns];
    revealQuestionAnswer(savedAns, false);
  }
}

function selectExamOption(optionIdx) {
  const exam = examState.activeExam;
  if (exam.answers[exam.currentIndex] !== null) return;

  const q = exam.questions[exam.currentIndex];

  if (q.type === 'multi') {
    if (!exam.pendingMultiSelect) exam.pendingMultiSelect = [];
    const pending = exam.pendingMultiSelect;
    const i = pending.indexOf(optionIdx);
    if (i === -1) pending.push(optionIdx); else pending.splice(i, 1);

    document.querySelectorAll('.option-item').forEach((item, idx) => {
      item.classList.toggle('selected', pending.includes(idx));
    });

    const submitBtn = document.getElementById('btn-multi-submit');
    if (submitBtn) submitBtn.style.display = pending.length > 0 ? 'inline-flex' : 'none';
  } else {
    exam.answers[exam.currentIndex] = optionIdx;
    revealQuestionAnswer(optionIdx, true);
  }
}

function submitFormatAnswer() {
  const exam = examState.activeExam;
  const q = exam.questions[exam.currentIndex];
  const ans = exam.pendingFormat;
  if (!isFormatAnswered(q, ans)) return;
  exam.answers[exam.currentIndex] = ans;
  exam.pendingFormat = null;
  const host = document.getElementById('active-options-list');
  renderFormatWidget(q, host, { answer: ans, locked: true, reveal: true });
  revealQuestionAnswer(ans, true);
}

function submitMultiAnswer() {
  const exam = examState.activeExam;
  const pending = [...(exam.pendingMultiSelect || [])].sort((a, b) => a - b);
  if (pending.length === 0) return;
  exam.answers[exam.currentIndex] = pending;
  exam.pendingMultiSelect = null;
  revealQuestionAnswer(pending, true);
}

// recordToSrs is false when re-rendering an already-answered question (e.g. navigating back),
// so an answer is only scored into the spaced-review schedule once, at the moment it's made.
function revealQuestionAnswer(selectedIdx, recordToSrs) {
  const exam = examState.activeExam;
  const q = exam.questions[exam.currentIndex];
  const items = document.querySelectorAll('.option-item');
  const nextBtn = document.getElementById('btn-exam-next');
  const skipBtn = document.getElementById('btn-skip');
  const submitBtn = document.getElementById('btn-multi-submit') || document.getElementById('btn-fmt-submit');

  const isMulti = q.type === 'multi';
  const isFormat = isFormatQuestion(q);
  const correctSet = isMulti ? new Set(q.correct) : null;
  const selectedSet = isMulti ? new Set(Array.isArray(selectedIdx) ? selectedIdx : [selectedIdx]) : null;

  if (isFormat && !recordToSrs) {
    // Re-visiting an answered question: show the locked, marked widget.
    renderFormatWidget(q, document.getElementById('active-options-list'), { answer: selectedIdx, locked: true, reveal: true });
  }

  (isFormat ? [] : items).forEach((item, idx) => {
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
    const expBox = document.getElementById('active-explanation-box');
    expBox.innerHTML = `<strong>Explanation:</strong><br>${q.explanation}`;
    expBox.style.display = 'block';
  }

  if (skipBtn) skipBtn.style.display = 'none';
  if (submitBtn) submitBtn.style.display = 'none';
  nextBtn.style.display = 'inline-flex';

  const isLast = exam.currentIndex === exam.questions.length - 1;
  nextBtn.textContent = isLast ? 'Finish Exam' : 'Next Question →';
  nextBtn.onclick = isLast ? finishPracticeExam : nextExamQuestion;

  if (recordToSrs && q.id) {
    Alpine.store('questionQueue').record(q.id, isAnswerCorrect(q, selectedIdx));
    Alpine.store('srs').record(q.id, isAnswerCorrect(q, selectedIdx), q.cert.toLowerCase().replace('-', ''));
  }
}

function skipQuestion() {
  const exam = examState.activeExam;
  if (exam.currentIndex < exam.questions.length - 1) {
    exam.currentIndex++;
    renderActiveQuestion();
  } else {
    finishPracticeExam();
  }
}

function nextExamQuestion() {
  const exam = examState.activeExam;
  if (exam.currentIndex < exam.questions.length - 1) {
    exam.currentIndex++;
    renderActiveQuestion();
  }
}

function exitExam() {
  if (!confirm('Leave this test? It will not be saved to history, but your answers still count toward your progress.')) return;
  if (examState.activeExamInterval) clearInterval(examState.activeExamInterval);
  examState.activeExamInterval = null;
  examState.activeExam = null;
  document.body.classList.remove('exam-active');
  initExamHub();
}

function finishPracticeExam() {
  if (examState.activeExamInterval) clearInterval(examState.activeExamInterval);
  examState.activeExamInterval = null;
  document.body.classList.remove('exam-active');

  const exam = examState.activeExam;
  let correct = 0, wrong = 0, skipped = 0;

  exam.questions.forEach((q, idx) => {
    const ans = exam.answers[idx];
    if (ans === null) skipped++;
    else if (isAnswerCorrect(q, ans)) correct++;
    else wrong++;
  });

  const pct = exam.questions.length > 0 ? Math.round((correct / exam.questions.length) * 100) : 0;
  const pass = pct >= 70;

  const session = {
    id: Date.now(),
    date: new Date().toISOString(),
    cert: exam.certFilter.toUpperCase(),
    module: exam.moduleFilter,
    total: exam.questions.length,
    correct,
    wrong,
    skipped,
    pct,
    pass,
    mode: exam.mode || 'practice',
    elapsed: exam.elapsedSeconds,
    answers: exam.answers,
    questions: exam.questions,
  };

  Alpine.store('examHistory').add(session);

  renderExamResults(session);
}

// What to show next to a question: its skill when the cert has an outline, else its module.
function questionTopicLabel(q) {
  const outline = DATA.getOutline(String(q.cert).toLowerCase().replace('-', ''));
  return outline && q.skill ? outline.titles[q.skill] : `Module ${q.module}`;
}

// Score per outline topic for the results screen: [{ title, correct, total }], outline order.
function scoreByTopic(session) {
  const outline = DATA.getOutline(String(session.cert).toLowerCase().replace('-', ''));
  if (!outline) return [];
  const rows = {};
  session.questions.forEach((q, i) => {
    if (!q.skill) return;
    const topicId = q.skill.split('.').slice(0, 2).join('.');
    const row = rows[topicId] || (rows[topicId] = { title: outline.titles[topicId], correct: 0, total: 0 });
    row.total++;
    if (isAnswerCorrect(q, session.answers[i])) row.correct++;
  });
  return Object.keys(rows).sort().map((id) => rows[id]);
}

function renderTopicScores(session) {
  const rows = scoreByTopic(session);
  if (!rows.length) return '';
  return `
    <div class="glass-panel" style="margin-top: 24px;">
      <h2 style="margin-bottom: 16px;">Score by topic</h2>
      ${rows.map((r) => {
        const pct = Math.round((r.correct / r.total) * 100);
        return `
        <div style="margin-bottom: 14px;">
          <div class="cert-progress"><span>${r.title}</span><span>${r.correct} / ${r.total} (${pct}%)</span></div>
          <div class="progress-bar-container"><div class="progress-bar-fill" style="width: ${pct}%"></div></div>
        </div>`;
      }).join('')}
    </div>`;
}

function renderExamResults(session) {
  const stage = document.getElementById('view-test');

  const m = Math.floor(session.elapsed / 60);
  const s = session.elapsed % 60;
  const timeStr = `${m}:${String(s).padStart(2, '0')}`;

  stage.innerHTML = `
    <div class="exam-layout">
      <h1>${session.mode === 'mock' ? 'Mock Exam Completed' : 'Practice Exam Completed'}</h1>
      <p class="subtitle">Review your score and details below.</p>

      <div class="glass-panel results-score-panel">
        <div class="score-circle-wrapper">
          <div class="score-circle ${session.pass ? 'score-pass' : 'score-fail'}">
            ${session.pct}%
          </div>
        </div>

        <h2 style="margin-bottom: 8px;">${session.pass ? 'Congratulations! You Passed' : 'Study Required'}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">${session.mode === 'mock'
          ? `Approx. scaled score ${session.pct * 10} / 1000 (pass mark 700). Microsoft's real scaling is not published, so treat this as a guide.`
          : 'Passing score is 70%'}</p>

        <div class="results-stats-row">
          <div class="stat-card">
            <div class="stat-val" style="color: var(--color-success);">${session.correct}</div>
            <div class="stat-lbl">Correct</div>
          </div>
          <div class="stat-card">
            <div class="stat-val" style="color: var(--color-danger);">${session.wrong}</div>
            <div class="stat-lbl">Wrong</div>
          </div>
          <div class="stat-card">
            <div class="stat-val" style="color: var(--color-warning);">${session.skipped}</div>
            <div class="stat-lbl">Skipped</div>
          </div>
        </div>

        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="initExamHub()">Done</button>
          <button class="btn btn-secondary" onclick="reviewExamAnswers(${session.id})">Review Answers</button>
        </div>
      </div>
      ${renderTopicScores(session)}
    </div>
  `;
}

function reviewExamAnswers(sessionId) {
  const session = Alpine.store('examHistory').sessions.find((s) => s.id === sessionId);
  if (!session) return;

  const stage = document.getElementById('view-test');

  let html = `
    <div class="exam-layout">
      <h1>Answer Review</h1>
      <p class="subtitle">Exam session: ${session.cert} • Completed ${new Date(session.date).toLocaleDateString()}</p>
      <button class="btn btn-secondary" onclick="initExamHub()" style="margin-bottom: 24px;">← Exit Review</button>
  `;

  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  session.questions.forEach((q, idx) => {
    const chosen = session.answers[idx];
    const isSkipped = chosen === null;
    let isCorrect;
    if (isSkipped) isCorrect = false;
    else isCorrect = isAnswerCorrect(q, chosen);

    let border = 'var(--color-success)';
    let statusText = '✓ Correct';
    if (isSkipped) {
      border = 'var(--text-muted)';
      statusText = '⊘ Skipped';
    } else if (!isCorrect) {
      border = 'var(--color-danger)';
      statusText = '✗ Incorrect';
    }

    html += `
      <div class="glass-panel" style="border-left: 4px solid ${border}; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px; font-weight: 700; text-transform: uppercase;">
          <span>Question ${idx + 1}</span>
          <span style="color: ${border}">${statusText}</span>
        </div>
        ${scenarioHtml(q)}
        <div style="font-weight: 600; font-size: 1.05rem; margin-bottom: 20px; line-height: 1.5;">${q.text}</div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
    `;

    if (isFormatQuestion(q)) {
      html += `${formatReviewHtml(q, chosen)}</div>`;
      if (q.explanation) {
        html += `<div style="margin-top: 16px; border-left: 3px solid var(--accent-indigo); background: rgba(99,102,241,0.05); padding: 12px 16px; font-size: 0.85rem; border-radius: 0 8px 8px 0; line-height: 1.6; color: var(--text-secondary);"><strong>Explanation:</strong><br>${q.explanation}</div>`;
      }
      html += `</div>`;
      return;
    }

    const correctSet = q.type === 'multi' ? new Set(q.correct) : null;
    const chosenSet = (q.type === 'multi' && Array.isArray(chosen)) ? new Set(chosen) : null;

    q.options.forEach((opt, oIdx) => {
      let optStyle = 'background: rgba(15,23,42,0.2); border: 1px solid var(--surface-border);';
      let badgeBg = 'var(--surface-border)';

      const isOptCorrect = q.type === 'multi' ? correctSet.has(oIdx) : oIdx === q.correct;
      const isOptChosen = q.type === 'multi' ? (chosenSet ? chosenSet.has(oIdx) : false) : oIdx === chosen;

      if (isOptCorrect) {
        optStyle = 'background: rgba(16, 185, 129, 0.08); border: 1px solid var(--color-success); color: var(--color-success); font-weight: bold;';
        badgeBg = 'var(--color-success)';
      } else if (isOptChosen && !isOptCorrect) {
        optStyle = 'background: rgba(239, 68, 68, 0.08); border: 1px solid var(--color-danger); color: var(--color-danger); text-decoration: line-through;';
        badgeBg = 'var(--color-danger)';
      }

      html += `
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 12px; font-size: 0.9rem; ${optStyle}">
          <span style="width: 24px; height: 24px; border-radius: 50%; background: ${badgeBg}; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem;">${letters[oIdx]}</span>
          <span>${opt}</span>
        </div>
      `;
    });

    html += `</div>`;

    if (q.explanation) {
      html += `
        <div style="margin-top: 16px; border-left: 3px solid var(--accent-indigo); background: rgba(99,102,241,0.05); padding: 12px 16px; font-size: 0.85rem; border-radius: 0 8px 8px 0; line-height: 1.6; color: var(--text-secondary);">
          <strong>Explanation:</strong><br>${q.explanation}
        </div>
      `;
    }

    html += `</div>`;
  });

  html += `<button class="btn btn-secondary" onclick="initExamHub()" style="width: 100%; margin-top: 12px;">← Back to Hub</button></div>`;
  stage.innerHTML = html;
}

function renderExamHistory() {
  const container = document.getElementById('exam-history-container');
  const h = Alpine.store('examHistory').forCert(currentCertId());

  const statLine = document.getElementById('exam-stat-line');
  if (statLine) statLine.textContent = h.length ? `${h.length} attempts · ${Alpine.store('examHistory').passRate(currentCertId())}% passed` : '';

  if (h.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 30px 0;">No exam logs found. Ready for your first test?</div>`;
    return;
  }

  let html = `
    <table class="history-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Exam</th>
          <th>Score</th>
          <th>Result</th>
          <th>Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
  `;

  h.forEach((session) => {
    const date = new Date(session.date).toLocaleDateString() + ' ' + new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const m = Math.floor(session.elapsed / 60);
    const s = session.elapsed % 60;
    const timeStr = `${m}:${String(s).padStart(2, '0')}`;

    html += `
      <tr>
        <td>${date}</td>
        <td style="font-weight: 600;">${session.cert}${session.mode === 'mock' ? ' · Mock' : ''}</td>
        <td style="font-weight: bold;">${session.pct}% <span style="font-size:0.75rem; font-weight:normal; color: var(--text-muted);">(${session.correct}/${session.total})</span></td>
        <td><span class="badge-result ${session.pass ? 'badge-pass' : 'badge-fail'}">${session.pass ? 'PASS' : 'FAIL'}</span></td>
        <td style="font-family: var(--font-mono);">${timeStr}</td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="reviewExamAnswers(${session.id})" style="padding: 4px 10px; font-size: 0.75rem;">Review</button>
        </td>
      </tr>
    `;
  });

  html += `</tbody></table>`;
  container.innerHTML = html;
}

function clearExamHistory() {
  if (confirm('Clear all practice exam scores for this certification?')) {
    Alpine.store('examHistory').clear(currentCertId());
    renderExamHistory();
  }
}
