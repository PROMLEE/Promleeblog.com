import React from "react";
interface ExprienceType {
  name: string;
  url?: { name: string; url: string };
  date: string;
  contents: string[];
}

const educations: ExprienceType[] = [
  {
    name: "한국외국어대학교",
    date: "2018.03 ~ 2023.02",
    contents: ["컴퓨터공학 전공"],
  },
  {
    name: "중앙대학교",
    date: "2023.03 ~",
    contents: ["2023년도 편입학", "소프트웨어 전공"],
  },
];
export const Education = () => {
  return (
    <div className="w-full transform transition-all duration-500 hover:scale-[1.02]">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 p-8 shadow-lg dark:from-gray-800 dark:to-gray-900">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-orange-100 opacity-20 dark:bg-orange-900"></div>
        <h1
          id="education"
          className="mb-6 flex items-center gap-3 text-3xl font-bold text-gray-800 dark:text-white"
        >
          <span className="animate-pulse">🎓</span>
          <span className="bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
            Education
          </span>
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-yellow-500"></div>
        <div className="mt-8 flex flex-col gap-8">
          {educations.map((edu, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-lg bg-white/50 p-6 transition-all duration-300 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80"
            >
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-orange-100/50 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-orange-900/30"></div>
              <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                {edu.name}
              </h2>
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="w-full space-y-4 md:w-2/3">
                  {edu.url && (
                    <a
                      href={edu.url.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-orange-600 transition-all duration-300 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                    >
                      {edu.url.name} 홈페이지
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        ↗
                      </span>
                    </a>
                  )}
                  <div className="text-gray-600 dark:text-gray-400">
                    {edu.date}
                  </div>
                </div>
                <ul className="m-0 w-full space-y-2 md:w-2/3">
                  {edu.contents.map((content, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-700 transition-all duration-300 hover:translate-x-2 dark:text-gray-300"
                    >
                      <span className="text-orange-500">▹</span>
                      {content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
