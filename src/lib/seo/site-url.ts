const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelUrl = process.env.VERCEL_URL?.trim();
const resolved = explicit || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

export const siteUrl = new URL(/^https?:\/\//.test(resolved) ? resolved : `https://${resolved}`);

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
