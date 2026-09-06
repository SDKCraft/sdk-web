import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ar from "./locales/ar.json";

export const LANG_STORAGE_KEY = "sdkcraft_lang";
export type SupportedLang = "en" | "ar";
export const SUPPORTED_LANGS: SupportedLang[] = ["en", "ar"];

function getInitialLang(): SupportedLang {
  const stored = typeof window !== "undefined" ? window.localStorage.getItem(LANG_STORAGE_KEY) : null;
  return stored === "ar" ? "ar" : "en"; // English is always the default, regardless of browser locale
}

// إضافة لغة جديدة لاحقاً (مثل الصينية): أضف ملف locales/zh.json، سجّله هنا في resources،
// وأضف "zh" إلى SUPPORTED_LANGS + قاعدة الخط في index.css.
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ar: { translation: ar },
  },
  lng: getInitialLang(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnObjects: true,
});

export default i18n;
