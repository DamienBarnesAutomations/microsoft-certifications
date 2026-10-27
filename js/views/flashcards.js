// 3D Flashcards view. DP-700 decks are organised by module; certifications with a skills outline
// (DP-600) are organised by outline topic with the same picker test mode uses.
const flashState = {
  deck: [],
  currentIdx: 0,
  flipped: false,
  filters: { module: 'all', type: 'all', shuffle: true },
  showUnlearned: false,
};

function initFlashcards() {
  const container = document.getElementById('view-flashcards');

  container.innerHTML = `
    <h1>${Alpine.store('ui').certInfo.code} Flashcards</h1>

    <div class="glass-panel" style="width: 100%; margin-bottom: 24px;">
      <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: flex-end;">
        <div id="flash-filter-block" style="flex: 1 1 100%; min-width: 0;"></div>
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
        <button id="btn-flash-shuffle" class="btn btn-secondary">🔀 On</button>
        <button id="btn-flash-reset" class="btn btn-danger btn-sm" style="border: 1px solid var(--color-danger); height: 42px;">Reset</button>
      </div>
    </div>

    <div id="flash-lock-note"></div>

    <div class="flashcards-layout">
      <div style="width:100%; display: flex; align-items:center; gap: 16px; margin-bottom: 12px;">
        <div class="progress-bar-container" style="flex:1; height: 8px;">
          <div class="progress-bar-fill" id="flash-progress-fill"></div>
        </div>
        <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-secondary);" id="flash-progress-text">0 / 0</div>
      </div>

      <div style="display: flex; gap: 16px; font-size: 0.8rem; margin-bottom: 16px; color: var(--text-muted); flex-wrap: wrap;">
        <span>✅ Mastered: <strong id="flash-cnt-mastered" style="color: var(--color-success);">0</strong></span>
        <span>🟡 Review: <strong id="flash-cnt-almost" style="color: var(--color-warning);">0</strong></span>
        <span>❌ Not Yet: <strong id="flash-cnt-notyet" style="color: var(--color-danger);">0</strong></span>
      </div>

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
              <div style="text-align: center; font-size: 0.8rem; color: var(--text-muted); margin-top: 12px;">Tap or press Space to flip</div>
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

  renderFlashcardFilters();
  document.getElementById('flash-type-filter').onchange = buildFlashcardDeck;

  const shuffleBtn = document.getElementById('btn-flash-shuffle');
  shuffleBtn.onclick = () => {
    flashState.filters.shuffle = !flashState.filters.shuffle;
    shuffleBtn.textContent = flashState.filters.shuffle ? '🔀 On' : '🔀 Off';
    buildFlashcardDeck();
  };

  document.getElementById('btn-flash-reset').onclick = () => {
    if (confirm('Are you sure you want to reset all flashcard mastery records? This cannot be undone.')) {
      Alpine.store('flashcardProgress').reset();
      updateFlashcardProgressUI();
      renderFlashcard();
    }
  };

  setupFlashcardKeyboardControls();
  setupFlashcardSwipeGestures();

  buildFlashcardDeck();
}

// Module select for decks organised by module (DP-700); topic picker for decks with an outline.
function renderFlashcardFilters() {
  const block = document.getElementById('flash-filter-block');
  const cert = currentCertId();
  const outline = DATA.getOutline(cert);

  if (!outline) {
    block.innerHTML = `<div class="field"><label class="field-label">Module</label><select id="flash-mod-filter"><option value="all">All Modules</option></select></div>`;
    const modFilter = document.getElementById('flash-mod-filter');
    DATA.getFlashcardModules(cert).forEach((m, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = `${m.module}: ${m.title}`;
      modFilter.appendChild(opt);
    });
    modFilter.onchange = buildFlashcardDeck;
    return;
  }

  // The picker is long, so it sits in a collapsible panel (closed on phones) to keep the card in view.
  block.innerHTML = `
    <details class="flash-filter"${window.innerWidth >= 768 ? ' open' : ''}>
      <summary id="flash-filter-summary">Choose topics: everything</summary>
      <div id="flash-picker"></div>
    </details>`;
  const picker = document.getElementById('flash-picker');
  const summary = document.getElementById('flash-filter-summary');
  const cards = DATA.getOutlineFlashcards(cert);
  renderTopicPicker(picker, outline, (node) => cards.filter((c) => DATA.skillInNode(c.skill, node)).length,
    'Topics to study', () => {
      const n = pickedTopics(picker).length;
      summary.textContent = n ? `Choose topics: ${n} selected` : 'Choose topics: everything';
      buildFlashcardDeck();
    });
}

function buildFlashcardDeck() {
  const typeVal = document.getElementById('flash-type-filter').value;
  const cert = currentCertId();
  const outline = DATA.getOutline(cert);

  flashState.deck = [];

  if (outline) {
    const picked = pickedTopics(document.getElementById('flash-picker'));
    const only = Alpine.store('ui').params[0];
    const gated = DATA.getLessons(cert).length > 0 && !flashState.showUnlearned && !only;
    DATA.getOutlineFlashcards(cert).forEach((c) => {
      if (only && c.skill !== only) return;
      if (typeVal !== 'all' && c.type !== typeVal) return;
      if (gated && !isLessonLearned(cert, c.skill)) return;
      if (picked.length && !picked.some((n) => DATA.skillInNode(c.skill, n))) return;
      const topicId = c.skill.split('.').slice(0, 2).join('.');
      flashState.deck.push({ ...c, moduleName: outline.titles[topicId], topic: outline.titles[c.skill] });
    });
  } else {
    const modVal = document.getElementById('flash-mod-filter').value;
    DATA.getFlashcardModules(cert).forEach((mod, modIdx) => {
      if (modVal !== 'all' && parseInt(modVal) !== modIdx) return;
      mod.cards.forEach((c) => {
        if (typeVal !== 'all' && c.type !== typeVal) return;
        flashState.deck.push({ ...c, moduleName: mod.module, moduleTitle: mod.title });
      });
    });
  }

  renderFlashcardLockNote(cert, outline);

  if (flashState.filters.shuffle) {
    for (let i = flashState.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [flashState.deck[i], flashState.deck[j]] = [flashState.deck[j], flashState.deck[i]];
    }
  }

  flashState.currentIdx = 0;
  flashState.flipped = false;

  updateFlashcardProgressUI();
  renderFlashcard();
}

function renderFlashcard() {
  const card = flashState.deck[flashState.currentIdx];
  const flipContainer = document.getElementById('active-flashcard');

  if (!flipContainer) return;

  flipContainer.classList.remove('flipped');
  flashState.flipped = false;

  if (!card) {
    document.getElementById('flash-card-front-text').textContent = 'No cards match current filters. Try changing module or type options.';
    document.getElementById('flash-card-back-text').innerHTML = '';
    document.getElementById('flash-card-counter').textContent = '0 / 0';
    document.getElementById('flash-card-badge-front').style.display = 'none';
    document.getElementById('flash-card-badge-back').style.display = 'none';
    document.getElementById('btn-flash-prev').disabled = true;
    document.getElementById('btn-flash-next').disabled = true;
    document.querySelectorAll('.rating-btn').forEach((btn) => (btn.disabled = true));
    return;
  }

  document.getElementById('flash-card-badge-front').style.display = 'inline-block';
  document.getElementById('flash-card-badge-back').style.display = 'inline-block';

  document.getElementById('flash-card-badge-front').className = `card-badge badge-${card.type}`;
  document.getElementById('flash-card-badge-front').textContent = card.type.toUpperCase();
  document.getElementById('flash-card-badge-back').className = `card-badge badge-${card.type}`;
  document.getElementById('flash-card-badge-back').textContent = card.type.toUpperCase();

  document.getElementById('flash-card-module-front').textContent = card.moduleName;
  document.getElementById('flash-card-module-back').textContent = `${card.moduleName} • ${card.topic}`;

  document.getElementById('flash-card-counter').textContent = `${flashState.currentIdx + 1} / ${flashState.deck.length}`;

  document.getElementById('flash-card-front-text').textContent = card.front;
  document.getElementById('flash-card-back-text').innerHTML = card.back;

  const prevRating = Alpine.store('flashcardProgress').data[card.id];
  document.querySelectorAll('.rating-btn').forEach((btn) => {
    btn.disabled = false;
    btn.classList.remove('active');
  });

  if (prevRating) {
    const cls = prevRating === 'got_it' ? 'mastered' : prevRating === 'almost' ? 'almost' : 'notyet';
    const activeBtn = document.querySelector(`.rating-btn.${cls}`);
    if (activeBtn) activeBtn.classList.add('active');
  }

  document.getElementById('btn-flash-prev').disabled = flashState.currentIdx === 0;
  document.getElementById('btn-flash-next').disabled = flashState.currentIdx === flashState.deck.length - 1;
}

function flipActiveFlashcard() {
  const flipContainer = document.getElementById('active-flashcard');
  if (flipContainer && flashState.deck.length > 0) {
    flipContainer.classList.toggle('flipped');
    flashState.flipped = !flashState.flipped;
  }
}

function rateActiveFlashcard(rating) {
  const card = flashState.deck[flashState.currentIdx];
  if (!card) return;

  Alpine.store('flashcardProgress').rate(card.id, rating);
  updateFlashcardProgressUI();

  document.querySelectorAll('.rating-btn').forEach((btn) => btn.classList.remove('active'));
  const newRating = Alpine.store('flashcardProgress').data[card.id];
  if (newRating) {
    const cls = newRating === 'got_it' ? 'mastered' : newRating === 'almost' ? 'almost' : 'notyet';
    const activeBtn = document.querySelector(`.rating-btn.${cls}`);
    if (activeBtn) activeBtn.classList.add('active');
  }


  if (flashState.flipped && flashState.currentIdx < flashState.deck.length - 1) {
    setTimeout(() => navFlashcard(1), 300);
  }
}

function navFlashcard(direction) {
  const nextIdx = flashState.currentIdx + direction;
  if (nextIdx >= 0 && nextIdx < flashState.deck.length) {
    flashState.currentIdx = nextIdx;

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
  const total = flashState.deck.length;
  if (total === 0) {
    document.getElementById('flash-progress-fill').style.width = '0%';
    document.getElementById('flash-progress-text').textContent = '0 / 0';
    return;
  }

  let ratedCount = 0, mastered = 0, almost = 0, notyet = 0;
  const progress = Alpine.store('flashcardProgress').data;

  flashState.deck.forEach((c) => {
    const r = progress[c.id];
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
    if (Alpine.store('ui').tool !== 'flashcards') return;
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

  document.removeEventListener('keydown', window.flashcardKeyBinder);
  window.flashcardKeyBinder = handler;
  document.addEventListener('keydown', handler);
}

function setupFlashcardSwipeGestures() {
  const card = document.getElementById('active-flashcard');
  if (!card) return;

  let startX = 0, startY = 0;

  card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  card.addEventListener('touchend', (e) => {
    const diffX = e.changedTouches[0].clientX - startX;
    const diffY = e.changedTouches[0].clientY - startY;

    if (Math.abs(diffX) > 60 && Math.abs(diffY) < 40) {
      if (diffX < 0) navFlashcard(1);
      else navFlashcard(-1);
    }
  }, { passive: true });
}

// Explains why some cards are hidden (their lesson is unread) or which single skill is shown.
function renderFlashcardLockNote(cert, outline) {
  const note = document.getElementById('flash-lock-note');
  if (!note) return;
  const only = Alpine.store('ui').params[0];
  if (only && outline) {
    note.innerHTML = `<div class="flash-note">Showing cards for <b>${outline.titles[only] || only}</b>. <a href="#/${cert}/flashcards">Show all unlocked cards</a> · <a href="#/${cert}/learn/${only}">Open lesson</a></div>`;
    return;
  }
  if (!DATA.getLessons(cert).length) { note.innerHTML = ''; return; }
  const cards = DATA.getOutlineFlashcards(cert);
  const unlocked = cards.filter((c) => isLessonLearned(cert, c.skill)).length;
  note.innerHTML = `<div class="flash-note">${flashState.showUnlearned ? 'Showing every card.' : unlocked + ' of ' + cards.length + ' cards unlocked by lessons you have learned.'}
    <a href="#/${cert}/learn">Open lessons</a> ·
    <label><input type="checkbox" id="flash-unlearned" ${flashState.showUnlearned ? 'checked' : ''}> include unlearned skills</label></div>`;
  document.getElementById('flash-unlearned').onchange = (e) => { flashState.showUnlearned = e.target.checked; buildFlashcardDeck(); };
}
