import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

import { RootState } from "../../../redux/store";
import { useAppSelector } from "../../../redux/reduxHooks";
import { useTheme } from "../../../hooks/useTheme";

import styles from "./ThemeSwitcher.module.css";

const ThemeSwitcher = () => {
  const [, toggleTheme] = useTheme();
  const [checked, setChecked] = useState(false);

  const currentTheme = useAppSelector(
    (state: RootState) => state.theme.currentTheme
  );

  useEffect(() => {
    if (currentTheme === "dark") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [currentTheme]);

  return (
    <div id={styles.themeSwitcherWrapper}>
      <span className={styles.switcherTitle}>Theme:</span>
      <span className={styles.themeImage}>
        <BsSun />
      </span>
      <label className={styles.switch}>
        <input type="checkbox" onChange={toggleTheme} checked={checked} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
      <span className={styles.themeImage}>
        <BsMoon />
      </span>
    </div>
  );
};

export default ThemeSwitcher;
