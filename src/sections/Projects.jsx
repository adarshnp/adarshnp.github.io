import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { projects, FILTERS } from '../data/projects'

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('*')
  const shown = projects.filter((p) => activeFilter === '*' || p.filter === activeFilter)
  // The featured project only gets its full-width row in the "All" view.
  const isFeatured = (p) => p.featured && activeFilter === '*'
  // Grid cells in use: the featured card spans two.
  const cells = shown.reduce((n, p) => n + (isFeatured(p) ? 2 : 1), 0)

  return (
    <section id="projects" className="section section-alt">
      <div className="container container-narrow">
        <SectionTitle index="04" kicker="Selected work" title="Projects">
          A 3D platformer showcased at Tokyo Game Show 2024, plus my own mobile and web games.
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
          {shown.map((project, i) => {
            const featured = isFeatured(project)
            // A card left alone on the last row gets centered (per column count).
            const isLast = i === shown.length - 1 && !featured
            const lone = [isLast && cells % 3 === 1 && 'lone-3', isLast && cells % 2 === 1 && 'lone-2']
              .filter(Boolean)
              .join(' ')

            return (
              <Link
                to={`/projects/${project.slug}`}
                key={project.slug}
                className={`level${featured ? ' level-featured' : ''}${lone ? ` ${lone}` : ''}`}
              >
                <div className={`level-media${project.coverStyle === 'icon' ? ' level-media-icon' : ''}`}>
                  {project.coverStyle === 'icon' ? (
                    // Blurred copy fills any transparent corners of the icon.
                    <>
                      <img className="level-icon-bg" src={project.coverImage} alt="" loading="lazy" />
                      <img className="level-icon" src={project.coverImage} alt="" loading="lazy" />
                    </>
                  ) : (
                    <img src={project.coverImage} alt="" loading="lazy" />
                  )}
                  {project.flag && <span className="level-flag"><i className="bi bi-award" /> {project.flag}</span>}
                  <span className="corner tl" /><span className="corner tr" />
                  <span className="corner bl" /><span className="corner br" />
                </div>
                <div className="level-body">
                  <div className="level-meta">
                    <span>{project.category}</span>
                    <span>{FILTERS.find((f) => f.value === project.filter)?.label}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="level-platform">{project.platform}</p>
                  {featured && (
                    <>
                      {project.description && <p className="level-desc">{project.description}</p>}
                      {project.highlights && (
                        <ul className="level-highlights">
                          {project.highlights.map((h) => (
                            <li key={h}><i className="bi bi-award" /> {h}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
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
