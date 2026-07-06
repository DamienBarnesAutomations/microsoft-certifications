// Leitner-box spaced-review scheduling. Pure logic, no DOM — testable standalone with Node.
// Data model persisted at localStorage key SRS_STORAGE_KEY:
//   { [questionId]: { box: 1-5|'mastered', nextDue: ISOString, lastSeen: ISOString, cert: string } }

const SRS_STORAGE_KEY = 'fabric_srs_v1';

const BOX_INTERVALS_DAYS = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };
const MAX_BOX = 5;

function loadSrsState() {
  try {
    return JSON.parse(localStorage.getItem(SRS_STORAGE_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function saveSrsState(srsState) {
  localStorage.setItem(SRS_STORAGE_KEY, JSON.stringify(srsState));
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function computeNextDue(box, from = new Date()) {
  if (box === 'mastered') return null;
  const days = BOX_INTERVALS_DAYS[box] || 1;
  return addDays(from, days).toISOString();
}

// Records the outcome of answering a question and returns the updated entry.
// wasCorrect: boolean. cert: string (e.g. 'dp300'). Mutates and persists srsState.
function recordAnswer(srsState, questionId, wasCorrect, cert) {
  const now = new Date();
  const existing = srsState[questionId];

  let nextBox;
  if (!existing) {
    // First-ever exposure: correct answers skip the 1-day box since it's already known.
    nextBox = wasCorrect ? 2 : 1;
  } else if (wasCorrect) {
    nextBox = existing.box === 'mastered'
      ? 'mastered'
      : (existing.box >= MAX_BOX ? 'mastered' : existing.box + 1);
  } else {
    nextBox = 1;
  }

  const entry = {
    box: nextBox,
    nextDue: computeNextDue(nextBox, now),
    lastSeen: now.toISOString(),
    cert,
  };
  srsState[questionId] = entry;
  saveSrsState(srsState);
  return entry;
}

// Returns catalog questions whose srs entry is due (nextDue <= now), optionally filtered by cert.
// catalog: array of normalized question objects with a stable `id` and `cert` field (see data.js).
function getDueQuestions(catalog, srsState, certFilter = 'all') {
  const now = Date.now();
  return catalog.filter((q) => {
    if (certFilter !== 'all' && q.cert !== certFilter) return false;
    const entry = srsState[q.id];
    if (!entry || entry.box === 'mastered') return false;
    return new Date(entry.nextDue).getTime() <= now;
  });
}

function getDueCount(catalog, srsState, certFilter = 'all') {
  return getDueQuestions(catalog, srsState, certFilter).length;
}

function getUpcomingCount(catalog, srsState, withinDays = 3, certFilter = 'all') {
  const now = Date.now();
  const horizon = now + withinDays * 24 * 60 * 60 * 1000;
  return catalog.filter((q) => {
    if (certFilter !== 'all' && q.cert !== certFilter) return false;
    const entry = srsState[q.id];
    if (!entry || entry.box === 'mastered') return false;
    const due = new Date(entry.nextDue).getTime();
    return due > now && due <= horizon;
  }).length;
}

const SRS = {
  STORAGE_KEY: SRS_STORAGE_KEY,
  loadSrsState,
  saveSrsState,
  recordAnswer,
  computeNextDue,
  getDueQuestions,
  getDueCount,
  getUpcomingCount,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SRS;
}
if (typeof window !== 'undefined') {
  window.SRS = SRS;
}
