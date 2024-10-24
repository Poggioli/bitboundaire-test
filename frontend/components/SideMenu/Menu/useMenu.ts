import { Category } from "@/apis/category/get-categories.api";
import { useMemo, useState } from "react";

type UseMenuProps = {
  categories: Category[];
};

function useMenu({ categories }: UseMenuProps) {
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

export { useMenu }