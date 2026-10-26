// Shared picker for certifications that have a skills outline: each domain is a header with its
// topics (one level down) as selectable chips. Ticking a topic includes every skill beneath it;
// ticking a domain ticks all of its topics. Used by test mode and flashcards.
//   renderTopicPicker(block, outline, countOf, label, onChange)  countOf(nodeId) -> item count
//   pickedTopics(block) -> ['1.1', '2.3'] (empty = nothing ticked = everything)
function renderTopicPicker(block, outline, countOf, label, onChange) {
  block.innerHTML = `
    <div class="field-label">${label} <span class="topic-hint">(none ticked = everything)</span></div>
    <div class="topic-picker">
      ${outline.domains.filter((d) => d.inOutline !== false).map((d) => `
        <div class="topic-domain">
          <label class="topic-row topic-domain-head">
            <input type="checkbox" data-domain="${d.id}" ${countOf(d.id) ? '' : 'disabled'}>
            <span class="topic-title">${d.title}${d.weight ? ` <span class="topic-weight">${d.weight}</span>` : ''}</span>
            <span class="topic-count">${countOf(d.id)}</span>
          </label>
          <div class="topic-chips">
            ${d.topics.map((t) => `
              <label class="topic-chip">
                <input type="checkbox" data-topic="${t.id}" data-parent="${d.id}" ${countOf(t.id) ? '' : 'disabled'}>
                <span>${t.title}</span><span class="topic-count">${countOf(t.id)}</span>
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
