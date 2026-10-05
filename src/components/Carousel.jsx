import { useEffect, useRef, useState } from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'

/**
 * Horizontal slider with snap points, arrows, a "01 / 06" counter and a
 * progress bar. Swipe on touch, drag with the mouse, or use the arrows /
 * keyboard. Each child snaps to the left edge.
 */
export default function Carousel({ items, render, itemClass = 'w-[85%] sm:w-[48%] lg:w-[32%]', label = 'items', onIndex }) {
  const track = useRef(null)
  const [index, setIndex] = useState(0)
  const [atEnd, setAtEnd] = useState(false)
  const drag = useRef(null)

  const step = () => {
    const el = track.current
    const first = el?.children[0]
    if (!first) return 0
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    return first.getBoundingClientRect().width + gap
  }

  useEffect(() => {
    const el = track.current
    const on = () => {
      const i = Math.round(el.scrollLeft / (step() || 1))
      setIndex(Math.min(items.length - 1, i))
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4)
    }
    on()
    el.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      el.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [items.length])

  useEffect(() => onIndex?.(index), [index, onIndex])

  const go = (i) => {
    const el = track.current
    const target = Math.max(0, Math.min(items.length - 1, i))
    el.scrollTo({ left: target * step(), behavior: 'smooth' })
  }

  // mouse drag (touch uses native swipe)
  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false }
    track.current.style.scrollSnapType = 'none'
    track.current.style.scrollBehavior = 'auto'
  }
  const onMove = (e) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) drag.current.moved = true
    track.current.scrollLeft = drag.current.left - dx
  }
  const onUp = () => {
    if (!drag.current) return
    const moved = drag.current.moved
    drag.current = null
    const el = track.current
    el.style.scrollBehavior = ''
    const i = Math.round(el.scrollLeft / (step() || 1))
    el.scrollTo({ left: i * step(), behavior: 'smooth' })
    setTimeout(() => (el.style.scrollSnapType = ''), 400)
    if (moved) {
      // swallow the click that ends a drag
      const stop = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
      }
      el.addEventListener('click', stop, { capture: true, once: true })
    }
  }

  const pad = (n) => String(n).padStart(2, '0')
  const progress = items.length > 1 ? index / (items.length - 1) : 1

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(index + 1)
        if (e.key === 'ArrowLeft') go(index - 1)
      }}
    >
      <div
        ref={track}
        tabIndex={0}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto scroll-smooth px-4 pb-2 pt-1 sm:mx-0 sm:scroll-pl-0 sm:px-0 lg:cursor-grab lg:active:cursor-grabbing"
      >
        {items.map((item, i) => (
          <div key={i} className={`shrink-0 snap-start ${itemClass}`} aria-roledescription="slide" aria-label={`${i + 1} of ${items.length}`}>
            {render(item, i, i === index)}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-5 pr-14 lg:pr-0">
        <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line">
          <div className="absolute inset-y-0 left-0 w-full origin-left bg-accent transition-transform duration-500" style={{ transform: `scaleX(${Math.max(0.08, atEnd ? 1 : progress)})` }} />
        </div>
        <span className="font-cond text-sm font-bold tabular-nums text-muted">
          <span className="text-fg">{pad(index + 1)}</span> / {pad(items.length)}
        </span>
        <div className="flex gap-2">
          <button id={`${label}-prev`} aria-label="Previous" onClick={() => go(index - 1)} disabled={index === 0} className="icon-btn disabled:pointer-events-none disabled:opacity-30">
            <LuChevronLeft />
          </button>
          <button id={`${label}-next`} aria-label="Next" onClick={() => go(index + 1)} disabled={atEnd} className="icon-btn disabled:pointer-events-none disabled:opacity-30">
            <LuChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}
