/* eslint-disable @typescript-eslint/no-unused-vars */
namespace EditResponse {}

namespace EditRequest {
  export interface PostAddCategory {
    name: string;
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
    metatag: string[];
    tags: number[];
  }

  export interface PostPatchPost {
    series_id: number;
    name: string;
    nameko: string;
    url: string;
    series_no: number;
    desc: string;
    thumbnail_url: string;
    lock: boolean;
    posting: string;
    metatag: string[];
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
