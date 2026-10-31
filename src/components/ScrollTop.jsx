import { useEffect, useState } from 'react'

export default function ScrollTop() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const toggle = () => setActive(window.scrollY > 600)
    window.addEventListener('scroll', toggle, { passive: true })
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  return (
    <button
      type="button"
      className={`scroll-top${active ? ' active' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <i className="bi bi-chevron-double-up" />
    </button>
  )
}
