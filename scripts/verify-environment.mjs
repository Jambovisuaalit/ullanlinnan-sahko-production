const vercelEnv = process.env.VERCEL_ENV?.trim();
const isPreview = vercelEnv === "preview" || process.env.ALLOW_PREVIEW_ENV === "true";
const explicitSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelUrl = process.env.VERCEL_URL?.trim();
const siteUrl = explicitSiteUrl || (vercelUrl ? `https://${vercelUrl}` : "");
const webhook = process.env.CONTACT_FORM_WEBHOOK_URL?.trim();
const resendKey = process.env.RESEND_API_KEY?.trim();
const resendFrom = process.env.CONTACT_FORM_FROM?.trim();
const resendRecipient = process.env.CONTACT_FORM_RECIPIENT?.trim();
const demoMode = process.env.CONTACT_FORM_DEMO_MODE === "true";
const pricingEnabled = process.env.NEXT_PUBLIC_ENABLE_PRICING === "true";
const hourlyRate = process.env.ELECTRICIAN_HOURLY_RATE_DISPLAY?.trim();
const analyticsEnabled = process.env.NEXT_PUBLIC_ENABLE_GA4 === "true";
const ga4MeasurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();
const legalContentApproved = process.env.NEXT_PUBLIC_LEGAL_CONTENT_APPROVED === "true";

const isValidHttps = (value) => Boolean(value && /^https:\/\//i.test(value));
const isPlaceholder = (value) => /VAHVISTETTAVA|LOPULLINEN|localhost|example\.invalid|preview\.invalid/i.test(value || "");
const isValidGa4Id = (value) => Boolean(value && /^G-[A-Z0-9]+$/i.test(value));
const failures = [];

if (!isValidHttps(siteUrl)) {
  failures.push("NEXT_PUBLIC_SITE_URL or VERCEL_URL must resolve to an HTTPS URL.");
}

if (!isPreview && (!explicitSiteUrl || isPlaceholder(explicitSiteUrl))) {
  failures.push("Production requires the final HTTPS NEXT_PUBLIC_SITE_URL.");
}

const hasResendTransport = Boolean(resendKey && resendFrom && resendRecipient);
const hasWebhookTransport = isValidHttps(webhook) && !isPlaceholder(webhook);

if (!isPreview && !hasResendTransport && !hasWebhookTransport) {
  failures.push("Production requires a complete Resend configuration or a verified HTTPS CONTACT_FORM_WEBHOOK_URL.");
}

if (!isPreview && demoMode) {
  failures.push("CONTACT_FORM_DEMO_MODE must be disabled in production.");
}

if (pricingEnabled && (!hourlyRate || isPlaceholder(hourlyRate))) {
  failures.push("NEXT_PUBLIC_ENABLE_PRICING=true requires Hanna's exact approved ELECTRICIAN_HOURLY_RATE_DISPLAY value.");
}

if (analyticsEnabled && !isValidGa4Id(ga4MeasurementId)) {
  failures.push("NEXT_PUBLIC_ENABLE_GA4=true requires a valid NEXT_PUBLIC_GA4_MEASUREMENT_ID such as G-XXXXXXXXXX.");
}

if (analyticsEnabled && !legalContentApproved) {
  failures.push("NEXT_PUBLIC_ENABLE_GA4=true requires NEXT_PUBLIC_LEGAL_CONTENT_APPROVED=true before analytics can be enabled.");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(isPreview ? "Preview environment verification passed." : "Production environment verification passed.");
