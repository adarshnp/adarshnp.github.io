export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-thanks">Thanks for visiting.</div>
        <div className="footer-meta">
          <span>© {year} Adarsh N P</span>
          <span className="footer-sep">/</span>
          <span>Built with React</span>
        </div>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/adarsh-np" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <i className="bi bi-linkedin" />
          </a>
          <a href="https://github.com/adarshnp" target="_blank" rel="noreferrer" aria-label="GitHub">
            <i className="bi bi-github" />
          </a>
          <a href="https://www.youtube.com/@citybreathsgaming" target="_blank" rel="noreferrer" aria-label="YouTube">
            <i className="bi bi-youtube" />
          </a>
        </div>
      </div>
    </footer>
  )
}
