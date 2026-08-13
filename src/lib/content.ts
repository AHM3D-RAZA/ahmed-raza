// ---------------------------------------------------------------------------
// Content layer
// ---------------------------------------------------------------------------
// Every value in this file is sourced from Ahmed's resume, or is explicitly
// marked as a placeholder for an asset/detail that hasn't been provided yet.
// Components should never hardcode copy that belongs here — this keeps
// presentation and content cleanly separated across every future phase.
// ---------------------------------------------------------------------------

export const person = {
  name: "Ahmed Raza Asad",
  role: "Software Engineer",
  roleLine: "Software Developer / Game Developer / Builder",
  heroTagline:
    "A workshop spanning web, games, data, and the automation that connects them.",
  disciplines: ["Web", "Games", "Data & ML", "Automation"] as const,
  summary:
    "Versatile developer experienced in building games, web applications, and automation systems — from FPS games to ML-based solutions and workflow automation. Driven to build systems that improve efficiency and solve real problems.",
  location: "Karachi, Pakistan", // placeholder-level inference not made — omit if not needed in UI
  email: "ahmedraza7651@gmail.com",
  phone: "+92 345 2983323",
  links: {
    github: "https://github.com/AHM3D-RAZA",
    linkedin: "https://www.linkedin.com/in/ahmed-raza-asad",
  },
  // No resume/CV file has been provided yet — wire this up when supplied.
  resumeUrl: null as string | null,
} as const;

export const bio =
  "I started building games in 2021 — a habit that grew into a 3D horror shooter released on itch.io — and it shaped how I approach every project since: prototype fast, understand the whole system, then make it solid enough to ship. That same instinct pulled me into web development, automating workflows with n8n, and training a model to catch breast tumors during a data science internship. These days I'm a trainee software engineer building full-stack with React, Next.js, and Laravel, with a BSCS from TIMES University behind me.";

export type PracticeDiscipline = {
  id: "web" | "games" | "data" | "automation";
  label: string;
  description: string;
};

export const practiceDisciplines: PracticeDiscipline[] = [
  {
    id: "web",
    label: "Web Development",
    description: "Full-stack interfaces — React, Next.js, Laravel.",
  },
  {
    id: "games",
    label: "Game Development",
    description: "Unity3D games built solo, prototype to shipped.",
  },
  {
    id: "data",
    label: "Data & ML",
    description: "Models and analysis with Python, scikit-learn, TensorFlow.",
  },
  {
    id: "automation",
    label: "Automation",
    description: "n8n workflows that replace repetitive manual work.",
  },
];

export type Education = {
  institution: string;
  credential: string;
  period: string;
};

export const education: Education[] = [
  {
    institution: "TIMES University",
    credential: "Bachelor in Computer Science",
    period: "Nov. 2021 – Oct. 2025",
  },
  {
    institution: "Bahria College Karsaz",
    credential: "Pre-Engineering",
    period: "Aug. 2018 – May 2020",
  },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  points: string[];
};

export const experience: Experience[] = [
  {
    role: "Trainee Software Engineer",
    org: "Information Technology Services, ITS (Xolva Department)",
    period: "May 2026 – Present",
    points: [
      "Working on live projects with dedicated environments and code integrations",
      "Training according to the norms and code ethics of international standards",
      "Deep focus on full-stack web development with HTML, CSS, JavaScript, React, Next.js, SQL, PHP, Laravel",
    ],
  },
  {
    role: "Junior Software Developer",
    org: "PSF Prep Services",
    period: "Feb 2026 – April 2026",
    points: [
      "Automated multiple workflows to assist with everyday tasks",
      "Developed an internal project management tool",
      "Explored how n8n can be integrated into websites for automation services",
    ],
  },
  {
    role: "MERN Intern",
    org: "Sparkosol",
    period: "July 2025 – Sep. 2025",
    points: [
      "Learned MongoDB, Express, React, and Node.js",
      "Developed a simple TODO app using the MERN stack",
      "Learned how to read existing codebases and how real client projects are handled",
    ],
  },
  {
    role: "Data Science & Machine Learning Intern",
    org: "Marketing Boosters",
    period: "Feb. 2025 – June 2025",
    points: [
      "Learned libraries like scikit-learn, TensorFlow, and OpenCV",
      "Performed exploratory data analysis on datasets for insights",
      "Developed a simple website chatbot",
      "Trained a machine learning model for breast tumor detection",
    ],
  },
  {
    role: "Game Developer",
    org: "Self-Employed",
    period: "Nov. 2021 – Present",
    points: [
      "Developed prototypes of multiple 2D platformers for Android",
      "Developed a fully playable 3D FPS game for Windows, released on itch.io",
      "Developed a small 2D platformer game for Android",
    ],
  },
];

