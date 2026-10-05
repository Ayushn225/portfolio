/* ------------------------------------------------------------------
 *  ALL PORTFOLIO CONTENT LIVES HERE.
 *  Sources: resume (Oct 2026), public LeetCode + GitHub profiles
 *  (fetched 3 Oct 2026). Update numbers here as they change.
 * ------------------------------------------------------------------ */

export const profile = {
  firstName: 'Ayush',
  lastName: 'Negi',
  initials: 'AN',
  roles: ['CSE Undergrad @ DTU', 'Full-Stack Developer', 'AI Agent Builder', 'Competitive Programmer'],
  tagline:
    'I build web and mobile apps, LLM-powered agents, and I solve a lot of algorithm problems. Currently studying Computer Science at Delhi Technological University.',
  location: 'New Delhi, India',
  timezone: 'Asia/Kolkata', // used by the live clock card
  email: 'ayushn454@gmail.com',
  available: true,
  availableText: 'Open to SDE & AI/ML internships',
  resumeUrl: 'resume.pdf', // file lives in /public
  avatar: null, // e.g. 'avatar.jpg' — drop the file into /public
  // three numbers on the hero profile card
  highlights: [
    { v: '1018', l: 'Solved' },
    { v: '1853', l: 'Rating' },
    { v: '9.06', l: 'CGPA' },
  ],
  // Proof chips under the name in the hero. `href` makes a chip a link.
  proof: [
    { label: 'DTU CSE · CGPA 9.06' },
    { label: '1,018 LeetCode · Top 6.37%', href: 'https://leetcode.com/u/ayushn_225/' },
    { label: 'Ex-SDE Intern · DMRC' },
  ],
  socials: {
    github: 'https://github.com/Ayushn225',
    linkedin: 'https://www.linkedin.com/in/ayush-negi-a75084318/',
    leetcode: 'https://leetcode.com/u/ayushn_225/',
    codeforces: '', // add your profile link, e.g. 'https://codeforces.com/profile/<handle>'
    twitter: '',
  },
}

export const about = {
  paragraphs: [
    "I'm a Computer Science undergraduate at Delhi Technological University. I like building things end to end: a responsive frontend, the services behind it, and lately, LLM agents that call real tools instead of just chatting.",
    'Last summer I interned at Delhi Metro Rail Corporation, working on an HR management system. Outside class I build side projects in React Native and Python, and I have solved over a thousand problems on LeetCode.',
  ],
  // shown in the "Right now" bento card
  now: [
    { k: 'Building', v: 'Agentic apps with LangGraph, Groq and tool calling' },
    { k: 'Learning', v: 'React Native, Expo and evaluation for LLM apps' },
    { k: 'Practising', v: 'Daily LeetCode, with a 119-day best streak' },
  ],
  stats: [
    { value: 9.06, decimals: 2, label: 'CGPA at DTU' },
    { value: 1018, label: 'LeetCode problems solved', href: 'https://leetcode.com/u/ayushn_225/' },
    { value: 1853, label: 'LeetCode contest rating', href: 'https://leetcode.com/u/ayushn_225/' },
    { value: 1316, label: 'Codeforces max rating', href: 'codeforces' }, // uses socials.codeforces when set
  ],
}

export const experience = [
  {
    role: 'Software Development Intern',
    company: 'Delhi Metro Rail Corporation (DMRC)',
    type: 'Internship',
    period: 'May 2025 — Jul 2025',
    location: 'New Delhi',
    points: [
      'Contributed to web modules of a Human Resource Management System (HRMS), across responsive frontend components and backend service integration.',
      'Helped develop AI-enabled features for workflow automation and employee-management applications.',
      'Debugged, tested and refined functionality in an existing codebase with mentors to ship reliable features.',
    ],
    tech: ['HRMS', 'Responsive UI', 'Backend integration', 'AI automation'],
  },
  {
    role: 'Competitive Programmer',
    company: 'LeetCode · Codeforces',
    type: 'Ongoing',
    period: '2024 — Present',
    location: 'Online',
    points: [
      '1,018 problems solved on LeetCode across 339 active days; 17 badges including the 500 Days badge.',
      'LeetCode contest rating 1853 over 30 contests (top 6.37% globally). Codeforces max rating 1316 (Pupil).',
    ],
    tech: ['C++', 'DSA', 'Dynamic Programming', 'Graphs'],
  },
]

