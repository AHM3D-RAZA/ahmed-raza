# Portfolio

Two worlds, one site.

- `/`        software world (the default, link this one for software jobs)
- `/games`   game world (link this one for game dev jobs)

Locally, open `index.html` or `games/index.html` in a browser. Deploy the whole folder as a static site (Vercel, Netlify, GitHub Pages).

## Layout
```
index.html                software world page
games/index.html          game world page
assets/software/          css/, js/, media/ for the software world
assets/games/             css/, js/, media/ for the game world
assets/shared/            transition.css + transition.js (the pigeon transition)
```
Each world has its own `README`-style layout: `js/content.js` holds the content, one css and one js file per section, `js/main.js` starts them. The two worlds share no code, so changing one cannot break the other.

## The pigeon transition
Any link with the `data-switch` attribute plays it: the other world is loaded in a hidden iframe (it starts loading when you hover the link), then the pigeon flies across the screen pulling that page in from the left, over the page you are leaving (which is nudged along). When it lands, the real page opens, so the address bar and the back button work normally. It is skipped for people who prefer reduced motion, and if the other page is slow to load it just opens.
To add another switch link, copy an existing one: `<a href="games/" data-switch>...</a>`.
The speed (0.9s) and the distance the old page moves (12vw) are in `assets/shared/transition.css`.

## Content paths
- Software: `assets/software/media/...` (the resume PDF is there; replace it with the same file name).
- Games: media paths in `assets/games/js/content.js` start with `../assets/games/media/`.
