import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/common.json";
import es from "./locales/es/common.json";

const saved = localStorage.getItem("lang");
const lng = saved || navigator.language.split("-")[0] || "en";

i18n.use(initReactI18next).init({
  lng,
  fallbackLng: "en",
  resources: {
    en: { translation: en },
    es: { translation: es },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
