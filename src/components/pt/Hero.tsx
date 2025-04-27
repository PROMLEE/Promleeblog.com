import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  {
    name: "Email",
    icon: <FaEnvelope size={28} />, // react-icons
    href: "mailto:donghoon099@naver.com",
  },
  {
    name: "Github",
    icon: <FaGithub size={28} />, // react-icons
    href: "https://github.com/PROMLEE",
  },
  {
    name: "Linkedin",
    icon: <FaLinkedin size={28} />,
    href: "https://www.linkedin.com/in/%EB%8F%99%ED%9B%88-%EC%9D%B4-7778a5315",
  },
  {
    name: "Instagram",
    icon: <FaInstagram size={28} />,
    href: "https://www.instagram.com/lee_dhoon99",
  },
];

const pdfs = [
  { name: "이력서(국문)", file: "/download/resume.pdf" },
  { name: "이력서(영문)", file: "/download/full.pdf" },
  { name: "포트폴리오", file: "/download/jjiggo.pdf" },
];

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center gap-8 px-4 py-16 md:px-0 md:py-24">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 opacity-60 blur-2xl dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="flex flex-col items-center gap-6">
        <Image
          src="https://cdn.promleeblog.com/profile.jpeg"
          alt="profile_image"
          width={160}
          height={200}
          className="animate-fadein rounded-full border-4 border-blue-400 shadow-2xl"
        />
        <h1 className="animate-fadein bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-4xl font-extrabold text-transparent drop-shadow-lg md:text-5xl">
          이동훈
        </h1>
        <h2 className="animate-fadein2 text-2xl font-bold text-gray-700 md:text-3xl dark:text-gray-200">
          프론트엔드 개발자 | 풀스택 지향 | UI/UX & 클라우드 러버
        </h2>
        <div className="animate-fadein3 mt-2 flex flex-wrap gap-3">
          <span className="rounded-full bg-blue-100 px-4 py-1 text-lg font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200">
            #도전
          </span>
          <span className="rounded-full bg-purple-100 px-4 py-1 text-lg font-semibold text-purple-700 dark:bg-purple-900 dark:text-purple-200">
            #풀스택
          </span>
          <span className="rounded-full bg-pink-100 px-4 py-1 text-lg font-semibold text-pink-700 dark:bg-pink-900 dark:text-pink-200">
            #UI/UX
          </span>
          <span className="rounded-full bg-yellow-100 px-4 py-1 text-lg font-semibold text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200">
            #클라우드
          </span>
        </div>
        <div className="animate-fadein4 mt-6 flex flex-wrap gap-4">
          {pdfs.map((pdf) => (
            <a
              key={pdf.file}
              href={pdf.file}
              download
              className="rounded-xl bg-gradient-to-r from-blue-500 to-pink-500 px-7 py-3 text-lg font-bold text-white shadow-lg transition-transform hover:scale-105 hover:from-pink-500 hover:to-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              {pdf.name} 다운로드
            </a>
          ))}
        </div>
        <div className="animate-fadein5 mt-8 flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/80 p-3 shadow-md transition-all hover:bg-gradient-to-r hover:from-blue-200 hover:to-pink-200 dark:bg-gray-800/80 dark:hover:from-blue-900 dark:hover:to-pink-900"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadein {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadein {
          animation: fadein 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadein2 {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadein2 {
          animation: fadein2 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadein3 {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadein3 {
          animation: fadein3 1.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadein4 {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadein4 {
          animation: fadein4 1.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        @keyframes fadein5 {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadein5 {
          animation: fadein5 2s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </section>
  );
}
