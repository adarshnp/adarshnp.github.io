import SectionTitle from '../components/SectionTitle'

export default function Resume() {
  return (
    <section id="resume" className="resume section">
      <SectionTitle title="Resume">
        <div className="button" style={{ marginTop: '10px' }}>
          <a
            href="/assets/docs/Adarsh_N_P_Senior_Game_Programmer_Resume.pdf"
            className="resume-button"
            target="_blank"
            rel="noreferrer"
          >
            <p>Download Resume</p>
          </a>
        </div>
      </SectionTitle>

      <div className="container">
        <h3 className="resume-title">Professional Experience</h3>

        <div className="resume-item">
          <h4>Game Programmer</h4>
          <h5>Feb 2025 - Present</h5>
          <p><em>Xflame Tech Design, Dubai, UAE</em></p>
          <ul>
            <li>Stepped into multiple teams as needed, offering direction, clarity, and technical support while maintaining consistent delivery in a fast-paced environment.</li>
            <li>Demonstrated strong adaptability by moving from Unity/C# to Cocos Creator/TypeScript within days, ensuring continuous delivery across diverse engine pipelines.</li>
            <li>Developed a hybrid AOT/JIT Unity Hot-Update prototype that loads hotfix assemblies at runtime, removing the need for full rebuilds.</li>
            <li>Developed a reusable chat system that can be plugged into different games with minimal effort, reducing implementation time across projects.</li>
            <li>Maintained a high bug-fix approval rate, consistently closing issues quickly while proposing reusable, permanent solutions instead of temporary patches.</li>
            <li>Resolved blocking technical issues in the development pipeline and smoothened the development speed of the team.</li>
          </ul>
        </div>

        <div className="resume-item">
          <h4>Game Programmer</h4>
          <h5>Jul 2023 - Feb 2025</h5>
          <p><em>Dark Emerald Gaming Studio, Dubai, UAE</em></p>
          <p>Website: <a href="https://www.darkemerald.ae" target="_blank" rel="noreferrer">https://www.darkemerald.ae</a></p>
          <ul>
            <li>Designed and implemented a system for streaming multiple scenes, which improved performance and reduced frame rate drops by 30% during scene transitions.</li>
            <li>Architected and implemented a complete save system, enabling players to save and load progress seamlessly across various gameplay states, enhancing the overall user experience.</li>
            <li>Developed a new volume component for post-processing called Iris Blur, adding a unique blur effect that simulates a focus transition, enhancing depth of field and visual immersion in the game.</li>
            <li>Developed many custom Unity editor tools (FPS counter, mesh correction tool, room selection tool, checkpoint teleportation tool, file search tool), increasing team productivity by 50%.</li>
            <li>Created and implemented procedural animation for the player character&apos;s scarf using Verlet Integration, improving movement fluidity and realism.</li>
            <li>Developed visual effects for the player character, including a Blob Shadow using quads and trigonometry for realistic ground interaction and Afterimage Effects to create motion blur illusions during rapid movement, enhancing visual appeal and gameplay feedback.</li>
            <li>Designed and implemented UI System for in-game tools, including the main menu and pause menu, improving the player experience and accessibility by offering intuitive control and options during gameplay.</li>
            <li>Utilized Unity&apos;s Profiler to find and fix performance issues, improving frame rates from 40-45 FPS to a steady 60 FPS through time-slicing, dynamic batching, and occlusion culling.</li>
          </ul>
        </div>

        <div className="resume-item">
          <h4>Senior Software Engineer, Team Lead</h4>
          <h5>2020 - 2023</h5>
          <p><em>Inapp Information Technologies, Thiruvananthapuram, India</em></p>
          <p>Website: <a href="https://www.inapp.com" target="_blank" rel="noreferrer">https://www.inapp.com</a></p>
          <ul>
            <li>Led a cross-functional team of developers, ensuring smooth collaboration and efficient project execution.</li>
            <li>Spearheaded the development of the tool from scratch to finish in two years, meeting tight deadlines and receiving excellent client feedback.</li>
            <li>Integrated splines to model realistic landscaping features such as walls, pavers, and other custom geometries.</li>
            <li>Streamlined the Unity-Web interaction, handling API calls, JSON parsing, and seamless data exchange between the frontend and backend.</li>
            <li>Developed and optimized custom shaders using Shader Graph, enhancing the visual effects of 3D objects and improving overall performance.</li>
            <li>Implemented best practices in performance optimization, reducing load times and ensuring smooth interactions for users with different hardware configurations.</li>
            <li>Ensured that the tool functioned seamlessly across different web browsers and devices, optimizing performance for mobile and desktop platforms.</li>
          </ul>
        </div>

        <h3 className="resume-title">Education</h3>

        <div className="resume-item">
          <h4>Bachelor of Technology: Computer Science</h4>
          <h5>2016 - 2020</h5>
          <p><em>College Of Engineering Trivandrum, Thiruvanathapuram</em></p>
          <p>Website: <a href="https://www.cet.ac.in/" target="_blank" rel="noreferrer">https://www.cet.ac.in/</a></p>
        </div>
      </div>
    </section>
  )
}
