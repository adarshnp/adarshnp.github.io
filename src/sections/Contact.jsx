import { useState } from 'react'

const EMAIL = 'adarshnp49@gmail.com'
const RESUME_PDF = '/assets/docs/Adarsh_N_P_Senior_Game_Programmer_Resume.pdf'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="continue" data-reveal>
          <div className="section-kicker continue-kicker">
            <span className="section-index">05</span>
            <span className="section-kicker-line" />
            <span>Contact</span>
          </div>

          <h2 className="continue-title">Let&apos;s work together</h2>
          <p className="continue-lead">
            Hiring for a gameplay role, or need someone to strengthen your game&apos;s systems, tools or
            performance? I&apos;d love to hear from you.
          </p>

          <div className="continue-email">
            <a href={`mailto:${EMAIL}`} className="continue-email-link">{EMAIL}</a>
            <button type="button" className="btn btn-ghost btn-sm" onClick={copy}>
              <i className={`bi ${copied ? 'bi-check2' : 'bi-copy'}`} /> {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>

          <div className="continue-actions">
            <a href={RESUME_PDF} target="_blank" rel="noreferrer" className="btn btn-primary">
              <i className="bi bi-file-earmark-arrow-down" /> Download resume
            </a>
            <a href="https://www.linkedin.com/in/adarsh-np" target="_blank" rel="noreferrer" className="btn btn-ghost">
              <i className="bi bi-linkedin" /> LinkedIn
            </a>
            <a href="https://github.com/adarshnp" target="_blank" rel="noreferrer" className="btn btn-ghost">
              <i className="bi bi-github" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
