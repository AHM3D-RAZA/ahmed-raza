// Preview: Live Network Monitor. Pick a device, simulate a failure, and an email alert is logged.
(function () {
  const DEVICES = [['FW-1', 'Firewall', 50, 8], ['R-1', 'Router', 50, 30], ['SW-1', 'Switch', 26, 56], ['SW-2', 'Switch', 74, 56],
    ['PC-1', 'Workstation', 10, 88], ['PC-2', 'Workstation', 38, 88], ['PC-3', 'Workstation', 62, 88], ['PC-4', 'Workstation', 90, 88]]; // [name, type, x%, y%]
  const LINKS = [[0, 1], [1, 2], [1, 3], [2, 4], [2, 5], [3, 6], [3, 7]]; // pairs of device positions
  const off = DEVICES.map(() => false);
  let sel = 2, log = []; // kept here so the state survives switching projects

  PREVIEWS.network = function (el) {
    function draw() {
      const d = DEVICES[sel];
      el.innerHTML = `<div class="pv"><p class="mono dim">LAB NETWORK / SAMPLE DATA</p>
        <div class="topo"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${LINKS.map(([a, b]) =>
          `<line class="${off[a] || off[b] ? 'down' : ''}" x1="${DEVICES[a][2]}" y1="${DEVICES[a][3]}" x2="${DEVICES[b][2]}" y2="${DEVICES[b][3]}"></line>`).join('')}</svg>
          ${DEVICES.map((v, i) => `<div class="pos" style="left:${v[2]}%;top:${v[3]}%"><button class="dev ${i === sel ? 'sel' : ''} ${off[i] ? 'off' : ''}" data-act="pick" data-i="${i}"><i></i>${v[0]}</button></div>`).join('')}</div>
        <div class="detail"><div class="detail-head"><b>${d[0]} (${d[1]})</b><button class="btn sm" data-act="toggle">${off[sel] ? 'Restore device' : 'Simulate failure'}</button></div>
          <p class="mono dim">${off[sel] ? 'OFFLINE' : 'ONLINE / latency ' + (2 + sel * 3) + ' ms / sample data'}</p>
          <div class="log mono dim">${log.length ? log.map((l) => `<div>${l}</div>`).join('') : 'No alerts.'}</div></div></div>`;
    }
    el.onclick = (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      if (b.dataset.act === 'pick') sel = +b.dataset.i;
      if (b.dataset.act === 'toggle') {
        off[sel] = !off[sel];
        log = [off[sel] ? `${DEVICES[sel][0]} went offline. Email alert sent.` : `${DEVICES[sel][0]} is back online.`].concat(log).slice(0, 3);
      }
      draw();
    };
    draw();
  };
})();
