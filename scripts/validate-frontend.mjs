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

async function exists(relativePath) {
  try {
    await stat(path.join(root, relativePath));
    return true;
  } catch {
    return false;
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
  if (!(await exists(relative))) errors.push(`Missing route: ${relative}`);
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
      if (await exists(candidate)) {
        found = true;
        break;
      }
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
  "aria-expanded={dropdownOpen}",
  "{dropdownOpen ? (",
  "setDropdownOpen(false)",
  'aria-controls="desktop-service-menu"',
  'data-state={dropdownOpen ? "open" : "closed"}',
  'desktopQuery.addEventListener("change", syncNavigationMode)',
  'role="dialog"',
  'aria-modal="true"',
  "data-drawer-close",
  'document.body.dataset.scrollLock = "true"'
]) {
  if (!navigationSource.includes(requirement)) {
    errors.push(`SiteNavigation is missing responsive requirement: ${requirement}`);
  }
}

if (navigationSource.includes('hidden={!dropdownOpen}')) {
  errors.push("Desktop service dropdown must be conditionally rendered instead of relying on CSS to hide a mounted panel.");
}

const componentsCss = await readFile(path.join(root, "src/styles/components.css"), "utf8");
for (const requirement of [
  "[hidden]",
  "display: none !important",
  '.nav-dropdown[data-state="closed"] > .nav-dropdown__panel',
  "height: 100dvh",
  "env(safe-area-inset-bottom)",
  ".mobile-drawer-layer",
  ".contact-layout",
  ".footer-grid",
  ".media-brand-panel",
  "@media (max-width: 67.99rem)",
  "@media (min-width: 68rem)"
]) {
  if (!componentsCss.includes(requirement)) {
    errors.push(`components.css is missing consolidated safeguard: ${requirement}`);
  }
}

const pagesCss = await readFile(path.join(root, "src/styles/pages.css"), "utf8");
for (const requirement of [
  "overflow-x: clip",
  ".feature-copy > .button",
  ".service-grid",
  ".priority-service-links",
  ".hero-layout",
  ".contact-layout",
  ".footer-grid",
  "@media (min-width: 74rem)",
  "@media (min-width: 76rem)"
]) {
  if (!pagesCss.includes(requirement)) {
    errors.push(`pages.css is missing consolidated layout rule: ${requirement}`);
  }
}

const globalCss = await readFile(path.join(root, "src/app/globals.css"), "utf8");
for (const requiredImport of [
  '@import "../styles/tokens.css";',
  '@import "../styles/base.css";',
  '@import "../styles/components.css";',
  '@import "../styles/pages.css";'
]) {
  if (!globalCss.includes(requiredImport)) errors.push(`globals.css is missing import: ${requiredImport}`);
}

for (const obsoleteImport of [
  "audit-v02.css",
  "frontend-v06.css",
  "ux-v03.css",
  "ux-v04.css",
  "ux-v05.css"
]) {
  if (globalCss.includes(obsoleteImport)) {
    errors.push(`Obsolete cascade layer must not be imported: ${obsoleteImport}`);
  }
}

for (const obsoleteFile of ["src/styles/audit-v02.css", "src/styles/frontend-v06.css"]) {
  if (await exists(obsoleteFile)) errors.push(`Merged stylesheet must be removed: ${obsoleteFile}`);
}

const brandLogoSource = await readFile(path.join(root, "src/components/layout/BrandLogo.tsx"), "utf8");
for (const forbidden of ['"use client"', "useState", "onError="]) {
  if (brandLogoSource.includes(forbidden)) {
    errors.push(`BrandLogo must remain a server component; found ${forbidden}`);
  }
}
if (!brandLogoSource.includes("priority={priority}")) {
  errors.push("BrandLogo must expose explicit image priority instead of prioritizing footer assets.");
}

const headerSource = await readFile(path.join(root, "src/components/layout/Header.tsx"), "utf8");
for (const requirement of ["<SiteNotice />", "<BrandLogo priority />", "<SiteNavigation />"]) {
  if (!headerSource.includes(requirement)) errors.push(`Header composition is missing: ${requirement}`);
}

const footerSource = await readFile(path.join(root, "src/components/layout/Footer.tsx"), "utf8");
for (const requirement of ["<FooterBrand />", "<FooterNavigation />", "<FooterContact />", "<FooterBottom />"]) {
  if (!footerSource.includes(requirement)) errors.push(`Footer composition is missing: ${requirement}`);
}

const visualTestFiles = [
  "playwright.config.ts",
  "tests/visual/frontend.visual.spec.ts",
  "tests/visual/README.md"
];
for (const relative of visualTestFiles) {
  if (!(await exists(relative))) errors.push(`Missing visual test asset: ${relative}`);
}

if (await exists("playwright.config.ts")) {
  const playwrightConfig = await readFile(path.join(root, "playwright.config.ts"), "utf8");
  for (const requirement of ["snapshotPathTemplate", "webServer", "mobile-320", "tablet-768", "desktop-1440"]) {
    if (!playwrightConfig.includes(requirement)) errors.push(`Playwright config is missing: ${requirement}`);
  }
}

if (await exists("tests/visual/frontend.visual.spec.ts")) {
  const visualSpec = await readFile(path.join(root, "tests/visual/frontend.visual.spec.ts"), "utf8");
  for (const requirement of ["toHaveScreenshot", "scrollWidth", "desktop-service-menu", "mobile-navigation"]) {
    if (!visualSpec.includes(requirement)) errors.push(`Visual regression spec is missing: ${requirement}`);
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
