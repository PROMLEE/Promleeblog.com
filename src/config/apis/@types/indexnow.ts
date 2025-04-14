/* eslint-disable @typescript-eslint/no-unused-vars */
namespace IndexNowResponse {
  export interface SubmitUrl {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  }
}

namespace IndexNowRequest {
  export interface SubmitUrl {
    url: string;
    indexHost: "BING" | "NAVER";
  }
  export interface SubmitUrlList {
    urlList: string[];
    indexHost: "BING" | "NAVER";
  }
}
