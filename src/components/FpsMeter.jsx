import { useEffect, useState } from 'react'

// Live frame-rate readout, sampled every 500ms.
export default function FpsMeter() {
  const [fps, setFps] = useState(60)

  useEffect(() => {
    let frames = 0
    let last = performance.now()
    let raf
    const tick = (now) => {
      frames++
      if (now - last >= 500) {
        setFps(Math.round((frames * 1000) / (now - last)))
        frames = 0
        last = now
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const tier = fps >= 55 ? 'good' : fps >= 30 ? 'ok' : 'bad'
  return (
    <div className={`fps fps-${tier}`} title="Live frame rate of this page">
      <span className="fps-label">FPS</span>
      <span className="fps-value">{String(fps).padStart(3, '0')}</span>
    </div>
  )
}
