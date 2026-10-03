# Ayush Negi — Portfolio

My personal portfolio: a one-page site where each section fills the screen and the page snaps from one section to the next, with sliders inside the sections, light and dark themes, and interactive cards.

Built with **React 19**, **Vite 6** and **Tailwind CSS 3**. The only other dependency is `react-icons`.

## Features

- **Full-screen sections that snap.** On desktop each section is one screen tall and scrolling moves you to the next section. A dot navigation on the right shows where you are (`03 / 08`) and labels each dot on hover. Phones and short windows scroll normally.
- **Sliders.** The Journey and Projects sections are sliders with arrows, a counter, a progress bar, swipe on touch and drag with the mouse. Journey also plays through its slides on its own and pauses when you hover over it.
- **Light and dark mode.** It follows your system setting until you click the sun/moon button, and then remembers your choice. The saved theme is applied before the page draws, so it never flashes the wrong theme.
- **Interactive details:**
  - a dot background that reacts to the cursor (click for a ripple)
  - card borders that light up near the cursor, and cards that tilt
  - buttons that are pulled slightly toward the cursor
  - headings that unscramble as they appear, and name letters that rise in
  - an animated GitHub activity grid and a LeetCode progress ring
- **Responsive** from 360px phones up to large desktops.
- **Respects reduced motion.** Animations and snapping turn off when the operating system asks for less motion.

## Sections

| # | Section | What's in it |
|---|---------|--------------|
| 01 | Home | Name, rotating roles, profile card, resume link |
| 02 | About | Bio, live local clock (IST), count-up stats, "Right now" card |
| 03 | Journey | Timeline slider by year: school → DTU → competitive programming → DMRC internship → LeetCode milestone |
| 04 | Toolkit | Skill groups and a scrolling ticker |
| 05 | Projects | Filterable project slider |
| 06 | GitHub | Contribution grid from real data, stats, repository links |
| 07 | LeetCode | Difficulty ring and bars, contest rating, streak, badges |
| 08 | Contact | Achievements, email with a copy button, contact form, footer |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the built site locally
```

Requires Node 18 or newer.

## Editing content

All of the text and numbers live in **`src/data/portfolio.js`**: profile, about, journey, skills, projects, the GitHub contribution calendar, LeetCode stats, achievements and the navigation. The components read from this file, so you don't need to touch them to update content.

- **Resume:** replace `public/resume.pdf`.
- **Profile photo:** add `public/avatar.jpg` and set `profile.avatar = 'avatar.jpg'`.
- **Project screenshot:** add `image: 'shots/name.png'` to a project (files go in `public/`).
- **Journey slide:** add an object to the `journey` array.

## Changing the colours

Every colour is a CSS variable at the top of `src/index.css`, with one set for light mode and one for dark mode:

| Token | Light | Dark |
|-------|-------|------|
| `--bg` | cream (from Wheat `#E9D8A6`) | Ink Black `#001219` |
| `--fg` | Ink Black `#001219` | light Wheat |
| `--accent` | Dark Teal `#005F73` | Pearl Aqua `#94D2BD` |
| `--accent2` | Burnt Caramel `#CA6702` | Golden Orange `#EE9B00` |
| `--easy` / `--medium` / `--hard` | Dark Cyan / Burnt Caramel / Oxidized Iron | lighter versions of the same |

Values are written as `R G B` (for example `0 95 115`) so Tailwind can add opacity, as in `bg-accent/20`.

## Project structure

```
src/
  data/portfolio.js       all content
  hooks/index.js          reveal, typewriter, active section, count-up, theme
  components/
    Navbar.jsx            header, theme toggle, mobile menu
    SideRail.jsx          dot navigation, social icons, back-to-top
    Carousel.jsx          slider (snap, drag, arrows, counter)
    Background.jsx        dot background that reacts to the cursor
    Socials.jsx           social icon row
    ui.jsx                Panel, Heading, Card, SpotlightGroup, Magnetic, Scramble, Chip
  sections/
    Hero  About  Journey  Toolkit  Projects  Contributions  LeetCode  Contact
  index.css               colour tokens, snap rules, buttons, cards
public/
  resume.pdf  favicon.svg
```

## Deploying

- **Vercel / Netlify:** import the repo. Build command `npm run build`, output folder `dist`.
- **GitHub Pages:** `base: './'` is already set in `vite.config.js`. Build, then publish the `dist/` folder (for example with the `gh-pages` package or a GitHub Action).

## Credits

The full-screen snapping layout, dot navigation and slider sections take their inspiration from [bjp.org](https://www.bjp.org/home). The colour palette is Ink Black, Dark Teal, Dark Cyan, Pearl Aqua, Wheat, Golden Orange, Burnt Caramel and Oxidized Iron. Fonts are Anton, Roboto Condensed, Open Sans and JetBrains Mono from Google Fonts.
