import { CSSTransition, TransitionGroup } from "react-transition-group";

import ShoppingCartIsEmpty from "../ShoppingCartIsEmpty/ShoppingCartIsEmpty";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";
import ShoppingCartWrapper from "../ShoppingCartWrapper/ShoppingCartWrapper";
import { useAppSelector } from "../../../redux/reduxHooks";

import "./ShoppingCartContainerAnimation.css";

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
