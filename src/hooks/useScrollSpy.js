import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds, offset = 200) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    function handleScroll() {
      const scrollY = window.scrollY + offset
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        if (scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(id)
          return
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeSection
}
