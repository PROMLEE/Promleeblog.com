import { API } from "../axios";

export const PostService = () => {
  const url = "/post";

  /**
   * Category List 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/categorylist/route.ts
   */
  const getCategoryList = async () => {
    const response = (await API.get(
      `${url}/categorylist`,
    )) as PostResponse.GetCategoryList;
    return response.data;
  };

  /**
   * Subject List 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/subjectlist/route.ts
   */
  const getSubjectList = async (params: PostRequest.GetSubjectList) => {
    const response = (await API.get(`${url}/subjectlist`, {
      params,
    })) as PostResponse.GetSubjectList;
    return response.data;
  };

  /**
   * Series List 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/serieslist/route.ts
   */
  const getSeriesList = async (params: PostRequest.GetSeriesList) => {
    const response = (await API.get(`${url}/serieslist`, {
      params,
    })) as PostResponse.GetSeriesList;
    return response.data;
  };

  /**
   * Links 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/links/route.ts
   */
  const getLinks = async () => {
    const response = (await API.get(`${url}/links`)) as PostResponse.GetLinks;
    return response.data;
  };

  /**
   * View increment
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/view/route.ts
   */
  const viewIncrement = async ({ post_id }: PostRequest.PatchView) => {
    const response = (await API.patch(`${url}/view`, {
      post_id,
    })) as Shared.SuccessResponse;
    return response.data;
  };

  /**
   * Post detail 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/route.ts
   */

  const getPost = async (params: PostRequest.PatchView) => {
    const response = (await API.get(`${url}`, {
      params,
    })) as PostResponse.GetPost;
    return response.data;
  };

  return {
    getCategoryList,
    getSubjectList,
    getSeriesList,
    getLinks,
    viewIncrement,
    getPost,
  };
};
