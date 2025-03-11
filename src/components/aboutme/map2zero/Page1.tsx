import React from "react";
import Image from "next/image";

interface SkillType {
  name: string;
  bg: string;
  logo: string;
  logocolor: string;
}
const skills: SkillType[] = [
  { name: "React", bg: "20232A", logo: "react", logocolor: "61DAFB" },
  { name: "Typescript", bg: "05122A", logo: "typescript", logocolor: "white" },
  { name: "S3", bg: "569A31", logo: "amazons3", logocolor: "white" },
  { name: "ROUTE53", bg: "8C4FFF", logo: "amazonroute53", logocolor: "white" },
  {
    name: "GitHub Actions",
    bg: "2088FF",
    logo: "githubactions",
    logocolor: "white",
  },
];
const tools: SkillType[] = [
  { name: "Git", bg: "F05032", logo: "git", logocolor: "white" },
  { name: "Github", bg: "181717", logo: "github", logocolor: "white" },
  { name: "Slack", bg: "4A154B", logo: "slack", logocolor: "white" },
  { name: "Notion", bg: "000000", logo: "notion", logocolor: "white" },
  { name: "Figma", bg: "F24E1E", logo: "figma", logocolor: "white" },
];
export const Page1 = () => {
  return (
    <div className="flex w-full flex-col">
      <h1>1. Intro</h1>
      <div className="flex gap-5">
        <div className="flex-1">
          <h3> Map 2 Zero는 지속가능한 삶을 위한 ESG 서비스 입니다.</h3>
          서울 내 다양한 지역에서 운영되고 있는{" "}
          <div className="text-underlined">제로 웨이스트 샵</div>의 위치와 리뷰,
          판매 제품 정보, 매장 이용 방법, 다양한 이벤트를 한눈에 확인할 수 있는
          플랫폼 입니다.
          <h4>Stack</h4>
          <div className="m-0 flex w-2/3 flex-wrap gap-2">
            {skills.map((s, idx) => (
              <div key={idx} className="m-0 mb-2 marker:text-text">
                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://img.shields.io/badge/${s.name}-${s.bg}?style=for-the-badge&logo=${s.logo}&logoColor=${s.logocolor}`}
                    alt="ho"
                    className="m-0 h-8 rounded-lg border border-foreground"
                  />
                }
              </div>
            ))}
          </div>
          <h4>Tools</h4>
          <div className="m-0 flex w-2/3 flex-wrap gap-2">
            {tools.map((s, idx) => (
              <div key={idx} className="m-0 mb-2 marker:text-text">
                {
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://img.shields.io/badge/${s.name}-${s.bg}?style=for-the-badge&logo=${s.logo}&logoColor=${s.logocolor}`}
                    alt="ho"
                    className="m-0 h-8 rounded-lg border border-foreground"
                  />
                }
              </div>
            ))}
          </div>
        </div>
        <Image
          src="https://cdn.promleeblog.com/etc/map2zero/1.png"
          alt="logo"
          width={300}
          height={100}
          className="flex-[0.5] rounded-lg"
        />
      </div>
    </div>
  );
};
