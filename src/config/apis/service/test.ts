import { API } from "../axios";

export const TestService = () => {
  const url = "/posts";

  /**
   * 포스트 상세 조회 - id 별 조회
   * @api-doc: https://jsonplaceholder.typicode.com/guide/
   */
  const getPosts = async (
    params: TestRequest.GetPostsParams,
    { userId }: TestRequest.GetPostsQuery,
  ) => {
    const response = (await API.get(`${url}/${params.id}`, {
      params: { userId },
    })) as TestResponse.GetPosts;
    return response;
  };

  /**
   * 포스트 전체 조회
   * @api-doc: https://jsonplaceholder.typicode.com/guide/
   */
  const getAllPosts = async () => {
    const response = (await API.get(`${url}`)) as TestResponse.GetPosts[];
    return response;
  };

  /**
   * 포스트 생성
   * @api-doc: https://jsonplaceholder.typicode.com/guide/
   */
  const postPosts = async (body: TestRequest.PostPostsBody) => {
    const response = (await API.post(`${url}`, body)) as TestResponse.GetPosts;
    return response;
  };

  return {
    getPosts,
    getAllPosts,
    postPosts,
  };
};
