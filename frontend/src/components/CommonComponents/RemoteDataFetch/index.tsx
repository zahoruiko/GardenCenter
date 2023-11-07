import { Dispatch, FC } from 'react';

import { UseTranslationResponse } from 'react-i18next';
import { NavigateFunction, Params } from 'react-router-dom';
import { AnyAction } from 'redux';

import { useRemoteDataFetch } from 'hooks/useRemoteDataFetch';
import { TCartItem } from 'redux/slices/cartSlice';
import { TCategoriesListRenderProps } from 'components/Categories/CategoriesListRender';
import {
  TRenderErrorAdditionalParams,
  TRenderSuccessAdditionalParams,
} from 'components/Products/@Types/ProductTypes';
import { TProductsListRenderProps } from 'components/Products/ProductsListRender';
import {
  TProductsPageProductsListContainerProps,
  TProductsPageProductsListWrapperHooks,
} from 'components/Products/ProductsPageProductsList/ProductsPageProductsListContainer';
import { TProductItemWrapperProps } from 'components/Products/ProductItem/ProductItemWrapper';

type TRemoteDataFetchProps = {
  uri: string;
  renderSuccess:
    | FC<TCategoriesListRenderProps>
    | FC<TProductsListRenderProps>
    | FC<TProductsPageProductsListContainerProps>
    | FC<TProductItemWrapperProps>;
  renderSuccessAdditionalParams?: TRenderSuccessAdditionalParams;
  loadingFallback: JSX.Element;
  renderError?: any;
  renderErrorAdditionalParams?: TRenderErrorAdditionalParams;
  hooks?: TRenderHooks;
};

type TRenderHooks = TProductsPageProductsListWrapperHooks & {
  dispatch?: Dispatch<AnyAction>;
  navigate?: NavigateFunction;
  queryParams?: Readonly<Params<string>>;
  productInCart?: TCartItem;
  translation?: UseTranslationResponse<'translation', undefined>;
};

const RemoteDataFetch: FC<TRemoteDataFetchProps> = ({
  uri,
  renderSuccess,
  renderSuccessAdditionalParams,
  loadingFallback,
  renderError = (error: string) => <div>{JSON.stringify(error, null, 2)}</div>,
  renderErrorAdditionalParams,
  hooks,
}) => {
  const { loading, data, error } = useRemoteDataFetch(uri);

  if (loading) {
    return loadingFallback;
  }

  if (error) {
    return renderError({ ...error, hooks, renderErrorAdditionalParams });
  }

  if (data) {
    return renderSuccess({ ...data, hooks, renderSuccessAdditionalParams });
  }
};

export default RemoteDataFetch;
