import { useState } from 'react'
import { LuCheck, LuCopy, LuSend, LuTrophy } from 'react-icons/lu'
import { achievements, profile } from '../data/portfolio'
import { Card, Magnetic, Reveal, Section, SpotlightGroup } from '../components/ui'
import Socials from '../components/Socials'

export function Achievements() {
  return (
    <Section id="achievements" eyebrow="Achievements" title="Achievements.">
      <SpotlightGroup className="grid gap-4 md:grid-cols-3">
        {achievements.map((a, i) => (
          <Reveal key={a.title} delay={i * 80}>
            <Card tilt className="group h-full p-6">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-lg text-accent transition-transform duration-300 group-hover:rotate-12">
                  <LuTrophy />
                </span>
                <span className="font-mono text-xs text-muted">{a.date}</span>
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-fg">{a.title}</h3>
              <p className="text-sm text-accent">{a.org}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg/70">{a.description}</p>
            </Card>
          </Reveal>
        ))}
      </SpotlightGroup>
    </Section>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — the address is still visible and selectable */
    }
  }

  const submit = (e) => {
    e.preventDefault()
    // Swap for Formspree / EmailJS / your API later.
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent('Hello from your portfolio')}&body=${body}`
  }

  const field =
    'w-full rounded-2xl border border-line bg-bg px-4 py-3 text-fg placeholder-muted/70 outline-none transition focus:border-accent'

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something together." intro="Have a role, a project or just a question? My inbox is open.">
      <SpotlightGroup className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <Card className="flex h-full flex-col justify-between gap-8 p-7 sm:p-8">
            <div>
              <p className="text-sm text-muted">Email me at</p>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="select-all break-all font-display text-xl font-bold text-fg sm:text-2xl">{profile.email}</span>
                <button id="copy-email" onClick={copy} className="icon-btn !h-9 !w-9 !text-base" aria-label="Copy email">
                  {copied ? <LuCheck className="text-easy" /> : <LuCopy />}
                </button>
              </div>
              <p className="mt-6 text-sm text-muted">Based in {profile.location}. Usually replies within a day.</p>
            </div>
            <Socials withEmail={false} />
          </Card>
        </Reveal>

        <Reveal delay={100}>
          <Card as="form" onSubmit={submit} className="grid gap-4 p-7 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-muted" htmlFor="c-name">
                Name
                <input id="c-name" required className={field} placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label className="grid gap-2 text-sm text-muted" htmlFor="c-email">
                Email
                <input id="c-email" type="email" required className={field} placeholder="you@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
            </div>
            <label className="grid gap-2 text-sm text-muted" htmlFor="c-msg">
              Message
              <textarea id="c-msg" required rows={5} className={`${field} resize-none`} placeholder="Tell me about the role or project…" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </label>
            <Magnetic className="justify-self-start">
              <button type="submit" className="btn-primary">
                Send message <LuSend />
              </button>
            </Magnetic>
          </Card>
        </Reveal>
      </SpotlightGroup>
    </Section>
  )
}
