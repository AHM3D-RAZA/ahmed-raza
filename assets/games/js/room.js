// Section 2, The Room: the mouse is the torch. Cards come from HORROR in content.js.
function initRoom() {
  $('#room-cards').innerHTML = HORROR.map((g) => `<article class="card"><div class="frame">${media(g.media, '[ gameplay clip ]')}</div>
    <h3>${g.name}</h3><p>${g.blurb}</p><div class="meta"><span>${g.tags}</span>${g.link ? `<a href="${g.link.href}">${g.link.label}</a>` : ''}</div></article>`).join('');
  const room = $('#room'), lights = $('#lights');
  room.addEventListener('pointermove', (e) => { const r = room.getBoundingClientRect(); room.style.setProperty('--lx', e.clientX - r.left + 'px'); room.style.setProperty('--ly', e.clientY - r.top + 'px'); });
  const setLit = (on) => { room.classList.toggle('lit', on); lights.textContent = on ? 'Lights off' : 'Switch the lights on'; };
  lights.onclick = () => setLit(!room.classList.contains('lit'));
  if (matchMedia('(hover: none)').matches) setLit(true); // no mouse on phones, so lights start on
}
