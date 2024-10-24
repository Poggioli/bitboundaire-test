import { Category } from "@/apis/category/get-categories.api";
import { CategoryBadge } from "@/components/CategoryBadge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { PanelLeft } from "lucide-react";
import { FC } from "react";
import { useSideMenuMobile } from "./useSideMenuMobile";
import Link from "next/link";


type SideMenuMobileProps = {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  categories: Category[];
}

const SideMenuMobile: FC<SideMenuMobileProps> = ({ categories, isLoading, isError, isSuccess }) => {

  const {
    categoriesData,
    selectedRadio,
    setSelectedRadio
  } = useSideMenuMobile({ categories })

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
        <div className="flex items-center justify-center w-full p-5 bg-primary mt-4">
          <p className="text-primary-foreground leading-7">Posts</p>
        </div>
        <RadioGroup value={selectedRadio} onValueChange={setSelectedRadio} className="grid-cols-2 mb-12 mt-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all-categories" id="all-categories" />
            <Label htmlFor="all-categories">All categories</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="favorite-categories" id="favorite-categories" />
            <Label htmlFor="favorite-categories">Favorite categories</Label>
          </div>
        </RadioGroup>
        <nav className="flex flex-col items-start gap-3">
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

          {isSuccess && categoriesData.length === 0 ? (
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Empty categories!</h3>
          ) : null}

          {isSuccess && categoriesData.length > 0 ? (
            categoriesData.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <CategoryBadge  {...category} />
              </Link>
            ))
          ) : null}
        </nav>
      </SheetContent>
    </Sheet>
  )

}

export { SideMenuMobile };
