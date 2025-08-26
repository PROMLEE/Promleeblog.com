import { FaBriefcase } from "react-icons/fa";

const experiences = [
  {
    name: "이동훈",
    company: "현대오토에버",
    department: "Vaatz플랫폼팀",
    position: "백엔드 개발자",
    period: "2025.07 ~ 현재",
    desc: [
      "현대오토에버는 현대자동차그룹의 IT 솔루션 전문 기업으로, 자동차 산업의 디지털 혁신을 선도하고 있습니다.",
      "백엔드 개발자로서 Java/Spring Boot 기반의 엔터프라이즈 시스템 개발 및 운영을 담당하고 있습니다.",
      "주요 업무: MSA 아키텍처 설계 및 구축, RESTful API 개발, 데이터베이스 설계 및 최적화, 서비스 성능 개선",
      "현대자동차그룹의 다양한 비즈니스 요구사항을 분석하고, 안정적이고 확장 가능한 백엔드 시스템을 구축하여 서비스 품질 향상에 기여하고 있습니다.",
    ],
    techs: ["Java", "Spring Boot", "REST API", "Database", "DevOps"],
    note: "현대자동차그룹의 핵심 IT 시스템 개발에 참여하며 대규모 엔터프라이즈 환경에서의 백엔드 개발 경험을 쌓고 있습니다.",
  },
  {
    name: "이동훈",
    company: "(주) 블록웨이브랩스",
    department: "프로덕트팀",
    position: "팀원(인턴)",
    period: "2024.08 ~ 2025.05",
    desc: [
      "블록웨이브랩스는 블록체인 기술을 기반으로 다양한 Web3 서비스를 개발하는 스타트업입니다.",
      "2024년 9월부터 산학 협력 인턴으로 합류, 2025년 1월부터는 별도 인턴 계약으로 프로덕트 팀 소속 근무.",
      "주요 업무: Web3 프로덕트 개발, 블록체인 스마트 컨트랙트 작성, 운영 자동화 도구 개발 등 서비스의 기획부터 배포까지 폭넓은 실무 수행.",
      "React, Next.js, Flutter, Rust, Go 등 다양한 기술 스택을 활용하여 제품의 사용자 경험과 기능 안정성을 책임졌으며, 각 프로젝트에서 핵심 기능 구현을 주도적으로 수행.",
    ],
    techs: ["React", "Next.js", "Flutter", "Rust", "Go", "Web3", "Blockchain"],
    note: "8개월간의 인턴십을 통해 다양한 프레임워크와 언어를 사용하며 실무 경험을 쌓았습니다. 새로운 기술을 빠르게 습득하고 적용하는 능력을 기를 수 있었으며, 팀 내에서 주도적으로 기능을 개발하고 문제를 해결하는 역량을 키웠습니다.",
  },
];

const Experience = () => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
        Experience
      </h1>

      <div className="space-y-6">
        {experiences.map((experience, idx) => (
          <div
            key={idx}
            className="relative rounded-lg border bg-white/90 p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800/90"
          >
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
              <div className="max-h-3 rounded-full px-3 py-1 text-sm font-medium text-blue-700 sm:mt-0 dark:text-blue-200">
                {experience.period}
              </div>
            </div>

            <div className="space-y-3">
              {experience.desc.map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="mt-1 mr-2 text-sm text-blue-500">•</span>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {experience.techs.map((tech, techIdx) => (
                <span
                  key={techIdx}
                  className="rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 dark:bg-gray-700/50 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-5 rounded-md bg-blue-50/60 p-3 dark:bg-blue-900/20">
              <p className="text-xs text-gray-600 italic dark:text-gray-400">
                {experience.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
