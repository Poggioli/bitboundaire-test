import { Post } from "@/apis/category/get-posts-by-category.api";
import { FC } from "react";
import { CategoryBadge } from "../CategoryBadge";
import { usePostCard } from "./usePostCard";
import { format } from "date-fns";


type PostProps = Post

const PostCard: FC<PostProps> = ({ date, categories, description }) => {

  const { postCategories } = usePostCard({ categories })

  return (
    <div className="border-b border-input px-4 py-7 flex flex-col gap-4">
      <p className="text-primary font-semibold text-sm">{format(date, "EEEE',' LLLL do yyyy")}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="flex flex-row flex-wrap gap-2">
        {postCategories.map((category) => <CategoryBadge key={category.id} {...category} />)}
      </div>
    </div>
  )
}

export { PostCard };
