import { API } from "../axios";

export const MainService = () => {
  const url = "/main";

  /**
   * Hot Post 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/main/hot/route.ts
   */
  const getHot = async (params: MainRequest.GetHot) => {
    const response = (await API.get(`${url}/hot`, {
      params,
    })) as MainResponse.GetHot;
    return response.data;
  };

  /**
   * Recent Post 조회
   * @api-doc:
   */
  const getRecent = async (params: MainRequest.GetRecent) => {
    const response = (await API.get(`${url}/recent`, {
      params,
    })) as MainResponse.GetRecent;
    return response.data;
  };

  return {
    getHot,
    getRecent,
  };
};
