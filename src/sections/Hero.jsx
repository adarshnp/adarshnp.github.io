import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import HeroCanvas from '../components/HeroCanvas'

export default function Hero() {
  const typedRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ['gameplay systems', 'clean, scalable architecture', 'editor tools & build pipelines', 'procedural animation', '60 FPS experiences'],
      loop: true,
      typeSpeed: 55,
      backSpeed: 28,
      backDelay: 1800,
      cursorChar: '_',
    })
    return () => typed.destroy()
  }, [])

  const scrollTo = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="hero">
      <HeroCanvas />
      <div className="hero-vignette" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hud-tag hero-tag">
          <i className="bi bi-geo-alt" /> Based in Dubai, UAE
        </div>

        <h1 className="hero-name glitch" data-text="Adarsh N P">Adarsh N P</h1>

        <p className="hero-role">
          Senior Game Programmer
          <span className="hero-role-sep">//</span>
          <span className="hero-role-engines">Unity · C# · Cocos · WebGL</span>
        </p>

        <p className="hero-typed">
          <span className="hero-prompt">&gt;</span> building <span ref={typedRef} className="hero-typed-text" />
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary" onClick={scrollTo('projects')}>
            View my work <i className="bi bi-arrow-down" />
          </a>
          <a href="#contact" className="btn btn-ghost" onClick={scrollTo('contact')}>
            Get in touch
          </a>
        </div>
      </div>

      <div className="hero-hint" aria-hidden="true">
        <span />

        <span className="hero-hint-scroll">Scroll <i className="bi bi-arrow-down" /></span>
      </div>
    </section>
  )
}
