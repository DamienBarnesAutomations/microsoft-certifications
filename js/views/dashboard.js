// Dashboard view: aggregates streak, reading progress, flashcard mastery, exam average,
// and the new spaced-review "due" count, then renders per-cert progress cards.
function renderDashboard() {
  Alpine.store('streak').update();

  document.getElementById('dash-streak-count').textContent = Alpine.store('streak').data.count;

  let totalRead = 0;
  Object.keys(DATA.MODULE_CONFIG).forEach((c) => {
    DATA.MODULE_CONFIG[c].forEach((m) => {
      if (Alpine.store('progress').isRead(c, m.file)) totalRead++;
    });
  });
  document.getElementById('dash-completed-guides').textContent = totalRead;

  document.getElementById('dash-mastered-cards').textContent = Alpine.store('flashcardProgress').masteredCount();
  document.getElementById('dash-practice-score').textContent = `${Alpine.store('examHistory').averageScore()}%`;

  const catalog = DATA.buildQuestionCatalog();
  const dueCount = Alpine.store('srs').dueCount(catalog, 'all');
  const dueEl = document.getElementById('dash-due-review');
  if (dueEl) {
    dueEl.textContent = dueCount;
    const dueCard = document.getElementById('dash-due-card');
    if (dueCard) dueCard.onclick = () => { window.location.hash = '#/review'; };
  }

  const grid = document.getElementById('dash-certs-grid');
  grid.innerHTML = '';

  DATA.CERT_DETAILS.forEach((c) => {
    const modules = DATA.MODULE_CONFIG[c.id] || [];
    let completed = 0;
    modules.forEach((m) => {
      if (Alpine.store('progress').isRead(c.id, m.file)) completed++;
    });

    const percent = modules.length > 0 ? Math.round((completed / modules.length) * 100) : 0;

    const card = document.createElement('div');
    card.className = 'glass-panel cert-card';
    card.onclick = () => {
      window.location.hash = `#/study/${c.id}`;
    };

    card.innerHTML = `
      <div class="cert-code">${c.code}</div>
      <div class="cert-title">${c.title}</div>
      <div>
        <div class="cert-progress">
          <span>Progress</span>
          <span>${completed} / ${modules.length} Modules (${percent}%)</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${percent}%"></div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}
