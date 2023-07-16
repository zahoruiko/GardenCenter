import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import ProductsPageTemplate from "../../components/Products/ProductsPageTemplate/ProductsPageTemplate";
import { listPartSize } from "../../config/mainConstants";
import { useAllDiscountedProductsSourceDataUrl } from "../../hooks/useAllDiscountedProductsSourceDataUrl";
import { useClearSearchFilterParams } from "../../hooks/useClearSearchFilterParams";

import {
  TRenderErrorAdditionalParams,
  TRenderLoaderAdditionalParams,
  TRenderSuccessAdditionalParams,
} from "../../components/Products/@Types/ProductTypes";

const DiscountProductsPage = () => {
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

  const dataSourceUrl = useAllDiscountedProductsSourceDataUrl(
    listCurrentPart,
    listPartSize
  );

  const pageParams: TRenderSuccessAdditionalParams = {
    title: t("allSalesPage__pageTitle"),
    description: t("allSalesPage__pageDescription"),
    showDiscountedProductsCheckbox: false,
    targetUrl: "discountProducts",
  };

  const renderLoaderAdditionalParams: TRenderLoaderAdditionalParams = {
    title: t("allSalesPage__pageTitle"),
  };

  const renderErrorAdditionalParams: TRenderErrorAdditionalParams = {
    title: t("allSalesPage__pageTitle"),
    targetUrl: "discountProducts",
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

export default DiscountProductsPage;