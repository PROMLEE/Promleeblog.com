interface SkillType {
  name: string;
  skills: string[];
}

const skills: SkillType[] = [
  {
    name: "Front-End",
    skills: ["React - js, ts", "Flutter - dart", "Kotlin"],
  },
  {
    name: "Back-End",
    skills: ["Flask", "DB - Firebase"],
  },
  {
    name: "DevOps",
    skills: ["AWS - EC2, Cloudfront, S3, Route53"],
  },
  {
    name: "Collaboration & Tools",
    skills: [
      "Git, Github, Slack, Notion",
      "IntelliJ, VS Code, Pycharm, Android Studio",
      "Figma",
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
            <div className="w-2/3">
              <ul className="m-0">
                {skill.skills.map((s, idx) => (
                  <li key={idx} className="m-0 marker:text-text">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <br />
          <br />
        </>
      ))}
    </div>
  );
};
