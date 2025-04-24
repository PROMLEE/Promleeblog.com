import { CustomFetch, getParams } from "../axios";
import { MdxMeta } from "@/config/types/types";
export const PostService = () => {
  const url = "/post";

  /**
   * Category List 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/categorylist/route.ts
   */
  const getCategoryList = async () => {
    // const response = (await API.get(
    //   `${url}/categorylist`,
    // )) as PostResponse.GetCategoryList;
    const response = (
      await CustomFetch(`${url}/categorylist`, { method: "GET" })
    ).body as PostResponse.GetCategoryList;
    return response.data;
  };

  /**
   * Subject List 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/subjectlist/route.ts
   */
  const getSubjectList = async (params: PostRequest.GetSubjectList) => {
    const response = (
      await CustomFetch(`${url}/subjectlist${getParams(params)}`, {
        method: "GET",
      })
    ).body as PostResponse.GetSubjectList;
    return response.data;
  };

  /**
   * Series List 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/serieslist/route.ts
   */
  const getSeriesList = async (params: PostRequest.GetSeriesList) => {
    const response = (
      await CustomFetch(`${url}/serieslist${getParams(params)}`, {
        method: "GET",
      })
    ).body as PostResponse.GetSeriesList;
    return response.data;
  };

  /**
   * Links 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/links/route.ts
   */
  const getLinks = async () => {
    const response = (await CustomFetch(`${url}/links`, { method: "GET" }))
      .body as PostResponse.GetLinks;
    return response.data;
  };

  /**
   * Links 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/links/route.ts
   */
  const getSitemap = async () => {
    const response = (
      await CustomFetch(`${url}/links`, {
        method: "GET",
        cache: "no-store",
      })
    ).body as PostResponse.GetLinks;
    return response.data;
  };

  /**
   * View increment
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/view/route.ts
   */
  const viewIncrement = async (body: PostRequest.PatchView) => {
    const response = (
      await CustomFetch(`${url}/view`, {
        method: "PATCH",
        body,
      })
    ).body as Shared.SuccessResponse;
    return response.data;
  };

  /**
   * Post detail 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/route.ts
   */
  const getPost = async (params: PostRequest.PatchView) => {
    const response = (
      await CustomFetch(`${url}${getParams(params)}`, {
        method: "GET",
      })
    ).body as PostResponse.GetPost;
    return response.data;
  };
  /**
   * Post meta 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/post/route.ts
   */
  const getPostMeta = async (params: PostRequest.PatchView) => {
    const response = (
      await CustomFetch(`${url}/meta${getParams(params)}`, {
        method: "GET",
      })
    ).body as { data: MdxMeta };
    return response.data;
  };
  return {
    getCategoryList,
    getSubjectList,
    getSeriesList,
    getLinks,
    viewIncrement,
    getPost,
    getSitemap,
    getPostMeta,
  };
};