export type ProjectTreatment =
  | "featured"
  | "game"
  | "network"
  | "product"
  | "ml"
  | "automation";

export type WorkProject = {
  id: string;
  name: string;
  category: string;
  treatment: ProjectTreatment;
  /** Short blurb used in the row listing, reused as the detail view's Overview. */
  description: string;
  tech: string[];
  whatIBuilt: string[];
  /** Only render when present — most projects don't have a resume-supported anecdote. */
  interestingDetail?: string;
  /** Only render when present — most projects don't have a stated, quantified outcome. */
  result?: string;
  // No project links were supplied — every url is null rather than invented.
  url: string | null;
};

export const workProjects: WorkProject[] = [
  {
    id: "pm-tool",
    name: "Project Management Tool",
    category: "Full-Stack Product",
    treatment: "featured",
    description:
      "An internal tool for running projects — workspaces, member invitations, and a drag-and-drop kanban board for tracking work.",
    tech: ["React", "Express", "JavaScript"],
    whatIBuilt: [
      "Workspace creation and member invitations",
      "A drag-and-drop kanban board for tracking tasks across stages",
    ],
    url: null,
  },
  {
    id: "fps-horror",
    name: "3D FPS Horror Game",
    category: "Game — Unity3D",
    treatment: "game",
    description:
      "A 3D horror shooter built solo in Unity3D, with a dialogue system and weapon-shooting mechanics, shipped as a Windows build on itch.io.",
    tech: ["Unity3D", "C#", "Blender", "GIMP"],
    whatIBuilt: [
      "A dialogue system for in-game story delivery",
      "Weapon-shooting mechanics",
      "Assets modeled in Blender, textured in GIMP",
    ],
    result: "Shipped as a fully playable Windows build, released on itch.io.",
    url: null,
  },
  {
    id: "network-dashboard",
    name: "Network Monitoring Dashboard",
    category: "Web — Systems",
    treatment: "network",
    description:
      "A live network monitoring dashboard for real-time tracking of a whole network system, built with Flask and Django.",
    tech: ["Flask", "Django", "Python"],
    whatIBuilt: [
      "Real-time dashboard tracking status across an entire network",
      "Backend built across both Flask and Django",
    ],
    url: null,
  },
  {
    id: "quickbyte",
    name: "QuickByte",
    category: "Web — Product",
    treatment: "product",
    description:
      "A food ordering web app built with React and deployed on Vercel.",
    tech: ["React", "Vercel"],
    whatIBuilt: ["End-to-end food ordering flow", "Deployed live on Vercel"],
    url: null,
  },
  {
    id: "tumor-detection",
    name: "Breast Tumor Detection Model",
    category: "Data & ML",
    treatment: "ml",
    description:
      "A machine learning model trained to detect breast cancer from diagnostic data.",
    tech: ["Python", "scikit-learn"],
    whatIBuilt: ["Trained and evaluated a classification model on diagnostic data"],
    result: "Achieved over 83% accuracy on the held-out test set.",
    url: null,
  },
  {
    id: "automation-workflows",
    name: "Automation Systems",
    category: "Automation — n8n",
    treatment: "automation",
    description:
      "A set of n8n workflows automating outreach, social posting, and customer engagement.",
    tech: ["n8n"],
    whatIBuilt: [
      "Automated client outreach via an email workflow",
      "Automated social media content creation, posting, and approval",
      "A website helper bot resolving common queries without human intervention",
    ],
    result: "An auto-reply workflow that reduced average customer response time.",
    url: null,
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "C#", "SQL", "JavaScript", "TypeScript", "HTML/CSS"],
  },
  {
    label: "Frameworks",
    items: ["React", "Next.js", "Express", "Flask", "Laravel", "WordPress", "Kotlin"],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "Unity3D",
      "VS Code",
      "Google Colab",
      "Cursor",
      "Antigravity",
      "Firebase Studio",
      "Visual Studio",
      "PyCharm",
      "IntelliJ",
      "Eclipse",
      "Jupyter Notebook",
      "Blender",
    ],
  },
  {
    label: "Libraries",
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Scrapy", "TensorFlow", "scikit-learn"],
  },
];

// Technologies pulled from the skill set above, used by the Phase-3 "Signal Run"
// mini-game. Kept here so the game only ever draws from real, resume-backed skills.
export const gameTechnologies = [
  "React",
  "Next.js",
  "Unity",
  "Python",
  "JavaScript",
  "TypeScript",
  "Git",
  "n8n",
  "Blender",
] as const;
