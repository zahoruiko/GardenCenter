import CategoriesPageCategoriesContainer from "../../components/Categories/CategoriesPageCategories/CategoriesPageCategoriesContainer/CategoriesPageCategoriesContainer";
import Contacts from "../../components/CommonComponents/Contacts/Contacts";
import Header from "../../components/CommonComponents/Header/Header";
import MainWrapper from "../../components/CommonComponents/MainWrapper/MainWrapper";
import Footer from "../../components/CommonComponents/Footer/Footer";
import { useEffect } from "react";

const CategoriesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainWrapper>
      <Header />
      <CategoriesPageCategoriesContainer />
      <Contacts />
      <Footer />
    </MainWrapper>
  );
};

export default CategoriesPage;
