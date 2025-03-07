import { API } from "../axios";

export const TagsService = () => {
  const url = "/tags";

  /**
   * 태그 전체 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/gettags/route.ts
   */
  const getTags = async (params: TagsRequest.GetTags) => {
    const response = (await API.get(`${url}`, {
      params,
    })) as TagsResponse.GetTags;
    return response.data;
  };

  const postTags = async (post_id: string) => {
    const response = (await API.get(`${url}/posttags`, {
      params: { post_id },
    })) as TagsResponse.GetPostTags;
    return response.data;
  };

  const addTags = async (data: TagsRequest.AddTags) => {
    const response = (await API.post(
      `${url}/addtags`,
      data,
    )) as Shared.SuccessResponse;
    return response.data;
  };

  const deleteTags = async (data: TagsRequest.AddTags) => {
    const response = (await API.delete(`${url}/deletetags`, {
      data,
    })) as Shared.SuccessResponse;
    return response.data;
  };

  return {
    getTags,
    postTags,
    deleteTags,
    addTags,
  };
};
