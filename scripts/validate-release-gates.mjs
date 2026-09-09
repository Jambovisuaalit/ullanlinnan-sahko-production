import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (relative) => readFile(path.join(root, relative), "utf8");
const failures = [];

const [nextConfig, metadata, robots, envExample] = await Promise.all([
  read("next.config.ts"),
  read("src/lib/seo/metadata.ts"),
  read("src/app/robots.ts"),
  read(".env.example")
]);

for (const requirement of [
  'source: "/pienet-sahkotyot-helsinki"',
  'destination: "/sahkoasennukset-ja-vikakorjaukset"',
  "permanent: true"
]) {
  if (!nextConfig.includes(requirement)) {
    failures.push(`Legacy redirect gate missing from next.config.ts: ${requirement}`);
  }
}

if (!metadata.includes('process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true"')) {
  failures.push("Metadata must be fail-closed behind NEXT_PUBLIC_SITE_INDEXABLE.");
}
if (!metadata.includes("index: false, follow: false")) {
  failures.push("Metadata noindex/nofollow fallback is missing.");
}

if (!robots.includes('process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true"')) {
  failures.push("robots.txt must be fail-closed behind NEXT_PUBLIC_SITE_INDEXABLE.");
}
if (!robots.includes('disallow: "/"')) {
  failures.push("robots.txt must disallow crawling while the release gate is closed.");
}

if (!envExample.includes("NEXT_PUBLIC_SITE_INDEXABLE=false")) {
  failures.push(".env.example must default NEXT_PUBLIC_SITE_INDEXABLE to false.");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Release gate validation passed.");
