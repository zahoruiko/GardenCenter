import React from 'react';

import { useTranslation } from 'react-i18next';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/reduxHooks';
import { removeAllItems } from '../../../redux/slices/cartSlice';
import { RootState } from '../../../redux/store';
import { showToastSuccess } from '../../CommonComponents/Toasts/toasts';
import ShoppingCartOrderForm from '../ShoppingCartOrderForm';
import styles from './styles.module.css';

type TShoppingCartWrapper = {
  children: React.ReactNode;
};

const ShoppingCartWrapper: React.FC<TShoppingCartWrapper> = ({ children }) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const shoppingCartStatistic = useAppSelector(
    (state: RootState) => state.cart.cartStatistic
  );

  const shoppingCartContent = useAppSelector(
    (state: RootState) => state.cart.cart
  );

  const handleClearCart = () => {
    dispatch(removeAllItems());
    showToastSuccess(t('shoppingCart__CartClearedToastMessage'));
  };

  return (
    <div id={styles.shoppingCart__mainWrapper}>
      <div id={styles.shoppingCart__cartDetails}>
        <div id={styles.shoppingCart__title}>{t('shoppingCart__Title')}</div>
        <div id={styles.shoppingCart__linkBackToStoreWrapper}>
          <a href="/categories" id={styles.shoppingCart__linkBackToStore}>
            {t('shoppingCart__BackToTheStoreLinkText')} &gt;
          </a>
        </div>
        <div id={styles.shoppingCart__cartItemsListWrapper}>{children}</div>
        <div id={styles.shoppingCart__clearCartWrapper}>
          {shoppingCartContent.length > 0 && (
            <button
              id={styles.shoppingCart__clearCartButton}
              onClick={handleClearCart}
            >
              {t('shoppingCart__ClearCartButtonText')}
            </button>
          )}
        </div>
      </div>
      <div id={styles.shoppingCart__orderDetailsSummaryWrapper}>
        <div id={styles.shoppingCart__orderDetailsSummaryTitle}>
          {t('shoppingCart__OrderDetailsFormTitle')}
        </div>
        <div id={styles.shoppingCart__orderSumWrapper}>
          <div id={styles.shoppingCart__orderSumTitle}>
            {t('shoppingCart__OrderSumTitle')}
          </div>
          <div id={styles.shoppingCart__orderSumValue}>
            {shoppingCartStatistic.totalSum.toFixed(2)}
            <span className={styles.shoppingCart__priceCurrencySign}>$</span>
          </div>
        </div>
        <ShoppingCartOrderForm />
      </div>
    </div>
  );
};

export default ShoppingCartWrapper;
