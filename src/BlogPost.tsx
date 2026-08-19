import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { blogPosts } from "./blogPosts";

export default function BlogPost() {
  const location = useLocation();
  // مش بنستخدم useParams لأن الصفحة دي بتتعرض يدويًا (مش جوا <Route> رسمي)،
  // فبنقرأ الـ slug مباشرة من آخر جزء في الرابط.
  const slug = location.pathname.replace(/^\/blog\//, "").replace(/\/$/, "");
  const post = blogPosts.find((p) => p.slug === slug);

  // بيحدّث عنوان التاب ووصف الميتا وقت ما الزائر يفتح مقالة — مهم لـ SEO
  // لأن Google بيعتمد على الـ title/description الفعليين وقت الفهرسة.
  useEffect(() => {
    if (!post) return;
    const prevTitle = document.title;
    document.title = `${post.title} — SDKCraft`;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") || "";
    metaDesc?.setAttribute("content", post.description);
    return () => {
      document.title = prevTitle;
      metaDesc?.setAttribute("content", prevDesc);
    };
  }, [post]);

  if (!post) {
    return (
      <div style={{ background: "#000", color: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px" }}>
        <div style={{ fontSize: "20px", fontWeight: 700 }}>Post not found</div>
        <Link to="/blog" style={{ color: "#22c55e" }}>← Back to blog</Link>
      </div>
    );
  }

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <nav style={{ borderBottom: "1px solid #111", padding: "0 32px", minHeight: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#000", zIndex: 100 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#fff", textDecoration: "none" }}>
          <span style={{ color: "#22c55e", fontSize: "18px", fontWeight: 700 }}>&lt;/&gt;</span>
          <span style={{ fontWeight: 700, fontSize: "16px" }}>SDKCraft</span>
        </Link>
        <Link to="/blog" style={{ color: "#888", fontSize: "14px", textDecoration: "none" }}>← All posts</Link>
      </nav>
      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "56px 24px 96px" }}>
        <div style={{ color: "#555", fontSize: "13px", marginBottom: "12px" }}>{post.date}</div>
        <h1 style={{ fontSize: "36px", fontWeight: 800, marginBottom: "36px", lineHeight: 1.2 }}>{post.title}</h1>
        <div className="blog-content" style={{ color: "#ccc", fontSize: "16px", lineHeight: 1.8 }}>
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
        <div style={{ marginTop: "56px", padding: "24px", background: "#0a0a0a", border: "1px solid #222", borderRadius: "10px", textAlign: "center" }}>
          <div style={{ fontWeight: 700, marginBottom: "12px" }}>Try SDKCraft on your own OpenAPI spec</div>
          <Link to="/" style={{ display: "inline-block", background: "#22c55e", color: "#000", padding: "10px 24px", borderRadius: "8px", fontWeight: 700, textDecoration: "none" }}>
            Generate an SDK →
          </Link>
        </div>
      </main>
    </div>
  );
}
