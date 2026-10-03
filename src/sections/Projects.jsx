import { useMemo, useState } from 'react'
import { FaGithub } from 'react-icons/fa6'
import { LuArrowUpRight, LuStar } from 'react-icons/lu'
import { projects } from '../data/portfolio'
import { Card, Chip, Reveal, Section, SpotlightGroup } from '../components/ui'

/** Placeholder cover until real screenshots exist: dot grid + monogram that parallax with the cursor. */
function Cover({ title, image }) {
  if (image)
    return <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
  const mono = title
    .split(' ')
    .map((w) => w[0])
    .join('')
  return (
    <div className="relative h-full w-full overflow-hidden bg-raised">
      <div
        className="bg-dots absolute -inset-8 transition-transform duration-200 ease-out"
        style={{ transform: 'translate(calc((var(--mx, 180px) - 180px) * -0.05), calc((var(--my, 90px) - 90px) * -0.05))' }}
      />
      <span
        className="absolute bottom-2 left-5 font-display text-6xl font-extrabold text-fg/10 transition-all duration-500 group-hover:text-accent"
        style={{ transform: 'translate(calc((var(--mx, 180px) - 180px) * 0.04), calc((var(--my, 90px) - 90px) * 0.04))' }}
      >
        {mono}
      </span>
      <span className="absolute right-5 top-5 h-3 w-3 rounded-full bg-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  )
}

function ProjectCard({ p }) {
  return (
    <Card tilt className="group flex h-full flex-col overflow-hidden">
      <div className="relative h-44 shrink-0 border-b border-line">
        <Cover title={p.title} image={p.image} />
        {p.featured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-fg">
            <LuStar /> Featured
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{p.category}</p>
        <h3 className="mt-2 flex items-center gap-2 font-display text-lg font-bold text-fg">
          {p.title}
          <LuArrowUpRight className="-translate-x-1 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-fg/70">{p.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-4 border-t border-line pt-4 text-sm font-semibold">
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted transition hover:text-fg">
              <FaGithub /> Code
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted transition hover:text-accent">
              Live demo <LuArrowUpRight />
            </a>
          )}
        </div>
      </div>
    </Card>
  )
}

export default function Projects() {
  const cats = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [])
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? projects : projects.filter((p) => p.category === cat)

  return (
    <Section id="projects" eyebrow="Projects" title="Things I've built." intro="Side projects, hackathon builds and coursework I'm proud of.">
      <div className="no-scrollbar -mx-4 mb-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist">
        {cats.map((c) => (
          <button
            key={c}
            id={`filter-${c.replace(/\W+/g, '-').toLowerCase()}`}
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              cat === c ? 'border-accent bg-accent text-accent-fg' : 'border-line bg-surface text-muted hover:border-fg/30 hover:text-fg'
            }`}
          >
            {c}
            <span className="ml-1.5 font-mono text-xs opacity-60">{c === 'All' ? projects.length : projects.filter((p) => p.category === c).length}</span>
          </button>
        ))}
      </div>

      <SpotlightGroup key={cat} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Reveal key={p.title} delay={(i % 3) * 90}>
            <ProjectCard p={p} />
          </Reveal>
        ))}
      </SpotlightGroup>
    </Section>
  )
}
