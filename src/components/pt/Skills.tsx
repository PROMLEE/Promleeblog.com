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
        <SiTypescript size={36} />
      </span>
    ),
    skills: [
      {
        name: "Typescript",
        icon: (
          <span className="text-[#3178C6]">
            <SiTypescript size={28} />
          </span>
        ),
      },
      { name: "Java", icon: <FaJava size={28} style={{ color: "#E76F00" }} /> },
      {
        name: "Go",
        icon: (
          <span className="!text-[#00ADD8]">
            <SiGo size={28} />
          </span>
        ),
      },
      {
        name: "Rust",
        icon: (
          <span className="text-[#DEA584]">
            <SiRust size={28} />
          </span>
        ),
      },
      {
        name: "Dart",
        icon: (
          <span className="text-[#0175C2]">
            <SiDart size={28} />
          </span>
        ),
      },
      {
        name: "Python",
        icon: (
          <span className="text-[#3776AB]">
            <SiPython size={28} />
          </span>
        ),
      },
    ],
  },
  {
    name: "Framework / Library",
    icon: <FaReact size={36} style={{ color: "#61DAFB" }} />,
    skills: [
      {
        name: "Spring Boot",
        icon: (
          <span className="text-[#6DB33F]">
            <SiSpringboot size={28} />
          </span>
        ),
      },
      {
        name: "React / Next.js",
        icon: <FaReact size={28} style={{ color: "#61DAFB" }} />,
      },
      {
        name: "Node.js",
        icon: (
          <span className="text-[#339933]">
            <SiNodedotjs size={28} />
          </span>
        ),
      },
      {
        name: "Flask",
        icon: (
          <span className="rounded-full bg-white p-1 text-gray-800 shadow dark:bg-gray-800 dark:text-white">
            <SiFlask size={24} />
          </span>
        ),
      },
      {
        name: "Flutter",
        icon: (
          <span className="text-[#02569B]">
            <SiFlutter size={28} />
          </span>
        ),
      },
      {
        name: "React Native",
        icon: <FaReact size={28} style={{ color: "#61DAFB" }} />,
      },
    ],
  },
  {
    name: "Tooling / DevOps",
    icon: <FaAws size={36} style={{ color: "#FF9900" }} />,
    skills: [
      {
        name: "AWS (EC2, S3, CloudFront)",
        icon: <FaAws size={28} style={{ color: "#FF9900" }} />,
      },
      {
        name: "Docker",
        icon: (
          <span className="text-[#2496ED]">
            <SiDocker size={28} />
          </span>
        ),
      },
    ],
  },
  {
    name: "ETC",
    icon: <FaGitAlt size={36} style={{ color: "#F05032" }} />,
    skills: [
      {
        name: "Git/Github",
        icon: (
          <span className="rounded-full bg-white p-1 text-gray-800 shadow dark:bg-gray-800 dark:text-white">
            <SiGithub size={24} />
          </span>
        ),
      },
      {
        name: "Figma",
        icon: <FaFigma size={28} style={{ color: "#F24E1E" }} />,
      },
      {
        name: "Notion",
        icon: (
          <span className="rounded-full bg-white p-1 text-gray-800 shadow dark:bg-gray-800 dark:text-white">
            <SiNotion size={24} />
          </span>
        ),
      },
      {
        name: "Slack",
        icon: (
          <span className="text-[#611f69]">
            <SiSlack size={28} />
          </span>
        ),
      },
    ],
  },
];

export default function SkillsPT() {
  return (
    <section className="flex w-full flex-col items-center py-10">
      <h2 className="animate-fadein mb-10 text-3xl font-extrabold text-gray-800 md:text-4xl dark:text-gray-100">
        기술 스택 & 강점
      </h2>
      <div className="grid w-full max-w-7xl grid-cols-1 gap-12 md:grid-cols-2">
        {skillCategories.map((cat, idx) => (
          <div
            key={cat.name}
            className="group animate-fadein2 flex flex-col items-center gap-8 rounded-2xl bg-white/80 p-10 shadow-xl transition-transform hover:scale-105 dark:bg-gray-900/80"
            style={{ animationDelay: `${0.2 * idx}s` }}
          >
            <div className="mb-2">{cat.icon}</div>
            <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
              {cat.name}
            </h3>
            <div className="mt-2 flex w-full flex-wrap justify-center gap-5">
              {cat.skills.map((s) => (
                <div
                  key={s.name}
                  className="flex flex-col items-center gap-1 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 px-4 py-3 shadow-md transition-transform hover:scale-110 dark:from-gray-800 dark:to-gray-900"
                >
                  {s.icon}
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-200">
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
