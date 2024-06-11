import Image from "next/image";

interface ProjectType {
  name: string;
  url: string;
  date: string;
  contents: string[];
  myrole: string[];
}

const projects: ProjectType[] = [
  {
    name: "Wear_os Watchface",
    url: "https://github.com/PROMLEE/Wear_Os_WatchFace",
    date: "2022.05 ~ 2022.12",
    contents: [
      "Wear Os 기반의 안드로이드 웨어러블 기기의 배경화면 커스텀 제작",
    ],
    myrole: [
      "시계 화면의 모양과 동작을 구성하는 XML 형식 파악",
      "androidx.wear.watchface 라이브러리 사용",
      "원하는 배경, 원하는 시계바늘, 워하는 기능 지원하는 컴플리케이션 8개 지원",
    ],
  },
  {
    name: "Indoor Map",
    url: "https://github.com/PROMLEE/Indoor_map",
    date: "2023.09.01 ~ 2023.12.15",
    contents: [
      "도면(안내도) 기반 image segmentation 기술을 이용한 실내 길 찾기 지원 플랫폼 제작 Team Project",
    ],
    myrole: [
      "딥 러닝 모델 생성 및 이미지 처리",
      "Flask API 제작 및 배포",
      "React 기반 부가기능 웹페이지 제작",
    ],
  },
  {
    name: "Map: 2 Zero",
    url: "https://github.com/PROMLEE/map2zero-frontend",
    date: "2024.01.05 ~ 2024.02.25",
    contents: ["지속가능한 삶을 위한 ESG 서비스 Map:Zero(맵투제로)"],
    myrole: [
      "네이버 지도 연결 및 매장 데이터 연동",
      "소셜 로그인 구현",
      "점주의 매장 제품 등록 및 관리 폼 제작",
    ],
  },
];

export const Projects = () => {
  return (
    <div className="w-full">
      <h1>💻 Contribute to</h1>
      <hr />
      {projects.map((project, index) => {
        return (
          <div key={index}>
            <h2>{project.name}</h2>
            <div className="flex flex-row gap-4">
              <div className="w-2/3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1"
                >
                  <div className="relative h-5 w-5">
                    <Image
                      src="https://github.com/fluidicon.png"
                      alt="git"
                      fill
                      className="m-0"
                    />
                  </div>
                  {project.name}
                </a>
                <p>{project.date}</p>
              </div>
              <div className="w-2/3">
                <ul className="m-0">
                  <li>
                    Contents
                    <ul>
                      {project.contents.map((content, index) => {
                        return <li key={index}>{content}</li>;
                      })}
                    </ul>
                  </li>
                  <li>
                    My Role
                    <ul>
                      {project.myrole.map((role, index) => {
                        return <li key={index}>{role}</li>;
                      })}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
