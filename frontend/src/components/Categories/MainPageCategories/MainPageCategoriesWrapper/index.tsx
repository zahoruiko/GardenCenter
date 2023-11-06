import React from 'react';

import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import styles from './styles.module.css';

type TMainPageCategoriesWrapperProps = {
  children: React.ReactNode;
};

const MainPageCategoriesWrapper: React.FC<TMainPageCategoriesWrapperProps> = ({
  children,
}) => {
  const { t } = useTranslation();

  return (
    <div id={styles.catalog__wrapper}>
      <div id={styles.catalog__header}>
        <div id={styles.catalog__headerTitle}>
          {t('mainPage__BesteCategoriesWrapperTitle')}
        </div>
        <div id={styles.catalog__headerButtons}>
          <NavLink to="/categories" id={styles.catalog__buttonAllCategories}>
            {t('mainPage__BesteCategoriesWrapperButtonText')}
          </NavLink>
        </div>
      </div>
      <div id={styles.catalog__categoriesListWrapper}>{children}</div>
    </div>
  );
};

export default MainPageCategoriesWrapper;
