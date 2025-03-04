/* eslint-disable @typescript-eslint/no-unused-vars */

declare namespace TestRequest {
  export interface GetPostsParams {
    id: number;
  }
  export interface GetPostsQuery {
    userId: number;
  }
  export interface PostPostsBody {
    title: string;
    body: string;
    userId: number;
  }
}
declare namespace TestResponse {
  export interface GetPosts {
    id: number;
    title: string;
    body: string;
    userId: number;
  }
}
