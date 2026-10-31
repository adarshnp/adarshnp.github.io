// Particles drifting along a smooth flow field, leaving fading trails.
// The cursor stirs a gentle vortex.

const SPEED = 1.1
const SWIRL_RADIUS = 200
const FADE = 0.045

const lerp = (a, b, t) => a + (b - a) * t

function field(x, y, t) {
  return (
    Math.sin(x * 0.0021 + t * 0.09) +
    Math.sin(y * 0.0019 - t * 0.12) +
    Math.sin((x + y) * 0.0012 + t * 0.06)
  )
}

export function createFlow() {
  let particles = []
  let w = 0
  let h = 0

  const spawn = (p, randomAge = false) => {
    p.x = Math.random() * w
    p.y = Math.random() * h
    p.life = 120 + Math.random() * 220
    p.age = randomAge ? Math.random() * p.life : 0
    return p
  }

  function step(ctx, t, dt, pointer, a, b) {
    // Fade previous trails toward transparent.
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = `rgba(0,0,0,${Math.min(0.3, FADE * dt)})`
    ctx.fillRect(0, 0, w, h)
    ctx.globalCompositeOperation = 'source-over'

    ctx.lineWidth = 1.3
    ctx.lineCap = 'round'
    const r2 = SWIRL_RADIUS * SWIRL_RADIUS

    for (const p of particles) {
      const n = field(p.x, p.y, t)
      const ang = n * 1.25
      let vx = Math.cos(ang) * SPEED
      let vy = Math.sin(ang) * SPEED

      const dx = p.x - pointer.x
      const dy = p.y - pointer.y
      const d2 = dx * dx + dy * dy
      if (d2 < r2 && d2 > 1) {
        const d = Math.sqrt(d2)
        const s = (1 - d / SWIRL_RADIUS) * 2.2
        vx += (-dy / d) * s
        vy += (dx / d) * s
      }

      const nx = p.x + vx * dt
      const ny = p.y + vy * dt
      const alpha = Math.sin(Math.min(1, p.age / p.life) * Math.PI) * 0.7
      const k = (n + 3) / 6
      ctx.strokeStyle = `rgba(${Math.round(lerp(a[0], b[0], k))},${Math.round(lerp(a[1], b[1], k))},${Math.round(lerp(a[2], b[2], k))},${alpha})`
      ctx.beginPath()
      ctx.moveTo(p.x, p.y)
      ctx.lineTo(nx, ny)
      ctx.stroke()

      p.x = nx
      p.y = ny
      p.age += dt
      if (p.age > p.life || p.x < -5 || p.x > w + 5 || p.y < -5 || p.y > h + 5) spawn(p)
    }
  }

  return {
    persistent: true,

    resize(width, height) {
      w = width
      h = height
      const count = Math.max(350, Math.min(1100, Math.round((w * h) / 1400)))
      particles = Array.from({ length: count }, () => spawn({}, true))
    },

    frame(ctx, { now, dt, pointer, theme, clearAll }) {
      const t = now / 1000
      const { a, b } = theme
      if (clearAll) {
        // Fresh canvas: pre-draw a moment of motion so trails show at once.
        ctx.clearRect(0, 0, w, h)
        for (let i = 40; i > 0; i--) step(ctx, t - i / 60, 1, pointer, a, b)
      }
      step(ctx, t, dt, pointer, a, b)
    },
  }
}
