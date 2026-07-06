// Core Application Logic for Microsoft Certifications Study Portal SPA

// Global configuration of module files and titles
const MODULE_CONFIG = {
  'dp300': [
    { file: 'S1.md', title: 'Plan and implement data platform resources' },
    { file: 'S2.md', title: 'Implement a secure environment' },
    { file: 'S3.md', title: 'Monitor, configure, and optimize database resources' },
    { file: 'S4.md', title: 'Configure and manage automation of tasks' },
    { file: 'S5.md', title: 'Plan and configure a high availability and disaster recovery (HA/DR) environment' }
  ],
  'dp600': [
    { file: 'M1.1.md', title: 'Introduction to end-to-end analytics using Microsoft Fabric' },
    { file: 'M1.2.md', title: 'Discover and connect to data in OneLake' },
    { file: 'M1.3.md', title: 'Get started with lakehouses in Microsoft Fabric' },
    { file: 'M1.4.md', title: 'Get started with data warehouses in Microsoft Fabric' },
    { file: 'M1.5.md', title: 'Get started with Real-Time Intelligence in Microsoft Fabric' },
    { file: 'M2.1.md', title: 'Choose data stores in Microsoft Fabric' },
    { file: 'M2.2.md', title: 'Design dimensional models for analytics in Microsoft Fabric' },
    { file: 'M2.3.md', title: 'Transform data using Dataflows Gen2 in Microsoft Fabric' },
    { file: 'M2.4.md', title: 'Transform data using notebooks in Microsoft Fabric' },
    { file: 'M2.5.md', title: 'Transform data using T-SQL in Microsoft Fabric' },
    { file: 'M3.1.md', title: 'Create DAX calculations in semantic models' },
    { file: 'M3.2.md', title: 'Design semantic models for scale in Microsoft Fabric' },
    { file: 'M3.3.md', title: 'Optimize semantic model performance' },
    { file: 'M3.4.md', title: 'Enforce semantic model security' },
    { file: 'M3.5.md', title: 'Manage the semantic model development lifecycle' },
    { file: 'M4.1.md', title: 'Prepare the semantic layer for AI in Microsoft Fabric' },
    { file: 'M4.2.md', title: 'Understand Microsoft Fabric IQ fundamentals' },
    { file: 'm4.3.md', title: 'Create an ontology with Fabric IQ' },
    { file: 'M5.1.md', title: 'Secure data access in Microsoft Fabric' },
    { file: 'm5.2.md', title: 'Secure a Microsoft Fabric data warehouse' },
    { file: 'M5.3.md', title: 'Govern data in Microsoft Fabric with Purview' },
    { file: 'M5.4.md', title: 'Govern analytics data in Microsoft Fabric' }
  ],
  'dp700': [
    { file: 'M1.1.md', title: 'Ingest Data with Dataflows Gen2 in Microsoft Fabric' },
    { file: 'M1.2.md', title: 'Orchestrate processes and data movement with Microsoft Fabric' },
    { file: 'M1.3.md', title: 'Use Apache Spark in Microsoft Fabric' },
    { file: 'M1.4.md', title: 'Work with real-time data in an Eventhouse in Microsoft Fabric' },
    { file: 'M2.1.md', title: 'Introduction to end-to-end analytics using Microsoft Fabric' },
    { file: 'M2.2.md', title: 'Get started with lakehouses in Microsoft Fabric' },
    { file: 'M2.3.md', title: 'Use Apache Spark in Microsoft Fabric' },
    { file: 'M2.4.md', title: 'Work with Delta Lake tables in Microsoft Fabric' },
    { file: 'M2.5.md', title: 'Ingest Data with Dataflows Gen2 in Microsoft Fabric' },
    { file: 'M2.6.md', title: 'Orchestrate processes and data movement with Microsoft Fabric' },
    { file: 'M2.7.md', title: 'Organize a Fabric lakehouse using medallion architecture' },
    { file: 'M3.1.md', title: 'Get started with Real-Time Intelligence in Microsoft Fabric' },
    { file: 'M3.2.md', title: 'Use Eventstream in Microsoft Fabric' },
    { file: 'M3.3.md', title: 'Work with real-time data in an Eventhouse in Microsoft Fabric' },
    { file: 'M3.4.md', title: 'Create Real-Time Dashboards with Microsoft Fabric' },
    { file: 'M3.5.md', title: 'Use Activator in Microsoft Fabric' },
    { file: 'M4.1.md', title: 'Introduction to end-to-end analytics using Microsoft Fabric' },
    { file: 'M4.2.md', title: 'Get started with data warehouses in Microsoft Fabric' },
    { file: 'M4.3.md', title: 'Load data into a Microsoft Fabric data warehouse' },
    { file: 'M4.4.md', title: 'Query a data warehouse in Microsoft Fabric' },
    { file: 'M4.5.md', title: 'Get started with Copilot in Fabric for Data Warehouse' },
    { file: 'M4.6.md', title: 'Monitor a Microsoft Fabric data warehouse' },
    { file: 'M4.7.md', title: 'Secure a Microsoft Fabric data warehouse' },
    { file: 'M5.1.md', title: 'Implement continuous integration and continuous delivery (CI/CD) in Fabric' },
    { file: 'M5.2.md', title: 'Monitor activities in Microsoft Fabric' },
    { file: 'M5.3.md', title: 'Secure data access in Microsoft Fabric' },
    { file: 'M5.4.md', title: 'Administer a Microsoft Fabric environment' },
    { file: 'M6.1.md', title: 'Use Activator in Microsoft Fabric' }
  ],
  'dp750': [
    { file: 'M1.1.md', title: 'Explore Azure Databricks' },
    { file: 'M1.2.md', title: 'Understand Azure Databricks architecture' },
    { file: 'M1.3.md', title: 'Understand Azure Databricks Integrations' },
    { file: 'M1.4.md', title: 'Select and Configure Compute in Azure Databricks' },
    { file: 'M1.5.md', title: 'Create and organize objects in Unity Catalog' }
  ]
};

