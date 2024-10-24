import { AxiosError, GenericAbortSignal } from "axios";
import qs from "qs";
import { API } from "../api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type Category = {
  id: string;
  name: string;
  favorite: boolean;
}

type GetCategoriesSearchParams = {
  favorite?: boolean;
};

type GetCategoriesQueryKey = [string, string, GetCategoriesSearchParams];

const queryKey = (
  searchParams: GetCategoriesSearchParams
): GetCategoriesQueryKey => ["get", "categories", searchParams];

const URL = "/categories";

type GetCategoriesResponse = Category[];

type GetCategoriesFnParams = GetCategoriesSearchParams & {
  signal: GenericAbortSignal;
};

async function getCategoriesFn(
  params: GetCategoriesFnParams
): Promise<GetCategoriesResponse> {
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
  const response = await API.get<GetCategoriesResponse>(url, { signal });

  return response.data;
}

type GetCategoriesApiOptions = Omit<
  UseQueryOptions<
    GetCategoriesResponse,
    AxiosError,
    GetCategoriesResponse,
    GetCategoriesQueryKey
  >,
  "queryKey" | "queryFn"
>;

type GetCategoriesApi = GetCategoriesSearchParams & {
  options?: GetCategoriesApiOptions;
};

function useGetCategoriesApi({ favorite, options }: GetCategoriesApi) {
  return useQuery({
    ...options,
    queryKey: queryKey({ favorite }),
    queryFn: async ({ queryKey, signal }) => getCategoriesFn({ favorite: queryKey[2].favorite, signal }),
  });
}

export { useGetCategoriesApi, queryKey as useGetCategoriesApiQueryKey };
export type { Category, GetCategoriesResponse };

