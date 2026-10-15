// Preview: step-by-step walkthrough of an ML project. Steps come from `pipeline` in content.js.
(function () {
  const stepOf = {}; // remembers the step per project
  PREVIEWS.pipeline = function (el, project) {
    const p = project.pipeline;
    function draw() {
      const i = stepOf[project.id] || 0;
      el.innerHTML = `<div class="pv"><p class="mono dim">${p.title} / HOW IT WORKS</p>
        <div class="chips">${p.steps.map((s, k) => `<button class="pill" data-step="${k}" aria-pressed="${k === i}">${String(k + 1).padStart(2, '0')} ${s[0]}</button>`).join('')}</div>
        <div class="plbox"><h4>${p.steps[i][0]}</h4><p>${p.steps[i][1]}</p></div>
        <button class="btn line sm" data-next>Next step &rarr;</button></div>`;
    }
    el.onclick = (e) => {
      const s = e.target.closest('[data-step]'), n = e.target.closest('[data-next]');
      if (s) stepOf[project.id] = +s.dataset.step;
      else if (n) stepOf[project.id] = ((stepOf[project.id] || 0) + 1) % p.steps.length;
      else return;
      draw();
    };
    draw();
  };
})();
