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
    <div className="w-full">
      <h1>🎓 Education</h1>
      <hr />
      {educations.map((edu, idx) => (
        <div key={idx}>
          <h2>{edu.name}</h2>
          <div className="flex flex-row gap-4">
            <div className="w-2/3">
              {edu.url && (
                <a href={edu.url.url} target="_blank" rel="noreferrer">
                  {edu.url.name} 홈페이지
                </a>
              )}
              <p>{edu.date}</p>
            </div>
            <ul className="m-0 w-2/3">
              {edu.contents.map((content, idx) => (
                <li key={idx}>{content}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
