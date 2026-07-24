import { access } from "node:fs/promises";
import path from "node:path";

const requiredAlways = [
  "public/brand/USOY_LOGO_HEADER_COMPACT_BLACK_RGB_SVG.svg",
  "public/brand/USOY_LOGO_HEADER_COMPACT_PAPER_RGB_SVG.svg",
  "public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_RGB_SVG.svg",
  "public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_ICO_MULTI.ico",
  "public/brand/USOY_LOGO_APPLE_TOUCH_BLACK_ON_PAPER_PNG_180X180.png",
  "public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_PNG_192X192.png",
  "public/brand/USOY_LOGO_FAVICON_BLACK_ON_PAPER_PNG_512X512.png"
];
const productionOnly = ["public/brand/icons/USOY_ICON_SPRITE.svg"];

async function missingFiles(files) {
  const missing = [];
  for (const relative of files) {
    try { await access(path.resolve(relative)); } catch { missing.push(relative); }
  }
  return missing;
}

const missingAlways = await missingFiles(requiredAlways);
if (missingAlways.length) {
  console.error(["Required approved V04 assets are missing:", ...missingAlways.map((item) => `- ${item}`)].join("\n"));
  process.exit(1);
}

const missingProduction = await missingFiles(productionOnly);
if (!missingProduction.length) {
  console.log("Brand and icon asset verification passed.");
  process.exit(0);
}

const message = [
  "Approved production icon library is missing:",
  ...missingProduction.map((item) => `- ${item}`),
  "Do not recreate or substitute the approved icons."
].join("\n");

const allowPreview = process.env.ALLOW_MISSING_BRAND_ASSETS === "true" || process.env.VERCEL_ENV === "preview";
if (allowPreview) {
  console.warn(`${message}\nPreview/CI build may continue; production release remains blocked.`);
  process.exit(0);
}

console.error(message);
process.exit(1);
