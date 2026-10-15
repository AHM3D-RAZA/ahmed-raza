// EDIT THIS FILE. Projects, stack map and links come from here.

// Hero stack map: [name, x%, y%, "used in" text]. Edges join nodes by their position in this list.
const STACK_MAP = {
  nodes: [
    ['React', 14, 20, 'QuickByte and day-to-day work at ITS (Xolva).'],
    ['Next.js', 50, 9, 'PSF Project Tracker and the Aster Clinic System.'],
    ['TypeScript', 85, 24, 'PSF Project Tracker and the Aster Clinic System.'],
    ['Laravel', 88, 62, 'Day-to-day work at ITS (Xolva), with PHP and SQL.'],
    ['SQL', 62, 76, 'Day-to-day work at ITS (Xolva) and the QuickByte database.'],
    ['Python', 25, 62, 'Live Network Monitor, Breast Cancer Detection, the chatbot and the QuickByte Django API.'],
    ['scikit-learn', 9, 90, 'The intent-based chatbot.'],
    ['TensorFlow', 42, 90, 'Breast Cancer Detection.'],
  ],
  edges: [[0, 1], [1, 2], [0, 2], [0, 5], [5, 6], [5, 7], [5, 4], [3, 4], [0, 3]],
};

// Selected work. preview: 'psf' | 'network' | 'quickbyte' | 'clinic' | 'pipeline' | null (null shows a screenshot placeholder).
// Each preview lives in js/previews/. tags decide which filter buttons show the project.
const PROJECTS = [
  { id: 'psf', name: 'PSF Project Tracker', kind: 'Client work / Next.js', tags: ['web', 'client'], badge: 'CLIENT PROJECT',
    url: 'project-management-psf.vercel.app', preview: 'psf',
    summary: 'Project management platform built for a client: workspaces, role-based members, projects, tasks with board and list views, subtasks and comments.',
    bullets: ['Email invitations (Resend) and a join flow', 'Check-in/check-out and audit logs', 'Firestore security rules, deployed on Vercel'],
    stack: ['Next.js', 'TypeScript', 'Tailwind', 'Firebase'],
    links: [['Live', 'https://project-management-psf.vercel.app'], ['GitHub', 'https://github.com/AHM3D-RAZA/ProjectManagementPSF']],
    note: 'The preview is a simplified recreation with sample data.' },
  { id: 'aster', name: 'Aster Clinic System', kind: 'In development / Next.js', tags: ['web'], badge: 'IN DEVELOPMENT',
    url: 'github.com/AHM3D-RAZA/clinic-system', preview: 'clinic',
    summary: 'Reusable booking site for clinics. A new clinic is configuration, not new components.',
    bullets: ['Booking API with shared client and server validation', 'Staff dashboard behind signed session cookies', '58 unit tests and 26 end-to-end tests, including accessibility scans'],
    stack: ['Next.js', 'TypeScript', 'Vitest', 'Playwright'],
    links: [['GitHub', 'https://github.com/AHM3D-RAZA/clinic-system']],
    note: 'Includes a rule-based front-desk assistant (not an LLM). The preview is a simplified recreation with sample data.' },
  { id: 'qb', name: 'QuickByte', kind: 'Team project / React', tags: ['web'], badge: 'TEAM CAPSTONE, 10 DAYS',
    url: 'quickbyte-beta.vercel.app', preview: 'quickbyte',
    summary: 'Food ordering web app in the style of a delivery marketplace, with a restaurant listing and admin side.',
    bullets: ['Built the Exclusive Deals, Popular Categories and Popular Restaurants sections and the Restaurant Detail page', 'Turned a Figma design into React and Tailwind components', 'Connected components to a Django REST API'],
    stack: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Django REST'],
    links: [['Live', 'https://quickbyte-beta.vercel.app/'], ['GitHub', 'https://github.com/AHM3D-RAZA/quickbyte']],
    note: 'The live demo database has expired, so listings are empty there. The preview uses sample data.' },
  { id: 'net', name: 'Live Network Monitor', kind: 'Client work / Python', tags: ['client'], badge: 'TEAM, FOR A LOCAL CLIENT',
    url: 'github.com/AHM3D-RAZA/LiveNetworkMonitor', preview: 'network',
    summary: 'Tracks the live status of routers, switches and firewalls across a lab network.',
    bullets: ['Email alerts when a device goes offline', 'Device metrics and graphs'],
    stack: ['Python', 'Flask', 'Django'],
    links: [['GitHub', 'https://github.com/AHM3D-RAZA/LiveNetworkMonitor']], note: 'The preview is a simplified recreation with sample data.' },
  { id: 'bc', name: 'Breast Cancer Detection', kind: 'Machine learning / TensorFlow', tags: ['ml'], badge: 'MACHINE LEARNING',
    url: 'github.com/AHM3D-RAZA/Breast-Cancer-Detection', preview: 'pipeline',
    summary: 'DenseNet transfer-learning model that classifies mammograms, with a Flask interface for uploading an image.',
    bullets: ['About 95% accuracy on the test set', 'Trained on public mammogram images, built with a colleague'],
    stack: ['Python', 'TensorFlow', 'Keras', 'Flask'],
    links: [['GitHub', 'https://github.com/AHM3D-RAZA/Breast-Cancer-Detection']], note: 'A student project, not a medical tool.',
    pipeline: { title: 'BREAST CANCER DETECTION', steps: [
      ['Mammogram', 'Public mammogram images are the input.'],
      ['DenseNet', 'A pretrained DenseNet is reused as the feature extractor (transfer learning).'],
      ['Classifier', 'Trained to label an image cancerous or not. About 95% accuracy on the test set.'],
      ['Flask app', 'A web interface: upload a mammogram and get the prediction. A student project, not a medical tool.'] ] } },
  { id: 'cb', name: 'Intent-Based Chatbot', kind: 'Machine learning / scikit-learn', tags: ['ml'], badge: 'MACHINE LEARNING',
    url: 'github.com/AHM3D-RAZA/myChatbot', preview: 'pipeline',
    summary: 'Intent classifier behind a chat interface, compared across five algorithms.',
    bullets: ['SVM, Logistic Regression, Random Forest, Naive Bayes and XGBoost on TF-IDF features', 'About 81% cross-validated accuracy', 'Served through a Flask chat interface'],
    stack: ['Python', 'scikit-learn', 'XGBoost', 'Flask'],
    links: [['GitHub', 'https://github.com/AHM3D-RAZA/myChatbot']], note: '',
    pipeline: { title: 'INTENT-BASED CHATBOT', steps: [
      ['Message', 'A user message goes in as plain text.'],
      ['TF-IDF', 'The text is turned into TF-IDF features.'],
      ['Compare', 'SVM, Logistic Regression, Random Forest, Naive Bayes and XGBoost are compared with grid search.'],
      ['Best model', 'The best model predicts the intent, at about 81% cross-validated accuracy.'],
      ['Flask chat', 'The trained classifier is served through a Flask chat interface.'] ] } },
];

