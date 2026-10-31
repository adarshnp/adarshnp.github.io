import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import FpsMeter from './FpsMeter'
import ThemeSwitcher from './ThemeSwitcher'

const NAV_ITEMS = [
  { hash: 'about',    label: 'About' },
  { hash: 'skills',   label: 'Skills' },
  { hash: 'resume',   label: 'Experience' },
  { hash: 'projects', label: 'Projects' },
  { hash: 'contact',  label: 'Contact' },
]

const RESUME_PDF = '/assets/docs/Adarsh_N_P_Senior_Game_Programmer_Resume.pdf'

export default function Header({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('menu-open', isOpen)
  }, [isOpen])

  const goTo = (hash) => {
    setIsOpen(false)
    if (isHome) {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/', { state: { scrollTo: hash } })
    }
  }

  return (
    <header className={`hud${scrolled ? ' hud-scrolled' : ''}${isOpen ? ' hud-open' : ''}`}>
      <div className="hud-bar">
        <a
          href="#/"
          className="hud-logo"
          onClick={(e) => { e.preventDefault(); goTo('home') }}
          aria-label="Adarsh N P — home"
        >
          <span className="hud-logo-mark">ANP</span>
          <span className="hud-logo-text">adarsh<span>.np</span></span>
        </a>

        <nav className="hud-nav" aria-label="Main">
          <ul>
            {NAV_ITEMS.map((item, i) => (
              <li key={item.hash}>
                <a
                  href={`#${item.hash}`}
                  className={isHome && activeSection === item.hash ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); goTo(item.hash) }}
                >
                  <span className="hud-nav-index">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hud-right">
          <FpsMeter />
          <ThemeSwitcher />
          <a href={RESUME_PDF} target="_blank" rel="noreferrer" className="btn btn-sm btn-ghost hud-cv">
            <i className="bi bi-download" /> CV
          </a>
          <button
            type="button"
            className="hud-toggle"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className="hud-xp" aria-hidden="true">
        <div className="hud-xp-fill" style={{ transform: `scaleX(${progress})` }} />
      </div>
    </header>
  )
}
