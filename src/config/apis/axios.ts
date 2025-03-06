import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + "/api",
  adapter: "fetch",
  fetchOptions: { next: { revalidate: 3600 } },
  headers: {
    "Content-Type": "application/json",
  },
});

// export const AuthStorage = {
//   async setToken(accessToken: string) {
//     await localStorage.setItem("accessToken", accessToken);
//   },

//   async getToken(): Promise<string | null> {
//     return await localStorage.getItem("accessToken");
//   },

//   async clear() {
//     await localStorage.removeItem("accessToken");
//   },
// };

API.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // const token = await AuthStorage.getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // console.log({
    //   headers: config.headers,
    //   method: config.method,
    //   url: config.url,
    //   baseUrl: config.baseURL,
    //   data: config.data,
    //   params: config.params,
    // });
    return config;
  },
  (error: AxiosError) => {
    console.log("API request error", error.config);
    return Promise.reject(error);
  },
);

API.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log({
    //   status: response.status,
    //   statusText: response.statusText,
    //   data: response.data,
    // });
    return response.data; // 서버에서 받는 데이터가 data 속성에 들어있는 경우
    // return response.data.data;	// 서버에서 받는 데이터가 data.data 속성에 들어있는 경우
  },
  async (error: AxiosError) => {
    // console.warn(error.config?.url + " API response error", {
    //   response_data: error.response?.data,
    //   status: error.response?.status,
    //   request_info: {
    //     method: error.config?.method,
    //     url: error.config?.url,
    //     baseUrl: error.config?.baseURL,
    //     headers: error.config?.headers,
    //     params: error.config?.params,
    //     data: error.config?.data,
    //   },
    // });
    return Promise.reject(error);
  },
);
