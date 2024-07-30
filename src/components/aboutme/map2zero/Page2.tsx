import React from "react";
import Image from "next/image";

const roles = [
  { role: "PM", count: 1 },
  { role: "디자이너", count: 2 },
  { role: "프론트엔드", count: 4 },
  { role: "백엔드", count: 4 },
];

export const Page2 = () => {
  return (
    <div className="flex w-full flex-col">
      <h1>2. Project Detail</h1>
      <div className="flex gap-5">
        <div className="flex-1">
          <div className="text-text-foreground">
            개발 기간📅: 2024.01.05 ~ 2024.02.25
            <br />
            <div className="text-text-foreground"></div>Github 🔗:{" "}
            <a href="https://github.com/PROMLEE/map2zero-frontend">
              map2zero-frontend
            </a>
          </div>
          <h2 className="mb-2">인원 구성</h2>
          <table>
            <tbody>
              {roles.map((role, idx) => (
                <tr key={idx}>
                  <th className="w-20 border border-third p-2">{role.role}</th>
                  <th className="w-20 border border-third p-2">
                    {role.count} 명
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4">
            프론트엔드와 백엔드 개발자, 디자이너, PM으로 구성된 팀으로
            진행되었으며 <div className="text-underlined">프론트엔드 팀장</div>
            으로 참여
            <br />
            Neordinary Demoday 출품 및 실 사용자 100여명 유치
          </div>
          <h2></h2>
        </div>
        <Image
          src="https://cdn.promleeblog.com/posts/etc/map2zero/12.png"
          alt="logo"
          width={300}
          height={250}
          className="flex-[0.3] rounded-lg"
        />
      </div>
    </div>
  );
};
