import { useAppSelector } from '../../../../redux/reduxHooks';
import { Theme } from '../../../../redux/slices/themeSlice';
import { RootState } from '../../../../redux/store';
import DummysListRender from '../../../CommonComponents/DummysListRender';
import RemoteDataFetch from '../../../CommonComponents/RemoteDataFetch';
import ProductsListItemDummy
  from '../../ProductsListItem/ProductsListItemDummy/ProductsListItemDummy';
import ProductsListItemDummyDark
  from '../../ProductsListItem/ProductsListItemDummy/ProductsListItemDummyDark';
import ProductsListRender from '../../ProductsListRender';
import MainPageProductsListWrapper from '../MainPageProductsListWrapper';

const MainPageProductsListContainer = () => {
  const dataSourceUrl = '/products/mostDiscounted';

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
