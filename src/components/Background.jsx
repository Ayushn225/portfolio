import { useEffect, useRef } from 'react'

/**
 * Full-page dot field drawn on a canvas.
 * Dots near the cursor are pushed away and light up in the accent colour;
 * clicking sends out a ripple. On touch screens a slow ambient wave runs instead.
 */
export default function Background() {
  const canvas = useRef(null)

  useEffect(() => {
    const c = canvas.current
    const ctx = c.getContext('2d')
    const css = getComputedStyle(document.documentElement)
    const accent = css.getPropertyValue('--accent').trim().split(/\s+/).join(',')
    const fg = css.getPropertyValue('--fg').trim().split(/\s+/).join(',')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(pointer: fine)').matches

    const GAP = 26
    const RADIUS = 150
    let w, h, dpr, dots, raf
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    const ripples = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      c.width = w * dpr
      c.height = h * dpr
      c.style.width = w + 'px'
      c.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      for (let y = GAP / 2; y < h; y += GAP) for (let x = GAP / 2; x < w; x += GAP) dots.push({ x, y })
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      mouse.x += (mouse.tx - mouse.x) * 0.15
      mouse.y += (mouse.ty - mouse.y) * 0.15
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].r += 9
        if (ripples[i].r > 900) ripples.splice(i, 1)
      }
      for (const d of dots) {
        let dx = d.x - mouse.x
        let dy = d.y - mouse.y
        let dist = Math.hypot(dx, dy)
        let k = Math.max(0, 1 - dist / RADIUS) // 0..1 proximity to cursor
        // ripple ring
        for (const r of ripples) {
          const rd = Math.abs(Math.hypot(d.x - r.x, d.y - r.y) - r.r)
          if (rd < 30) k = Math.max(k, (1 - rd / 30) * (1 - r.r / 900))
        }
        // ambient wave on touch devices
        if (!fine && !reduce) k = Math.max(k, (Math.sin(d.x * 0.012 + d.y * 0.008 + t * 0.0012) + 1) * 0.12)
        const push = k * k * 10
        const ox = dist ? (dx / dist) * push : 0
        const oy = dist ? (dy / dist) * push : 0
        const size = 1 + k * 1.8
        ctx.fillStyle = k > 0.05 ? `rgba(${accent},${0.15 + k * 0.85})` : `rgba(${fg},0.09)`
        ctx.beginPath()
        ctx.arc(d.x + ox, d.y + oy, size, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      mouse.tx = e.clientX
      mouse.ty = e.clientY
      if (mouse.x < -999) {
        mouse.x = e.clientX
        mouse.y = e.clientY
      }
    }
    const onLeave = () => {
      mouse.tx = mouse.ty = -9999
    }
    const onClick = (e) => ripples.push({ x: e.clientX, y: e.clientY, r: 0 })

    resize()
    if (reduce) {
      draw(0)
      cancelAnimationFrame(raf)
    } else raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onClick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onClick)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvas} className="absolute inset-0" />
      {/* soft vignette so content stays readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgb(var(--bg))_100%)]" />
    </div>
  )
}
