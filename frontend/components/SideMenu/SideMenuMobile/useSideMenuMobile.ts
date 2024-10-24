import { Category } from "@/app/apis/category/get-categories.api";
import { useMemo, useState } from "react";

type useSideMenuMobileProps = {
  categories: Category[];
};

function useSideMenuMobile({ categories }: useSideMenuMobileProps) {
  const [selectedRadio, setSelectedRadio] = useState("all-categories");

  const categoriesData: Category[] = useMemo(() => {
    if (selectedRadio === "favorite-categories") {
      return categories.filter((category) => category.favorite);
    }

    return categories;
  }, [categories, selectedRadio]);

  return {
    categoriesData,
    selectedRadio,
    setSelectedRadio
  }
}

export { useSideMenuMobile };
