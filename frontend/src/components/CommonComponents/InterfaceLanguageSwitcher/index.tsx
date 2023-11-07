import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import {
  useAppDispatch,
  useAppSelector,
} from 'redux/reduxHooks';
import { setTranslationCode } from 'redux/slices/translationSlice';
import { RootState } from 'redux/store';

import styles from './styles.module.css';

const InterfaceLanguageSwitcher = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();

  const savedTranslationCode = useAppSelector(
    (state: RootState) => state.translation.translationCode
  );

  useEffect(() => {
    i18n.changeLanguage(savedTranslationCode);
  }, [i18n, savedTranslationCode]);

  const handleChangeInterfaceLanguage = (
    e: React.FormEvent<HTMLSelectElement>
  ) => dispatch(setTranslationCode(e.currentTarget.value));

  return (
    <div>
      <label id={styles.languageSelector__label}>
        {t('footer__interfaceLanguageSelectorLableText')}:
        <select
          name="languages"
          id={styles.languageSelector__selector}
          value={savedTranslationCode}
          onChange={handleChangeInterfaceLanguage}
        >
          <option value="en">
            {t('footer__interfaceLanguageSelectorOptionEnglish')}
          </option>
          <option value="de">
            {t('footer__interfaceLanguageSelectorOptionGerman')}
          </option>
        </select>
      </label>
    </div>
  );
};

export default InterfaceLanguageSwitcher;
