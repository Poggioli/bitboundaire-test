import {
  Category,
  useGetCategoriesApi
} from "@/apis/category/get-categories.api";
import { useGetPostsByCategoryApi } from "@/apis/category/get-posts-by-category.api";
import { useParams } from "next/navigation";
import { useMemo } from "react";

function usePostsList() {
  const { id: categoryId } = useParams();

  const getCategoriesApi = useGetCategoriesApi({});

  const getPostsByCategoryApi = useGetPostsByCategoryApi({
    category: categoryId as string,
  });

  const category: Category | undefined = useMemo(() => {
    if(getCategoriesApi.isLoading || getCategoriesApi.isError) {
      return undefined
    }

    return getCategoriesApi.data!.find(({ id }) => id === categoryId)
  }, [getCategoriesApi.isLoading, getCategoriesApi.isError, getCategoriesApi.data, categoryId])

  const isLoading = useMemo(
    () => getCategoriesApi.isLoading || getPostsByCategoryApi.isLoading,
    [getCategoriesApi.isLoading, getPostsByCategoryApi.isLoading]
  );

  const isError = useMemo(
    () => getCategoriesApi.isError || getPostsByCategoryApi.isError || (getCategoriesApi.isSuccess && !category),
    [getCategoriesApi.isError, getPostsByCategoryApi.isError, getCategoriesApi.isSuccess, category]
  );

  const isSuccess = useMemo(
    () => getCategoriesApi.isSuccess && getPostsByCategoryApi.isSuccess,
    [getCategoriesApi.isSuccess, getPostsByCategoryApi.isSuccess]
  );

  return {
    getPostsByCategoryApi,
    isLoading,
    isSuccess,
    isError,
    category,
  };
}

export { usePostsList };
