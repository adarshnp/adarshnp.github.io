import SectionTitle from '../components/SectionTitle'

// Mirrors the Skills section of the resume PDF.
const SKILL_GROUPS = [
  {
    title: 'Game Engines',
    icon: 'bi-controller',
    skills: ['Unity', 'Cocos2x'],
  },
  {
    title: 'Languages & Frameworks',
    icon: 'bi-code-slash',
    skills: ['C#', 'TypeScript', 'JavaScript', 'ReactJS'],
  },
  {
    title: 'Graphics',
    icon: 'bi-palette',
    skills: ['URP', 'Shader Graph', 'Procedural Animation'],
  },
  {
    title: 'Game Development',
    icon: 'bi-joystick',
    skills: ['Gameplay Systems', 'Performance Optimization', 'Editor Tooling', 'Build Pipelines', 'WebGL', 'Unity UI'],
  },
  {
    title: 'Tools',
    icon: 'bi-git',
    skills: ['Git', 'Perforce', 'Jira', 'Figma'],
  },
  {
    title: 'Soft Skills',
    icon: 'bi-people',
    skills: ['Leadership', 'Project Management', 'Mentoring'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <SectionTitle index="02" kicker="Expertise" title="Skills">
          The engines, languages and tools I work with.
        </SectionTitle>

        <div className="loadout">
          {SKILL_GROUPS.map((group, i) => (
            <div className="slot" key={group.title} data-reveal style={{ '--delay': `${i * 60}ms` }}>
              <div className="slot-head">
                <i className={`bi ${group.icon}`} />
              </div>
              <h3>{group.title}</h3>
              <ul className="chips">
                {group.skills.map((skill) => (
                  <li className="chip" key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
