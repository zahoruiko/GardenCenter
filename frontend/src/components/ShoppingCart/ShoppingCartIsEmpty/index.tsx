import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

const ShoppingCartIsEmpty = () => {
  const { t } = useTranslation();
  return (
    <div id={styles.shoppingCart__isEmptyTitle}>
      {t('shoppingCart__ShoppingCartIsEmptyText')}
    </div>
  );
};

export default ShoppingCartIsEmpty;
