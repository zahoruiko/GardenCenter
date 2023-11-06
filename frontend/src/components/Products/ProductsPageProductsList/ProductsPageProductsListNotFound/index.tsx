import { useTranslation } from 'react-i18next';

import styles from './styles.module.css';

const ProductsPageProductsListNotFound = () => {
  const { t } = useTranslation();
  return (
    <div id={styles.error__NotFoundMessage}>{t('productsList__NotFound')}</div>
  );
};

export default ProductsPageProductsListNotFound;
