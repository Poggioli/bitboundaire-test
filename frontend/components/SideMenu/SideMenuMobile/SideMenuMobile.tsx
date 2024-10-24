import { Category } from "@/apis/category/get-categories.api";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Cross2Icon } from "@radix-ui/react-icons";
import { PanelLeft } from "lucide-react";
import { FC } from "react";
import { Menu } from "../Menu";

type SideMenuMobileProps = {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  categories: Category[];
}

const SideMenuMobile: FC<SideMenuMobileProps> = (props: SideMenuMobileProps) => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="md:hidden">
          <PanelLeft className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs p-0">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Menu</SheetDescription>
        <SheetClose className="text-primary-foreground absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <Cross2Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
        <div className="flex items-center justify-center w-full p-5 bg-primary">
          <p className="text-primary-foreground leading-7">Posts</p>
        </div>
        <div className="px-4">
          <Menu {...props} />
        </div>
      </SheetContent>
    </Sheet>
  )

}

export { SideMenuMobile };
