import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./CategoriesPageCategoriesWrapper.module.css";

type TCategoriesPageCategoriesWrapperProps = {
  children: React.ReactNode;
};

const CategoriesPageCategoriesWrapper: React.FC<
  TCategoriesPageCategoriesWrapperProps
> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <div id={styles.catalog__wrapper}>
      <div id={styles.catalog__header}>
        <div id={styles.catalog__headerTitle}>
          {t("categoriesPage__CategoriesListTitle")}
        </div>
      </div>
      <section id={styles.catalog__categoriesListWrapper}>{children}</section>
    </div>
  );
};

export default CategoriesPageCategoriesWrapper;
