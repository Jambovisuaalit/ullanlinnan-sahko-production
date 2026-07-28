import { expect, test, type Page } from "@playwright/test";

const snapshotRoutes = [
  { path: "/", name: "home" },
  { path: "/valaisimien-korjaus", name: "lamp-repair" },
  { path: "/myymala", name: "store" }
] as const;

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

      const layout = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      }));

      expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
      await expect(page).toHaveScreenshot(`${route.name}-full-page.png`, {
        fullPage: true
      });
    });
  }

  test("navigation is closed on first render", async ({ page }) => {
    await preparePage(page, "/");

    await expect(page.locator("#desktop-service-menu")).toHaveCount(0);
    await expect(page.locator("#mobile-navigation")).toHaveCount(0);

    const serviceTrigger = page.getByRole("button", { name: /Palvelut/ });
    if (await serviceTrigger.isVisible()) {
      await expect(serviceTrigger).toHaveAttribute("aria-expanded", "false");
    }

    const mobileTrigger = page.getByRole("button", { name: "Avaa sivuston valikko" });
    if (await mobileTrigger.isVisible()) {
      await expect(mobileTrigger).toHaveAttribute("aria-expanded", "false");
    }
  });

  test("navigation open state matches the active breakpoint", async ({ page }) => {
    await preparePage(page, "/");

    const serviceTrigger = page.getByRole("button", { name: /Palvelut/ });
    if (await serviceTrigger.isVisible()) {
      await serviceTrigger.click();
      await expect(page.locator("#desktop-service-menu")).toBeVisible();
      await expect(page.locator(".site-header")).toHaveScreenshot("desktop-services-open.png");
      return;
    }

    const mobileTrigger = page.getByRole("button", { name: "Avaa sivuston valikko" });
    await mobileTrigger.click();
    await expect(page.locator("#mobile-navigation")).toBeVisible();
    await expect(page.locator(".mobile-drawer-layer")).toHaveScreenshot("mobile-navigation-open.png");
  });
});
