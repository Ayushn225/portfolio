import { useEffect, useRef, useState } from 'react'
import { Reveal } from './ui'

/**
 * Responsive timeline whose rail fills with the accent colour as you scroll.
 *  - Mobile: single rail on the left.
 *  - Desktop (md+): rail in the centre, cards alternate sides.
 */
export default function Timeline({ items, renderItem }) {
  const ref = useRef(null)
  const [fill, setFill] = useState(0)

  useEffect(() => {
    const on = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const mid = window.innerHeight * 0.6
      setFill(Math.max(0, Math.min(1, (mid - r.top) / r.height)))
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [])

  return (
    <div ref={ref} className="relative">
      <div className="absolute bottom-0 left-[11px] top-2 w-px bg-line md:left-1/2 md:-translate-x-1/2">
        <div className="w-full origin-top bg-accent" style={{ height: '100%', transform: `scaleY(${fill})` }} />
        <span
          className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_14px_4px_rgb(var(--accent)/0.6)]"
          style={{ top: `calc(${fill * 100}% - 3px)` }}
        />
      </div>
      <ol className="space-y-10 md:space-y-14">
        {items.map((item, i) => {
          const left = i % 2 === 0
          const reached = fill * items.length > i + 0.15
          return (
            <li key={i} className="relative grid grid-cols-[24px_1fr] gap-5 md:grid-cols-[1fr_40px_1fr] md:gap-8">
              <div className="relative col-start-1 row-start-1 flex justify-center pt-6 md:col-start-2">
                <span
                  className={`relative z-10 grid h-6 w-6 place-items-center rounded-full border-2 transition-colors duration-500 ${
                    reached ? 'border-accent bg-bg' : 'border-line bg-surface'
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${reached ? 'bg-accent' : 'bg-line'}`} />
                  {reached && <span className="absolute inset-0 animate-pulse-ring rounded-full border border-accent" />}
                </span>
              </div>
              <Reveal delay={80} className={`col-start-2 row-start-1 min-w-0 ${left ? 'md:col-start-1' : 'md:col-start-3'}`}>
                {renderItem(item, { left })}
              </Reveal>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
