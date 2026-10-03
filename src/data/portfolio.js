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
  availableText: 'Open to internships',
  resumeUrl: 'resume.pdf', // file lives in /public
  avatar: null, // e.g. 'avatar.jpg' — drop the file into /public
  // three numbers on the hero profile card
  highlights: [
    { v: '1018', l: 'Solved' },
    { v: '1853', l: 'Rating' },
    { v: '9.06', l: 'CGPA' },
  ],
  socials: {
    github: 'https://github.com/Ayushn225',
    linkedin: 'https://www.linkedin.com/in/ayush-negi-a75084318/',
    leetcode: 'https://leetcode.com/u/ayushn_225/',
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
    { value: 9.06, decimals: 2, suffix: '', label: 'CGPA at DTU' },
    { value: 1018, suffix: '', label: 'LeetCode problems solved' },
    { value: 1853, suffix: '', label: 'LeetCode contest rating' },
    { value: 1316, suffix: '', label: 'Codeforces max rating' },
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

export const projects = [
  {
    title: 'AI Shopping Agent',
    description:
      'Conversational shopping assistant with LLM tool calling for product search, preferences, reviews, order history and checkout. Deterministic SQLite tools keep app logic separate from the LLM, and a two-layer eval suite checks multi-turn tool accuracy plus LLM-as-a-judge guardrails.',
    category: 'AI / ML',
    tags: ['Python', 'LangGraph', 'Groq', 'SQLite', 'Streamlit'],
    github: 'https://github.com/Ayushn225/shopping_agent',
    live: '',
    featured: true,
  },
  {
    title: 'tasteMate',
    description:
      'Cross-platform recipe discovery app with category filters, search and saved collections. Clerk auth with Convex queries keeps saved recipes per user; long-press multi-select batch delete and image fallbacks.',
    category: 'Mobile',
    tags: ['React Native', 'Expo', 'TypeScript', 'Clerk', 'Convex', 'Zustand'],
    github: 'https://github.com/Ayushn225/mealApp',
    live: '',
    featured: true,
  },
  {
    title: 'Smart Rockets',
    description: 'Rockets learn to reach a target around obstacles. Each generation evolves its DNA with a genetic algorithm, simulated in the browser.',
    category: 'Simulations',
    tags: ['JavaScript', 'p5.js', 'Genetic algorithm'],
    github: 'https://github.com/Ayushn225/smartRockets',
    live: '',
    featured: false,
  },
  {
    title: 'Interactive Selection',
    description: 'Interactive evolution of flowers: you pick the ones you like and the population breeds the next generation from them.',
    category: 'Simulations',
    tags: ['JavaScript', 'p5.js', 'Evolutionary'],
    github: 'https://github.com/Ayushn225/interactive-selection',
    live: '',
    featured: false,
  },
  {
    title: 'Voronoi',
    description: 'Generative Voronoi diagram sketch built with p5.js.',
    category: 'Simulations',
    tags: ['JavaScript', 'p5.js', 'Generative art'],
    github: 'https://github.com/Ayushn225/voronoi',
    live: '',
    featured: false,
  },
  {
    title: 'Platformer Game',
    description: '2D platformer built in Unity with C#.',
    category: 'Games',
    tags: ['C#', 'Unity'],
    github: 'https://github.com/Ayushn225/PlatformerGame',
    live: '',
    featured: false,
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
