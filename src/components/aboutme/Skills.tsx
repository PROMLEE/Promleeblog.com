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
      {
        name: "Firebase",
        bg: "FFCA28",
        logo: "firebase",
        logocolor: "black",
      },
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
      {
        name: "VS Code",
        bg: "007ACC",
        logo: "visualstudiocode",
        logocolor: "white",
      },
      {
        name: "IntelliJ",
        bg: "000000",
        logo: "intellijidea",
        logocolor: "white",
      },
      { name: "Pycharm", bg: "000000", logo: "pycharm", logocolor: "white" },
      {
        name: "Android Studio",
        bg: "3DDC84",
        logo: "androidstudio",
        logocolor: "white",
      },
      { name: "Figma", bg: "F24E1E", logo: "figma", logocolor: "white" },
    ],
  },
];

export const Skills = () => {
  return (
    <div className="w-full">
      <h1>🛠 Skills</h1>
      <hr />
      {skills.map((skill, idx) => (
        <>
          <div key={idx} className="flex">
            <div className="w-2/3 text-xl font-bold">{skill.name}</div>
            <div className="m-0 flex w-2/3 flex-wrap gap-2">
              {skill.skills.map((s, idx) => (
                <div key={idx} className="m-0 mb-2 marker:text-text">
                  <img
                    src={`https://img.shields.io/badge/${s.name}-${s.bg}?style=for-the-badge&logo=${s.logo}&logoColor=${s.logocolor}`}
                    alt="ho"
                    className="m-0 h-8 rounded-lg border border-foreground"
                  />
                </div>
              ))}
            </div>
          </div>
          <br />
          <br />
        </>
      ))}
    </div>
  );
};
