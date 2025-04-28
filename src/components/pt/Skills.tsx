import { FaReact, FaAws, FaGitAlt, FaFigma, FaJava } from "react-icons/fa";
import {
  SiFlutter,
  SiSpringboot,
  SiSlack,
  SiNotion,
  SiTypescript,
  SiGo,
  SiRust,
  SiDart,
  SiDocker,
  SiFlask,
  SiNodedotjs,
  SiGithub,
  SiPython,
} from "react-icons/si";

const skillCategories = [
  {
    name: "Programming Language",
    icon: (
      <span className="text-[#3178C6]">
        <SiTypescript size={28} />
      </span>
    ),
    skills: [
      {
        name: "Typescript",
        icon: (
          <span className="text-[#3178C6]">
            <SiTypescript size={22} />
          </span>
        ),
      },
      { name: "Java", icon: <FaJava size={22} style={{ color: "#E76F00" }} /> },
      {
        name: "Go",
        icon: (
          <span className="!text-[#00ADD8]">
            <SiGo size={22} />
          </span>
        ),
      },
      {
        name: "Rust",
        icon: (
          <span className="text-[#DEA584]">
            <SiRust size={22} />
          </span>
        ),
      },
      {
        name: "Dart",
        icon: (
          <span className="text-[#0175C2]">
            <SiDart size={22} />
          </span>
        ),
      },
      {
        name: "Python",
        icon: (
          <span className="text-[#3776AB]">
            <SiPython size={22} />
          </span>
        ),
      },
    ],
  },
  {
    name: "Framework / Library",
    icon: <FaReact size={28} style={{ color: "#61DAFB" }} />,
    skills: [
      {
        name: "Spring Boot",
        icon: (
          <span className="text-[#6DB33F]">
            <SiSpringboot size={22} />
          </span>
        ),
      },
      {
        name: "React / Next.js",
        icon: <FaReact size={22} style={{ color: "#61DAFB" }} />,
      },
      {
        name: "Node.js",
        icon: (
          <span className="text-[#339933]">
            <SiNodedotjs size={22} />
          </span>
        ),
      },
      {
        name: "Flask",
        icon: (
          <span className="rounded-full bg-white p-1 text-gray-800 shadow dark:bg-gray-800 dark:text-white">
            <SiFlask size={20} />
          </span>
        ),
      },
      {
        name: "Flutter",
        icon: (
          <span className="text-[#02569B]">
            <SiFlutter size={22} />
          </span>
        ),
      },
      {
        name: "React Native",
        icon: <FaReact size={22} style={{ color: "#61DAFB" }} />,
      },
    ],
  },
  {
    name: "Tooling / DevOps",
    icon: <FaAws size={28} style={{ color: "#FF9900" }} />,
    skills: [
      {
        name: "AWS (EC2, S3, CloudFront)",
        icon: <FaAws size={22} style={{ color: "#FF9900" }} />,
      },
      {
        name: "Docker",
        icon: (
          <span className="text-[#2496ED]">
            <SiDocker size={22} />
          </span>
        ),
      },
    ],
  },
  {
    name: "ETC",
    icon: <FaGitAlt size={28} style={{ color: "#F05032" }} />,
    skills: [
      {
        name: "Git/Github",
        icon: (
          <span className="rounded-full bg-white p-1 text-gray-800 shadow dark:bg-gray-800 dark:text-white">
            <SiGithub size={20} />
          </span>
        ),
      },
      {
        name: "Figma",
        icon: <FaFigma size={22} style={{ color: "#F24E1E" }} />,
      },
      {
        name: "Notion",
        icon: (
          <span className="rounded-full bg-white p-1 text-gray-800 shadow dark:bg-gray-800 dark:text-white">
            <SiNotion size={20} />
          </span>
        ),
      },
      {
        name: "Slack",
        icon: (
          <span className="text-[#611f69]">
            <SiSlack size={22} />
          </span>
        ),
      },
    ],
  },
];

export default function SkillsPT() {
  return (
    <section className="flex w-full flex-col items-center py-8">
      <h2 className="mb-8 text-2xl font-bold text-gray-800 md:text-3xl dark:text-gray-100">
        기술 스택 & 강점
      </h2>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2">
        {skillCategories.map((cat, idx) => (
          <div
            key={cat.name}
            className="group flex flex-col items-center gap-4 rounded-lg bg-white/90 p-6 shadow-md transition-all hover:shadow-lg dark:bg-gray-800/90"
            style={{ animationDelay: `${0.2 * idx}s` }}
          >
            <div className="flex items-center gap-2">
              <div>{cat.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {cat.name}
              </h3>
            </div>
            <div className="mt-2 flex w-full flex-wrap justify-center gap-3">
              {cat.skills.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700"
                >
                  {s.icon}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

