import React from "react";
import { TiDelete } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AppDispatch } from "../../../../redux/store";
import {
  setMinPrice,
  setMaxPrice,
  setShowOnlyDiscountedProducts,
  setSortMode,
} from "../../../../redux/slices/productsListFilterSlice";
import { setSearchTerm } from "../../../../redux/slices/searchProductsSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/reduxHooks";

import styles from "./ProductsListFilterForm.module.css";

type TProductsListFilterFormProps = {
  showDiscountedProductsCheckbox: boolean;
  targetUrl: string;
};

const ProductsListFilterForm: React.FC<TProductsListFilterFormProps> = ({
  showDiscountedProductsCheckbox,
  targetUrl,
}) => {
  const firstPartUrl = `/${targetUrl}/`;

  const navigate = useNavigate();
  const { t } = useTranslation();
  const currentMinPriceState = useAppSelector((state) => state.sort.minPrice);
  const currentMaxPriceState = useAppSelector((state) => state.sort.maxPrice);
  const currentShowOnlyDiscountedProductsState = useAppSelector(
    (state) => state.sort.showOnlyDiscountedProducts
  );
  const currentSortModeState = useAppSelector((state) => state.sort.sortMode);
  const currentSearchTermState = useAppSelector(
    (state) => state.search.searchTerm
  );

  const dispatch: AppDispatch = useAppDispatch();

  const handleChangeMinPrice = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setMinPrice(e.currentTarget.value));
    navigate(firstPartUrl);
  };

  const handleChangeMaxPrice = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setMaxPrice(e.currentTarget.value));
    navigate(firstPartUrl);
  };

  const handleChangeShowOnlyDiscountedProducts = () => {
    dispatch(
      setShowOnlyDiscountedProducts(!currentShowOnlyDiscountedProductsState)
    );
    navigate(firstPartUrl);
  };

  const handleChangeSortMode = (e: React.FormEvent<HTMLSelectElement>) => {
    dispatch(setSortMode(e.currentTarget.value));
    navigate(firstPartUrl);
  };

  const filterSortDirectionOptions = [
    { value: 0, label: t("productsFilter__SortModeOption0") },
    { value: 1, label: t("productsFilter__SortModeOption1") },
    { value: 2, label: t("productsFilter__SortModeOption2") },
    { value: 3, label: t("productsFilter__SortModeOption3") },
    { value: 4, label: t("productsFilter__SortModeOption4") },
    { value: 5, label: t("productsFilter__SortModeOption5") },
    { value: 6, label: t("productsFilter__SortModeOption6") },
  ];

  const handleChangeSearchTerm = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(e.currentTarget.value));
    navigate(firstPartUrl);
  };

  const handleClearMinPriceInput = () => {
    dispatch(setMinPrice(""));
    navigate(firstPartUrl);
  };

  const handleClearMaxPriceInput = () => {
    dispatch(setMaxPrice(""));
    navigate(firstPartUrl);
  };

  const handleClearSearchTermInput = () => {
    dispatch(setSearchTerm(""));
    navigate(firstPartUrl);
  };

  return (
    <form id={styles.offers__filtersWrapper}>
      <label id={styles.offers__priceLabel}>
        {t("productsFilter__PriceLabel")}
        <span className={styles.offers__priceInputWrapper}>
          <input
            type="text"
            name="minPrice"
            id="input__minPrice"
            className={styles.input__offerPrice}
            placeholder={t("productsFilter__PriceFieldFromPlaceholder")}
            value={currentMinPriceState}
            onChange={handleChangeMinPrice}
          />
          {currentMinPriceState !== "" && (
            <span
              className={styles.offers__clearFieldButton}
              onClick={handleClearMinPriceInput}
            >
              <TiDelete />
            </span>
          )}
        </span>

        <span className={styles.offers__priceInputWrapper} id={styles.offers__priceInputWrapperSecondField}>
          <input
            type="text"
            name="maxPrice"
            id="input__maxPrice"
            className={styles.input__offerPrice}
            placeholder={t("productsFilter__PriceFieldToPlaceholder")}
            value={currentMaxPriceState}
            onChange={handleChangeMaxPrice}
          />
          {currentMaxPriceState !== "" && (
            <span
              className={styles.offers__clearFieldButton}
              onClick={handleClearMaxPriceInput}
            >
              <TiDelete />
            </span>
          )}
        </span>
      </label>

      {showDiscountedProductsCheckbox && (
        <label id={styles.offers__discountedOffersLabel}>
          {t("productsFilter__DiscountItemsCheckboxLabel")}
          <input
            type="checkbox"
            name="showDiscountedItems"
            id={styles.input__showDiscountedItems}
            checked={currentShowOnlyDiscountedProductsState}
            onChange={handleChangeShowOnlyDiscountedProducts}
          />
        </label>
      )}

      <label id={styles.offers__sortModeLabel}>
        <span id={styles.offers__sortModeWrapper}>
          {t("productsFilter__SortModeLabel")}
          <select
            name="sortMode"
            id={styles.input__sortMode}
            value={currentSortModeState}
            onChange={handleChangeSortMode}
          >
            {filterSortDirectionOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </span>
      </label>

      <label id={styles.offers__searchTermLabel}>
        {t("productsFilter__SearchTermLabel")}
        <span id={styles.offers__searchTermInputWrapper}>
          <input
            type="text"
            name="searchTerm"
            id="input__searchTerm"
            className={styles.input__searchTerm}
            placeholder={t("productsFilter__SearchTermPlaceholder")}
            value={currentSearchTermState}
            onChange={handleChangeSearchTerm}
          />
          {currentSearchTermState !== "" && (
            <span
              className={styles.offers__clearFieldButton}
              onClick={handleClearSearchTermInput}
            >
              <TiDelete />
            </span>
          )}
        </span>
      </label>
    </form>
  );
};

export default ProductsListFilterForm;
