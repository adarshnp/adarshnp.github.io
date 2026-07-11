import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

export default function Hero() {
  const typedRef = useRef(null)

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["I'm a Game Programmer"],
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    })
    return () => typed.destroy()
  }, [])

  return (
    <section id="home" className="home section dark-background">
      <img src="/assets/img/home-cover.jpg" alt="" data-aos="fade-in" />
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <h2>
          <span ref={typedRef} />
        </h2>
        <br />
        <p>
          with a passion for creating engaging and polished game experiences. I enjoy solving challenges and bringing
          ideas to life. Let&apos;s connect!
        </p>
      </div>
    </section>
  )
}
