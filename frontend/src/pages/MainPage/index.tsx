import { useTranslation } from 'react-i18next';

import MainPageCategoriesContainer
  from '../../components/Categories/MainPageCategories/MainPageCategoriesContainer';
import Contacts from '../../components/CommonComponents/Contacts';
import Footer from '../../components/CommonComponents/Footer';
import Header from '../../components/CommonComponents/Header';
import MainWrapper from '../../components/CommonComponents/MainWrapper';
import PageMetaData from '../../components/CommonComponents/PageMetaData';
import {
  ToastContainerImpl,
} from '../../components/CommonComponents/Toasts/ToastContainer';
import GetDiscountForm from '../../components/GetDiscountForm';
import MainOffer from '../../components/Products/MainOffer';
import MainPageProductsListContainer
  from '../../components/Products/MainPageProductsList/MainPageProductsListContainer';
import useScrollToTop from '../../hooks/useScrollToTop';

const MainPage = () => {
  useScrollToTop();
  const { t } = useTranslation();
  const pageTitle = t('mainPage__PageTitle');
  const pageDescription = t('mainPage__PageDescription');

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
