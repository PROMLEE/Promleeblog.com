import { API } from "../axios";

export const EditService = () => {
  const url = "/edit";

  /**
   * 카테고리 추가
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/addcategory/route.ts
   */
  const postCategory = async (data: EditRequest.PostAddCategory) => {
    const response = (await API.post(
      `${url}/addcategory`,
      data,
    )) as Shared.SuccessResponse;
    return response.data;
  };

  /**
   * 포스트 추가
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/addpost/route.ts
   */
  const postPost = async (data: EditRequest.PostAddPost) => {
    const response = (await API.post(
      `${url}/addpost`,
      data,
    )) as Shared.SuccessResponse;
    return response.data;
  };

  /**
   * 시리즈 추가
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/addseries/route.ts
   */
  const postSeries = async (data: EditRequest.PostAddSeries) => {
    const response = (await API.post(
      `${url}/addseries`,
      data,
    )) as Shared.SuccessResponse;
    return response.data;
  };

  /**
   * 서브젝트 추가
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/addsubject/route.ts
   */
  const postSubject = async (data: EditRequest.PostAddSubject) => {
    const response = (await API.post(
      `${url}/addsubject`,
      data,
    )) as Shared.SuccessResponse;
    return response.data;
  };

  /**
   * 포스트 수정
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/updatepost/route.ts
   */
  const patchPost = async (data: EditRequest.PostPatchPost, id: number) => {
    const response = (await API.patch(
      `${url}/updatepost?post_id=${id}`,
      data,
    )) as Shared.SuccessResponse;
    return response.data;
  };

  return {
    postCategory,
    postPost,
    postSeries,
    postSubject,
    patchPost,
  };
};
