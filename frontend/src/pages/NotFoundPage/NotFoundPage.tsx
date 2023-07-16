import { useEffect } from "react";
import Contacts from "../../components/CommonComponents/Contacts/Contacts";
import Footer from "../../components/CommonComponents/Footer/Footer";
import Header from "../../components/CommonComponents/Header/Header";
import MainWrapper from "../../components/CommonComponents/MainWrapper/MainWrapper";
import NotFoundContainer from "../../components/NotFound/NotFoundContainer";

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
