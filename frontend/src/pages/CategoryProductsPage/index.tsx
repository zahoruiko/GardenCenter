import {
  TRenderErrorAdditionalParams,
  TRenderSuccessAdditionalParams,
} from 'components/Products/@Types/ProductTypes';
import ProductsPageTemplate from 'components/Products/ProductsPageTemplate';
import { listPartSize } from 'config/mainConstants';
import { useClearSearchFilterParams } from 'hooks/useClearSearchFilterParams';
import {
  useGetCategoryPageSourceDataUrl,
} from 'hooks/useGetCategoryPageSourceDataUrl';
import useScrollToTop from 'hooks/useScrollToTop';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

const CategoryProductsPage = () => {
  useScrollToTop();

  const queryParams = useParams();
  const navigate = useNavigate();

  const queryCategoryId = queryParams.id;
  let categoryId = 1; // default value

  if (queryCategoryId) {
    categoryId = +queryCategoryId.replace(/[^0-9]/g, '');
    if (+queryCategoryId !== categoryId) navigate('/notFound');
  }

  let queryCategoryName = queryParams.categoryTitle;

  let categoryTitle = '';

  if (queryCategoryName) {
    categoryTitle = queryCategoryName.replace(/^[^!@#$%^&*()_]$/, '');
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
