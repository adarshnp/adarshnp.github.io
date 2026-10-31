import { useLayoutEffect } from 'react'

// Fades [data-reveal] elements in as they scroll into view.
// Content is visible by default: only elements that start below the fold are
// hidden (.reveal-pending) until reached, so nothing can get stuck invisible —
// e.g. elements mounted later, or after a hot reload, simply show as-is.
export function useReveal(deps = []) {
  useLayoutEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const pending = [...document.querySelectorAll('[data-reveal]')].filter(
      (el) => !el.classList.contains('revealed') && el.getBoundingClientRect().top > window.innerHeight,
    )
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.remove('reveal-pending')
          entry.target.classList.add('revealed')
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    pending.forEach((el) => {
      el.classList.add('reveal-pending')
      io.observe(el)
    })

    return () => {
      io.disconnect()
      pending.forEach((el) => el.classList.remove('reveal-pending'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
