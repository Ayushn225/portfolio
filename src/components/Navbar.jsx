import { useEffect, useState } from 'react'
import { LuMenu, LuMoon, LuSun, LuX } from 'react-icons/lu'
import { navLinks, profile } from '../data/portfolio'
import { useActiveSection, useScrollProgress, useTheme } from '../hooks'

const ids = navLinks.map((l) => l.id)

export function ThemeToggle({ className = '' }) {
  const [theme, toggle] = useTheme()
  const dark = theme === 'dark'
  return (
    <button
      id="theme-toggle"
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className={`relative grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-line bg-surface text-fg transition hover:border-accent hover:text-accent ${className}`}
    >
      <LuSun className={`absolute transition-all duration-500 ${dark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
      <LuMoon className={`absolute transition-all duration-500 ${dark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
    </button>
  )
}

export default function Navbar() {
  const active = useActiveSection(ids)
  const progress = useScrollProgress()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'border-b border-line bg-bg/85 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.25)] backdrop-blur-xl' : 'border-b border-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-10">
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-accent font-display text-xl text-accent-fg transition-transform duration-500 group-hover:rotate-[360deg]">
              {profile.firstName[0]}
            </span>
            <span className="font-cond text-lg font-bold uppercase leading-none tracking-wide text-accent">
              {profile.firstName} {profile.lastName}
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={`group relative block px-3 py-2 font-cond text-[15px] font-bold uppercase tracking-wide transition-colors ${
                    active === l.id ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-[3px] origin-left bg-accent transition-transform duration-300 ${
                      active === l.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
              Resume
            </a>
            <a href="#contact" className="btn hidden bg-fg !px-5 !py-2.5 text-bg before:bg-accent hover:text-accent-fg xl:inline-flex">
              Hire me
            </a>
            <button
              id="nav-toggle"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center text-2xl text-fg lg:hidden"
            >
              {open ? <LuX /> : <LuMenu />}
            </button>
          </div>
        </nav>
        <div className="h-[3px] origin-left bg-accent" style={{ transform: `scaleX(${progress})` }} />
      </header>

      {/* mobile menu — circular reveal from the menu button */}
      <div
        className="fixed inset-0 z-40 bg-bg transition-[clip-path] duration-700 ease-[cubic-bezier(.7,0,.2,1)] lg:hidden"
        style={{ clipPath: open ? 'circle(150% at calc(100% - 36px) 32px)' : 'circle(0% at calc(100% - 36px) 32px)' }}
        onClick={() => setOpen(false)}
      >
        <div className="bg-stripes absolute inset-0 opacity-60" />
        <ul className="relative flex h-full flex-col justify-center gap-1 px-8">
          {navLinks.map((l, i) => (
            <li key={l.id} className="overflow-hidden">
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${200 + i * 50}ms` : '0ms' }}
                className={`display flex items-baseline gap-4 py-1 text-5xl transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${
                  active === l.id ? 'text-accent' : 'text-fg'
                }`}
              >
                <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
                {l.label}
              </a>
            </li>
          ))}
          <li className={`mt-8 flex gap-3 transition-opacity delay-500 duration-500 ${open ? 'opacity-100' : 'opacity-0'}`}>
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="btn-primary">
              Resume
            </a>
            <a href="#contact" onClick={() => setOpen(false)} className="btn-ghost">
              Hire me
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}
