import { CustomFetch, getParams } from "../axios";

export const TagsService = () => {
  const url = "/tags";

  /**
   * 태그 전체 조회
   * @api-doc: https://github.com/PROMLEE/Promleeblog.com/blob/test/src/app/api/edit/gettags/route.ts
   */
  const getTags = async (params: TagsRequest.GetTags) => {
    const response = (
      await CustomFetch(`${url}${getParams(params)}`, { method: "GET" })
    ).body as TagsResponse.GetTags;
    return response.data;
  };

  const postTags = async (post_id: string) => {
    const response = (
      await CustomFetch(`${url}/posttags${getParams({ post_id })}`, {
        method: "GET",
      })
    ).body as TagsResponse.GetPostTags;
    return response.data;
  };

  const addTags = async (body: TagsRequest.AddTags) => {
    const response = (
      await CustomFetch(`${url}/addtags`, {
        method: "POST",
        body,
      })
    ).body as Shared.SuccessResponse;
    return response.data;
  };

  const deleteTags = async (body: TagsRequest.AddTags) => {
    const response = (
      await CustomFetch(`${url}/deletetags`, {
        method: "DELETE",
        body,
      })
    ).body as Shared.SuccessResponse;
    return response.data;
  };

  const getPostLink = async (params: TagsRequest.GetPostLink) => {
    const response = (
      await CustomFetch(`${url}/postlink${getParams(params)}`, {
        method: "GET",
      })
    ).body as TagsResponse.GetPostLink;
    return response.data;
  };

  return {
    getTags,
    postTags,
    deleteTags,
    addTags,
    getPostLink,
  };
};
