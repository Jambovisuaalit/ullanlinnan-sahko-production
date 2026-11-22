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
