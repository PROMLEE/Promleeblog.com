export const CategoryKo = {
  Computer_Science: {
    name: "컴퓨터 공학(Computer Science)",
    sub: {
      Security: {
        name: "보안(Security)",
        title: {
          Concept: {
            name: "개념정리",
            content: {
              "1": "Introduction(개요)",
              "2": "Symmetric Encryption(대칭키 암호화)",
              "3": "Asymmetric Encryption(비대칭키 암호화)",
            },
          },
        },
      },
      Network: {
        name: "네트워크(Network)",
        title: {
          Concept: {
            name: "개념정리",
            content: {
              // "1": "introduction(개요)",
              // "2": "OSI 7 Layer(7계층)",
              "3": "TCP/IP",
            },
          },
          Questions: {
            name: "문제해결",
            content: {
              "1": "OSI 7 Layer(7계층)",
              "2": "TCP/IP",
              "3": "IP Address(아이피 주소)",
            },
          },
        },
      },
      // Programming_Language: "프로그래밍 언어(Programming Language)",
      // Database: "데이터베이스(Database)",
      // Operating_System: "운영체제(Operating System)",
      // Algorithm: "알고리즘(Algorithm)",
      // Data_Structure: "자료구조(Data Structure)",
    },
  },
  Mathematics: {
    name: "수학(Mathematics)",
    sub: {
      Probability_and_Statistics: {
        name: "확률과 통계(Probability and Statistics)",
        title: {
          Concept: {
            name: "개념정리",
            content: {
              "1": "Set annotated(집합표기)",
            },
          },
        },
      },
      // Calculus: "미적분학(Calculus)",
      // Linear_Algebra: "선형대수학(Linear Algebra)",
      // Statistics: "통계학(Statistics)",
    },
  },
  Framework: {
    name: "프레임워크(Framework)",
    sub: {
      Next_js: {
        name: "Next.js",
        title: {
          Blog: "블로그 개발기",
          Problem_solve: "문제해결",
        },
      },
      // React: "리액트(React)",
      // Vue: "뷰(Vue)",
      // Spring: "스프링(Spring)",
    },
  },
  Test: {
    name: "테스트(Test)",
    sub: {
      Test: {
        name: "테스트(Test)",
        title: {
          Test: {
            name: "테스트(Test)",
            content: {
              "1": "Test",
            },
          },
        },
      },
    },
  },
};
