import { useEffect, useState } from 'react'

export default function ScrollTop() {
  const [active, setActive] = useState(false)

  useEffect(() => {
    const toggle = () => setActive(window.scrollY > 100)
    window.addEventListener('scroll', toggle, { passive: true })
    return () => window.removeEventListener('scroll', toggle)
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <a
      href="#"
      id="scroll-top"
      className={`scroll-top d-flex align-items-center justify-content-center${active ? ' active' : ''}`}
      onClick={handleClick}
    >
      <i className="bi bi-arrow-up-short" />
    </a>
  )
}
