import Contacts from '../../components/CommonComponents/Contacts';
import Footer from '../../components/CommonComponents/Footer';
import Header from '../../components/CommonComponents/Header';
import MainWrapper from '../../components/CommonComponents/MainWrapper';
import {
  ToastContainerImpl,
} from '../../components/CommonComponents/Toasts/ToastContainer';
import ProductItemContainer
  from '../../components/Products/ProductItem/ProductItemContainer';
import useScrollToTop from '../../hooks/useScrollToTop';

const ProductPage = () => {
  useScrollToTop();

  return (
    <MainWrapper>
      <Header />
      <ProductItemContainer />
      <ToastContainerImpl />
      <Contacts />
      <Footer />
    </MainWrapper>
  );
};

export default ProductPage;
