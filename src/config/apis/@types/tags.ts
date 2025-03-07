namespace TagsResponse {
  export interface GetPostTags extends Shared.SuccessResponse {
    data: {
      id: string;
      name: string;
      nameko: string;
      is_primary: boolean;
      isExist: boolean;
    }[];
  }

  export interface GetTags extends Shared.SuccessResponse {
    data: {
      id: string;
      name: string;
      nameko: string;
      is_primary: boolean;
      count: number;
    }[];
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
}
