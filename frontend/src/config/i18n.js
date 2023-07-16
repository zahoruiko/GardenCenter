import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationDE from "./locales/de/translation.json";

const resources = {
  en: { translation: translationEN },
  de: { translation: translationDE },
};

i18n
  .use(Backend)
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
