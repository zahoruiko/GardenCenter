import { TProductsListResponse } from '../../../hooks/useRemoteDataFetch';
import ProductsListItem from '../ProductsListItem';

export type TProductsListRenderProps = {
  data: TProductsListResponse;
};

const ProductsListRender: React.FC<TProductsListRenderProps> = ({ data }) => {
  let dataList = data.data;
  return (
    <>
      {dataList &&
        dataList.map((data, i) => <ProductsListItem key={i} {...data} />)}
    </>
  );
};

export default ProductsListRender;
