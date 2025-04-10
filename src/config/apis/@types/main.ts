/* eslint-disable @typescript-eslint/no-unused-vars */
namespace MainResponse {
  export interface GetHot extends Shared.SuccessResponse {
    data: PostType[];
  }

  export interface GetRecent extends Shared.SuccessResponse {
    data: PostType[];
  }

  export interface GetRecommend extends Shared.SuccessResponse {
    data: SimplePostType[];
  }

  export interface PostType {
    id: string;
    url: string;
    init_date: string;
    name: string;
    nameko: string;
    thumbnail_url: string;
    Series: {
      url: string;
      nameko: string;
      Subject: {
        url: string;
        nameko: string;
        Category: {
          url: string;
          nameko: string;
        };
      };
    };
  }

  export interface SimplePostType {
    id: string;
    url: string;
    name: string;
    nameko: string;
  }
}

namespace MainRequest {
  export interface GetHot {
    take: number;
  }
  export interface GetRecent {
    take: number;
  }
  export interface GetRecommend {
    take: number;
  }
}
