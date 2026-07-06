// Study Guides selector + e-reader. Fetch chain per cert is unchanged from the legacy app:
// {cert}/notes/{file} first, falling back to {cert}/modules/{file} (the raw, unformatted source).
// Which cert actually has curated notes vs. raw-only fallback differs today (DP-300 and DP-700
// have notes; DP-600/DP-750 don't yet) — this rewrite doesn't change that, only the app shell.
function renderStudySelector(certId) {
  const container = document.getElementById('view-study');
  container.innerHTML = '';

  let tabsHtml = `<div class="glass-panel" style="margin-bottom: 24px; padding: 12px 20px;">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">`;

  const certList = [
    { id: 'dp700', label: 'DP-700 Fabric Engineer' },
    { id: 'dp600', label: 'DP-600 Fabric Analytics' },
    { id: 'dp300', label: 'DP-300 Azure DB Admin' },
    { id: 'dp750', label: 'DP-750 Databricks' },
  ];

  certList.forEach((item) => {
    const activeClass = item.id === certId ? 'btn-primary' : 'btn-secondary';
    tabsHtml += `<button class="btn ${activeClass}" onclick="window.location.hash='#/study/${item.id}'">${item.label}</button>`;
  });
  tabsHtml += `</div></div>`;

  let listHtml = `
    <h1>${certId.toUpperCase()} Study Modules</h1>
    <p class="subtitle">Select a sub-module study guide to read the official reference material.</p>
    <div style="display: flex; flex-direction: column; gap: 12px;">
  `;

  const modules = DATA.MODULE_CONFIG[certId] || [];

  if (modules.length === 0) {
    listHtml += `<div class="glass-panel" style="text-align: center; color: var(--text-muted);">No modules configured for this certification yet.</div>`;
  } else {
    modules.forEach((m, idx) => {
      const isCompleted = Alpine.store('progress').isRead(certId, m.file);
      const checkIcon = isCompleted ? '✅' : '📖';
      const textStyle = isCompleted ? 'text-decoration: line-through; color: var(--text-muted);' : '';

      listHtml += `
        <div class="glass-panel study-list-item" style="border-left: 4px solid ${isCompleted ? 'var(--color-success)' : 'var(--accent-indigo)'};"
             onclick="window.location.hash='#/study/${certId}/${m.file}'">
          <div style="display: flex; align-items: center; gap: 16px; min-width: 0;">
            <span style="font-size: 1.25rem;">${checkIcon}</span>
            <div style="min-width: 0;">
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: bold; text-transform: uppercase;">Unit ${idx + 1}</div>
              <div style="font-weight: 600; font-size: 1.05rem; ${textStyle}">${m.title}</div>
            </div>
          </div>
          <span style="color: var(--accent-teal); font-weight: bold; font-size: 0.9rem; flex-shrink: 0;">Start →</span>
        </div>
      `;
    });
  }
  listHtml += `</div>`;

  container.innerHTML = tabsHtml + listHtml;
}

