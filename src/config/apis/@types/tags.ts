/* eslint-disable @typescript-eslint/no-unused-vars */

namespace TagsResponse {
  export interface GetPostTags extends Shared.SuccessResponse {
    data: {
      id: string;
      name: string;
      nameko: string;
      name_en?: string | null;
      name_ja?: string | null;
      name_zh?: string | null;
      is_primary: boolean;
      isExist: boolean;
    }[];
  }

  export interface GetTags extends Shared.SuccessResponse {
    data: {
      id: string;
      name: string;
      nameko: string;
      name_en?: string | null;
      name_ja?: string | null;
      name_zh?: string | null;
      is_primary: boolean;
      count: number;
    }[];
  }

  export interface GetPostLink extends Shared.SuccessResponse {
    data: { Post: PostResponse.PostView }[];
  }
}

namespace TagsRequest {
  export interface AddTags {
    post_id: number;
    tag_id: number;
  }

  export interface GetTags {
    sort: "id" | "count";
  }

  export interface GetPostLink {
    tag_id: number;
  }
}

