import { Category } from "@/app/apis/category/get-categories.api";
import { useUpdateCategoryApi } from "@/app/apis/category/update-category.api";
import { MouseEvent } from "react";

type useCategoryBadgeProps = Category;

function useCategoryBadge({ favorite, id, name }: useCategoryBadgeProps) {
  const updateCategoryApi = useUpdateCategoryApi({});

  const handleOnFavoriteClick = (event: MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault()
    updateCategoryApi.mutate({
      favorite: !favorite,
      id,
      name,
    });
  };

  return {
    handleOnFavoriteClick,
    updateCategoryApi
  }
}

export { useCategoryBadge };
