import posthog from "posthog-js";

const POSTHOG_KEY = "phc_t9FAKiKQGDxYRBUrYKJmzutTcKk2683hJW4cB8upqb7j";
const POSTHOG_HOST = "https://us.i.posthog.com";

/**
 * بيهيّئ PostHog مرة واحدة بس عند تحميل التطبيق. بيتسجّل تلقائيًا:
 * pageviews, sessions, session duration, country, referrer — من غير أي كود إضافي.
 * الأحداث المخصصة (funnel) بنسجّلها يدويًا عن طريق trackEvent تحت.
 */
export function initAnalytics() {
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
    person_profiles: "identified_only",
  });
}

/**
 * أسماء أحداث الـ funnel الأساسي بتاع SDKCraft — استخدم القيم دي بالظبط
 * (مش نصوص حرة) عشان يفضل اسم الحدث ثابت ومتسق في تقارير PostHog.
 */
export type FunnelEvent =
  | "api_spec_uploaded"
  | "sdk_generated"
  | "download_zip"
  | "github_export"
  | "sign_up";

export function trackEvent(event: FunnelEvent, properties?: Record<string, unknown>) {
  posthog.capture(event, properties);
}

/** بيربط هوية المستخدم المسجّل بجلسته الحالية، عشان تقدر تتبّع نفس الشخص عبر أكتر من زيارة. */
export function identifyUser(userId: string, email?: string) {
  posthog.identify(userId, email ? { email } : undefined);
}
