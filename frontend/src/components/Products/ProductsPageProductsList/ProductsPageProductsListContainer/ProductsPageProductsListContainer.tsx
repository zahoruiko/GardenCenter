import React from "react";
import { NavigateFunction } from "react-router-dom";

import ProductsPageProductsListWrapper from "../ProductsPageProductsListWrapper/ProductsPageProductsListWrapper";
import { sanitizeCharsNumbersSpezChars } from "../../../../utils/filterSpecialChars";

import { TCategoryItem } from "../../../Categories/@Types/CategoryTypes";
import {
  TProductItem,
  TRenderErrorAdditionalParams,
  TRenderLoaderAdditionalParams,
  TRenderSuccessAdditionalParams,
} from "../../@Types/ProductTypes";

export type TProductsPageProductsListContainerProps = {
  data?: TProductsListData;
  renderSuccessAdditionalParams?: TRenderSuccessAdditionalParams;
  renderLoaderAdditionalParams?: TRenderLoaderAdditionalParams;
  renderErrorAdditionalParams?: TRenderErrorAdditionalParams;
  hooks?: TProductsPageProductsListWrapperHooks;
  code?: string;
};

export type TProductsListData = {
  status: string;
  category?: TCategoryItem;
  itemsAmount: number;
  data: TProductItem[];
};

type TQueryParams = {
  id?: number;
  part?: number;
  categoryTitle?: string | undefined;
};

export type TProductsPageProductsListWrapperHooks = {
  navigate: NavigateFunction;
  queryParams: TQueryParams;
};

const ProductsPageProductsListContainer: React.FC<
  TProductsPageProductsListContainerProps
> = (props) => {
  const {
    data,
    renderSuccessAdditionalParams,
    renderLoaderAdditionalParams,
    renderErrorAdditionalParams,
    hooks,
    code,
  } = props;

  let showDiscountedProductsCheckbox = true;
  let pageTitle = "",
    pageDescription = "",
    targetUrl = "";

  if (renderSuccessAdditionalParams) {
    pageTitle = renderSuccessAdditionalParams.title;
    pageDescription = renderSuccessAdditionalParams.description;
    showDiscountedProductsCheckbox =
      renderSuccessAdditionalParams.showDiscountedProductsCheckbox;
    targetUrl = renderSuccessAdditionalParams.targetUrl;
  } else {
    if (renderErrorAdditionalParams?.targetUrl)
      targetUrl = renderErrorAdditionalParams.targetUrl;
    if (data?.category) {
      // If we output the products of the catalog section
      pageTitle = data.category.title;
      pageDescription = "Products of the category: " + pageTitle;
    } else {
      if (renderLoaderAdditionalParams?.title)
        pageTitle = sanitizeCharsNumbersSpezChars(
          renderLoaderAdditionalParams.title
        );
      else {
        // If you were looking for products in the catalog section and did not find them,
        // then on the error page we use the title from the text in the query string
        if (hooks?.queryParams?.categoryTitle) {
          pageTitle = sanitizeCharsNumbersSpezChars(
            hooks.queryParams.categoryTitle
          );
        } else {
          // If no products were found on the "all products" and "all sales" pages,
          // then it is necessary to display the correct titles for these pages
          if (renderErrorAdditionalParams?.title) {
            pageTitle = renderErrorAdditionalParams?.title;
          } else {
            // In other cases, we output the standard header
            pageTitle = "Products";
            // pageTitle = t('productsList__StandartPageTitle');
          }
        }
      }
    }
  }

  // Redirect to the right category name URL
  if (data) {
    // Redirect to the right url only for category pages (not for "All products" and "Discounted products" pages)
    if (Object.keys(data).includes("category")) {
      if (hooks) {
        const { queryParams, navigate } = hooks;
        if (queryParams.categoryTitle) {
          if (
            sanitizeCharsNumbersSpezChars(queryParams.categoryTitle) !==
            pageTitle
          ) {
            if (data.category) {
              // If the name of the section does not match the name in the query string,
              // then we redirect the user to the page with the correct name
              navigate(`/category/${data.category.id}/${pageTitle}/`);
            }
          }
        } else {
          if (data.category?.id) {
            navigate(`/category/${data.category.id}/${pageTitle}/`);
          }
        }
      }
    }
  }

  return (
    <ProductsPageProductsListWrapper
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      showDiscountedProductsCheckbox={showDiscountedProductsCheckbox}
      code={code}
      data={data}
      targetUrl={targetUrl}
    />
  );
};

export default ProductsPageProductsListContainer;
