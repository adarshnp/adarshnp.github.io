import SectionTitle from '../components/SectionTitle'

export default function Contact() {
  return (
    <section id="contact" className="contact section">
      <SectionTitle title="Contact">
        Interested in working together? Reach out and I&apos;ll get back to you.
      </SectionTitle>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="info-item d-flex flex-column align-items-center mb-4">
              <i className="bi bi-envelope" style={{ fontSize: '2rem', color: 'var(--accent-color)', marginBottom: '12px' }} />
              <a href="mailto:adarshnp49@gmail.com" style={{ fontSize: '1.1rem' }}>
                adarshnp49@gmail.com
              </a>
            </div>
            <div className="d-flex justify-content-center gap-3 mt-2">
              <a
                href="https://www.linkedin.com/in/adarsh-np"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-primary"
              >
                <i className="bi bi-linkedin me-2" />LinkedIn
              </a>
              <a
                href="https://github.com/adarshnp"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary"
              >
                <i className="bi bi-github me-2" />GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
