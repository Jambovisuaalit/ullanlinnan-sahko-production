import { expect, test } from "@playwright/test";

test("contact form submits successfully in preview mode", async ({ page }) => {
  await page.goto("/yhteystiedot#yhteydenotto");

  await page.getByLabel("Aihe").selectOption("electrical");
  await page.getByLabel("Nimi").fill("Testikäyttäjä");
  await page.getByLabel("Sähköposti").fill("test@example.com");
  await page.getByLabel("Kuvaus").fill("Tämä on yhteydenottolomakkeen E2E-smoke-testi.");
  await page.getByLabel(/Hyväksyn, että antamiani tietoja käsitellään/).check();

  // The API intentionally rejects submissions made in under 1.5 seconds.
  await page.waitForTimeout(1600);

  const responsePromise = page.waitForResponse(
    (response) => response.url().endsWith("/api/contact") && response.request().method() === "POST"
  );

  await page.getByRole("button", { name: "Lähetä yhteydenotto" }).click();

  const response = await responsePromise;
  expect(response.status()).toBe(200);
  await expect(response.json()).resolves.toMatchObject({ ok: true, mode: "demo" });

  await expect(page.getByRole("heading", { name: "Demolähetys onnistui" })).toBeVisible();
  await expect(page.getByText("Tämä on asiakasesikatselu, joten tietoja ei lähetetty eteenpäin.")).toBeVisible();
  await expect(page.getByText(/^Viite: DEMO-/)).toBeVisible();
});


test("API ignores submissions containing the honeypot value", async ({ request }) => {
  const response = await request.post("http://127.0.0.1:4173/api/contact", {
    multipart: {
      topic: "electrical",
      name: "Testikäyttäjä",
      email: "test@example.com",
      phone: "",
      address: "",
      message: "Tämä testaa lomakkeen honeypot-käsittelyä.",
      consent: "true",
      website: "https://spam.example",
      startedAt: String(Date.now() - 2000)
    }
  });

  expect(response.status()).toBe(200);
  await expect(response.json()).resolves.toMatchObject({ ok: true, mode: "ignored" });
});

test("UI does not claim an ignored submission was sent", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, mode: "ignored" })
    });
  });

  await page.goto("/yhteystiedot#yhteydenotto");
  await page.getByLabel("Aihe").selectOption("electrical");
  await page.getByLabel("Nimi").fill("Testikäyttäjä");
  await page.getByLabel("Sähköposti").fill("test@example.com");
  await page.getByLabel("Kuvaus").fill("Tämä testaa neutraalia onnistumisviestiä.");
  await page.getByLabel(/Hyväksyn, että antamiani tietoja käsitellään/).check();

  const responsePromise = page.waitForResponse(
    (response) => response.url().endsWith("/api/contact") && response.request().method() === "POST"
  );
  await page.getByRole("button", { name: "Lähetä yhteydenotto" }).click();

  const response = await responsePromise;
  expect(response.status()).toBe(200);
  await expect(response.json()).resolves.toMatchObject({ ok: true, mode: "ignored" });
  await expect(page.getByRole("heading", { name: "Pyyntö käsiteltiin" })).toBeVisible();
  await expect(page.getByText("Kiitos. Pyyntö on käsitelty.")).toBeVisible();
  await expect(page.getByText("Yhteydenotto lähetettiin", { exact: true })).not.toBeVisible();
});


test("homepage quick contact form submits successfully in preview mode", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Mitä tarvitset?").selectOption("electrical");
  await page.getByLabel("Nimi").fill("Testikäyttäjä");
  await page.getByLabel("Puhelinnumero").fill("0401234567");
  await page.getByLabel("Sähköposti").fill("test@example.com");
  await page.getByLabel(/Hyväksyn, että tietojani käytetään/).check();

  await page.waitForTimeout(1600);
  const responsePromise = page.waitForResponse(
    (response) => response.url().endsWith("/api/contact") && response.request().method() === "POST"
  );
  await page.getByRole("button", { name: "Pyydä yhteydenottoa" }).click();

  const response = await responsePromise;
  expect(response.status()).toBe(200);
  await expect(response.json()).resolves.toMatchObject({ ok: true, mode: "demo" });
  await expect(page.getByRole("heading", { name: "Esikatselutesti onnistui" })).toBeVisible();
});

test("subcontractor application submits successfully in preview mode", async ({ page }) => {
  await page.goto("/alihankkijaksi");
  await page.getByLabel("Yrityksen nimi").fill("Testi Sähkö Oy");
  await page.getByLabel("Y-tunnus").fill("1234567-8");
  await page.getByLabel("Yhteyshenkilö").fill("Testikäyttäjä");
  await page.getByLabel("Puhelinnumero").fill("0401234567");
  await page.getByLabel("Sähköposti").fill("test@example.com");
  await page.getByLabel("Sähköalan osaamisalueet").fill("Sähköasennukset ja vikakorjaukset");
  await page.getByLabel("Toiminta-alue").fill("Helsinki ja lähialueet");
  await page.getByLabel("Luvat, pätevyydet ja vakuutukset").fill("Sähköalan pätevyydet ja voimassa olevat vastuuvakuutukset.");
  await page.getByLabel("Kerro yrityksestä ja toivotusta yhteistyöstä").fill("Olemme pieni sähköalan yritys ja etsimme pitkäaikaista alihankintayhteistyötä.");
  await page.getByLabel(/Hyväksyn, että tietojani käsitellään alihankkijahakemuksen/).check();

  await page.waitForTimeout(1600);
  const responsePromise = page.waitForResponse(
    (response) => response.url().endsWith("/api/subcontractor") && response.request().method() === "POST"
  );
  await page.getByRole("button", { name: "Lähetä alihankkijahakemus" }).click();

  const response = await responsePromise;
  expect(response.status()).toBe(200);
  await expect(response.json()).resolves.toMatchObject({ ok: true, mode: "demo" });
  await expect(page.getByRole("heading", { name: "Esikatselutesti onnistui" })).toBeVisible();
});
