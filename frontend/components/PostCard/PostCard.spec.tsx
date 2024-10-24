import { useParams } from "next/navigation";
import { useGetCategoriesApi } from "@/apis/category/get-categories.api";
import { render } from "@testing-library/react";
import { toDate } from "date-fns";
import { PostCard } from "./PostCard";
import { useCategoryBadge } from "../CategoryBadge/useCategoryBadge";

jest.mock("next/navigation");
jest.mock("@/apis/category/get-categories.api");
jest.mock("../CategoryBadge/useCategoryBadge");

describe("PostCard", () => {

  const post = {
    id: "123",
    description: "Cooking delicious and nutritious meals on weeknights can often feel like a daunting task. However, with a few simple strategies, it’s possible to whip up satisfying dinners in no time. One key is to plan ahead and keep a stock of versatile ingredients like pasta, canned tomatoes, and frozen vegetables. These staples can be quickly transformed into a variety of dishes, from hearty pasta bakes to stir-fries.",
    date: toDate("2024-02-12"),
    categories: [
      "1",
      "234",
      "5"
    ]
  }

  it(`GIVEN a PostCard
      WHEN render
      THEN should render the date from post
      AND render the description
      AND categories`, () => {
    (useParams as unknown as jest.Mock).mockReturnValue({
      id: "1",
    });
    (useGetCategoriesApi as unknown as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: [
        { id: "234", name: "category 234", favorite: true },
        { id: "1", name: "category 1", favorite: true },
        { id: "2", name: "category 2", favorite: true },
      ],
    });
    (useCategoryBadge as unknown as jest.Mock).mockReturnValue({
      handleOnFavoriteClick: () => null,
      updateCategoryApi: {
        isPending: false
      },
      categoryId: "1"
    })

    const { getByText } = render(<PostCard {...post} />);


    const dateText = getByText("Sunday, February 11th 2024");
    const descriptionText = getByText(post.description);
    const categoryOne = getByText("category 1");
    const categoryTwo = getByText("category 234");

    expect(dateText).toBeVisible();
    expect(descriptionText).toBeVisible();
    expect(categoryOne).toBeVisible();
    expect(categoryTwo).toBeVisible();

  });
});
