/* eslint-disable @typescript-eslint/no-unused-vars */
namespace EditResponse {
  export interface GetTags extends Shared.SuccessResponse {
    data: {
      id: string;
      name: string;
      nameko: string;
      is_primary: boolean;
    }[];
  }
}

namespace EditRequest {
  export interface PostAddCategory {
    name: PostAddCategoryColumnName;
    nameko: string;
    ord: number;
    url: string;
    desc: string;
  }

  export interface PostAddPost {
    series_id: number;
    name: string;
    nameko: string;
    url: string;
    series_no: number;
    desc: string;
    thumbnail_url: string;
    lock: boolean;
    posting: string;
  }

  export interface PostAddSeries {
    subject_id: number;
    name: string;
    nameko: string;
    url: string;
    subject_no: number;
    caption: string;
  }

  export interface PostAddSubject {
    category_id: number;
    name: string;
    nameko: string;
    url: string;
    category_no: number;
    desc: string;
  }

  export type PostAddCategoryColumnName =
    | "name"
    | "nameko"
    | "url"
    | "ord"
    | "desc";
}
