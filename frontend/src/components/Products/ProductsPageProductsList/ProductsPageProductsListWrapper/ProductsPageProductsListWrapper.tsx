import React from "react";
import { useParams } from "react-router-dom";

import DummysListRender from "../../../CommonComponents/DummysListRender/DummysListRender";
import PageMetaData from "../../../CommonComponents/PageMetaData/PageMetaData";
import Paginator from "../../../CommonComponents/Pagination/Paginator";
import ProductsListRender from "../../ProductsListRender/ProductsListRender";
import ProductsListItemDummy from "../../ProductsListItem/ProductsListItemDummy/ProductsListItemDummy";
import ProductsListItemDummyDark from "../../ProductsListItem/ProductsListItemDummy/ProductsListItemDummyDark";
import ProductsListFilterForm from "../ProductsListFilterForm/ProductsListFilterForm";
import ProductsPageProductsListNotFound from "../ProductsPageProductsListNotFound/ProductsPageProductsListNotFound";
import { RootState } from "../../../../redux/store";
import { Theme } from "../../../../redux/slices/themeSlice";
import { listPartSize } from "../../../../config/mainConstants";
import { useAppSelector } from "../../../../redux/reduxHooks";

import styles from "./ProductsPageProductsListWrapper.module.css";

import { TProductsListData } from "../ProductsPageProductsListContainer/ProductsPageProductsListContainer";

export type TProductsPageProductsListWrapperProps = {
  pageTitle: string;
  pageDescription: string;
  showDiscountedProductsCheckbox: boolean;
  code?: string;
  data?: TProductsListData;
  targetUrl: string;
};

const getProductsListItemDummy = (currentTheme: Theme) => {
  if (currentTheme === Theme.LIGHT) {
    return ProductsListItemDummy;
  } else {
    return ProductsListItemDummyDark;
  }
};

const useGetCurrentPageNumber = () => {
  const queryParams = useParams();
  if (queryParams.part) {
    return +queryParams.part;
  } else {
    return 0;
  }
};

const ProductsPageProductsListWrapper: React.FC<
  TProductsPageProductsListWrapperProps
> = ({
  pageTitle,
  pageDescription,
  showDiscountedProductsCheckbox,
  code,
  data,
  targetUrl,
}) => {
  const currentTheme = useAppSelector(
    (state: RootState) => state.theme.currentTheme
  );
  const ProductsListItemDummy = getProductsListItemDummy(currentTheme);
  const listCurrentPart = useGetCurrentPageNumber();

  return (
    <>
      <PageMetaData title={pageTitle} description={pageDescription} />
      <div id={styles.offers__mainWrapper}>
        <div id={styles.offers__categoryTitle}>{pageTitle}</div>
        <ProductsListFilterForm
          showDiscountedProductsCheckbox={showDiscountedProductsCheckbox}
          targetUrl={targetUrl}
        />
        <section id={styles.offers__listWrapper}>
          {code === "ERR_BAD_REQUEST" ? (
            <ProductsPageProductsListNotFound />
          ) : data ? (
            <ProductsListRender data={data} />
          ) : (
            <DummysListRender listItem={ProductsListItemDummy} />
          )}
        </section>
        {code !== "ERR_BAD_REQUEST" && data && (
          <Paginator
            targetUrl={targetUrl}
            items_amount={data.itemsAmount}
            part_size={listPartSize}
            current_part={listCurrentPart}
          />
        )}
      </div>
    </>
  );
};

export default ProductsPageProductsListWrapper;
