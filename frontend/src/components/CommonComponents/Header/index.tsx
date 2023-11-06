import { useTranslation } from 'react-i18next';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '../../../redux/reduxHooks';
import { RootState } from '../../../redux/store';
import styles from './styles.module.css';

const Header = () => {
  const { t } = useTranslation();

  const shoppingCartStatistic = useAppSelector(
    (state: RootState) => state.cart.cartStatistic
  );

  const logoImage = '/images/siteLogo.png';
  const siteNameText = t('header__SiteLogoAltTitle');

  return (
    <header id={styles.header__wrapper}>
      <div id={styles.header__leftWrapper}>
        <NavLink to="/">
          <img
            id={styles.header__logoImage}
            src={logoImage}
            alt={siteNameText}
            title={siteNameText}
          />
        </NavLink>
        <NavLink to="/categories" id={styles.header__catalogButton}>
          {t('header__CatalogButtonText')}
        </NavLink>
      </div>
      <div id={styles.header__rightWrapper}>
        <nav id={styles.header__menuWrapper}>
          <menu id={styles.header__menu}>
            <li>
              <NavLink
                to="/"
                className={styles.header__menuItem}
                id={styles.header__menuMainPage}
              >
                {t('header__MainPageLinkText')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/allProducts"
                className={styles.header__menuItem}
                id={styles.header__menuAllProducts}
              >
                {t('header__AllProductsLinkText')}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/discountProducts"
                className={styles.header__menuItem}
                id={styles.header__menuDiscountedProducts}
              >
                {t('header__AllSalesLinkText')}
              </NavLink>
            </li>
          </menu>
        </nav>
        <div id={styles.header__cartButtonWrapper}>
          <div id={styles.header__cartButtonContainer}>
            <NavLink
              to="/shoppingCart"
              className={styles.header__cartButtonContainer}
            >
              <LiaShoppingBagSolid />
            </NavLink>
          </div>
          {shoppingCartStatistic.totalQuantity > 0 && (
            <div id={styles.header__cartTotalQuantity}>
              {shoppingCartStatistic.totalQuantity}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
