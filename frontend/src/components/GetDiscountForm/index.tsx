import { useTranslation } from 'react-i18next';

import GetDiscountForm from './FormItem';
import styles from './styles.module.css';

const GetDiscountFormWrapper = () => {
  const { t } = useTranslation();
  return (
    <div id={styles.getDiscount__wrapper}>
      <div id={styles.getDiscount__imageWrapper}>
        <img
          src="/images/discount/image 3.png"
          alt={t('mainPage__GetDiscountFormImageAltText')}
        />
      </div>
      <div id={styles.getDiscount__formWrapper}>
        <div id={styles.getDiscount__formTitle}>
          {t('mainPage__GetDiscountFormTitle')}
        </div>
        <div id={styles.getDiscount__formInfoText}>
          {t('mainPage__GetDiscountFormInfoText')}
        </div>
        <GetDiscountForm />
      </div>
    </div>
  );
};

export default GetDiscountFormWrapper;
