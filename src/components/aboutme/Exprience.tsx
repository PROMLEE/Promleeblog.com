import Image from "next/image";

interface ExprienceType {
  name: string;
  url?: { name: string; url: string; desc: string };
  thumbnail?: { url: string; width: number; height: number };
  date: string;
  id: string;
  contents: string[];
}

const expriences: ExprienceType[] = [
  {
    name: "UMC 5th, 6th",
    date: "2023.09.07 ~",
    url: {
      name: "UMC",
      url: "https://www.instagram.com/uni_makeus_challenge/",
      desc: "앱&웹 서비스 런칭 대학생 IT 연합 동아리",
    },
    thumbnail: {
      url: "https://avatars.githubusercontent.com/u/165641158?s=200&v=4",
      width: 100,
      height: 100,
    },
    id: "umc-5th-6th",
    contents: [
      "5기 Web 파트(React) 참여",
      "5기 Map: 2 Zero 프로젝트 런칭",
      "6기 중앙대학교 Web 파트 리더",
      "6기 Server 파트(Spring) 참여",
    ],
  },
];
export const Exprience = () => {
  return (
    <div className="w-full transform transition-all duration-500 hover:scale-[1.02]">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-teal-50 p-8 shadow-lg dark:from-gray-800 dark:to-gray-900">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-green-100 opacity-20 dark:bg-green-900"></div>
        <h1
          id="experience"
          className="mb-6 flex items-center gap-3 text-3xl font-bold text-gray-800 dark:text-white"
        >
          <span className="animate-float">🎈</span>
          <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            Experiences
          </span>
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-green-500 to-teal-500"></div>
        <div className="mt-8 flex flex-col gap-12">
          {expriences.map((exprience, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-lg bg-white/50 p-6 transition-all duration-300 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80"
            >
              <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-green-100/50 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-green-900/30"></div>
              <h2
                id={exprience.id}
                className="mb-4 text-2xl font-bold text-gray-800 dark:text-white"
              >
                {exprience.name}
              </h2>
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="w-full space-y-4 md:w-2/3">
                  {exprience.url?.desc && (
                    <div className="font-bold text-gray-700 dark:text-gray-300">
                      {exprience.url.desc}
                    </div>
                  )}
                  {exprience.url && (
                    <a
                      href={exprience.url.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-green-600 transition-all duration-300 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                    >
                      {exprience.url.name} 관련 페이지
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        ↗
                      </span>
                    </a>
                  )}
                  <div className="text-gray-600 dark:text-gray-400">
                    {exprience.date}
                  </div>
                  {exprience.thumbnail && (
                    <div className="relative overflow-hidden rounded-lg transition-transform duration-300 hover:scale-[1.02]">
                      <Image
                        src={exprience.thumbnail.url}
                        alt={exprience.name}
                        width={exprience.thumbnail.width}
                        height={exprience.thumbnail.height}
                        className="m-0"
                      />
                    </div>
                  )}
                </div>
                <ul className="m-0 w-full space-y-2 md:w-2/3">
                  {exprience.contents.map((content, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-gray-700 transition-all duration-300 hover:translate-x-2 dark:text-gray-300"
                    >
                      <span className="text-green-500">▹</span>
                      {content}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
