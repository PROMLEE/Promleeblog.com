import Image from "next/image";

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
    name: "Instagram",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    href: "https://www.instagram.com/lee_dhoon99",
    user: "@lee_dhoon99",
  },
];

export const Contact = () => {
  return (
    <div className="w-1/2">
      <h2>Contact &amp; Channels</h2>
      <hr />
      <ul>
        {items.map((item, index) => (
          <li key={index} className="marker:text-background">
            <div className="flex flex-wrap gap-2">
              <strong className="w-20">{item.name}</strong> |
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                {item.src && (
                  <div className="relative h-5 w-5">
                    <Image
                      src={item.src}
                      alt={item.name}
                      fill
                      className="m-0"
                    />
                  </div>
                )}
                {item.user}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
