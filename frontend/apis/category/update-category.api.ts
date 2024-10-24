import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { API } from "../api";
import {
  Category,
  getCategoriesApiQueryKey
} from "./get-categories.api";
import { AxiosError } from "axios";
import {
  useGetPostsByCategoryApiQueryKey as getPostsByCategoryApiQueryKey,
  GetPostsByCategoryPathParams,
} from "./get-posts-by-category.api";

type UpdateCategory = Category;

const urlBuilder = (id: string) => `/categories/${id}`;

type UseUpdateCategoryApiMutationKey = [string, string];
const mutationKey: UseUpdateCategoryApiMutationKey = ["categories", "update"];

const mutationFn = async (data: UpdateCategory): Promise<void> => {
  const url = urlBuilder(data.id);
  await API.put(url, data);
};

type UseUpdateCategoryApiOptions = Omit<
  UseMutationOptions<void, AxiosError, UpdateCategory, void>,
  "mutationKey" | "mutationFn"
>;

type UseUpdateCategoryApi = {
  options?: UseUpdateCategoryApiOptions;
};

const useUpdateCategoryApi = ({ options }: UseUpdateCategoryApi) => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError, UpdateCategory, void>({
    ...options,
    mutationKey,
    mutationFn,
    async onSuccess(data, variables, context) {
      await options?.onSuccess?.(data, variables, context);
      queryClient.refetchQueries({
        exact: false,
        queryKey: getCategoriesApiQueryKey,
      });
    },
  });
};

export { useUpdateCategoryApi, mutationKey as useUpdateCategoryApiMutationKey };
