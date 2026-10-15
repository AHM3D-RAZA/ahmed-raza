// Section 4, pigeon city: the street scrolls, the pigeon follows the mouse,
// and a person can only be hit while the pigeon is right over them.
function initCity() {
  const TOWERS = 16, PEOPLE = 5, REACH = 80; // REACH = how close (px) the pigeon must be to hit someone
  const COLORS = ['#2b2124', '#8f4b3e', '#d9855a', '#6d7488'];
  const COATS = ['#fff4de', '#7bbf9a', '#ffd98a', '#8c93a8', '#f2a65a'], SKINS = ['#f0c9a0', '#c98f64', '#8d5a3b'], HAIRS = ['#2b2124', '#6d4a2f', '#e5483a'];
  const section = $('#city'), world = $('#world'), flyer = $('#flyer');
  let seed = 7, hits = [], folkEls = [];

  flyer.innerHTML = PIGEON;
  $('#city-note-label').textContent = CITY.note.label;
  $('#city-note').textContent = CITY.note.text;

  // buildings are created once; shuffling only resizes them, so the change animates
  world.innerHTML = `<div class="towers">${'<div class="tower"></div>'.repeat(TOWERS * 2)}</div><div class="street"></div><div class="lane"></div><div id="crowd"></div>`;
  const towers = [...world.querySelectorAll('.tower')], crowd = $('#crowd');

  const person = (f, i, copy) => `<button class="folk" data-i="${i}" aria-label="Pedestrian ${i + 1}" style="left:${f.x + copy * 1280}px;bottom:${f.d}px;z-index:${50 - f.d}">
    <span class="tag"></span><svg width="30" height="66" viewBox="0 0 30 66"><ellipse cx="15" cy="64" rx="13" ry="3" fill="rgba(0,0,0,.35)"/>
    <rect class="l1" x="9" y="40" width="5" height="22" rx="2" fill="#2b2124"/><rect class="l2" x="16" y="40" width="5" height="22" rx="2" fill="#2b2124"/>
    <rect x="1" y="22" width="5" height="17" rx="2.5" fill="${f.coat}" stroke="#2b2124" stroke-width="2"/><rect x="24" y="22" width="5" height="17" rx="2.5" fill="${f.coat}" stroke="#2b2124" stroke-width="2"/>
    <rect x="7" y="20" width="16" height="25" rx="5" fill="${f.coat}" stroke="#2b2124" stroke-width="2"/>
    <circle cx="15" cy="12" r="9" fill="${f.skin}" stroke="#2b2124" stroke-width="2"/><path d="M6 11 Q15 -2 24 11 Z" fill="${f.hair}"/><ellipse class="splat" cx="13" cy="6" rx="6" ry="3.5" fill="#fff"/></svg></button>`;

  function build() {
    const r = rng(seed), pick = (list) => list[Math.floor(r() * list.length)];
    const sizes = Array.from({ length: TOWERS }, () => ({ h: 110 + Math.floor(r() * 220), c: pick(COLORS) }));
    towers.forEach((t, i) => { const s = sizes[i % TOWERS]; t.style.height = s.h + 'px'; t.style.background = `radial-gradient(circle,#ffd37a 2px,transparent 2.5px) 0 0/18px 26px,${s.c}`; });
    const folks = Array.from({ length: PEOPLE }, (_, i) => ({ x: 90 + i * 240 + Math.floor(r() * 90), d: 8 + Math.floor(r() * 32), coat: pick(COATS), skin: pick(SKINS), hair: pick(HAIRS) }));
    const sx = 560 + Math.floor(r() * 300);
    crowd.innerHTML = [0, 1].map((copy) => `<div class="sling" aria-hidden="true" style="left:${sx + copy * 1280}px"><i></i><b></b><span class="peb"></span></div>` + folks.map((f, i) => person(f, i, copy)).join('')).join('');
    folkEls = [...crowd.querySelectorAll('.folk')];
    hits = Array(PEOPLE).fill(false); showScore();
  }

  function showScore() {
    const n = hits.filter(Boolean).length;
    $('#score').textContent = `SCORE ${n} / ${PEOPLE}`;
    $('#city-msg').textContent = n === PEOPLE ? CITY.done : CITY.hint;
  }

  // a hit marks every copy of that person (the street is drawn twice to loop)
  crowd.addEventListener('click', (e) => {
    const el = e.target.closest('.folk'); if (!el || !el.classList.contains('near')) return;
    const i = +el.dataset.i; if (hits[i]) return;
    hits[i] = true; folkEls.filter((f) => +f.dataset.i === i).forEach((f) => f.classList.add('hit')); showScore();
  });

  section.addEventListener('pointermove', (e) => { flyer.style.top = clamp(e.clientY - section.getBoundingClientRect().top - 40, 310, 470) + 'px'; });
  $('#shuffle').onclick = () => { seed++; build(); };

  // every frame: who is under the pigeon?
  (function tick() {
    const p = flyer.getBoundingClientRect(), pc = p.left + p.width / 2;
    folkEls.forEach((f) => { const b = f.getBoundingClientRect(); f.classList.toggle('near', Math.abs(b.left + b.width / 2 - pc) < REACH); });
    requestAnimationFrame(tick);
  })();
  build();
}
