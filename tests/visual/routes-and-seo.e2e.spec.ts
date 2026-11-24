import { expect, test } from "@playwright/test";

const publicRoutes = [
  { path: "/", heading: "Sähkötyöt nopeasti ja luotettavasti" },
  { path: "/yhteystiedot", heading: "Ota yhteyttä Ullanlinnan Sähköön" },
  { path: "/alihankkijaksi", heading: "Oletko sähköalan ammattilainen?" },
  { path: "/verkkokauppa", heading: "Valikoidut tuotteet Ullanlinnan Sähköltä" },
  { path: "/meista", heading: "Paikallinen sähkö- ja valaistusalan yritys Helsingissä" },
  { path: "/myymala", heading: "Sähkö- ja valaisintarvikemyymälä Ullanlinnassa" },
  { path: "/sahkoasennukset-ja-vikakorjaukset", heading: "Sähköasennukset ja vikakorjaukset" },
  { path: "/sahkomies-ullanlinna", heading: "Sähkömies Ullanlinnassa" },
  { path: "/valaistus-ja-valaisinasennukset", heading: "Valaistus ja valaisinasennukset" },
  { path: "/valaisimien-korjaus", heading: "Valaisimen korjaus Helsingissä" },
  { path: "/vanhan-valaisimen-sahkoistys", heading: "Vanhan valaisimen sähköistys" },
  { path: "/valaisimen-johdon-vaihto", heading: "Valaisimen johdon vaihto" },
  { path: "/taloyhtioille-ja-yrityksille", heading: "Sähkötyöt taloyhtiöille ja yrityksille" },
  { path: "/taloyhtioiden-sahkotyot-helsinki", heading: "Taloyhtiöiden sähkötyöt Helsingissä" },
  { path: "/vanhan-valaisimen-maadoitus", heading: "Vanhan valaisimen maadoitus" }
];

test.describe("public route smoke test", () => {
  for (const route of publicRoutes) {
    test(`${route.path} renders its intended page`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1").first()).toContainText(route.heading);
    });
  }

  test("legacy small-electrical-work URL redirects to the canonical service", async ({ page }) => {
    await page.goto("/pienet-sahkotyot-helsinki");
    await expect(page).toHaveURL(/\/sahkoasennukset-ja-vikakorjaukset$/);
    await expect(page.locator("h1").first()).toContainText("Sähköasennukset ja vikakorjaukset");
  });

  test("disabled FAQ route returns a real 404, not homepage content", async ({ page }) => {
    const response = await page.goto("/usein-kysytyt-kysymykset");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1").first()).toContainText("Sivua ei löytynyt");
  });

  test("unknown route returns a real 404", async ({ page }) => {
    const response = await page.goto("/qa-route-that-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(page.locator("h1").first()).toContainText("Sivua ei löytynyt");
  });

  test("legal placeholder pages are accessible but noindex", async ({ page }) => {
    for (const route of [
      { path: "/tietosuojaseloste", heading: "Tietosuojaseloste" },
      { path: "/evastekaytanto", heading: "Evästekäytäntö" },
      { path: "/saavutettavuusseloste", heading: "Saavutettavuusseloste" }
    ]) {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1").first()).toContainText(route.heading);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    }
  });

  test("preview robots and sitemap endpoints return their real formats and indexation remains closed", async ({ page, request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    expect(robots.headers()["content-type"]).toMatch(/text\/plain/i);
    expect(await robots.text()).toMatch(/Disallow:\s*\//);

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    expect(sitemap.headers()["content-type"]).toMatch(/xml/i);
    const sitemapText = await sitemap.text();
    expect(sitemapText).toContain("<urlset");
    expect(sitemapText).toContain("https://preview.invalid/");
    expect(sitemapText).toContain("/yhteystiedot");
    expect(sitemapText).toContain("/alihankkijaksi");
    expect(sitemapText).not.toContain("/verkkokauppa");
    expect(sitemapText).not.toContain("/tietosuojaseloste");
    expect(sitemapText).not.toContain("/evastekaytanto");
    expect(sitemapText).not.toContain("/saavutettavuusseloste");
    expect(sitemapText).not.toContain("/usein-kysytyt-kysymykset");
    expect(sitemapText).not.toContain("/kiitos");

    await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

    await page.goto("/verkkokauppa");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  });
});
