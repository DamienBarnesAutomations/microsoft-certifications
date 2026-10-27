// Shared picker for certifications that have a skills outline: each domain is a header with its
// topics (one level down) as selectable chips. Ticking a topic includes every skill beneath it;
// ticking a domain ticks all of its topics. Used by test mode and flashcards.
//   renderTopicPicker(block, outline, countOf, label, onChange, progress)
//     countOf(nodeId) -> item count
//     progress (optional) { unit, of(nodeId) -> { total, good, bad, tip } } draws a bar and a
//     good/total figure on every domain and topic: good is the green part (read, right, mastered),
//     bad the red part (wrong, not yet), the rest is still to do. unit names what is counted.
//   pickedTopics(block) -> ['1.1', '2.3'] (empty = nothing ticked = everything)
function renderTopicPicker(block, outline, countOf, label, onChange, progress) {
  // Right-hand figure and bar for one node; plain item count when no progress is given.
  const stat = (id) => {
    const p = progress && progress.of(id);
    if (!p || !p.total) return `<span class="topic-count">${countOf(id)}</span>`;
    const pct = (n) => ((n || 0) / p.total * 100).toFixed(1);
    return `<span class="topic-count${p.good === p.total ? ' is-done' : ''}">${p.good === p.total ? '✓ ' : ''}${p.good}/${p.total}</span>
      <span class="topic-bar" title="${p.tip || ''}"><i class="topic-bar-good" style="width:${pct(p.good)}%"></i><i class="topic-bar-bad" style="width:${pct(p.bad)}%"></i></span>`;
  };

  block.innerHTML = `
    <div class="field-label">${label} <span class="topic-hint">(none ticked = everything)</span></div>
    ${progress ? `<div class="topic-legend">Figures and bars show ${progress.unit}.</div>` : ''}
    <div class="topic-picker">
      ${outline.domains.filter((d) => d.inOutline !== false).map((d) => `
        <div class="topic-domain">
          <label class="topic-row topic-domain-head">
            <input type="checkbox" data-domain="${d.id}" ${countOf(d.id) ? '' : 'disabled'}>
            <span class="topic-title">${d.title}${d.weight ? ` <span class="topic-weight">${d.weight}</span>` : ''}</span>
            ${stat(d.id)}
          </label>
          <div class="topic-chips">
            ${d.topics.map((t) => `
              <label class="topic-chip">
                <input type="checkbox" data-topic="${t.id}" data-parent="${d.id}" ${countOf(t.id) ? '' : 'disabled'}>
                <span>${t.title}</span>${stat(t.id)}
              </label>`).join('')}
          </div>
        </div>`).join('')}
    </div>`;

  const topicBoxes = () => [...block.querySelectorAll('input[data-topic]')];
  const syncDomains = () => {
    block.querySelectorAll('input[data-domain]').forEach((box) => {
      const kids = topicBoxes().filter((b) => b.dataset.parent === box.dataset.domain && !b.disabled);
      const ticked = kids.filter((b) => b.checked).length;
      box.checked = kids.length > 0 && ticked === kids.length;
      box.indeterminate = ticked > 0 && ticked < kids.length;
    });
  };

  block.onchange = (e) => {
    const box = e.target;
    if (box.dataset.domain) {
      topicBoxes()
        .filter((b) => b.dataset.parent === box.dataset.domain && !b.disabled)
        .forEach((b) => { b.checked = box.checked; });
    }
    syncDomains();
    onChange();
  };
}

function pickedTopics(block) {
  return [...block.querySelectorAll('input[data-topic]:checked')].map((b) => b.dataset.topic);
}
