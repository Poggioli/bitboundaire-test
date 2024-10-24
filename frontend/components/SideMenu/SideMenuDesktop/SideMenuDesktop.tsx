import { Category } from "@/apis/category/get-categories.api";
import { FC } from "react";
import { Menu } from "../Menu";

type SideMenuDesktopProps = {
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
  categories: Category[];
}

const SideMenuDesktop: FC<SideMenuDesktopProps> = (props: SideMenuDesktopProps) => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-auto flex-col border-r bg-background md:flex">
      <div className="flex items-center justify-center w-full p-5 bg-primary">
        <p className="text-primary-foreground leading-7">Posts</p>
      </div>
      <Menu {...props} />
    </aside>
  )

}

export { SideMenuDesktop };
