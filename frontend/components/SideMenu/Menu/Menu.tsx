import { CategoryBadge } from "@/components/CategoryBadge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { FC } from "react";
import { useMenu } from "./useMenu";
import { Category } from "@/apis/category/get-categories.api";

type MenuProps = {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  categories: Category[];
}

const Menu: FC<MenuProps> = ({
  isSuccess,
  isError,
  isLoading,
  categories
}) => {

  const {
    categoriesData,
    selectedRadio,
    setSelectedRadio
  } = useMenu({ categories })

  return (
    <>
      <RadioGroup value={selectedRadio} onValueChange={setSelectedRadio} className="grid-cols-2 mb-12 p-4 mt-6">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all-categories" id="all-categories" />
          <Label htmlFor="all-categories">All categories</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="favorite-categories" id="favorite-categories" />
          <Label htmlFor="favorite-categories">Favorite categories</Label>
        </div>
      </RadioGroup>

      <nav className="flex flex-col items-start gap-3 p-4">
        {isLoading ? (
          <>
            {new Array(10).fill(0).map((_, index) => (
              <Skeleton key={index} className="h-9 min-w-20 w-auto" />
            ))}
          </>
        ) : null}

        {isError ? (
          <div>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Oops!</h3>
            <p className="leading-7">Something went wrong.</p>
          </div>
        ) : null}

        {isSuccess && categoriesData.length === 0 ? (
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Empty categories!</h3>
        ) : null}

        {isSuccess && categoriesData.length > 0 ? (
          categoriesData.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <CategoryBadge  {...category} />
            </Link>
          ))
        ) : null}
      </nav>
    </>
  )
}

export { Menu }