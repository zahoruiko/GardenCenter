import { useEffect } from "react";
import Contacts from "../../components/CommonComponents/Contacts/Contacts";
import Footer from "../../components/CommonComponents/Footer/Footer";
import Header from "../../components/CommonComponents/Header/Header";
import MainWrapper from "../../components/CommonComponents/MainWrapper/MainWrapper";
import ProductItemContainer from "../../components/Products/ProductItem/ProductItemContainer/ProductItemContainer";

const ProductPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainWrapper>
      <Header />
      <ProductItemContainer />
      <Contacts />
      <Footer />
    </MainWrapper>
  );
};

export default ProductPage;
