import { FC } from "react";

type CategoryByIdPageProps = {
  params: {
    id: string
  }
}

const CategoryByIdPage: FC<CategoryByIdPageProps> = ({ params: { id } }) => {
  return <p className="leading-7">{id}</p>
}

export default CategoryByIdPage