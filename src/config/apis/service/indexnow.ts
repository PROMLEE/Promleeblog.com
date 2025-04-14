import { CustomFetch, getParams } from "../axios";
export const IndexNowService = () => {
  const url = "/indexnow";

  const sendUrl = async (params: IndexNowRequest.SubmitUrl) => {
    const response = (
      await CustomFetch(`${url}/url${getParams(params)}`, { method: "GET" })
    ).body as IndexNowResponse.SubmitUrl;
    return response.data;
  };

  const sendUrlList = async (data: IndexNowRequest.SubmitUrlList) => {
    const response = (
      await CustomFetch(`${url}/urllist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cache: "no-store",
        },
        body: data,
      })
    ).body as IndexNowResponse.SubmitUrl;
    return response.data;
  };

  return {
    sendUrl,
    sendUrlList,
  };
};
