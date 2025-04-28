import { FaBriefcase } from "react-icons/fa";

const experience = {
  name: "이동훈",
  company: "(주) 블록웨이브랩스",
  department: "프로덕트팀",
  position: "팀원(인턴)",
  period: "2024.08.26 ~ 현재",
  desc: [
    "블록웨이브랩스는 블록체인 기술을 기반으로 다양한 Web3 서비스를 개발하는 스타트업입니다.",
    "2024년 9월부터 산학 협력 인턴으로 합류, 2025년 1월부터는 별도 인턴 계약으로 프로덕트 팀 소속 근무 중.",
    "주요 업무: Web3 프로덕트 개발, 블록체인 스마트 컨트랙트 작성, 운영 자동화 도구 개발 등 서비스의 기획부터 배포까지 폭넓은 실무 수행.",
    "React, Next.js, Flutter, Rust, Go 등 다양한 기술 스택을 활용하여 제품의 사용자 경험과 기능 안정성을 책임졌으며, 각 프로젝트에서 핵심 기능 구현을 주도적으로 수행.",
  ],
};

const Experience = () => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
        직무 경험
      </h1>

      <div className="relative rounded-lg border bg-white/90 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/90">
        <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white shadow-md">
          <FaBriefcase size={16} />
        </div>

        <div className="mb-5 flex flex-col justify-between border-b border-gray-200 pb-4 sm:flex-row dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {experience.company}
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300">
              {experience.department} {experience.position}
            </p>
          </div>
          <div className="mt-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 sm:mt-0 dark:bg-blue-900/30 dark:text-blue-200">
            {experience.period}
          </div>
        </div>

        <div className="space-y-3">
          {experience.desc.map((item, index) => (
            <div key={index} className="flex items-start">
              <span className="mt-1 mr-2 text-sm text-blue-500">•</span>
              <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "React",
            "Next.js",
            "Flutter",
            "Rust",
            "Go",
            "Web3",
            "Blockchain",
          ].map((tech, idx) => (
            <span
              key={idx}
              className="rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700/50 dark:text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 rounded-md bg-blue-50/60 p-3 dark:bg-blue-900/20">
          <p className="text-xs text-gray-600 italic dark:text-gray-400">
            8개월간의 인턴십을 통해 다양한 프레임워크와 언어를 사용하며 실무
            경험을 쌓았습니다. 새로운 기술을 빠르게 습득하고 적용하는 능력을
            기를 수 있었으며, 팀 내에서 주도적으로 기능을 개발하고 문제를
            해결하는 역량을 키웠습니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
