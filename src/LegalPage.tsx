import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface LegalPageProps {
  title: string;
  lastUpdated: string;
  content: string;
  lang: "en" | "ar";
  /** رابط النسخة بلغة تانية من نفس الصفحة (مثلاً /privacy/ar لما إحنا بـ /privacy) */
  altLangHref: string;
  altLangLabel: string;
}

/**
 * تخطيط مشترك لصفحات الشروط والخصوصية — بنفس نمط BlogPost.tsx الموجود
 * (dark theme، نفس الـ nav، نفس الخط)، مع دعم تبديل اللغة (en/ar) بزر واضح أعلى الصفحة.
 */
export default function LegalPage({ title, lastUpdated, content, lang, altLangHref, altLangLabel }: LegalPageProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} — SDKCraft`;
    const prevDir = document.documentElement.dir;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    return () => {
      document.title = prevTitle;
      document.documentElement.dir = prevDir;
    };
  }, [title, lang]);

  const isRtl = lang === "ar";

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <nav
        style={{
          borderBottom: "1px solid #111",
          padding: "0 32px",
          minHeight: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "#000",
          zIndex: 100,
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#fff", textDecoration: "none" }}>
          <span style={{ color: "#22c55e", fontSize: "18px", fontWeight: 700 }}>&lt;/&gt;</span>
          <span style={{ fontWeight: 700, fontSize: "16px" }}>SDKCraft</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <Link
            to={altLangHref}
            style={{
              color: "#22c55e",
              fontSize: "13px",
              textDecoration: "none",
              border: "1px solid #22c55e",
              borderRadius: "6px",
              padding: "4px 10px",
            }}
          >
            {altLangLabel}
          </Link>
          <Link to="/" style={{ color: "#888", fontSize: "14px", textDecoration: "none" }}>
            {isRtl ? "← الرئيسية" : "← Home"}
          </Link>
        </div>
      </nav>
      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "56px 24px 96px" }}>
        <div style={{ color: "#555", fontSize: "13px", marginBottom: "12px" }}>
          {isRtl ? `آخر تحديث: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
        </div>
        <h1 style={{ fontSize: "32px", fontWeight: 800, marginBottom: "36px", lineHeight: 1.2 }}>{title}</h1>
        <div
          className="legal-content"
          style={{
            color: "#ccc",
            fontSize: "15px",
            lineHeight: 1.8,
            direction: isRtl ? "rtl" : "ltr",
            textAlign: isRtl ? "right" : "left",
          }}
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <div
          style={{
            marginTop: "56px",
            padding: "20px 24px",
            background: "#0a0a0a",
            border: "1px solid #222",
            borderRadius: "10px",
            fontSize: "14px",
            color: "#888",
          }}
        >
          {isRtl ? (
            <>
              هل عندك سؤال بخصوص هذه الصفحة؟{" "}
              <Link to="/#contact" style={{ color: "#22c55e", textDecoration: "none" }}>
                تواصل معنا
              </Link>
            </>
          ) : (
            <>
              Have a question about this page?{" "}
              <Link to="/#contact" style={{ color: "#22c55e", textDecoration: "none" }}>
                Contact us
              </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
