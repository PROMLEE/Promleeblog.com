import returnFetch, {
  FetchArgs,
  ReturnFetchDefaultOptions,
} from "return-fetch";

// Use as a replacer of `RequestInit`
type JsonRequestInit = Omit<NonNullable<FetchArgs[1]>, "body"> & {
  body?: object;
};

// Use as a replacer of `Response`
export type ResponseGenericBody<T> = Omit<
  Awaited<ReturnType<typeof fetch>>,
  keyof Body | "clone"
> & { body: T };

export type JsonResponse<T> = T extends object
  ? ResponseGenericBody<T>
  : ResponseGenericBody<unknown>;

// this resembles the default behavior of axios json parser
// https://github.com/axios/axios/blob/21a5ad34c4a5956d81d338059ac0dd34a19ed094/lib/defaults/index.js#L25
const parseJsonSafely = (text: string): object | string => {
  try {
    return JSON.parse(text);
  } catch (e) {
    if ((e as Error).name !== "SyntaxError") {
      throw e;
    }

    return text.trim();
  }
};

const returnFetchJson = (
  args?: ReturnFetchDefaultOptions,
  params?: Record<string, string>,
) => {
  const fetch = returnFetch(args);
  const baseUrl = args?.baseUrl ? String(args.baseUrl) : "";
  let query = "";
  if (params) {
    query = "?" + new URLSearchParams(params).toString();
  }

  return async <T>(
    url: FetchArgs[0],
    init?: JsonRequestInit,
  ): Promise<JsonResponse<T>> => {
    const response = await fetch(baseUrl + url + query, {
      ...init,
      next: { revalidate: init?.next?.revalidate ?? 172800 }, // 2 days
      body: init?.body && JSON.stringify(init.body),
    });

    const body = parseJsonSafely(await response.text()) as T;

    return {
      headers: response.headers,
      ok: response.ok,
      redirected: response.redirected,
      status: response.status,
      statusText: response.statusText,
      type: response.type,
      url: response.url,
      body,
    } as JsonResponse<T>;
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getParams = (params: Record<string, any>) => {
  return "?" + new URLSearchParams(params).toString();
};

export const CustomFetch = returnFetchJson({
  baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
  headers: { Accept: "application/json" },

  interceptors: {
    request: async (args) => {
      return args;
    },
    response: async (response) => {
      if (response.status >= 400) {
        throw await response.text().then(Error);
      }
      return response;
    },
  },
});

