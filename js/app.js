// Bootstrap: hash router + view lifecycle. Alpine drives the nav's reactive active-state and
// the due-review badge (via Alpine.store('ui').route and x-bind in index.html); this file still
// owns the actual view-content rendering, same imperative render-to-container pattern as the
// legacy app, since the reader/flashcards/exam views are complex enough that hand-rolled DOM
// building remains clearer than forcing them into declarative templates.
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

function handleRouting() {
  const hash = window.location.hash || '#/dashboard';
  const parts = hash.split('/');
  const route = parts[1] || 'dashboard';

  Alpine.store('ui').route = route;
  Alpine.store('ui').routeParams = parts.slice(2);

  if (route !== 'test' && examState.activeExamInterval) {
    clearInterval(examState.activeExamInterval);
    examState.activeExamInterval = null;
    examState.activeExam = null;
  }

  document.querySelectorAll('.view-section').forEach((section) => section.classList.remove('active'));
  const activeSection = document.getElementById(`view-${route}`);
  if (activeSection) activeSection.classList.add('active');

  switch (route) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'study': {
      const cert = parts[2];
      const file = parts[3];
      if (cert && file) loadStudyModule(cert, file);
      else renderStudySelector(cert || 'dp700');
      break;
    }
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
