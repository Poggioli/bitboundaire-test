import { FC } from "react";
import { SideMenuDesktop } from "./SideMenuDesktop";
import { useSideMenu } from "./useSideMenu";
import { SideMenuMobile } from "./SideMenuMobile";

const SideMenu: FC = () => {

  const { getCategoriesApi } = useSideMenu()

  return (
    <>
      <SideMenuMobile categories={getCategoriesApi.data || []} isError={getCategoriesApi.isError} isLoading={getCategoriesApi.isLoading} isSuccess={getCategoriesApi.isSuccess} />
      <SideMenuDesktop categories={getCategoriesApi.data || []} isError={getCategoriesApi.isError} isLoading={getCategoriesApi.isLoading} isSuccess={getCategoriesApi.isSuccess} />
    </>
  )
}

export { SideMenu };
