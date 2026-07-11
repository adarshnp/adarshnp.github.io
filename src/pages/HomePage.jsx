import { useEffect, useRef } from 'react'
import { useAOS } from '../hooks/useAOS'
import { useScrollSpy } from '../hooks/useScrollSpy'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Resume from '../sections/Resume'
import Projects from '../sections/Projects'
import Contact from '../sections/Contact'

const SECTION_IDS = ['home', 'about', 'skills', 'resume', 'projects', 'contact']

export default function HomePage({ onSectionChange }) {
  useAOS()
  const activeSection = useScrollSpy(SECTION_IDS)
  const prevSection = useRef(null)

  useEffect(() => {
    if (activeSection !== prevSection.current) {
      prevSection.current = activeSection
      onSectionChange?.(activeSection)
    }
  }, [activeSection, onSectionChange])

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Resume />
      <Projects />
      <Contact />
    </>
  )
}
