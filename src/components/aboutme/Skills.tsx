interface SkillType {
  name: string;
  skills: { name: string; bg: string; logo: string; logocolor: string }[];
}

const skills: SkillType[] = [
  {
    name: "Front-End",
    skills: [
      { name: "React", bg: "20232A", logo: "react", logocolor: "61DAFB" },
      { name: "Next.js", bg: "000000", logo: "nextdotjs", logocolor: "white" },
      { name: "Flutter", bg: "02569B", logo: "flutter", logocolor: "white" },
    ],
  },
  {
    name: "Back-End",
    skills: [
      { name: "Flask", bg: "000000", logo: "flask", logocolor: "white" },
      {
        name: "Spring Boot",
        bg: "6DB33F",
        logo: "springboot",
        logocolor: "white",
      },
      { name: "Firebase", bg: "FFCA28", logo: "firebase", logocolor: "black" },
      { name: "Supabase", bg: "3FCF8E", logo: "supabase", logocolor: "white" },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { name: "EC2", bg: "FF9900", logo: "amazonec2", logocolor: "white" },
      { name: "Cloudfront", bg: "8C4FFF", logo: "amazon", logocolor: "white" },
      { name: "S3", bg: "569A31", logo: "amazons3", logocolor: "white" },
      {
        name: "Route53",
        bg: "8C4FFF",
        logo: "amazonroute53",
        logocolor: "white",
      },
    ],
  },
  {
    name: "Collaboration & Tools",
    skills: [
      { name: "Git", bg: "F05032", logo: "git", logocolor: "white" },
      { name: "Github", bg: "181717", logo: "github", logocolor: "white" },
      { name: "Slack", bg: "4A154B", logo: "slack", logocolor: "white" },
      { name: "Notion", bg: "000000", logo: "notion", logocolor: "white" },
      { name: "Figma", bg: "F24E1E", logo: "figma", logocolor: "white" },
    ],
  },
];

export const Skills = () => {
  return (
    <div className="w-full transform transition-all duration-500 hover:scale-[1.02]">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-50 to-indigo-50 p-8 shadow-lg dark:from-gray-800 dark:to-gray-900">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-purple-100 opacity-20 dark:bg-purple-900"></div>
        <h1
          id="skills"
          className="mb-6 flex items-center gap-3 text-3xl font-bold text-gray-800 dark:text-white"
        >
          <span className="animate-spin-slow">🛠</span>
          <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Skills
          </span>
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
        <div className="mt-8 flex flex-col gap-12">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col gap-4 rounded-lg bg-white/50 p-6 transition-all duration-300 hover:bg-white/80 md:flex-row md:items-center dark:bg-gray-800/50 dark:hover:bg-gray-800/80"
            >
              <div className="w-full text-xl font-bold text-gray-700 md:w-1/3 dark:text-gray-200">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                  {skill.name}
                </div>
              </div>
              <div className="m-0 flex w-full flex-wrap gap-3 md:w-2/3">
                {skill.skills.map((s, idx) => (
                  <div
                    key={idx}
                    className="transform transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  >
                    <img
                      src={`https://img.shields.io/badge/${s.name}-${s.bg}?style=for-the-badge&logo=${s.logo}&logoColor=${s.logocolor}`}
                      alt={s.name}
                      className="border-foreground/10 m-0 h-8 rounded-lg border"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};
