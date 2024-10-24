import {
  Category,
  useGetCategoriesApi,
} from "@/apis/category/get-categories.api";
import { useParams } from "next/navigation";
import { useMemo } from "react";

type UsePostCardProps = {
  categories: string[];
};

function usePostCard({ categories }: UsePostCardProps) {
  const getCategoriesApi = useGetCategoriesApi({});
  const { id: categoryId } = useParams();

  const postCategories: Category[] = useMemo(() => {
    if (getCategoriesApi.isLoading || getCategoriesApi.isError) {
      return [];
    }

    const categoriesFiltereds = getCategoriesApi.data!.filter(({ id }) =>
      categories.includes(id)
    );
    const index = categoriesFiltereds.findIndex(({ id }) => id === categoryId);

    [categoriesFiltereds[0], categoriesFiltereds[index]] = [
      categoriesFiltereds[index],
      categoriesFiltereds[0],
    ];

    return categoriesFiltereds;
  }, [
    getCategoriesApi.isLoading,
    getCategoriesApi.isError,
    getCategoriesApi.data,
    categories,
    categoryId
  ]);

  return {
    postCategories,
  };
}

export { usePostCard };
