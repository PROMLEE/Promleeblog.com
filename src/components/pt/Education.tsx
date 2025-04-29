import { FaUserCheck, FaLightbulb, FaComments } from "react-icons/fa";

const aboutme = [
  {
    icon: <FaUserCheck color="#3b82f6" size={22} />,
    title: "저는 무엇을 잘하나요?",
    desc: [
      "TypeScript 기반 Node.js 환경 위에서 작동되는 프론트엔드, 백엔드 개발에 집중하고 있습니다.",
      "다른 분야들도 경험해보고 싶다는 희망도 가지고 있습니다.",
    ],
  },
  {
    icon: <FaLightbulb color="#f59e42" size={22} />,
    title: "프로젝트를 통해",
    desc: [
      "혼자서 프로젝트를 처음부터 끝까지 주도하는 경험,",
      "팀원들과 소통하고 협력하며 서비스를 완성하는 경험을 모두 갖추었습니다.",
    ],
  },
  {
    icon: <FaComments color="#fbbf24" size={22} />,
    title: "개발 철학",
    desc: [
      '항상 "사용자 관점에서 이 기능이 필요한가?",',
      '"서비스가 지속 가능할까?"를 고민하며 완성도를 높이려 노력합니다.',
    ],
  },
];

export default function AboutMePT() {
  return (
    <section className="flex w-full flex-col items-center py-10">
      <h2 className="animate-fadein mb-10 bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-center text-3xl font-extrabold text-transparent md:text-4xl">
        자기소개 & 회고
      </h2>
      <div className="grid w-full max-w-6xl grid-cols-1 gap-8">
        {aboutme.map((item, idx) => (
          <div
            key={item.title}
            className="group animate-fadein2 flex flex-col gap-4 rounded-2xl bg-white/80 p-8 shadow-xl transition-transform hover:scale-105 dark:bg-gray-900/80"
            style={{ animationDelay: `${0.2 * idx}s` }}
          >
            <div className="mb-2 flex items-center gap-3">
              {item.icon}
              <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {item.title}
              </span>
            </div>
            <ul className="ml-6 list-disc space-y-1 text-base text-gray-700 dark:text-gray-200">
              {item.desc.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
