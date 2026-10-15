// Pigeon transition between the two worlds.
// A link with the data-switch attribute loads the other world in a hidden iframe (started on hover, so it is usually ready),
// then the pigeon flies across the screen pulling that page in from the left. When it lands, the real page opens.
// Both worlds load this file. Skipped for people who prefer reduced motion.
(function () {
  const KEY = 'pigeon-switch';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PIGEON = '<svg width="140" height="100" viewBox="0 0 140 100" aria-hidden="true"><path d="M32 62 L4 76 L10 54 Z" fill="#6d7488"/><ellipse cx="70" cy="58" rx="40" ry="24" fill="#8c93a8"/><ellipse cx="98" cy="50" rx="15" ry="11" fill="#7bbf9a"/><circle cx="108" cy="40" r="15" fill="#6d7488"/><path d="M121 38 L135 42 L121 46 Z" fill="#e8b23a"/><circle cx="112" cy="37" r="3.2" fill="#2b2124"/><g class="wing"><path d="M52 54 C66 20 102 26 88 62 Z" fill="#5c6378"/></g></svg>';
  const stages = {}; // href -> hidden stage that already holds the other world

  // we arrived through a switch: the iframe already showed this page, so do not replay its intro
  if (sessionStorage.getItem(KEY)) document.documentElement.classList.add('sw-arrived');
  sessionStorage.removeItem(KEY);

  function hrefOf(a) {
    const url = new URL(a.href);
    if (location.protocol === 'file:' && url.pathname.endsWith('/')) url.pathname += 'index.html'; // folders do not open index.html on file:
    return url.href;
  }

  function preload(href) {
    if (stages[href]) return stages[href];
    const stage = document.createElement('div');
    stage.className = 'sw-stage';
    stage.innerHTML = `<div class="sw-pull"><iframe class="sw-frame" title="" tabindex="-1" aria-hidden="true" src="${href}"></iframe><div class="sw-lead"><i class="sw-rope"></i><div class="sw-bird">${PIGEON}</div></div></div>`;
    stage.querySelector('iframe').addEventListener('load', () => { stage.ready = true; if (stage.onready) stage.onready(); });
    document.documentElement.append(stage);
    return (stages[href] = stage);
  }

  const warm = (e) => { const a = e.target.closest && e.target.closest('a[data-switch]'); if (a && !reduce) preload(hrefOf(a)); };
  document.addEventListener('pointerover', warm);
  document.addEventListener('focusin', warm);

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-switch]');
    if (!a || e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    const href = hrefOf(a);
    if (reduce) { location.href = href; return; }
    const stage = preload(href);
    if (stage.classList.contains('go')) return; // already flying

    const go = () => {
      if (stage.classList.contains('go')) return;
      sessionStorage.setItem(KEY, '1');
      stage.classList.add('go');
      document.documentElement.classList.add('sw-moving');
      const pull = stage.querySelector('.sw-pull');
      pull.addEventListener('transitionend', (ev) => { if (ev.target === pull) location.href = href; });
    };
    if (stage.ready) go(); else { stage.onready = go; setTimeout(() => { if (!stage.classList.contains('go')) location.href = href; }, 2500); } // slow load: just open it
  });

  // the back button can restore this page in the middle of a transition
  addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    document.querySelectorAll('.sw-stage').forEach((s) => s.remove());
    document.documentElement.classList.remove('sw-moving');
    for (const k in stages) delete stages[k];
  });
})();
