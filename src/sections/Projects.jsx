import { useCallback, useEffect, useMemo, useState } from 'react'
import { FaGithub } from 'react-icons/fa6'
import { LuArrowUpRight, LuBookOpen, LuStar } from 'react-icons/lu'
import { projects } from '../data/portfolio'
import { Card, Chip, Heading, Panel, SpotlightGroup } from '../components/ui'
import Carousel from '../components/Carousel'
import CaseStudy from '../components/CaseStudy'
import { ProjectCover, asset } from '../components/Mockups'

function ProjectCard({ p, onOpen }) {
  return (
    <Card tilt className="group flex h-full flex-col overflow-hidden">
      <div className="relative h-48 shrink-0 overflow-hidden border-b border-line sm:h-52">
        <ProjectCover p={p} />
        {p.featured && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-fg px-2.5 py-1 font-cond text-[11px] font-bold uppercase tracking-wider text-bg">
            <LuStar className="text-accent2" /> Featured
          </span>
        )}
      </div>
      {/* title plate overlapping the cover */}
      <div className="relative z-10 -mt-6 px-5">
        <h3 className="display inline-block bg-surface px-3 py-1.5 text-xl text-fg shadow-[4px_4px_0_rgb(var(--accent2))] transition-transform duration-300 group-hover:-translate-y-1 sm:text-2xl">
          {p.title}
        </h3>
      </div>
      <div className="flex flex-1 flex-col px-6 pb-5 pt-3">
        <div className="flex-1">
          <p className="line-clamp-3 text-sm leading-relaxed text-fg/75">{p.description}</p>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tags.slice(0, 4).map((t) => (
            <Chip key={t}>{t}</Chip>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 font-cond text-sm font-bold uppercase tracking-wide">
          {p.caseStudy && (
            <button onClick={() => onOpen(p.slug)} className="inline-flex items-center gap-1.5 uppercase tracking-wide text-accent transition hover:text-fg">
              <LuBookOpen /> Case study
            </button>
          )}
          {p.live && (
            <a href={asset(p.live)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-fg transition hover:text-accent">
              Live demo <LuArrowUpRight />
            </a>
          )}
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-fg transition hover:text-accent">
              <FaGithub /> Code
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

  // case-study overlay, deep-linkable as #case-<slug>
  const studies = projects.filter((p) => p.caseStudy)
  const [open, setOpen] = useState(null)
  useEffect(() => {
    const fromHash = () => {
      const m = location.hash.match(/^#case-(.+)$/)
      setOpen(m && studies.some((s) => s.slug === m[1]) ? m[1] : null)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])
  const show = useCallback((slug) => {
    setOpen(slug)
    history.replaceState(null, '', slug ? `#case-${slug}` : '#projects')
  }, [])
  const i = studies.findIndex((s) => s.slug === open)
  const current = i >= 0 ? studies[i] : null

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
          render={(p) => <ProjectCard p={p} onOpen={show} />}
        />
      </SpotlightGroup>

      {current && (
        <CaseStudy
          p={current}
          onClose={() => show(null)}
          onPrev={studies.length > 1 ? () => show(studies[(i - 1 + studies.length) % studies.length].slug) : undefined}
          onNext={studies.length > 1 ? () => show(studies[(i + 1) % studies.length].slug) : undefined}
        />
      )}
    </Panel>
  )
}
