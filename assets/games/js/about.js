// Section 5, About: text and inventory come from ABOUT in content.js.
function initAbout() {
  const COLORS = ['#ffd98a', '#8c93a8', '#d9855a', '#fff4de'], slots = $('#slots');
  $('#about-intro').textContent = ABOUT.intro;
  $('#quests').insertAdjacentHTML('beforeend', ABOUT.quests.map(([when, text]) => `<div class="quest"><span class="mono">${when}</span><span>${text}</span></div>`).join(''));

  function select(i) {
    slots.innerHTML = ABOUT.tools.map((t, k) => `<button class="slot" data-i="${k}" aria-pressed="${k === i}" aria-label="${t.name}" style="background:${COLORS[k % 4]}">${t.glyph}</button>`).join('');
    $('#item-desc').innerHTML = `<div class="name">${ABOUT.tools[i].name}</div>${ABOUT.tools[i].desc}<span class="cursor"> _</span>`;
  }
  slots.addEventListener('click', (e) => { const s = e.target.closest('.slot'); if (s) select(+s.dataset.i); });
  select(0);
}
