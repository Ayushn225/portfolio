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

/**
 * Wrap a group of <Card>s. Moving the mouse anywhere over the group
 * lights up the border of every card near the cursor.
 */
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

/**
 * Solid card. `tilt` adds a 3-D tilt that follows the cursor plus a soft
 * glare. Works standalone or inside a SpotlightGroup.
 */
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
      const rx = (y / r.height - 0.5) * -8
      const ry = (x / r.width - 0.5) * 8
      el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`
      if (glare.current) {
        glare.current.style.opacity = '1'
        glare.current.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgb(255 255 255 / 0.07), transparent 45%)`
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
export function Magnetic({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)
  const onMove = (e) => {
    if (!finePointer()) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * strength
    const y = (e.clientY - (r.top + r.height / 2)) * strength
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }
  const onLeave = () => (ref.current.style.transform = '')
  return (
    <span ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`inline-flex transition-transform duration-300 ease-out ${className}`}>
      {children}
    </span>
  )
}

/** Text that "decodes" from random glyphs when it scrolls into view. */
export function Scramble({ text, className = '' }) {
  const [ref, visible] = useReveal()
  const [out, setOut] = useState(text)
  useEffect(() => {
    if (!visible) return
    const glyphs = '!<>-_\\/[]{}—=+*^?#01'
    let frame = 0
    const total = text.length * 2
    const id = setInterval(() => {
      frame++
      setOut(
        text
          .split('')
          .map((c, i) => (c === ' ' || i < frame / 2 ? c : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join(''),
      )
      if (frame >= total) clearInterval(id)
    }, 28)
    return () => clearInterval(id)
  }, [visible, text])
  return (
    <span ref={ref} className={className} aria-label={text}>
      {out}
    </span>
  )
}

/** Standard section shell. */
export function Section({ id, eyebrow, title, intro, children, className = '' }) {
  return (
    <section id={id} className={`relative scroll-mt-24 px-4 py-20 sm:px-6 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">
        <Reveal className="mb-12 max-w-2xl md:mb-16">
          <p className="eyebrow mb-3">
            <Scramble text={eyebrow} />
          </p>
          <h2 className="font-display text-3xl font-bold leading-tight text-fg text-balance sm:text-4xl md:text-5xl">{title}</h2>
          {intro && <p className="mt-4 text-base text-muted sm:text-lg">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  )
}

export function Chip({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full border border-line bg-raised px-3 py-1 text-xs font-medium text-fg/80 ${className}`}>
      {children}
    </span>
  )
}
