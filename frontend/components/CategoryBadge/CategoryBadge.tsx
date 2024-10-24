import { Category } from "@/apis/category/get-categories.api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { FC } from "react";
import { useCategoryBadge } from "./useCategoryBadge";

type CategoryBadgeProps = Category

const CategoryBadge: FC<CategoryBadgeProps> = ({ name, favorite, id }) => {

  const {
    handleOnFavoriteClick,
    updateCategoryApi,
    categoryId
  } = useCategoryBadge({ favorite, id, name });

  return (
    <Button
      variant={categoryId === id ? 'outline' : 'default'}
      className={cn(categoryId === id && "border-primary text-primary hover:bg-primary hover:text-primary-foreground")}
    >
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

export { CategoryBadge };
