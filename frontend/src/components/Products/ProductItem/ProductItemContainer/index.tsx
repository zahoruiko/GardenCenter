import {
  useEffect,
  useState,
} from 'react';

import RemoteDataFetch from 'components/CommonComponents/RemoteDataFetch';
import { useTranslation } from 'react-i18next';
import {
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from 'redux/reduxHooks';
import { TCartItem } from 'redux/slices/cartSlice';
import { Theme } from 'redux/slices/themeSlice';
import { RootState } from 'redux/store';
import { sanitizeNumbers } from 'utils/filterSpecialChars';

import ProductItemWrapper from '../ProductItemWrapper';
import ProductPageDummy from '../ProductPageDummy/ProductPageDummy';
import ProductPageDummyDark from '../ProductPageDummy/ProductPageDummyDark';

const ProductItemContainer = () => {
  const queryParams = useParams();
  const translation = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [productInCart, setProductInCart] = useState<TCartItem>();

  let queryProductId = queryParams.id;
  if (queryProductId) {
    const productId = sanitizeNumbers(queryProductId);
    if (queryProductId !== productId) navigate('/notFound');
  } else {
    navigate('/notFound');
  }

  const shoppingCart = useAppSelector((state) => state.cart.cart);
  useEffect(() => {
    if (shoppingCart && queryProductId) {
      setProductInCart(
        shoppingCart.find((item: TCartItem) => item.id === +queryProductId!)
      );
    }
  }, [queryProductId, shoppingCart]);

  const dataSourceUrl = `/products/${queryProductId}`;

  const useGetTheemProductPageDummy = () => {
    const currentTheme = useAppSelector(
      (state: RootState) => state.theme.currentTheme
    );
    if (currentTheme === Theme.LIGHT) {
      return <ProductPageDummy />;
    } else {
      return <ProductPageDummyDark />;
    }
  };

  return (
    <>
      <RemoteDataFetch
        uri={dataSourceUrl}
        renderSuccess={ProductItemWrapper}
        loadingFallback={useGetTheemProductPageDummy()}
        hooks={{ dispatch, navigate, queryParams, productInCart, translation }}
      />
    </>
  );
};

export default ProductItemContainer;
