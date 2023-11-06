import { useTranslation } from 'react-i18next';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import { useAppSelector } from '../../../../redux/reduxHooks';
import { Theme } from '../../../../redux/slices/themeSlice';
import { RootState } from '../../../../redux/store';
import DummysListRender from '../../../CommonComponents/DummysListRender';
import PageMetaData from '../../../CommonComponents/PageMetaData';
import RemoteDataFetch from '../../../CommonComponents/RemoteDataFetch';
import {
  CategoriesListItemDummy,
} from '../../CategoriesListItem/CategoriesListItemDummy/CategoriesListItemDummy';
import {
  CategoriesListItemDummyDark,
} from '../../CategoriesListItem/CategoriesListItemDummy/CategoriesListItemDummyDark';
import CategoriesListRender from '../../CategoriesListRender';
import CategoriesPageCategoriesWrapper
  from '../CategoriesPageCategoriesWrapper';

const getCategoriesListItemDummy = (currentTheme: Theme) => {
  if (currentTheme === Theme.LIGHT) {
    return CategoriesListItemDummy;
  } else {
    return CategoriesListItemDummyDark;
  }
};

const CategoriesPageCategoriesContainer = () => {
  const { t } = useTranslation();
  const pageTitle = t('categoriesPage__PageTitle');
  const pageDescription = t('categoriesPage__PageDesccription');
  const dataSourceUrl = '/categories/all';
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
