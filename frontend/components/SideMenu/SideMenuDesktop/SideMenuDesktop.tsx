import { Category } from "@/app/apis/category/get-categories.api";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";


type SideMenuDesktopProps = {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  categories: Category[];
}

const SideMenuDesktop: FC<SideMenuDesktopProps> = ({ categories, isLoading, isError, isSuccess }) => {

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-auto flex-col border-r bg-background sm:flex">
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

        {isSuccess && categories.length === 0 ? (
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Empty categories!</h3>
        ) : null}

        {isSuccess && categories.length > 0 ? (
          categories.map((category) => (
            <CategoryBadge key={category.id} {...category} />
          ))
        ) : null}
      </nav>
    </aside>
  )

}

export { SideMenuDesktop };
