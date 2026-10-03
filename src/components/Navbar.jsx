import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import { navLinks, profile } from '../data/portfolio'
import { useActiveSection, useScrollProgress } from '../hooks'
import { Magnetic } from './ui'

const ids = navLinks.map((l) => l.id)

export default function Navbar() {
  const active = useActiveSection(ids)
  const progress = useScrollProgress()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 })
  const listRef = useRef(null)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // sliding pill behind the hovered / active link
  const movePill = (el) => {
    if (!el || !listRef.current) return setPill((p) => ({ ...p, opacity: 0 }))
    const r = el.getBoundingClientRect()
    const pr = listRef.current.getBoundingClientRect()
    setPill({ left: r.left - pr.left, width: r.width, opacity: 1 })
  }
  useLayoutEffect(() => {
    movePill(listRef.current?.querySelector(`[data-id="${active}"]`))
  }, [active])

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[60] h-[2px]">
        <div className="h-full origin-left bg-accent" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 sm:px-6" style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 14px)' }}>
        <nav
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled ? 'border-line bg-surface/80 shadow-2xl shadow-black/40 backdrop-blur-xl' : 'border-transparent'
          }`}
        >
          <a href="#top" className="group flex items-center gap-2 font-display text-base font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-sm text-accent-fg transition-transform duration-500 group-hover:rotate-[360deg]">
              {profile.firstName[0]}
            </span>
            <span className="text-fg">{profile.firstName}</span>
          </a>

          <ul ref={listRef} onMouseLeave={() => movePill(listRef.current?.querySelector(`[data-id="${active}"]`))} className="relative hidden items-center lg:flex">
            <span
              aria-hidden="true"
              className="absolute top-0 h-full rounded-full bg-raised transition-all duration-300 ease-out"
              style={{ left: pill.left, width: pill.width, opacity: pill.opacity }}
            />
            {navLinks.map((l) => (
              <li key={l.id} className="relative">
                <a
                  data-id={l.id}
                  href={`#${l.id}`}
                  onMouseEnter={(e) => movePill(e.currentTarget)}
                  className={`relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active === l.id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {active === l.id && <span className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent" />}
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:inline-flex">
              <a href={profile.resumeUrl} className="btn-primary !px-5 !py-2">
                Resume
              </a>
            </Magnetic>
            <button
              id="nav-toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="icon-btn lg:hidden"
            >
              {open ? <LuX /> : <LuMenu />}
            </button>
          </div>
        </nav>
      </header>

      {/* mobile drawer — circular reveal from the menu button */}
      <div
        className="fixed inset-0 z-40 bg-surface transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] lg:hidden"
        style={{ clipPath: open ? 'circle(150% at calc(100% - 44px) 40px)' : 'circle(0% at calc(100% - 44px) 40px)' }}
        onClick={() => setOpen(false)}
      >
        <div className="bg-dots absolute inset-0 opacity-60" />
        <ul className="relative flex h-full flex-col justify-center gap-1 px-8">
          {navLinks.map((l, i) => (
            <li key={l.id} className="overflow-hidden">
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${200 + i * 50}ms` : '0ms' }}
                className={`flex items-baseline gap-4 py-2 font-display text-3xl font-bold transition-all duration-500 ${
                  open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                } ${active === l.id ? 'text-accent' : 'text-fg'}`}
              >
                <span className="font-mono text-xs font-normal text-muted">{String(i + 1).padStart(2, '0')}</span>
                {l.label}
              </a>
            </li>
          ))}
          <li className={`mt-6 transition-opacity delay-500 duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}>
            <a href={profile.resumeUrl} className="btn-primary">
              Download resume
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
