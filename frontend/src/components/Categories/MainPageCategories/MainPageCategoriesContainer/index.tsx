import {
  CategoriesListItemDummy,
} from 'components/Categories/CategoriesListItem/CategoriesListItemDummy/CategoriesListItemDummy';
import {
  CategoriesListItemDummyDark,
} from 'components/Categories/CategoriesListItem/CategoriesListItemDummy/CategoriesListItemDummyDark';
import CategoriesListRender from 'components/Categories/CategoriesListRender';
import DummysListRender from 'components/CommonComponents/DummysListRender';
import RemoteDataFetch from 'components/CommonComponents/RemoteDataFetch';
import { useAppSelector } from 'redux/reduxHooks';
import { Theme } from 'redux/slices/themeSlice';
import { RootState } from 'redux/store';

import MainPageCategoriesWrapper from '../MainPageCategoriesWrapper';

const MainPageCategoriesContainer = () => {
  const dataSourceUrl = '/categories/ids/1,2,3,5';

  const currentTheme = useAppSelector(
    (state: RootState) => state.theme.currentTheme
  );
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
