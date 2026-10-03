import { useEffect, useState } from 'react'
import { LuBookOpen, LuClock, LuHammer, LuSparkles } from 'react-icons/lu'
import { about, profile, skills } from '../data/portfolio'
import { Card, Reveal, Section, SpotlightGroup } from '../components/ui'
import { useCountUp, useReveal } from '../hooks'

function Stat({ value, suffix, label, decimals = 0 }) {
  const [ref, visible] = useReveal()
  const n = useCountUp(value, visible, 1400, decimals)
  return (
    <Card className="flex h-full flex-col justify-between p-4 sm:p-6">
      <p className="text-sm text-muted">{label}</p>
      <div ref={ref} className="mt-4 font-display text-3xl sm:mt-6 sm:text-4xl font-bold tabular-nums text-fg">
        {n.toFixed(decimals)}
        <span className="text-accent">{suffix}</span>
      </div>
    </Card>
  )
}

function ClockCard() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const fmt = (o) => new Intl.DateTimeFormat('en-GB', { timeZone: profile.timezone, ...o }).format(now)
  const h = Number(fmt({ hour: 'numeric', hour12: false }))
  const m = Number(fmt({ minute: 'numeric' }))
  const s = Number(fmt({ second: 'numeric' }))
  const hand = (deg, len, w, cls) => (
    <line x1="50" y1="50" x2="50" y2={50 - len} strokeWidth={w} strokeLinecap="round" className={cls} transform={`rotate(${deg} 50 50)`} />
  )
  return (
    <Card className="flex h-full items-center gap-5 p-5 sm:p-6">
      <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0" aria-hidden="true">
        <circle cx="50" cy="50" r="46" fill="rgb(var(--bg))" stroke="rgb(var(--line))" strokeWidth="2" />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="50" y1="8" x2="50" y2={i % 3 ? 12 : 15} stroke="rgb(var(--muted))" strokeWidth="2" transform={`rotate(${i * 30} 50 50)`} />
        ))}
        {hand((h % 12) * 30 + m * 0.5, 22, 4, 'stroke-fg')}
        {hand(m * 6, 32, 3, 'stroke-fg')}
        {hand(s * 6, 36, 1.5, 'stroke-accent')}
        <circle cx="50" cy="50" r="3" fill="rgb(var(--accent))" />
      </svg>
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-sm text-muted">
          <LuClock /> My local time
        </p>
        <p className="mt-1 font-display text-2xl font-bold tabular-nums text-fg">{fmt({ hour: '2-digit', minute: '2-digit', hour12: true })}</p>
        <p className="text-xs text-muted">{profile.location} · IST (UTC+5:30)</p>
      </div>
    </Card>
  )
}

function NowCard() {
  const icons = [LuHammer, LuSparkles, LuBookOpen]
  const rows = about.now.map((r, i) => ({ ...r, Icon: icons[i % icons.length] }))
  return (
    <Card className="h-full p-6">
      <p className="eyebrow mb-4">Right now</p>
      <ul className="space-y-4">
        {rows.map(({ Icon, k, v }) => (
          <li key={k} className="flex gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
              <Icon />
            </span>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-wider text-muted">{k}</p>
              <p className="text-sm text-fg">{v}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

function StackCard() {
  const all = skills.flatMap((g) => g.items)
  const half = Math.ceil(all.length / 2)
  const row = (items, reverse) => (
    <div className="flex w-max animate-marquee gap-2 group-hover:[animation-play-state:paused]" style={reverse ? { animationDirection: 'reverse' } : undefined}>
      {[...items, ...items].map((s, i) => (
        <span key={i} className="whitespace-nowrap rounded-xl border border-line bg-raised px-4 py-2 font-mono text-sm text-fg/80 transition hover:border-accent hover:text-accent">
          {s}
        </span>
      ))}
    </div>
  )
  return (
    <Card className="group h-full overflow-hidden py-6">
      <p className="eyebrow mb-4 px-6">Tech I use</p>
      <div className="space-y-2 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        {row(all.slice(0, half))}
        {row(all.slice(half), true)}
      </div>
    </Card>
  )
}

export default function About() {
  return (
    <Section id="about" eyebrow="About me" title="A developer who enjoys the whole product.">
      {/* Bento grid. 1 col on phones, 2 on tablets, 4 on desktop. */}
      <SpotlightGroup className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 [&>*]:min-w-0">
        <Reveal className="col-span-2 lg:row-span-2">
          <Card className="flex h-full flex-col p-6 sm:p-8">
            <p className="eyebrow mb-4">Who I am</p>
            <div className="space-y-4 text-base leading-relaxed text-fg/80 sm:text-lg">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Card>
        </Reveal>
        {about.stats.slice(0, 2).map((s, i) => (
          <Reveal key={s.label} delay={80 + i * 60}>
            <Stat {...s} />
          </Reveal>
        ))}
        <Reveal delay={200} className="col-span-2">
          <ClockCard />
        </Reveal>
        <Reveal className="col-span-2 lg:row-span-2">
          <NowCard />
        </Reveal>
        {about.stats.slice(2).map((s, i) => (
          <Reveal key={s.label} delay={80 + i * 60}>
            <Stat {...s} />
          </Reveal>
        ))}
        <Reveal delay={160} className="col-span-2">
          <StackCard />
        </Reveal>
      </SpotlightGroup>

      {/* skill groups */}
      <SpotlightGroup className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g, i) => (
          <Reveal key={g.group} delay={i * 70}>
            <Card className="h-full p-6">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">{g.group}</h3>
              <div className="flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <span key={s} className="rounded-lg bg-raised px-2.5 py-1 text-sm text-fg/85 transition hover:bg-accent hover:text-accent-fg">
                    {s}
                  </span>
                ))}
              </div>
            </Card>
          </Reveal>
        ))}
      </SpotlightGroup>
    </Section>
  )
}
