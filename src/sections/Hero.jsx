import { LuArrowUpRight, LuBadgeCheck, LuMapPin } from 'react-icons/lu'
import { profile } from '../data/portfolio'
import { useTypewriter } from '../hooks'
import Socials from '../components/Socials'
import { Card, Magnetic } from '../components/ui'

/** Letters that rise in one after another. */
function RiseText({ text, delay = 0, className = '' }) {
  return (
    <span className={`inline-flex overflow-hidden ${className}`} aria-label={text}>
      {text.split('').map((ch, i) => (
        <span key={i} aria-hidden="true" className="inline-block animate-rise" style={{ animationDelay: `${delay + i * 55}ms` }}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  )
}

function ProfileCard() {
  return (
    <Card tilt className="w-full max-w-sm overflow-hidden" data-cursor>
      {/* banner with stripes that drift with the cursor */}
      <div className="relative h-28 overflow-hidden bg-accent">
        <div
          aria-hidden="true"
          className="bg-stripes absolute -inset-10 opacity-60 mix-blend-overlay"
          style={{ transform: 'translate(calc((var(--mx, 190px) - 190px) * -0.05), calc((var(--my, 150px) - 150px) * -0.05))' }}
        />
        <span className="absolute bottom-0 left-0 h-2 w-full bg-accent2" />
        <span className="display absolute right-5 top-4 text-sm tracking-[0.2em] text-accent-fg/80">Portfolio · {new Date().getFullYear()}</span>
      </div>
      <div className="relative px-6 pb-6 [transform:translateZ(40px)]">
        <div className="-mt-10 grid h-20 w-20 place-items-center overflow-hidden rounded-xl border-4 border-surface bg-fg font-display text-3xl text-bg">
          {profile.avatar ? <img src={profile.avatar} alt="" className="h-full w-full object-cover" /> : profile.initials}
        </div>
        <p className="display mt-4 text-3xl text-fg">
          {profile.firstName} {profile.lastName}
        </p>
        <p className="font-cond text-sm font-semibold uppercase tracking-wide text-muted">{profile.roles[0]}</p>

        {profile.available && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1.5 font-cond text-xs font-bold uppercase tracking-wide text-accent">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.availableText}
          </div>
        )}

        <div className="mt-5 grid grid-cols-3 divide-x divide-line border-y border-line">
          {profile.highlights.map((s) => (
            <div key={s.l} className="py-3 text-center">
              <p className="display text-2xl text-fg">{s.v}</p>
              <p className="font-cond text-[11px] font-bold uppercase tracking-widest text-muted">{s.l}</p>
            </div>
          ))}
        </div>

        <p className="mt-4 inline-flex items-center gap-1.5 font-cond text-xs uppercase tracking-wide text-muted">
          <LuMapPin className="text-accent2" /> {profile.location}
        </p>
      </div>
    </Card>
  )
}

export default function Hero() {
  const role = useTypewriter(profile.roles)
  return (
    <section id="top" className="panel relative flex flex-col justify-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-16 lg:pb-12">
      {/* oversized outline initials in the background */}
      <span
        aria-hidden="true"
        className="display pointer-events-none absolute -bottom-10 -left-4 select-none text-[38vw] leading-none text-transparent opacity-[0.07] [-webkit-text-stroke:2px_rgb(var(--fg))] lg:text-[26vw]"
      >
        {profile.initials}
      </span>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <p className="eyebrow mb-5 animate-rise">Hello, I'm</p>
          <h1 className="display text-[22vw] text-fg sm:text-[8.5rem] lg:text-[9rem]">
            <RiseText text={profile.firstName} delay={100} />
            <br />
            <RiseText text={profile.lastName} delay={350} className="text-accent" />
          </h1>

          <p className="mt-6 h-8 font-cond text-xl font-bold uppercase tracking-wide text-fg sm:text-2xl" aria-live="polite">
            <span className="mr-2 inline-block h-[3px] w-8 bg-accent2 align-middle" />
            {role}
            <span className="ml-1 inline-block w-[3px] animate-blink bg-accent2 align-middle" style={{ height: '1em' }} />
          </p>

          {/* proof chips — the three facts a recruiter should see first */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.proof.map((c, i) => {
              const inner = (
                <>
                  <LuBadgeCheck className="shrink-0 text-accent2" />
                  {c.label}
                  {c.href && <LuArrowUpRight className="opacity-60" />}
                </>
              )
              const cls =
                'inline-flex animate-rise items-center gap-1.5 rounded-md border-2 border-fg/80 bg-surface px-3 py-1.5 font-cond text-sm font-bold uppercase tracking-wide text-fg'
              return (
                <li key={c.label} style={{ animationDelay: `${600 + i * 90}ms` }} className="animate-rise">
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noreferrer" className={`${cls} transition hover:border-accent hover:bg-accent hover:text-accent-fg`}>
                      {inner}
                    </a>
                  ) : (
                    <span className={cls}>{inner}</span>
                  )}
                </li>
              )
            })}
          </ul>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{profile.tagline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#projects" className="btn-primary">
                View projects <LuArrowUpRight />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                Resume
              </a>
            </Magnetic>
          </div>

          <div className="mt-8 lg:hidden">
            <Socials />
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <ProfileCard />
        </div>
      </div>

      {/* mouse scroll hint, like the reference site */}
      <a href="#about" aria-label="Scroll to about" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted lg:flex">
        <span className="flex h-10 w-6 justify-center rounded-full border-2 border-current pt-2">
          <span className="h-2 w-1 animate-bounce rounded-full bg-accent2" />
        </span>
        <span className="font-cond text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
      </a>
    </section>
  )
}
