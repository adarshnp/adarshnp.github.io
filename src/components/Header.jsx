import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { hash: 'home',     icon: 'bi-house',             label: 'Home' },
  { hash: 'about',   icon: 'bi-person',            label: 'About' },
  { hash: 'resume',  icon: 'bi-file-earmark-text', label: 'Resume' },
  { hash: 'projects',icon: 'bi-images',            label: 'Projects' },
  { hash: 'contact', icon: 'bi-envelope',          label: 'Contact' },
]

export default function Header({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const handleNavClick = (hash) => {
    if (isOpen) setIsOpen(false)
    if (isHome) {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      id="header"
      className={`header dark-background d-flex flex-column${isOpen ? ' header-show' : ''}`}
    >
      <i
        className={`header-toggle d-xl-none bi ${isOpen ? 'bi-x' : 'bi-list'}`}
        onClick={() => setIsOpen((o) => !o)}
      />

      <div className="profile-img">
        <img src="/assets/img/adarsh_pic.jpg" alt="" className="img-fluid rounded-circle" />
      </div>

      <a href="/#/" className="logo d-flex align-items-center justify-content-center">
        <h1 className="sitename">Adarsh N P</h1>
      </a>

      <div className="social-links text-center">
        <a href="https://www.linkedin.com/in/adarsh-np" className="linkedin" target="_blank" rel="noreferrer">
          <i className="bi bi-linkedin" />
        </a>
        <a href="https://github.com/adarshnp" className="github" target="_blank" rel="noreferrer">
          <i className="bi bi-github" />
        </a>
      </div>

      <nav id="navmenu" className="navmenu">
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.hash}>
              {isHome ? (
                <a
                  href={`#${item.hash}`}
                  className={activeSection === item.hash ? 'active' : ''}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.hash) }}
                >
                  <i className={`bi ${item.icon} navicon`} />
                  {item.label}
                </a>
              ) : (
                <a href={`/#/#${item.hash}`}>
                  <i className={`bi ${item.icon} navicon`} />
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
