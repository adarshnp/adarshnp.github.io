import SectionTitle from '../components/SectionTitle'

function calculateAge(dob) {
  const today = new Date()
  const birth = new Date(dob)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}

export default function About() {
  const age = calculateAge('1997-09-01')

  return (
    <section id="about" className="about section">
      <SectionTitle title="About">
        I&apos;m Adarsh, a dedicated game programmer with over five years of experience creating interactive and
        engaging projects. My work spans game development and WebGL applications, where I&apos;ve honed skills in
        programming, performance optimization, and creating tools to streamline workflows. I&apos;m passionate about
        crafting memorable experiences, solving technical challenges, and pushing the boundaries of what games can
        achieve. Whether it&apos;s collaborating with a team or leading a project, I love the process of bringing
        creative ideas to life.
      </SectionTitle>

      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <ul>
              <li>
                <i className="bi bi-chevron-right" /> <strong>Age:</strong>{' '}
                <span>{age} years</span>
              </li>
              <li>
                <i className="bi bi-chevron-right" /> <strong>Nationality:</strong>{' '}
                <span>India</span>
              </li>
              <li>
                <i className="bi bi-chevron-right" /> <strong>Residence:</strong>{' '}
                <span>Dubai, UAE</span>
              </li>
            </ul>
          </div>
          <div className="col-lg-6">
            <ul>
              <li>
                <i className="bi bi-chevron-right" /> <strong>Email:</strong>{' '}
                <span>adarshnp49@gmail.com</span>
              </li>
              <li>
                <i className="bi bi-chevron-right" /> <strong>Gaming YouTube Channel:</strong>{' '}
                <span>
                  <a href="https://www.youtube.com/@citybreathsgaming" target="_blank" rel="noreferrer">
                    City Breaths
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
