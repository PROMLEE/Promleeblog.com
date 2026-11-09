/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PostResponse {
  export interface GetCategoryList extends Shared.SuccessResponse {
    data: {
      id: number;
      name: string;
      nameko: string;
      name_en?: string | null;
      name_ja?: string | null;
      name_zh?: string | null;
      ord: number;
      url: string;
    }[];
  }

  export interface GetSeriesList extends Shared.SuccessResponse {
    data: {
      nameko: string;
      Series: {
        id: number;
        name: string;
        nameko: string;
        name_en?: string | null;
        name_ja?: string | null;
        name_zh?: string | null;
        url: string;
        subject_no: number;
        caption: string;
        Post: PostView[];
      }[];
    };
  }

  export interface PostView {
    id: number;
    series_no: number;
    name: string;
    nameko: string;
    desc: string;
    init_date: string;
    thumbnail_url: string;
    view: number;
    like: number;
    series_id: number;
    mod_date: string;
    lock: boolean;
    posting: string;
    url: string;
    metatag: string[];
  }

  export interface GetSubjectList extends Shared.SuccessResponse {
    data: {
      name: string;
      nameko: string;
      name_en?: string | null;
      name_ja?: string | null;
      name_zh?: string | null;
      desc: string;
      Subject: {
        id: number;
        name: string;
        nameko: string;
        name_en?: string | null;
        name_ja?: string | null;
        name_zh?: string | null;
        url: string;
        category_id: number;
        subject_no: number;
      }[];
    };
  }

  export interface GetPost extends Shared.SuccessResponse {
    data: {
      url: string;
      id: number;
      series_no: number;
      name: string;
      nameko: string;
      desc: string;
      init_date: string;
      thumbnail_url: string;
      view: number;
      like: number;
      series_id: number;
      mod_date: string;
      lock: boolean;
      posting: string;
      metatag: string[];
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
    };
  }

  export interface GetLinks extends Shared.SuccessResponse {
    data: {
      name: string;
      nameko: string;
      name_en?: string | null;
      name_ja?: string | null;
      name_zh?: string | null;
      url: string;
      id: number;
      ord: number;
      Subject: {
        name: string;
        nameko: string;
        name_en?: string | null;
        name_ja?: string | null;
        name_zh?: string | null;
        url: string;
        id: number;
        category_no: number;
        Series: {
          name: string;
          nameko: string;
          name_en?: string | null;
          name_ja?: string | null;
          name_zh?: string | null;
          url: string;
          id: number;
          subject_no: number;
          Post: {
            id: number;
            url: string;
            nameko: string;
            lock: boolean;
            series_no: number;
          }[];
        }[];
      }[];
    }[];
  }
}

namespace PostRequest {
  export interface GetSubjectList {
    categoryurl: string;
  }
  export interface GetSeriesList {
    subjecturl: string;
  }
  export interface PatchView {
    post_id: string;
  }
}
