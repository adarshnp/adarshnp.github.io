// Soft out-of-focus orbs drifting slowly, with mouse parallax by depth.

const lerp = (a, b, t) => a + (b - a) * t
const rand = (a, b) => a + Math.random() * (b - a)

export function createBokeh() {
  let orbs = []
  let w = 0
  let h = 0

  return {
    resize(width, height) {
      w = width
      h = height
      const count = Math.max(12, Math.min(26, Math.round((w * h) / 60000)))
      orbs = Array.from({ length: count }, () => {
        const depth = Math.random() // 0 = far, 1 = near
        return {
          x: rand(0, w),
          y: rand(0, h),
          depth,
          r: lerp(30, 150, depth) * rand(0.8, 1.2),
          vx: rand(-0.12, 0.12),
          vy: rand(-0.18, -0.04),
          phase: rand(0, Math.PI * 2),
          pulse: rand(0.15, 0.4),
          tint: Math.random(),
        }
      })
      // Draw far orbs first.
      orbs.sort((p, q) => p.depth - q.depth)
    },

    frame(ctx, { now, dt, pointer, theme }) {
      const { a, b } = theme
      const s = now / 1000

      for (const o of orbs) {
        o.x += o.vx * dt * (0.5 + o.depth)
        o.y += o.vy * dt * (0.5 + o.depth)
        if (o.y < -o.r) { o.y = h + o.r; o.x = rand(0, w) }
        if (o.x < -o.r) o.x = w + o.r
        if (o.x > w + o.r) o.x = -o.r

        // Nearer orbs shift more against the cursor: a cheap depth parallax.
        const px = o.x - pointer.nx * 40 * o.depth
        const py = o.y - pointer.ny * 28 * o.depth

        const breath = 0.75 + 0.25 * Math.sin(s * o.pulse + o.phase)
        const alpha = lerp(0.1, 0.22, 1 - o.depth * 0.5) * breath
        const c = `${Math.round(lerp(a[0], b[0], o.tint))},${Math.round(lerp(a[1], b[1], o.tint))},${Math.round(lerp(a[2], b[2], o.tint))}`

        const g = ctx.createRadialGradient(px, py, 0, px, py, o.r)
        g.addColorStop(0, `rgba(${c},${alpha})`)
        g.addColorStop(0.6, `rgba(${c},${alpha * 0.55})`)
        g.addColorStop(0.92, `rgba(${c},${alpha * 0.25})`)
        g.addColorStop(1, `rgba(${c},0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(px, py, o.r, 0, Math.PI * 2)
        ctx.fill()

        // A faint rim, like a real lens highlight.
        ctx.strokeStyle = `rgba(${c},${alpha * 0.5})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(px, py, o.r * 0.94, 0, Math.PI * 2)
        ctx.stroke()
      }
    },
  }
}
