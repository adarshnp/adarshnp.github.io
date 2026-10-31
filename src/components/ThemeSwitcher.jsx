import { useEffect, useRef, useState } from 'react'
import { THEMES, EFFECTS, applyTheme, applyFx } from '../data/themes'

export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(() => document.documentElement.dataset.theme)
  const [fx, setFx] = useState(() => document.documentElement.dataset.fx)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (!rootRef.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pick = (id) => {
    applyTheme(id)
    setCurrent(id)
  }

  return (
    <div className={`theme-switch${open ? ' open' : ''}`} ref={rootRef}>
      {open && (
        <div className="theme-panel" role="listbox" aria-label="Choose a theme">
          <p className="theme-panel-title">Choose a style</p>
          {THEMES.map((t) => (
            <button
              type="button"
              role="option"
              aria-selected={current === t.id}
              key={t.id}
              className={`theme-option${current === t.id ? ' active' : ''}`}
              onClick={() => pick(t.id)}
            >
              <span className="theme-swatch" aria-hidden="true">
                {t.swatch.map((c) => <span key={c} style={{ background: c }} />)}
              </span>
              <span className="theme-text">
                <strong>{t.name}</strong>
                <span>{t.note}</span>
              </span>
              {current === t.id && <i className="bi bi-check2" />}
            </button>
          ))}

          <p className="theme-panel-title theme-panel-sub">Hero effect</p>
          <div className="fx-options">
            {EFFECTS.map((e) => (
              <button
                type="button"
                key={e.id}
                aria-pressed={fx === e.id}
                className={`fx-option${fx === e.id ? ' active' : ''}`}
                onClick={() => { applyFx(e.id); setFx(e.id) }}
              >
                <i className={`bi ${e.icon}`} />
                {e.name}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        type="button"
        className="theme-toggle"
        aria-expanded={open}
        aria-label="Change theme"
        onClick={() => setOpen((o) => !o)}
      >
        <i className="bi bi-palette2" /> <span>Theme</span>
      </button>
    </div>
  )
}
