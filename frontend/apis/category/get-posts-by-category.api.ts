import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError, GenericAbortSignal } from "axios";
import { API } from "../api";
import { setDate, setMonth, setYear, toDate } from "date-fns";

type Post = {
  id: string;
  description: string;
  date: Date;
  categories: string[];
};

type GetPostsByCategoryPathParams = {
  category: string;
};

type GetPostsByCategoryQueryKey = [
  string,
  string,
  string,
  string,
  GetPostsByCategoryPathParams
];

const queryKey = (
  searchParams: GetPostsByCategoryPathParams
): GetPostsByCategoryQueryKey => [
  "get",
  "posts",
  "by",
  "category",
  searchParams,
];

const URL = (category: string) => `/categories/${category}/posts`;

type GetPostsByCategoryResponse = Post[];

type GetPostsByCategoryFnParams = GetPostsByCategoryPathParams & {
  signal: GenericAbortSignal;
};

function mapPost(post: Post): Post {
  let date = new Date();
  date = setYear(date, Number((post.date as unknown as string).split("-")[0]));
  date = setMonth(date, Number((post.date as unknown as string).split("-")[1]));
  date = setDate(date, Number((post.date as unknown as string).split("-")[2]));

  return {
    ...post,
    date,
  };
}

async function getPostsByCategoryFn(
  params: GetPostsByCategoryFnParams
): Promise<GetPostsByCategoryResponse> {
  const { signal, category } = params;

  const url = URL(category);
  const response = await API.get<GetPostsByCategoryResponse>(url, { signal });

  return response.data.map(mapPost);
}

type GetPostsByCategoryApiOptions = Omit<
  UseQueryOptions<
    GetPostsByCategoryResponse,
    AxiosError,
    GetPostsByCategoryResponse,
    GetPostsByCategoryQueryKey
  >,
  "queryKey" | "queryFn"
>;

type GetPostsByCategoryApi = GetPostsByCategoryPathParams & {
  options?: GetPostsByCategoryApiOptions;
};

function useGetPostsByCategoryApi({
  category,
  options,
}: GetPostsByCategoryApi) {
  return useQuery({
    ...options,
    queryKey: queryKey({ category }),
    queryFn: async ({ queryKey, signal }) =>
      getPostsByCategoryFn({ category: queryKey[4].category, signal }),
  });
}

export {
  useGetPostsByCategoryApi,
  queryKey as useGetPostsByCategoryApiQueryKey,
};
export type { Post, GetPostsByCategoryPathParams };
