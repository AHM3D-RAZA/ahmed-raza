// Helpers used by every section.
const $ = (s) => document.querySelector(s);
const PIGEON = '<svg class="bob" width="140" height="100" viewBox="0 0 140 100" aria-hidden="true"><path d="M32 62 L4 76 L10 54 Z" fill="#6d7488"/><ellipse cx="70" cy="58" rx="40" ry="24" fill="#8c93a8"/><ellipse cx="98" cy="50" rx="15" ry="11" fill="#7bbf9a"/><circle cx="108" cy="40" r="15" fill="#6d7488"/><path d="M121 38 L135 42 L121 46 Z" fill="#e8b23a"/><circle cx="112" cy="37" r="3.2" fill="#2b2124"/><g class="wing"><path d="M52 54 C66 20 102 26 88 62 Z" fill="#5c6378"/></g></svg>';

// media: null -> placeholder, otherwise image / video / embed from content.js
const media = (m, ph) => !m ? `<div class="ph">${ph}</div>`
  : m.type === 'video' ? `<video src="${m.src}" controls autoplay muted loop playsinline></video>`
  : m.type === 'embed' ? `<iframe src="${m.src}" loading="lazy" allowfullscreen title="game"></iframe>`
  : `<img src="${m.src}" alt="">`;

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// Seeded random numbers: the same seed always gives the same city.
function rng(seed) {
  let t = seed * 9973;
  return () => { t += 0x6D2B79F5; let x = Math.imul(t ^ t >>> 15, 1 | t); x ^= x + Math.imul(x ^ x >>> 7, 61 | x); return ((x ^ x >>> 14) >>> 0) / 4294967296; };
}
