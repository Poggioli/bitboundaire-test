import { FC } from "react";
import { PostCard } from "../PostCard";
import { Skeleton } from "../ui/skeleton";
import { usePostsList } from "./usePostsList";
import { cn } from "@/lib/utils";

const PostsList: FC = () => {

  const {
    isLoading,
    isError,
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
          ) : (
            <p className="leading-7 font-medium text-muted-foreground">Found {data!.length} posts of &quot;{category!.name}&quot;</p>
          )}
        </div>
        <div className={cn("flex flex-col px-4", !isLoading && !data?.length && "items-center justify-center p-8")}>
          {isLoading ? (
            Array(10).fill(0).map((_, index) => (
              <div key={index} className="border-b border-input px-4 py-7 flex flex-col gap-4">
                <Skeleton className="h-6 w-28" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-[50%]" />
                </div>
                <div className="flex flex-row flex-wrap gap-2">
                  {Array(3).fill(0).map((_, index) => <Skeleton key={index} className="h-9 w-20" />)}
                </div>
              </div>
            ))
          ) : null}

          {!isLoading && !!data!.length ? (
            data!.map((post) => <PostCard key={post.id} {...post} />)
          ) : null}

          {!isLoading && !data!.length ? (
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Empty posts!</h3>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export { PostsList };
