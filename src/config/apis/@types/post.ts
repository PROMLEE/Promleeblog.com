/* eslint-disable @typescript-eslint/no-unused-vars */
namespace PostResponse {
  export interface GetCategoryList extends Shared.SuccessResponse {
    data: {
      id: number;
      name: string;
      nameko: string;
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
        url: string;
        subject_no: number;
        caption: string;
        Post: {
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
        }[];
      }[];
    };
  }

  export interface GetSubjectList extends Shared.SuccessResponse {
    data: {
      name: string;
      nameko: string;
      desc: string;
      Subject: {
        id: number;
        name: string;
        nameko: string;
        url: string;
        category_id: number;
        subject_no: number;
      }[];
    };
  }

  export interface GetPost extends Shared.SuccessResponse {
    data: {
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
    };
  }

  export interface GetLinks extends Shared.SuccessResponse {
    data: {
      nameko: string;
      url: string;
      id: number;
      ord: number;
      Subject: {
        nameko: string;
        url: string;
        id: number;
        category_no: number;
        Series: {
          nameko: string;
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
    subject_no: number;
  }
  export interface PatchView {
    post_id: string;
  }
}