function loadStudyModule(certId, filename) {
  const container = document.getElementById('view-study');

  container.innerHTML = `
    <div class="reader-layout">
      <div class="glass-panel reader-sidebar">
        <button class="btn btn-secondary" onclick="window.location.hash='#/study/${certId}'" style="width:100%; margin-bottom: 20px;">← Back to Modules</button>
        <h3 style="font-size: 0.9rem; text-transform: uppercase; color: var(--text-secondary); margin-bottom: 12px;">Table of Contents</h3>
        <ul class="toc-list" id="toc-container"></ul>
      </div>

      <div class="glass-panel reader-panel">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding-bottom: 12px; border-bottom: 1px solid var(--surface-border);">
          <span id="reader-module-info" style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase;"></span>
          <button id="btn-toggle-read" class="btn btn-secondary btn-sm"></button>
        </div>

        <div id="reader-body" class="markdown-content">
          <div style="text-align: center; padding: 40px 0;">
            <div class="spinner" style="margin: 0 auto 16px;"></div>
            <p style="color: var(--text-secondary);">Fetching study guide...</p>
          </div>
        </div>

        <div class="reader-nav">
          <button id="btn-reader-prev" class="btn btn-secondary">← Previous Unit</button>
          <button id="btn-reader-next" class="btn btn-secondary">Next Unit →</button>
        </div>
      </div>
    </div>
  `;

  const isCompleted = Alpine.store('progress').isRead(certId, filename);
  const toggleBtn = document.getElementById('btn-toggle-read');
  updateReadToggleButton(toggleBtn, isCompleted);
  toggleBtn.onclick = () => {
    const wasCompleted = Alpine.store('progress').isRead(certId, filename);
    Alpine.store('progress').toggle(certId, filename);
    updateReadToggleButton(toggleBtn, !wasCompleted);
    renderDashboard();
  };

  const modules = DATA.MODULE_CONFIG[certId] || [];
  const currentIdx = modules.findIndex((m) => m.file === filename);

  const prevBtn = document.getElementById('btn-reader-prev');
  const nextBtn = document.getElementById('btn-reader-next');

  if (currentIdx > 0) {
    prevBtn.disabled = false;
    prevBtn.onclick = () => { window.location.hash = `#/study/${certId}/${modules[currentIdx - 1].file}`; };
  } else {
    prevBtn.disabled = true;
  }

  if (currentIdx < modules.length - 1 && currentIdx !== -1) {
    nextBtn.disabled = false;
    nextBtn.onclick = () => { window.location.hash = `#/study/${certId}/${modules[currentIdx + 1].file}`; };
  } else {
    nextBtn.disabled = true;
  }

  document.getElementById('reader-module-info').textContent = `${certId.toUpperCase()} • Unit ${currentIdx + 1}`;

  const tryFetch = (url) => fetch(url).then((res) => { if (!res.ok) throw new Error('not found'); return res.text(); });

  tryFetch(`${certId}/notes/${filename}`)
    .catch(() => tryFetch(`${certId}/modules/${filename}`))
    .then((text) => renderMarkdown(text))
    .catch(() => {
      document.getElementById('reader-body').innerHTML = `
        <div style="text-align: center; color: var(--color-danger); padding: 40px 0;">
          <p style="font-size: 2rem; margin-bottom: 12px;">⚠️</p>
          <h3>Failed to load study guide</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 20px;">The requested file (${filename}) could not be retrieved.</p>
          <button class="btn btn-secondary" onclick="window.location.hash='#/study/${certId}'">Return to list</button>
        </div>
      `;
    });
}

function updateReadToggleButton(btn, completed) {
  if (completed) {
    btn.innerHTML = `<span>✓ Completed</span>`;
    btn.className = 'btn btn-accent';
  } else {
    btn.innerHTML = `<span>Mark as Complete</span>`;
    btn.className = 'btn btn-secondary';
  }
}

function renderMarkdown(mdText) {
  const body = document.getElementById('reader-body');
  const toc = document.getElementById('toc-container');

  let processed = mdText.replace(/>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n((?:>\s*.*\n?)*)/g, (match, type, content) => {
    const cleaned = content.replace(/^>\s?/gm, '').trim();
    return `<div class="alert-box alert-${type.toLowerCase()}"><strong>${type.toUpperCase()}</strong><p>${cleaned}</p></div>`;
  });

  if (window.marked) {
    body.innerHTML = window.marked.parse(processed);
  } else {
    body.innerHTML = processed
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<p></p>');
  }

  toc.innerHTML = '';
  const headings = body.querySelectorAll('h1, h2, h3');

  headings.forEach((h, index) => {
    const text = h.textContent;
    const id = `heading-${index}`;
    h.setAttribute('id', id);

    const li = document.createElement('li');
    li.className = 'toc-item';
    li.innerHTML = `<a href="#${id}">${text}</a>`;

    if (h.tagName === 'H2') li.style.paddingLeft = '10px';
    if (h.tagName === 'H3') li.style.paddingLeft = '20px';

    li.querySelector('a').onclick = (e) => {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth' });
      document.querySelectorAll('.toc-item').forEach((item) => item.classList.remove('active'));
      li.classList.add('active');
    };

    toc.appendChild(li);
  });
}
