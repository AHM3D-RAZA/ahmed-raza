// Preview: PSF Project Tracker. Tick subtasks and the task moves between columns on its own.
(function () {
  const TASKS = [['Design the schema', ['ERD drawn', 'Tables created']], ['Invite members', ['Email template', 'Join flow', 'Role check']],
    ['Board view', ['Columns', 'Cards']], ['Add subtasks', ['Data model', 'UI']], ['Audit log', ['Events', 'Viewer']]];
  const COLUMNS = ['TO DO', 'IN PROGRESS', 'DONE'];
  const done = [[true, true], [true, false, false], [false, false], [false, false], [false, false]];
  let view = 'board', sel = 1; // kept here so progress survives switching projects

  const count = (i) => done[i].filter(Boolean).length;
  const column = (i) => (count(i) === 0 ? 0 : count(i) === done[i].length ? 2 : 1);

  PREVIEWS.psf = function (el) {
    function draw() {
      const board = COLUMNS.map((name, c) => `<div class="col"><p class="mono dim">${name}</p>${TASKS.map((t, i) => column(i) === c
        ? `<button class="task ${i === sel ? 'sel' : ''}" data-act="task" data-i="${i}">${t[0]}<small class="mono">${count(i)}/${done[i].length} subtasks</small></button>` : '').join('')}</div>`).join('');
      const list = TASKS.map((t, i) => `<button class="line-row ${i === sel ? 'sel' : ''}" data-act="task" data-i="${i}"><span>${t[0]}</span><span class="mono">${['To do', 'In progress', 'Done'][column(i)]}</span></button>`).join('');
      const pct = Math.round((100 * count(sel)) / done[sel].length);
      el.innerHTML = `<div class="pv"><div class="pv-top"><span class="mono dim">PSF Prep / Workspace</span>
        <span class="tabs"><button class="pill" data-act="view" data-v="board" aria-pressed="${view === 'board'}">Board</button><button class="pill" data-act="view" data-v="list" aria-pressed="${view === 'list'}">List</button></span></div>
        <div class="${view === 'board' ? 'board' : 'list'}">${view === 'board' ? board : list}</div>
        <div class="detail"><div class="detail-head"><b>${TASKS[sel][0]}</b><span class="mono sun">${count(sel)} / ${done[sel].length} subtasks</span></div>
        <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
        ${TASKS[sel][1].map((s, j) => `<button class="sub ${done[sel][j] ? 'on' : ''}" data-act="sub" data-j="${j}" aria-pressed="${done[sel][j]}"><span class="box"></span>${s}</button>`).join('')}</div></div>`;
    }
    el.onclick = (e) => {
      const b = e.target.closest('[data-act]'); if (!b) return;
      if (b.dataset.act === 'view') view = b.dataset.v;
      if (b.dataset.act === 'task') sel = +b.dataset.i;
      if (b.dataset.act === 'sub') done[sel][+b.dataset.j] = !done[sel][+b.dataset.j];
      draw();
    };
    draw();
  };
})();
