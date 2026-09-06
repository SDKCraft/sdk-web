import { useTranslation } from "react-i18next";
import { useLanguage } from "../i18n/LanguageProvider";

/**
 * زر تبديل اللغة — نفس نمط الزر الموجود مسبقاً في LegalPage.tsx (حدود خضراء، pill صغير).
 * يعرض اسم اللغة *التالية* (يعني: يعرض "العربية" وأنت بالإنجليزية، والعكس).
 */
export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      style={{
        background: "none",
        border: "1px solid #22c55e",
        color: "#22c55e",
        borderRadius: "6px",
        padding: "4px 10px",
        fontSize: "13px",
        fontFamily: "inherit",
        cursor: "pointer",
      }}
    >
      {t("langSwitcher.label")}
    </button>
  );
}
