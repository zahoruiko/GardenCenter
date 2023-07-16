import DummysListRender from "../../../CommonComponents/DummysListRender/DummysListRender";
import MainPageProductsListWrapper from "../MainPageProductsListWrapper/MainPageProductsListWrapper";
import ProductsListItemDummy from "../../ProductsListItem/ProductsListItemDummy/ProductsListItemDummy";
import ProductsListItemDummyDark from "../../ProductsListItem/ProductsListItemDummy/ProductsListItemDummyDark";
import ProductsListRender from "../../ProductsListRender/ProductsListRender";
import RemoteDataFetch from "../../../CommonComponents/RemoteDataFetch/RemoteDataFetch";
import { RootState } from "../../../../redux/store";
import { Theme } from "../../../../redux/slices/themeSlice";
import { useAppSelector } from "../../../../redux/reduxHooks";

const MainPageProductsListContainer = () => {
  const dataSourceUrl = "/products/mostDiscounted";

  const currentTheme = useAppSelector(
    (state: RootState) => state.theme.currentTheme
  );
  let ProductsListItemDummyTemplate;
  if (currentTheme === Theme.LIGHT) {
    ProductsListItemDummyTemplate = ProductsListItemDummy;
  } else {
    ProductsListItemDummyTemplate = ProductsListItemDummyDark;
  }

  return (
    <MainPageProductsListWrapper>
      <RemoteDataFetch
        uri={dataSourceUrl}
        renderSuccess={ProductsListRender}
        loadingFallback={
          <DummysListRender
            listItem={ProductsListItemDummyTemplate}
            shortList={true}
          />
        }
      />
    </MainPageProductsListWrapper>
  );
};

export default MainPageProductsListContainer;
