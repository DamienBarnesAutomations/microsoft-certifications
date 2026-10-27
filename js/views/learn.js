// Learn mode: one short lesson per skill in the certification's skills outline, in outline order.
// A lesson is { skill, summary, explain, example?, traps[] } (HTML strings), written in lessons/*.js.
// Each ends with a few practice questions for that skill, a "mark as learned" toggle, and a link to
// that skill's flashcards. Flashcards for a skill stay locked until its lesson is marked learned.
function lessonKey(id) {
  return `lesson:${id}`;
}

function isLessonLearned(cert, skillId) {
  return Alpine.store('progress').isRead(cert, lessonKey(skillId));
}

function lessonFor(cert, skillId) {
  return DATA.getLessons(cert).find((l) => l.skill === skillId) || null;
}

// Skill ids of the outline in order, flattened: [{ id, title, topicId, topicTitle, domainTitle }]
function outlineSkills(outline) {
  const out = [];
  outline.domains.filter((d) => d.inOutline !== false).forEach((d) => {
    d.topics.forEach((t) => {
      t.skills.forEach((s) => out.push({ id: s.id, title: s.title, topicTitle: t.title, domainTitle: d.title, weight: d.weight }));
    });
  });
  return out;
}

function renderLearn() {
  const cert = currentCertId();
  const skill = Alpine.store('ui').params[0];
  if (skill) renderLesson(cert, skill);
  else renderLessonList(cert);
}

function renderLessonList(cert) {
  const outline = DATA.getOutline(cert);
  const skills = outlineSkills(outline);
  const done = skills.filter((s) => isLessonLearned(cert, s.id)).length;
  const pct = skills.length ? Math.round((done / skills.length) * 100) : 0;

  let html = `
    <h1>${DATA.getCert(cert).code} Learn</h1>
    <p class="subtitle">One lesson per exam skill. Read it, answer the check questions, then mark it learned to unlock its flashcards.</p>
    <div class="learn-progress">
      <div class="cert-progress"><span>${done} of ${skills.length} lessons learned</span><span>${pct}%</span></div>
      <div class="progress-bar-container"><div class="progress-bar-fill" style="width: ${pct}%"></div></div>
    </div>`;

  let lastDomain = null;
  let lastTopic = null;
  skills.forEach((s) => {
    if (s.domainTitle !== lastDomain) {
      html += `<h2 class="learn-domain">${s.domainTitle} <span class="section-meta">${s.weight}</span></h2>`;
      lastDomain = s.domainTitle;
      lastTopic = null;
    }
    if (s.topicTitle !== lastTopic) {
      html += `<h3 class="learn-topic">${s.topicTitle}</h3>`;
      lastTopic = s.topicTitle;
    }
    const has = !!lessonFor(cert, s.id);
    const learned = isLessonLearned(cert, s.id);
    html += `
      <a class="learn-row${learned ? ' is-learned' : ''}${has ? '' : ' is-missing'}" href="#/${cert}/learn/${s.id}">
        <span class="learn-check">${learned ? '✓' : ''}</span>
        <span class="learn-row-title">${s.title}</span>
        <span class="learn-row-go">${has ? '' : 'soon'}</span>
      </a>`;
  });

  document.getElementById('view-learn').innerHTML = html;
}

