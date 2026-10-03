import { LuArrowDown, LuArrowUpRight, LuMapPin } from 'react-icons/lu'
import { profile } from '../data/portfolio'
import { useTypewriter } from '../hooks'
import Socials from '../components/Socials'
import { Card, Magnetic } from '../components/ui'

/** Splits a word into letters that rise in one after another. */
function RiseText({ text, delay = 0, className = '' }) {
  return (
    <span className={`inline-flex overflow-hidden pb-[0.08em] ${className}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span key={i} aria-hidden="true" className="inline-block animate-rise" style={{ animationDelay: `${delay + i * 45}ms` }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

function ProfileCard() {
  const stats = profile.highlights
  return (
    <Card tilt className="w-full max-w-sm overflow-hidden p-6 sm:p-7" data-cursor>
      {/* dotted layer that drifts with the cursor for depth */}
      <div
        aria-hidden="true"
        className="bg-dots pointer-events-none absolute -inset-10 opacity-70"
        style={{ transform: 'translate(calc((var(--mx, 200px) - 200px) * -0.06), calc((var(--my, 200px) - 200px) * -0.06))' }}
      />
      <div className="relative [transform:translateZ(40px)]">
        <div className="flex items-center gap-4">
          <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-accent font-display text-xl font-bold text-accent-fg">
            {profile.avatar ? <img src={profile.avatar} alt="" className="h-full w-full object-cover" /> : profile.initials}
          </div>
          <div className="min-w-0">
            <p className="font-display text-lg font-bold text-fg">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="truncate text-sm text-muted">{profile.roles[0]}</p>
          </div>
        </div>

        {profile.available && (
          <div className="mt-5 flex items-center gap-2 rounded-xl border border-line bg-bg/60 px-3 py-2 text-xs font-semibold text-fg/90">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-easy opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-easy" />
            </span>
            {profile.availableText}
          </div>
        )}

        <div className="mt-5 grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-bg/60">
          {stats.map((s) => (
            <div key={s.l} className="px-2 py-3 text-center">
              <p className="font-display text-lg font-bold tabular-nums text-fg">{s.v}</p>
              <p className="text-[11px] uppercase tracking-wider text-muted">{s.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between font-mono text-[11px] text-muted">
          <span className="inline-flex items-center gap-1">
            <LuMapPin /> {profile.location}
          </span>
          <span className="[@media(pointer:coarse)]:hidden">move your cursor ✦</span>
        </div>
      </div>
    </Card>
  )
}

export default function Hero() {
  const role = useTypewriter(profile.roles)

  return (
    <section id="top" className="relative px-4 pb-16 pt-32 sm:px-6 md:pb-24 md:pt-40">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.3fr_1fr]">
        <div className="text-center lg:text-left">
          <p className="eyebrow mb-6 animate-rise" style={{ animationDelay: '0ms' }}>
            Hello, world
          </p>
          <h1 className="font-display text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-fg sm:text-6xl lg:text-7xl">
            <RiseText text="I'm" delay={100} className="mr-[0.25em]" />
            <RiseText text={profile.firstName} delay={260} className="text-accent" />
          </h1>

          <p className="mt-6 h-8 font-mono text-lg text-fg/85 sm:text-xl" aria-live="polite">
            <span className="text-accent">$ </span>
            {role}
            <span className="ml-0.5 inline-block w-[2px] animate-blink bg-accent align-middle" style={{ height: '1.1em' }} />
          </p>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">{profile.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Magnetic>
              <a href="#projects" className="btn-primary">
                View my work <LuArrowUpRight />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#contact" className="btn-ghost">
                Get in touch
              </a>
            </Magnetic>
          </div>

          <div className="mt-8 flex justify-center lg:justify-start">
            <Socials />
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ProfileCard />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="mx-auto mt-16 hidden h-12 w-7 items-start justify-center rounded-full border border-line p-1.5 text-muted transition hover:border-accent hover:text-accent md:flex"
      >
        <LuArrowDown className="animate-bounce" />
      </a>
    </section>
  )
}
