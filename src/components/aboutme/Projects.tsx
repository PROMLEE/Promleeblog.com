import Image from "next/image";

interface ProjectType {
  name: string;
  url: string;
  thumbnail?: { url: string; width: number; height: number };
  date: string;
  contents: string[];
  myrole: string[];
  mystack: string[];
}

const projects: ProjectType[] = [
  {
    name: "Wear_os Watchface",
    url: "https://github.com/PROMLEE/Wear_Os_WatchFace",
    date: "2022.05 ~ 2022.12",
    thumbnail: {
      url: "https://cdn.promleeblog.com/posts/etc/watchface/watchface-logo.png",
      width: 100,
      height: 100,
    },
    contents: [
      "Wear Os 기반의 안드로이드 웨어러블 기기의 배경화면 커스텀 제작",
    ],
    myrole: [
      "시계 화면의 모양과 동작을 구성하는 XML 형식 파악",
      "androidx.wear.watchface 라이브러리 사용",
      "원하는 배경, 원하는 시계바늘, 워하는 기능 지원하는 컴플리케이션 8개 지원",
    ],
    mystack: ["Kotlin", "Android Studio", "Wear Os"],
  },
  {
    name: "Indoor Map",
    url: "https://github.com/PROMLEE/Indoor_map",
    thumbnail: {
      url: "https://github.com/PROMLEE/Indoor_map/raw/main/Indoor_map_flutter/src/ic_launcher.png",
      width: 100,
      height: 100,
    },
    date: "2023.09.01 ~ 2023.12.15",
    contents: [
      "도면(안내도) 기반 image segmentation 기술을 이용한 실내 길 찾기 지원 플랫폼 제작 Team Project",
    ],
    myrole: [
      "딥 러닝 모델 생성 및 이미지 처리",
      "Flask API 제작 및 배포",
      "React 기반 부가기능 웹페이지 제작",
    ],
    mystack: ["Flutter", "Flask", "React", "OpenCV", "DeepLabV3+"],
  },
  {
    name: "Map: 2 Zero",
    url: "https://github.com/PROMLEE/map2zero-frontend",
    thumbnail: {
      url: "https://github.com/PROMLEE/map2zero-frontend/raw/main/image/logo.png",
      width: 100,
      height: 100,
    },
    date: "2024.01.05 ~ 2024.02.25",
    contents: ["지속가능한 삶을 위한 ESG 서비스 Map:Zero(맵투제로)"],
    myrole: [
      "네이버 지도 연결 및 매장 데이터 연동",
      "소셜 로그인 구현",
      "점주의 매장 제품 등록 및 관리 폼 제작",
    ],
    mystack: ["React", "Naver Map API"],
  },
  {
    name: "이슈역",
    url: "https://github.com/PROMLEE/Issue-Station",
    thumbnail: {
      url: "https://cdn.promleeblog.com/posts/etc/issue-station/issue-station-logo.png",
      width: 100,
      height: 30,
    },
    date: "2024.05.01 ~ 2024.06.10",
    contents: ["프로젝트 단위 이슈 관리 프로그램"],
    myrole: [
      "React 기반 프론트엔드 웹페이지 제작",
      "Spring Boot 기반 서버 API 제작(Project Management Part)",
      "AWS EC2 서버 배포 및 관리",
    ],
    mystack: ["React", "Spring Boot", "MySQL", "AWS EC2, RDS"],
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
                  className="flex w-60 items-center gap-1 hover:text-blue-400"
                >
                  <div className="relative h-5 w-5">
                    <Image
                      src="https://github.com/fluidicon.png"
                      alt="git"
                      fill
                      className="m-0"
                    />
                  </div>
                  {project.name} ↗
                </a>
                <p>{project.date}</p>
                {project.thumbnail && (
                  <Image
                    src={project.thumbnail.url}
                    alt={project.name}
                    width={project.thumbnail.width}
                    height={project.thumbnail.height}
                    className="m-0 rounded-md"
                  />
                )}
              </div>
              <div className="w-2/3">
                <ul className="m-0">
                  <li className="text-text-foreground marker:text-white">
                    Contents
                    <ul>
                      {project.contents.map((content, index) => {
                        return <li key={index}>{content}</li>;
                      })}
                    </ul>
                  </li>
                  <li className="text-text-foreground marker:text-white">
                    My Role
                    <ul>
                      {project.myrole.map((role, index) => {
                        return <li key={index}>{role}</li>;
                      })}
                    </ul>
                  </li>
                  <li className="text-text-foreground marker:text-white">
                    My Stack
                    <ul>
                      {project.mystack.map((stack, index) => {
                        return <li key={index}>{stack}</li>;
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
