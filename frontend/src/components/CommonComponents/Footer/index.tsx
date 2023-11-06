import InterfaceLanguageSwitcher from '../InterfaceLanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher';
import styles from './styles.module.css';

const Footer = () => {
  return (
    <div id={styles.footerWrapper}>
      <ThemeSwitcher />
      <InterfaceLanguageSwitcher />
    </div>
  );
};

export default Footer;
