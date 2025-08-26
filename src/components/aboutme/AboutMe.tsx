export const AboutMe = () => {
  return (
    <div className="w-full transform transition-all duration-500 hover:scale-[1.02]">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-8 shadow-lg dark:from-gray-800 dark:to-gray-900">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-100 opacity-20 dark:bg-blue-900"></div>
        <h1
          id="about-me"
          className="mb-6 flex items-center gap-3 text-3xl font-bold text-gray-800 dark:text-white"
        >
          <span className="animate-bounce">👦</span>
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            About Me
          </span>
        </h1>
        <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
        <ul className="mt-6 space-y-4 text-lg">
          <li className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2">
            <span className="text-blue-500">▹</span>
            안녕하세요,{" "}
            <strong className="font-bold text-blue-600 dark:text-blue-400">
              도전을 두려워 않는 개발자
            </strong>{" "}
            이동훈입니다.
          </li>
          <li className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2">
            <span className="text-blue-500">▹</span>
            현재{" "}
            <strong className="font-bold text-blue-600 dark:text-blue-400">
              현대오토에버
            </strong>
            에서 백엔드 개발자로 근무하고 있습니다.
          </li>
          <li className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2">
            <span className="text-blue-500">▹</span>
            풀스택 개발을 꿈꾸고 있습니다.
          </li>
          <li className="flex items-center gap-2 transition-all duration-300 hover:translate-x-2">
            <span className="text-blue-500">▹</span>
            클라우드 컴퓨팅과 보안에 관심이 있습니다.
          </li>
        </ul>
      </div>
    </div>
  );
};
