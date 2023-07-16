import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import CategoriesListRender from "../../CategoriesListRender/CategoriesListRender";
import CategoriesPageCategoriesWrapper from "../CategoriesPageCategoriesWrapper/CategoriesPageCategoriesWrapper";
import DummysListRender from "../../../CommonComponents/DummysListRender/DummysListRender";
import PageMetaData from "../../../CommonComponents/PageMetaData/PageMetaData";
import RemoteDataFetch from "../../../CommonComponents/RemoteDataFetch/RemoteDataFetch";
import { CategoriesListItemDummy } from "../../CategoriesListItem/CategoriesListItemDummy/CategoriesListItemDummy";
import { CategoriesListItemDummyDark } from "../../CategoriesListItem/CategoriesListItemDummy/CategoriesListItemDummyDark";
import { RootState } from "../../../../redux/store";
import { Theme } from "../../../../redux/slices/themeSlice";
import { useAppSelector } from "../../../../redux/reduxHooks";

const getCategoriesListItemDummy = (currentTheme: Theme) => {
  if (currentTheme === Theme.LIGHT) {
    return CategoriesListItemDummy;
  } else {
    return CategoriesListItemDummyDark;
  }
};

const CategoriesPageCategoriesContainer = () => {
  const { t } = useTranslation();
  const pageTitle = t("categoriesPage__PageTitle");
  const pageDescription = t("categoriesPage__PageDesccription");
  const dataSourceUrl = "/categories/all";
  const queryParams = useParams();
  const navigate = useNavigate();
  const currentTheme = useAppSelector(
    (state: RootState) => state.theme.currentTheme
  );
  const CategoriesListItemDummy = getCategoriesListItemDummy(currentTheme);

  return (
    <>
      <PageMetaData title={pageTitle} description={pageDescription} />
      <CategoriesPageCategoriesWrapper>
        <RemoteDataFetch
          uri={dataSourceUrl}
          renderSuccess={CategoriesListRender}
          loadingFallback={
            <DummysListRender listItem={CategoriesListItemDummy} />
          }
          hooks={{ navigate, queryParams }}
        />
      </CategoriesPageCategoriesWrapper>
    </>
  );
};

export default CategoriesPageCategoriesContainer;
