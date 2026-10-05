import { useEffect, useRef } from 'react'
import { FaGithub } from 'react-icons/fa6'
import { LuArrowLeft, LuArrowRight, LuArrowUpRight, LuX } from 'react-icons/lu'
import { AgentDiagram, BrowserFrame, KafkaDiagram, PhoneFrame, TerminalFrame, asset } from './Mockups'
import { Chip } from './ui'

function Block({ n, title, children }) {
  return (
    <section className="grid gap-4 border-t border-line py-8 md:grid-cols-[180px_1fr] md:gap-10">
      <h3 className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-muted">{n}</span>
        <span className="display text-2xl text-fg">{title}</span>
      </h3>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

function Architecture({ p }) {
  const cs = p.caseStudy
  if (cs.architecture === 'agent') return <AgentDiagram className="w-full" />
  if (cs.architecture === 'kafka') return <KafkaDiagram className="w-full" />
  if (cs.architecture === 'browser') return <BrowserFrame src={p.cover.image} url={p.cover.url} alt={`${p.title} screenshot`} className="w-full" />
  if (cs.architecture === 'terminal') return <TerminalFrame lines={p.cover.lines} title="auth-service — routes" />
  if (cs.architecture === 'screens')
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {cs.screens.map((s) => (
          <figure key={s.src}>
            <PhoneFrame src={s.src} alt={`${p.title} ${s.label} screen`} />
            <figcaption className="mt-2 text-center font-cond text-xs font-bold uppercase tracking-widest text-muted">{s.label}</figcaption>
          </figure>
        ))}
      </div>
    )
  return null
}

/**
 * Full-screen case study for one project. Closes on Esc, the close
 * button or the backdrop; arrows step to the previous / next study.
 */
export default function CaseStudy({ p, onClose, onPrev, onNext }) {
  const panel = useRef(null)

  useEffect(() => {
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    panel.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext?.()
      if (e.key === 'ArrowLeft') onPrev?.()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      html.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, onNext, onPrev])

  useEffect(() => {
    panel.current?.scrollTo({ top: 0 })
  }, [p.slug])

  const cs = p.caseStudy
  let n = 0
  const num = () => String(++n).padStart(2, '0')

  return (
    <div className="fixed inset-0 z-[70] flex justify-end bg-fg/40 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${p.title} case study`}>
      <div
        ref={panel}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative h-full w-full max-w-4xl animate-slidein overflow-y-auto bg-bg outline-none"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        {/* sticky bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-bg/90 px-5 py-3 backdrop-blur sm:px-10">
          <span className="font-cond text-xs font-bold uppercase tracking-[0.3em] text-accent">Case study</span>
          <div className="flex items-center gap-2">
            {onPrev && (
              <button id="case-prev" onClick={onPrev} aria-label="Previous case study" className="icon-btn">
                <LuArrowLeft />
              </button>
            )}
            {onNext && (
              <button id="case-next" onClick={onNext} aria-label="Next case study" className="icon-btn">
                <LuArrowRight />
              </button>
            )}
            <button id="case-close" onClick={onClose} aria-label="Close case study" className="icon-btn !bg-fg !text-bg hover:!bg-accent hover:!text-accent-fg">
              <LuX />
            </button>
          </div>
        </div>

        <div className="px-5 pb-16 pt-8 sm:px-10">
          <p className="eyebrow">{p.category}</p>
          <h2 className="display mt-3 text-5xl text-fg sm:text-7xl">{p.title}</h2>
          <span className="mt-4 block h-1.5 w-24 bg-accent" />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg/80">{p.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {p.github && (
              <a href={p.github} target="_blank" rel="noreferrer" className="btn-primary">
                <FaGithub /> View code
              </a>
            )}
            {p.live && (
              <a href={asset(p.live)} target="_blank" rel="noreferrer" className="btn-ghost">
                Live demo <LuArrowUpRight />
              </a>
            )}
          </div>

          {p.facts && (
            <dl className="mt-10 grid grid-cols-3 divide-x divide-line border-y border-line">
              {p.facts.map((f) => (
                <div key={f.l} className="px-3 py-4 text-center">
                  <dt className="display text-2xl text-fg sm:text-4xl">{f.v}</dt>
                  <dd className="mt-1 font-cond text-[11px] font-bold uppercase tracking-widest text-muted">{f.l}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-10">
            <Block n={num()} title="The problem">
              <p className="text-base leading-relaxed text-fg/85 sm:text-lg">{cs.problem}</p>
            </Block>

            <Block n={num()} title="How I built it">
              <ol className="space-y-3">
                {cs.approach.map((a, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed text-fg/85">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded bg-accent font-cond text-xs font-bold text-accent-fg">{i + 1}</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ol>
            </Block>

            {cs.architecture && (
              <Block n={num()} title={cs.architecture === 'screens' ? 'Screens' : cs.architecture === 'browser' ? 'Interface' : cs.architecture === 'terminal' ? 'API routes' : 'Architecture'}>
                <div className="rounded-xl border border-line bg-surface p-4 sm:p-6">
                  <Architecture p={p} />
                </div>
              </Block>
            )}

            {cs.evaluation && (
              <Block n={num()} title="Evaluation">
                <ul className="space-y-3">
                  {cs.evaluation.map((e, i) => (
                    <li key={i} className="flex gap-3 text-base leading-relaxed text-fg/85">
                      <span className="mt-2.5 h-2 w-2 shrink-0 rotate-45 bg-accent2" />
                      <span className={e.startsWith('Run with') ? 'font-mono text-sm' : ''}>{e}</span>
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
