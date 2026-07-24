const vercelEnv = process.env.VERCEL_ENV?.trim();
const isPreview = vercelEnv === "preview" || process.env.ALLOW_PREVIEW_ENV === "true";
const explicitSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelUrl = process.env.VERCEL_URL?.trim();
const siteUrl = explicitSiteUrl || (vercelUrl ? `https://${vercelUrl}` : "");
const webhook = process.env.CONTACT_FORM_WEBHOOK_URL?.trim();

const isValidHttps = (value) => Boolean(value && /^https:\/\//i.test(value));
const isPlaceholder = (value) => /VAHVISTETTAVA|LOPULLINEN|localhost|example\.invalid|preview\.invalid/i.test(value || "");
const failures = [];

if (!isValidHttps(siteUrl)) {
  failures.push("NEXT_PUBLIC_SITE_URL or VERCEL_URL must resolve to an HTTPS URL.");
}

if (!isPreview && (!explicitSiteUrl || isPlaceholder(explicitSiteUrl))) {
  failures.push("Production requires the final HTTPS NEXT_PUBLIC_SITE_URL.");
}

if (!isPreview && (!isValidHttps(webhook) || isPlaceholder(webhook))) {
  failures.push("Production requires a verified HTTPS CONTACT_FORM_WEBHOOK_URL.");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(isPreview ? "Preview environment verification passed." : "Production environment verification passed.");
