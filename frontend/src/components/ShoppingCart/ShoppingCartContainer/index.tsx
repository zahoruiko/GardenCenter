import './ShoppingCartContainerAnimation.css';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { useAppSelector } from 'redux/reduxHooks';

import ShoppingCartIsEmpty from '../ShoppingCartIsEmpty';
import ShoppingCartItem from '../ShoppingCartItem';
import ShoppingCartWrapper from '../ShoppingCartWrapper';

const ShoppingCartContainer = () => {
  const cart = useAppSelector((state) => state.cart.cart);
  return (
    <ShoppingCartWrapper>
      <TransitionGroup className="transitionGroup">
        {cart.length > 0 ? (
          cart.map((data) => (
            <CSSTransition key={data.id} timeout={500} classNames="item">
              <ShoppingCartItem key={data.id} {...data} />
            </CSSTransition>
          ))
        ) : (
          <ShoppingCartIsEmpty />
        )}
      </TransitionGroup>
    </ShoppingCartWrapper>
  );
};

export default ShoppingCartContainer;
