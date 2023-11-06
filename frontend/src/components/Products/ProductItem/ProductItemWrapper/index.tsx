import 'react-toastify/dist/ReactToastify.css';

import React from 'react';

import { UseTranslationResponse } from 'react-i18next';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import {
  NavigateFunction,
  NavLink,
  Params,
} from 'react-router-dom';
import {
  AnyAction,
  Dispatch,
} from 'redux';

import { backendUrl } from '../../../../config/mainConstants';
import {
  addToCart,
  TCartItem,
} from '../../../../redux/slices/cartSlice';
import {
  sanitizeCharsNumbersSpezChars,
} from '../../../../utils/filterSpecialChars';
import PageMetaData from '../../../CommonComponents/PageMetaData';
import { showToastSuccess } from '../../../CommonComponents/Toasts/toasts';
import ProductItemPriceWrapper from '../ProductItemPriceWrapper';
import styles from './styles.module.css';

export type TProductItemWrapperProps = {
  data: {
    data: {
      id: number;
      title: string;
      description: string;
      image: string;
      price: number;
      discont_price: number;
    };
  };
  hooks: {
    dispatch: Dispatch<AnyAction>;
    navigate: NavigateFunction;
    queryParams: Readonly<Params<string>>;
    productInCart: TCartItem;
    translation: UseTranslationResponse<'translation', undefined>;
  };
};

const ProductItemWrapper: React.FC<TProductItemWrapperProps> = ({
  data: {
    data: { id, title, description, image, price, discont_price },
  },
  hooks: { dispatch, navigate, queryParams, productInCart, translation },
}) => {
  const { t } = translation;
  if (queryParams.productTitle) {
    if (sanitizeCharsNumbersSpezChars(queryParams.productTitle) !== title) {
      navigate(`/product/${id}/${title}/`);
    }
  } else {
    navigate(`/product/${id}/${title}/`);
  }

  const imgUrl = backendUrl + image;

  return (
    <>
      <PageMetaData title={title} description={description} />
      <article>
        <div id={styles.productItem__wrapper}>
          <div id={styles.productItem__titleWrapper}>
            <h1>{title}</h1>
          </div>
          <div id={styles.productItem__descriptionWrapper}>
            <div id={styles.productItem__imageMainWrapper}>
              <figure id={styles.productItem__imageWrapper}>
                <img
                  src={imgUrl}
                  alt={title}
                  title={title}
                  id={styles.productItem__image}
                />
              </figure>
              {productInCart && (
                <NavLink to="/shoppingCart">
                  <div
                    className={styles.offer_itemsQuantityInCart}
                    title="Quantity in the shopping cart"
                  >
                    <div className={styles.offer_shoppingCargSymbol}>
                      <LiaShoppingBagSolid />
                    </div>
                    {productInCart && productInCart.quantity}
                  </div>
                </NavLink>
              )}
            </div>

            <div id={styles.productItem__descriptionDetailsWrapper}>
              <ProductItemPriceWrapper
                price={price}
                discont_price={discont_price}
              />
              <div id={styles.productItem__cartButtonWrapper}>
                <button
                  id={styles.productItem__cartButton}
                  onClick={() => {
                    dispatch(
                      addToCart({ id, title, price, discont_price, image })
                    );
                    showToastSuccess(
                      `"${title}"` + t('productItem__IsAddedToShoppingCart')
                    );
                  }}
                >
                  {t('productItem__AddToCartButtonText')}
                </button>
              </div>

              <div className={styles.customDashedLinie}>&nbsp;</div>
              <div id={styles.productItem__descriptionTitle}>
                {t('productItem__DescriptionTitle')}
              </div>
              <article id={styles.productItem__descriptionText}>
                {description}
              </article>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default ProductItemWrapper;
