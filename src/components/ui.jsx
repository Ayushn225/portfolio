import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks'

const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

/** Animates children in when scrolled into view. */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const [ref, visible] = useReveal()
  return (
    <Tag ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${visible ? 'reveal-in' : ''} ${className}`}>
      {children}
    </Tag>
  )
}

/** Moving the mouse over the group lights up the borders of nearby cards. */
export function SpotlightGroup({ children, className = '' }) {
  const ref = useRef(null)
  const onMove = (e) => {
    ref.current?.querySelectorAll('.card').forEach((el) => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    })
  }
  return (
    <div ref={ref} data-spotlight onMouseMove={onMove} className={className}>
      {children}
    </div>
  )
}

/** Card. `tilt` adds a 3-D tilt that follows the cursor plus a soft glare. */
export function Card({ children, className = '', tilt = false, as: Tag = 'div', ...rest }) {
  const glare = useRef(null)
  const onMove = (e) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty('--mx', `${x}px`)
    el.style.setProperty('--my', `${y}px`)
    if (tilt && finePointer()) {
      const rx = (y / r.height - 0.5) * -7
      const ry = (x / r.width - 0.5) * 7
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`
      if (glare.current) {
        glare.current.style.opacity = '1'
        glare.current.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgb(255 255 255 / 0.08), transparent 45%)`
      }
    }
    rest.onMouseMove?.(e)
  }
  const onLeave = (e) => {
    if (tilt) e.currentTarget.style.transform = ''
    if (glare.current) glare.current.style.opacity = '0'
    rest.onMouseLeave?.(e)
  }
  return (
    <Tag
      {...rest}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`card ${tilt ? 'transition-transform duration-300 ease-out [transform-style:preserve-3d]' : ''} ${className}`}
    >
      {children}
      {tilt && <span ref={glare} aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300" />}
    </Tag>
  )
}

/** Pulls its child toward the cursor while hovered. */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const onMove = (e) => {
    if (!finePointer()) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * strength}px, ${(e.clientY - (r.top + r.height / 2)) * strength}px)`
  }
  const onLeave = () => (ref.current.style.transform = '')
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`inline-flex transition-transform duration-300 ease-out ${className}`}>
      {children}
    </span>
  )
}

/** Text that decodes from random glyphs when it scrolls into view. */
export function Scramble({ text, className = '' }) {
  const [ref, visible] = useReveal()
  const [out, setOut] = useState(text)
  useEffect(() => {
    if (!visible) return
    const glyphs = '!<>-_\\/[]{}=+*^?#01'
    let frame = 0
    const id = setInterval(() => {
      frame++
      setOut(
        text
          .split('')
          .map((c, i) => (c === ' ' || i < frame / 2 ? c : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join(''),
      )
      if (frame >= text.length * 2) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [visible, text])
  return (
    <span ref={ref} className={className} aria-label={text}>
      {out}
    </span>
  )
}

/** Big condensed uppercase heading with an accent bar that wipes in. */
export function Heading({ eyebrow, title, intro, aside, index }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className="mb-8 flex flex-wrap items-end justify-between gap-6 lg:mb-10">
      <div className="max-w-3xl">
        <p className="eyebrow mb-3 flex items-center gap-3">
          {index && <span className="font-mono text-[11px] tracking-normal text-muted">{index}</span>}
          <Scramble text={eyebrow} />
        </p>
        <h2 className="display text-5xl text-fg sm:text-6xl lg:text-7xl">{title}</h2>
        <span
          className={`mt-4 block h-1.5 w-24 origin-left bg-accent transition-transform duration-700 ease-out ${visible ? 'scale-x-100' : 'scale-x-0'}`}
        />
        {intro && <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">{intro}</p>}
      </div>
      {aside}
    </div>
  )
}

/**
 * A full-screen "panel". On desktop it fills the viewport and the page
 * snaps to it. `tone="alt"` gives the panel the alternate background.
 */
export function Panel({ id, children, className = '', tone = 'base', free = false }) {
  const bg = tone === 'alt' ? 'bg-raised/60' : tone === 'ink' ? 'bg-fg text-bg' : ''
  return (
    <section
      id={id}
      className={`${free ? 'panel-free' : 'panel'} relative flex flex-col justify-center px-4 pb-16 pt-24 sm:px-6 lg:px-16 lg:pb-12 ${bg} ${className}`}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

export function Chip({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-md border border-line bg-raised px-2.5 py-1 font-cond text-xs font-semibold uppercase tracking-wide text-fg/80 ${className}`}>
      {children}
    </span>
  )
}
