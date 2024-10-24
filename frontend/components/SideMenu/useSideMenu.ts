import { useGetCategoriesApi } from "@/apis/category/get-categories.api";

function useSideMenu() {
  const getCategoriesApi = useGetCategoriesApi({});

  return {
    getCategoriesApi
  }
}

export { useSideMenu }