import CategoriesListRender from "../../CategoriesListRender/CategoriesListRender";
import DummysListRender from "../../../CommonComponents/DummysListRender/DummysListRender";
import MainPageCategoriesWrapper from "../MainPageCategoriesWrapper/MainPageCategoriesWrapper";
import RemoteDataFetch from "../../../CommonComponents/RemoteDataFetch/RemoteDataFetch";
import { CategoriesListItemDummy } from "../../CategoriesListItem/CategoriesListItemDummy/CategoriesListItemDummy";
import { CategoriesListItemDummyDark } from "../../CategoriesListItem/CategoriesListItemDummy/CategoriesListItemDummyDark";
import { RootState } from "../../../../redux/store";
import { Theme } from "../../../../redux/slices/themeSlice";
import { useAppSelector } from "../../../../redux/reduxHooks";

const MainPageCategoriesContainer = () => {
  const dataSourceUrl = "/categories/ids/1,2,3,5";

  const currentTheme = useAppSelector((state: RootState) => state.theme.currentTheme);
  let CategoriesListItemDummyTemplate;
  if (currentTheme === Theme.LIGHT) {
    CategoriesListItemDummyTemplate = CategoriesListItemDummy;
  } else {
    CategoriesListItemDummyTemplate = CategoriesListItemDummyDark;
  }

  return (
    <MainPageCategoriesWrapper>
      <RemoteDataFetch
        uri={dataSourceUrl}
        renderSuccess={CategoriesListRender}
        loadingFallback={
          <DummysListRender
            listItem={CategoriesListItemDummyTemplate}
            shortList={true}
          />
        }
      />
    </MainPageCategoriesWrapper>
  );
};

export default MainPageCategoriesContainer;
