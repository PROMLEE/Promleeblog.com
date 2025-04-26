import { FaUniversity, FaCalendarAlt, FaBook } from "react-icons/fa";

const educations = [
  {
    school: "한국외국어대학교",
    major: "컴퓨터공학 전공",
    period: "2018.03 ~ 2023.02",
    desc: ["기초 컴퓨터공학 이론 및 소프트웨어 개발 역량 습득"],
  },
  {
    school: "중앙대학교",
    major: "소프트웨어 전공 (편입)",
    period: "2023.03 ~ 현재",
    desc: ["심화 소프트웨어 개발, 클라우드, AI, 보안 등 다양한 프로젝트 경험"],
  },
];

export default function EducationPT() {
  return (
    <section className="flex w-full flex-col items-center py-10">
      <h2 className="animate-fadein mb-10 bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-center text-3xl font-extrabold text-transparent md:text-4xl">
        학력
      </h2>
      <div className="grid w-full max-w-3xl grid-cols-1 gap-8">
        {educations.map((edu, idx) => (
          <div
            key={edu.school}
            className="group animate-fadein2 flex flex-col gap-4 rounded-2xl bg-white/80 p-8 shadow-xl transition-transform hover:scale-105 dark:bg-gray-900/80"
            style={{ animationDelay: `${0.2 * idx}s` }}
          >
            <div className="mb-2 flex items-center gap-3">
              <FaUniversity color="#f59e42" size={22} />
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {edu.school}
              </span>
            </div>
            <div className="mb-1 flex items-center gap-2 text-base text-gray-700 dark:text-gray-200">
              <FaBook color="#fbbf24" size={18} /> {edu.major}
            </div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FaCalendarAlt color="#facc15" size={16} /> {edu.period}
            </div>
            <ul className="ml-6 list-disc space-y-1 text-base text-gray-700 dark:text-gray-200">
              {edu.desc.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
