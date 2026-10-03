import { useEffect, useRef, useState } from 'react'
import { LuChevronLeft, LuChevronRight, LuPause, LuPlay } from 'react-icons/lu'
import { journey } from '../data/portfolio'
import { Chip, Heading, Panel } from '../components/ui'
import { useReveal } from '../hooks'

const AUTOPLAY_MS = 6000

/**
 * "My Journey" — one milestone at a time with a big year, a year rail
 * underneath, arrows, swipe and autoplay (pauses on hover or when off-screen).
 */
export default function Journey() {
  const [i, setI] = useState(journey.length - 1)
  const [playing, setPlaying] = useState(true)
  const [hover, setHover] = useState(false)
  const [ref, visible] = useReveal()
  const touch = useRef(null)
  const item = journey[i]

  const go = (n) => setI((n + journey.length) % journey.length)

  useEffect(() => {
    if (!playing || hover || !visible) return
    const id = setTimeout(() => go(i + 1), AUTOPLAY_MS)
    return () => clearTimeout(id)
  }, [i, playing, hover, visible])

  const pad = (n) => String(n).padStart(2, '0')
  const fill = journey.length > 1 ? i / (journey.length - 1) : 1

  return (
    <Panel id="journey">
      <Heading
        index="03"
        eyebrow="Experience & education"
        title="My journey"
        aside={
          <div className="flex items-center gap-2">
            <span className="mr-2 font-cond text-sm font-bold tabular-nums text-muted">
              <span className="text-fg">{pad(i + 1)}</span> / {pad(journey.length)}
            </span>
            <button id="journey-play" onClick={() => setPlaying((p) => !p)} aria-label={playing ? 'Pause autoplay' : 'Play autoplay'} className="icon-btn">
              {playing ? <LuPause /> : <LuPlay />}
            </button>
            <button id="journey-prev" onClick={() => go(i - 1)} aria-label="Previous milestone" className="icon-btn">
              <LuChevronLeft />
            </button>
            <button id="journey-next" onClick={() => go(i + 1)} aria-label="Next milestone" className="icon-btn">
              <LuChevronRight />
            </button>
          </div>
        }
      />

      <div
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - (touch.current ?? 0)
          if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1))
        }}
        className="relative grid min-h-[300px] items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-12"
      >
        {/* big year */}
        <div key={`y-${i}`} className="overflow-hidden">
          <p className="display animate-rise text-[28vw] leading-[0.85] text-accent sm:text-[11rem] lg:text-[13rem]">{item.year}</p>
        </div>

        {/* details */}
        <div key={`d-${i}`} className="relative border-l-4 border-accent2 pl-6 sm:pl-8">
          <div className="animate-rise" style={{ animationDelay: '80ms' }}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-md bg-fg px-2.5 py-1 font-cond text-xs font-bold uppercase tracking-widest text-bg">{item.tag}</span>
              <span className="font-mono text-xs text-muted">{item.period}</span>
            </div>
            <h3 className="display mt-4 text-3xl text-fg sm:text-4xl">{item.title}</h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fg/80 sm:text-lg">{item.text}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.chips.map((c) => (
                <Chip key={c}>{c}</Chip>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* year rail */}
      <div className="no-scrollbar -mx-4 mt-10 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="relative min-w-[520px] pt-2">
          <div className="absolute left-0 right-0 top-[15px] h-[3px] bg-line" />
          <div className="absolute left-0 top-[15px] h-[3px] w-full origin-left bg-accent transition-transform duration-700" style={{ transform: `scaleX(${fill})` }} />
          <ol className="relative flex justify-between">
            {journey.map((j, n) => {
              const on = n === i
              const past = n <= i
              return (
                <li key={n} className="flex flex-col items-center">
                  <button
                    id={`journey-dot-${n}`}
                    onClick={() => go(n)}
                    aria-label={`${j.year}: ${j.title}`}
                    aria-current={on ? 'step' : undefined}
                    className="group flex flex-col items-center gap-2"
                  >
                    <span
                      className={`relative grid h-4 w-4 place-items-center rounded-full border-[3px] transition-all duration-300 ${
                        on ? 'scale-125 border-accent2 bg-accent2' : past ? 'border-accent bg-accent' : 'border-line bg-bg group-hover:border-accent'
                      }`}
                    >
                      {on && <span className="absolute inset-0 animate-pulse-ring rounded-full border-2 border-accent2" />}
                    </span>
                    <span className={`display text-xl transition-colors ${on ? 'text-fg' : 'text-muted group-hover:text-fg'}`}>{j.year}</span>
                    <span className="font-cond text-[11px] font-bold uppercase tracking-widest text-muted">{j.tag}</span>
                  </button>
                </li>
              )
            })}
          </ol>
          {/* autoplay timer */}
          {playing && !hover && visible && (
            <div key={`t-${i}`} className="absolute -bottom-3 left-0 h-[2px] w-full origin-left bg-accent2/60" style={{ animation: `wipe ${AUTOPLAY_MS}ms linear both` }} />
          )}
        </div>
      </div>
    </Panel>
  )
}
