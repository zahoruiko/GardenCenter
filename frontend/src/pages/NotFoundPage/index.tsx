import Contacts from '../../components/CommonComponents/Contacts';
import Footer from '../../components/CommonComponents/Footer';
import Header from '../../components/CommonComponents/Header';
import MainWrapper from '../../components/CommonComponents/MainWrapper';
import NotFoundContainer from '../../components/NotFound';
import useScrollToTop from '../../hooks/useScrollToTop';

const NotFoundPage = () => {
  useScrollToTop();

  return (
    <MainWrapper>
      <Header />
      <NotFoundContainer />
      <Contacts />
      <Footer />
    </MainWrapper>
  );
};

export default NotFoundPage;
