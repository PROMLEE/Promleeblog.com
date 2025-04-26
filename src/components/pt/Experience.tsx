import { FaBuilding, FaUserTie, FaCalendarAlt, FaUsers } from "react-icons/fa";

const highlight = (text: string) => {
  const regex =
    /(\d+\.?\d*%|\d+ms|\d+초|\d+명|\d+점|개선|최적화|런칭|유치|출품|성공|도입|도전|신규|성과|효율|안정성|성능|실사용자|데모데이|출시|최초|기록|달성)/g;
  let count = 0;
  return text.split(regex).map((part, i) => {
    if (i % 2 === 1 && count < 2) {
      count++;
      return (
        <span key={i} className="font-bold text-white">
          {part}
        </span>
      );
    }
    return part;
  });
};

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

export default function ExperiencePT() {
  return (
    <section className="flex w-full flex-col items-center py-10">
      <h2 className="animate-fadein mb-10 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-center text-3xl font-extrabold text-transparent md:text-4xl">
        경력
      </h2>
      <div className="animate-fadein2 flex w-full max-w-3xl flex-col gap-6 rounded-2xl bg-white/80 p-8 shadow-xl dark:bg-gray-900/80">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-gray-100">
            <FaUserTie color="#3b82f6" size={22} /> {experience.name}
          </div>
          <div className="flex items-center gap-2 text-lg font-bold text-gray-800 dark:text-gray-100">
            <FaBuilding color="#22c55e" size={22} /> {experience.company}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-200">
            <FaUsers color="#a21caf" size={20} /> {experience.department}
          </div>
          <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-200">
            <FaUserTie color="#ec4899" size={20} /> {experience.position}
          </div>
          <div className="flex items-center gap-2 text-base text-gray-700 dark:text-gray-200">
            <FaCalendarAlt color="#eab308" size={20} /> {experience.period}
          </div>
        </div>
        <ul className="mt-2 ml-6 list-disc space-y-2 text-base text-gray-700 dark:text-gray-200">
          {experience.desc.map((d, i) => (
            <li key={i}>{highlight(d)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
