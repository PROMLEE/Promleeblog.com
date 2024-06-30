import Image from "next/image";

interface ExprienceType {
  name: string;
  url?: { name: string; url: string; desc: string };
  thumbnail?: { url: string; width: number; height: number };
  date: string;
  contents: string[];
}

const expriences: ExprienceType[] = [
  {
    name: "UMC 5th, 6th",
    date: "2023.09.07 ~",
    url: {
      name: "UMC",
      url: "https://www.makeus.in/umc",
      desc: "앱&웹 서비스 런칭 대학생 IT 연합 동아리",
    },
    thumbnail: {
      url: "https://avatars.githubusercontent.com/u/165641158?s=200&v=4",
      width: 100,
      height: 100,
    },
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
    <div className="w-full">
      <h1>🎈 Experiences</h1>
      <hr />
      {expriences.map((exprience, idx) => (
        <div key={idx}>
          <h2>{exprience.name}</h2>
          <div className="flex flex-row gap-4">
            <div className="w-2/3">
              <b>{exprience.url?.desc}</b>
              <br />
              {exprience.url && (
                <a href={exprience.url.url} target="_blank" rel="noreferrer">
                  {exprience.url.name} 홈페이지 ↗
                </a>
              )}
              <p>{exprience.date}</p>
              {exprience.thumbnail && (
                <Image
                  src={exprience.thumbnail.url}
                  alt={exprience.name}
                  width={exprience.thumbnail.width}
                  height={exprience.thumbnail.height}
                  className="m-0 rounded-md"
                />
              )}
            </div>
            <ul className="m-0 w-2/3">
              {exprience.contents.map((content, idx) => (
                <li key={idx}>{content}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
