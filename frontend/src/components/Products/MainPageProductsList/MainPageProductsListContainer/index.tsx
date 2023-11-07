import DummysListRender from 'components/CommonComponents/DummysListRender';
import RemoteDataFetch from 'components/CommonComponents/RemoteDataFetch';
import ProductsListItemDummy
  from 'components/Products/ProductsListItem/ProductsListItemDummy/ProductsListItemDummy';
import ProductsListItemDummyDark
  from 'components/Products/ProductsListItem/ProductsListItemDummy/ProductsListItemDummyDark';
import ProductsListRender from 'components/Products/ProductsListRender';
import { useAppSelector } from 'redux/reduxHooks';
import { Theme } from 'redux/slices/themeSlice';
import { RootState } from 'redux/store';

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
