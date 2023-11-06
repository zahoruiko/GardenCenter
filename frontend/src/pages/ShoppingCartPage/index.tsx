import Contacts from '../../components/CommonComponents/Contacts';
import Footer from '../../components/CommonComponents/Footer';
import Header from '../../components/CommonComponents/Header';
import MainWrapper from '../../components/CommonComponents/MainWrapper';
import ShoppingCartContainer
  from '../../components/ShoppingCart/ShoppingCartContainer';
import useScrollToTop from '../../hooks/useScrollToTop';

const ShoppingCartPage = () => {
  useScrollToTop();

  return (
    <MainWrapper>
      <Header />
      <ShoppingCartContainer />
      <Contacts />
      <Footer />
    </MainWrapper>
  );
};

export default ShoppingCartPage;