export const education = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    school: 'Delhi Technological University',
    period: '2024 — 2028',
    grade: 'CGPA 9.06 / 10',
    location: 'New Delhi',
    highlights: ['Data Structures & Algorithms', 'Object-Oriented Programming', 'Software Testing'],
  },
  {
    degree: 'CBSE Class XII & Class X',
    school: 'Kendriya Vidyalaya AGCR',
    period: '2021 — 2023',
    grade: 'XII: 95% · X: 96%',
    location: 'New Delhi',
    highlights: [],
  },
]

/* "Where I've been" strip in the About section. */
export const credentials = [
  { kind: 'Studying at', name: 'Delhi Technological University', short: 'DTU', detail: 'B.Tech CSE · 2024–28' },
  { kind: 'Interned at', name: 'Delhi Metro Rail Corporation', short: 'DMRC', detail: 'SDE Intern · 2025' },
  { kind: 'Competing on', name: 'LeetCode', short: 'LC', detail: 'Rating 1853 · Top 6.37%', href: 'https://leetcode.com/u/ayushn_225/', icon: 'leetcode' },
  { kind: 'Competing on', name: 'Codeforces', short: 'CF', detail: 'Max 1316 · Pupil', href: 'codeforces', icon: 'codeforces' },
]

/* "My Journey" slider — one slide per milestone, oldest first. */
export const journey = [
  {
    year: '2021',
    period: '2021 — 2023',
    tag: 'School',
    title: 'Kendriya Vidyalaya AGCR',
    text: 'Finished CBSE Class X with 96% and Class XII with 95% in New Delhi. Also played badminton at district level.',
    chips: ['Class X: 96%', 'Class XII: 95%'],
  },
  {
    year: '2024',
    period: '2024 — 2028',
    tag: 'University',
    title: 'B.Tech CSE at Delhi Technological University',
    text: 'Studying Computer Science and Engineering. Current CGPA 9.06 / 10.',
    chips: ['CGPA 9.06', 'DSA', 'OOP'],
  },
  {
    year: '2024',
    period: '2024 — Present',
    tag: 'Practice',
    title: 'Started competitive programming',
    text: 'Daily problem solving in C++ on LeetCode and rated contests on Codeforces, reaching a max rating of 1316 (Pupil).',
    chips: ['C++', 'LeetCode', 'Codeforces'],
  },
  {
    year: '2025',
    period: 'May — Jul 2025',
    tag: 'Internship',
    title: 'Software Development Intern, DMRC',
    text: 'Worked on web modules of an HR Management System at Delhi Metro Rail Corporation: responsive frontend, backend integration and AI-enabled workflow automation.',
    chips: ['HRMS', 'Frontend', 'Backend', 'AI features'],
  },
  {
    year: '2026',
    period: '2026',
    tag: 'Milestone',
    title: '1,000+ LeetCode problems',
    text: 'Crossed 1,018 solved problems and a 1853 contest rating, placing in the top 6.37% globally across 30 contests.',
    chips: ['1018 solved', 'Rating 1853', 'Top 6.37%'],
  },
]

export const skills = [
  { group: 'Languages', items: ['Python', 'C++', 'C#', 'Java', 'JavaScript', 'TypeScript', 'SQL'] },
  { group: 'Frameworks', items: ['React', 'React Native', 'Expo', 'Node.js', 'Express.js', 'LangChain', 'LangGraph', 'Streamlit'] },
  { group: 'Databases & Tools', items: ['SQLite', 'MongoDB', 'MySQL', 'Convex', 'Firebase', 'Git'] },
  { group: 'Fundamentals', items: ['Data Structures & Algorithms', 'OOP', 'Software Testing', 'Debugging'] },
]

/* Projects. `cover` picks the mockup shown on the card; `caseStudy`
   fills the case-study overlay. Order = order on the page. */
