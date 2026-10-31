import { useEffect, useState } from 'react'

const MIN_MS = 900

export default function Preloader() {
  const [pct, setPct] = useState(0)
  const [state, setState] = useState('loading') // loading -> leaving -> gone

  useEffect(() => {
    const start = performance.now()
    let loaded = document.readyState === 'complete'
    const onLoad = () => { loaded = true }
    window.addEventListener('load', onLoad)

    let leaveTimer
    const id = setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / MIN_MS)
      const target = loaded ? t : Math.min(t, 0.9)
      setPct(Math.round(target * 100))
      if (target >= 1) {
        clearInterval(id)
        setState('leaving')
        leaveTimer = setTimeout(() => setState('gone'), 450)
      }
    }, 30)
    return () => {
      clearInterval(id)
      clearTimeout(leaveTimer)
      window.removeEventListener('load', onLoad)
    }
  }, [])

  if (state === 'gone') return null
  return (
    <div className={`boot${state === 'leaving' ? ' boot-leave' : ''}`} aria-hidden="true">
      <div className="boot-inner">
        <div className="boot-mark">ANP</div>
        <div className="boot-bar"><div style={{ width: `${pct}%` }} /></div>
        <div className="boot-text">
          <span>LOADING</span>
          <span>{String(pct).padStart(3, '0')}%</span>
        </div>
      </div>
    </div>
  )
}
