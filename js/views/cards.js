// Concept Cards browser + detail modal. Reads DP700_DATA/DP600_DATA/DP300_DATA via DATA.getConceptCardData.
function renderConceptCards() {
  const container = document.getElementById('view-cards');
  container.innerHTML = `
    <h1>Concept Study Cards</h1>
    <p class="subtitle">Quick reference notes for exam topics. Filter by exam and search by text.</p>

    <div class="glass-panel" style="margin-bottom: 24px;">
      <div class="search-bar-wrap">
        <input type="text" id="card-search-box" placeholder="Search concepts, keywords, definitions...">
        <select id="card-cert-filter">
          <option value="DP-700">DP-700 Fabric Engineer</option>
          <option value="DP-600">DP-600 Fabric Analytics</option>
          <option value="DP-300">DP-300 Azure DB Admin</option>
        </select>
        <select id="card-module-filter">
          <option value="all">All Modules</option>
        </select>
      </div>
    </div>

    <div class="concepts-grid" id="concepts-grid-container"></div>
  `;

  const certFilter = document.getElementById('card-cert-filter');
  const modFilter = document.getElementById('card-module-filter');
  const searchBox = document.getElementById('card-search-box');

  certFilter.onchange = () => {
    populateModuleFilter();
    updateConceptCardsGrid();
  };

  modFilter.onchange = updateConceptCardsGrid;
  searchBox.oninput = updateConceptCardsGrid;

  populateModuleFilter();
  updateConceptCardsGrid();
}

function populateModuleFilter() {
  const cert = document.getElementById('card-cert-filter').value;
  const modFilter = document.getElementById('card-module-filter');
  modFilter.innerHTML = '<option value="all">All Modules</option>';

  const data = DATA.getConceptCardData(cert);
  if (data && data.modules) {
    Object.keys(data.modules).forEach((m) => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = m;
      modFilter.appendChild(opt);
    });
  }
}

function updateConceptCardsGrid() {
  const cert = document.getElementById('card-cert-filter').value;
  const targetMod = document.getElementById('card-module-filter').value;
  const query = document.getElementById('card-search-box').value.toLowerCase();
  const grid = document.getElementById('concepts-grid-container');
  grid.innerHTML = '';

  const data = DATA.getConceptCardData(cert);

  if (!data || !data.modules) {
    grid.innerHTML = `<div class="glass-panel" style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Database files for this certification are missing or failed to load.</div>`;
    return;
  }

  let cardCount = 0;

  Object.keys(data.modules).forEach((modName) => {
    if (targetMod !== 'all' && modName !== targetMod) return;

    const module = data.modules[modName];
    if (!module.topics) return;

    Object.keys(module.topics).forEach((topicName) => {
      const topicData = module.topics[topicName];
      const coreText = topicData.core || topicData['What It Is'] || '';

      const inTitle = topicName.toLowerCase().includes(query);
      const inBody = coreText.toLowerCase().includes(query);

      if (query && !inTitle && !inBody) return;

      cardCount++;
      const card = document.createElement('div');
      card.className = 'concept-card';
      card.onclick = () => showConceptCardDetails(topicName, topicData, modName);

      card.innerHTML = `
        <div class="concept-card-header">
          <span class="concept-card-badge">${modName}</span>
        </div>
        <div class="concept-card-title">${topicName}</div>
        <div class="concept-card-body">${coreText}</div>
      `;
      grid.appendChild(card);
    });
  });

  if (cardCount === 0) {
    grid.innerHTML = `<div class="glass-panel" style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No study cards match your criteria.</div>`;
  }
}

function showConceptCardDetails(title, data, module) {
  const modal = document.getElementById('card-modal');
  const mTitle = document.getElementById('modal-card-title');
  const mBody = document.getElementById('modal-card-body');

  mTitle.textContent = title;

  let html = `<div style="font-size: 0.85rem; color: var(--text-muted); font-weight: bold; margin-bottom: 24px; text-transform: uppercase;">Module: ${module}</div>`;

  for (let section in data) {
    const content = data[section];
    const parsedContent = window.marked ? window.marked.parse(content) : content;
    html += `
      <div class="modal-section">
        <div class="modal-section-title">${section}</div>
        <div class="modal-section-content">${parsedContent}</div>
      </div>
    `;
  }

  mBody.innerHTML = html;
  modal.classList.add('active');
}
