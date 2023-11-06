import React from 'react';

import styles from './styles.module.css';

type TProductsListItemPriceWrapperProps = {
  price: number;
  discont_price: number;
};

const ProductsListItemPriceWrapper: React.FC<
  TProductsListItemPriceWrapperProps
> = ({ price, discont_price }) => {
  const roundedPrice = Math.round(price);
  const roundedDiscountPrice = Math.round(discont_price);
  let roundedDiscontProzent = Math.round(
    ((roundedPrice - roundedDiscountPrice) / roundedPrice) * 100
  );
  return discont_price ? (
    <div className={styles.offer__pricesWrapper}>
      <div className={styles.offer__currentPrice}>
        {roundedDiscountPrice}
        <span className={styles.offer__priceCurrencySign}>$</span>
      </div>
      <div className={styles.offer__oldPrice}>
        {roundedPrice}
        <s className={styles.offer__discountPriceCurrencySign}>$</s>
      </div>
      <div className={styles.offer__priceDiscrount}>
        {roundedDiscontProzent}%
      </div>
    </div>
  ) : (
    <div className={styles.offer__pricesWrapper}>
      <div className={styles.offer__currentPrice}>
        {roundedPrice}
        <span className={styles.offer__priceCurrencySign}>$</span>
      </div>
    </div>
  );
};

export default ProductsListItemPriceWrapper;
