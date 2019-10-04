import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import LanguageDetector from "i18next-browser-languagedetector";

// If the following import is missing, generate it by running:
// npm run generate:locales
import * as locales from "../locales/locales";

// the translations
const resources = {
  en: locales.localeEN,
  it: locales.localeIT
};

// language detection options
const languageDetectorOptions = {
  order: [
    "querystring",
    "cookie",
    "localStorage",
    "navigator",
    "htmlTag",
    "path",
    "subdomain"
  ]
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  // detect user language
  .use(LanguageDetector)
  .init({
    detection: languageDetectorOptions,
    fallbackLng: "it",
    interpolation: {
      escapeValue: false // react already safes from xss
    },
    lng: "it",
    resources
  });

export default i18n;
