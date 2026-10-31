import { useEffect, useRef } from 'react'
import { createFlow } from './hero-fx/flow'
import { createBokeh } from './hero-fx/bokeh'
import { createFireflies } from './hero-fx/fireflies'

// Hosts the selected hero background effect (<html data-fx="...">):
// canvas sizing, theme colours, a smoothed pointer, and the frame loop.

const EFFECTS = { flow: createFlow, bokeh: createBokeh, fireflies: createFireflies }
const IDLE_MS = 2500

// Colours and style come from the active theme's --fx-* custom properties.
function readTheme() {
  const cs = getComputedStyle(document.documentElement)
  const rgb = (name) => cs.getPropertyValue(name).split(',').map((n) => parseFloat(n) || 0)
  return {
    a: rgb('--fx-a'),
    b: rgb('--fx-b'),
    dot: rgb('--fx-dot'),
    dotAlpha: parseFloat(cs.getPropertyValue('--fx-dot-alpha')) || 0.2,
    round: cs.getPropertyValue('--fx-shape').trim() === 'round',
  }
}

function makeEffect() {
  const create = EFFECTS[document.documentElement.dataset.fx] || EFFECTS.flow
  return create()
}

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let theme = readTheme()
    let effect = makeEffect()
    let clearAll = true
    let w = 0
    let h = 0
    let raf = 0
    let running = false
    let lastTime = 0
    const target = { x: 0, y: 0, lastMove: -Infinity }
    // Smoothed pointer handed to effects; nx/ny are normalised to -1..1.
    const pointer = { x: 0, y: 0, nx: 0, ny: 0 }

    function resize() {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      effect.resize?.(w, h)
      pointer.x = w * 0.7
      pointer.y = h * 0.42
      clearAll = true
    }

    function updatePointer(now, dt) {
      const idle = now - target.lastMove > IDLE_MS
      let tx = target.x
      let ty = target.y
      if (idle) {
        const s = now / 1000
        tx = w * (0.68 + 0.14 * Math.sin(s * 0.18))
        ty = h * (0.42 + 0.14 * Math.sin(s * 0.27 + 1.2))
      }
      const ease = 1 - Math.pow(idle ? 0.985 : 0.94, dt)
      pointer.x += (tx - pointer.x) * ease
      pointer.y += (ty - pointer.y) * ease
      pointer.nx = w ? (pointer.x / w) * 2 - 1 : 0
      pointer.ny = h ? (pointer.y / h) * 2 - 1 : 0
    }

    function render(now, dt) {
      updatePointer(now, dt)
      if (!effect.persistent) ctx.clearRect(0, 0, w, h)
      effect.frame(ctx, { w, h, now, dt, pointer, theme, clearAll })
      clearAll = false
    }

    function frame(now) {
      // dt is measured in 60fps frames so motion is frame-rate independent.
      const dt = lastTime ? Math.min(3, (now - lastTime) / (1000 / 60)) : 1
      lastTime = now
      render(now, dt)
      if (running) raf = requestAnimationFrame(frame)
    }

    // Reduced motion: settle into a single still frame.
    function renderStill() {
      clearAll = true
      for (let i = 0; i < (effect.persistent ? 90 : 1); i++) render(20000 + i * 16, 1)
    }

    function start() {
      if (running || reduceMotion) return
      running = true
      lastTime = 0
      raf = requestAnimationFrame(frame)
    }
    function stop() {
      running = false
      cancelAnimationFrame(raf)
    }

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect()
      const y = e.clientY - rect.top
      if (y < 0 || y > rect.height) return
      target.x = e.clientX - rect.left
      target.y = y
      target.lastMove = performance.now()
    }

    resize()
    if (reduceMotion) renderStill()

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()))
    io.observe(canvas)
    const ro = new ResizeObserver(() => {
      resize()
      if (reduceMotion) renderStill()
    })
    ro.observe(canvas)

    const onThemeChange = () => {
      theme = readTheme()
      clearAll = true
      if (reduceMotion) renderStill()
    }
    const onFxChange = () => {
      effect = makeEffect()
      effect.resize?.(w, h)
      ctx.clearRect(0, 0, w, h)
      clearAll = true
      if (reduceMotion) renderStill()
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('themechange', onThemeChange)
    window.addEventListener('fxchange', onFxChange)

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('themechange', onThemeChange)
      window.removeEventListener('fxchange', onFxChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}
