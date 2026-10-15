// Helpers used by every section.
const $ = (s, root = document) => root.querySelector(s);

// Registry for the interactive project previews. Each file in js/previews/ adds one:
//   PREVIEWS.name = function (el, project) { ...draw into el... }
const PREVIEWS = {};

const PIGEON = '<svg class="bob" width="38" height="27" viewBox="0 0 140 100" aria-hidden="true"><path d="M32 62 L4 76 L10 54 Z" fill="#6d7488"/><ellipse cx="70" cy="58" rx="40" ry="24" fill="#8c93a8"/><ellipse cx="98" cy="50" rx="15" ry="11" fill="#7bbf9a"/><circle cx="108" cy="40" r="15" fill="#6d7488"/><path d="M121 38 L135 42 L121 46 Z" fill="#e8b23a"/><circle cx="112" cy="37" r="3.2" fill="#14171a"/><path d="M52 58 C66 40 90 44 84 64 Z" fill="#5c6378"/></svg>';