// Section 3, experience. [title, organisation, dates, [bullets]]
const ROLES = [
  ['Trainee Software Engineer', 'Information Technology Services, ITS (Xolva Department)', 'May 2026 to now',
    ['Work on live projects in a dedicated environment with code integrations.', 'Full stack development with HTML, CSS, JavaScript, React, PHP (Laravel) and SQL.']],
  ['Junior Software Developer', 'PSF Prep Services', 'Feb 2026 to Apr 2026',
    ['Built an internal project management platform with Next.js, TypeScript and Firebase.', 'Automated cold email outreach and social media content creation and posting with n8n.']],
  ['MERN Intern', 'Sparkosol', 'Jul 2025 to Sep 2025',
    ['Built a TODO app with MongoDB, Express, React and Node.js.', 'Learned to read and work in an existing codebase.']],
  ['Data Science and Machine Learning Intern', 'Marketing Boosters', 'Feb 2025 to Jun 2025',
    ['Used scikit-learn, TensorFlow and OpenCV, and ran exploratory data analysis on datasets.', 'Built a website chatbot and trained a breast tumor detection model.']],
];
const EDUCATION = ['BS in Computer Science', 'TIMES University', 'Nov 2021 to Oct 2025'];

// Section 4, certifications. [name, year, credential link]
const CERTS = [
  ['Data Analysis with Python', '2024', 'https://www.freecodecamp.org/certification/ahm3d/data-analysis-with-python-v7'],
  ['Scientific Computing with Python', '2024', 'https://www.freecodecamp.org/certification/ahm3d/scientific-computing-with-python-v7'],
  ['Responsive Web Design', '2025', 'https://www.freecodecamp.org/certification/ahm3d/responsive-web-design'],
];

// Section 5, about. Rewrite the paragraphs in your own voice. The three numbers are counted from the lists above.
const ABOUT = {
  heading: 'A developer who started with games.',
  paragraphs: [
    "I'm Ahmed, a junior software engineer. I started making games in 2021, which is where I learned to build things end to end. Since then I've moved into web development and machine learning: a BS in Computer Science, internships in MERN and data science, and now a trainee role at ITS (Xolva), alongside client and team projects.",
    "I'm looking for a junior software engineering or AI/ML role where I can keep shipping and keep learning.",
  ],
};

// Section 6, contact.
const CONTACT = {
  email: 'ahmedraza7651@gmail.com',
  links: [['GITHUB', 'AHM3D-RAZA', 'https://github.com/AHM3D-RAZA'], ['LINKEDIN', 'ahmed-raza-asad', 'https://linkedin.com/in/ahmed-raza-asad'],
    ['RESUME', 'Download PDF', 'assets/software/media/Ahmed-Raza-Asad_Software_Resume.pdf']],
};
