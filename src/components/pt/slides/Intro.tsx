import Image from "next/image";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

const info = {
  name: "이동훈",
  position: "안녕하세요, 도전을 두려워 않는 개발자 이동훈입니다",
  birth: "1999.10.02",
  // phone: "010-2561-5813",
  email: "donghoon099@naver.com",
  address: "서울특별시 동작구",
  resume: "/download/resume.pdf",
  portfolio: "https://promleeblog.com",
  github: "https://github.com/PROMLEE",
  linkedin: "https://linkedin.com/in/동훈-이-7778a5315",
  keywords: ["도전", "풀스택", "UI/UX", "Web3", "백엔드"],
};

export default function IntroSlide() {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-8 select-none">
      <Image
        src="https://cdn.promleeblog.com/8.jpg"
        alt="profile_image"
        width={160}
        height={200}
        className="animate-fadein rounded-full border-4 border-blue-400 shadow-2xl"
      />
      <h1 className="animate-fadein bg-clip-text text-4xl font-extrabold text-white drop-shadow-lg md:text-5xl">
        {info.name}
      </h1>
      <h2 className="animate-fadein2 text-2xl font-bold text-gray-700 md:text-3xl dark:text-gray-200">
        {info.position}
      </h2>
      <div className="animate-fadein3 mt-2 flex flex-wrap gap-3">
        {info.keywords.map((k) => (
          <span
            key={k}
            className="rounded-full bg-blue-100 px-4 py-1 text-lg font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200"
          >
            #{k}
          </span>
        ))}
      </div>
      <div className="animate-fadein3-5 mt-4 text-center">
        <div className="mb-3 flex items-center justify-center gap-3">
          <Image
            src="https://opening-attachments.greetinghr.com/2025-02-02/22ee3d55-74fb-45d1-9a37-85702a3b686a/__.png"
            alt="현대오토에버 로고"
            width={100}
            height={40}
            className="object-contain"
          />
          <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            현재{" "}
            <span
              className="cursor-pointer font-bold text-blue-600 dark:text-blue-400"
              onClick={() =>
                window.open("https://www.hyundai-autoever.com/", "_blank")
              }
            >
              현대오토에버
            </span>
            에서
          </p>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-200">
          백엔드 개발자로 근무 중입니다
        </p>
      </div>
      {/* <div className="animate-fadein4 mt-4 flex flex-col items-center gap-4 md:flex-row">
        <a
          href={info.resume}
          download
          className="rounded-xl bg-gradient-to-r from-blue-500 to-pink-500 px-7 py-3 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:from-pink-500 hover:to-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          이력서 다운로드
        </a>
      </div> */}
      <div className="animate-fadein5 mt-4 flex flex-col items-center gap-4 text-gray-700 md:flex-row dark:text-gray-200">
        <div className="flex items-center gap-2">
          <FaEnvelope color="#3b82f6" /> {info.email}
        </div>
        {/* <div className="flex items-center gap-2">
          <FaPhone color="#22c55e" /> {info.phone}
        </div> */}
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt color="#f59e42" /> {info.address}
        </div>
      </div>
      <div className="animate-fadein6 mt-6 flex gap-6">
        <a
          href={info.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Github"
          className="group"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow ring-2 ring-gray-200 transition-all group-hover:ring-blue-500 dark:bg-gray-800 dark:ring-gray-700">
            <FaGithub
              size={28}
              className="text-[#181717] group-hover:text-blue-500 dark:text-white"
            />
          </span>
        </a>
        <a
          href={info.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="group"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow ring-2 ring-gray-200 transition-all group-hover:ring-blue-500 dark:bg-gray-800 dark:ring-gray-700">
            <FaLinkedin
              size={28}
              className="text-[#0a66c2] group-hover:text-blue-500"
            />
          </span>
        </a>
        <a
          href={info.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfolio"
          className="group"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow ring-2 ring-gray-200 transition-all group-hover:ring-blue-500 dark:bg-gray-800 dark:ring-gray-700">
            <FaGlobe
              size={28}
              className="text-[#6366f1] group-hover:text-blue-500"
            />
          </span>
        </a>
      </div>
    </section>
  );
}
