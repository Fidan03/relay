import { expect, test } from "@playwright/test";

test("homepage renders every section and the core interactions work", async ({ page }) => {
  await page.goto("/");

  // Core sections render, top to bottom.
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Background jobs");
  await expect(page.getByText("Works with the runtime you already use.")).toBeVisible();
  await expect(page.getByText("Start free. Scale when you need to.")).toBeVisible();
  await expect(page.getByText("Common questions. Straight answers.")).toBeVisible();
  await expect(page.getByText("Ship background jobs today.")).toBeVisible();

  // Integration showcase: switch runtime tabs and confirm the code panel updates.
  const integration = page.locator("section", { hasText: "Works with the runtime" });
  await integration.scrollIntoViewIfNeeded();
  await expect(integration.getByText("worker.js")).toBeVisible();
  await integration.getByRole("tab", { name: "Bun" }).click();
  await expect(integration.getByText("worker.ts")).toBeVisible();
  await expect(integration.getByText(/import \{ relay \}/)).toBeVisible();

  // FAQ accordion: closed by default, opens on click, and only one item at a time.
  const faq = page.locator("section", { hasText: "Common questions" });
  await faq.scrollIntoViewIfNeeded();
  const firstAnswer = faq.getByText(/Managed runs the queue and dashboard/);
  await expect(firstAnswer).toBeHidden();
  await faq.getByRole("button", { name: /Self-hosted vs\. managed/ }).click();
  await expect(firstAnswer).toBeVisible();

  const secondAnswer = faq.getByText(/Relay retries failed jobs/);
  await faq.getByRole("button", { name: /What happens when a job fails/ }).click();
  await expect(secondAnswer).toBeVisible();
  await expect(firstAnswer).toBeHidden();
});

test("the waitlist dialog validates and submits an email", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "Start free" }).first().click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();

  const submit = dialog.getByRole("button", { name: "Get early access" });
  const email = dialog.getByLabel("Work email");

  // Invalid email is rejected client-side before hitting the API.
  await email.fill("not-an-email");
  await submit.click();
  await expect(dialog.getByRole("alert")).toBeVisible();

  // Valid email round-trips through the real API route.
  await email.fill(`playwright-${Date.now()}@example.com`);
  await submit.click();
  await expect(dialog.getByText(/You're in\.|already on the list/)).toBeVisible();
});
