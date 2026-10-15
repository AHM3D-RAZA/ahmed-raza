// Section 2, selected work: filter buttons, project list, preview window, details. Data: PROJECTS in content.js.
function initWork() {
  const FILTERS = [['all', 'All'], ['web', 'Web'], ['ml', 'Machine learning'], ['client', 'Client work']];
  let filter = 'all', sel = PROJECTS[0].id;

  function draw() {
    const visible = PROJECTS.filter((p) => filter === 'all' || p.tags.includes(filter));
    const cur = visible.find((p) => p.id === sel) || visible[0];
    sel = cur.id;
    $('#filters').innerHTML = FILTERS.map(([k, label]) => `<button class="pill" data-filter="${k}" aria-pressed="${k === filter}">${label}</button>`).join('');
    $('#rows').innerHTML = visible.map((p, i) => `<button class="row" data-id="${p.id}" aria-pressed="${p.id === sel}">
      <span class="mono dim">${String(i + 1).padStart(2, '0')}</span><span><b>${p.name}</b><small class="mono dim">${p.kind}</small></span><span class="arrow">&rarr;</span></button>`).join('');
    show(cur);
  }

  function show(p) {
    $('#url').textContent = p.url;
    const open = PREVIEWS[p.preview], screen = $('#preview');
    $('#live').textContent = open ? 'INTERACTIVE PREVIEW' : '';
    screen.onclick = null;
    if (open) open(screen, p); else screen.innerHTML = '<div class="ph">[ screenshots here ]</div>';
    $('#info').innerHTML = `<p class="mono sun">${p.badge}</p><h3>${p.name}</h3><p class="lead">${p.summary}</p>
      <ul>${p.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      <div class="chips">${p.stack.map((s) => `<span class="chip">${s}</span>`).join('')}</div>
      <div class="links mono">${p.links.map(([l, href]) => `<a href="${href}">${l} &#8599;</a>`).join('')}</div>
      <p class="mono dim note">${p.note}</p>`;
  }

  $('#filters').addEventListener('click', (e) => { const b = e.target.closest('[data-filter]'); if (b) { filter = b.dataset.filter; draw(); } });
  $('#rows').addEventListener('click', (e) => { const b = e.target.closest('[data-id]'); if (b) { sel = b.dataset.id; draw(); } });
  draw();
}
