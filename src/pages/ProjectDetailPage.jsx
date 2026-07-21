import { useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Swiper from 'swiper'
import { Pagination, Autoplay } from 'swiper/modules'
import { useAOS } from '../hooks/useAOS'
import { projects } from '../data/projects'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const swiperRef = useRef(null)
  useAOS()

  useEffect(() => {
    if (!swiperRef.current || !project) return
    const swiper = new Swiper(swiperRef.current, {
      modules: [Pagination, Autoplay],
      loop: true,
      speed: 600,
      autoplay: { delay: 5000 },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    })
    return () => swiper.destroy()
  }, [slug, project])

  if (!project) {
    return (
      <div className="container section">
        <h2>Project not found.</h2>
        <Link to="/">← Back to Portfolio</Link>
      </div>
    )
  }

  return (
    <>
      <div className="page-title dark-background">
        <div className="container d-lg-flex justify-content-between align-items-center">
          <h1 className="mb-2 mb-lg-0">{project.title}</h1>
        </div>
      </div>

      <section id="portfolio-details" className="portfolio-details section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-8">
              <div className="portfolio-details-slider swiper" ref={swiperRef}>
                <div className="swiper-wrapper align-items-center">
                  {project.images.map((src, i) => (
                    <div className="swiper-slide" key={i}>
                      <img src={src} alt={`${project.title} screenshot ${i + 1}`} />
                    </div>
                  ))}
                </div>
                <div className="swiper-pagination" />
              </div>
            </div>

            <div className="col-lg-4">
              <div className="portfolio-info" data-aos="fade-up" data-aos-delay="200">
                <h3>{project.title}</h3>
                {project.description && <p>{project.description}</p>}
                <ul>
                  {project.category && (
                    <li><strong>Category</strong>: {project.category}</li>
                  )}
                  {project.platform && (
                    <li><strong>Platform</strong>: {project.platform}</li>
                  )}
                  {project.status && (
                    <li><strong>Status</strong>: {project.status}</li>
                  )}
                  {project.engine && (
                    <li><strong>Engine</strong>: {project.engine}</li>
                  )}
                  {project.developer && (
                    <li><strong>Developer</strong>: {project.developer}</li>
                  )}
                  {project.link && (
                    <li>
                      <strong>{project.link.label}</strong>:{' '}
                      <a href={project.link.url} target="_blank" rel="noreferrer">
                        Click here
                      </a>
                    </li>
                  )}
                </ul>
                {project.highlights && (
                  <>
                    <h4>Highlights</h4>
                    <ul>
                      {project.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
