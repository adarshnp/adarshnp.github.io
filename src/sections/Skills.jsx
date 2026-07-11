import SectionTitle from '../components/SectionTitle'

const SKILL_GROUPS = [
  {
    title: 'Game Engines',
    skills: ['Unity', 'Cocos2D', 'Unreal', 'ThreeJS'],
  },
  {
    title: 'Languages',
    skills: ['C#', 'C++', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    title: 'Unity Specialization',
    skills: ['Unity UI', 'ShaderGraphs', 'Editor Programming', 'Procedural Animation', 'IMGUI', 'Mesh Manipulation'],
  },
  {
    title: 'Project Tools',
    skills: ['GIT', 'Perforce', 'Jira'],
  },
  {
    title: 'Soft Skills',
    skills: ['Leadership', 'Project Management', 'Communication'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionTitle title="Skills">I have experience in following technologies.</SectionTitle>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="skills-container">
          {SKILL_GROUPS.map((group) => (
            <div className="skills-section" key={group.title}>
              <h2>{group.title}</h2>
              <div className="skills">
                {group.skills.map((skill) => (
                  <span className="skill" key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
