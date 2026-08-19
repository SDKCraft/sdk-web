import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./Landing";
import Pricing from "./Pricing";
import BlogList from "./BlogList";
import BlogPost from "./BlogPost";
import Console from "./Console";
import { supabase } from "./supabase";

function getRedirectUrl() {
  return window.location.origin;
}

export default function App() {
  const navigate = useNavigate();
  // بنحتفظ بحالة user خفيفة هنا بس عشان الـ nav بتاع Landing (يوري صورة/زرار Login
  // أو Logout). صفحة Console عندها نسخة خاصة بيها من نفس المنطق لأنها مستقلة تمامًا
  // (route منفصل)، فكل صفحة بتتحقق من جلسة Supabase بنفسها بدل ما نلف الشجرة كلها
  // بـ context مشترك — أبسط وكافي للحجم الحالي للمشروع.
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: getRedirectUrl(),
        scopes: "repo user",
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Landing
            onStart={() => navigate("/console")}
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onPricing={() => navigate("/pricing")}
          />
        }
      />
      <Route path="/pricing" element={<Pricing onStart={() => navigate("/console")} />} />
      <Route path="/blog" element={<BlogList />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/console" element={<Console />} />
    </Routes>
  );
}
