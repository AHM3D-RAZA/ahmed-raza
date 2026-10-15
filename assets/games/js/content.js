// EDIT THIS FILE. (Paths are relative to games/index.html, so files in assets/games/media/ start with ../assets/games/media/) All text, links and media on the page come from here.
// Media can be: null (shows a placeholder), {type:'image',src:'../assets/games/media/x.jpg'},
// {type:'video',src:'../assets/games/media/x.mp4'} or {type:'embed',src:'https://itch.io/embed-upload/...'}.
const SITE = {
  role: 'JUNIOR GAME DEVELOPER / UNITY / C#',
  tagline: 'I build games by myself. Some are scary. Some have a pigeon.',
};

// Section 2, The Room. Put a clip or screenshot in media/ and point `media` at it.
const HORROR = [
  { name: 'PSYCHO HOSPITAL', tags: 'UNITY / C# / ASSET STORE ART', media: null, link: null,
    blurb: '3D first-person horror shooter. A pistol, two kinds of enemy, a story you piece together from notes, and two endings.' },
  { name: 'THE ROOM', tags: 'UNITY / C# / ON ITCH.IO', media: null,
    link: { label: 'Play on itch.io', href: 'https://nightsun-studios.itch.io/the-room' },
    blurb: 'First-person horror you move through by point and click. One enemy, some shooting, a simple dialogue system.' },
];

// Section 3, the arcade shelf.
// play: what loads on the screen (embed or video), or null.   download: APK link, or null.
const SHELF = [
  { name: 'Pigeon Havoc', tag: 'ANDROID / UNITY', color: '#f2a65a', tilt: -2, play: null, download: null,
    blurb: 'Fly over an endless city, attack people from above and dodge their slingshots. Score as high as you can.',
    meta: 'UNITY / C# / ALL ART BY ME' },
  { name: 'Balloon Barrage', tag: 'PROTOTYPE', color: '#ffd98a', tilt: 1.5, play: null, download: null,
    blurb: 'A balloon with a gun on each side. Steer left and right and shoot down the traps falling on you.',
    meta: 'UNITY / C# / 2D' },
  { name: 'Neon Rush', tag: 'PROTOTYPE', color: '#8c93a8', tilt: -1, play: null, download: null,
    blurb: 'Slip through a field of neon cubes and avoid the red ones. Everything bursts into particles as you pass.',
    meta: 'UNITY / C# / PARTICLES + BLOOM' },
];

// Section 4, pigeon city. `note` is the handwritten text top right.
const CITY = {
  hint: 'Fly over someone to attack them.',
  done: 'Havoc complete. Shuffle for new victims.',
  note: { label: 'THEN I GOT AMBITIOUS', text: "I tried turning this into a 3D game, with a randomly generated city every run. It worked. It's still a prototype." },
};

// Section 5, About. Rewrite `intro` in your own voice.
const ABOUT = {
  intro: "I'm Ahmed, a junior game developer. I've been making games on my own since 2021: Android prototypes first, then a 3D horror shooter, then another one. I do the code, the levels, the models and the textures myself.",
  quests: [['2021 >', 'Started making games. Still going.'], ['2021-2025', 'BS in Computer Science, TIMES University.'], ['2026 >', 'Trainee software engineer, so I build websites too.']],
  tools: [
    { name: 'Unity', glyph: 'U', desc: 'Where every game on this page was built. Since 2021.' },
    { name: 'C#', glyph: 'C#', desc: 'All the gameplay code.' },
    { name: 'Blender', glyph: 'Bl', desc: '3D models and assets.' },
    { name: 'GIMP', glyph: 'Gi', desc: 'Textures.' },
    { name: 'Aseprite', glyph: 'As', desc: 'Pixel art.' },
    { name: 'ProBuilder', glyph: 'Pb', desc: 'Quick level blockouts inside Unity.' },
    { name: 'Cinemachine', glyph: 'Ci', desc: 'Camera work.' },
    { name: 'Git', glyph: 'Gt', desc: 'Version control. Mostly so I can undo my mistakes.' },
  ],
};

// Section 6, Contact. The pigeon lands on whichever link you point at.
const CONTACT = {
  links: [
    { label: 'EMAIL', text: 'ahmedraza7651@gmail.com', href: 'mailto:ahmedraza7651@gmail.com' },
    { label: 'ITCH.IO', text: 'nightsun-studios', href: 'https://nightsun-studios.itch.io' },
    { label: 'GITHUB', text: 'AHM3D-RAZA', href: 'https://github.com/AHM3D-RAZA' },
    { label: 'LINKEDIN', text: 'ahmed-raza-asad', href: 'https://linkedin.com/in/ahmed-raza-asad' },
  ],
};
