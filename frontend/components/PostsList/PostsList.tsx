import { FC } from "react";
import { Skeleton } from "../ui/skeleton";
import { usePostsList } from "./usePostsList";

const PostsList: FC = () => {

  const {
    isLoading,
    isError,
    isSuccess,
    category,
    getPostsByCategoryApi: {
      data
    }
  } = usePostsList();

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Oops!</h3>
        <p className="leading-7">Something went wrong.</p>
      </div>
    )
  }

  return (
    <div className="mt-8">
      <div className="border border-input rounded-md">
        <div className="py-5 px-8 border-b border-input">
          {isLoading ? (
            <Skeleton className="h-7 w-64" />
          ) : null}
          {isSuccess ? (
            <p className="leading-7 font-medium text-muted-foreground">Found {data!.length} posts of &quot;{category!.name}&quot;</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { PostsList };
