import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "./supabase";
import LanguageSwitcher from "./components/LanguageSwitcher";

const STEP_NUMBERS = ["01", "02", "03"];

type LandingProps = {
  onStart: () => void;
  user: any;
  onLogin: () => void;
  onLogout: () => void;
  onPricing: () => void;
};

/**
 * فورم تواصل بسيط بيحفظ الرسالة مباشرة في جدول contact_messages بـ Supabase.
 * بديل أضمن من mailto: لأنه بيشتغل حتى لو الزائر معندوش تطبيق بريد مربوط بالمتصفح.
 */
function ContactModal({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const { error } = await supabase.from("contact_messages").insert({ name, email, message });
    if (error) {
      setStatus("error");
    } else {
      setStatus("sent");
    }
  }

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#000000cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "16px" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#0a0a0a", border: "1px solid #222", borderRadius: "10px", padding: "28px", width: "100%", maxWidth: "420px" }}>
        {status === "sent" ? (
          <>
            <div style={{ fontWeight: 800, fontSize: "18px", marginBottom: "8px" }}>{t("contact.sentTitle")}</div>
            <div style={{ color: "#888", fontSize: "14px", marginBottom: "20px" }}>{t("contact.sentDesc")}</div>
            <button onClick={onClose} style={{ background: "#22c55e", color: "#000", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>{t("contact.close")}</button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ fontWeight: 800, fontSize: "18px", marginBottom: "18px" }}>{t("contact.title")}</div>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={t("contact.name") as string} style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: "8px", color: "#fff", padding: "10px 12px", fontSize: "14px", marginBottom: "10px", boxSizing: "border-box" }} />
            <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("contact.email") as string} style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: "8px", color: "#fff", padding: "10px 12px", fontSize: "14px", marginBottom: "10px", boxSizing: "border-box" }} />
            <textarea required value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t("contact.message") as string} rows={4} style={{ width: "100%", background: "#111", border: "1px solid #222", borderRadius: "8px", color: "#fff", padding: "10px 12px", fontSize: "14px", marginBottom: "10px", boxSizing: "border-box", fontFamily: "inherit", resize: "vertical" }} />
            {status === "error" && (
              <div style={{ color: "#f87171", fontSize: "13px", marginBottom: "10px" }}>{t("contact.error")}</div>
            )}
            <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
              <button type="submit" disabled={status === "sending"} style={{ background: "#22c55e", color: "#000", border: "none", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: status === "sending" ? "default" : "pointer", opacity: status === "sending" ? 0.6 : 1 }}>
                {status === "sending" ? t("contact.sending") : t("contact.send")}
              </button>
              <button type="button" onClick={onClose} style={{ background: "none", color: "#aaa", border: "1px solid #333", padding: "10px 16px", borderRadius: "8px", fontSize: "14px", cursor: "pointer" }}>{t("contact.cancel")}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Landing({ onStart, user, onLogin, onLogout, onPricing }: LandingProps) {
  const { t } = useTranslation();
  const [showContact, setShowContact] = useState(false);

  // مصفوفات الميزات والخطوات بترجمتها بتيجي كـ array مباشرة من ملف الترجمة (returnObjects: true في i18n/index.ts)
  const features = t("features.items", { returnObjects: true }) as { title: string; desc: string }[];
  const steps = t("steps.items", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "var(--font-sans)" }}>
      <nav style={{ borderBottom: "1px solid #111", padding: "0 32px", minHeight: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", position: "sticky", top: 0, background: "#000", zIndex: 100, flexWrap: "wrap" }}>
        <button onClick={onStart} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 0 }}>
          <span style={{ color: "#22c55e", fontSize: "18px", fontWeight: 700 }}>&lt;/&gt;</span>
          <span style={{ fontWeight: 700, fontSize: "16px" }}>SDKCraft</span>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <a href="https://github.com/SDKCraft/api-to-sdk" target="_blank" rel="noreferrer" style={{ color: "#888", fontSize: "14px", textDecoration: "none" }}>{t("nav.github")}</a>
          <button onClick={onPricing} style={{ background: "none", border: "none", color: "#888", fontSize: "14px", cursor: "pointer" }}>{t("nav.pricing")}</button>
          <Link to="/blog" style={{ color: "#888", fontSize: "14px", textDecoration: "none" }}>{t("nav.blog")}</Link>
          <a href="https://github.com/SDKCraft/api-to-sdk/issues/new" target="_blank" rel="noreferrer" style={{ color: "#888", fontSize: "14px", textDecoration: "none" }}>{t("nav.reportBug")}</a>
          <button onClick={() => setShowContact(true)} style={{ background: "none", border: "none", color: "#888", fontSize: "14px", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>{t("nav.contact")}</button>
          <LanguageSwitcher />

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              {user.user_metadata?.avatar_url && (
                <img src={user.user_metadata.avatar_url} alt="GitHub avatar" style={{ width: "28px", height: "28px", borderRadius: "50%" }} />
              )}
              <span style={{ color: "#888", fontSize: "14px" }}>{user.user_metadata?.user_name}</span>
              <button onClick={onStart} style={{ background: "#22c55e", color: "#000", border: "none", padding: "8px 18px", borderRadius: "8px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>{t("nav.dashboard")}</button>
              <button onClick={onLogout} style={{ background: "none", color: "#aaa", border: "1px solid #333", padding: "8px 14px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>{t("nav.logout")}</button>
            </div>
          ) : null /* "Sign in with GitHub" button temporarily hidden until account system (Pro tier + history) is fully built. */}
        </div>
      </nav>

      <main>
        <section style={{ maxWidth: "1120px", margin: "0 auto", padding: "88px 24px 72px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "40px", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-block", background: "#111", border: "1px solid #222", borderRadius: "999px", padding: "6px 16px", fontSize: "13px", color: "#888", marginBottom: "28px" }}>
              {t("hero.badge")}
            </div>
            <h1 style={{ fontSize: "56px", fontWeight: 800, lineHeight: 1.05, margin: "0 0 24px", letterSpacing: 0 }}>
              {t("hero.title")}
            </h1>
            <p style={{ fontSize: "18px", color: "#aaa", lineHeight: 1.7, margin: "0 0 36px", maxWidth: "580px" }}>
              {t("hero.subtitle")}
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button onClick={onStart} style={{ background: "#22c55e", color: "#000", border: "none", padding: "14px 28px", borderRadius: "8px", fontSize: "16px", fontWeight: 800, cursor: "pointer" }}>
                {t("hero.cta")}
              </button>
              <a href="https://github.com/SDKCraft/api-to-sdk" target="_blank" rel="noreferrer" style={{ background: "#111", color: "#fff", border: "1px solid #222", padding: "14px 28px", borderRadius: "8px", fontSize: "16px", fontWeight: 700, textDecoration: "none" }}>
                {t("hero.viewGithub")}
              </a>
            </div>
          </div>

          <div style={{ border: "1px solid #222", borderRadius: "8px", background: "#080808", overflow: "hidden" }}>
            <div style={{ borderBottom: "1px solid #222", padding: "12px 16px", color: "#888", fontSize: "13px", display: "flex", justifyContent: "space-between" }}>
              <span>{t("hero.previewLabel")}</span>
              <span>TypeScript</span>
            </div>
            <pre dir="ltr" style={{ margin: 0, padding: "22px", overflowX: "auto", color: "#d1d5db", fontSize: "13px", lineHeight: 1.7, textAlign: "left", fontFamily: "source-code-pro, Menlo, Monaco, Consolas, monospace" }}>
{`import { createClient } from "./sdk";

const client = createClient({
  apiKey: process.env.API_KEY,
});

const users = await client.users.list({
  limit: 25,
});

console.log(users.data);`}
            </pre>
          </div>
        </section>

        <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px 88px" }}>
          <h2 style={{ textAlign: "center", fontSize: "32px", fontWeight: 800, marginBottom: "36px", letterSpacing: 0 }}>
            {t("features.title")}
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
            {features.map((feature) => (
              <div key={feature.title} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: "8px", padding: "24px" }}>
                <div style={{ fontWeight: 800, fontSize: "16px", marginBottom: "10px" }}>{feature.title}</div>
                <div style={{ color: "#888", fontSize: "14px", lineHeight: 1.7 }}>{feature.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px 88px" }}>
          <h2 style={{ textAlign: "center", fontSize: "32px", fontWeight: 800, marginBottom: "36px", letterSpacing: 0 }}>
            {t("steps.title")}
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {steps.map((step, index) => (
              <div key={step.title} style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div dir="ltr" style={{ width: "40px", height: "40px", borderRadius: "50%", border: "1px solid #22c55e44", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", color: "#22c55e", fontSize: "13px", fontWeight: 800, flexShrink: 0 }}>{STEP_NUMBERS[index]}</div>
                  {index < steps.length - 1 && <div style={{ width: "1px", height: "40px", background: "#1a1a1a" }} />}
                </div>
                <div style={{ paddingTop: "8px", paddingBottom: "32px" }}>
                  <div style={{ fontWeight: 700, fontSize: "16px", marginBottom: "6px" }}>{step.title}</div>
                  <div style={{ color: "#888", fontSize: "14px" }}>{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ borderTop: "1px solid #111", padding: "72px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "16px", letterSpacing: 0 }}>
            {t("finalCta.title")}
          </h2>
          <p style={{ color: "#888", marginBottom: "32px", fontSize: "16px" }}>{t("finalCta.subtitle")}</p>
          <button onClick={onStart} style={{ background: "#22c55e", color: "#000", border: "none", padding: "16px 36px", borderRadius: "8px", fontSize: "18px", fontWeight: 800, cursor: "pointer" }}>
            {t("finalCta.cta")}
          </button>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid #111", padding: "24px 32px", display: "flex", justifyContent: "space-between", gap: "16px", color: "#555", fontSize: "13px", flexWrap: "wrap" }}>
        <span>{t("footer.tagline")}</span>
        <div style={{ display: "flex", gap: "20px" }}>
          <button onClick={() => setShowContact(true)} style={{ background: "none", border: "none", color: "#555", fontSize: "13px", cursor: "pointer", padding: 0, fontFamily: "inherit" }}>{t("nav.contact")}</button>
          <a href="https://github.com/SDKCraft/api-to-sdk" target="_blank" rel="noreferrer" style={{ color: "#555", textDecoration: "none" }}>{t("nav.github")}</a>
        </div>
      </footer>
      {showContact && <ContactModal onClose={() => setShowContact(false)} />}
    </div>
  );
}
