import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { LANG_STORAGE_KEY, SupportedLang } from "./index";

type LanguageContextValue = {
  lang: SupportedLang;
  dir: "ltr" | "rtl";
  setLang: (lang: SupportedLang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/**
 * يلف التطبيق بالكامل. يضبط lang/dir على عنصر <html> تلقائياً عند أي تغيير،
 * ويحفظ اختيار المستخدم في localStorage. اللغة الافتراضية دائماً "en"
 * (لا نعتمد على لغة المتصفح) حتى يفتح الموقع بالإنجليزية أول مرة لأي زائر.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [lang, setLangState] = useState<SupportedLang>(i18n.language as SupportedLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (next: SupportedLang) => {
    i18n.changeLanguage(next);
    window.localStorage.setItem(LANG_STORAGE_KEY, next);
    setLangState(next);
  };

  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");

  return (
    <LanguageContext.Provider value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