// Global App State
const state = {
  currentView: 'dashboard',
  selectedCert: 'dp700',
  readingProgress: JSON.parse(localStorage.getItem('fabric_reading_progress') || '{}'),
  streak: JSON.parse(localStorage.getItem('fabric_study_streak') || '{"count": 0, "lastDate": null}'),
  flashcardProgress: JSON.parse(localStorage.getItem('flashcards_dp700_progress') || '{}'),
  examHistory: JSON.parse(localStorage.getItem('fabric_exam_history') || '[]'),
  
  // Active Flashcards state
  flashcardDeck: [],
  currentFlashcardIdx: 0,
  flashcardFlipped: false,
  flashcardFilters: {
    module: 'all',
    type: 'all',
    shuffle: true
  },
  
  // Active Exam state
  activeExam: null,
  activeExamInterval: null
};

// Start application when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  updateStreak();
  setupEventListeners();
  handleRouting();
  window.addEventListener('hashchange', handleRouting);
  
  // Hide loading spinner
  setTimeout(() => {
    const spinner = document.getElementById('loading-overlay');
    if (spinner) {
      spinner.style.opacity = 0;
      spinner.style.transform = 'scale(1.05)';
      setTimeout(() => spinner.style.display = 'none', 500);
    }
  }, 300);
}

// ----------------------------------------------------
// Streak Management
// ----------------------------------------------------
function updateStreak() {
  const today = new Date().toDateString();
  const lastActive = state.streak.lastDate;
  
  if (!lastActive) {
    state.streak.count = 1;
    state.streak.lastDate = today;
  } else if (lastActive !== today) {
    const lastDateObj = new Date(lastActive);
    const todayObj = new Date(today);
    const diffTime = Math.abs(todayObj - lastDateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      state.streak.count += 1;
    } else if (diffDays > 1) {
      state.streak.count = 1;
    }
    state.streak.lastDate = today;
  }
  
  localStorage.setItem('fabric_study_streak', JSON.stringify(state.streak));
}

// ----------------------------------------------------
// Routing & View Switcher
// ----------------------------------------------------
function handleRouting() {
  const hash = window.location.hash || '#/dashboard';
  const parts = hash.split('/');
  const route = parts[1] || 'dashboard';
  
  state.currentView = route;
  
  // Update sidebar active states
  document.querySelectorAll('.nav-item').forEach(el => {
    const href = el.querySelector('a').getAttribute('href');
    if (href === `#/${route}`) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
  
  document.querySelectorAll('.bottom-nav-item').forEach(el => {
    const href = el.getAttribute('href');
    if (href === `#/${route}`) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Clear running test timer if we navigate away from active exam
  if (route !== 'test' && state.activeExamInterval) {
    clearInterval(state.activeExamInterval);
    state.activeExamInterval = null;
    state.activeExam = null;
  }

  // Switch display elements
  document.querySelectorAll('.view-section').forEach(section => {
    section.classList.remove('active');
  });
  
  const activeSection = document.getElementById(`view-${route}`);
  if (activeSection) {
    activeSection.classList.add('active');
  }
  
  // Specific view loaders
  switch (route) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'study':
      const cert = parts[2];
      const file = parts[3];
      if (cert && file) {
        loadStudyModule(cert, file);
      } else {
        renderStudySelector(cert || state.selectedCert);
      }
      break;
    case 'cards':
      renderConceptCards();
      break;
    case 'flashcards':
      initFlashcards();
      break;
    case 'test':
      initExamHub();
      break;
    case 'projects':
      renderProjects();
      break;
  }
  
  window.scrollTo(0, 0);
}

// ----------------------------------------------------
// Event Listeners Configuration
// ----------------------------------------------------
function setupEventListeners() {
  // Global modal overlay close triggers
  const modal = document.getElementById('card-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-close') || e.target.closest('.modal-close')) {
        modal.classList.remove('active');
      }
    });
  }

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal) {
      modal.classList.remove('active');
    }
  });
}

