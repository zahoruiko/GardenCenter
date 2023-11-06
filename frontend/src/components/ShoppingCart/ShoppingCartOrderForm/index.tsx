import {
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/reduxHooks';
import {
  removeAllItems,
  TCartItem,
  TCartState,
} from '../../../redux/slices/cartSlice';
import {
  AppDispatch,
  RootState,
} from '../../../redux/store';
import { sendPostRequest } from '../../../utils/sendPostRequest';
import {
  showToastSuccess,
  showToastWarning,
} from '../../CommonComponents/Toasts/toasts';
import styles from './styles.module.css';

type TFormValues = {
  phone: string;
  order: TCartState;
};

type OrderValue = {
  productId: number;
  quantity: number;
};

const createOrderContentArray = (cartContent: TCartItem[]) => {
  const result: OrderValue[] = [];
  for (let i = 0; i < cartContent.length; i++) {
    result.push({
      productId: cartContent[i].id,
      quantity: cartContent[i].quantity,
    });
  }
  return result;
};

const ShoppingCartOrderForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormValues>({ mode: 'onBlur' });
  const { t } = useTranslation();
  const dispatch: AppDispatch = useAppDispatch();
  const shoppingCartContent = useAppSelector(
    (state: RootState) => state.cart.cart
  );
  const orderContent = createOrderContentArray(shoppingCartContent);
  const shoppingCartContentJson = JSON.stringify(orderContent);

  const submit: SubmitHandler<TFormValues> = (data) => {
    if (shoppingCartContent.length !== 0) {
      const targetUrl = '/order/send';
      sendPostRequest(targetUrl, data);
      dispatch(removeAllItems());
      reset();
      showToastSuccess(t('shoppingCart__FormSuccessToastMessage'));
    } else {
      showToastWarning(t('shoppingCart__FormWarningToastMessage'));
    }
  };

  const phoneRegExp = /^[0-9+()#.\s/ext-]+$/;
  const phoneRegister = register('phone', {
    required: t('shoppingCart__FormPhoneIsRequiredMessage'),
    pattern: {
      value: phoneRegExp,
      message: t('shoppingCart__FormPleaseEnterAValidPhoneMessage'),
    },
  });

  const cartContentRegister = register('order', {
    required: t('shoppingCart__FormCartIsEmptyMessage'),
  });

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div id={styles.shoppingCart__customerPhoneInputWrapper}>
          <input
            type="tel"
            placeholder={t('shoppingCart__FormPhoneNumberPlaceholderText')}
            id={styles.shoppingCart__customerPhoneInput}
            {...phoneRegister}
          />
        </div>
        {errors.phone && (
          <div id={styles.shoppingCart__customerPhoneInputError}>
            {errors.phone?.message}
          </div>
        )}
        <input
          type="hidden"
          value={shoppingCartContentJson}
          {...cartContentRegister}
        />
        <button id={styles.shoppingCart__formSubmit}>
          {t('shoppingCart__FormSubmitButtonText')}
        </button>
      </form>
    </>
  );
};

export default ShoppingCartOrderForm;
