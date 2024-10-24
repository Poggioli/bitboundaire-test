import { Category } from "@/apis/category/get-categories.api";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCategoryBadge } from "./useCategoryBadge";

type CategoryBadgeProps = Category

const CategoryBadge: FC<CategoryBadgeProps> = ({ name, favorite, id }) => {

  const {
    handleOnFavoriteClick,
    updateCategoryApi
  } = useCategoryBadge({ favorite, id, name });

  return (
    <Button>
      {name}
      <p onClick={handleOnFavoriteClick}>

      <Star
        className={cn(
          "size-4",
          favorite && "fill-[currentColor]",
          updateCategoryApi.isPending && "cursor-not-allowed pointer-events-none"
        )}
        />
        </p>
    </Button>
  )
}

export { CategoryBadge }