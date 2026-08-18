import { Link } from "react-router-dom";
import { blogPosts } from "./blogPosts";

export default function BlogList() {
  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <nav style={{ borderBottom: "1px solid #111", padding: "0 32px", minHeight: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "#000", zIndex: 100 }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#fff", textDecoration: "none" }}>
          <span style={{ color: "#22c55e", fontSize: "18px", fontWeight: 700 }}>&lt;/&gt;</span>
          <span style={{ fontWeight: 700, fontSize: "16px" }}>SDKCraft</span>
        </Link>
        <Link to="/" style={{ color: "#888", fontSize: "14px", textDecoration: "none" }}>Home</Link>
      </nav>
      <main style={{ maxWidth: "760px", margin: "0 auto", padding: "72px 24px" }}>
        <h1 style={{ fontSize: "40px", fontWeight: 800, marginBottom: "12px" }}>Blog</h1>
        <p style={{ color: "#888", fontSize: "16px", marginBottom: "48px" }}>
          Guides on OpenAPI, typed SDKs, and API tooling.
        </p>
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            style={{ display: "block", padding: "24px 0", borderBottom: "1px solid #1a1a1a", textDecoration: "none", color: "inherit" }}
          >
            <div style={{ color: "#555", fontSize: "13px", marginBottom: "8px" }}>{post.date}</div>
            <div style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>{post.title}</div>
            <div style={{ color: "#888", fontSize: "15px", lineHeight: 1.6 }}>{post.description}</div>
          </Link>
        ))}
      </main>
    </div>
  );
}
