// Mock exam: a timed, exam-conditions run built on the practice-exam engine in exam.js.
// 50 questions drawn in proportion to the outline's domain weights, plus one case study
// (its questions share a scenario) at the end when the bank has one. A 100-minute countdown
// runs; answers are not revealed until the end, and can be changed or flagged meanwhile.
// On finish the session goes through finishPracticeExam() so it lands in history like any test.
const MOCK_QUESTION_COUNT = 50;
const MOCK_MINUTES = 100;

// "25-30%" -> 27.5
function weightMidpoint(weight) {
  const nums = String(weight).match(/\d+(\.\d+)?/g) || ['0'];
  return nums.reduce((a, b) => a + parseFloat(b), 0) / nums.length;
}

// How many of `total` questions each in-outline domain gets, by weight (largest remainder).
function domainQuotas(outline, total) {
  const doms = outline.domains.filter((d) => d.inOutline !== false);
  const mids = doms.map((d) => weightMidpoint(d.weight));
  const sum = mids.reduce((a, b) => a + b, 0) || 1;
  const exact = mids.map((m) => (m / sum) * total);
  const counts = exact.map(Math.floor);
  let left = total - counts.reduce((a, b) => a + b, 0);
  exact.map((e, i) => [e - Math.floor(e), i]).sort((a, b) => b[0] - a[0]).slice(0, left)
    .forEach(([, i]) => { counts[i]++; });
  return Object.fromEntries(doms.map((d, i) => [d.id, counts[i]]));
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildMockQuestions(pool, outline) {
  const domainOf = (q) => (q.skill ? q.skill.split('.')[0] : null);
  const cases = {};
  pool.filter((q) => q.case).forEach((q) => { (cases[q.case] = cases[q.case] || []).push(q); });
  const caseIds = Object.keys(cases);
  const caseQs = caseIds.length ? cases[caseIds[Math.floor(Math.random() * caseIds.length)]] : [];

  const quotas = domainQuotas(outline, MOCK_QUESTION_COUNT);
  caseQs.forEach((q) => { const d = domainOf(q); if (quotas[d] > 0) quotas[d]--; });

  const regular = pool.filter((q) => !q.case);
  const picked = [];
  Object.keys(quotas).forEach((d) => {
    picked.push(...shuffleInPlace(regular.filter((q) => domainOf(q) === d)).slice(0, quotas[d]));
  });
  const want = MOCK_QUESTION_COUNT - caseQs.length;
  if (picked.length < want) {
    const have = new Set(picked);
    picked.push(...shuffleInPlace(regular.filter((q) => !have.has(q))).slice(0, want - picked.length));
  }
  return [...shuffleInPlace(picked), ...caseQs].map(shuffleQuestionOptions);
}

function startMockExam() {
  const cert = currentCertId();
  const outline = DATA.getOutline(cert);
  const pool = getExamQuestionsPool(cert);
  if (!outline || pool.length === 0) { alert('No questions available for a mock exam.'); return; }

  const questions = buildMockQuestions(pool, outline);
  examState.activeExam = {
    mode: 'mock',
    questions,
    currentIndex: 0,
    answers: new Array(questions.length).fill(null),
    flags: new Set(),
    limitSeconds: MOCK_MINUTES * 60,
    startTime: Date.now(),
    elapsedSeconds: 0,
    certFilter: cert,
    moduleFilter: 'mock',
  };
  if (examState.activeExamInterval) clearInterval(examState.activeExamInterval);
  examState.activeExamInterval = setInterval(updateExamTimer, 1000);
  document.body.classList.add('exam-active');
  renderMockQuestion();
}

function mockAnswered(q, ans) {
  if (ans === null || ans === undefined) return false;
  if (isFormatQuestion(q)) return isFormatAnswered(q, ans);
  return !Array.isArray(ans) || ans.length > 0;
}

function renderMockQuestion() {
  const exam = examState.activeExam;
  const i = exam.currentIndex;
  const q = exam.questions[i];
  const last = i === exam.questions.length - 1;
  const badge = q.type === 'multi' ? ' • <span class="q-type-badge q-type-multi">Select all that apply</span>'
    : q.type === 'truefalse' ? ' • <span class="q-type-badge q-type-tf">True / False</span>' : formatTypeBadge(q);

  document.getElementById('view-test').innerHTML = `
    <div class="exam-layout question-card">
      <div class="exam-header">
        <button class="exam-exit" onclick="exitExam()" aria-label="Exit mock exam">✕</button>
        <div class="exam-count">${i + 1} / ${exam.questions.length}</div>
        <button class="btn btn-sm ${exam.flags.has(i) ? 'btn-accent' : 'btn-secondary'}" onclick="toggleMockFlag()">${exam.flags.has(i) ? '⚑ Flagged' : '⚐ Flag'}</button>
        <div class="timer-box"><span id="active-exam-timer">00:00</span></div>
      </div>
      <div class="exam-progress"><div class="exam-progress-fill" style="width: ${(i / exam.questions.length) * 100}%"></div></div>
      <div class="question-body">
        <div class="question-meta">Mock exam${badge}</div>
        ${scenarioHtml(q)}
        <div class="question-text">${q.text}</div>
        <div class="options-list" id="active-options-list"></div>
      </div>
      <div class="exam-nav">
        <button class="btn btn-secondary" onclick="mockGo(${i - 1})" ${i === 0 ? 'disabled' : ''}>← Back</button>
        <button class="btn btn-secondary" onclick="renderMockReview()">Review</button>
        <button class="btn btn-primary" onclick="${last ? 'renderMockReview()' : `mockGo(${i + 1})`}">${last ? 'Review & finish' : 'Next →'}</button>
      </div>
    </div>`;
  updateExamTimer();

  const host = document.getElementById('active-options-list');
  if (isFormatQuestion(q)) {
    renderFormatWidget(q, host, { answer: exam.answers[i], onChange: (ans) => { exam.answers[i] = ans; } });
  } else {
    drawMockChoices(q, host);
  }
}

function drawMockChoices(q, host) {
  const exam = examState.activeExam;
  const i = exam.currentIndex;
  const multi = q.type === 'multi';
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const sel = () => {
    const a = exam.answers[i];
    return multi ? (Array.isArray(a) ? a : []) : [a];
  };
  host.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const item = document.createElement('div');
    item.className = 'option-item' + (sel().includes(idx) ? ' selected' : '');
    item.innerHTML = `<span class="option-badge">${letters[idx]}</span><span>${opt}</span>`;
    item.onclick = () => {
      if (multi) {
        const cur = sel();
        const next = cur.includes(idx) ? cur.filter((x) => x !== idx) : [...cur, idx];
        exam.answers[i] = next.length ? next.sort((a, b) => a - b) : null;
      } else {
        exam.answers[i] = idx;
      }
      drawMockChoices(q, host);
    };
    host.appendChild(item);
  });
}

