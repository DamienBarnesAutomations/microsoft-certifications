// Alpine.store() registrations — the app's reactive global state. Registered on 'alpine:init',
// which fires before Alpine hydrates the DOM, so this works regardless of <script> load order
// relative to the Alpine CDN tag (as long as this file is also present before DOMContentLoaded).
document.addEventListener('alpine:init', () => {
  // cert: the certification currently open (null on the home screen); tool: 'hub' or a TOOLS id.
  Alpine.store('ui', {
    cert: null,
    certInfo: null,
    tool: 'home',
    params: [],
    tools: [],
    nav: [],
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

  // Test progress per question. A question is unseen, in the right queue or in the wrong queue,
  // never in two. A miss sends it to the wrong queue (and back there from the right queue); two
  // correct answers in a row get it out of the wrong queue and into the right one.
  Alpine.store('questionQueue', {
    KEY: 'fabric_question_queue',
    NEEDED: 2,
    data: JSON.parse(localStorage.getItem('fabric_question_queue') || '{}'),
    save() { localStorage.setItem(this.KEY, JSON.stringify(this.data)); },
    record(id, correct) {
      const e = this.data[id];
      if (!e) this.data[id] = correct ? { q: 'right' } : { q: 'wrong', streak: 0 };
      else if (e.q === 'right') { if (!correct) this.data[id] = { q: 'wrong', streak: 0 }; }
      else if (!correct) e.streak = 0;
      else if (++e.streak >= this.NEEDED) this.data[id] = { q: 'right' };
      this.save();
    },
    state(id) { return this.data[id] ? this.data[id].q : 'unseen'; },
    streak(id) { return this.data[id] && this.data[id].q === 'wrong' ? this.data[id].streak : 0; },
    // Counts over a list of question ids (ids no longer in the bank are ignored).
    counts(ids) {
      const c = { total: ids.length, right: 0, wrong: 0, unseen: 0 };
      ids.forEach((id) => { c[this.state(id)]++; });
      return c;
    },
    reset(ids) {
      ids.forEach((id) => { delete this.data[id]; });
      this.save();
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
    // Card ids: DP-600 cards start with 'dp600-fc-'; everything else is the DP-700 deck.
    masteredCount(certId) {
      return Object.keys(this.data).filter((id) => {
        if (this.data[id] !== 'got_it') return false;
        return certId === 'dp600' ? id.startsWith('dp600-fc-') : !id.startsWith('dp600-fc-');
      }).length;
    },
  });

  Alpine.store('examHistory', {
    sessions: JSON.parse(localStorage.getItem('fabric_exam_history') || '[]'),
    add(session) {
      this.sessions.unshift(session);
      if (this.sessions.length > 50) this.sessions = this.sessions.slice(0, 50);
      localStorage.setItem('fabric_exam_history', JSON.stringify(this.sessions));
    },
    // Clears only the given certification's sessions.
    clear(certId) {
      this.sessions = this.sessions.filter((s) => !this.forCert(certId).includes(s));
      localStorage.setItem('fabric_exam_history', JSON.stringify(this.sessions));
    },
    // Sessions store the cert as 'DP-600' (uppercase code); callers pass the id ('dp600').
    forCert(certId) {
      return this.sessions.filter((s) => String(s.cert).toLowerCase().replace('-', '') === certId);
    },
    averageScore(certId) {
      const list = this.forCert(certId);
      if (list.length === 0) return 0;
      return Math.round(list.reduce((sum, s) => sum + s.pct, 0) / list.length);
    },
    passRate(certId) {
      const list = this.forCert(certId);
      if (list.length === 0) return 0;
      return Math.round((list.filter((s) => s.pass).length / list.length) * 100);
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
