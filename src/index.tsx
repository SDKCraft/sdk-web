import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { inject, track } from '@vercel/analytics';
import { initAnalytics } from './lib/analytics';

inject();
initAnalytics();

// بيسجّل مصدر الزيارة (لو الرابط فيه utm_source) كـ custom event في Vercel Analytics،
// عشان نقدر نعرف بالظبط أي قناة (X, LinkedIn, Reddit, Facebook...) فعلاً بتجيب زوار،
// بدل ما نخمّن من مجرد شكل الرسم البياني وقت النشر في كذا مكان في نفس اليوم.
const utmSource = new URLSearchParams(window.location.search).get("utm_source");
if (utmSource) {
  track("campaign_visit", { source: utmSource });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
