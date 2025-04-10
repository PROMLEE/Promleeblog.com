interface ContactProps {
  name: string;
  src?: string;
  href: string;
  user: string;
}

const items: ContactProps[] = [
  {
    name: "Email",
    href: "mailto:donghoon099@naver.com",
    user: "donghoon099@naver.com",
  },
  {
    name: "Github",
    src: "https://github.com/fluidicon.png",
    href: "https://github.com/PROMLEE",
    user: "PROMLEE",
  },
  {
    name: "Linkedin",
    src: "https://cdn-icons-png.flaticon.com/512/174/174857.png",
    href: "https://www.linkedin.com/in/%EB%8F%99%ED%9B%88-%EC%9D%B4-7778a5315",
    user: "이동훈",
  },
  {
    name: "Instagram",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    href: "https://www.instagram.com/lee_dhoon99",
    user: "@lee_dhoon99",
  },
];

export const Contact = () => {
  return (
    <div className="w-3/4 transform transition-all duration-500 hover:scale-[1.02] lg:w-3/5">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 p-6 shadow-lg dark:from-gray-800 dark:to-gray-900">
        <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-pink-100 opacity-20 dark:bg-pink-900"></div>
        <h2
          id="contact--channels"
          className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-white"
        >
          <span className="animate-bounce">📱</span>
          <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
            Contact & Channels
          </span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-pink-500 to-rose-500"></div>
        <ul className="mt-6 space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className="group relative overflow-hidden rounded-lg bg-white/50 p-4 transition-all duration-300 hover:bg-white/80 dark:bg-gray-800/50 dark:hover:bg-gray-800/80"
            >
              <div className="absolute -top-10 -right-10 h-20 w-20 rounded-full bg-pink-100/50 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-pink-900/30"></div>
              <div className="flex flex-wrap items-center gap-3">
                <strong className="min-w-[5rem] font-bold text-gray-700 dark:text-gray-300">
                  {item.name}
                </strong>
                <span className="text-gray-400">|</span>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-pink-600 transition-all duration-300 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
                >
                  {item.src && (
                    <img
                      src={item.src}
                      alt={item.name}
                      className="mt-0 mb-0 h-5 w-5 rounded-sm duration-300 group-hover:scale-110"
                    />
                  )}
                  <span className="transition-all duration-300 group-hover:translate-x-1">
                    {item.user}
                  </span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
