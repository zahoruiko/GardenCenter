import { AnyAction } from "redux";
import { Dispatch, FC } from "react";
import { NavigateFunction, Params } from "react-router-dom";
import { UseTranslationResponse } from "react-i18next";

import { useRemoteDataFetch } from "../../../hooks/useRemoteDataFetch";

import { TCartItem } from "../../../redux/slices/cartSlice";
import { TCategoriesListRenderProps } from "../../Categories/CategoriesListRender/CategoriesListRender";
import { TProductItemWrapperProps } from "../../Products/ProductItem/ProductItemWrapper/ProductItemWrapper";
import {
  TProductsPageProductsListContainerProps,
  TProductsPageProductsListWrapperHooks,
} from "../../Products/ProductsPageProductsList/ProductsPageProductsListContainer/ProductsPageProductsListContainer";
import { TProductsListRenderProps } from "../../Products/ProductsListRender/ProductsListRender";
import {
  TRenderErrorAdditionalParams,
  TRenderSuccessAdditionalParams,
} from "../../Products/@Types/ProductTypes";

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
  // renderError?:
  //   | FC<TCategoriesListRenderProps>
  //   | FC<TProductsListRenderProps>
  //   | FC<TProductsPageProductsListContainerProps>
  //   | FC<TProductItemWrapperProps>;
  renderErrorAdditionalParams?: TRenderErrorAdditionalParams;
  hooks?: TRenderHooks;
};

type TRenderHooks = TProductsPageProductsListWrapperHooks & {
  dispatch?: Dispatch<AnyAction>;
  navigate?: NavigateFunction;
  queryParams?: Readonly<Params<string>>;
  productInCart?: TCartItem;
  translation?: UseTranslationResponse<"translation", undefined>;
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
