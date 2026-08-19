// بيولّد public/sitemap.xml تلقائيًا قبل كل build (شوف "prebuild" في package.json).
// بيقرأ عناوين المقالات من blogPosts.ts، فمش محتاج تعديل يدوي لما تضيف مقالة جديدة —
// بس ضيفها في blogPosts.ts عادي وهتظهر في الـ sitemap تلقائيًا في أول build جاي.
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://www.sdkcraft.com";

function extractSlugs(blogPostsSource) {
  const matches = [...blogPostsSource.matchAll(/slug:\s*"([^"]+)"/g)];
  return matches.map((m) => m[1]);
}

function buildSitemap(urls) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = urls
    .map(
      ({ loc, priority }) => `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority}</priority>
  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function main() {
  const blogPostsPath = path.join(__dirname, "..", "src", "blogPosts.ts");
  const source = fs.readFileSync(blogPostsPath, "utf-8");
  const slugs = extractSlugs(source);

  const urls = [
    { loc: "/", priority: "1.0" },
    { loc: "/pricing", priority: "0.8" },
    { loc: "/blog", priority: "0.8" },
    ...slugs.map((slug) => ({ loc: `/blog/${slug}`, priority: "0.6" })),
  ];

  const xml = buildSitemap(urls);
  const outPath = path.join(__dirname, "..", "public", "sitemap.xml");
  fs.writeFileSync(outPath, xml, "utf-8");
  console.log(`sitemap.xml generated with ${urls.length} URLs`);
}

main();
