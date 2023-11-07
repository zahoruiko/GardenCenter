import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import ProductsPageProductsListWrapper from '../ProductsPageProductsListContainer';
import RemoteDataFetch from 'components/CommonComponents/RemoteDataFetch';
import {
  TRenderErrorAdditionalParams,
  TRenderLoaderAdditionalParams,
  TRenderSuccessAdditionalParams,
} from 'components/Products/@Types/ProductTypes';

type TProductsPageProductsListContainerProps = {
  dataSourceUrl: string;
  renderSuccessAdditionalParams?: TRenderSuccessAdditionalParams;
  renderLoaderAdditionalParams?: TRenderLoaderAdditionalParams;
  renderErrorAdditionalParams?: TRenderErrorAdditionalParams;
};

const ProductsPageProductsListDataFetch: React.FC<
  TProductsPageProductsListContainerProps
> = ({
  dataSourceUrl,
  renderSuccessAdditionalParams,
  renderLoaderAdditionalParams,
  renderErrorAdditionalParams,
}) => {
  const queryParams = useParams();
  const navigate = useNavigate();
  return (
    <RemoteDataFetch
      uri={dataSourceUrl}
      renderSuccess={ProductsPageProductsListWrapper}
      renderSuccessAdditionalParams={renderSuccessAdditionalParams}
      loadingFallback={
        <ProductsPageProductsListWrapper
          renderLoaderAdditionalParams={renderLoaderAdditionalParams}
        />
      }
      renderError={ProductsPageProductsListWrapper}
      renderErrorAdditionalParams={renderErrorAdditionalParams}
      hooks={{ navigate, queryParams }}
    />
  );
};

export default ProductsPageProductsListDataFetch;
