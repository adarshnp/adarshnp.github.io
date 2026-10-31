// Mirrors the resume PDF in public/assets/docs — keep the two in sync.

export const experience = [
  {
    role: 'Senior Game Programmer',
    company: 'Xflame Tech Design',
    location: 'Dubai, UAE',
    period: 'Feb 2025 — Present',
    current: true,
    achievements: ['Unity → Cocos Creator in days', 'Runtime hot-update prototype', 'Reusable chat system'],
    points: [
      'Stepped into multiple teams as needed, offering direction, clarity, and technical support while maintaining consistent delivery in a fast-paced environment.',
      'Demonstrated strong adaptability by moving from Unity/C# to Cocos Creator/TypeScript within days, ensuring continuous delivery across diverse engine pipelines.',
      'Developed a hybrid AOT/JIT Unity Hot-Update prototype that loads hotfix assemblies at runtime, removing the need for full rebuilds.',
      'Developed a reusable chat system that can be plugged into different games with minimal effort, reducing implementation time across projects.',
      'Maintained a high bug-fix approval rate, consistently closing issues quickly while proposing reusable, permanent solutions instead of temporary patches.',
      'Resolved blocking technical issues in the development pipeline and improved the development speed of the team.',
    ],
  },
  {
    role: 'Game Programmer',
    company: 'Dark Emerald Gaming Studio',
    location: 'Dubai, UAE',
    period: 'Jul 2023 — Feb 2025',
    website: 'https://www.darkemerald.ae',
    achievements: ['40 → 60 FPS', '+50% team productivity', '−60% build prep time', 'Tokyo Game Show builds'],
    points: [
      'Served as one of the core programmers, responsible for gameplay systems, technical architecture, optimization, and development tooling.',
      'Designed and implemented the architecture for streaming multiple additive scenes to optimize resource usage, saving a 30 FPS drop during scene transitions.',
      'Designed the UI system for in-game tools, including the main menu and pause menu, improving the player experience and accessibility by offering intuitive controls and options during gameplay.',
      'Developed custom editor tools to streamline workflows, including an FPS counter, mesh correction tool, room selection tool, checkpoint teleport tool, file search tool, and script & prefab usage checker. These tools boosted team productivity by 50%.',
      'Created and implemented the procedural animation for the player character’s scarf using Verlet integration, improving the character’s movement and realism.',
      'Developed Iris Blur, a new post-processing volume component that simulates a focus transition, enhancing depth of field and visual immersion. Later built a volume tween system for animating all post-process components.',
      'Architected and implemented a complete save system, enabling players to save and load progress seamlessly across various gameplay states.',
      'Documented the system designs and created a comprehensive programmer’s guide for future developers, ensuring smooth onboarding and understanding of complex systems and workflows.',
      'Tested and ensured the quality of implemented features through thorough testing, bug finding, and optimization for stable gameplay and a smooth user experience.',
      'Used Unity’s Profiler to find and fix performance issues with time-slicing, dynamic batching, and occlusion culling, increasing frame rates from an average of 40 FPS to a steady 60 FPS.',
      'Designed and implemented a custom build pipeline with options for automation and flexibility, reducing build preparation time by 60%. Responsible for the final builds for high-profile events, including Middle East Comicon and Tokyo Game Show, meeting strict deadlines and quality standards.',
    ],
  },
  {
    role: 'Senior Software Engineer, Team Lead',
    company: 'InApp',
    location: 'Thiruvananthapuram, India',
    period: 'Nov 2020 — Jun 2023',
    website: 'https://www.inapp.com',
    product: {
      name: 'Home Visualizer Tool',
      summary:
        'A home exterior landscaping visualization tool built in Unity for WebGL. Users arranged 3D landscape objects on top of a 2D picture of their home and could draw custom shapes.',
    },
    achievements: ['Best Employee of the Quarter, Q1 2022', 'Led the development team', 'Built from scratch in 2 years'],
    points: [
      'Completed the project from scratch to finish in 2 years, meeting the deadline with excellent feedback from the client.',
      'Integrated splines to model realistic landscaping features like walls and pavers.',
      'Streamlined Unity-Web interaction, handling API calls and JSON parsing for seamless integration.',
      'Developed custom shaders for enhanced visual effects using Shader Graph.',
      'Focused on user-centric design to keep the tool intuitive, responsive, and easy to use for users with varying technical expertise.',
      'Implemented best practices in performance optimization, reducing load times and ensuring smooth interactions on different hardware configurations.',
      'Ensured the tool worked seamlessly across different web browsers and devices, optimizing performance for mobile and desktop platforms.',
      'Received the ‘Best Employee of the Quarter’ award for the first quarter of 2022.',
    ],
    leadership: [
      'Led the development team, delivering the project on time and exceeding client expectations.',
      'Conducted internal sessions on Unity features to foster team growth.',
      'Acted as the primary point of contact between the development team and the client, providing regular project updates, gathering feedback, and ensuring the client’s needs were met throughout development.',
    ],
  },
]

export const education = {
  degree: 'Bachelor of Technology in Computer Science and Engineering',
  school: 'College of Engineering Trivandrum',
  location: 'Thiruvananthapuram, India',
  period: 'Aug 2016 — Jul 2020',
  website: 'https://www.cet.ac.in/',
}
