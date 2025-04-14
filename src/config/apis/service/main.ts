import { CustomFetch, getParams } from "../axios";

export const MainService = () => {
  const url = "/main";

  /**
   * Hot Post 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/main/hot/route.ts
   */
  const getHot = async (params: MainRequest.GetHot) => {
    const response = (
      await CustomFetch(`${url}/hot${getParams(params)}`, { method: "GET" })
    ).body as MainResponse.GetHot;
    return response.data;
  };

  /**
   * Recent Post 조회
   * @api-doc:
   */
  const getRecent = async (params: MainRequest.GetRecent) => {
    const response = (
      await CustomFetch(`${url}/recent${getParams(params)}`, { method: "GET" })
    ).body as MainResponse.GetRecent;
    return response.data;
  };

  /**
   * Recommend Post 조회
   * @api-doc:
   */
  const getRecommend = async (params: MainRequest.GetRecommend) => {
    const response = (
      await CustomFetch(`${url}/recommend${getParams(params)}`, {
        method: "GET",
      })
    ).body as MainResponse.GetRecommend;
    return response.data;
  };

  /**
   * Series 조회
   * @api-doc:
   */
  const getSeriesFromPostId = async (
    params: MainRequest.GetSeriesFromPostId,
  ) => {
    const response = (
      await CustomFetch(`${url}/series-from-postid${getParams(params)}`, {
        method: "GET",
      })
    ).body as MainResponse.GetSeriesFromPostId;
    return response.data;
  };

  return {
    getHot,
    getRecent,
    getRecommend,
    getSeriesFromPostId,
  };
};
