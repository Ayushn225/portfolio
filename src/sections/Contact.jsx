import { useState } from 'react'
import { LuArrowUpRight, LuCheck, LuCopy, LuSend, LuTrophy } from 'react-icons/lu'
import { achievements, profile } from '../data/portfolio'
import { Card, Heading, Magnetic, Reveal, SpotlightGroup } from '../components/ui'
import Socials from '../components/Socials'

/** Last panel: achievements strip, contact block and the footer. */
export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — the address is visible and selectable */
    }
  }

  const submit = (e) => {
    e.preventDefault()
    // Swap for Formspree / EmailJS / your own API to send without a mail app.
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Hello from your portfolio')}&body=${body}`
  }

  const field =
    'w-full rounded-md border-2 border-line bg-surface px-4 py-3 text-fg placeholder-muted/70 outline-none transition focus:border-accent'

  return (
    <section id="contact" className="panel relative flex flex-col bg-raised/60">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pb-12 pt-24 sm:px-6 lg:px-0">
        {/* achievements */}
        <SpotlightGroup className="mb-14 grid gap-4 md:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <Card tilt className="group flex h-full items-start gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-accent2 text-lg text-accent-fg transition-transform duration-300 group-hover:rotate-12">
                  <LuTrophy />
                </span>
                <div className="min-w-0">
                  <p className="font-cond text-xs font-bold uppercase tracking-widest text-muted">
                    {a.org} · {a.date}
                  </p>
                  <h3 className="display mt-1 text-xl text-fg">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg/70">{a.description}</p>
                </div>
              </Card>
            </Reveal>
          ))}
        </SpotlightGroup>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Heading index="08" eyebrow="Get in touch" title="Let's talk" intro="Have an internship, a project or a question? Send a message." />
            <p className="font-cond text-xs font-bold uppercase tracking-widest text-muted">Email</p>
            <div className="mt-1 flex flex-wrap items-center gap-3">
              <span className="select-all break-all font-cond text-2xl font-bold text-fg sm:text-3xl">{profile.email}</span>
              <button id="copy-email" onClick={copy} className="icon-btn" aria-label="Copy email">
                {copied ? <LuCheck className="text-easy" /> : <LuCopy />}
              </button>
            </div>
            <div className="mt-8">
              <Socials withEmail={false} />
            </div>
          </div>

          <Reveal delay={100}>
            <Card as="form" onSubmit={submit} className="grid gap-4 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 font-cond text-xs font-bold uppercase tracking-widest text-muted" htmlFor="c-name">
                  Name
                  <input id="c-name" required className={`${field} font-sans text-base normal-case tracking-normal`} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </label>
                <label className="grid gap-2 font-cond text-xs font-bold uppercase tracking-widest text-muted" htmlFor="c-email">
                  Email
                  <input id="c-email" type="email" required className={`${field} font-sans text-base normal-case tracking-normal`} placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </label>
              </div>
              <label className="grid gap-2 font-cond text-xs font-bold uppercase tracking-widest text-muted" htmlFor="c-msg">
                Message
                <textarea id="c-msg" required rows={4} className={`${field} resize-none font-sans text-base normal-case tracking-normal`} placeholder="Tell me about the role or project…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </label>
              <Magnetic className="justify-self-start">
                <button type="submit" className="btn-primary">
                  Send message <LuSend />
                </button>
              </Magnetic>
            </Card>
          </Reveal>
        </div>
      </div>

      <footer className="border-t-4 border-accent2 bg-fg px-4 py-6 text-bg sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <p className="display text-xl">
            {profile.firstName} {profile.lastName}
          </p>
          <p className="font-cond text-xs font-bold uppercase tracking-widest text-bg/70">Designed & built by me · © {new Date().getFullYear()}</p>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-cond text-xs font-bold uppercase tracking-widest text-bg hover:text-accent2">
            Source on GitHub <LuArrowUpRight />
          </a>
        </div>
      </footer>
    </section>
  )
}
