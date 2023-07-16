import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./MainPageProductsListWrapper.module.css";

type TMainPageProductsListWrapperProps = {
  children: React.ReactNode;
};

const MainPageProductsListWrapper: React.FC<
  TMainPageProductsListWrapperProps
> = ({ children }) => {
  const { t } = useTranslation();
  return (
    <div id={styles.offers__mainWrapper}>
      <div id={styles.offers__saleTitle}>
        {t("mainPage__ProductsListTitle")}
      </div>
      <div id={styles.offers__listWrapper}>{children}</div>
    </div>
  );
};

export default MainPageProductsListWrapper;
