import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import ProductsPageTemplate from "../../components/Products/ProductsPageTemplate/ProductsPageTemplate";
import { listPartSize } from "../../config/mainConstants";
import { useGetCategoryPageSourceDataUrl } from "../../hooks/useGetCategoryPageSourceDataUrl";
import { useClearSearchFilterParams } from "../../hooks/useClearSearchFilterParams";

import {
  TRenderErrorAdditionalParams,
  TRenderSuccessAdditionalParams,
} from "../../components/Products/@Types/ProductTypes";

const CategoryProductsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const queryParams = useParams();
  const navigate = useNavigate();

  const queryCategoryId = queryParams.id;
  let categoryId = 1; // default value

  if (queryCategoryId) {
    categoryId = +queryCategoryId.replace(/[^0-9]/g, "");
    if (+queryCategoryId !== categoryId) navigate("/notFound");
  }

  let queryCategoryName = queryParams.categoryTitle;

  let categoryTitle = "";

  if (queryCategoryName) {
    categoryTitle = queryCategoryName.replace(/^[^!@#$%^&*()_]$/, "");
  }

  let listCurrentPart: number;
  if (queryParams.part) {
    listCurrentPart = +queryParams.part;
  } else {
    listCurrentPart = 0;
  }

  const renderLoaderAdditionalParams = { title: categoryTitle };

  const dataUrl = useGetCategoryPageSourceDataUrl(
    categoryId,
    listCurrentPart,
    listPartSize
  );

  useClearSearchFilterParams();

  const pageParams: TRenderSuccessAdditionalParams = {
    title: categoryTitle,
    description: `${categoryTitle} products`,
    showDiscountedProductsCheckbox: true,
    targetUrl: `category/${categoryId}/${categoryTitle}`,
  };

  const renderErrorAdditionalParams: TRenderErrorAdditionalParams = {
    title: categoryTitle,
    targetUrl: `category/${categoryId}/${categoryTitle}`,
  };

  return (
    <ProductsPageTemplate
      dataSourceUrl={dataUrl}
      renderSuccessAdditionalParams={pageParams}
      renderLoaderAdditionalParams={renderLoaderAdditionalParams}
      renderErrorAdditionalParams={renderErrorAdditionalParams}
    />
  );
};

export default CategoryProductsPage;
