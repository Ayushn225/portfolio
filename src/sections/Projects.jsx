import { useMemo, useState } from 'react'
import { FaGithub } from 'react-icons/fa6'
import { LuArrowUpRight, LuStar } from 'react-icons/lu'
import { projects } from '../data/portfolio'
import { Card, Chip, Heading, Panel, SpotlightGroup } from '../components/ui'
import Carousel from '../components/Carousel'

/** Cover art for cards without a screenshot: stripes + monogram that shift with the cursor. */
function Cover({ p, i }) {
  if (p.image) return <img src={p.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
  const mono = p.title
    .split(' ')
    .map((w) => w[0])
    .join('')
  const tones = ['bg-accent', 'bg-fg', 'bg-accent2']
  return (
    <div className={`relative h-full w-full overflow-hidden ${tones[i % tones.length]}`}>
      <div
        className="bg-stripes absolute -inset-10 opacity-50 mix-blend-overlay transition-transform duration-200 ease-out"
        style={{ transform: 'translate(calc((var(--mx, 160px) - 160px) * -0.05), calc((var(--my, 100px) - 100px) * -0.05))' }}
      />
      <span
        className="display absolute -bottom-6 right-3 text-[9rem] leading-none text-bg/20 transition-transform duration-300"
        style={{ transform: 'translate(calc((var(--mx, 160px) - 160px) * 0.04), calc((var(--my, 100px) - 100px) * 0.04))' }}
      >
        {mono}
      </span>
      <span className="absolute left-5 top-5 font-cond text-xs font-bold uppercase tracking-[0.25em] text-bg/80">{p.category}</span>
    </div>
  )
}

function ProjectCard({ p, i }) {
  return (
    <Card tilt className="group flex h-full flex-col overflow-hidden">
      <div className="relative h-44 shrink-0 sm:h-52">
        <Cover p={p} i={i} />
        {p.featured && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-md bg-bg px-2.5 py-1 font-cond text-[11px] font-bold uppercase tracking-wider text-fg">
            <LuStar className="text-accent2" /> Featured
          </span>
        )}
      </div>
      {/* title plate overlapping the cover, like the reference site's cards */}
      <div className="relative z-10 -mt-7 px-5">
        <h3 className="display inline-block bg-surface px-3 py-1.5 text-xl text-fg shadow-[4px_4px_0_rgb(var(--accent2))] transition-transform duration-300 group-hover:-translate-y-1 sm:text-2xl">
          {p.title}
        </h3>
      </div>
      <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
        <div className="flex-1">
          <p className="line-clamp-4 text-sm leading-relaxed text-fg/75">{p.description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.slice(0, 4).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-5 border-t border-line pt-4 font-cond text-sm font-bold uppercase tracking-wide">
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-fg transition hover:text-accent">
              <FaGithub /> Code
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-fg transition hover:text-accent">
              Live <LuArrowUpRight />
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
    <Panel id="projects">
      <Heading
        index="05"
        eyebrow="Things I've built"
        title="Projects"
        aside={
          <div className="no-scrollbar -mx-4 flex max-w-full gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist">
            {cats.map((c) => (
              <button
                key={c}
                id={`filter-${c.replace(/\W+/g, '-').toLowerCase()}`}
                role="tab"
                aria-selected={cat === c}
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-md border-2 px-3.5 py-1.5 font-cond text-sm font-bold uppercase tracking-wide transition ${
                  cat === c ? 'border-fg bg-fg text-bg' : 'border-line text-muted hover:border-fg hover:text-fg'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        }
      />
      <SpotlightGroup key={cat}>
        <Carousel
          label="projects"
          items={list}
          itemClass="w-[86%] sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
          render={(p) => <ProjectCard p={p} i={projects.indexOf(p)} />}
        />
      </SpotlightGroup>
    </Panel>
  )
}
