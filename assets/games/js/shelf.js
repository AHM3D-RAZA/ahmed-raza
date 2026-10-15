// Section 3, arcade shelf: pick a cartridge, then play / watch / download. Data: SHELF in content.js.
function initShelf() {
  const carts = $('#carts'); let cur = 0;
  const button = (label, cls) => { const b = document.createElement('button'); b.className = 'btn ' + cls; b.textContent = label; return b; };
  function select(i) {
    cur = i; const g = SHELF[i];
    carts.innerHTML = SHELF.map((c, k) => `<button class="cart" data-i="${k}" aria-pressed="${k === i}" style="background:${c.color};--r:${c.tilt}deg"><span class="mono s">${c.tag}</span><b>${c.name}</b></button>`).join('');
    const title = `<div class="title">${g.name}</div>`;
    $('#screen-in').innerHTML = title; $('#s-blurb').textContent = g.blurb; $('#s-meta').textContent = g.meta;
    const acts = $('#s-actions'); acts.innerHTML = '';
    if (g.play) {
      let on = false; const label = g.play.type === 'video' ? 'Watch the clip' : 'Play in browser'; const b = button(label, 'gold');
      b.onclick = () => { on = !on; b.textContent = on ? 'Eject' : label; $('#screen-in').innerHTML = on ? media(g.play) : title; };
      acts.append(b);
    }
    if (g.download) { const a = button('Download APK', 'light'); a.onclick = () => (location.href = g.download); acts.append(a); }
    if (!g.play && !g.download) { const b = button('Coming soon', 'gold'); b.disabled = true; acts.append(b); }
  }
  carts.addEventListener('click', (e) => { const c = e.target.closest('.cart'); if (c) select(+c.dataset.i); });
  select(0);
}
