import { CustomFetch, getParams } from "../axios";

export const EditService = () => {
  const url = "/edit";

  /**
   * 카테고리 추가
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/addcategory/route.ts
   */
  const postCategory = async (body: EditRequest.PostAddCategory) => {
    const response = (
      await CustomFetch(`${url}/addcategory`, { method: "POST", body })
    ).body as Shared.SuccessResponse;
    return response.data;
  };

  /**
   * 포스트 추가
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/addpost/route.ts
   */
  const postPost = async (body: EditRequest.PostAddPost) => {
    const response = (
      await CustomFetch(`${url}/addpost`, { method: "POST", body })
    ).body as Shared.SuccessResponse;
    return response.data;
  };

  /**
   * 시리즈 추가
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/addseries/route.ts
   */
  const postSeries = async (body: EditRequest.PostAddSeries) => {
    const response = (
      await CustomFetch(`${url}/addseries`, { method: "POST", body })
    ).body as Shared.SuccessResponse;
    return response.data;
  };

  /**
   * 서브젝트 추가
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/addsubject/route.ts
   */
  const postSubject = async (body: EditRequest.PostAddSubject) => {
    const response = (
      await CustomFetch(`${url}/addsubject`, { method: "POST", body })
    ).body as Shared.SuccessResponse;
    return response.data;
  };

  /**
   * 포스트 수정
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/updatepost/route.ts
   */
  const patchPost = async (
    body: EditRequest.PostPatchPost,
    post_id: number,
  ) => {
    const response = (
      await CustomFetch(`${url}/updatepost${getParams({ post_id })}`, {
        method: "PATCH",
        body,
      })
    ).body as Shared.SuccessResponse;
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
