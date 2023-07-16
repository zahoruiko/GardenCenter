import ProductsListItem from "../ProductsListItem/ProductsListItem";
import { ToastContainerImpl } from "../../CommonComponents/Toasts/ToastContainer/ToastContainer";

import { TProductsListResponse } from "../../../hooks/useRemoteDataFetch";

export type TProductsListRenderProps = {
  data: TProductsListResponse;
};

const ProductsListRender: React.FC<TProductsListRenderProps> = ({ data }) => {
  let dataList = data.data;
  return (
    <>
      {dataList &&
        dataList.map((data, i) => <ProductsListItem key={i} {...data} />)}
      <ToastContainerImpl />
    </>
  );
};

export default ProductsListRender;
