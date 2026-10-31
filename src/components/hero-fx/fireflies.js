// Breathing dot grid with a pool of light and drifting fireflies.

const SPACING = 30
const LIGHT_RADIUS = 260
const NUDGE_RADIUS = 150
const ALPHA_BUCKETS = 12

const lerp = (a, b, t) => a + (b - a) * t
const rand = (a, b) => a + Math.random() * (b - a)

export function createFireflies() {
  let dots = []
  let flies = []
  let w = 0
  let h = 0

  return {
    resize(width, height) {
      w = width
      h = height
      dots = []
      for (let y = SPACING / 2; y < h; y += SPACING) {
        for (let x = SPACING / 2; x < w; x += SPACING) dots.push({ x, y })
      }
      const count = Math.max(40, Math.min(140, Math.round((w * h) / 9000)))
      flies = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        ox: 0,
        oy: 0,
        drift: rand(0.12, 0.35),
        size: rand(1.6, 3.6),
        phase: rand(0, Math.PI * 2),
        freq: rand(0.3, 0.7),
        twinkle: rand(0.6, 1.4),
        tint: Math.random(),
      }))
    },

    frame(ctx, { now, dt, pointer, theme }) {
      const { a, b, dot, dotAlpha, round } = theme
      const s = now / 1000

      // Grid, alpha quantised into buckets so each bucket is one fill.
      const buckets = Array.from({ length: ALPHA_BUCKETS }, () => [])
      const lit = []
      for (const d of dots) {
        const dx = d.x - pointer.x
        const dy = d.y - pointer.y
        const t = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / LIGHT_RADIUS)
        if (t > 0.02) { lit.push(d, t); continue }
        const wave = 0.5 + 0.5 * Math.sin((d.x + d.y) * 0.006 - s * 0.6)
        buckets[Math.min(ALPHA_BUCKETS - 1, Math.floor(wave * ALPHA_BUCKETS))].push(d)
      }
      for (let k = 0; k < ALPHA_BUCKETS; k++) {
        if (!buckets[k].length) continue
        ctx.fillStyle = `rgba(${dot[0]},${dot[1]},${dot[2]},${dotAlpha * (0.45 + 0.75 * (k / (ALPHA_BUCKETS - 1)))})`
        ctx.beginPath()
        for (const d of buckets[k]) {
          if (round) { ctx.moveTo(d.x + 1, d.y); ctx.arc(d.x, d.y, 1, 0, Math.PI * 2) }
          else ctx.rect(d.x - 0.75, d.y - 0.75, 1.5, 1.5)
        }
        ctx.fill()
      }
      for (let i = 0; i < lit.length; i += 2) {
        const d = lit[i]
        const e = lit[i + 1] * lit[i + 1]
        ctx.fillStyle = `rgba(${a[0]},${a[1]},${a[2]},${dotAlpha + e * 0.6})`
        const size = 1.5 + e * 1.4
        if (round) { ctx.beginPath(); ctx.arc(d.x, d.y, size * 0.6, 0, Math.PI * 2); ctx.fill() }
        else ctx.fillRect(d.x - size / 2, d.y - size / 2, size, size)
      }

      const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, LIGHT_RADIUS)
      g.addColorStop(0, `rgba(${a[0]},${a[1]},${a[2]},0.14)`)
      g.addColorStop(1, `rgba(${a[0]},${a[1]},${a[2]},0)`)
      ctx.fillStyle = g
      ctx.fillRect(pointer.x - LIGHT_RADIUS, pointer.y - LIGHT_RADIUS, LIGHT_RADIUS * 2, LIGHT_RADIUS * 2)

      const r2 = NUDGE_RADIUS * NUDGE_RADIUS
      for (const f of flies) {
        const vx = Math.sin(s * f.freq + f.phase) * 0.3
        const vy = -f.drift + Math.cos(s * f.freq * 0.8 + f.phase) * 0.15
        const dx = f.x - pointer.x
        const dy = f.y - pointer.y
        const d2 = dx * dx + dy * dy
        if (d2 < r2 && d2 > 1) {
          const d = Math.sqrt(d2)
          const push = (1 - d / NUDGE_RADIUS) * 0.06
          f.ox += (dx / d) * push * dt
          f.oy += (dy / d) * push * dt
        }
        f.ox *= Math.pow(0.96, dt)
        f.oy *= Math.pow(0.96, dt)
        f.x += (vx + f.ox) * dt
        f.y += (vy + f.oy) * dt
        if (f.y < -12) { f.y = h + 12; f.x = rand(0, w) }
        if (f.y > h + 12) f.y = -12
        if (f.x < -12) f.x = w + 12
        if (f.x > w + 12) f.x = -12

        const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(s * f.twinkle + f.phase))
        const c = `${Math.round(lerp(a[0], b[0], f.tint))},${Math.round(lerp(a[1], b[1], f.tint))},${Math.round(lerp(a[2], b[2], f.tint))}`
        if (round) {
          ctx.fillStyle = `rgba(${c},${0.16 * tw})`
          ctx.beginPath(); ctx.arc(f.x, f.y, f.size * 5, 0, Math.PI * 2); ctx.fill()
          ctx.fillStyle = `rgba(${c},${0.3 * tw})`
          ctx.beginPath(); ctx.arc(f.x, f.y, f.size * 2, 0, Math.PI * 2); ctx.fill()
          ctx.fillStyle = `rgba(${c},${0.95 * tw})`
          ctx.beginPath(); ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2); ctx.fill()
        } else {
          const px = Math.round(f.size + 1)
          const x = Math.round(f.x)
          const y = Math.round(f.y)
          ctx.fillStyle = `rgba(${c},${0.2 * tw})`
          ctx.fillRect(x - px * 2, y - px * 2, px * 4, px * 4)
          ctx.fillStyle = `rgba(${c},${0.95 * tw})`
          ctx.fillRect(x - px / 2, y - px / 2, px, px)
        }
      }
    },
  }
}
