// Section 1, hero: the pigeon follows the cursor and the city shifts with it.
function initHero() {
  $('#role').textContent = SITE.role; $('#tagline').textContent = SITE.tagline;
  const hero = $('#hero'), pg = $('#pigeon'), bubble = $('#bubble');
  const layers = [...hero.querySelectorAll('.layer')];
  const lines = ['coo.', 'no. this is a portfolio.', 'okay. one more.', '...coo.']; let n = 0;
  pg.innerHTML = PIGEON;
  function place(x, y) {
    const px = Math.max(10, Math.min(hero.clientWidth - 150, x - 70)), py = Math.max(100, Math.min(hero.clientHeight - 200, y - 60));
    pg.style.left = px + 'px'; pg.style.top = py + 'px';
    bubble.style.left = px + 110 + 'px'; bubble.style.top = py - 46 + 'px';
    layers.forEach((l) => l.style.transform = `translateX(${(hero.clientWidth / 2 - x) * l.dataset.depth}px)`);
  }
  place(hero.clientWidth * 0.72, 330);
  hero.addEventListener('pointermove', (e) => { const r = hero.getBoundingClientRect(); place(e.clientX - r.left, e.clientY - r.top); });
  pg.addEventListener('click', () => { $('#hint').hidden = true; bubble.hidden = false; bubble.textContent = lines[n++ % lines.length]; });
}