export const projects = [
  {
    slug: 'shopping-agent',
    title: 'AI Shopping Agent',
    description:
      'Conversational shopping assistant that answers only from real store data. The LLM picks from 7 deterministic SQLite tools to search, rate, track preferences and check out, and a pytest eval suite checks its tool calls.',
    category: 'AI / ML',
    tags: ['Python', 'LangGraph', 'Groq', 'SQLite', 'Streamlit', 'pytest'],
    github: 'https://github.com/Ayushn225/shopping_agent',
    live: '',
    featured: true,
    cover: { type: 'agent' },
    facts: [
      { v: '7', l: 'Agent tools' },
      { v: '2', l: 'LLMs (text + vision)' },
      { v: '6', l: 'Eval cases' },
    ],
    caseStudy: {
      problem:
        'Shopping chatbots often invent products or can only talk, not act. I wanted an assistant that answers strictly from the store\'s own data, can carry out real actions like ordering, and refuses anything off-topic.',
      approach: [
        'Built the agent with LangChain / LangGraph on Groq: llama-3.3-70b-versatile does the reasoning and tool calling, and a Llama 4 Scout vision model describes product photos users upload.',
        'Wrote 7 deterministic Python tools over SQLite: search_products, get_rating, checkout, get_order_history, get_user_preferences, update_user_preferences and describe_product_image. The LLM decides what to call; the data logic stays in plain, testable code.',
        'Seeded a SQLite store with products, reviews and orders tables.',
        'Saved preferences such as "organic only" or "nothing over $50" are applied to every search automatically unless the user overrides them.',
        'Guardrails live in the system prompt: small talk is allowed, off-topic requests get a fixed refusal with no tool calls, and an order is placed only after the user explicitly confirms.',
        'Streamlit chat UI with an image upload in the sidebar for search-by-photo.',
      ],
      architecture: 'agent',
      evaluation: [
        '4 tool-call accuracy cases, including multi-turn ones. Example: "Find me organic honey under $20" must call search_products with query "honey", max_price 20 and is_organic true.',
        '2 LLM-as-a-judge cases that score output format and check that "write a poem about shoes" gets the guardrail refusal.',
        'Run with: uv run pytest test_agent_eval.py -v',
      ],
    },
  },
  {
    slug: 'tastemate',
    title: 'tasteMate',
    description:
      'Cross-platform recipe app with category filters, search and saved collections that sync per user. Clerk handles sign-in, Convex stores saved recipes, and long-press enables multi-select batch delete.',
    category: 'Mobile',
    tags: ['React Native', 'Expo', 'TypeScript', 'Clerk', 'Convex', 'Zustand', 'NativeWind'],
    github: 'https://github.com/Ayushn225/mealApp',
    live: '',
    featured: true,
    cover: { type: 'phones', shots: ['shots/tastemate-portal.webp', 'shots/tastemate-discover.webp', 'shots/tastemate-saved.webp'] },
    facts: [
      { v: '4', l: 'Screens' },
      { v: '3', l: 'Convex tables' },
      { v: 'iOS + Android', l: 'One codebase' },
    ],
    caseStudy: {
      problem:
        'I wanted a recipe app where the meals you save follow you across devices, and where cleaning up a long saved list is quick instead of one delete at a time.',
      approach: [
        'Expo Router with file-based routes: a portal screen plus Discover, Saved and Profile tabs.',
        'Recipes come from TheMealDB API, browsable through category pills (Chicken, Pasta, Dessert and more) and a search bar.',
        'Clerk handles sign-in, including an SSO callback. Saving a recipe while signed out stores the action in a Zustand store and completes it after login.',
        'Convex holds users and savedMeals tables, indexed by user and by user + meal, with queries and mutations for saving and removing.',
        'Saved list: images fall back to a fresh TheMealDB lookup if the stored URL fails; single delete with confirmation; long-press turns on multi-select with a floating action bar for batch delete.',
        'Styled with NativeWind (Tailwind for React Native), with haptic feedback on key actions.',
      ],
      architecture: 'screens',
      screens: [
        { src: 'shots/tastemate-portal.webp', label: 'Portal' },
        { src: 'shots/tastemate-discover.webp', label: 'Discover' },
        { src: 'shots/tastemate-saved.webp', label: 'Saved' },
        { src: 'shots/tastemate-profile.webp', label: 'Profile' },
      ],
    },
  },
  {
    slug: 'code-aggregator',
    title: 'Code Aggregator',
    description:
      'Self-hosted chat UI for a Claude coding agent. Add a local project as a workspace, open sessions inside it, and chat over WebSockets while the Claude Agent SDK reads and runs code in that folder. Workspaces and sessions persist in MongoDB.',
    category: 'AI / ML',
    tags: ['TypeScript', 'React 19', 'Bun', 'Turborepo', 'WebSocket', 'MongoDB', 'Claude Agent SDK'],
    github: 'https://github.com/Ayushn225/codeAgg',
    live: '',
    featured: true,
    cover: { type: 'browser', image: 'shots/code-aggregator.webp', url: 'localhost:1573' },
    facts: [
      { v: '2', l: 'Apps (web + ws)' },
      { v: '5', l: 'Shared packages' },
      { v: 'Bun', l: 'Runtime' },
    ],
    caseStudy: {
      problem:
        'I wanted my own web interface for a coding agent: point it at any project on my machine, keep separate conversations per project, and come back to them later instead of losing history when a terminal closes.',
      approach: [
        'Bun + Turborepo monorepo with two apps (a React frontend and a WebSocket backend) and shared packages for message types, database models and tooling config.',
        'The backend is a ws server on port 3000. Each message is routed to the Claude Agent SDK, scoped to the workspace folder, and the reply streams back over the socket.',
        'Workspaces (a local project path) and their sessions are stored in MongoDB through Mongoose models in a shared db package.',
        'A common package defines the message types and schemas, so the frontend and backend agree on the WebSocket protocol.',
        'React 19 + Tailwind frontend: sidebar to add workspaces and start sessions with message counts, a chat view that shows each tool the agent runs (e.g. Bash), and Shift+Enter for multi-line input.',
        'MongoDB runs locally in Docker with a named volume so data survives container restarts.',
      ],
      architecture: 'browser',
    },
  },
  {
    slug: 'auth-service',
    title: 'Auth Service',
    description:
      'Express + TypeScript authentication API: email verification, JWT access and refresh tokens in an httpOnly cookie, refresh rotation, password reset, and role-based routes for admins.',
    category: 'Backend',
    tags: ['TypeScript', 'Express', 'MongoDB', 'JWT', 'Zod', 'Nodemailer'],
    github: 'https://github.com/Ayushn225/auth',
    live: '',
    featured: false,
    cover: {
      type: 'terminal',
      lines: [
        'POST /registration      → verify email',
        'GET  /api/auth/verify-email',
        'POST /login             → access 30m · refresh 7d',
        'POST /refresh           → rotate tokens',
        'POST /logout',
        'POST /forgot-password   → 15 min reset link',
        'POST /reset-password    → revoke sessions',
        'GET  /users/me          requireAuth',
        "GET  /admin/users       requireRole(['admin'])",
      ],
    },
    caseStudy: {
      problem: 'A reusable authentication backend that handles the parts tutorials usually skip: verification, token rotation, revoking sessions and roles.',
      approach: [
        'Registration validated with Zod, passwords hashed with bcrypt, and a verification email sent through Nodemailer / Mailtrap.',
        'Short-lived access token (30 min) plus a 7-day refresh token in an httpOnly, SameSite=Lax cookie; /refresh rotates both.',
        'Each user has a tokenVersion. Resetting the password bumps it, which invalidates every existing session.',
        'Password reset tokens are stored hashed and expire after 15 minutes.',
        'requireAuth and requireRole([\'admin\']) middleware protect user and admin routes.',
      ],
      architecture: 'terminal',
    },
  },
  {
    slug: 'smart-rockets',
    title: 'Smart Rockets',
    description:
      'Fifty rockets learn to fly around walls to a target. Each rocket\'s DNA is a sequence of 250 steering moves; every generation the fittest are bred and mutated. Click to move the target.',
    category: 'Simulations',
    tags: ['JavaScript', 'p5.js', 'Genetic algorithm'],
    github: 'https://github.com/Ayushn225/smartRockets',
    live: 'demos/smart-rockets/index.html',
    featured: false,
    cover: { type: 'browser', image: 'shots/smart-rockets.webp', url: 'demos/smart-rockets' },
  },
  {
    slug: 'interactive-selection',
    title: 'Interactive Selection',
    description:
      'Evolution steered by the viewer: a flower\'s fitness is how long you hover over it. Press "Next Generation" and the population breeds from your favourites, with 14 genes for colour, petals and stem.',
    category: 'Simulations',
    tags: ['JavaScript', 'p5.js', 'Evolutionary'],
    github: 'https://github.com/Ayushn225/interactive-selection',
    live: 'demos/interactive-selection/index.html',
    featured: false,
    cover: { type: 'browser', image: 'shots/interactive-selection.webp', url: 'demos/interactive-selection' },
  },
  {
    slug: 'kafka-orders',
    title: 'Kafka Order Events',
    description:
      'Event-driven practice project: a producer publishes ORDER_PLACED events to a 3-partition topic, and separate notification and analytics consumer groups each receive every event independently.',
    category: 'Backend',
    tags: ['TypeScript', 'Kafka', 'kafkajs', 'Docker'],
    github: 'https://github.com/Ayushn225/kafkaBasic',
    live: '',
    featured: false,
    cover: { type: 'kafka' },
  },
]

