export const CategoryKo: CategoryKoinfo = {
  Computer_Science: {
    name: "컴퓨터 공학(Computer Science)",
    sub: {
      Security: {
        name: "보안(Security)",
        title: {
          Concept: {
            name: "개념정리",
            content: {
              "1": {
                name: "암호화(Encryption)",
                date: "2024-04-24",
              },
              "2": {
                name: "대칭 암호화(Symmetric Encryption)",
                date: "2024-04-24",
              },
              "3": {
                name: "비대칭 암호화(Asymmetric Encryption)",
                date: "2024-04-24",
              },
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
              "1": {
                name: "TCP/IP",
                date: "",
              },
              "2": {
                name: "TCP/IP",
                date: "",
              },
              "3": {
                name: "TCP/IP",
                date: "",
              },
            },
          },
          Questions: {
            name: "문제해결",
            content: {
              "1": {
                name: "TCP/IP",
                date: "2024-04-22",
              },
              "2": {
                name: "Network",
                date: "2024-04-22",
              },
              "3": {
                name: "Network",
                date: "2024-04-22",
              },
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
              "1": {
                name: "Set Annotated(집합용어)",
                date: "2024-04-23",
              },
            },
          },
        },
      },
      // Calculus: "미적분학(Calculus)",
      // Linear_Algebra: "선형대수학(Linear Algebra)",
      // Statistics: "통계학(Statistics)",
    },
  },
  // Framework: {
  //   name: "프레임워크(Framework)",
  //   sub: {
  //     Next_js: {
  //       name: "Next.js",
  //       title: {
  //         Blog: {
  //           name: "블로그 개발기",
  //           content: {
  //             "1": "Next.js Blog",
  //           },
  //         },
  //         Problem_solve: {
  //           name: "문제해결",
  //           content: {
  //             "1": "Next.js Error",
  //           },
  //         },
  //       },
  //     },
  //     // React: "리액트(React)",
  //     // Vue: "뷰(Vue)",
  //     // Spring: "스프링(Spring)",
  //   },
  // },
  Test: {
    name: "테스트(Test)",
    sub: {
      Test: {
        name: "테스트(Test)",
        title: {
          Test: {
            name: "테스트(Test)",
            content: {
              "1": {
                name: "테스트(Test)",
                date: "1999-10-02",
              },
            },
          },
        },
      },
    },
  },
};

interface CategoryKoinfo {
  [key: string]: {
    name: string;
    sub: {
      [key: string]: {
        name: string;
        title: {
          [key: string]: {
            name: string;
            content: {
              [key: string]: {
                name: string;
                date: string;
              };
            };
          };
        };
      };
    };
  };
}
