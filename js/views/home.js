// Home (pick a certification) and the per-certification hub (progress + that cert's tools).
function certReadProgress(certId) {
  const modules = DATA.MODULE_CONFIG[certId] || [];
  const read = modules.filter((m) => Alpine.store('progress').isRead(certId, m.file)).length;
  return { read, total: modules.length, percent: modules.length ? Math.round((read / modules.length) * 100) : 0 };
}

function certDueCount(certId) {
  return Alpine.store('srs').dueCount(DATA.buildQuestionCatalog(), certId);
}

function renderHome() {
  Alpine.store('streak').update();
  document.getElementById('home-streak').textContent = Alpine.store('streak').data.count;

  const grid = document.getElementById('home-certs-grid');
  grid.innerHTML = '';

  DATA.CERT_DETAILS.forEach((c) => {
    const { read, total, percent } = certReadProgress(c.id);
    const due = c.tools.includes('review') ? certDueCount(c.id) : 0;

    const card = document.createElement('a');
    card.className = 'glass-panel cert-card';
    card.href = `#/${c.id}`;
    card.innerHTML = `
      <div class="cert-code">${c.code}${due ? `<span class="cert-due">${due} due</span>` : ''}</div>
      <div class="cert-title">${c.title}</div>
      <div>
        <div class="cert-progress">
          <span>Study guides</span>
          <span>${read} / ${total} (${percent}%)</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${percent}%"></div>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderHub(cert) {
  const { read, total, percent } = certReadProgress(cert.id);
  const exams = Alpine.store('examHistory');

  // One line of status per tool, shown on its tile.
  const meta = {
    study: `${read} / ${total} guides read (${percent}%)`,
    cards: 'Quick-reference concept notes',
    flashcards: `${Alpine.store('flashcardProgress').masteredCount()} mastered`,
    test: exams.forCert(cert.id).length
      ? `${exams.forCert(cert.id).length} attempts · ${exams.averageScore(cert.id)}% average`
      : 'No attempts yet',
    review: `${cert.tools.includes('review') ? certDueCount(cert.id) : 0} due today`,
    projects: 'End-to-end scenarios',
  };

  const tiles = DATA.getCertTools(cert.id)
    .map((t) => `
      <a class="glass-panel tool-tile" href="#/${cert.id}/${t.id}">
        <div class="tool-tile-icon">${t.icon}</div>
        <div class="tool-tile-title">${t.label}</div>
        <div class="tool-tile-meta">${meta[t.id]}</div>
      </a>`)
    .join('');

  document.getElementById('view-hub').innerHTML = `
    <h1>${cert.code} <span class="hub-title">${cert.title}</span></h1>
    <p class="subtitle">Everything for this certification in one place.</p>
    <div class="tool-grid">${tiles}</div>
  `;
}
