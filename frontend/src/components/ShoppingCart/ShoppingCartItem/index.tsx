import './ShoppingCartItemTransition.css';

import React from 'react';

import { backendUrl } from 'config/mainConstants';
import { MdOutlineClear } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from 'redux/reduxHooks';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from 'redux/slices/cartSlice';

import ShoppingCartItemPrice from '../ShoppingCartItemPrice';
import styles from './styles.module.css';

type TShoppingCartItemProps = {
  id: number;
  title: string;
  price: number;
  discont_price: number;
  image: string;
  quantity: number;
};

const ShoppingCartItem: React.FC<TShoppingCartItemProps> = ({
  id,
  title,
  price,
  discont_price,
  image,
  quantity,
}) => {
  const dispatch = useAppDispatch();
  const imageUrl = backendUrl + image;
  return (
    <div className={styles.shoppingCart__orderItemWrapper}>
      <div className={styles.shoppingCart__itemImageWrapper}>
        <NavLink
          to={`/product/${id}/${title}/`}
          className={styles.shoppingCart__link}
        >
          <figure className={styles.shoppingCart__imageWrapper}>
            <img
              src={imageUrl}
              alt={title}
              className={styles.shoppingCart__itemImage}
            />
          </figure>
        </NavLink>
      </div>
      <div className={styles.shoppingCart__itemDetailsWrapper}>
        <div className={styles.shoppingCart__itemTitle}>
          <NavLink
            to={`/product/${id}/${title}/`}
            className={styles.shoppingCart__link}
          >
            {title}
          </NavLink>
        </div>
        <ShoppingCartItemPrice price={price} discont_price={discont_price} />
        <div className={styles.shoppingCart__itemQuantityWrapper}>
          <div className={styles.shoppingCart__itemQuantityButtonsWrapper}>
            <button
              className={styles.shoppingCart__itemQuantityChangeButton}
              onClick={() => dispatch(decrementQuantity(id))}
            >
              -
            </button>
            <div className={styles.shoppingCart__itemQuantity}>{quantity}</div>
            <button
              className={styles.shoppingCart__itemQuantityChangeButton}
              onClick={() => dispatch(incrementQuantity(id))}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className={styles.shoppingCart__orderItemDeleteWrapper}>
        <button
          className={styles.shoppingCart__orderItemDeleteButton}
          onClick={() => dispatch(removeItem(id))}
        >
          <MdOutlineClear />
        </button>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
