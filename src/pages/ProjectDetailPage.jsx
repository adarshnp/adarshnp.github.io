import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'
import { projects, FILTERS } from '../data/projects'

// Gallery items are image paths, { type: 'video', src, poster, loop? }
// or { type: 'youtube', id, poster, vertical? }.
const isVideo = (item) => typeof item === 'object' && item.type === 'video'
const isYouTube = (item) => typeof item === 'object' && item.type === 'youtube'
const srcOf = (item) => (isVideo(item) ? item.src : isYouTube(item) ? `youtube:${item.id}` : item)
const posterOf = (item) => (typeof item === 'object' ? item.poster : item)

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  const [active, setActive] = useState(0)
  // Tracks which media file has finished loading, to show a loader until then.
  const [loadedSrc, setLoadedSrc] = useState(null)
  // YouTube video whose player has been loaded (by pressing play).
  const [ytPlaying, setYtPlaying] = useState(null)
  useReveal([slug])

  useEffect(() => {
    setActive(0)
    setYtPlaying(null)
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % project.images.length)
      if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + project.images.length) % project.images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project])

  if (!project) {
    return (
      <section className="section detail-missing">
        <div className="container">
          <p className="hud-tag">Error 404</p>
          <h1 className="section-title">Project not found.</h1>
          <Link to="/" state={{ scrollTo: 'projects' }} className="btn btn-primary">
            <i className="bi bi-arrow-left" /> Back to projects
          </Link>
        </div>
      </section>
    )
  }

  const next = projects[(index + 1) % projects.length]
  const count = project.images.length
  const current = project.images[active]
  const currentSrc = srcOf(current)
  const portrait = project.orientation === 'portrait'
  const info = [
    ['Category', project.category],
    ['Engine', project.engine || FILTERS.find((f) => f.value === project.filter)?.label],
    ['Platform', project.platform],
    ['Status', project.status],
    ['Developer', project.developer],
  ].filter(([, v]) => v)

  return (
    <>
      <section className="detail-hero">
        <div className="container">
          <Link to="/" state={{ scrollTo: 'projects' }} className="detail-back">
            <i className="bi bi-arrow-left" /> All projects
          </Link>
          <p className="hud-tag">{project.category}</p>
          <h1 className="detail-title">{project.title}</h1>
        </div>
      </section>

      <section className="section detail">
        <div className="container detail-grid">
          <div className="viewer" data-reveal>
            <div className={`viewer-stage${portrait ? ' portrait' : ''}`}>
              {/* Blurred fill behind letterboxed media. */}
              <img className="viewer-backdrop" src={posterOf(current)} alt="" aria-hidden="true" />
              {isYouTube(current) ? (
                ytPlaying === current.id ? (
                  <iframe
                    key={current.id}
                    className={`viewer-yt${current.vertical ? ' vertical' : ''}`}
                    src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0&playsinline=1`}
                    title={`${project.title} — video`}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <>
                    <img key={currentSrc} src={current.poster} alt={`${project.title} — video preview`} />
                    <button type="button" className="viewer-play" onClick={() => setYtPlaying(current.id)} aria-label="Play video">
                      <i className="bi bi-play-fill" />
                    </button>
                  </>
                )
              ) : isVideo(current) ? (
                <video
                  key={currentSrc}
                  src={currentSrc}
                  poster={current.poster}
                  playsInline
                  aria-label={`${project.title} — gameplay ${current.loop ? 'clip' : 'video'}`}
                  {...(current.loop
                    ? { autoPlay: true, muted: true, loop: true }
                    : { controls: true, preload: 'metadata' })}
                />
              ) : (
                <img
                  key={currentSrc}
                  src={currentSrc}
                  alt={`${project.title} — media ${active + 1}`}
                  onLoad={() => setLoadedSrc(currentSrc)}
                  onError={() => setLoadedSrc(currentSrc)}
                />
              )}
              {typeof current === 'string' && loadedSrc !== currentSrc && (
                <span className="viewer-loading" role="status">
                  <span className="spinner" />
                  Loading…
                </span>
              )}
              {count > 1 && (
                <>
                  <button type="button" className="viewer-nav prev" aria-label="Previous" onClick={() => setActive((a) => (a - 1 + count) % count)}>
                    <i className="bi bi-chevron-left" />
                  </button>
                  <button type="button" className="viewer-nav next" aria-label="Next" onClick={() => setActive((a) => (a + 1) % count)}>
                    <i className="bi bi-chevron-right" />
                  </button>
                </>
              )}
              <span className="viewer-count">{String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
              <span className="corner tl" /><span className="corner tr" />
              <span className="corner bl" /><span className="corner br" />
            </div>

            {count > 1 && (
              <div className={`viewer-thumbs${portrait ? ' portrait' : ''}`}>
                {project.images.map((item, i) => (
                  <button
                    type="button"
                    key={srcOf(item)}
                    className={`thumb${i === active ? ' active' : ''}`}
                    onClick={() => setActive(i)}
                    aria-label={
                      isYouTube(item) ? `Show ${item.vertical ? 'short video' : 'video'}`
                        : isVideo(item) ? `Show gameplay ${item.loop ? 'clip' : 'video'}`
                          : `Show media ${i + 1}`
                    }
                  >
                    {isYouTube(item) ? (
                      <>
                        <img src={item.poster} alt="" loading="lazy" />
                        <span className="thumb-video"><i className="bi bi-youtube" /> {item.vertical ? 'Short' : 'Video'}</span>
                      </>
                    ) : isVideo(item) ? (
                      <>
                        <img src={item.poster} alt="" loading="lazy" />
                        <span className="thumb-video"><i className="bi bi-play-fill" /> {item.loop ? 'Clip' : 'Video'}</span>
                      </>
                    ) : (
                      <img src={item} alt="" loading="lazy" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="detail-info" data-reveal>
            <h2 className="sub-heading">Project info</h2>
            {project.description && <p className="detail-desc">{project.description}</p>}
            {project.role && <p className="detail-desc"><strong>My role:</strong> {project.role}</p>}
            {project.highlights && (
              <ul className="detail-highlights">
                {project.highlights.map((h) => (
                  <li key={h}><i className="bi bi-award" /> {h}</li>
                ))}
              </ul>
            )}
            {project.features && (
              <>
                <h3 className="detail-subhead">Features</h3>
                <ul className="detail-highlights">
                  {project.features.map((f) => (
                    <li key={f}><i className="bi bi-check2-circle" /> {f}</li>
                  ))}
                </ul>
              </>
            )}
            <dl className="spec">
              {info.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
            <div className="detail-actions">
              {project.link && (
                <a href={project.link.url} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <i className={`bi ${project.link.icon || 'bi-play-fill'}`} /> {project.link.label}
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-ghost">
                  <i className="bi bi-github" /> Source
                </a>
              )}
            </div>

            <Link to={`/projects/${next.slug}`} className="next-level">
              <span>Next project</span>
              <strong>{next.title} <i className="bi bi-arrow-right" /></strong>
            </Link>
          </aside>
        </div>
      </section>
    </>
  )
}
