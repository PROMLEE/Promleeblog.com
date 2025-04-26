import { JSX } from "react";
import { FaLink, FaGithub, FaAndroid } from "react-icons/fa";
import {
  SiNextdotjs,
  SiSupabase,
  SiPostgresql,
  SiAmazon,
  SiGithubactions,
  SiKotlin,
} from "react-icons/si";

const techIcons: Record<string, JSX.Element> = {
  "Next.js": <SiNextdotjs size={22} color="#000" className="dark:text-white" />,
  Supabase: <SiSupabase size={22} color="#3FCF8E" />,
  PostgreSQL: <SiPostgresql size={22} color="#336791" />,
  "AWS(S3, Cloudfront, Lambda)": <SiAmazon size={22} color="#FF9900" />,
  "Github Actions": <SiGithubactions size={22} color="#2088FF" />,
  Kotlin: <SiKotlin size={22} color="#7F52FF" />,
};

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

const projects = [
  {
    name: "Promleeblog.com (개인 블로그)",
    period: "2024.04.20 ~",
    iconUrl: "",
    tech: [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "AWS(S3, Cloudfront, Lambda)",
      "Github Actions",
    ],
    link: { url: "https://www.promleeblog.com", label: "서비스 바로가기" },
    github: {
      url: "https://github.com/PROMLEE/Promleeblog.com",
      label: "소스코드 보기",
    },
    desc: [
      "내가 쓰고 싶은 기술을 마음껏 사용해본 연습/실전용 블로그 사이트",
      "Supabase 데이터 캐싱, revalidate/mutate 등으로 유저 체감 속도 35% 개선, UX 이탈률 18% 감소",
      "CloudFront 이미지 캐싱 최적화, Lambda@Edge로 WebP 변환 및 LCP 1.4s→0.9s, 이미지 응답 1.2s→180ms",
      "Core Web Vitals(LCP, CLS 등) 최적화, SEO 100점, Performance 90점 이상 유지",
      "SSG/SSR/ISR 전략 혼합, 보안과 SEO 모두 확보, 3단 반응형 UI, 라이트/다크모드 지원",
      "하루 1000회 이상 구글 검색 노출, CTR 5%, 평균 300회 이상 조회수 기록",
    ],
  },
  {
    name: "Wear OS 워치페이스 개발",
    period: "2022.11.04 ~ 2023.06",
    iconUrl: "",
    tech: ["Kotlin"],
    github: {
      url: "https://github.com/PROMLEE/Wear_Os_WatchFace",
      label: "소스코드 보기",
    },
    desc: [
      "스마트워치 배경화면을 직접 제작, WatchFace API/ComplicationSlotsManager로 다양한 정보 표시",
      "CurrentUserStyleRepository로 사용자 커스터마이징 지원, Spotless/ktlint로 코드 품질 관리",
      "모듈화 구조로 유지보수성 향상, 3년째 직접 사용 중인 나만의 워치페이스",
      "외국 오픈소스 분석, 집념과 끈기로 완성, 어려움 속에서도 끝까지 해내는 자신감 획득",
    ],
  },
];

export default function PersonalProjectsSlide() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-10 select-none">
      <h2 className="animate-fadein mb-4 text-3xl font-extrabold text-gray-800 md:text-4xl dark:text-gray-100">
        개인 프로젝트
      </h2>
      <div className="animate-fadein2 flex w-full max-w-7xl flex-col gap-10">
        {projects.map((p, idx) => (
          <div
            key={p.name}
            className="flex min-h-[320px] w-full flex-col gap-8 rounded-2xl bg-white/80 p-10 shadow-2xl transition-transform hover:scale-[1.02] md:flex-row dark:bg-gray-900/80"
            style={{ animationDelay: `${0.2 * idx}s` }}
          >
            {/* 좌측: 프로젝트 정보 */}
            <div className="flex max-w-[420px] min-w-[320px] flex-1 flex-col justify-between gap-4">
              <div className="mb-2 flex items-center gap-3">
                {p.iconUrl && (
                  <img
                    src={p.iconUrl}
                    alt="project icon"
                    className="mr-2 h-10 w-10 rounded-lg object-cover"
                  />
                )}
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {p.name}
                </span>
              </div>
              <div className="mb-1 text-base text-gray-500 dark:text-gray-400">
                {p.period}
              </div>
              <div className="mb-2 flex flex-wrap gap-3">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1 rounded-full bg-blue-100 px-4 py-2 text-base font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {techIcons[t] ?? null}
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-2 flex flex-wrap gap-3">
                {p.link && (
                  <a
                    href={p.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 hover:text-pink-500 dark:text-blue-400 dark:hover:text-pink-500"
                  >
                    <FaLink />
                    <span className="text-sm whitespace-nowrap underline">
                      {p.link.label}
                    </span>
                  </a>
                )}
                {p.github && (
                  <a
                    href={p.github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-700 hover:text-pink-500 dark:text-gray-400 dark:hover:text-pink-500"
                  >
                    <FaGithub />
                    <span className="text-sm whitespace-nowrap underline">
                      {p.github.label}
                    </span>
                  </a>
                )}
                {p.name.includes("Wear OS") && (
                  <FaAndroid className="ml-1 text-green-500" />
                )}
              </div>
            </div>
            {/* 우측: 설명 */}
            <div className="flex flex-[2] flex-col justify-center">
              <ul className="ml-6 list-disc space-y-2 text-lg break-keep whitespace-pre-line text-gray-700 dark:text-gray-200">
                {p.desc.map((d, i) => (
                  <li key={i}>{highlight(d)}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