/* GitHub activity. `days` lists only the dates with contributions
   (YYYY-MM-DD: count); every other day in the range is zero. */
export const contributions = {
  githubUser: 'Ayushn225',
  publicRepos: 24,
  calendar: {
    start: '2025-09-28', // a Sunday
    end: '2026-10-03',
    days: {
      '2025-09-30': 2, '2025-10-07': 1, '2025-10-10': 2, '2025-10-11': 1, '2025-10-12': 1, '2025-10-14': 3,
      '2025-10-27': 1, '2025-11-04': 1, '2025-11-05': 1, '2025-11-09': 2, '2025-11-10': 2, '2025-11-11': 1,
      '2025-12-02': 2, '2025-12-29': 3, '2026-01-07': 1, '2026-01-08': 1, '2026-01-09': 2, '2026-01-10': 1,
      '2026-01-11': 1, '2026-01-13': 2, '2026-01-17': 7, '2026-01-18': 1, '2026-02-15': 1, '2026-02-20': 3,
      '2026-02-21': 1, '2026-02-22': 5, '2026-02-23': 1, '2026-02-24': 1, '2026-03-16': 2, '2026-03-19': 1,
      '2026-05-31': 2, '2026-06-01': 3, '2026-06-02': 7, '2026-06-09': 3, '2026-06-15': 3, '2026-06-18': 2,
      '2026-06-21': 4, '2026-06-22': 1, '2026-06-23': 2, '2026-06-25': 1, '2026-06-26': 1, '2026-06-30': 1,
      '2026-07-01': 2, '2026-07-03': 3, '2026-07-05': 1, '2026-07-06': 11, '2026-07-10': 3, '2026-07-21': 2,
      '2026-07-22': 1, '2026-07-23': 1, '2026-07-26': 3, '2026-08-01': 1, '2026-08-02': 1,
    },
  },
}

