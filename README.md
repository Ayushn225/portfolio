# Ayush — Portfolio

React 19 + Vite + Tailwind CSS · solid dark palette with one accent · interactive cards · fully responsive.

## Change the colours
All colours are CSS variables at the top of `src/index.css`. Change `--accent` (e.g. `255 107 61` for orange) and the whole site follows.

## Interactions
- Dot-field background that reacts to the cursor; click for a ripple (ambient wave on phones)
- Custom cursor ring, magnetic buttons
- Card borders light up near the cursor across a whole group (`SpotlightGroup`)
- 3-D tilt + glare on cards (`<Card tilt>`)
- Timeline rail fills as you scroll; headings decode in; name letters rise in

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static site in dist/
```

## Edit content
Everything you see comes from **`src/data/portfolio.js`** — profile, about, experience,
education, skills, projects, open-source, LeetCode, achievements. Components don't need changes.

- Photo: put `avatar.jpg` in `public/` and set `profile.avatar = '/avatar.jpg'`
- Resume: put `resume.pdf` in `public/` and set `profile.resumeUrl = '/resume.pdf'`
- Project screenshots: add `image: '/shots/xyz.png'` to a project

## Structure
```
src/
  data/portfolio.js      all content
  hooks/index.js         reveal, typewriter, active section, count-up
  components/            Navbar, Background, Timeline, Socials, ui (Glass, Section, Reveal, Chip)
  sections/              Hero, About(+Skills), Experience(+Education), Projects,
                         Contributions, LeetCode, Contact(+Achievements)
```

## Deploy
Vercel / Netlify: import the repo, build `npm run build`, output `dist`.
GitHub Pages: `base: './'` is already set in `vite.config.js`.
