import React from 'react';

import Contacts from '../../CommonComponents/Contacts';
import Footer from '../../CommonComponents/Footer';
import Header from '../../CommonComponents/Header';
import MainWrapper from '../../CommonComponents/MainWrapper';
import {
  ToastContainerImpl,
} from '../../CommonComponents/Toasts/ToastContainer';
import {
  TRenderErrorAdditionalParams,
  TRenderLoaderAdditionalParams,
  TRenderSuccessAdditionalParams,
} from '../@Types/ProductTypes';
import ProductsPageProductsListDataFetch
  from '../ProductsPageProductsList/ProductsPageProductsListDataFetch';

type TProductsPageTemplateProps = {
  dataSourceUrl: string;
  renderSuccessAdditionalParams?: TRenderSuccessAdditionalParams;
  renderLoaderAdditionalParams?: TRenderLoaderAdditionalParams;
  renderErrorAdditionalParams?: TRenderErrorAdditionalParams;
};

const ProductsPageTemplate: React.FC<TProductsPageTemplateProps> = ({
  dataSourceUrl,
  renderSuccessAdditionalParams,
  renderLoaderAdditionalParams,
  renderErrorAdditionalParams,
}) => {
  return (
    <>
      <MainWrapper>
        <Header />
        <ProductsPageProductsListDataFetch
          dataSourceUrl={dataSourceUrl}
          renderSuccessAdditionalParams={renderSuccessAdditionalParams}
          renderLoaderAdditionalParams={renderLoaderAdditionalParams}
          renderErrorAdditionalParams={renderErrorAdditionalParams}
        />
        <ToastContainerImpl />
        <Contacts />
        <Footer />
      </MainWrapper>
    </>
  );
};

export default ProductsPageTemplate;