export const leetcode = {
  username: 'ayushn_225',
  solved: 1018,
  total: 4069,
  easy: { solved: 284, total: 968 },
  medium: { solved: 540, total: 2122 },
  hard: { solved: 194, total: 979 },
  rating: 1853,
  topPercent: 'Top 6.37%',
  contests: 30,
  streak: 119,
  activeDays: 339,
  badgeCount: 17,
  badges: ['500 Days Badge', '365 Days Badge', '200 Days Badge 2026', '100 Days Badge 2026', '+13 more'],
}

export const achievements = [
  {
    title: '1,000+ LeetCode problems',
    org: 'LeetCode',
    date: '2026',
    description: 'Contest rating 1853 across 30 contests, placing in the top 6.37% globally.',
  },
  {
    title: 'Codeforces Pupil',
    org: 'Codeforces',
    date: '2025',
    description: 'Max rating 1316 through regular participation in rated contests.',
  },
  {
    title: 'District-level Badminton Player',
    org: 'Sports',
    date: 'School',
    description: 'Represented at the district level in badminton.',
  },
]

// Links in the top bar
export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'leetcode', label: 'LeetCode' },
  { id: 'contact', label: 'Contact' },
]

// Every full-screen panel, in order — drives the dot navigation on the right
export const panels = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'leetcode', label: 'LeetCode' },
  { id: 'contact', label: 'Contact' },
]

/** Turns a link value into a URL. A social key such as 'codeforces' resolves to that profile link (or '' if unset). */
export const resolveLink = (href) => (href && href in profile.socials ? profile.socials[href] || '' : href || '')
