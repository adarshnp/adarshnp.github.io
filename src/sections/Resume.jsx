import { useState } from 'react'
import SectionTitle from '../components/SectionTitle'
import { experience, education } from '../data/experience'

const PREVIEW_COUNT = 3

function Quest({ job, index }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? job.points : job.points.slice(0, PREVIEW_COUNT)
  const hidden = Math.max(0, job.points.length - PREVIEW_COUNT) + (job.leadership?.length ?? 0)

  return (
    <article className={`quest${job.current ? ' quest-active' : ''}`} data-reveal>
      <div className="quest-marker" aria-hidden="true">
        <span>{String(experience.length - index).padStart(2, '0')}</span>
      </div>

      <div className="quest-card">
        <div className="quest-top">
          <span className={`quest-status${job.current ? ' is-active' : ''}`}>
            {job.current ? <><span className="live-dot" /> Current role</> : 'Previous role'}
          </span>
          <span className="quest-period">{job.period}</span>
        </div>

        <h3 className="quest-role">{job.role}</h3>
        <p className="quest-company">
          {job.website ? (
            <a href={job.website} target="_blank" rel="noreferrer">{job.company} <i className="bi bi-arrow-up-right" /></a>
          ) : job.company}
          <span> · {job.location}</span>
        </p>

        {job.product && (
          <p className="quest-product">
            <strong>Product: {job.product.name}</strong> — {job.product.summary}
          </p>
        )}

        <ul className="achievements" aria-label="Highlights">
          {job.achievements.map((a) => (
            <li key={a}><i className="bi bi-check2-circle" /> {a}</li>
          ))}
        </ul>

        <ul className="quest-points">
          {visible.map((p) => <li key={p}>{p}</li>)}
        </ul>

        {expanded && job.leadership && (
          <>
            <h4 className="quest-subhead">Leadership</h4>
            <ul className="quest-points">
              {job.leadership.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </>
        )}

        {hidden > 0 && (
          <button type="button" className="quest-toggle" onClick={() => setExpanded((e) => !e)} aria-expanded={expanded}>
            {expanded ? 'Show less' : `Show ${hidden} more`}
            <i className={`bi ${expanded ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
          </button>
        )}
      </div>
    </article>
  )
}

export default function Resume() {
  return (
    <section id="resume" className="section">
      <div className="container">
        <SectionTitle index="03" kicker="Career" title="Experience">
          <a
            href="/assets/docs/Adarsh_N_P_Senior_Game_Programmer_Resume.pdf"
            className="btn btn-ghost btn-sm"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-file-earmark-arrow-down" /> Download full resume
          </a>
        </SectionTitle>

        <div className="quest-log">
          {experience.map((job, i) => <Quest job={job} index={i} key={job.company} />)}

          <article className="quest quest-tutorial" data-reveal>
            <div className="quest-marker" aria-hidden="true"><i className="bi bi-mortarboard" /></div>
            <div className="quest-card">
              <div className="quest-top">
                <span className="quest-status">Education</span>
                <span className="quest-period">{education.period}</span>
              </div>
              <h3 className="quest-role">{education.degree}</h3>
              <p className="quest-company">
                <a href={education.website} target="_blank" rel="noreferrer">
                  {education.school} <i className="bi bi-arrow-up-right" />
                </a>
                <span> · {education.location}</span>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
