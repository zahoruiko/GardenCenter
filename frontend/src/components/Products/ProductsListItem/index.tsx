import React, {
  useEffect,
  useState,
} from 'react';

import { LiaShoppingBagSolid } from 'react-icons/lia';
import { NavLink } from 'react-router-dom';

import { backendUrl } from '../../../config/mainConstants';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/reduxHooks';
import {
  addToCart,
  TCartItem,
} from '../../../redux/slices/cartSlice';
import { AppDispatch } from '../../../redux/store';
import { showToastSuccess } from '../../CommonComponents/Toasts/toasts';
import ProductsListItemPriceWrapper from './ProductsListItemPriceWrapper';
import styles from './styles.module.css';

export type TProductsListItemProps = {
  id: number;
  title: string;
  price: number;
  discont_price: number;
  image: string;
};

const ProductsListItem: React.FC<TProductsListItemProps> = ({
  id,
  title,
  price,
  discont_price,
  image,
}) => {
  const [isProductInCart, setIsProductInCart] = useState<TCartItem>();
  const dispatch: AppDispatch = useAppDispatch();
  const shoppingCart = useAppSelector((state) => state.cart.cart);

  useEffect(() => {
    setIsProductInCart(shoppingCart.find((item) => item.id === id));
  }, [id, shoppingCart]);

  const imgUrl = backendUrl + image;

  return (
    <div className={styles.offer__mainWrapper}>
      <NavLink
        key={id}
        to={`/product/${id}/${title}/`}
        className={styles.link__decoration}
      >
        <figure className={styles.offer__wrapper}>
          <div className={styles.offer__imageWrapper}>
            <img src={imgUrl} alt={title} title={title} />
          </div>
          <ProductsListItemPriceWrapper
            price={price}
            discont_price={discont_price}
          />
          <figcaption className={styles.offer__title}>{title}</figcaption>
        </figure>
      </NavLink>

      <button
        className={styles.offer_cartButton}
        onClick={() => {
          dispatch(addToCart({ id, title, price, discont_price, image }));
          showToastSuccess(`"${title}" is added to the shopping cart`);
        }}
      >
        Add to cart
      </button>
      {isProductInCart && (
        <NavLink to="/shoppingCart">
          <div
            className={styles.offer_itemsQuantityInCart}
            title="Quantity in the shopping cart"
          >
            <div className={styles.offer_shoppingCargSymbol}>
              <LiaShoppingBagSolid />
            </div>
            {isProductInCart && isProductInCart.quantity}
          </div>
        </NavLink>
      )}
    </div>
  );
};

export default ProductsListItem;