// ----------------------------------------------------
// Dashboard View
// ----------------------------------------------------
function renderDashboard() {
  // Render Streak
  document.getElementById('dash-streak-count').textContent = state.streak.count;
  
  // Calculate completed readings
  let totalRead = 0;
  Object.keys(MODULE_CONFIG).forEach(c => {
    MODULE_CONFIG[c].forEach(m => {
      if (state.readingProgress[`${c}/${m.file}`]) totalRead++;
    });
  });
  document.getElementById('dash-completed-guides').textContent = totalRead;
  
  // Mastered flashcard count
  let masteredCount = 0;
  Object.keys(state.flashcardProgress).forEach(id => {
    if (state.flashcardProgress[id] === 'got_it') masteredCount++;
  });
  document.getElementById('dash-mastered-cards').textContent = masteredCount;
  
  // Practice tests average score
  let avgScore = 0;
  if (state.examHistory.length > 0) {
    const totalScore = state.examHistory.reduce((sum, item) => sum + item.pct, 0);
    avgScore = Math.round(totalScore / state.examHistory.length);
  }
  document.getElementById('dash-practice-score').textContent = `${avgScore}%`;

  // Render Certification Cards
  const grid = document.getElementById('dash-certs-grid');
  grid.innerHTML = '';
  
  const certDetails = [
    { code: 'DP-700', id: 'dp700', title: 'Fabric Data Engineer' },
    { code: 'DP-600', id: 'dp600', title: 'Fabric Analytics Engineer' },
    { code: 'DP-300', id: 'dp300', title: 'Azure Database Administrator' },
    { code: 'DP-750', id: 'dp750', title: 'Azure Databricks Data Engineer (Preview)' }
  ];
  
  certDetails.forEach(c => {
    const modules = MODULE_CONFIG[c.id] || [];
    let completed = 0;
    modules.forEach(m => {
      if (state.readingProgress[`${c.id}/${m.file}`]) completed++;
    });
    
    const percent = modules.length > 0 ? Math.round((completed / modules.length) * 100) : 0;
    
    const card = document.createElement('div');
    card.className = 'glass-panel cert-card';
    card.onclick = () => {
      state.selectedCert = c.id;
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

// ----------------------------------------------------
// Study Guides Selector & E-Reader
// ----------------------------------------------------
function renderStudySelector(certId) {
  state.selectedCert = certId;
  const container = document.getElementById('view-study');
  container.innerHTML = '';
  
  // Navigation tabs for certification
  let tabsHtml = `<div class="glass-panel" style="margin-bottom: 24px; padding: 12px 20px;">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">`;
  
  const certList = [
    { id: 'dp700', label: 'DP-700 Fabric Engineer' },
    { id: 'dp600', label: 'DP-600 Fabric Analytics' },
    { id: 'dp300', label: 'DP-300 Azure DB Admin' },
    { id: 'dp750', label: 'DP-750 Databricks' }
  ];
  
  certList.forEach(item => {
    const activeClass = item.id === certId ? 'btn-primary' : 'btn-secondary';
    tabsHtml += `<button class="btn ${activeClass}" onclick="renderStudySelector('${item.id}')">${item.label}</button>`;
  });
  tabsHtml += `</div></div>`;

  // Create list of modules
  let listHtml = `
    <h1>${certId.toUpperCase()} Study Modules</h1>
    <p class="subtitle">Select a sub-module study guide to read the official reference material.</p>
    <div style="display: flex; flex-direction: column; gap: 12px;">
  `;
  
  const modules = MODULE_CONFIG[certId] || [];
  
  if (modules.length === 0) {
    listHtml += `<div class="glass-panel" style="text-align: center; color: var(--text-muted);">No modules configured for this certification yet.</div>`;
  } else {
    modules.forEach((m, idx) => {
      const isCompleted = state.readingProgress[`${certId}/${m.file}`];
      const checkIcon = isCompleted ? '✅' : '📖';
      const textStyle = isCompleted ? 'text-decoration: line-through; color: var(--text-muted);' : '';
      
      listHtml += `
        <div class="glass-panel" style="display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; cursor: pointer; border-left: 4px solid ${isCompleted ? 'var(--color-success)' : 'var(--accent-indigo)'};"
             onclick="window.location.hash='#/study/${certId}/${m.file}'">
          <div style="display: flex; align-items: center; gap: 16px;">
            <span style="font-size: 1.25rem;">${checkIcon}</span>
            <div>
              <div style="font-size: 0.8rem; color: var(--text-muted); font-weight: bold; text-transform: uppercase;">Unit ${idx + 1}</div>
              <div style="font-weight: 600; font-size: 1.05rem; ${textStyle}">${m.title}</div>
            </div>
          </div>
          <span style="color: var(--accent-teal); font-weight: bold; font-size: 0.9rem;">Start →</span>
        </div>
      `;
    });
  }
  listHtml += `</div>`;
  
  container.innerHTML = tabsHtml + listHtml;
}

function loadStudyModule(certId, filename) {
  const container = document.getElementById('view-study');
  
  // Set up visual framework with sidebar TOC and reader panel
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

  const progressKey = `${certId}/${filename}`;
  const isCompleted = !!state.readingProgress[progressKey];
  
  // Set up Toggle Completed button
  const toggleBtn = document.getElementById('btn-toggle-read');
  updateReadToggleButton(toggleBtn, isCompleted);
  toggleBtn.onclick = () => {
    const currentStatus = !!state.readingProgress[progressKey];
    if (currentStatus) {
      delete state.readingProgress[progressKey];
    } else {
      state.readingProgress[progressKey] = true;
    }
    localStorage.setItem('fabric_reading_progress', JSON.stringify(state.readingProgress));
    updateReadToggleButton(toggleBtn, !currentStatus);
    
    // Add point to stats if completed
    renderDashboard();
  };

  // Determine current unit index and setup Next/Prev buttons
  const modules = MODULE_CONFIG[certId] || [];
  const currentIdx = modules.findIndex(m => m.file === filename);
  
  const prevBtn = document.getElementById('btn-reader-prev');
  const nextBtn = document.getElementById('btn-reader-next');
  
  if (currentIdx > 0) {
    prevBtn.disabled = false;
    prevBtn.onclick = () => {
      window.location.hash = `#/study/${certId}/${modules[currentIdx - 1].file}`;
    };
  } else {
    prevBtn.disabled = true;
  }
  
  if (currentIdx < modules.length - 1 && currentIdx !== -1) {
    nextBtn.disabled = false;
    nextBtn.onclick = () => {
      window.location.hash = `#/study/${certId}/${modules[currentIdx + 1].file}`;
    };
  } else {
    nextBtn.disabled = true;
  }
  
  // Set Module label
  document.getElementById('reader-module-info').textContent = `${certId.toUpperCase()} • Unit ${currentIdx + 1}`;

  // Fetch study notes (preferred) with fallback to raw modules
  const tryFetch = (url) => fetch(url).then(res => { if (!res.ok) throw new Error('not found'); return res.text(); });

  tryFetch(`${certId}/notes/${filename}`)
    .catch(() => tryFetch(`${certId}/modules/${filename}`))
    .then(text => {
      renderMarkdown(text);
    })
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
  
  // Pre-process markdown for GitHub Alert boxes
  let processed = mdText.replace(/>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n((?:>\s*.*\n?)*)/g, (match, type, content) => {
    const cleaned = content.replace(/^>\s?/gm, '').trim();
    return `<div class="alert-box alert-${type.toLowerCase()}"><strong>${type.toUpperCase()}</strong><p>${cleaned}</p></div>`;
  });
  
  // Parse with marked library
  if (window.marked) {
    body.innerHTML = window.marked.parse(processed);
  } else {
    // Basic fallback parsing if marked isn't loaded
    body.innerHTML = processed
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n\n/g, '<p></p>');
  }

  // Generate Table of Contents from headings
  toc.innerHTML = '';
  const headings = body.querySelectorAll('h1, h2, h3');
  
  headings.forEach((h, index) => {
    const text = h.textContent;
    const id = `heading-${index}`;
    h.setAttribute('id', id);
    
    const li = document.createElement('li');
    li.className = 'toc-item';
    li.innerHTML = `<a href="#${id}">${text}</a>`;
    
    // Add visual depth indentation
    if (h.tagName === 'H2') li.style.paddingLeft = '10px';
    if (h.tagName === 'H3') li.style.paddingLeft = '20px';
    
    li.querySelector('a').onclick = (e) => {
      e.preventDefault();
      h.scrollIntoView({ behavior: 'smooth' });
      document.querySelectorAll('.toc-item').forEach(item => item.classList.remove('active'));
      li.classList.add('active');
    };
    
    toc.appendChild(li);
  });
}

// ----------------------------------------------------
// Concept Cards Browser
// ----------------------------------------------------
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

  // Bind change event handlers
  const certFilter = document.getElementById('card-cert-filter');
  const modFilter = document.getElementById('card-module-filter');
  const searchBox = document.getElementById('card-search-box');

  certFilter.onchange = () => {
    populateModuleFilter();
    updateConceptCardsGrid();
  };
  
  modFilter.onchange = updateConceptCardsGrid;
  searchBox.oninput = updateConceptCardsGrid;

  // Initialize filters
  populateModuleFilter();
  updateConceptCardsGrid();
}

function populateModuleFilter() {
  const cert = document.getElementById('card-cert-filter').value;
  const modFilter = document.getElementById('card-module-filter');
  modFilter.innerHTML = '<option value="all">All Modules</option>';
  
  // Obtain module listing from JS global variables
  let data = null;
  if (cert === 'DP-700' && window.DP700_DATA) data = window.DP700_DATA;
  if (cert === 'DP-600' && window.DP600_DATA) data = window.DP600_DATA;
  if (cert === 'DP-300' && window.DP300_DATA) data = window.DP300_DATA;
  
  if (data && data.modules) {
    Object.keys(data.modules).forEach(m => {
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
  
  let data = null;
  if (cert === 'DP-700' && window.DP700_DATA) data = window.DP700_DATA;
  if (cert === 'DP-600' && window.DP600_DATA) data = window.DP600_DATA;
  if (cert === 'DP-300' && window.DP300_DATA) data = window.DP300_DATA;
  
  if (!data || !data.modules) {
    grid.innerHTML = `<div class="glass-panel" style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">Database files for this certification are missing or failed to load.</div>`;
    return;
  }

  let cardCount = 0;
  
  Object.keys(data.modules).forEach(modName => {
    if (targetMod !== 'all' && modName !== targetMod) return;
    
    const module = data.modules[modName];
    if (!module.topics) return;
    
    Object.keys(module.topics).forEach(topicName => {
      const topicData = module.topics[topicName];
      const coreText = topicData.core || topicData['What It Is'] || '';
      
      // Perform text search filter match
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
  
  // Format topic data points
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

// ----------------------------------------------------
// 3D Flashcards View
// ----------------------------------------------------
function initFlashcards() {
  const container = document.getElementById('view-flashcards');
  
  // Structure html template
  container.innerHTML = `
    <h1>Interactive Study Flashcards</h1>
    <p class="subtitle">Flip and master 240+ certification concepts. Swipe or press Space to flip.</p>
    
    <div class="glass-panel" style="width: 100%; margin-bottom: 24px;">
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;">
        <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 160px;">
          <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-secondary); font-weight: 700;">Module</label>
          <select id="flash-mod-filter"></select>
        </div>
        <div style="display: flex; flex-direction: column; gap: 6px; flex: 1; min-width: 160px;">
          <label style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-secondary); font-weight: 700;">Type</label>
          <select id="flash-type-filter">
            <option value="all">All Types</option>
            <option value="term">Term</option>
            <option value="compare">Compare</option>
            <option value="scenario">Scenario</option>
            <option value="edge">Edge Cases</option>
          </select>
        </div>
        <button id="btn-flash-shuffle" class="btn btn-secondary">🔀 Shuffle: ON</button>
        <button id="btn-flash-reset" class="btn btn-danger btn-sm" style="border: 1px solid var(--color-danger); height: 42px;">Reset Progress</button>
      </div>
    </div>
    
    <div class="flashcards-layout">
      <!-- Progress Bar -->
      <div style="width:100%; display: flex; align-items:center; gap: 16px; margin-bottom: 12px;">
        <div class="progress-bar-container" style="flex:1; height: 8px;">
          <div class="progress-bar-fill" id="flash-progress-fill"></div>
        </div>
        <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);" id="flash-progress-text">0 / 0</div>
      </div>
      
      <!-- Mini rating tags counter -->
      <div style="display: flex; gap: 16px; font-size: 0.8rem; margin-bottom: 16px; color: var(--text-muted);">
        <span>✅ Mastered: <strong id="flash-cnt-mastered" style="color: var(--color-success);">0</strong></span>
        <span>🟡 Review: <strong id="flash-cnt-almost" style="color: var(--color-warning);">0</strong></span>
        <span>❌ Not Yet: <strong id="flash-cnt-notyet" style="color: var(--color-danger);">0</strong></span>
      </div>
      
      <!-- 3D Card Area -->
      <div class="flashcard-stage">
        <div class="flashcard" id="active-flashcard" onclick="flipActiveFlashcard()">
          <div class="flashcard-inner">
            <div class="card-face card-face-front">
              <div class="card-meta">
                <span class="card-badge" id="flash-card-badge-front">TERM</span>
                <span id="flash-card-module-front">Module 1</span>
                <span id="flash-card-counter">1 / 10</span>
              </div>
              <div class="card-text-container">
                <div class="card-text" id="flash-card-front-text">Front content...</div>
              </div>
              <div style="text-align: center; font-size: 0.8rem; color: var(--text-muted); margin-top: 12px;">Click or press Space to flip</div>
            </div>
            
            <div class="card-face card-face-back">
              <div class="card-meta">
                <span class="card-badge" id="flash-card-badge-back">TERM</span>
                <span id="flash-card-module-back">Module 1</span>
              </div>
              <div class="card-text-container">
                <div class="card-text" id="flash-card-back-text">Back content...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Rating Action Buttons -->
      <div class="rating-buttons" id="flash-ratings-bar" style="margin-bottom: 20px;">
        <button class="btn rating-btn mastered" onclick="rateActiveFlashcard('got_it')">Got It (1)</button>
        <button class="btn rating-btn almost" onclick="rateActiveFlashcard('almost')">Almost (2)</button>
        <button class="btn rating-btn notyet" onclick="rateActiveFlashcard('not_yet')">Not Yet (3)</button>
      </div>
      
      <div class="flashcard-controls">
        <button class="btn btn-secondary" id="btn-flash-prev" onclick="navFlashcard(-1)" style="flex:1;">← Previous (P)</button>
        <button class="btn btn-primary" id="btn-flash-next" onclick="navFlashcard(1)" style="flex:1;">Next (N) →</button>
      </div>
      
      <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 10px;">
        Keyboard: <kbd style="background:var(--surface); padding:2px 6px; border-radius:4px;">Space</kbd> flip | <kbd style="background:var(--surface); padding:2px 6px; border-radius:4px;">1</kbd> Got It | <kbd style="background:var(--surface); padding:2px 6px; border-radius:4px;">2</kbd> Almost | <kbd style="background:var(--surface); padding:2px 6px; border-radius:4px;">3</kbd> Not Yet
      </div>
    </div>
  `;

  // Populate Modules dropdown
  const modFilter = document.getElementById('flash-mod-filter');
  modFilter.innerHTML = '<option value="all">All Modules</option>';
  
  if (window.FLASHCARDS_DP700) {
    window.FLASHCARDS_DP700.forEach((m, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = `${m.module}: ${m.title}`;
      modFilter.appendChild(opt);
    });
  }

  // Bind change triggers
  modFilter.onchange = buildFlashcardDeck;
  document.getElementById('flash-type-filter').onchange = buildFlashcardDeck;
  
  const shuffleBtn = document.getElementById('btn-flash-shuffle');
  shuffleBtn.onclick = () => {
    state.flashcardFilters.shuffle = !state.flashcardFilters.shuffle;
    shuffleBtn.textContent = state.flashcardFilters.shuffle ? '🔀 Shuffle: ON' : '🔀 Shuffle: OFF';
    buildFlashcardDeck();
  };

  document.getElementById('btn-flash-reset').onclick = () => {
    if (confirm('Are you sure you want to reset all flashcard mastery records? This cannot be undone.')) {
      state.flashcardProgress = {};
      localStorage.setItem('flashcards_dp700_progress', JSON.stringify(state.flashcardProgress));
      updateFlashcardProgressUI();
      renderFlashcard();
      renderDashboard(); // Sync home screen stats
    }
  };

  // Keyboard controls listener integration
  setupFlashcardKeyboardControls();
  setupFlashcardSwipeGestures();

  // Load active deck
  buildFlashcardDeck();
}

function buildFlashcardDeck() {
  const modVal = document.getElementById('flash-mod-filter').value;
  const typeVal = document.getElementById('flash-type-filter').value;
  
  state.flashcardDeck = [];
  
  if (!window.FLASHCARDS_DP700) return;
  
  window.FLASHCARDS_DP700.forEach((mod, modIdx) => {
    if (modVal !== 'all' && parseInt(modVal) !== modIdx) return;
    
    mod.cards.forEach(c => {
      if (typeVal !== 'all' && c.type !== typeVal) return;
      
      state.flashcardDeck.push({
        ...c,
        moduleName: mod.module,
        moduleTitle: mod.title
      });
    });
  });

  if (state.flashcardFilters.shuffle) {
    // Fisher-Yates Shuffle
    for (let i = state.flashcardDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [state.flashcardDeck[i], state.flashcardDeck[j]] = [state.flashcardDeck[j], state.flashcardDeck[i]];
    }
  }

  state.currentFlashcardIdx = 0;
  state.flashcardFlipped = false;
  
  updateFlashcardProgressUI();
  renderFlashcard();
}

function renderFlashcard() {
  const card = state.flashcardDeck[state.currentFlashcardIdx];
  const flipContainer = document.getElementById('active-flashcard');
  
  if (!flipContainer) return;
  
  // Reset flipped transition
  flipContainer.classList.remove('flipped');
  state.flashcardFlipped = false;

  if (!card) {
    document.getElementById('flash-card-front-text').textContent = 'No cards match current filters. Try changing module or type options.';
    document.getElementById('flash-card-back-text').innerHTML = '';
    document.getElementById('flash-card-counter').textContent = '0 / 0';
    document.getElementById('flash-card-badge-front').style.display = 'none';
    document.getElementById('flash-card-badge-back').style.display = 'none';
    
    document.getElementById('btn-flash-prev').disabled = true;
    document.getElementById('btn-flash-next').disabled = true;
    document.querySelectorAll('.rating-btn').forEach(btn => btn.disabled = true);
    return;
  }

  // Configure badges and texts
  document.getElementById('flash-card-badge-front').style.display = 'inline-block';
  document.getElementById('flash-card-badge-back').style.display = 'inline-block';
  
  document.getElementById('flash-card-badge-front').className = `card-badge badge-${card.type}`;
  document.getElementById('flash-card-badge-front').textContent = card.type.toUpperCase();
  document.getElementById('flash-card-badge-back').className = `card-badge badge-${card.type}`;
  document.getElementById('flash-card-badge-back').textContent = card.type.toUpperCase();
  
  document.getElementById('flash-card-module-front').textContent = card.moduleName;
  document.getElementById('flash-card-module-back').textContent = `${card.moduleName} • ${card.topic}`;
  
  document.getElementById('flash-card-counter').textContent = `${state.currentFlashcardIdx + 1} / ${state.flashcardDeck.length}`;
  
  document.getElementById('flash-card-front-text').textContent = card.front;
  document.getElementById('flash-card-back-text').innerHTML = card.back;

  // Active ratings selection states
  const prevRating = state.flashcardProgress[card.id];
  document.querySelectorAll('.rating-btn').forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('active');
  });
  
  if (prevRating) {
    const activeBtn = document.querySelector(`.rating-btn.${prevRating === 'got_it' ? 'mastered' : prevRating === 'almost' ? 'almost' : 'notyet'}`);
    if (activeBtn) activeBtn.classList.add('active');
  }

  // Next / Prev actions config
  document.getElementById('btn-flash-prev').disabled = state.currentFlashcardIdx === 0;
  document.getElementById('btn-flash-next').disabled = state.currentFlashcardIdx === state.flashcardDeck.length - 1;
}

function flipActiveFlashcard() {
  const flipContainer = document.getElementById('active-flashcard');
  if (flipContainer && state.flashcardDeck.length > 0) {
    flipContainer.classList.toggle('flipped');
    state.flashcardFlipped = !state.flashcardFlipped;
  }
}

function rateActiveFlashcard(rating) {
  const card = state.flashcardDeck[state.currentFlashcardIdx];
  if (!card) return;

  const current = state.flashcardProgress[card.id];
  if (current === rating) {
    delete state.flashcardProgress[card.id];
  } else {
    state.flashcardProgress[card.id] = rating;
  }

  localStorage.setItem('flashcards_dp700_progress', JSON.stringify(state.flashcardProgress));
  
  updateFlashcardProgressUI();
  
  // Highlight active button
  document.querySelectorAll('.rating-btn').forEach(btn => btn.classList.remove('active'));
  const newRating = state.flashcardProgress[card.id];
  if (newRating) {
    const activeBtn = document.querySelector(`.rating-btn.${newRating === 'got_it' ? 'mastered' : newRating === 'almost' ? 'almost' : 'notyet'}`);
    if (activeBtn) activeBtn.classList.add('active');
  }
  
  // Sync widgets
  renderDashboard();
  
  // Auto advance slightly after rating (if flipped to back)
  if (state.flashcardFlipped && state.currentFlashcardIdx < state.flashcardDeck.length - 1) {
    setTimeout(() => navFlashcard(1), 300);
  }
}

function navFlashcard(direction) {
  const nextIdx = state.currentFlashcardIdx + direction;
  if (nextIdx >= 0 && nextIdx < state.flashcardDeck.length) {
    state.currentFlashcardIdx = nextIdx;
    
    // Add swipe animations
    const cardEl = document.getElementById('active-flashcard');
    const animClass = direction > 0 ? 'swipe-left' : 'swipe-right';
    
    cardEl.classList.add(animClass);
    
    setTimeout(() => {
      cardEl.classList.remove(animClass);
      renderFlashcard();
    }, 200);
  }
}

function updateFlashcardProgressUI() {
  const total = state.flashcardDeck.length;
  if (total === 0) {
    document.getElementById('flash-progress-fill').style.width = '0%';
    document.getElementById('flash-progress-text').textContent = '0 / 0';
    return;
  }
  
  // Quantify ratings inside active filtered deck
  let ratedCount = 0;
  let mastered = 0;
  let almost = 0;
  let notyet = 0;
  
  state.flashcardDeck.forEach(c => {
    const r = state.flashcardProgress[c.id];
    if (r) {
      ratedCount++;
      if (r === 'got_it') mastered++;
      else if (r === 'almost') almost++;
      else if (r === 'not_yet') notyet++;
    }
  });

  const pct = Math.round((ratedCount / total) * 100);
  document.getElementById('flash-progress-fill').style.width = `${pct}%`;
  document.getElementById('flash-progress-text').textContent = `${ratedCount} / ${total} (${pct}%)`;
  
  document.getElementById('flash-cnt-mastered').textContent = mastered;
  document.getElementById('flash-cnt-almost').textContent = almost;
  document.getElementById('flash-cnt-notyet').textContent = notyet;
}

function setupFlashcardKeyboardControls() {
  const handler = (e) => {
    if (state.currentView !== 'flashcards') return;
    
    // Do not capture keys in forms
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case ' ':
        e.preventDefault();
        flipActiveFlashcard();
        break;
      case '1':
        rateActiveFlashcard('got_it');
        break;
      case '2':
        rateActiveFlashcard('almost');
        break;
      case '3':
        rateActiveFlashcard('not_yet');
        break;
      case 'n':
      case 'N':
      case 'ArrowRight':
        navFlashcard(1);
        break;
      case 'p':
      case 'P':
      case 'ArrowLeft':
        navFlashcard(-1);
        break;
    }
  };
  
  // Prevent duplicate binders
  document.removeEventListener('keydown', window.flashcardKeyBinder);
  window.flashcardKeyBinder = handler;
  document.addEventListener('keydown', handler);
}

function setupFlashcardSwipeGestures() {
  const card = document.getElementById('active-flashcard');
  if (!card) return;
  
  let startX = 0;
  let startY = 0;
  
  card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });
  
  card.addEventListener('touchend', (e) => {
    const diffX = e.changedTouches[0].clientX - startX;
    const diffY = e.changedTouches[0].clientY - startY;
    
    // Verify pure horizontal swipe
    if (Math.abs(diffX) > 60 && Math.abs(diffY) < 40) {
      if (diffX < 0) {
        navFlashcard(1); // Swipe left = next
      } else {
        navFlashcard(-1); // Swipe right = prev
      }
    }
  }, { passive: true });
}

// ----------------------------------------------------
// Mock Exam Engine
// ----------------------------------------------------
function initExamHub() {
  const container = document.getElementById('view-test');
  
  // Render Setup Exam Config panel
  container.innerHTML = `
    <div class="exam-layout" id="exam-hub-stage">
      <h1>Mock Practice Exams</h1>
      <p class="subtitle">Simulate real-world exam conditions with explanations and timer tracking.</p>
      
      <div class="exam-config-grid" style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; align-items: start;" id="exam-dashboard-columns">
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
      
      <!-- Attempts Logs Section -->
      <div class="glass-panel" style="margin-top: 24px;" id="exam-history-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
          <h2 style="margin:0;">Test History</h2>
          <button class="btn btn-danger btn-sm" onclick="clearExamHistory()">Clear Logs</button>
        </div>
        <div id="exam-history-container" class="history-table-container"></div>
      </div>
    </div>
  `;

  // Bind exam modules update logic
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
  
  let modules = [];
  if (cert === 'dp700' && window.DP700_MODULES) modules = window.DP700_MODULES;
  else if (cert === 'dp600' && window.DP600_MODULES) modules = window.DP600_MODULES;
  else if (cert === 'dp300' && window.DP300_MODULES) modules = window.DP300_MODULES;
  
  modules.forEach((m, i) => {
    const opt = document.createElement('option');
    opt.value = `${cert}_${i + 1}`;
    opt.textContent = m;
    selector.appendChild(opt);
  });
}

function getExamQuestionsPool(cert) {
  if (cert === 'dp700' && window.DP700_QUESTIONS) {
    return window.DP700_QUESTIONS.map(q => ({ ...q, cert: 'DP-700' }));
  }
  if (cert === 'dp600' && window.DP600_QUESTIONS) {
    return window.DP600_QUESTIONS.map(q => ({ ...q, cert: 'DP-600' }));
  }
  if (cert === 'dp300' && window.DP300_QUESTIONS) {
    return window.DP300_QUESTIONS.map(q => ({ ...q, cert: 'DP-300' }));
  }
  if (cert === 'both') {
    const pool600 = (window.DP600_QUESTIONS || []).map(q => ({ ...q, cert: 'DP-600' }));
    const pool700 = (window.DP700_QUESTIONS || []).map(q => ({ ...q, cert: 'DP-700' }));
    return [...pool600, ...pool700];
  }
  return [];
}

function updateExamPoolCount() {
  const cert = document.getElementById('exam-cert-select').value;
  const moduleVal = document.getElementById('exam-module-select').value;
  
  let pool = getExamQuestionsPool(cert);
  
  if (moduleVal !== 'all') {
    const [certKey, modNum] = moduleVal.split('_');
    pool = pool.filter(q => q.module === parseInt(modNum));
  }
  
  document.getElementById('exam-pool-counter').textContent = `${pool.length} practice questions currently available in this selection.`;
}

function startPracticeExam() {
  const cert = document.getElementById('exam-cert-select').value;
  const moduleVal = document.getElementById('exam-module-select').value;
  const countSelect = document.getElementById('exam-count-select').value;
  
  let pool = getExamQuestionsPool(cert);
  
  if (moduleVal !== 'all') {
    const [certKey, modNum] = moduleVal.split('_');
    pool = pool.filter(q => q.module === parseInt(modNum));
  }

  if (pool.length === 0) {
    alert('No questions available in selected pool.');
    return;
  }

  // Shuffle pool
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const count = countSelect === 'all' ? pool.length : Math.min(parseInt(countSelect), pool.length);
  const questions = pool.slice(0, count);

  state.activeExam = {
    questions: questions,
    currentIndex: 0,
    answers: new Array(count).fill(null),
    startTime: Date.now(),
    elapsedSeconds: 0,
    certFilter: cert,
    moduleFilter: moduleVal
  };

  // Launch timer loop
  if (state.activeExamInterval) clearInterval(state.activeExamInterval);
  state.activeExamInterval = setInterval(updateExamTimer, 1000);

  renderActiveQuestion();
}

function updateExamTimer() {
  if (!state.activeExam) return;
  state.activeExam.elapsedSeconds = Math.floor((Date.now() - state.activeExam.startTime) / 1000);
  
  const m = Math.floor(state.activeExam.elapsedSeconds / 60);
  const s = state.activeExam.elapsedSeconds % 60;
  
  const timerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const timerBox = document.getElementById('active-exam-timer');
  if (timerBox) timerBox.textContent = timerText;
}

function renderActiveQuestion() {
  const exam = state.activeExam;
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

  // Restore if already answered
  const savedAns = exam.answers[exam.currentIndex];
  if (savedAns !== null) {
    if (isMulti) exam.pendingMultiSelect = Array.isArray(savedAns) ? [...savedAns] : [savedAns];
    revealQuestionAnswer(savedAns);
  }
}

function selectExamOption(optionIdx) {
  const exam = state.activeExam;
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
    revealQuestionAnswer(optionIdx);
  }
}

function submitMultiAnswer() {
  const exam = state.activeExam;
  const pending = [...(exam.pendingMultiSelect || [])].sort((a, b) => a - b);
  if (pending.length === 0) return;
  exam.answers[exam.currentIndex] = pending;
  exam.pendingMultiSelect = null;
  revealQuestionAnswer(pending);
}

function revealQuestionAnswer(selectedIdx) {
  const exam = state.activeExam;
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
}

function skipQuestion() {
  const exam = state.activeExam;
  if (exam.currentIndex < exam.questions.length - 1) {
    exam.currentIndex++;
    renderActiveQuestion();
  }
}

function nextExamQuestion() {
  const exam = state.activeExam;
  if (exam.currentIndex < exam.questions.length - 1) {
    exam.currentIndex++;
    renderActiveQuestion();
  }
}

function finishPracticeExam() {
  if (state.activeExamInterval) clearInterval(state.activeExamInterval);
  state.activeExamInterval = null;

  const exam = state.activeExam;
  let correct = 0;
  let wrong = 0;
  let skipped = 0;

  exam.questions.forEach((q, idx) => {
    const ans = exam.answers[idx];
    if (ans === null) skipped++;
    else if (q.type === 'multi') {
      const correctKey = [...q.correct].sort((a, b) => a - b).join(',');
      const ansKey = [...ans].sort((a, b) => a - b).join(',');
      if (correctKey === ansKey) correct++; else wrong++;
    } else if (ans === q.correct) correct++;
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
    correct: correct,
    wrong: wrong,
    skipped: skipped,
    pct: pct,
    pass: pass,
    elapsed: exam.elapsedSeconds,
    answers: exam.answers,
    questions: exam.questions
  };

  state.examHistory.unshift(session);
  if (state.examHistory.length > 50) state.examHistory = state.examHistory.slice(0, 50); // Cap history at 50
  
  localStorage.setItem('fabric_exam_history', JSON.stringify(state.examHistory));

  renderExamResults(session);
  renderDashboard(); // Sync dashboard stats
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
  const session = state.examHistory.find(s => s.id === sessionId);
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
    if (isSkipped) {
      isCorrect = false;
    } else if (q.type === 'multi') {
      const correctKey = [...q.correct].sort((a, b) => a - b).join(',');
      const chosenKey = [...chosen].sort((a, b) => a - b).join(',');
      isCorrect = correctKey === chosenKey;
    } else {
      isCorrect = chosen === q.correct;
    }

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
  const h = state.examHistory;
  
  // Update stats cards first
  document.getElementById('exam-stat-total').textContent = h.length;
  let passCount = 0;
  h.forEach(session => {
    if (session.pass) passCount++;
  });
  const rate = h.length > 0 ? Math.round((passCount / h.length) * 100) : 0;
  document.getElementById('exam-stat-pass-rate').textContent = `${rate}%`;

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

  h.forEach(session => {
    const date = new Date(session.date).toLocaleDateString() + ' ' + new Date(session.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const m = Math.floor(session.elapsed / 60);
    const s = session.elapsed % 60;
    const timeStr = `${m}:${String(s).padStart(2, '0')}`;
    
    html += `
      <tr>
        <td>${date}</td>
        <td style="font-weight: 600;">${session.cert}</td>
        <td style="font-weight: bold;">${session.pct}% <span style="font-size:0.75rem; font-weight:normal; color: var(--text-muted);">(${session.correct - session.skipped}/${session.total})</span></td>
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
    state.examHistory = [];
    localStorage.removeItem('fabric_exam_history');
    renderExamHistory();
    renderDashboard();
  }
}

// ----------------------------------------------------
// Projects (Hands-on Labs) View
// ----------------------------------------------------
function renderProjects() {
  const container = document.getElementById('concepts-projects-container');
  if (!container) return;
  
  // List project configurations (matching RetailIQ labs details)
  const projects = [
    {
      num: "1",
      title: "Build the Foundation",
      domain: "Implement & Manage an Analytics Solution",
      effort: "4–6 hours",
      items: "Workspace, Lakehouse, Deployment Pipeline, Security Rules, Sensitivity Labels",
      description: "Creates workspace, lakehouse with medallion folders, Spark/OneLake settings, RLS/CLS/DDM, Git integration, deployment pipeline, sensitivity labels, endorsements. This is the bedrock everything else builds on.",
      examTopics: "Spark settings, domain config, workspace roles, RLS/CLS/DDM, sensitivity labels, endorsements, deployment pipelines, Git, OneLake security"
    },
    {
      num: "2",
      title: "Orchestrate the Data Platform",
      domain: "Implement & Manage an Analytics Solution",
      effort: "3–5 hours",
      items: "Master Pipeline, Dataflow Gen2, Notebooks (stubs), Event-Based Triggers, Parameterised Sub-Pipelines",
      description: "Builds the orchestration layer — master pipeline coordinating child pipelines, Dataflow Gen2 for dimension loading, parameterised notebooks, schedule and event-based triggers. Focus on wiring and architecture.",
      examTopics: "Choose between Dataflow Gen2/pipeline/notebook, schedule & event triggers, orchestration patterns, parameters & dynamic expressions"
    },
    {
      num: "3",
      title: "Load Historical Sales Data",
      domain: "Ingest & Transform Data",
      effort: "5–8 hours",
      items: "Bronze/Silver/Gold Delta tables, Shortcuts, Dataflow Gen2 (completed), PySpark notebooks (completed)",
      description: "Generates 3 years of synthetic sales data with intentional data-quality issues. Implements bronze→silver→gold pipeline: dedup, null imputation, late-arrival handling, orphan removal, Delta MERGE for incremental loads, dimensional model loading.",
      examTopics: "Full & incremental loads, dimensional model prep, shortcuts, PySpark/M transforms, dedup/null/late-arrival handling, denormalization, aggregation"
    },
    {
      num: "4",
      title: "Stream Live Sensor Data",
      domain: "Ingest & Transform Data",
      effort: "4–6 hours",
      items: "Eventhouse, KQL Database, Eventstream, KQL Querysets, Real-Time Dashboard (optional)",
      description: "Builds the real-time pipeline — Eventhouse/KQL DB, Eventstream from IoT sensors, KQL anomaly detection queries, tumbling/sliding/session windowing aggregations, materialized views, and Spark Structured Streaming comparison.",
      examTopics: "Streaming engine choice, native vs mirrored vs shortcuts, Eventstream processing, Spark SS, KQL processing, windowing functions, streaming load patterns"
    },
    {
      num: "5",
      title: "Monitor the Platform",
      domain: "Monitor & Optimize an Analytics Solution",
      effort: "4–6 hours",
      items: "Alert rules, monitoring notebook (completed), Data Activator, diagnostic queries",
      description: "Break/fix simulation containing 7 failure scenarios (pipeline silent failure, dataflow timeout, Spark AnalysisException, Eventhouse ingestion drop, Eventstream disconnect, T-SQL GROUP BY error, shortcut access denied). Plus Monitor hub exploration, alert configuration, and a completed monitoring notebook.",
      examTopics: "Monitor ingestion/transformation/refresh, configure alerts, identify & resolve pipeline/dataflow/notebook/eventhouse/eventstream/T-SQL/shortcut errors"
    },
    {
      num: "6",
      title: "Optimize for Scale",
      domain: "Monitor & Optimize an Analytics Solution",
      effort: "4–6 hours",
      items: "Lakehouse, pipelines, warehouse, eventstreams, Spark config, KQL queries (all modified)",
      description: "Systematic performance optimization with before/after benchmarking. Covers OPTIMIZE/ZORDER/VACUUM, partition strategy redesign, pipeline parallelism, warehouse stats/CTAS, Eventhouse caching/materialized views/eventstream transforms, Spark AQE/broadcast/shuffle tuning, KQL time-filter optimization.",
      examTopics: "Optimize lakehouse/pipeline/warehouse/eventstreams/eventhouses/Spark/query performance"
    }
  ];

  container.innerHTML = '';
  
  projects.forEach(p => {
    const card = document.createElement('div');
    card.className = 'glass-panel';
    card.style.display = 'flex';
    card.style.flexDirection = 'column';
    card.style.gap = '14px';
    card.style.borderLeft = '4px solid var(--accent-teal)';
    
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="margin:0; font-size: 1.3rem;"><span style="color:var(--accent-teal); font-weight: 800;">${p.num}.</span> ${p.title}</h2>
          <div style="display:flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
            <span style="font-size: 0.7rem; color: var(--accent-teal); background: var(--accent-teal-glow); padding: 2px 8px; border-radius: 12px; font-weight: 600; text-transform: uppercase;">${p.domain}</span>
            <span style="font-size: 0.7rem; color: var(--text-secondary); background: var(--surface-border); padding: 2px 8px; border-radius: 12px; font-weight: 600;">⏱️ ${p.effort}</span>
          </div>
        </div>
        <a href="dp700/projects/Specifications_${p.num}.html" target="_blank" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">Open Spec ↗</a>
      </div>
      
      <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.5; margin: 0;">${p.description}</p>
      
      <div style="border-top: 1px solid var(--surface-border); padding-top: 12px; font-size: 0.8rem; color: var(--text-muted);">
        <strong>Tested Skills:</strong> ${p.examTopics}
      </div>
    `;
    container.appendChild(card);
  });
}
