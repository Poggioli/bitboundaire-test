import { Category } from "@/app/apis/category/get-categories.api";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { PanelLeft } from "lucide-react";
import { FC } from "react";


type SideMenuMobileProps = {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  categories: Category[];
}

const SideMenuMobile: FC<SideMenuMobileProps> = ({ categories, isLoading, isError, isSuccess }) => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Menu</SheetDescription>
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
      </SheetContent>
    </Sheet>
  )

}

export { SideMenuMobile };