function renderLesson(cert, skillId) {
  const outline = DATA.getOutline(cert);
  const skills = outlineSkills(outline);
  const idx = skills.findIndex((s) => s.id === skillId);
  const view = document.getElementById('view-learn');
  if (idx < 0) { window.location.hash = `#/${cert}/learn`; return; }

  const s = skills[idx];
  const lesson = lessonFor(cert, skillId);
  const prev = skills[idx - 1];
  const next = skills[idx + 1];
  const learned = isLessonLearned(cert, skillId);
  const nav = (sk, label) => (sk ? `<a class="btn btn-secondary" href="#/${cert}/learn/${sk.id}">${label}</a>` : '<span></span>');

  view.innerHTML = `
    <a class="learn-back" href="#/${cert}/learn">← All lessons</a>
    <div class="learn-crumb">${s.domainTitle} · ${s.topicTitle}</div>
    <h1 class="lesson-title">${s.title}</h1>
    ${lesson ? `
      <p class="lesson-summary">${lesson.summary}</p>
      <section class="lesson-section"><h2>How it works</h2>${lesson.explain}</section>
      ${lesson.example ? `<section class="lesson-section"><h2>Worked example</h2>${lesson.example}</section>` : ''}
      ${lesson.traps && lesson.traps.length ? `<section class="lesson-section lesson-traps"><h2>Exam traps</h2><ul>${lesson.traps.map((t) => `<li>${t}</li>`).join('')}</ul></section>` : ''}
      <section class="lesson-section"><h2>Check yourself</h2><div id="lesson-quiz"></div></section>
      <div class="lesson-actions">
        <button class="btn ${learned ? 'btn-secondary' : 'btn-primary'}" id="btn-learned">${learned ? '✓ Learned (tap to undo)' : 'Mark as learned'}</button>
        <a class="btn btn-secondary" href="#/${cert}/flashcards/${s.id}">Flashcards for this skill</a>
      </div>` : '<p class="subtitle">This lesson has not been written yet.</p>'}
    <div class="lesson-nav">${nav(prev, '← Previous')}${nav(next, 'Next →')}</div>`;

  window.scrollTo(0, 0);
  if (!lesson) return;

  document.getElementById('btn-learned').onclick = () => {
    Alpine.store('progress').toggle(cert, lessonKey(skillId));
    renderLesson(cert, skillId);
  };
  renderLessonQuiz(cert, skillId);
}

// Up to four practice questions on this skill (single and multi-select), answered in place.
function renderLessonQuiz(cert, skillId) {
  const host = document.getElementById('lesson-quiz');
  const pool = getExamQuestionsPool(cert)
    .filter((q) => q.skill === skillId && !q.case && !isFormatQuestion(q));
  const queue = Alpine.store('questionQueue');
  // Wrong and unseen questions first, then the rest; shuffled within each group.
  const rank = (q) => ({ wrong: 0, unseen: 1, right: 2 }[queue.state(q.id)] ?? 1);
  const picked = pool.map((q) => ({ q, r: rank(q) + Math.random() })).sort((a, b) => a.r - b.r).slice(0, 4).map((x) => shuffleQuestionOptions(x.q));
  if (!picked.length) { host.innerHTML = '<p class="subtitle">No practice questions for this skill yet.</p>'; return; }

  host.innerHTML = '';
  picked.forEach((q, n) => host.appendChild(buildLessonQuestion(q, n)));
}

function buildLessonQuestion(q, n) {
  const multi = q.type === 'multi';
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  const box = document.createElement('div');
  box.className = 'lesson-q';
  box.innerHTML = `<div class="question-text">${n + 1}. ${q.text}</div>${multi ? '<div class="question-meta">Select all that apply</div>' : ''}<div class="options-list"></div><div class="lesson-q-actions"></div><div class="explanation-box" style="display:none;"></div>`;
  const list = box.querySelector('.options-list');
  const actions = box.querySelector('.lesson-q-actions');
  const chosen = new Set();
  const items = q.options.map((opt, idx) => {
    const item = document.createElement('div');
    item.className = 'option-item';
    item.innerHTML = `<span class="option-badge">${letters[idx]}</span><span>${opt}</span>`;
    list.appendChild(item);
    return item;
  });

  const finish = (answer) => {
    const ok = isAnswerCorrect(q, answer);
    const correctSet = new Set(multi ? q.correct : [q.correct]);
    items.forEach((it, idx) => {
      it.classList.add('disabled');
      if (correctSet.has(idx)) it.classList.add('correct');
      else if (chosen.has(idx)) it.classList.add('wrong');
    });
    actions.innerHTML = '';
    const exp = box.querySelector('.explanation-box');
    exp.innerHTML = `<strong>${ok ? 'Correct.' : 'Not quite.'}</strong> ${q.explanation || ''}`;
    exp.style.display = 'block';
    if (q.id) {
      Alpine.store('questionQueue').record(q.id, ok);
      Alpine.store('srs').record(q.id, ok, q.cert.toLowerCase().replace('-', ''));
    }
  };

  items.forEach((it, idx) => {
    it.onclick = () => {
      if (it.classList.contains('disabled')) return;
      if (!multi) { chosen.add(idx); finish(idx); return; }
      if (!chosen.delete(idx)) chosen.add(idx);
      it.classList.toggle('selected', chosen.has(idx));
      actions.innerHTML = chosen.size ? '<button class="btn btn-accent btn-sm">Submit</button>' : '';
      const b = actions.querySelector('button');
      if (b) b.onclick = () => finish([...chosen].sort((a, c) => a - c));
    };
  });
  return box;
}
