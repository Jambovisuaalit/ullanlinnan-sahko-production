import { expect, test, type Page } from "@playwright/test";

const snapshotRoutes = [
  { path: "/", name: "home" },
  { path: "/valaisimien-korjaus", name: "lamp-repair" },
  { path: "/myymala", name: "store" }
] as const;

const approvedNavigation = ["Sähkötyöt", "Valaisimet", "Myymälä", "Meistä", "Yhteystiedot"] as const;

async function preparePage(page: Page, path: string) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(path, { waitUntil: "networkidle" });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation: none !important;
        transition: none !important;
        caret-color: transparent !important;
      }
    `
  });
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

test.describe("responsive visual regression", () => {
  for (const route of snapshotRoutes) {
    test(`${route.name} has no horizontal overflow`, async ({ page }) => {
      await preparePage(page, route.path);

      const layout = await page.evaluate(() => {
        const viewportWidth = document.documentElement.clientWidth;
        const selectors = [
          "figure.media-frame",
          ".media-brand-panel",
          ".media-requirement",
          ".mobile-action-bar",
          ".analytics-consent"
        ];
        const offenders = selectors.flatMap((selector) =>
          Array.from(document.querySelectorAll<HTMLElement>(selector)).flatMap((element) => {
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            const visible = style.display !== "none" && style.visibility !== "hidden" && rect.width > 0;
            const overflows = rect.left < -0.5 || rect.right > viewportWidth + 0.5;
            return visible && overflows
              ? [{ selector, left: rect.left, right: rect.right, width: rect.width, viewportWidth }]
              : [];
          })
        );

        return {
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: viewportWidth,
          offenders
        };
      });

      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
      expect(layout.offenders).toEqual([]);
      await expect(page).toHaveScreenshot(`${route.name}-full-page.png`, {
        fullPage: true
      });
    });
  }

  test("390px mobile critical surfaces stay fluid", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile-390", "390px-specific regression gate");
    await preparePage(page, "/");

    const diagnostics = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth;
      const bar = document.querySelector<HTMLElement>(".mobile-action-bar");
      const barRect = bar?.getBoundingClientRect() ?? null;
      const linkRects = bar
        ? Array.from(bar.querySelectorAll<HTMLElement>("a")).map((link) => link.getBoundingClientRect())
        : [];
      const iconRects = bar
        ? Array.from(bar.querySelectorAll<SVGElement>("a > svg")).map((icon) => icon.getBoundingClientRect())
        : [];
      const honeypot = document.querySelector<HTMLElement>(".honeypot");
      const honeypotRect = honeypot?.getBoundingClientRect() ?? null;

      return {
        viewportWidth,
        bar: barRect && { left: barRect.left, right: barRect.right, width: barRect.width },
        links: linkRects.map((rect) => ({ left: rect.left, right: rect.right, width: rect.width })),
        icons: iconRects.map((rect) => ({ width: rect.width, height: rect.height })),
        honeypot:
          honeypotRect && {
            left: honeypotRect.left,
            right: honeypotRect.right,
            width: honeypotRect.width,
            height: honeypotRect.height
          }
      };
    });

    expect(diagnostics.bar).not.toBeNull();
    expect(diagnostics.bar?.left).toBeGreaterThanOrEqual(-0.5);
    expect(diagnostics.bar?.right).toBeLessThanOrEqual(diagnostics.viewportWidth + 0.5);
    expect(diagnostics.bar?.width).toBeLessThanOrEqual(diagnostics.viewportWidth);
    expect(diagnostics.links).toHaveLength(2);
    for (const link of diagnostics.links) {
      expect(link.width).toBeLessThanOrEqual(diagnostics.viewportWidth / 2 + 0.5);
    }
    for (const icon of diagnostics.icons) {
      expect(icon.width).toBeLessThanOrEqual(24);
      expect(icon.height).toBeLessThanOrEqual(24);
    }
    expect(diagnostics.honeypot).not.toBeNull();
    expect(Math.abs(diagnostics.honeypot?.left ?? 0)).toBeLessThanOrEqual(2);
    expect(diagnostics.honeypot?.width).toBeLessThanOrEqual(1);
    expect(diagnostics.honeypot?.height).toBeLessThanOrEqual(1);
  });

  test("navigation is closed on first render and desktop uses approved flat links", async ({ page }) => {
    await preparePage(page, "/");

    await expect(page.locator("#mobile-navigation")).toHaveCount(0);
    await expect(page.locator("#desktop-service-menu")).toHaveCount(0);

    const mobileTrigger = page.getByRole("button", { name: "Avaa sivuston valikko" });
    if (await mobileTrigger.isVisible()) {
      await expect(mobileTrigger).toHaveAttribute("aria-expanded", "false");
    }

    const desktopNav = page.getByRole("navigation", { name: "Päänavigaatio" });
    if (await desktopNav.isVisible()) {
      for (const label of approvedNavigation) {
        await expect(desktopNav.getByRole("link", { name: label, exact: true })).toBeVisible();
      }
    }
  });

  test("navigation interaction matches the active breakpoint", async ({ page }) => {
    await preparePage(page, "/");

    const mobileTrigger = page.getByRole("button", { name: "Avaa sivuston valikko" });
    if (await mobileTrigger.isVisible()) {
      await mobileTrigger.click();
      await expect(page.locator("#mobile-navigation")).toBeVisible();
      await expect(mobileTrigger).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator(".mobile-drawer-layer")).toHaveScreenshot("mobile-navigation-open.png");
      return;
    }

    const desktopNav = page.getByRole("navigation", { name: "Päänavigaatio" });
    await expect(desktopNav).toBeVisible();
    for (const label of approvedNavigation) {
      await expect(desktopNav.getByRole("link", { name: label, exact: true })).toBeVisible();
    }
    await expect(page.locator(".site-header")).toHaveScreenshot("desktop-navigation-flat.png");
  });

  test("unconfirmed production gates stay disabled by default", async ({ page }) => {
    await preparePage(page, "/");

    await expect(page.locator("#hinnasto")).toHaveCount(0);
    await expect(page.locator("#contact-attachments")).toHaveCount(0);
    await expect(page.locator(".analytics-consent")).toHaveCount(0);
  });

  test("retired small-electrical URL returns a permanent 301", async ({ request }) => {
    const response = await request.get("/pienet-sahkotyot-helsinki", { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    expect(response.headers()["location"]).toContain("/sahkoasennukset-ja-vikakorjaukset");
  });
});
