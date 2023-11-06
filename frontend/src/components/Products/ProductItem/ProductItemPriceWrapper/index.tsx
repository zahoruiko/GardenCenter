import React from 'react';

import styles from './styles.module.css';

type TProductItemPriceWrapperProps = {
  price: number;
  discont_price: number;
};

const ProductItemPriceWrapper: React.FC<TProductItemPriceWrapperProps> = ({
  price,
  discont_price,
}) => {
  const roundedPrice = Math.round(price);
  const roundedDiscountPrice = Math.round(discont_price);
  let roundedDiscontProzent = Math.round(
    ((roundedPrice - roundedDiscountPrice) / roundedPrice) * 100
  );
  return discont_price ? (
    <div className={styles.productItem__pricesWrapper}>
      <div className={styles.productItem__currentPrice}>
        {roundedDiscountPrice}
        <span className={styles.productItem__priceCurrencySign}>$</span>
      </div>
      <div className={styles.productItem__oldPrice}>
        {roundedPrice}
        <s className={styles.productItem__discountPriceCurrencySign}>$</s>
      </div>
      <div className={styles.productItem__priceDiscount}>
        -{roundedDiscontProzent}%
      </div>
    </div>
  ) : (
    <div className={styles.productItem__pricesWrapper}>
      <div className={styles.productItem__currentPrice}>
        {roundedPrice}
        <span className={styles.productItem__priceCurrencySign}>$</span>
      </div>
    </div>
  );
};

export default ProductItemPriceWrapper;
