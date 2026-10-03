import { useEffect, useState } from 'react'
import { LuClock, LuFlame, LuHammer, LuSparkles } from 'react-icons/lu'
import { about, profile } from '../data/portfolio'
import { Card, Heading, Panel, Reveal, SpotlightGroup } from '../components/ui'
import { useCountUp, useReveal } from '../hooks'

function Stat({ value, label, decimals = 0 }) {
  const [ref, visible] = useReveal()
  const n = useCountUp(value, visible, 1400, decimals)
  return (
    <Card tilt className="flex h-full flex-col justify-between p-5">
      <div ref={ref} className="display text-4xl text-fg sm:text-5xl">
        {n.toFixed(decimals)}
      </div>
      <p className="mt-3 font-cond text-xs font-bold uppercase tracking-widest text-muted">{label}</p>
      <span className="absolute right-4 top-4 h-2 w-2 rounded-full bg-accent2" />
    </Card>
  )
}

function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const t = new Intl.DateTimeFormat('en-GB', { timeZone: profile.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }).format(now)
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs tabular-nums text-muted">
      <LuClock className="text-accent" /> {t} IST
    </span>
  )
}

export default function About() {
  const icons = [LuHammer, LuSparkles, LuFlame]
  return (
    <Panel id="about" tone="alt">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <Heading index="02" eyebrow="Who I am" title="About me" />
          <Reveal className="space-y-4 text-base leading-relaxed text-fg/85 sm:text-lg">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>
          <Reveal delay={150} className="mt-6 flex flex-wrap items-center gap-4">
            <Clock />
            <span className="font-cond text-xs font-bold uppercase tracking-widest text-muted">{profile.location}</span>
          </Reveal>
        </div>

        <SpotlightGroup className="grid content-center gap-4">
          <div className="grid grid-cols-2 gap-4">
            {about.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <Stat {...s} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={250}>
            <Card className="p-5">
              <p className="eyebrow mb-4">Right now</p>
              <ul className="space-y-3">
                {about.now.map((r, i) => {
                  const Icon = icons[i % icons.length]
                  return (
                    <li key={r.k} className="flex items-start gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent text-accent-fg">
                        <Icon />
                      </span>
                      <p className="text-sm text-fg">
                        <span className="font-cond font-bold uppercase tracking-wide text-muted">{r.k} · </span>
                        {r.v}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </Card>
          </Reveal>
        </SpotlightGroup>
      </div>
    </Panel>
  )
}
