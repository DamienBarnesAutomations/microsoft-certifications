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
      <h1>Mock Practice Exams</h1>
      <p class="subtitle">Simulate real-world exam conditions with explanations and timer tracking.</p>

      <div class="exam-config-grid" id="exam-dashboard-columns">
        <div class="glass-panel">
          <h2>Configure Practice Exam</h2>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div style="display: flex; gap: 12px; flex-wrap: wrap;">
              <div style="flex: 1; min-width: 140px; display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-secondary); font-weight: 700;">Exam Module</label>
                <select id="exam-cert-select">
                  <option value="dp700">DP-700 Fabric Data Engineer</option>
                  <option value="dp600">DP-600 Fabric Analytics Engineer</option>
                  <option value="dp300">DP-300 Azure DB Administrator</option>
                  <option value="both">Mixed Fabric (600 + 700)</option>
                </select>
              </div>
              <div style="flex: 1; min-width: 140px; display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-secondary); font-weight: 700;">Sub-Module</label>
                <select id="exam-module-select">
                  <option value="all">All Modules</option>
                </select>
              </div>
            </div>

            <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;">
              <div style="flex: 1; min-width: 140px; display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-secondary); font-weight: 700;">Question Count</label>
                <select id="exam-count-select">
                  <option value="10">10 Questions</option>
                  <option value="20" selected>20 Questions</option>
                  <option value="30">30 Questions</option>
                  <option value="50">50 Questions</option>
                  <option value="all">All Available</option>
                </select>
              </div>
              <button class="btn btn-primary" onclick="startPracticeExam()" style="height: 42px; min-width: 150px;">Start Test</button>
            </div>

            <div id="exam-pool-counter" style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">Loading pools...</div>
          </div>
        </div>

        <div class="glass-panel">
          <h2>Stats Overview</h2>
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div class="stat-card">
              <div class="stat-val" id="exam-stat-total">0</div>
              <div class="stat-lbl">Attempts</div>
            </div>
            <div class="stat-card">
              <div class="stat-val" id="exam-stat-pass-rate">0%</div>
              <div class="stat-lbl">Pass Rate</div>
            </div>
          </div>
        </div>
      </div>

      <div class="glass-panel" style="margin-top: 24px;" id="exam-history-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 12px;">
          <h2 style="margin:0;">Test History</h2>
          <button class="btn btn-danger btn-sm" onclick="clearExamHistory()">Clear Logs</button>
        </div>
        <div id="exam-history-container" class="history-table-container"></div>
      </div>
    </div>
  `;

  const certSelector = document.getElementById('exam-cert-select');
  const modSelector = document.getElementById('exam-module-select');

  certSelector.onchange = () => {
    updateExamModulesDropdown();
    updateExamPoolCount();
  };
  modSelector.onchange = updateExamPoolCount;

  updateExamModulesDropdown();
  updateExamPoolCount();
  renderExamHistory();
}

function updateExamModulesDropdown() {
  const cert = document.getElementById('exam-cert-select').value;
  const selector = document.getElementById('exam-module-select');
  selector.innerHTML = '<option value="all">All Modules</option>';

  const modules = DATA.getQuestionModules(cert);

  modules.forEach((m, i) => {
    const opt = document.createElement('option');
    opt.value = `${cert}_${i + 1}`;
    opt.textContent = m;
    selector.appendChild(opt);
  });
}

function getExamQuestionsPool(cert) {
  if (cert === 'dp700' && window.DP700_QUESTIONS) return window.DP700_QUESTIONS.map((q) => ({ ...q, cert: 'DP-700' }));
  if (cert === 'dp600' && window.DP600_QUESTIONS) return window.DP600_QUESTIONS.map((q) => ({ ...q, cert: 'DP-600' }));
  if (cert === 'dp300' && window.DP300_QUESTIONS) return window.DP300_QUESTIONS.map((q) => ({ ...q, cert: 'DP-300' }));
  if (cert === 'both') {
    const pool600 = (window.DP600_QUESTIONS || []).map((q) => ({ ...q, cert: 'DP-600' }));
    const pool700 = (window.DP700_QUESTIONS || []).map((q) => ({ ...q, cert: 'DP-700' }));
    return [...pool600, ...pool700];
  }
  return [];
}

function updateExamPoolCount() {
  const cert = document.getElementById('exam-cert-select').value;
  const moduleVal = document.getElementById('exam-module-select').value;

  let pool = getExamQuestionsPool(cert);

  if (moduleVal !== 'all') {
    const [, modNum] = moduleVal.split('_');
    pool = pool.filter((q) => q.module === parseInt(modNum));
  }

  document.getElementById('exam-pool-counter').textContent = `${pool.length} practice questions currently available in this selection.`;
}

function shuffleQuestionOptions(q) {
  const order = q.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const oldToNew = new Array(order.length);
  order.forEach((oldIdx, newIdx) => { oldToNew[oldIdx] = newIdx; });

  const newOptions = order.map((oldIdx) => q.options[oldIdx]);
  const newCorrect = q.type === 'multi'
    ? q.correct.map((oldIdx) => oldToNew[oldIdx])
    : oldToNew[q.correct];

  return { ...q, options: newOptions, correct: newCorrect };
}

function isAnswerCorrect(q, ans) {
  if (ans === null || ans === undefined) return false;
  if (q.type === 'multi') {
    const correctKey = [...q.correct].sort((a, b) => a - b).join(',');
    const ansKey = [...ans].sort((a, b) => a - b).join(',');
    return correctKey === ansKey;
  }
  return ans === q.correct;
}

function startPracticeExam() {
  const cert = document.getElementById('exam-cert-select').value;
  const moduleVal = document.getElementById('exam-module-select').value;
  const countSelect = document.getElementById('exam-count-select').value;

  let pool = getExamQuestionsPool(cert);

  if (moduleVal !== 'all') {
    const [, modNum] = moduleVal.split('_');
    pool = pool.filter((q) => q.module === parseInt(modNum));
  }

  if (pool.length === 0) {
    alert('No questions available in selected pool.');
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

  renderActiveQuestion();
}

function updateExamTimer() {
  if (!examState.activeExam) return;
  examState.activeExam.elapsedSeconds = Math.floor((Date.now() - examState.activeExam.startTime) / 1000);

  const m = Math.floor(examState.activeExam.elapsedSeconds / 60);
  const s = examState.activeExam.elapsedSeconds % 60;

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
      : '';

  stage.innerHTML = `
    <div class="exam-layout question-card">
      <div class="exam-header">
        <div style="font-weight: 700; font-size: 1.1rem; color: var(--text-secondary);">
          Question ${exam.currentIndex + 1} of ${exam.questions.length}
        </div>
        <div class="timer-box">
          <span>⏱️</span>
          <span id="active-exam-timer">00:00</span>
        </div>
      </div>

      <div class="glass-panel">
        <div class="question-meta">${q.cert} • Module ${q.module}${typeBadge}</div>
        <div class="question-text">${q.text}</div>

        <div class="options-list" id="active-options-list"></div>

        <div class="explanation-box" id="active-explanation-box" style="display:none;"></div>
      </div>

      <div class="exam-nav">
        <button class="btn btn-secondary" id="btn-skip" onclick="skipQuestion()">Skip</button>
        ${isMulti ? '<button class="btn btn-accent" id="btn-multi-submit" style="display:none;" onclick="submitMultiAnswer()">Submit Answer</button>' : ''}
        <button class="btn btn-primary" id="btn-exam-next" style="display:none;"></button>
      </div>
    </div>
  `;

  updateExamTimer();

  const optList = document.getElementById('active-options-list');
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];

  if (isMulti) exam.pendingMultiSelect = [];

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
  const submitBtn = document.getElementById('btn-multi-submit');

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
    Alpine.store('srs').record(q.id, isAnswerCorrect(q, selectedIdx), q.cert.toLowerCase().replace('-', ''));
  }
}

function skipQuestion() {
  const exam = examState.activeExam;
  if (exam.currentIndex < exam.questions.length - 1) {
    exam.currentIndex++;
    renderActiveQuestion();
  }
}

function nextExamQuestion() {
  const exam = examState.activeExam;
  if (exam.currentIndex < exam.questions.length - 1) {
    exam.currentIndex++;
    renderActiveQuestion();
  }
}

function finishPracticeExam() {
  if (examState.activeExamInterval) clearInterval(examState.activeExamInterval);
  examState.activeExamInterval = null;

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
    elapsed: exam.elapsedSeconds,
    answers: exam.answers,
    questions: exam.questions,
  };

  Alpine.store('examHistory').add(session);

  renderExamResults(session);
  renderDashboard();
}

function renderExamResults(session) {
  const stage = document.getElementById('view-test');

  const m = Math.floor(session.elapsed / 60);
  const s = session.elapsed % 60;
  const timeStr = `${m}:${String(s).padStart(2, '0')}`;

  stage.innerHTML = `
    <div class="exam-layout">
      <h1>Practice Exam Completed</h1>
      <p class="subtitle">Review your score and details below.</p>

      <div class="glass-panel results-score-panel">
        <div class="score-circle-wrapper">
          <div class="score-circle ${session.pass ? 'score-pass' : 'score-fail'}">
            ${session.pct}%
          </div>
        </div>

        <h2 style="margin-bottom: 8px;">${session.pass ? 'Congratulations! You Passed' : 'Study Required'}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 24px;">Passing score is 70%</p>

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
          <button class="btn btn-primary" onclick="initExamHub()">Exit Test Hub</button>
          <button class="btn btn-secondary" onclick="reviewExamAnswers(${session.id})">Review Answers</button>
        </div>
      </div>
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
        <div style="font-weight: 600; font-size: 1.05rem; margin-bottom: 20px; line-height: 1.5;">${q.text}</div>

        <div style="display: flex; flex-direction: column; gap: 10px;">
    `;

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
  const h = Alpine.store('examHistory').sessions;

  document.getElementById('exam-stat-total').textContent = h.length;
  document.getElementById('exam-stat-pass-rate').textContent = `${Alpine.store('examHistory').passRate()}%`;

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
        <td style="font-weight: 600;">${session.cert}</td>
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
  if (confirm('Clear all historical practice exam scores? This will reset statistics.')) {
    Alpine.store('examHistory').clear();
    renderExamHistory();
    renderDashboard();
  }
}
