import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ProductsPageTemplate from "../../components/Products/ProductsPageTemplate/ProductsPageTemplate";
import { listPartSize } from "../../config/mainConstants";
import { useAllProductsSourceDataUrl } from "../../hooks/useAllProductsSourceDataUrl";
import { useClearSearchFilterParams } from "../../hooks/useClearSearchFilterParams";

import {
  TRenderErrorAdditionalParams,
  TRenderLoaderAdditionalParams,
  TRenderSuccessAdditionalParams,
} from "../../components/Products/@Types/ProductTypes";

const AllProductsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { t } = useTranslation();

  let listCurrentPart: number;
  const queryParams = useParams();
  if (queryParams.part) {
    listCurrentPart = +queryParams.part;
  } else {
    listCurrentPart = 0;
  }

  const dataSourceUrl = useAllProductsSourceDataUrl(
    listCurrentPart,
    listPartSize
  );

  const pageParams: TRenderSuccessAdditionalParams = {
    title: t("allProductsPage__pageTitle"),
    description: t("allProductsPage__pageDescription"),
    showDiscountedProductsCheckbox: true,
    targetUrl: "allProducts",
  };

  const renderLoaderAdditionalParams: TRenderLoaderAdditionalParams = {
    title: t("allProductsPage__pageTitle"),
  };

  const renderErrorAdditionalParams: TRenderErrorAdditionalParams = {
    title: t("allProductsPage__pageTitle"),
    targetUrl: "allProducts",
  };

  useClearSearchFilterParams();

  return (
    <ProductsPageTemplate
      dataSourceUrl={dataSourceUrl}
      renderSuccessAdditionalParams={pageParams}
      renderLoaderAdditionalParams={renderLoaderAdditionalParams}
      renderErrorAdditionalParams={renderErrorAdditionalParams}
    />
  );
};

export default AllProductsPage;
