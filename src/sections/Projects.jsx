import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded'
import SectionTitle from '../components/SectionTitle'
import { projects } from '../data/projects'

const FILTERS = [
  { value: '*', label: 'All' },
  { value: 'filter-app', label: 'Unity' },
]

export default function Projects() {
  const containerRef = useRef(null)
  const isoRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('*')

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    imagesLoaded(container, () => {
      isoRef.current = new Isotope(container, {
        itemSelector: '.isotope-item',
        layoutMode: 'masonry',
        filter: '*',
        sortBy: 'original-order',
      })
    })

    return () => {
      isoRef.current?.destroy()
      isoRef.current = null
    }
  }, [])

  const handleFilterClick = (filter) => {
    setActiveFilter(filter)
    isoRef.current?.arrange({ filter: filter === '*' ? '*' : `.${filter}` })
  }

  return (
    <section id="projects" className="portfolio section">
      <SectionTitle title="Projects" />

      <div className="container">
        <div className="isotope-layout">
          <ul
            className="portfolio-filters isotope-filters"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {FILTERS.map((f) => (
              <li
                key={f.value}
                className={activeFilter === f.value ? 'filter-active' : ''}
                onClick={() => handleFilterClick(f.value)}
              >
                {f.label}
              </li>
            ))}
          </ul>

          <div
            className="row gy-4 isotope-container"
            ref={containerRef}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {projects.map((project) => (
              <div
                key={project.slug}
                className={`col-lg-4 col-md-6 portfolio-item isotope-item ${project.filter}`}
              >
                <div className="portfolio-content h-100">
                  <Link to={`/projects/${project.slug}`} className="details-link" title="More Details">
                    <img src={project.coverImage} className="img-fluid" alt={project.title} />
                    <div className="portfolio-info">
                      <h4>Unity</h4>
                      <p>{project.title}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
