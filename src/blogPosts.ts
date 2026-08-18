export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  content: string;
}

/**
 * محتوى المدونة — الهدف منها SEO عضوي: كل مقالة بتستهدف كلمات بحث حقيقية
 * (زي "openapi to typescript sdk") بدل ما تعتمد على ترافيك مؤقت من منشورات
 * السوشيال ميديا بس. أضف مقالات جديدة هنا وهتظهر تلقائيًا في /blog.
 */
export const blogPosts: BlogPost[] = [
  {
    slug: "openapi-to-typescript-sdk-guide",
    title: "OpenAPI to TypeScript SDK: The Complete Guide",
    description:
      "How to turn an OpenAPI spec into a type-safe TypeScript client — manually, with popular generators, and with SDKCraft.",
    date: "2026-08-19",
    content: `
If your API has an OpenAPI (Swagger) spec, you don't need to hand-write a client library. This guide walks through what a good generated SDK should look like, and how to get there quickly.

## Why generate instead of hand-write

A hand-written API client tends to drift from the actual API over time — someone adds a field on the backend, and nobody updates the client types. A generated SDK is derived directly from the spec, so it can never be out of sync as long as you regenerate it.

The other benefit is speed. Writing typed request/response models, error handling, retries, and pagination helpers by hand for even a mid-sized API easily takes a day or two. Generation takes seconds.

## What a good generated SDK needs

Not all generators are equal. When evaluating one (or building your own), check for:

- **Accurate \`$ref\` resolution** — nested object references should map to real interfaces, not collapse into \`string\`.
- **Enum support** — string enums in your spec should become TypeScript union types, not generic strings.
- **oneOf / discriminator support** — polymorphic types are common in payment, event, and notification APIs. A generator that silently drops these will produce broken types for exactly the fields you most need type safety on.
- **Runtime validation** — compile-time types don't protect you from a backend that quietly changes shape. Pairing generated types with a runtime validator (like Zod) catches mismatches at the network boundary instead of three components deep in your UI.
- **Retry and error handling built in** — a generated client that just wraps \`fetch\` with no retry logic isn't saving you much work.

## Manual approach vs. generators

You have three broad options:

1. **Write it by hand.** Fine for a handful of endpoints, painful past that.
2. **Use a general-purpose generator** (openapi-generator, swagger-codegen). Mature and widely used, but templates are verbose and often produce Java-style code even for TypeScript output.
3. **Use a tool built specifically for modern TypeScript** that treats types, not just method stubs, as the primary output.

## Trying it with SDKCraft

[SDKCraft](https://sdkcraft.com) takes an OpenAPI spec and generates a typed client in TypeScript (plus Python, Go, Java, C#, Kotlin, Swift, and Dart) — including proper handling of nested \`$ref\`s, enums, and discriminated unions, plus a mock client so frontend work isn't blocked on backend availability. Upload a spec and try it directly in the browser, no signup required for the free tier.

## Takeaway

If you already maintain an OpenAPI spec, generating your SDK is close to free — the only cost is picking a generator that actually produces the types your codebase deserves.
`,
  },
];
