import InterfaceLanguageSwitcher from "../InterfaceLanguageSwitcher/InterfaceLanguageSwitcher";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div id={styles.footerWrapper}>
      <ThemeSwitcher />
      <InterfaceLanguageSwitcher />
    </div>
  );
};

export default Footer;
