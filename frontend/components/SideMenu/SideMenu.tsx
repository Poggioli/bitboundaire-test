import { FC } from "react";
import { SideMenuDesktop } from "./SideMenuDesktop";
import { useSideMenu } from "./useSideMenu";

const SideMenu: FC = () => {

  const { getCategoriesApi } = useSideMenu()

  return <SideMenuDesktop categories={getCategoriesApi.data || []} isError={getCategoriesApi.isError} isLoading={getCategoriesApi.isLoading} isSuccess={getCategoriesApi.isSuccess}/>
}

export { SideMenu };
