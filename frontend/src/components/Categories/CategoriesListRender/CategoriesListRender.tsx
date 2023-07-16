import CategoriesListItem from "../CategoriesListItem/CategoriesListItem";

import { TCategoriesListResponse } from "../../../hooks/useRemoteDataFetch";

export type TCategoriesListRenderProps = {
  data: TCategoriesListResponse;
};

const CategoriesListRender: React.FC<TCategoriesListRenderProps> = ({
  data,
}) => {
  const dataList = data.data;
  return (
    <>
      {dataList &&
        dataList.map((data, i) => <CategoriesListItem key={i} {...data} />)}
    </>
  );
};

export default CategoriesListRender;