function mockGo(i) {
  const exam = examState.activeExam;
  if (i < 0 || i >= exam.questions.length) return;
  exam.currentIndex = i;
  renderMockQuestion();
}

function toggleMockFlag() {
  const exam = examState.activeExam;
  if (!exam.flags.delete(exam.currentIndex)) exam.flags.add(exam.currentIndex);
  renderMockQuestion();
}

function renderMockReview() {
  const exam = examState.activeExam;
  const unanswered = exam.questions.filter((q, i) => !mockAnswered(q, exam.answers[i])).length;
  const tiles = exam.questions.map((q, i) => {
    const cls = ['mock-tile', mockAnswered(q, exam.answers[i]) ? 'is-answered' : '', exam.flags.has(i) ? 'is-flagged' : ''].join(' ');
    return `<button class="${cls}" onclick="mockGo(${i})">${i + 1}</button>`;
  }).join('');
  document.getElementById('view-test').innerHTML = `
    <div class="exam-layout question-card">
      <div class="exam-header">
        <button class="exam-exit" onclick="exitExam()" aria-label="Exit mock exam">✕</button>
        <div class="exam-count">Review</div>
        <div class="timer-box"><span id="active-exam-timer">00:00</span></div>
      </div>
      <div class="question-body">
        <div class="question-text">${unanswered ? `${unanswered} unanswered` : 'All questions answered'}${exam.flags.size ? ` · ${exam.flags.size} flagged` : ''}</div>
        <div class="mock-grid">${tiles}</div>
        <p class="mock-legend"><span class="mock-tile is-answered">1</span> answered <span class="mock-tile is-flagged">1</span> flagged <span class="mock-tile">1</span> unanswered</p>
      </div>
      <div class="exam-nav">
        <button class="btn btn-secondary" onclick="mockGo(${exam.currentIndex})">← Back to questions</button>
        <button class="btn btn-primary" onclick="finishMockExam(false)">Finish exam</button>
      </div>
    </div>`;
  updateExamTimer();
}

function finishMockExam(timedOut) {
  const exam = examState.activeExam;
  if (!exam) return;
  if (!timedOut) {
    const unanswered = exam.questions.filter((q, i) => !mockAnswered(q, exam.answers[i])).length;
    if (!confirm(unanswered ? `${unanswered} question(s) are unanswered and will count as wrong. Finish the exam?` : 'Finish the exam and see your score?')) return;
  } else {
    alert('Time is up. Your exam has been submitted.');
  }
  // Unanswered or incomplete answers (null, empty, half-filled yes/no) are scored as skipped.
  exam.answers = exam.answers.map((a, i) => (mockAnswered(exam.questions[i], a) ? a : null));
  // Feed answers into the progress queues and spaced review, as practice mode does per answer.
  exam.questions.forEach((q, i) => {
    const a = exam.answers[i];
    if (a === null || !q.id) return;
    Alpine.store('questionQueue').record(q.id, isAnswerCorrect(q, a));
    Alpine.store('srs').record(q.id, isAnswerCorrect(q, a), q.cert.toLowerCase().replace('-', ''));
  });
  finishPracticeExam();
}
