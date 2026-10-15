// Section 1, hero: the stack map. Hover a node to light up what connects to it. Data: STACK_MAP in content.js.
function initHero() {
  const { nodes, edges } = STACK_MAP;
  const map = $('#map'), svg = $('#map-lines');
  $('#pigeon-mini').innerHTML = PIGEON;

  svg.innerHTML = edges.map(([a, b]) => `<line class="flow" x1="${nodes[a][1]}" y1="${nodes[a][2]}" x2="${nodes[b][1]}" y2="${nodes[b][2]}"></line>`).join('');
  map.insertAdjacentHTML('beforeend', nodes.map((n, i) => `<div class="node-pos" style="left:${n[1]}%;top:${n[2]}%"><button class="node" data-i="${i}" style="animation-delay:${i * 0.4}s">${n[0]}</button></div>`).join(''));
  const buttons = [...map.querySelectorAll('.node')], lines = [...svg.children];

  function show(h) {
    const near = new Set([h]);
    edges.forEach(([a, b]) => { if (a === h) near.add(b); if (b === h) near.add(a); });
    buttons.forEach((b, i) => { b.classList.toggle('on', i === h); b.classList.toggle('near', near.has(i)); });
    lines.forEach((l, k) => l.classList.toggle('lit', edges[k][0] === h || edges[k][1] === h));
    $('#map-name').textContent = nodes[h][0].toUpperCase() + ' / USED IN';
    $('#map-used').textContent = nodes[h][3];
  }
  const onPoint = (e) => { const b = e.target.closest('.node'); if (b) show(+b.dataset.i); };
  map.addEventListener('pointerover', onPoint);
  map.addEventListener('focusin', onPoint);
  show(1);
}
