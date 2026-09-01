import LegalPage from "./LegalPage";

const PRIVACY_CONTENT_EN = `BMS ("we", "us", "the Company") operates the SDKCraft platform ("the Platform"), available at sdkcraft.com. This policy explains what data we collect from Platform users, how we use it, who we share it with, and your rights regarding it.

## 1. Data We Collect

### a) GitHub Account Data (via OAuth Sign-In)
When you sign in with GitHub, we receive your display name, the email address associated with your GitHub account, and your GitHub account ID. We use this to identify your account within the Platform and link it to your usage data.

**Important:** We use your GitHub access token only temporarily during an active operation (such as exporting a generated SDK to a GitHub repository). We do not store this token permanently in our database.

### b) Account and Usage Data
We store in our database (hosted via Supabase, with servers located in the EU): your remaining free-tier usage counts (SDK generation, documentation generation, batch uploads, change detection), the date your daily quota was last reset, and your subscription status (free/paid).

### c) Generation History
We keep a record of your SDK generation activity (such as the language selected and the date), to display your activity history within your account and to help us improve the service.

### d) Content of OpenAPI Files You Upload
When you upload an API specification file (OpenAPI/Swagger) to generate an SDK or detect changes against a previous version, the file is processed on our servers (hosted via Render) temporarily, solely for generation purposes, and is deleted from the server immediately after processing completes. **We do not permanently store the content of your API files.**

If you use the "AI-Powered Documentation" feature, the content of your specification file is sent to a third-party AI provider (via OpenRouter, which may route to models from Anthropic or other providers) to generate documentation text. Please do not upload API specifications containing sensitive or confidential data when using this specific feature.

### e) Contact Messages
If you contact us via the "Contact Us" form, we retain your message and email address in order to respond to you.

### f) Analytics Data
We use PostHog to analyze Platform usage (such as sign-ups, package downloads, SDK generation, and GitHub exports). This may include linking your activity to your email address if you are signed in. This data is processed on PostHog's servers (United States).

## 2. How We Use Your Data
- To operate the Platform and provide SDK generation and change-detection services.
- To track your free-tier usage quota and enforce fair-use limits.
- To respond to inquiries submitted through the contact form.
- To improve the Platform and understand usage patterns (via aggregated analytics).
- To prevent abuse of the Platform (such as rate-limit circumvention).

## 3. Who We Share Your Data With
We share limited data with the following service providers, only to the extent necessary to operate the Platform:
- **Supabase** â€” database hosting and authentication.
- **Vercel** â€” hosting of the Platform's frontend.
- **Render** â€” hosting of the file-processing and SDK-generation server.
- **GitHub** â€” for authentication (OAuth) and optional export to your repositories.
- **PostHog** â€” analytics.
- **OpenRouter / AI model providers** â€” only when you use the AI documentation feature; only the content of the uploaded file is sent, not your personal account data.

We do not sell your data to any third party for marketing purposes.

## 4. Data Retention
- Account and usage data: retained while your account is active; you may request deletion at any time.
- Uploaded API files: deleted immediately after processing (not stored).
- Contact messages: retained to follow up on inquiries, and can be deleted upon your request.

## 5. Your Rights
You may contact us at any time to request access to, correction of, or complete deletion of the data we hold about you. If you are located in the European Union or a region with similar regulations (GDPR), these rights are guaranteed to you regardless of where the service is hosted.

## 6. Data Security
We apply reasonable technical measures to protect your data, including: database-level access control (Row Level Security), encrypted transport (HTTPS/TLS) between your browser and our servers, and restricting API access to the Platform's official domains only.

## 7. Children's Privacy
The Platform is not directed at children under the age of 18, and we do not knowingly collect data from minors.

## 8. Governing Law
This policy is governed by and construed in accordance with the laws of Libya.

## 9. Changes to This Policy
We may update this policy from time to time. The "last updated" date at the top of this page will reflect the most recent revision, and for material changes we will make reasonable efforts to notify you via your registered email address or an in-Platform notice.

## 10. Contact Us
For any privacy-related inquiry or to request deletion of your data, please contact us at:
**[ihsan.elashhab@gmail.com]**`;

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="[DATE]"
      content={PRIVACY_CONTENT_EN}
      lang="en"
      altLangHref="/privacy/ar"
      altLangLabel="Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©"
    />
  );
}
