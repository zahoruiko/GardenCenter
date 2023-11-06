import CategoriesPageCategoriesContainer
  from '../../components/Categories/CategoriesPageCategories/CategoriesPageCategoriesContainer';
import Contacts from '../../components/CommonComponents/Contacts';
import Footer from '../../components/CommonComponents/Footer';
import Header from '../../components/CommonComponents/Header';
import MainWrapper from '../../components/CommonComponents/MainWrapper';
import useScrollToTop from '../../hooks/useScrollToTop';

const CategoriesPage = () => {
  useScrollToTop();

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
