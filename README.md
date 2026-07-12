# SDKCraft Web

SDKCraft is a developer-facing web app for turning OpenAPI specs into production-ready SDKs, starter documentation, and API change reports.

## What It Does

- Generate SDK files from OpenAPI JSON or YAML.
- Support 8 languages: TypeScript, Python, Go, Java, C#, Kotlin, Swift, and Dart.
- Every generated SDK includes: typed models, structured errors, smart retries (idempotent requests only), request timeouts, and a built-in **MockClient** with the exact same interface as the real client — for offline frontend development and testing without a live backend.
- Preview generated files in the browser.
- Download a complete SDK ZIP.
- Generate starter API documentation.
- Compare two API versions for breaking changes.
- Optionally sign in with GitHub for SDK history and GitHub export.

## Local Setup

Install dependencies:
```bash
npm install
```

Create `.env`:
```bash
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_API_BASE_URL=https://api-to-sdk.onrender.com
```

Start the app:
```bash
npm start
```

Build for production:
```bash
npm run build
```

## Product Hunt Launch Notes

Recommended Product Hunt name:
```text
SDKCraft
```

Recommended tagline:
```text
Turn OpenAPI specs into production-ready SDKs
```

Recommended positioning:
```text
SDKCraft helps API teams turn OpenAPI specs into production-ready SDKs, starter docs, and API change reports from one browser-based workflow.
```

## Environment

The app reads Supabase credentials from environment variables. Do not hard-code keys in `src/supabase.ts`.

`REACT_APP_API_BASE_URL` is optional. If it is not set, the app uses the current Render backend URL (`https://api-to-sdk.onrender.com`).

**Important:** `REACT_APP_*` variables are baked into the build at build time, not read at runtime. Editing `.env` locally has no effect on the deployed site — you must update the Environment Variables in the Vercel project settings and trigger a redeploy for changes to take effect on production.

## Usage Limits

The AI-powered features (starter documentation generation) currently use a free-tier model via OpenRouter, which is subject to strict rate limits. **This must be clearly communicated to visitors** (e.g. "X free generations per month" or similar) before launch, so users aren't surprised by a sudden failure. See the note in the Deployment Checklist below.

## Deployment Checklist

- Configure Supabase OAuth redirect URLs for the deployed domain.
- Set Vercel environment variables for Supabase and backend URL (`REACT_APP_API_BASE_URL` → Render URL), and redeploy after any change.
- Confirm the main generation flow works without signup.
- Confirm GitHub sign-in works on the production domain.
- Clearly display the free-tier usage limit (and whether it resets monthly) to visitors in the UI before they hit it.
- Plan a paid-model fallback (e.g. Claude Haiku, GPT-4o-mini, or Gemini Flash) for AI-powered features once the free-tier rate limit is reached, to avoid service interruption as usage grows.
- Run `npm run build` before publishing launch screenshots.

---

## 📄 License

MIT © SDKCraft
