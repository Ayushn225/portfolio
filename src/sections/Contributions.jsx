import { useMemo, useState } from 'react'
import { FaGithub } from 'react-icons/fa6'
import { LuArrowUpRight } from 'react-icons/lu'
import { contributions, profile, projects } from '../data/portfolio'
import { Card, Reveal, Section, SpotlightGroup } from '../components/ui'
import { useCountUp, useReveal } from '../hooks'

const levels = ['bg-raised', 'bg-accent/30', 'bg-accent/55', 'bg-accent/80', 'bg-accent']
const levelOf = (n) => (n === 0 ? 0 : n <= 2 ? 1 : n <= 4 ? 2 : n <= 7 ? 3 : 4)
const CELL = 15 // 12px square + 3px gap

/** Turns the calendar in portfolio.js into weeks of days, plus summary stats. */
function useCalendar() {
  return useMemo(() => {
    const { start, end, days } = contributions.calendar
    const toKey = (d) => d.toISOString().slice(0, 10)
    const weeks = []
    const months = []
    let total = 0
    let active = 0
    let run = 0
    let best = 0
    const d = new Date(start + 'T00:00:00Z')
    const last = new Date(end + 'T00:00:00Z')
    while (d <= last) {
      if (d.getUTCDay() === 0) weeks.push([])
      const key = toKey(d)
      const count = days[key] || 0
      weeks[weeks.length - 1].push({ key, count, level: levelOf(count) })
      total += count
      if (count) {
        active++
        run++
        best = Math.max(best, run)
      } else run = 0
      if (d.getUTCDate() === 1) months.push({ week: weeks.length - 1, label: d.toLocaleString('en', { month: 'short', timeZone: 'UTC' }) })
      d.setUTCDate(d.getUTCDate() + 1)
    }
    return { weeks, months, total, active, best }
  }, [])
}

function StatTile({ value, label }) {
  const [ref, visible] = useReveal()
  const n = useCountUp(value, visible)
  return (
    <Card className="p-5">
      <p ref={ref} className="font-display text-2xl font-bold tabular-nums text-fg sm:text-3xl">
        {n.toLocaleString()}
      </p>
      <p className="mt-1 text-xs text-muted sm:text-sm">{label}</p>
    </Card>
  )
}

const fmtDate = (key) =>
  new Date(key + 'T00:00:00Z').toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

export default function Contributions() {
  const { weeks, months, total, active, best } = useCalendar()
  const [ref, visible] = useReveal()
  const [hover, setHover] = useState(null)
  const stats = [
    { value: total, label: 'Contributions in the last year' },
    { value: active, label: 'Active days' },
    { value: best, label: 'Longest streak (days)' },
    { value: contributions.publicRepos, label: 'Public repositories' },
  ]
  const repos = projects.filter((p) => p.github)

  return (
    <Section id="contributions" eyebrow="GitHub" title="Code activity." intro="Public GitHub contributions over the past year, and the repositories behind my projects.">
      <SpotlightGroup className="grid grid-cols-1 gap-4 [&>*]:min-w-0">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70}>
              <StatTile {...s} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <Card className="p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-display text-base font-bold text-fg hover:text-accent">
                <FaGithub /> @{contributions.githubUser}
              </a>
              <p className="min-h-[1.25rem] font-mono text-xs text-muted" aria-live="polite">
                {hover ? (
                  <>
                    <span className="text-accent">
                      {hover.count} contribution{hover.count === 1 ? '' : 's'}
                    </span>{' '}
                    · {fmtDate(hover.key)}
                  </>
                ) : (
                  'Hover a square'
                )}
              </p>
            </div>
            <div className="overflow-x-auto pb-2">
              <div ref={ref} className="mx-auto w-max" onMouseLeave={() => setHover(null)}>
                <div className="relative mb-2 h-3 font-mono text-[10px] text-muted">
                  {months.map((m) => (
                    <span key={m.week + m.label} className="absolute" style={{ left: m.week * CELL }}>
                      {m.label}
                    </span>
                  ))}
                </div>
                <div className="flex gap-[3px]">
                  {weeks.map((week, w) => (
                    <div key={w} className="flex flex-col gap-[3px]">
                      {week.map((day) => (
                        <span
                          key={day.key}
                          onMouseEnter={() => setHover(day)}
                          className={`h-3 w-3 rounded-[3px] ${levels[day.level]} transition-all duration-500 hover:scale-150 hover:ring-2 hover:ring-fg`}
                          style={{
                            transitionDelay: visible ? `${w * 12}ms` : '0ms',
                            opacity: visible ? 1 : 0,
                            transform: visible ? undefined : 'scale(0.3)',
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-muted">
              Less
              {levels.map((l) => (
                <span key={l} className={`h-3 w-3 rounded-[3px] ${l}`} />
              ))}
              More
            </div>
          </Card>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((r, i) => (
            <Reveal key={r.title} delay={(i % 3) * 70}>
              <Card as="a" href={r.github} target="_blank" rel="noreferrer" className="group flex h-full items-start gap-4 p-5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-raised text-lg text-fg transition-all duration-300 group-hover:-rotate-12 group-hover:bg-accent group-hover:text-accent-fg">
                  <FaGithub />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-1 truncate font-mono text-sm font-semibold text-fg">
                    {r.github.split('/').pop()}
                    <LuArrowUpRight className="shrink-0 text-accent opacity-0 transition-opacity group-hover:opacity-100" />
                  </p>
                  <p className="mt-1 text-xs text-muted">{r.tags.slice(0, 3).join(' · ')}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </SpotlightGroup>
    </Section>
  )
}
