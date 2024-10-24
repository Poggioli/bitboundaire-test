import { AxiosError, GenericAbortSignal } from "axios";
import qs from "qs";
import { API } from "../api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type Post = {
  id: string;
  description: string;
  date: Date;
  categories: string[];
}

type GetPostsSearchParams = {
  favorite?: boolean;
};

type GetPostsQueryKey = [string, string, GetPostsSearchParams];

const queryKey = (
  searchParams: GetPostsSearchParams
): GetPostsQueryKey => ["get", "posts", searchParams];

const URL = "/posts";

type GetPostsResponse = Post[];

type GetPostsFnParams = GetPostsSearchParams & {
  signal: GenericAbortSignal;
};

async function getPostsFn(
  params: GetPostsFnParams
): Promise<GetPostsResponse> {
  const { signal, ...rest } = params;

  const searchParams = qs.stringify(
    {
      ...rest,
    },
    {
      allowEmptyArrays: false,
      skipNulls: true,
    }
  );

  const url = `${URL}?${searchParams}`;
  const response = await API.get<GetPostsResponse>(url, { signal });

  return response.data;
}

type GetPostsApiOptions = Omit<
  UseQueryOptions<
    GetPostsResponse,
    AxiosError,
    GetPostsResponse,
    GetPostsQueryKey
  >,
  "queryKey" | "queryFn"
>;

type GetPostsApi = GetPostsSearchParams & {
  options?: GetPostsApiOptions;
};

function useGetPostsApi({ favorite, options }: GetPostsApi) {
  return useQuery({
    ...options,
    queryKey: queryKey({ favorite }),
    queryFn: async ({ queryKey, signal }) => getPostsFn({ favorite: queryKey[2].favorite, signal }),
  });
}

export { useGetPostsApi, queryKey as useGetPostsApiQueryKey };
export type { Post };

