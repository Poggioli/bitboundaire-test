import { Category } from "@/apis/category/get-categories.api";
import { useUpdateCategoryApi } from "@/apis/category/update-category.api";
import { useParams } from "next/navigation";
import { MouseEvent } from "react";

type useCategoryBadgeProps = Category;

function useCategoryBadge({ favorite, id, name }: useCategoryBadgeProps) {
  const { id: categoryId } = useParams();
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
    updateCategoryApi,
    categoryId
  }
}

export { useCategoryBadge };
