import { renderHook } from "@testing-library/react";
import { usePostCard } from "./usePostCard";
import { useParams } from "next/navigation";
import { useGetCategoriesApi } from "@/apis/category/get-categories.api";

jest.mock("next/navigation");
jest.mock("@/apis/category/get-categories.api");

describe("usePostCard", () => {
  const categories: string[] = ["234", "1"];

  it(`GIVEN a usePostCard
      WHEN useGetCategoriesApi isLoading
      THEN should return empty array`, () => {
    (useParams as unknown as jest.Mock).mockReturnValue({
      id: "1",
    });
    (useGetCategoriesApi as unknown as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: [],
    });
    const { result } = renderHook(() => usePostCard({ categories }));
    expect(result.current.postCategories).toStrictEqual([]);
  });

  it(`GIVEN a usePostCard
      WHEN useGetCategoriesApi isError
      THEN should return empty array`, () => {
    (useParams as unknown as jest.Mock).mockReturnValue({
      id: "1",
    });
    (useGetCategoriesApi as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: [],
    });
    const { result } = renderHook(() => usePostCard({ categories }));
    expect(result.current.postCategories).toStrictEqual([]);
  });

  it(`GIVEN a usePostCard
      WHEN categoryId is finded in post categories
      THEN should put that category in first`, () => {
    (useParams as unknown as jest.Mock).mockReturnValue({
      id: "1",
    });
    (useGetCategoriesApi as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        { id: "234", name: "category 234" },
        { id: "1", name: "category 1" },
        { id: "2", name: "category 2" },
      ],
    });
    const { result } = renderHook(() => usePostCard({ categories }));
    expect(result.current.postCategories).toStrictEqual([
      { id: "1", name: "category 1" },
      { id: "234", name: "category 234" },
    ]);
  });

  it(`GIVEN a usePostCard
      WHEN categoryId is NOT finded in post categories
      THEN should return only the categories`, () => {
    (useParams as unknown as jest.Mock).mockReturnValue({
      id: "5",
    });
    (useGetCategoriesApi as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        { id: "234", name: "category 234" },
        { id: "1", name: "category 1" },
        { id: "2", name: "category 2" },
      ],
    });
    const { result } = renderHook(() => usePostCard({ categories }));
    expect(result.current.postCategories).toStrictEqual([
      { id: "234", name: "category 234" },
      { id: "1", name: "category 1" },
    ]);
  });
});
