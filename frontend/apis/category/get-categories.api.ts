import { AxiosError, GenericAbortSignal } from "axios";
import qs from "qs";
import { API } from "../api";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type Category = {
  id: string;
  name: string;
  favorite: boolean;
};

type GetCategoriesQueryKey = [string, string];

const queryKey: GetCategoriesQueryKey = ["get", "categories"];

const url = "/categories";

type GetCategoriesResponse = Category[];

type GetCategoriesFnParams = {
  signal: GenericAbortSignal;
};

async function getCategoriesFn(
  params: GetCategoriesFnParams
): Promise<GetCategoriesResponse> {
  const { signal } = params;

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

type GetCategoriesApi = {
  options?: GetCategoriesApiOptions;
};

function useGetCategoriesApi({ options }: GetCategoriesApi) {
  return useQuery({
    ...options,
    staleTime: Infinity,
    queryKey,
    queryFn: async ({ queryKey, signal }) => getCategoriesFn({ signal }),
  });
}

export { useGetCategoriesApi, queryKey as getCategoriesApiQueryKey };
export type { Category, GetCategoriesResponse };
