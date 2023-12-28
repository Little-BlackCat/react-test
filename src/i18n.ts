import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./assets/locales/en.json";
import th from "./assets/locales/th.json";

i18n
  .use(initReactI18next)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: false,
    resources: { en: { translation: en }, th: { translation: th } },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;