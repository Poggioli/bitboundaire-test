import { Category } from "@/apis/category/get-categories.api";
import { useMemo, useState } from "react";

type useSideMenuDesktopProps = {
  categories: Category[];
};

function useSideMenuDesktop({ categories }: useSideMenuDesktopProps) {
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

export { useSideMenuDesktop };
