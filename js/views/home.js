// Home (pick a certification) and the per-certification hub (that cert's tools).
function certSummary(cert) {
  const exams = Alpine.store('examHistory');
  const attempts = exams.forCert(cert.id).length;
  const parts = [];
  if (cert.tools.includes('flashcards')) parts.push(`${Alpine.store('flashcardProgress').masteredCount()} cards mastered`);
  if (cert.tools.includes('test')) parts.push(attempts ? `${attempts} exams · ${exams.averageScore(cert.id)}% avg` : 'No exams yet');
  return parts.length ? parts.join(' · ') : 'Coming soon';
}

function renderHome() {
  Alpine.store('streak').update();
  document.getElementById('home-streak').textContent = Alpine.store('streak').data.count;

  const grid = document.getElementById('home-certs-grid');
  grid.innerHTML = '';

  DATA.CERT_DETAILS.forEach((c) => {
    const card = document.createElement('a');
    card.className = 'glass-panel cert-card';
    card.href = `#/${c.id}`;
    card.innerHTML = `
      <div class="cert-code">${c.code}</div>
      <div class="cert-title">${c.title}</div>
      <div class="cert-progress"><span>${certSummary(c)}</span></div>
    `;
    grid.appendChild(card);
  });
}

function renderHub(cert) {
  const exams = Alpine.store('examHistory');
  const attempts = exams.forCert(cert.id).length;

  const meta = {
    flashcards: `${Alpine.store('flashcardProgress').masteredCount()} mastered`,
    test: attempts ? `${attempts} attempts · ${exams.averageScore(cert.id)}% average` : 'No attempts yet',
  };

  const tools = DATA.getCertTools(cert.id);
  const tiles = tools.length
    ? tools
        .map((t) => `
      <a class="glass-panel tool-tile" href="#/${cert.id}/${t.id}">
        <div class="tool-tile-icon">${t.icon}</div>
        <div class="tool-tile-title">${t.label}</div>
        <div class="tool-tile-meta">${meta[t.id] || ''}</div>
      </a>`)
        .join('')
    : `<div class="glass-panel" style="grid-column: 1 / -1; text-align: center; color: var(--text-muted);">Nothing to study here yet.</div>`;

  document.getElementById('view-hub').innerHTML = `
    <h1>${cert.code} <span class="hub-title">${cert.title}</span></h1>
    <div class="tool-grid">${tiles}</div>
  `;
}
