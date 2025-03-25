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

  return {
    getHot,
    getRecent,
  };
};
