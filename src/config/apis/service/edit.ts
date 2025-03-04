import { API } from "../axios";

export const EditService = () => {
  const url = "/edit";

  /**
   * 태그 전체 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/gettags/route.ts
   */
  const getTags = async () => {
    const response = (await API.get(`${url}/gettags`)) as EditResponse.GetTags;
    return response.data;
  };

  return {
    getTags,
  };
};
