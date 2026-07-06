// Alpine.store() registrations — the app's reactive global state. Registered on 'alpine:init',
// which fires before Alpine hydrates the DOM, so this works regardless of <script> load order
// relative to the Alpine CDN tag (as long as this file is also present before DOMContentLoaded).
document.addEventListener('alpine:init', () => {
  Alpine.store('ui', {
    route: 'dashboard',
    routeParams: [],
  });

  Alpine.store('progress', {
    data: JSON.parse(localStorage.getItem('fabric_reading_progress') || '{}'),
    isRead(cert, file) {
      return !!this.data[`${cert}/${file}`];
    },
    toggle(cert, file) {
      const key = `${cert}/${file}`;
      if (this.data[key]) delete this.data[key];
      else this.data[key] = true;
      localStorage.setItem('fabric_reading_progress', JSON.stringify(this.data));
    },
    completedCount() {
      return Object.keys(this.data).length;
    },
  });

  Alpine.store('streak', {
    data: JSON.parse(localStorage.getItem('fabric_study_streak') || '{"count":0,"lastDate":null}'),
    update() {
      const today = new Date().toDateString();
      const lastActive = this.data.lastDate;

      if (!lastActive) {
        this.data.count = 1;
        this.data.lastDate = today;
      } else if (lastActive !== today) {
        const diffDays = Math.ceil(Math.abs(new Date(today) - new Date(lastActive)) / 86400000);
        if (diffDays === 1) this.data.count += 1;
        else if (diffDays > 1) this.data.count = 1;
        this.data.lastDate = today;
      }
      localStorage.setItem('fabric_study_streak', JSON.stringify(this.data));
    },
  });

  Alpine.store('flashcardProgress', {
    data: JSON.parse(localStorage.getItem('flashcards_dp700_progress') || '{}'),
    rate(cardId, rating) {
      if (this.data[cardId] === rating) delete this.data[cardId];
      else this.data[cardId] = rating;
      localStorage.setItem('flashcards_dp700_progress', JSON.stringify(this.data));
    },
    reset() {
      this.data = {};
      localStorage.setItem('flashcards_dp700_progress', '{}');
    },
    masteredCount() {
      return Object.values(this.data).filter((r) => r === 'got_it').length;
    },
  });

  Alpine.store('examHistory', {
    sessions: JSON.parse(localStorage.getItem('fabric_exam_history') || '[]'),
    add(session) {
      this.sessions.unshift(session);
      if (this.sessions.length > 50) this.sessions = this.sessions.slice(0, 50);
      localStorage.setItem('fabric_exam_history', JSON.stringify(this.sessions));
    },
    clear() {
      this.sessions = [];
      localStorage.removeItem('fabric_exam_history');
    },
    averageScore() {
      if (this.sessions.length === 0) return 0;
      return Math.round(this.sessions.reduce((sum, s) => sum + s.pct, 0) / this.sessions.length);
    },
    passRate() {
      if (this.sessions.length === 0) return 0;
      return Math.round((this.sessions.filter((s) => s.pass).length / this.sessions.length) * 100);
    },
  });

  // Leitner spaced-review state (window.SRS from js/srs.js holds the pure scheduling logic).
  Alpine.store('srs', {
    state: window.SRS.loadSrsState(),
    record(questionId, wasCorrect, cert) {
      return window.SRS.recordAnswer(this.state, questionId, wasCorrect, cert);
    },
    dueCount(catalog, certFilter = 'all') {
      return window.SRS.getDueCount(catalog, this.state, certFilter);
    },
    dueQuestions(catalog, certFilter = 'all') {
      return window.SRS.getDueQuestions(catalog, this.state, certFilter);
    },
    upcomingCount(catalog, withinDays = 3, certFilter = 'all') {
      return window.SRS.getUpcomingCount(catalog, this.state, withinDays, certFilter);
    },
  });
});
