import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { projects, FILTERS } from '../data/projects'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('*')
  const shown = projects.filter((p) => activeFilter === '*' || p.filter === activeFilter)

  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <SectionTitle index="04" kicker="Selected work" title="Projects">
          A 3D platformer showcased at Tokyo Game Show 2024, plus personal puzzle games and web builds.
        </SectionTitle>

        <div className="level-filters" role="tablist" aria-label="Filter projects" data-reveal>
          {FILTERS.map((f) => (
            <button
              type="button"
              role="tab"
              key={f.value}
              aria-selected={activeFilter === f.value}
              className={activeFilter === f.value ? 'active' : ''}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label}
              <span>{projects.filter((p) => f.value === '*' || p.filter === f.value).length}</span>
            </button>
          ))}
        </div>

        <div className="levels" data-reveal>
          {shown.map((project) => {
            return (
              <Link
                to={`/projects/${project.slug}`}
                key={project.slug}
                className={`level${project.featured && activeFilter === '*' ? ' level-featured' : ''}`}
              >
                <div className="level-media">
                  <img src={project.coverImage} alt="" loading="lazy" />
                  {project.flag && <span className="level-flag"><i className="bi bi-award" /> {project.flag}</span>}
                  <span className="corner tl" /><span className="corner tr" />
                  <span className="corner bl" /><span className="corner br" />
                </div>
                <div className="level-body">
                  <div className="level-meta">
                    <span>{project.category}</span>
                    <span>{project.engine || FILTERS.find((f) => f.value === project.filter)?.label}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="level-platform">{project.platform}</p>
                  <span className="level-cta">View project <i className="bi bi-arrow-right" /></span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
