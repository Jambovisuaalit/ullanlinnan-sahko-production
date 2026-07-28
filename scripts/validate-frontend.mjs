import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const sourceFiles = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (["node_modules", ".next"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (/\.(ts|tsx|css)$/.test(entry.name)) sourceFiles.push(full);
  }
}

await walk(path.join(root, "src"));

const errors = [];
const warnings = [];
const requiredRoutes = [
  "src/app/page.tsx",
  "src/app/sahkoasennukset-ja-vikakorjaukset/page.tsx",
  "src/app/valaistus-ja-valaisinasennukset/page.tsx",
  "src/app/valaisimien-korjaus/page.tsx",
  "src/app/taloyhtioille-ja-yrityksille/page.tsx",
  "src/app/myymala/page.tsx",
  "src/app/meista/page.tsx",
  "src/app/yhteystiedot/page.tsx",
  "src/app/not-found.tsx"
];

for (const relative of requiredRoutes) {
  try {
    await stat(path.join(root, relative));
  } catch {
    errors.push(`Missing route: ${relative}`);
  }
}

for (const file of sourceFiles.filter((item) => /\.tsx?$/.test(item))) {
  const text = await readFile(file, "utf8");
  const rel = path.relative(root, file);
  const allowsImageResponseMarkup = /src[\\/]app[\\/](opengraph-image|twitter-image)\.tsx$/.test(rel);

  if (/<img\b/.test(text) && !allowsImageResponseMarkup) {
    errors.push(`${rel}: direct <img> found; use Next Image or an approved asset component.`);
  }
  if (/style=\{\{[^}]*position\s*:/.test(text)) errors.push(`${rel}: inline positional layout style found.`);
  if (/\bany\b/.test(text) && !/company/.test(rel)) warnings.push(`${rel}: review possible explicit any usage.`);

  for (const match of text.matchAll(/from\s+["'](@\/[^"']+)["']/g)) {
    const importPath = match[1].replace("@/", "src/");
    const candidates = [
      importPath,
      `${importPath}.ts`,
      `${importPath}.tsx`,
      path.join(importPath, "index.ts"),
      path.join(importPath, "index.tsx")
    ];
    let found = false;

    for (const candidate of candidates) {
      try {
        await stat(path.join(root, candidate));
        found = true;
        break;
      } catch {}
    }

    if (!found) errors.push(`${rel}: unresolved import ${match[1]}`);
  }
}

const pageComposition = await readFile(path.join(root, "src/components/pages/HomePage.tsx"), "utf8");
if ((pageComposition.match(/<Home[A-Z]/g) ?? []).length < 8) {
  errors.push("HomePage is not composed from reusable section components.");
}

const navigationSource = await readFile(path.join(root, "src/components/layout/SiteNavigation.tsx"), "utf8");
for (const requirement of [
  'const DESKTOP_MEDIA_QUERY = "(min-width: 68rem)"',
  'aria-expanded={dropdownOpen}',
  '{dropdownOpen ? (',
  'setDropdownOpen(false)',
  'aria-controls="desktop-service-menu"',
  'data-state={dropdownOpen ? "open" : "closed"}',
  'desktopQuery.addEventListener("change", syncNavigationMode)',
  'role="dialog"',
  'aria-modal="true"',
  'data-drawer-close',
  'document.body.dataset.scrollLock = "true"'
]) {
  if (!navigationSource.includes(requirement)) {
    errors.push(`SiteNavigation is missing responsive requirement: ${requirement}`);
  }
}

if (navigationSource.includes('hidden={!dropdownOpen}')) {
  errors.push("Desktop service dropdown must be conditionally rendered instead of relying on CSS to hide a mounted panel.");
}

const frontendCss = await readFile(path.join(root, "src/styles/frontend-v06.css"), "utf8");
for (const requirement of [
  "[hidden]",
  "display: none !important",
  ".nav-dropdown[data-state=\"closed\"] > .nav-dropdown__panel",
  "height: 100dvh",
  "overflow-x: clip",
  "env(safe-area-inset-bottom)",
  ".feature-copy > .button",
  "@media (max-width: 67.99rem)",
  "@media (min-width: 68rem)",
  ".mobile-drawer-layer",
  ".service-grid",
  ".contact-layout",
  ".footer-grid"
]) {
  if (!frontendCss.includes(requirement)) {
    errors.push(`Frontend V06 is missing responsive safeguard: ${requirement}`);
  }
}

const globalCss = await readFile(path.join(root, "src/app/globals.css"), "utf8");
if (!globalCss.includes('@import "../styles/frontend-v06.css";')) {
  errors.push("Frontend V06 stylesheet is not loaded by globals.css.");
}

for (const legacyImport of ["ux-v03.css", "ux-v04.css", "ux-v05.css"]) {
  if (globalCss.includes(legacyImport)) {
    errors.push(`Legacy cascade layer must not be imported after consolidation: ${legacyImport}`);
  }
}

const tokensCss = await readFile(path.join(root, "src/styles/tokens.css"), "utf8");
for (const token of [
  "--container-main-max: 80rem",
  "--container-text-max: 45rem",
  "--container-form-max: 40rem",
  "--container-media-max: 90rem",
  "--grid-columns: 4",
  "--grid-columns: 6",
  "--grid-columns: 8",
  "--grid-columns: 12"
]) {
  if (!tokensCss.includes(token)) errors.push(`Missing design token: ${token}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Frontend validation passed for ${sourceFiles.length} source files.`);
if (warnings.length) console.warn(warnings.join("\n"));
