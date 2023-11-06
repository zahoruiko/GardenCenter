import React from 'react';

import styles from './styles.module.css';

type TShoppingCartItemPriceProps = {
  price: number;
  discont_price: number;
};

const ShoppingCartItemPrice: React.FC<TShoppingCartItemPriceProps> = ({
  price,
  discont_price,
}) => {
  const roundedPrice = Math.round(price);
  const roundedDiscountPrice = Math.round(discont_price);
  return discont_price ? (
    <div className={styles.shoppingCart__itemPriceWrapper}>
      <div className={styles.shoppingCart__itemActualPrice}>
        {roundedDiscountPrice}
        <span className={styles.shoppingCart__priceCurrencySign}>$</span>
      </div>
      <div className={styles.shoppingCart__itemOldPrice}>
        {roundedPrice}
        <s className={styles.shoppingCart__discountPriceCurrencySign}>$</s>
      </div>
    </div>
  ) : (
    <div className={styles.shoppingCart__itemPriceWrapper}>
      <div className={styles.shoppingCart__itemActualPrice}>
        {roundedPrice}
        <span className={styles.shoppingCart__priceCurrencySign}>$</span>
      </div>
    </div>
  );
};

export default ShoppingCartItemPrice;
