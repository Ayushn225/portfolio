import { useState } from 'react'
import { SiLeetcode } from 'react-icons/si'
import { LuAward, LuFlame, LuTrophy } from 'react-icons/lu'
import { leetcode, profile } from '../data/portfolio'
import { Card, Reveal, Section, SpotlightGroup } from '../components/ui'
import { useCountUp, useReveal } from '../hooks'

const diff = [
  { key: 'easy', label: 'Easy', bar: 'bg-easy', text: 'text-easy', stroke: 'rgb(var(--easy))' },
  { key: 'medium', label: 'Medium', bar: 'bg-medium', text: 'text-medium', stroke: 'rgb(var(--medium))' },
  { key: 'hard', label: 'Hard', bar: 'bg-hard', text: 'text-hard', stroke: 'rgb(var(--hard))' },
]

/** Donut split by difficulty. Hovering a segment or bar focuses it. */
function Ring({ focus, setFocus }) {
  const [ref, visible] = useReveal()
  const n = useCountUp(leetcode.solved, visible)
  const r = 70
  const c = 2 * Math.PI * r
  let offset = 0
  const segs = diff.map((d) => {
    const len = (leetcode[d.key].solved / leetcode.solved) * c
    const s = { ...d, len, offset }
    offset += len
    return s
  })
  const f = focus && leetcode[focus]

  return (
    <div ref={ref} className="relative mx-auto h-52 w-52">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle cx="90" cy="90" r={r} fill="none" stroke="rgb(var(--raised))" strokeWidth="14" />
        {segs.map((s) => (
          <circle
            key={s.key}
            cx="90"
            cy="90"
            r={r}
            fill="none"
            stroke={s.stroke}
            strokeWidth={focus === s.key ? 18 : 14}
            strokeDasharray={`${visible ? Math.max(0, s.len - 4) : 0} ${c}`}
            strokeDashoffset={-s.offset}
            opacity={focus && focus !== s.key ? 0.25 : 1}
            onMouseEnter={() => setFocus(s.key)}
            onMouseLeave={() => setFocus(null)}
            style={{ transition: 'stroke-dasharray 1.4s cubic-bezier(.2,.7,.2,1), opacity .3s, stroke-width .3s', cursor: 'pointer' }}
          />
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-display text-4xl font-extrabold tabular-nums text-fg">{f ? f.solved : n}</p>
          <p className="text-xs text-muted">{f ? `${diff.find((d) => d.key === focus).label} solved` : `of ${leetcode.total.toLocaleString()} solved`}</p>
        </div>
      </div>
    </div>
  )
}

export default function LeetCode() {
  const [ref, visible] = useReveal()
  const [focus, setFocus] = useState(null)
  const tiles = [
    { Icon: LuTrophy, value: leetcode.rating, label: 'Contest rating', sub: leetcode.topPercent },
    { Icon: LuAward, value: leetcode.contests, label: 'Contests attended', sub: `${leetcode.activeDays} active days` },
    { Icon: LuFlame, value: leetcode.streak, label: 'Best streak (days)' },
  ]
  return (
    <Section id="leetcode" eyebrow="Competitive programming" title="LeetCode progress." intro="Data structures and algorithms practice, tracked over time.">
      <SpotlightGroup className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <Card className="flex h-full flex-col items-center justify-center gap-6 p-7">
            <Ring focus={focus} setFocus={setFocus} />
            <a href={profile.socials.leetcode} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-medium">
              <SiLeetcode className="text-medium" /> {leetcode.username}
            </a>
          </Card>
        </Reveal>

        <div className="grid gap-4">
          <Reveal delay={80}>
            <Card className="p-6 sm:p-7">
              <div ref={ref} className="space-y-5">
                {diff.map((d) => {
                  const { solved, total } = leetcode[d.key]
                  const pct = (solved / total) * 100
                  return (
                    <div
                      key={d.key}
                      onMouseEnter={() => setFocus(d.key)}
                      onMouseLeave={() => setFocus(null)}
                      className={`transition-opacity duration-300 ${focus && focus !== d.key ? 'opacity-40' : ''}`}
                    >
                      <div className="mb-2 flex items-baseline justify-between text-sm">
                        <span className={`font-semibold ${d.text}`}>{d.label}</span>
                        <span className="font-mono tabular-nums text-muted">
                          <span className="text-fg">{solved}</span> / {total}
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-raised">
                        <div className={`h-full rounded-full ${d.bar} transition-[width] duration-[1400ms] ease-out`} style={{ width: visible ? `${pct}%` : '0%' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {tiles.map(({ Icon, value, label, sub }, i) => (
              <Reveal key={label} delay={120 + i * 70}>
                <Card tilt className="group h-full p-5">
                  <Icon className="text-xl text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-125" />
                  <p className="mt-3 font-display text-2xl font-bold tabular-nums text-fg">{value}</p>
                  <p className="text-xs text-muted">{label}</p>
                  {sub && <p className="mt-1 text-xs font-semibold text-accent">{sub}</p>}
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="flex flex-wrap gap-2">
              {leetcode.badges.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-semibold text-fg/80 transition hover:border-medium hover:text-medium">
                  <LuAward /> {b}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </SpotlightGroup>
    </Section>
  )
}
