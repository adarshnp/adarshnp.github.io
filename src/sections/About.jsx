import SectionTitle from '../components/SectionTitle'

function calculateAge(dob) {
  const today = new Date()
  const birth = new Date(dob)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

const ABILITIES = [
  { icon: 'bi-joystick',     title: 'Gameplay systems',     text: 'Save systems, additive scene streaming, UI systems.' },
  { icon: 'bi-tools',        title: 'Tooling & pipelines',  text: 'Unity editor tools and custom build pipelines.' },
  { icon: 'bi-speedometer2', title: 'Performance',          text: 'Profiling, time-slicing, batching, occlusion culling.' },
  { icon: 'bi-bezier2',      title: 'Graphics & animation', text: 'URP post-processing, Shader Graph, Verlet animation.' },
]

export default function About() {
  const age = calculateAge('1997-09-01')

  const stats = [
    { k: 'Role',        v: 'Senior Game Programmer' },
    { k: 'Company',     v: 'Xflame Tech Design' },
    { k: 'Location',    v: 'Dubai, UAE' },
    { k: 'Nationality', v: 'India' },
    { k: 'Age',         v: `${age}` },
  ]

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle index="01" kicker="Who I am" title="About" />

        <div className="about-grid">
          <div className="profile-card" data-reveal>
            <div className="profile-frame">
              <img src="/assets/img/adarsh_pic.jpg" alt="Portrait of Adarsh N P" />
              <span className="corner tl" /><span className="corner tr" />
              <span className="corner bl" /><span className="corner br" />
            </div>
            <dl className="profile-stats">
              {stats.map((s) => (
                <div key={s.k}>
                  <dt>{s.k}</dt>
                  <dd>{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="about-body" data-reveal>
            <p className="about-lead">
              I&apos;m Adarsh, a Senior Game Programmer with 6 years of experience developing and shipping PC
              and cross-platform titles.
            </p>
            <p>
              I focus on gameplay systems, clean architecture and performance optimization in C#. I take
              ownership of features from concept through polish, work closely with design, and contribute to
              technical direction while building systems that stay stable and scalable as a project evolves.
            </p>

            <h3 className="sub-heading">Core strengths</h3>
            <ul className="abilities">
              {ABILITIES.map((a) => (
                <li key={a.title}>
                  <i className={`bi ${a.icon}`} />
                  <div>
                    <strong>{a.title}</strong>
                    <span>{a.text}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="about-links">
              <a href="mailto:adarshnp49@gmail.com"><i className="bi bi-envelope" /> adarshnp49@gmail.com</a>
              <a href="https://www.youtube.com/@citybreathsgaming" target="_blank" rel="noreferrer">
                <i className="bi bi-youtube" /> City Breaths — my gaming channel
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
