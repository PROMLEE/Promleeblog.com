interface ProjectType {
  name: string;
  url: string;
  date: string;
  contents: string;
  role: string;
}

export const Projects = () => {
  return (
    <div className="w-full">
      <h1>💻 Projects</h1>
      <hr />
      <div>
        <div>
          <h2>Wear_os Watchface</h2>
          <p>
            <a href="https://github.com/PROMLEE/Wear_Os_WatchFace">
              Github: Wear_Os_WatchFace
            </a>
          </p>
          <figure>
            <div>
              <a href="%E1%84%8B%E1%85%B5%E1%84%83%E1%85%A9%E1%86%BC%E1%84%92%E1%85%AE%E1%86%AB%20%E1%84%83%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%E1%84%8B%E1%85%B3%E1%86%AF%20%E1%84%83%E1%85%AE%E1%84%85%E1%85%A7%E1%84%8B%E1%85%AF%20%E1%84%8B%E1%85%A1%E1%86%AD%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF%E1%84%8C%E1%85%A1%20e75fdfd6aa4d404984e135918e59f0df/%25EC%259B%258C%25EC%25B9%2598%25ED%258E%2598%25EC%259D%25B4%25EC%258A%25A4_%25EA%25B0%259C%25EB%25B0%259C.pdf">
                워치페이스 개발.pdf
              </a>
            </div>
          </figure>
          <p>2022.05 ~ 2022.12</p>
          <p></p>
        </div>
        <div>
          <ul>
            <li>
              Contents
              <ul>
                <li>
                  Wear Os 기반의 안드로이드 웨어러블 기기의 배경화면 커스텀 제작
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              My Role
              <ul>
                <li>시계 화면의 모양과 동작을 구성하는 XML 형식 파악</li>
              </ul>
              <ul>
                <li>androidx.wear.watchface 라이브러리 사용</li>
              </ul>
              <ul>
                <li>
                  원하는 배경, 원하는 시계바늘, 워하는 기능 지원하는
                  컴플리케이션 8개 지원
                </li>
              </ul>
              <p></p>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div>
          <h2>Indoor Map</h2>
          <p>
            <a href="https://github.com/PROMLEE/Indoor_map">
              Github: Indoor_map
            </a>
          </p>
          <figure>
            <div>final_report</div>
          </figure>
          <figure>
            <div>Manual_report</div>
          </figure>
          <p>2023.09.01 ~ 2023.12.15</p>
          <ul>
            <li>
              Contents
              <ul>
                <li>
                  도면(안내도) 기반 image segmentation 기술을 이용한 실내 길
                  찾기 지원 플랫폼 제작 Team Project
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              My Role
              <ul>
                <li>딥 러닝 모델 생성 및 이미지 처리</li>
                <li>Flask API 제작 및 배포</li>
                <li>React 기반 부가기능 웹페이지 제작</li>
              </ul>
            </li>
          </ul>
          <h2>Map: 2 Zero</h2>
          <a href="https://github.com/team-ecolink/map2zero-frontend?tab=readme-ov-file#readme-top">
            Github: Map: 2 Zero
          </a>
          <p>2024.01.05 ~ 2024.02.25</p>
        </div>
        <div>
          <ul>
            <li>
              Contents
              <ul>
                <li>지속가능한 삶을 위한 ESG 서비스 Map:Zero(맵투제로)</li>
              </ul>
              <ul>
                <li>
                  메인 기능
                  <ul>
                    <li>
                      서울시의 제로 웨이스트 샵 위치 조회하기(스마트 서울맵 API
                      기반)
                    </li>
                    <li>매장 제품 등록 및 관리</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              My Role
              <ul>
                <li>네이버 지도 연결 및 매장 데이터 연동</li>
                <li>소셜 로그인 구현</li>
                <li>점주의 매장 제품 등록 및 관리 폼 제작</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
