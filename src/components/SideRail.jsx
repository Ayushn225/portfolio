import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { SiLeetcode } from 'react-icons/si'
import { LuArrowUp, LuMail } from 'react-icons/lu'
import { panels, profile } from '../data/portfolio'
import { useActiveSection } from '../hooks'

const ids = panels.map((p) => p.id)

/**
 * Right-hand rail, desktop only:
 *  - social icons stacked near the top
 *  - dot navigation in the middle (label shows on hover) with a 01 / 08 counter
 */
export function SideRail() {
  const active = useActiveSection(ids) || 'top'
  const i = Math.max(0, ids.indexOf(active))
  const socials = [
    { href: profile.socials.github, label: 'GitHub', Icon: FaGithub },
    { href: profile.socials.linkedin, label: 'LinkedIn', Icon: FaLinkedinIn },
    { href: profile.socials.leetcode, label: 'LeetCode', Icon: SiLeetcode },
    { href: `mailto:${profile.email}`, label: 'Email', Icon: LuMail },
  ].filter((s) => s.href)

  return (
    <>
      <div className="fixed right-5 top-28 z-30 hidden flex-col gap-2 lg:flex">
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            aria-label={label}
            className="grid h-8 w-8 place-items-center rounded-full border border-fg/70 text-[13px] text-fg transition hover:border-accent hover:bg-accent hover:text-accent-fg"
          >
            <Icon />
          </a>
        ))}
      </div>

      <nav aria-label="Sections" className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        <span className="mb-2 font-cond text-xs font-bold tabular-nums text-muted">
          <span className="text-accent">{String(i + 1).padStart(2, '0')}</span> / {String(ids.length).padStart(2, '0')}
        </span>
        {panels.map((p) => {
          const on = p.id === active
          return (
            <a key={p.id} href={`#${p.id}`} aria-label={p.label} aria-current={on ? 'true' : undefined} className="group flex items-center gap-3">
              <span className="pointer-events-none translate-x-2 rounded bg-fg px-2 py-0.5 font-cond text-xs font-bold uppercase tracking-wide text-bg opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                {p.label}
              </span>
              <span
                className={`block rounded-full border-2 transition-all duration-300 ${
                  on ? 'h-3 w-3 border-accent bg-accent' : 'h-2.5 w-2.5 border-muted/60 bg-transparent group-hover:border-accent'
                }`}
              />
            </a>
          )
        })}
      </nav>
    </>
  )
}

export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <a
      href="#top"
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 grid h-11 w-11 place-items-center rounded-full border-2 border-accent bg-bg text-lg text-accent transition-all duration-500 hover:bg-accent hover:text-accent-fg ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <LuArrowUp />
    </a>
  )
}
