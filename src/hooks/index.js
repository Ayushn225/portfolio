import { useEffect, useRef, useState } from 'react'

/** Fades/slides an element in when it enters the viewport. */
export function useReveal(options = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return setVisible(true)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, visible]
}

/** Cycles through words with a typing / deleting effect. */
export function useTypewriter(words, { type = 75, erase = 40, hold = 1600 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    const word = words[index % words.length]
    let t
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), hold)
    else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => i + 1)
    } else
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? erase : type,
      )
    return () => clearTimeout(t)
  }, [text, deleting, index, words, type, erase, hold])
  return text
}

/** Returns the id of the section currently in view. */
export function useActiveSection(ids) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

/** 0 → 1 page scroll progress. */
export function useScrollProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const on = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return p
}

/** Animates a number from 0 to `end` once `start` is true. */
export function useCountUp(end, start, duration = 1400, decimals = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf
    const t0 = performance.now()
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / duration)
      const f = 10 ** decimals
      setVal(Math.round(end * (1 - Math.pow(1 - k, 3)) * f) / f)
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [end, start, duration, decimals])
  return val
}
