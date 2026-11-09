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

  export interface GetSeriesFromPostId extends Shared.SuccessResponse {
    data: {
      nameko: string;
      Post: SimplePostType[];
    };
  }

  export interface PostType {
    id: string;
    url: string;
    init_date: string;
    name: string;
    nameko: string;
    thumbnail_url: string;
    Series: {
      id: number;
      url: string;
      name: string;
      nameko: string;
      name_en?: string | null;
      name_ja?: string | null;
      name_zh?: string | null;
      Subject: {
        url: string;
        name: string;
        nameko: string;
        name_en?: string | null;
        name_ja?: string | null;
        name_zh?: string | null;
        Category: {
          url: string;
          name: string;
          nameko: string;
          name_en?: string | null;
          name_ja?: string | null;
          name_zh?: string | null;
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
  export interface GetSeriesFromPostId {
    postid: string;
  }
}
