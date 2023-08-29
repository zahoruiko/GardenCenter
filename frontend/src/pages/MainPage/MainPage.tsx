import { useTranslation } from "react-i18next";

import Contacts from "../../components/CommonComponents/Contacts/Contacts";
import Footer from "../../components/CommonComponents/Footer/Footer";
import GetDiscountForm from "../../components/GetDiscountForm/GetDiscountFormWrapper";
import Header from "../../components/CommonComponents/Header/Header";
import MainOffer from "../../components/Products/MainOffer/MainOffer";
import MainWrapper from "../../components/CommonComponents/MainWrapper/MainWrapper";
import MainPageProductsListContainer from "../../components/Products/MainPageProductsList/MainPageProductsListContainer/MainPageProductsListContainer";
import MainPageCategoriesContainer from "../../components/Categories/MainPageCategories/MainPageCategoriesContainer/MainPageCategoriesContainer";
import PageMetaData from "../../components/CommonComponents/PageMetaData/PageMetaData";
import { ToastContainerImpl } from "../../components/CommonComponents/Toasts/ToastContainer/ToastContainer";

const MainPage = () => {
  const { t } = useTranslation();
  const pageTitle = t("mainPage__PageTitle");
  const pageDescription = t("mainPage__PageDescription");

  return (
    <MainWrapper>
      <PageMetaData title={pageTitle} description={pageDescription} />
      <Header />
      <MainOffer />
      <MainPageCategoriesContainer />
      <GetDiscountForm />
      <MainPageProductsListContainer />
      <ToastContainerImpl />
      <Contacts />
      <Footer />
    </MainWrapper>
  );
};

export default MainPage;
