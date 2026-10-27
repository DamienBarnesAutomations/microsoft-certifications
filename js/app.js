// Bootstrap + hash router. The app is organised by certification:
//   #/                      home: pick a certification
//   #/<cert>                that certification's hub (progress + its tools)
//   #/<cert>/<tool>[/...]   a tool scoped to that certification (flashcards, test; see
//                           CERT_DETAILS.tools in js/data.js for what each cert offers)
// Alpine drives the nav (Alpine.store('ui')); this file owns which view section is shown and
// calls that view's imperative renderer, which reads the open certification from the ui store.
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  Alpine.store('streak').update();
  setupGlobalEventListeners();
  handleRouting();
  window.addEventListener('hashchange', handleRouting);

  setTimeout(() => {
    const spinner = document.getElementById('loading-overlay');
    if (spinner) {
      spinner.style.opacity = 0;
      spinner.style.transform = 'scale(1.05)';
      setTimeout(() => (spinner.style.display = 'none'), 500);
    }
  }, 300);
}

function currentCertId() {
  return Alpine.store('ui').cert;
}

function handleRouting() {
  const parts = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  const ui = Alpine.store('ui');
  const cert = parts.length ? DATA.getCert(parts[0]) : null;

  // Unknown first segment (including old #/study, #/dashboard links) goes back to home.
  if (parts.length && !cert) {
    window.location.hash = '#/';
    return;
  }

  let tool = cert ? parts[1] || 'hub' : 'home';

  // A certification has no landing page of its own: open its first mode directly.
  if (cert && tool === 'hub' && cert.tools.length) {
    window.location.replace(`#/${cert.id}/${cert.tools[0]}`);
    return;
  }
  if (cert && tool !== 'hub' && !cert.tools.includes(tool)) {
    window.location.hash = `#/${cert.id}`;
    return;
  }

  ui.cert = cert ? cert.id : null;
  ui.certInfo = cert;
  ui.tool = tool;
  ui.params = parts.slice(2);
  ui.tools = cert ? DATA.getCertTools(cert.id) : [];
  // Sidebar rows: home alone, or the open certification's modes.
  ui.nav = cert
    ? ui.tools.map((t) => ({ id: t.id, label: t.label, icon: t.icon, href: `#/${cert.id}/${t.id}` }))
    : [{ id: 'home', label: 'Certifications', icon: '🏠', href: '#/' }];

  if (tool !== 'test' && examState.activeExamInterval) {
    clearInterval(examState.activeExamInterval);
    examState.activeExamInterval = null;
    examState.activeExam = null;
  }

  document.body.classList.toggle('exam-active', !!examState.activeExam);

  document.querySelectorAll('.view-section').forEach((section) => section.classList.remove('active'));
  const activeSection = document.getElementById(`view-${tool}`);
  if (activeSection) activeSection.classList.add('active');

  switch (tool) {
    case 'home':
      renderHome();
      break;
    case 'hub':
      renderHub(cert);
      break;
    case 'study': {
      const file = ui.params[0];
      if (file) loadStudyModule(cert.id, file);
      else renderStudySelector(cert.id);
      break;
    }
    case 'learn':
      renderLearn();
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
    case 'review':
      initReviewQueue();
      break;
    case 'projects':
      renderProjects();
      break;
  }

  window.scrollTo(0, 0);
}

function setupGlobalEventListeners() {
  const modal = document.getElementById('card-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal-close') || e.target.closest('.modal-close')) {
        modal.classList.remove('active');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal) modal.classList.remove('active');
  });
}
