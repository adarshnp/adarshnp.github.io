import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { useScrollSpy } from '../hooks/useScrollSpy'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Resume from '../sections/Resume'
import Projects from '../sections/Projects'
import Gaming from '../sections/Gaming'
import Contact from '../sections/Contact'

const SECTION_IDS = ['home', 'about', 'skills', 'resume', 'projects', 'gaming', 'contact']

export default function HomePage({ onSectionChange }) {
  useReveal()
  const location = useLocation()
  const activeSection = useScrollSpy(SECTION_IDS)
  const prevSection = useRef(null)

  useEffect(() => {
    if (activeSection !== prevSection.current) {
      prevSection.current = activeSection
      onSectionChange?.(activeSection)
    }
  }, [activeSection, onSectionChange])

  // Arriving from another route with a target section.
  useEffect(() => {
    const target = location.state?.scrollTo
    if (target) {
      requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView())
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Resume />
      <Projects />
      <Gaming />
      <Contact />
    </>
  )
}
