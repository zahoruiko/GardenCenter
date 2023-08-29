import React from "react";

import Contacts from "../../CommonComponents/Contacts/Contacts";
import Footer from "../../CommonComponents/Footer/Footer";
import Header from "../../CommonComponents/Header/Header";
import MainWrapper from "../../CommonComponents/MainWrapper/MainWrapper";
import ProductsPageProductsListDataFetch from "../ProductsPageProductsList/ProductsPageProductsListDataFetch/ProductsPageProductsListDataFetch";

import {
  TRenderErrorAdditionalParams,
  TRenderLoaderAdditionalParams,
  TRenderSuccessAdditionalParams,
} from "../@Types/ProductTypes";
import { ToastContainerImpl } from "../../CommonComponents/Toasts/ToastContainer/ToastContainer";

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
